import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthSelect, selectSize } from '../src/index.ts';

const options = '<option value="a">A</option><option value="b">B</option>';

const selectWith = (
  props: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
  slot: string = options,
) =>
  mount(PlinthSelect, {
    props: { id: 'role', label: 'Role', ...props },
    attrs,
    slots: { default: slot },
  });

const html = (wrapper: ReturnType<typeof selectWith>) =>
  wrapper
    .html()
    .replace(/\n\s*/g, '')
    .replace(/<!--.*?-->/g, '');

describe('PlinthSelect', () => {
  it('prints the label, the select, the options, the description and the error', () => {
    const wrapper = selectWith({ description: 'What it may do.', error: 'Choose a role.' });

    expect(html(wrapper)).toBe(
      '<div class="plinth-select" data-size="md">' +
        '<label class="plinth-select-label" for="role">Role</label>' +
        '<div class="plinth-select-control">' +
        '<select id="role" class="plinth-select-input" aria-describedby="role-description role-error" aria-invalid="true">' +
        options +
        '</select>' +
        '</div>' +
        '<p id="role-description" class="plinth-select-description">What it may do.</p>' +
        '<p id="role-error" class="plinth-select-error">Choose a role.</p>' +
        '</div>',
    );
  });

  it('is of size md by default, with nothing to describe it', () => {
    const wrapper = selectWith();
    const select = wrapper.find('select');

    expect(select.attributes('aria-describedby')).toBeUndefined();
    expect(select.attributes('aria-invalid')).toBeUndefined();
    expect(select.attributes('value')).toBeUndefined();
    expect(wrapper.attributes('data-size')).toBe('md');
    expect(wrapper.attributes('data-label')).toBeUndefined();
    expect(wrapper.find('option[value=""]').exists()).toBe(false);
  });

  it('takes the sm size and falls back to md for any other', () => {
    expect(selectWith({ size: 'sm' }).attributes('data-size')).toBe('sm');
    expect(selectWith({ size: 'lg' }).attributes('data-size')).toBe('md');
    expect(selectSize(undefined)).toBe('md');
  });

  it('hides the label visually, and is disabled or required', () => {
    expect(selectWith({ hideLabel: true }).attributes('data-label')).toBe('hidden');
    expect(selectWith({ disabled: true }).find('select').attributes('disabled')).toBe('');
    expect(selectWith({ required: true }).find('select').attributes('required')).toBe('');
    expect(selectWith().find('select').attributes('disabled')).toBeUndefined();
  });

  it('prints a disabled first option for the placeholder, chosen while nothing is', async () => {
    const wrapper = selectWith({ placeholder: 'Choose one' });
    const placeholder = wrapper.find('option');

    expect(placeholder.text()).toBe('Choose one');
    expect(placeholder.attributes('value')).toBe('');
    expect(placeholder.attributes('disabled')).toBe('');
    expect((placeholder.element as HTMLOptionElement).selected).toBe(true);

    await wrapper.setProps({ modelValue: 'b' });
    expect((placeholder.element as HTMLOptionElement).selected).toBe(false);
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('b');
    expect(selectWith({ placeholder: ' ' }).find('option[value=""]').exists()).toBe(false);
  });

  it('leaves out a blank description and error', () => {
    const select = selectWith({ description: ' ', error: '' }).find('select');

    expect(select.attributes('aria-describedby')).toBeUndefined();
    expect(select.attributes('aria-invalid')).toBeUndefined();
  });

  it('generates an id when it has none, and points the label at it', () => {
    const wrapper = selectWith({ id: undefined, description: 'Help' });
    const id = wrapper.find('select').attributes('id')!;

    expect(id).toMatch(/^plinth-select-/);
    expect(wrapper.find('label').attributes('for')).toBe(id);
    expect(wrapper.find('select').attributes('aria-describedby')).toBe(`${id}-description`);
  });

  it('needs a label', () => {
    expect(() => selectWith({ label: ' ' })).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const wrapper = selectWith({
      label: '<b>x</b>',
      description: '<i>',
      error: '<u>',
      placeholder: '<s>',
    });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(wrapper.html()).toContain('&lt;i&gt;');
    expect(wrapper.html()).toContain('&lt;u&gt;');
    expect(wrapper.html()).toContain('&lt;s&gt;');
  });

  it('puts the class on the root and every other attribute on the select, where it wins', () => {
    const wrapper = selectWith(
      { description: 'Help' },
      { class: 'mb-4', name: 'role', 'data-testid': 'role', 'aria-describedby': 'mine' },
    );
    const select = wrapper.find('select');

    expect(wrapper.classes()).toEqual(['plinth-select', 'mb-4']);
    expect(select.classes()).toEqual(['plinth-select-input']);
    expect(select.attributes('name')).toBe('role');
    expect(select.attributes('data-testid')).toBe('role');
    expect(select.attributes('aria-describedby')).toBe('mine');
    expect(wrapper.attributes('name')).toBeUndefined();
  });

  it('binds its value with v-model and keeps the select listeners', async () => {
    const values: unknown[] = [];
    const changes: unknown[] = [];
    const wrapper = selectWith(
      { modelValue: 'a', 'onUpdate:modelValue': (value: unknown) => values.push(value) },
      { onChange: (event: Event) => changes.push(event.type) },
    );
    const select = wrapper.find('select');

    expect((select.element as HTMLSelectElement).value).toBe('a');
    await select.setValue('b');

    expect(values).toEqual(['b']);
    expect(changes).toEqual(['change']);
  });

  it('keeps the browser choice when it has no model', () => {
    const select = selectWith(
      {},
      {},
      '<option value="a">A</option><option value="b" selected>B</option>',
    );

    expect((select.find('select').element as HTMLSelectElement).value).toBe('b');
  });
});
