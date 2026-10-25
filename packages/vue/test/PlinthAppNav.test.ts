import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { PlinthAppNav, PlinthAppNavItem } from '../src/index.ts';

const squish = (html: string) => html.replace(/>\s+</g, '><').trim();

describe('PlinthAppNav', () => {
  it('prints a named nav with its brand, items and footer', () => {
    const wrapper = mount(PlinthAppNav, {
      props: { label: 'Main', brandName: 'Harbour', brandHref: '/' },
      slots: { mark: '<svg></svg>', default: '<i>items</i>', footer: '<i>footer</i>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<nav class="plinth-app-nav" aria-label="Main">' +
        '<a class="plinth-app-nav-brand" href="/"><span class="plinth-app-nav-mark" aria-hidden="true"><svg></svg></span><span class="plinth-app-nav-name">Harbour</span></a>' +
        '<div class="plinth-app-nav-items"><i>items</i></div>' +
        '<div class="plinth-app-nav-footer"><i>footer</i></div>' +
        '</nav>',
    );
  });

  it('prints only the items without a brand, a footer or a label', () => {
    const wrapper = mount(PlinthAppNav, {
      props: { label: ' ', brandName: ' ' },
      slots: { default: '<i>items</i>', mark: () => [], footer: () => ' ' },
    });

    expect(squish(wrapper.html())).toBe(
      '<nav class="plinth-app-nav"><!--v-if--><div class="plinth-app-nav-items"><i>items</i></div><!--v-if--></nav>',
    );
  });

  it('makes the brand a div without an href', () => {
    const wrapper = mount(PlinthAppNav, { props: { brandName: 'Harbour', brandHref: ' ' } });

    expect(squish(wrapper.find('.plinth-app-nav-brand').html())).toBe(
      '<div class="plinth-app-nav-brand"><!--v-if--><span class="plinth-app-nav-name">Harbour</span></div>',
    );
  });

  it('leaves a mark alone to name the brand', () => {
    const wrapper = mount(PlinthAppNav, {
      props: { brandHref: '/' },
      slots: { mark: '<img src="/logo.svg" alt="Harbour">' },
    });

    expect(squish(wrapper.find('.plinth-app-nav-brand').html())).toBe(
      '<a class="plinth-app-nav-brand" href="/"><span class="plinth-app-nav-mark"><img src="/logo.svg" alt="Harbour"></span><!--v-if--></a>',
    );
  });

  it('escapes the label and the brand name', () => {
    const wrapper = mount(PlinthAppNav, {
      props: { label: '"><b>x</b>', brandName: '<b>x</b>' },
    });

    expect(wrapper.attributes('aria-label')).toBe('"><b>x</b>');
    expect(wrapper.find('.plinth-app-nav-name').html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('passes extra attributes to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthAppNav, {
      props: { label: 'Main' },
      attrs: { class: 'is-wide', 'aria-label': 'App', 'data-testid': 'nav' },
    });

    expect(wrapper.classes()).toEqual(['plinth-app-nav', 'is-wide']);
    expect(wrapper.attributes('aria-label')).toBe('App');
    expect(wrapper.attributes('data-testid')).toBe('nav');
  });
});

describe('PlinthAppNavItem', () => {
  it('prints a link with its icon, label and count', () => {
    const wrapper = mount(PlinthAppNavItem, {
      props: { href: '/support', count: 12 },
      slots: { icon: '<svg></svg>', default: 'Support' },
    });

    expect(squish(wrapper.html())).toBe(
      '<a class="plinth-app-nav-item" href="/support"><span class="plinth-app-nav-icon" aria-hidden="true"><svg></svg></span><span class="plinth-app-nav-label">Support</span><span class="plinth-app-nav-count">12</span></a>',
    );
  });

  it('marks the current page', () => {
    const wrapper = mount(PlinthAppNavItem, {
      props: { href: '/content', current: true },
      slots: { default: 'Content' },
    });

    expect(wrapper.attributes('aria-current')).toBe('page');
  });

  it('prints a zero count, and leaves out a blank one, a blank icon and a blank href', () => {
    expect(
      mount(PlinthAppNavItem, { props: { href: '/a', count: 0 } })
        .find('.plinth-app-nav-count')
        .text(),
    ).toBe('0');

    const wrapper = mount(PlinthAppNavItem, {
      props: { href: ' ', count: ' ' },
      slots: { icon: () => h('template'), default: 'A' },
    });
    expect(wrapper.attributes('href')).toBeUndefined();
    expect(wrapper.find('.plinth-app-nav-count').exists()).toBe(false);
    expect(
      mount(PlinthAppNavItem, { props: { count: null }, slots: { icon: () => ' ' } })
        .find('.plinth-app-nav-icon')
        .exists(),
    ).toBe(false);
  });

  it('escapes the label and the count', () => {
    const wrapper = mount(PlinthAppNavItem, {
      props: { href: '/a', count: '<b>1</b>' },
      slots: { default: () => '<b>x</b>' },
    });

    expect(wrapper.html()).not.toContain('<b>');
  });

  it('passes extra attributes to its link, and the project wins a clash', () => {
    const wrapper = mount(PlinthAppNavItem, {
      props: { href: '/a', current: true },
      attrs: { class: 'is-new', 'aria-current': 'location', 'data-testid': 'a' },
    });

    expect(wrapper.classes()).toEqual(['plinth-app-nav-item', 'is-new']);
    expect(wrapper.attributes('aria-current')).toBe('location');
    expect(wrapper.attributes('data-testid')).toBe('a');
  });
});
