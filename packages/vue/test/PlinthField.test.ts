import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { fieldControl, PlinthField } from '../src/index.ts';

describe('PlinthField', () => {
  it('prints the label, the control, the description and the error around one control', () => {
    const wrapper = mount(PlinthField, {
      props: {
        id: 'team',
        label: 'Team',
        required: true,
        description: 'Who answers first.',
        error: 'Pick a team.',
      },
      slots: { default: '<select id="team"></select>' },
    });

    expect(wrapper.html().replace(/>\s+</g, '><')).toBe(
      '<div class="plinth-field">' +
        '<label class="plinth-field-label" id="team-label" for="team">Team<span class="plinth-field-required" aria-hidden="true">*</span></label>' +
        '<select id="team"></select>' +
        '<p class="plinth-field-description" id="team-description">Who answers first.</p>' +
        '<p class="plinth-field-error" id="team-error">Pick a team.</p>' +
        '</div>',
    );
  });

  it('is a fieldset with a legend for a group, described by its description and error', () => {
    const wrapper = mount(PlinthField, {
      props: { id: 'status', label: 'Status', group: true, description: 'D', error: 'E' },
    });

    expect(wrapper.element.tagName).toBe('FIELDSET');
    expect(wrapper.attributes('id')).toBe('status');
    expect(wrapper.attributes('aria-describedby')).toBe('status-description status-error');
    expect(wrapper.find('legend').attributes()).toEqual({
      class: 'plinth-field-label',
      id: 'status-label',
    });
  });

  it('leaves out blank messages, the mark and the hidden label by default', () => {
    const wrapper = mount(PlinthField, {
      props: { id: 's', label: 'S', group: true, description: ' ', error: '' },
    });

    expect(wrapper.attributes('aria-describedby')).toBeUndefined();
    expect(wrapper.attributes('data-label')).toBeUndefined();
    expect(wrapper.find('p').exists()).toBe(false);
    expect(wrapper.find('.plinth-field-required').exists()).toBe(false);
  });

  it('hides the label visually', () => {
    const wrapper = mount(PlinthField, { props: { label: 'A', hideLabel: true } });

    expect(wrapper.attributes('data-label')).toBe('hidden');
  });

  it('gives its slot the ids the control points at', () => {
    const wrapper = mount(PlinthField, {
      props: { id: 'team', label: 'Team', description: 'D', error: 'E' },
      slots: {
        default: (control: ReturnType<typeof fieldControl>) =>
          h('select', {
            id: control.id,
            'aria-labelledby': control.labelId,
            'aria-describedby': control.describedBy,
            'aria-invalid': control.invalid ? 'true' : undefined,
          }),
      },
    });

    expect(wrapper.find('select').attributes()).toEqual({
      id: 'team',
      'aria-labelledby': 'team-label',
      'aria-describedby': 'team-description team-error',
      'aria-invalid': 'true',
    });
  });

  it('generates an id when it has none', () => {
    const wrapper = mount(PlinthField, { props: { label: 'A', id: ' ' } });
    const label = wrapper.find('label');

    expect(label.attributes('for')).toMatch(/^plinth-field-/);
    expect(label.attributes('id')).toBe(`${label.attributes('for')}-label`);
  });

  it('needs a label', () => {
    expect(() => mount(PlinthField, { props: { label: ' ' } })).toThrow('needs a label');
  });

  it('escapes the label and the messages', () => {
    const wrapper = mount(PlinthField, {
      props: { label: 'A <b>', description: 'B & C', error: 'Not <this>' },
    });

    expect(wrapper.html()).toContain('A &lt;b&gt;');
    expect(wrapper.html()).toContain('B &amp; C');
    expect(wrapper.html()).toContain('Not &lt;this&gt;');
  });

  it('forwards extra attributes to the root, where the project wins a clash', () => {
    const wrapper = mount(PlinthField, {
      props: { id: 's', label: 'S', group: true, description: 'D' },
      attrs: { class: 'mb-4', 'data-testid': 's', 'aria-describedby': 'mine', disabled: true },
    });

    expect(wrapper.classes()).toEqual(['plinth-field', 'mb-4']);
    expect(wrapper.attributes('data-testid')).toBe('s');
    expect(wrapper.attributes('aria-describedby')).toBe('mine');
    expect(wrapper.attributes('disabled')).toBe('');
  });
});

describe('fieldControl', () => {
  it('leaves a group control without aria-describedby: its fieldset has it', () => {
    expect(fieldControl('s', true, 'D', 'E')).toEqual({
      id: undefined,
      labelId: 's-label',
      describedBy: undefined,
      invalid: true,
    });
    expect(fieldControl('t', false, undefined, ' ')).toEqual({
      id: 't',
      labelId: 't-label',
      describedBy: undefined,
      invalid: false,
    });
  });
});
