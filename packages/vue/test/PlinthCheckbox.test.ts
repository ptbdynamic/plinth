import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { PlinthCheckbox } from '../src/index.ts';

const checkboxWith = (props: Record<string, unknown> = {}, attrs?: Record<string, unknown>) =>
  mount(PlinthCheckbox, { props: { id: 'updates', label: 'Email me updates', ...props }, attrs });

const html = (wrapper: ReturnType<typeof checkboxWith>) =>
  wrapper
    .html()
    .replace(/\n\s*/g, '')
    .replace(/<!--.*?-->/g, '');

describe('PlinthCheckbox', () => {
  it('prints the input, the label, the description and the error', () => {
    const wrapper = checkboxWith({ description: 'Once a month.', error: 'Choose one.' });

    expect(html(wrapper)).toBe(
      '<div class="plinth-checkbox">' +
        '<input id="updates" type="checkbox" class="plinth-checkbox-input" aria-describedby="updates-description updates-error" aria-invalid="true">' +
        '<label class="plinth-checkbox-label" for="updates">Email me updates</label>' +
        '<p id="updates-description" class="plinth-checkbox-description">Once a month.</p>' +
        '<p id="updates-error" class="plinth-checkbox-error">Choose one.</p>' +
        '</div>',
    );
  });

  it('is unchecked and enabled by default, and leaves out a blank description and error', () => {
    const wrapper = checkboxWith({ description: ' ', error: '' });
    const input = wrapper.find('input');

    expect(input.element.checked).toBe(false);
    expect(input.element.indeterminate).toBe(false);
    expect(input.attributes('disabled')).toBeUndefined();
    expect(input.attributes('aria-describedby')).toBeUndefined();
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(wrapper.find('p').exists()).toBe(false);
  });

  it('is checked with v-model, and updates it when it changes', async () => {
    const wrapper = checkboxWith({ modelValue: true });
    const input = wrapper.find('input');
    expect(input.element.checked).toBe(true);

    await input.setValue(false);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('is disabled', () => {
    expect(checkboxWith({ disabled: true }).find('input').attributes('disabled')).toBe('');
  });

  it('sets the input indeterminate, and clears it again', async () => {
    const wrapper = checkboxWith({ indeterminate: true });
    await nextTick();
    expect(wrapper.find('input').element.indeterminate).toBe(true);

    await wrapper.setProps({ indeterminate: false });
    expect(wrapper.find('input').element.indeterminate).toBe(false);
  });

  it('generates an id when it has none, and points the label at it', () => {
    const wrapper = checkboxWith({ id: ' ', description: 'Help' });
    const id = wrapper.find('input').attributes('id')!;

    expect(id).toMatch(/^plinth-checkbox-/);
    expect(wrapper.find('label').attributes('for')).toBe(id);
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(`${id}-description`);
  });

  it('needs a label', () => {
    expect(() => checkboxWith({ label: ' ' })).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const wrapper = checkboxWith({ label: '<b>x</b>', description: '<b>x</b>', error: '<b>x</b>' });

    expect(wrapper.html()).not.toContain('<b>');
    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('puts the class on the root and every other attribute on the input, where it wins', () => {
    const wrapper = checkboxWith(
      { description: 'Help' },
      {
        class: 'mb-4',
        name: 'updates',
        value: '1',
        'data-testid': 'updates',
        'aria-describedby': 'mine',
      },
    );
    const input = wrapper.find('input');

    expect(wrapper.classes()).toEqual(['plinth-checkbox', 'mb-4']);
    expect(input.attributes('class')).toBe('plinth-checkbox-input');
    expect(input.attributes('name')).toBe('updates');
    expect(input.attributes('value')).toBe('1');
    expect(input.attributes('data-testid')).toBe('updates');
    expect(input.attributes('aria-describedby')).toBe('mine');
  });
});
