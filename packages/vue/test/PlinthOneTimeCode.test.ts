import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthOneTimeCode } from '../src/index.ts';

describe('PlinthOneTimeCode', () => {
  it('prints the one time code markup contract', () => {
    const wrapper = mount(PlinthOneTimeCode, { slots: { default: 'Content' } });

    expect(wrapper.html()).toBe('<div class="plinth-one-time-code">Content</div>');
  });

  it('escapes the content', () => {
    const wrapper = mount(PlinthOneTimeCode, { slots: { default: () => '<b>x</b>' } });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes and attributes', () => {
    const wrapper = mount(PlinthOneTimeCode, { attrs: { class: 'ms-2', id: 'extra' } });

    expect(wrapper.classes()).toEqual(['plinth-one-time-code', 'ms-2']);
    expect(wrapper.attributes('id')).toBe('extra');
  });
});
