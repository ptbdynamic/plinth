import { mount } from '@vue/test-utils';
import { Comment, h } from 'vue';
import { describe, expect, it } from 'vitest';
import { PlinthTextField, fieldDescribedBy, textFieldSize } from '../src/index.ts';

const fieldWith = (
  props: Record<string, unknown> = {},
  options: { attrs?: Record<string, unknown>; slots?: Record<string, unknown> } = {},
) =>
  mount(PlinthTextField, {
    props: { id: 'email', label: 'Email', ...props },
    attrs: options.attrs,
    slots: options.slots,
  });

const html = (wrapper: ReturnType<typeof fieldWith>) =>
  wrapper
    .html()
    .replace(/\n\s*/g, '')
    .replace(/<!--.*?-->/g, '');

describe('PlinthTextField', () => {
  it('prints the label, the input, the description and the error', () => {
    const wrapper = fieldWith({
      type: 'email',
      description: 'For receipts.',
      error: 'Enter an email address.',
    });

    expect(html(wrapper)).toBe(
      '<div class="plinth-text-field" data-size="md">' +
        '<label class="plinth-text-field-label" for="email">Email</label>' +
        '<div class="plinth-text-field-control">' +
        '<input id="email" type="email" class="plinth-text-field-input" aria-describedby="email-description email-error" aria-invalid="true">' +
        '</div>' +
        '<p id="email-description" class="plinth-text-field-description">For receipts.</p>' +
        '<p id="email-error" class="plinth-text-field-error">Enter an email address.</p>' +
        '</div>',
    );
  });

  it('is a text input of size md by default, with nothing to describe it', () => {
    const input = fieldWith().find('input');

    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('aria-describedby')).toBeUndefined();
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(fieldWith().attributes('data-size')).toBe('md');
    expect(fieldWith().attributes('data-label')).toBeUndefined();
  });

  it('takes the sm size and falls back to md for any other', () => {
    expect(fieldWith({ size: 'sm' }).attributes('data-size')).toBe('sm');
    expect(fieldWith({ size: 'lg' }).attributes('data-size')).toBe('md');
    expect(textFieldSize(undefined)).toBe('md');
  });

  it('hides the label visually', () => {
    expect(fieldWith({ hideLabel: true }).attributes('data-label')).toBe('hidden');
  });

  it('is disabled or read-only', () => {
    expect(fieldWith({ disabled: true }).find('input').attributes('disabled')).toBe('');
    expect(fieldWith({ readonly: true }).find('input').attributes('readonly')).toBe('');
    expect(fieldWith().find('input').attributes('disabled')).toBeUndefined();
  });

  it('prints the icon and the trailing slot, and leaves out empty ones', () => {
    const wrapper = fieldWith(
      {},
      { slots: { icon: '<svg></svg>', trailing: '<kbd aria-hidden="true">/</kbd>' } },
    );

    expect(wrapper.find('.plinth-text-field-control > .plinth-icon').html()).toBe(
      '<span class="plinth-icon" data-size="sm" aria-hidden="true"><svg></svg></span>',
    );
    expect(wrapper.find('.plinth-text-field-trailing').html()).toBe(
      '<span class="plinth-text-field-trailing"><kbd aria-hidden="true">/</kbd></span>',
    );
    const empty = fieldWith({}, { slots: { icon: () => h(Comment), trailing: () => '' } });
    expect(empty.find('.plinth-icon').exists()).toBe(false);
    expect(empty.find('.plinth-text-field-trailing').exists()).toBe(false);
  });

  it('leaves out a blank description and error', () => {
    const input = fieldWith({ description: ' ', error: '' }).find('input');

    expect(input.attributes('aria-describedby')).toBeUndefined();
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(fieldDescribedBy('a', undefined, 'x')).toBe('a-error');
  });

  it('generates an id when it has none, and points the label at it', () => {
    const wrapper = fieldWith({ id: undefined, description: 'Help' });
    const id = wrapper.find('input').attributes('id')!;

    expect(id).toMatch(/^plinth-text-field-/);
    expect(wrapper.find('label').attributes('for')).toBe(id);
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(`${id}-description`);
  });

  it('needs a label', () => {
    expect(() => fieldWith({ label: ' ' })).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const wrapper = fieldWith({ label: '<b>x</b>', description: '<i>', error: '<u>' });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(wrapper.html()).toContain('&lt;i&gt;');
    expect(wrapper.html()).toContain('&lt;u&gt;');
  });

  it('puts the class on the root and every other attribute on the input, where it wins', () => {
    const wrapper = fieldWith(
      { description: 'Help' },
      {
        attrs: {
          class: 'mb-4',
          name: 'email',
          placeholder: 'name@example.com',
          'data-testid': 'email',
          'aria-describedby': 'mine',
        },
      },
    );
    const input = wrapper.find('input');

    expect(wrapper.classes()).toEqual(['plinth-text-field', 'mb-4']);
    expect(input.classes()).toEqual(['plinth-text-field-input']);
    expect(input.attributes('name')).toBe('email');
    expect(input.attributes('placeholder')).toBe('name@example.com');
    expect(input.attributes('data-testid')).toBe('email');
    expect(input.attributes('aria-describedby')).toBe('mine');
    expect(wrapper.attributes('name')).toBeUndefined();
  });

  it('binds its value with v-model and keeps the input listeners', async () => {
    const values: unknown[] = [];
    const typed: unknown[] = [];
    const wrapper = fieldWith(
      { modelValue: 'sam', 'onUpdate:modelValue': (value: unknown) => values.push(value) },
      { attrs: { onInput: (event: Event) => typed.push(event.type) } },
    );
    const input = wrapper.find('input');

    expect((input.element as HTMLInputElement).value).toBe('sam');
    await input.setValue('sam@example.com');

    expect(values).toEqual(['sam@example.com']);
    expect(typed).toEqual(['input']);
  });
});
