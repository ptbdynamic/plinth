import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthListHeader } from '../src/index.ts';

const squish = (html: string) => html.replace(/<!--.*?-->/g, '').replace(/>\s+</g, '><');

describe('PlinthListHeader', () => {
  it('prints the list header markup contract', () => {
    const wrapper = mount(PlinthListHeader, { props: { heading: 'Open', count: 12 } });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-list-header"><h2 class="plinth-list-header-heading"><span class="plinth-list-header-title">Open</span><span class="plinth-list-header-count">12</span></h2><p class="plinth-list-header-selection" role="status"></p></div>',
    );
  });

  it('prints the actions, and leaves out an empty slot', () => {
    const full = mount(PlinthListHeader, {
      props: { heading: 'Open' },
      slots: { actions: '<button type="button">Sort</button>' },
    });
    expect(full.get('.plinth-list-header-actions').html()).toContain('Sort');

    const empty = mount(PlinthListHeader, { props: { heading: 'Open' }, slots: { actions: ' ' } });
    expect(empty.find('.plinth-list-header-actions').exists()).toBe(false);
  });

  it('leaves out a blank count, and keeps a count of 0', () => {
    expect(
      mount(PlinthListHeader, { props: { heading: 'Open', count: ' ' } })
        .find('.plinth-list-header-count')
        .exists(),
    ).toBe(false);
    expect(
      mount(PlinthListHeader, { props: { heading: 'Spam', count: 0 } })
        .get('.plinth-list-header-count')
        .text(),
    ).toBe('0');
  });

  it('says how many are selected while selecting', () => {
    const wrapper = mount(PlinthListHeader, {
      props: { heading: 'Open', selection: '2 selected' },
    });
    expect(wrapper.classes()).toEqual(['plinth-list-header', 'is-selecting']);
    expect(wrapper.get('[role="status"]').text()).toBe('2 selected');

    const blank = mount(PlinthListHeader, { props: { heading: 'Open', selection: ' ' } });
    expect(blank.classes()).toEqual(['plinth-list-header']);
    expect(blank.get('[role="status"]').text()).toBe('');
  });

  it('takes a heading level, and falls back to h2', () => {
    expect(
      mount(PlinthListHeader, { props: { heading: 'Open', headingLevel: 'h4' } })
        .find('h4')
        .exists(),
    ).toBe(true);
    expect(
      mount(PlinthListHeader, {
        props: { heading: 'Open', headingLevel: 'h1' as 'h2' },
      })
        .find('h2')
        .exists(),
    ).toBe(true);
  });

  it('needs a heading', () => {
    expect(() => mount(PlinthListHeader, { props: { heading: ' ' } })).toThrow('needs a heading');
  });

  it('escapes the text', () => {
    const wrapper = mount(PlinthListHeader, {
      props: { heading: '<b>x</b>', count: '<b>x</b>', selection: '<b>x</b>' },
    });

    expect(wrapper.html()).not.toContain('<b>');
    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes and attributes', () => {
    const wrapper = mount(PlinthListHeader, {
      props: { heading: 'Open' },
      attrs: { class: 'mb-4', id: 'open' },
    });

    expect(wrapper.classes()).toEqual(['plinth-list-header', 'mb-4']);
    expect(wrapper.attributes('id')).toBe('open');
  });
});
