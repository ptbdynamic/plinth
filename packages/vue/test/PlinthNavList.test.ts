import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthNavList, PlinthNavListGroup, PlinthNavListItem } from '../src/index.ts';

const squish = (html: string) => html.replace(/>\s+</g, '><').trim();

describe('PlinthNavList', () => {
  it('prints a named nav with its groups', () => {
    const wrapper = mount(PlinthNavList, {
      props: { label: 'Folders' },
      slots: { default: '<i>groups</i>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<nav class="plinth-nav-list" aria-label="Folders"><i>groups</i></nav>',
    );
  });

  it('leaves out a missing or blank label', () => {
    expect(mount(PlinthNavList).html()).toBe('<nav class="plinth-nav-list"></nav>');
    expect(
      mount(PlinthNavList, { props: { label: ' ' } }).attributes('aria-label'),
    ).toBeUndefined();
  });

  it('passes extra attributes to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthNavList, {
      props: { label: 'Folders' },
      attrs: { class: 'is-wide', id: 'folders', 'aria-label': 'Mail' },
    });

    expect(wrapper.classes()).toEqual(['plinth-nav-list', 'is-wide']);
    expect(wrapper.attributes('id')).toBe('folders');
    expect(wrapper.attributes('aria-label')).toBe('Mail');
  });
});

describe('PlinthNavListGroup', () => {
  it('prints a group with its heading and items', () => {
    const wrapper = mount(PlinthNavListGroup, {
      props: { heading: 'Views' },
      slots: { default: '<i>items</i>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-nav-list-group"><h2 class="plinth-nav-list-heading">Views</h2><i>items</i></div>',
    );
  });

  it('leaves out a missing or blank heading', () => {
    expect(squish(mount(PlinthNavListGroup).html())).toBe(
      '<div class="plinth-nav-list-group"><!--v-if--></div>',
    );
    expect(
      mount(PlinthNavListGroup, { props: { heading: ' ' } })
        .find('h2')
        .exists(),
    ).toBe(false);
  });

  it('takes a heading level and falls back to h2', () => {
    expect(
      mount(PlinthNavListGroup, { props: { heading: 'Views', headingLevel: 'h4' } })
        .find('h4')
        .exists(),
    ).toBe(true);
    expect(
      mount(PlinthNavListGroup, {
        props: { heading: 'Views', headingLevel: 'h1' as 'h2' },
      })
        .find('h2')
        .exists(),
    ).toBe(true);
  });

  it('escapes the heading', () => {
    const wrapper = mount(PlinthNavListGroup, { props: { heading: '<b>x</b>' } });

    expect(wrapper.find('h2').html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('passes extra attributes to its root', () => {
    const wrapper = mount(PlinthNavListGroup, {
      attrs: { class: 'is-pinned', 'data-testid': 'views' },
    });

    expect(wrapper.classes()).toEqual(['plinth-nav-list-group', 'is-pinned']);
    expect(wrapper.attributes('data-testid')).toBe('views');
  });
});

describe('PlinthNavListItem', () => {
  it('prints a link with its label and count', () => {
    const wrapper = mount(PlinthNavListItem, {
      props: { href: '/open', count: 12 },
      slots: { default: 'Open' },
    });

    expect(squish(wrapper.html())).toBe(
      '<a class="plinth-nav-list-item" href="/open"><span class="plinth-nav-list-label">Open</span><span class="plinth-nav-list-count">12</span></a>',
    );
  });

  it('marks the current view', () => {
    const wrapper = mount(PlinthNavListItem, {
      props: { href: '/open', current: true },
      slots: { default: 'Open' },
    });

    expect(wrapper.attributes('aria-current')).toBe('page');
    expect(wrapper.find('.plinth-nav-list-count').exists()).toBe(false);
  });

  it('prints a zero count, and leaves out a blank one and a blank href', () => {
    expect(
      mount(PlinthNavListItem, { props: { href: '/a', count: 0 } })
        .find('.plinth-nav-list-count')
        .text(),
    ).toBe('0');
    const blank = mount(PlinthNavListItem, { props: { href: ' ', count: ' ' } });
    expect(blank.attributes('href')).toBeUndefined();
    expect(blank.find('.plinth-nav-list-count').exists()).toBe(false);
  });

  it('escapes the label and the count', () => {
    const wrapper = mount(PlinthNavListItem, {
      props: { href: '/a', count: '<b>1</b>' },
      slots: { default: () => '<b>x</b>' },
    });

    expect(wrapper.html()).not.toContain('<b>');
  });

  it('passes extra attributes to its link, and the project wins a clash', () => {
    const wrapper = mount(PlinthNavListItem, {
      props: { href: '/a', current: true },
      attrs: { class: 'is-new', 'aria-current': 'location', 'data-testid': 'a' },
    });

    expect(wrapper.classes()).toEqual(['plinth-nav-list-item', 'is-new']);
    expect(wrapper.attributes('aria-current')).toBe('location');
    expect(wrapper.attributes('data-testid')).toBe('a');
  });
});
