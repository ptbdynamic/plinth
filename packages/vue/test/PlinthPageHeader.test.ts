import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import { PlinthPageHeader, pageHeaderLevel, pageHeaderLevels } from '../src/index.ts';
import type { PageHeaderLevel } from '../src/page-header.ts';

describe('PlinthPageHeader', () => {
  it('prints the page header, the leading action, the heading and the actions', () => {
    const wrapper = mount(PlinthPageHeader, {
      props: { heading: 'Inbox' },
      slots: {
        leading: '<a href="/">Back</a>',
        actions: '<button type="button">Search</button>',
      },
    });

    expect(wrapper.html().replace(/\n\s*/g, '')).toBe(
      '<header class="plinth-page-header">' +
        '<div class="plinth-page-header-leading"><a href="/">Back</a></div>' +
        '<h1 class="plinth-page-header-heading">Inbox</h1>' +
        '<div class="plinth-page-header-actions"><button type="button">Search</button></div>' +
        '</header>',
    );
  });

  it('prints only the heading without a leading action or actions', () => {
    const wrapper = mount(PlinthPageHeader, { props: { heading: 'Settings' } });

    expect(wrapper.html().replace(/\n\s*|<!--v-if-->/g, '')).toBe(
      '<header class="plinth-page-header"><h1 class="plinth-page-header-heading">Settings</h1></header>',
    );
  });

  it('leaves out slots that render nothing', () => {
    const wrapper = mount(PlinthPageHeader, {
      props: { heading: 'Settings' },
      slots: { leading: () => '  ', actions: () => [] },
    });

    expect(wrapper.find('.plinth-page-header-leading').exists()).toBe(false);
    expect(wrapper.find('.plinth-page-header-actions').exists()).toBe(false);
  });

  it('prints the heading at the level asked for, and h1 for one it does not know', () => {
    const tag = (level?: string) =>
      mount(PlinthPageHeader, {
        props: { heading: 'Ticket', level: level as PageHeaderLevel },
      }).find('.plinth-page-header-heading').element.tagName;

    expect(tag('h2')).toBe('H2');
    expect(tag('h6')).toBe('H6');
    expect(tag('h7')).toBe('H1');
    expect(tag()).toBe('H1');
    expect(pageHeaderLevels).toEqual(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
    expect(pageHeaderLevel(undefined)).toBe('h1');
  });

  it("marks the screen's top bar with data-top", () => {
    expect(
      mount(PlinthPageHeader, { props: { heading: 'Inbox', top: true } }).attributes('data-top'),
    ).toBe('');
    expect(
      mount(PlinthPageHeader, { props: { heading: 'Inbox' } }).attributes('data-top'),
    ).toBeUndefined();
  });

  it('needs a heading', () => {
    expect(() => mount(PlinthPageHeader, { props: { heading: ' ' } })).toThrow('needs a heading');
    expect(() => mount(PlinthPageHeader, { props: {} as { heading: string } })).toThrow(
      'needs a heading',
    );
  });

  it('escapes the heading', () => {
    const wrapper = mount(PlinthPageHeader, { props: { heading: '<b>x</b>' } });

    expect(wrapper.find('h1').html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes and attributes on the root, the title attribute too', () => {
    const wrapper = mount(PlinthPageHeader, {
      props: { heading: 'Inbox' },
      attrs: {
        class: 'app-header',
        title: 'Your inbox',
        id: 'top',
        'data-testid': 'header',
        'aria-label': 'Inbox',
      },
      slots: { actions: () => h('button', { type: 'button' }, 'Search') },
    });

    expect(wrapper.element.tagName).toBe('HEADER');
    expect(wrapper.classes()).toEqual(['plinth-page-header', 'app-header']);
    expect(wrapper.attributes()).toMatchObject({
      title: 'Your inbox',
      id: 'top',
      'data-testid': 'header',
      'aria-label': 'Inbox',
    });
  });

  it("lets the project's data-top win over its own", () => {
    const wrapper = mount(PlinthPageHeader, {
      props: { heading: 'Inbox', top: true },
      attrs: { 'data-top': 'notch' },
    });

    expect(wrapper.attributes('data-top')).toBe('notch');
  });
});
