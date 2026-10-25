import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthAppBar, PlinthAppBarSearch } from '../src/index.ts';

const squish = (html: string) => html.replace(/>\s+</g, '><').trim();

describe('PlinthAppBar', () => {
  it('prints the search, the actions and the account', () => {
    const wrapper = mount(PlinthAppBar, {
      slots: {
        default: '<button>search</button>',
        actions: '<button>help</button>',
        account: '<button>account</button>',
      },
    });

    expect(squish(wrapper.html())).toBe(
      '<header class="plinth-app-bar">' +
        '<div class="plinth-app-bar-start"><button>search</button></div>' +
        '<div class="plinth-app-bar-actions"><button>help</button></div>' +
        '<div class="plinth-app-bar-account"><button>account</button></div>' +
        '</header>',
    );
  });

  it('prints only the parts that have content', () => {
    const wrapper = mount(PlinthAppBar, {
      slots: { default: () => ' ', actions: () => [], account: '<i>me</i>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<header class="plinth-app-bar"><!--v-if--><!--v-if--><div class="plinth-app-bar-account"><i>me</i></div></header>',
    );
  });

  it('lets attributes fall through to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthAppBar, { attrs: { class: 'is-raised', role: 'toolbar' } });

    expect(wrapper.classes()).toEqual(['plinth-app-bar', 'is-raised']);
    expect(wrapper.attributes('role')).toBe('toolbar');
  });
});

describe('PlinthAppBarSearch', () => {
  it('prints a search button with its icon, label and shortcut', () => {
    const wrapper = mount(PlinthAppBarSearch, { props: { shortcut: '⌘K' } });

    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.classes()).toEqual(['plinth-app-bar-search']);
    expect(wrapper.find('.plinth-icon').attributes()).toMatchObject({
      'data-icon': 'search',
      'data-size': 'sm',
      'aria-hidden': 'true',
    });
    expect(wrapper.find('.plinth-app-bar-search-label').text()).toBe('Search');
    expect(wrapper.find('kbd').html()).toBe(
      '<kbd class="plinth-app-bar-search-shortcut" aria-hidden="true">⌘K</kbd>',
    );
  });

  it('takes its own label, and prints no hint without a shortcut', () => {
    const wrapper = mount(PlinthAppBarSearch, { props: { label: 'Find a ticket', shortcut: ' ' } });

    expect(wrapper.find('.plinth-app-bar-search-label').text()).toBe('Find a ticket');
    expect(wrapper.find('kbd').exists()).toBe(false);
  });

  it('needs a label', () => {
    expect(() => mount(PlinthAppBarSearch, { props: { label: ' ' } })).toThrow('needs a label');
  });

  it('escapes the label and the shortcut', () => {
    const wrapper = mount(PlinthAppBarSearch, {
      props: { label: '<b>x</b>', shortcut: '<b>K</b>' },
    });

    expect(wrapper.html()).not.toContain('<b>');
    expect(wrapper.find('.plinth-app-bar-search-label').html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('lets attributes fall through to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthAppBarSearch, {
      attrs: { class: 'is-wide', type: 'submit', 'aria-keyshortcuts': 'Control+K' },
    });

    expect(wrapper.classes()).toEqual(['plinth-app-bar-search', 'is-wide']);
    expect(wrapper.attributes('type')).toBe('submit');
    expect(wrapper.attributes('aria-keyshortcuts')).toBe('Control+K');
  });
});
