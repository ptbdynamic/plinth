import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthMenu } from '../src/index.ts';

describe('PlinthMenu', () => {
  it('prints the menu markup contract', () => {
    const wrapper = mount(PlinthMenu, { slots: { default: 'Content' } });

    expect(wrapper.html()).toBe('<div class="plinth-menu">Content</div>');
  });

  it('escapes the content', () => {
    const wrapper = mount(PlinthMenu, { slots: { default: () => '<b>x</b>' } });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes and attributes', () => {
    const wrapper = mount(PlinthMenu, { attrs: { class: 'ms-2', id: 'extra' } });

    expect(wrapper.classes()).toEqual(['plinth-menu', 'ms-2']);
    expect(wrapper.attributes('id')).toBe('extra');
  });
});
