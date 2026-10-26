import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthSwitch } from '../src/index.ts';

const switchWith = (props: Record<string, unknown> = {}, attrs?: Record<string, unknown>) =>
  mount(PlinthSwitch, { props: { id: 'enabled', label: 'Enabled', ...props }, attrs });

const html = (wrapper: ReturnType<typeof switchWith>) =>
  wrapper
    .html()
    .replace(/\n\s*/g, '')
    .replace(/<!--.*?-->/g, '');

describe('PlinthSwitch', () => {
  it('prints the input with the switch role, the label, the description and the error', () => {
    const wrapper = switchWith({ description: 'People can sign in.', error: 'Add a client ID.' });

    expect(html(wrapper)).toBe(
      '<div class="plinth-switch">' +
        '<input id="enabled" type="checkbox" role="switch" class="plinth-switch-input" aria-describedby="enabled-description enabled-error" aria-invalid="true">' +
        '<label class="plinth-switch-label" for="enabled">Enabled</label>' +
        '<p id="enabled-description" class="plinth-switch-description">People can sign in.</p>' +
        '<p id="enabled-error" class="plinth-switch-error">Add a client ID.</p>' +
        '</div>',
    );
  });

  it('is off and enabled by default, and leaves out a blank description and error', () => {
    const wrapper = switchWith({ description: ' ', error: '' });
    const input = wrapper.find('input');

    expect(input.element.checked).toBe(false);
    expect(input.attributes('disabled')).toBeUndefined();
    expect(input.attributes('aria-describedby')).toBeUndefined();
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(wrapper.find('p').exists()).toBe(false);
  });

  it('is on with v-model, and updates it when it is flipped', async () => {
    const wrapper = switchWith({ modelValue: true });
    const input = wrapper.find('input');
    expect(input.element.checked).toBe(true);

    await input.setValue(false);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('is disabled', () => {
    expect(switchWith({ disabled: true }).find('input').attributes('disabled')).toBe('');
  });

  it('generates an id when it has none, and points the label at it', () => {
    const wrapper = switchWith({ id: undefined, error: 'Wrong' });
    const id = wrapper.find('input').attributes('id')!;

    expect(id).toMatch(/^plinth-switch-/);
    expect(wrapper.find('label').attributes('for')).toBe(id);
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(`${id}-error`);
  });

  it('needs a label', () => {
    expect(() => switchWith({ label: '' })).toThrow('needs a label');
  });

  it('escapes the text', () => {
    const wrapper = switchWith({ label: '<b>x</b>', description: '<b>x</b>', error: '<b>x</b>' });

    expect(wrapper.html()).not.toContain('<b>');
    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('puts the class on the root and every other attribute on the input, where it wins', () => {
    const wrapper = switchWith(
      {},
      { class: 'mb-4', name: 'enabled', value: '1', 'data-testid': 'enabled', role: 'checkbox' },
    );
    const input = wrapper.find('input');

    expect(wrapper.classes()).toEqual(['plinth-switch', 'mb-4']);
    expect(input.attributes('name')).toBe('enabled');
    expect(input.attributes('value')).toBe('1');
    expect(input.attributes('data-testid')).toBe('enabled');
    expect(input.attributes('role')).toBe('checkbox');
  });
});
