import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import {
  PlinthMenu,
  PlinthMenuGroup,
  PlinthMenuItem,
  PlinthMenuSeparator,
  menuItemTone,
  menuItemTones,
} from '../src/index.ts';

const html = (wrapper: { html: () => string }) =>
  wrapper
    .html()
    .replace(/\n\s*/g, '')
    .replace(/<!--.*?-->/g, '');

describe('PlinthMenu', () => {
  it('prints a popover with its id, and its items close it', () => {
    const wrapper = mount(PlinthMenu, {
      props: { id: ' actions ' },
      slots: {
        default: () => [
          h(PlinthMenuItem, null, () => 'Archive'),
          h(PlinthMenuSeparator),
          h(PlinthMenuGroup, { label: 'Move to' }, () => [h(PlinthMenuItem, null, () => 'Inbox')]),
          h(PlinthMenuItem, { href: '/print' }, () => 'Print'),
        ],
      },
    });

    expect(html(wrapper)).toBe(
      '<div id="actions" class="plinth-menu" popover="auto">' +
        '<button class="plinth-menu-item" type="button" commandfor="actions" command="hide-popover"><span class="plinth-menu-label">Archive</span></button>' +
        '<hr class="plinth-menu-separator">' +
        '<div class="plinth-menu-group" role="group" aria-label="Move to"><div class="plinth-menu-heading" aria-hidden="true">Move to</div>' +
        '<button class="plinth-menu-item" type="button" commandfor="actions" command="hide-popover"><span class="plinth-menu-label">Inbox</span></button></div>' +
        '<a class="plinth-menu-item" href="/print"><span class="plinth-menu-label">Print</span></a>' +
        '</div>',
    );
  });

  it('needs an id', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    for (const id of [undefined, '', ' ']) {
      expect(() => mount(PlinthMenu, { props: { id: id as string } })).toThrow('needs an id');
    }
    vi.restoreAllMocks();
  });

  it('passes extra attributes and listeners to its root, and the project wins a clash', () => {
    const onToggle = vi.fn();
    const wrapper = mount(PlinthMenu, {
      props: { id: 'actions' },
      attrs: { class: 'wide', 'data-test': 'menu', popover: 'manual', onToggle },
    });

    expect(wrapper.attributes()).toEqual({
      id: 'actions',
      class: 'plinth-menu wide',
      'data-test': 'menu',
      popover: 'manual',
    });
    wrapper.element.dispatchEvent(new Event('toggle'));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('opens and closes through its exposed methods', () => {
    const wrapper = mount(PlinthMenu, { props: { id: 'actions' } });
    const element = wrapper.element as HTMLElement;
    element.showPopover = vi.fn();
    element.hidePopover = vi.fn();
    const source = document.createElement('button');

    (wrapper.vm as unknown as { showPopover: (o?: object) => void }).showPopover({ source });
    (wrapper.vm as unknown as { hidePopover: () => void }).hidePopover();

    expect(element.showPopover).toHaveBeenCalledWith({ source });
    expect(element.hidePopover).toHaveBeenCalledOnce();
  });
});

describe('PlinthMenuItem', () => {
  it('prints a button with its icon, label and shortcut', () => {
    const wrapper = mount(PlinthMenuItem, {
      props: { shortcut: '⌘D' },
      slots: { default: 'Duplicate', icon: '<svg></svg>' },
    });

    expect(html(wrapper)).toBe(
      '<button class="plinth-menu-item" type="button"><span class="plinth-menu-icon" aria-hidden="true"><svg></svg></span>' +
        '<span class="plinth-menu-label">Duplicate</span><kbd class="plinth-menu-shortcut" aria-hidden="true">⌘D</kbd></button>',
    );
  });

  it('leaves out a blank shortcut and an empty icon, and treats a blank href as missing', () => {
    const wrapper = mount(PlinthMenuItem, {
      props: { shortcut: ' ', href: ' ' },
      slots: { default: 'Duplicate', icon: () => [] },
    });

    expect(html(wrapper)).toBe(
      '<button class="plinth-menu-item" type="button"><span class="plinth-menu-label">Duplicate</span></button>',
    );
  });

  it('closes the menu it names, never as a link', () => {
    expect(mount(PlinthMenuItem, { props: { menu: ' other ' } }).attributes()).toMatchObject({
      commandfor: 'other',
      command: 'hide-popover',
    });
    const link = mount(PlinthMenuItem, { props: { menu: 'other', href: '/print' } });
    expect(link.attributes('commandfor')).toBeUndefined();
    expect(link.attributes('command')).toBeUndefined();
  });

  it('takes the danger tone, and falls back to neutral', () => {
    expect(mount(PlinthMenuItem, { props: { tone: 'danger' } }).attributes('data-tone')).toBe(
      'danger',
    );
    expect(
      mount(PlinthMenuItem, { props: { tone: 'loud' as 'danger' } }).attributes('data-tone'),
    ).toBeUndefined();
    expect(menuItemTones).toEqual(['neutral', 'danger']);
    expect(menuItemTone('danger')).toBe('danger');
    expect(menuItemTone(undefined)).toBe('neutral');
  });

  it('disables a button and a link', () => {
    expect(mount(PlinthMenuItem, { props: { disabled: true } }).attributes()).toHaveProperty(
      'disabled',
    );
    expect(
      mount(PlinthMenuItem, { props: { disabled: true, href: '/print' } }).attributes(),
    ).toEqual({ class: 'plinth-menu-item', role: 'link', 'aria-disabled': 'true' });
  });

  it('escapes the label and the shortcut', () => {
    const wrapper = mount(PlinthMenuItem, {
      props: { shortcut: '<b>x</b>' },
      slots: { default: () => '<b>x</b>' },
    });

    expect(wrapper.find('b').exists()).toBe(false);
    expect(wrapper.text()).toContain('<b>x</b>');
  });

  it('passes extra attributes and listeners, and the project wins a clash', () => {
    const onClick = vi.fn();
    const wrapper = mount(PlinthMenuItem, {
      props: { menu: 'actions' },
      attrs: {
        class: 'extra',
        'aria-keyshortcuts': 'E',
        command: '--archive',
        type: 'submit',
        onClick,
      },
    });

    expect(wrapper.attributes()).toMatchObject({
      class: 'plinth-menu-item extra',
      'aria-keyshortcuts': 'E',
      commandfor: 'actions',
      command: '--archive',
      type: 'submit',
    });
    wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('PlinthMenuGroup and PlinthMenuSeparator', () => {
  it('leaves out a blank label, and escapes one', () => {
    for (const label of [undefined, '', ' ']) {
      expect(html(mount(PlinthMenuGroup, { props: { label }, slots: { default: 'x' } }))).toBe(
        '<div class="plinth-menu-group" role="group">x</div>',
      );
    }
    const wrapper = mount(PlinthMenuGroup, { props: { label: '"><b>x</b>' } });
    expect(wrapper.find('b').exists()).toBe(false);
    expect(wrapper.attributes('aria-label')).toBe('"><b>x</b>');
  });

  it('pass extra attributes to their roots', () => {
    expect(
      mount(PlinthMenuGroup, { attrs: { class: 'extra', role: 'none' } }).attributes(),
    ).toEqual({
      class: 'plinth-menu-group extra',
      role: 'none',
    });
    expect(
      mount(PlinthMenuSeparator, { attrs: { class: 'extra', 'data-test': 'sep' } }).html(),
    ).toBe('<hr class="plinth-menu-separator extra" data-test="sep">');
  });
});
