import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthBreadcrumbs, PlinthBreadcrumbsItem, PlinthBreadcrumbsMore } from '../src/index.ts';

describe('PlinthBreadcrumbs', () => {
  it('prints a nav named Breadcrumb around an ordered list', () => {
    const wrapper = mount(PlinthBreadcrumbs, { slots: { default: '<i>items</i>' } });

    expect(wrapper.html().replace(/\s*\n\s*/g, '')).toBe(
      '<nav class="plinth-breadcrumbs" aria-label="Breadcrumb"><ol class="plinth-breadcrumbs-list"><i>items</i></ol></nav>',
    );
  });

  it('takes its own label, and leaves out a blank one', () => {
    expect(
      mount(PlinthBreadcrumbs, { props: { label: 'Settings' } }).attributes('aria-label'),
    ).toBe('Settings');
    expect(
      mount(PlinthBreadcrumbs, { props: { label: ' ' } }).attributes('aria-label'),
    ).toBeUndefined();
  });

  it('collapses to the parent, and falls back to none', () => {
    const collapse = (value: string) =>
      mount(PlinthBreadcrumbs, {
        props: { collapse: value as 'parent' },
      }).attributes('data-collapse');

    expect(collapse('parent')).toBe('parent');
    expect(collapse('none')).toBeUndefined();
    expect(collapse('menu')).toBeUndefined();
  });

  it('passes extra attributes to its root, and the project attribute wins', () => {
    const wrapper = mount(PlinthBreadcrumbs, {
      attrs: { class: 'ms-2', 'aria-label': 'Path', 'data-testid': 'trail' },
    });

    expect(wrapper.classes()).toEqual(['plinth-breadcrumbs', 'ms-2']);
    expect(wrapper.attributes('aria-label')).toBe('Path');
    expect(wrapper.attributes('data-testid')).toBe('trail');
  });
});

describe('PlinthBreadcrumbsItem', () => {
  it('prints a link in a list item', () => {
    const wrapper = mount(PlinthBreadcrumbsItem, {
      props: { href: '/settings' },
      slots: { default: 'Settings' },
    });

    expect(wrapper.html().replace(/\s*\n\s*/g, '')).toBe(
      '<li class="plinth-breadcrumbs-item"><a class="plinth-breadcrumbs-link" href="/settings"><span class="plinth-breadcrumbs-label">Settings</span></a></li>',
    );
  });

  it('marks the current page, without an href', () => {
    const link = mount(PlinthBreadcrumbsItem, {
      props: { href: '/users', current: true },
    }).find('a');

    expect(link.attributes('aria-current')).toBe('page');
    expect(link.attributes('href')).toBeUndefined();
  });

  it('leaves out a missing or blank href', () => {
    expect(mount(PlinthBreadcrumbsItem).find('a').attributes('href')).toBeUndefined();
    expect(
      mount(PlinthBreadcrumbsItem, { props: { href: ' ' } })
        .find('a')
        .attributes('href'),
    ).toBeUndefined();
  });

  it('escapes the label', () => {
    const wrapper = mount(PlinthBreadcrumbsItem, { slots: { default: () => '<b>x</b>' } });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('passes its attributes to the link, and the project attribute wins', () => {
    const wrapper = mount(PlinthBreadcrumbsItem, {
      props: { current: true },
      attrs: { class: 'ms-2', 'aria-current': 'location', 'data-testid': 'home' },
    });
    const link = wrapper.find('a');

    expect(wrapper.classes()).toEqual(['plinth-breadcrumbs-item']);
    expect(link.classes()).toEqual(['plinth-breadcrumbs-link', 'ms-2']);
    expect(link.attributes('aria-current')).toBe('location');
    expect(link.attributes('data-testid')).toBe('home');
  });
});

describe('PlinthBreadcrumbsMore', () => {
  it('prints the more button with the app menu after it', () => {
    const wrapper = mount(PlinthBreadcrumbsMore, {
      props: { menu: ' trail-more ' },
      slots: { default: '<div id="trail-more" popover>menu</div>' },
    });
    const button = wrapper.find('button');

    expect(wrapper.element.tagName).toBe('LI');
    expect(wrapper.classes()).toEqual(['plinth-breadcrumbs-item']);
    expect(button.classes()).toEqual(['plinth-breadcrumbs-more']);
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('popovertarget')).toBe('trail-more');
    expect(button.attributes('aria-label')).toBe('More pages');
    expect(button.find('.plinth-icon').attributes('data-icon')).toBe('more');
    expect(button.element.nextElementSibling?.id).toBe('trail-more');
  });

  it('takes its own label, and passes its attributes to the button', () => {
    const button = mount(PlinthBreadcrumbsMore, {
      props: { menu: 'm', label: 'Earlier pages' },
      attrs: { class: 'ms-2', type: 'submit' },
    }).find('button');

    expect(button.attributes('aria-label')).toBe('Earlier pages');
    expect(button.classes()).toEqual(['plinth-breadcrumbs-more', 'ms-2']);
    expect(button.attributes('type')).toBe('submit');
  });

  it('needs a menu and a label', () => {
    expect(() => mount(PlinthBreadcrumbsMore, { props: { menu: ' ' } })).toThrow('needs a menu');
    expect(() => mount(PlinthBreadcrumbsMore, { props: { menu: 'm', label: ' ' } })).toThrow(
      'needs a label',
    );
  });
});
