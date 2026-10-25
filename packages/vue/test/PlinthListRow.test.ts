import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { listRowChevron, PlinthListRow } from '../src/index.ts';

const squish = (html: string) => html.replace(/<!--.*?-->/g, '').replace(/>\s+</g, '><');

describe('PlinthListRow', () => {
  it('prints a static row with its title', () => {
    const wrapper = mount(PlinthListRow, { slots: { default: 'Notifications' } });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-list-row"><span class="plinth-list-row-content"><span class="plinth-list-row-title">Notifications</span></span></div>',
    );
  });

  it('prints the description, the leading and the trailing slot', () => {
    const wrapper = mount(PlinthListRow, {
      props: { description: 'Email and push' },
      slots: { default: 'Notifications', leading: '<i>bell</i>', trailing: 'On' },
    });

    expect(wrapper.get('.plinth-list-row-leading').html()).toContain('<i>bell</i>');
    expect(wrapper.get('.plinth-list-row-description').text()).toBe('Email and push');
    expect(wrapper.get('.plinth-list-row-trailing').text()).toBe('On');
  });

  it('prints the chevron in the trailing slot', () => {
    const wrapper = mount(PlinthListRow, {
      props: { chevron: true },
      slots: { default: 'Language' },
    });

    expect(squish(wrapper.get('.plinth-list-row-trailing').html())).toBe(
      `<span class="plinth-list-row-trailing">${listRowChevron.replace('data-mirror', 'data-mirror=""')}</span>`,
    );
  });

  it('is a link with an href, and a button with button', () => {
    const link = mount(PlinthListRow, { props: { href: '/language', button: true } });
    expect(link.element.tagName).toBe('A');
    expect(link.attributes('href')).toBe('/language');
    expect(link.attributes('type')).toBeUndefined();

    const button = mount(PlinthListRow, { props: { button: true } });
    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('href')).toBeUndefined();
  });

  it('marks the current row', () => {
    expect(
      mount(PlinthListRow, { props: { href: '/', current: true } }).attributes('aria-current'),
    ).toBe('page');
    expect(mount(PlinthListRow, { props: { current: true } }).attributes('aria-current')).toBe(
      'page',
    );
    expect(
      mount(PlinthListRow, { props: { button: true, current: true } }).attributes('aria-current'),
    ).toBeUndefined();
    expect(mount(PlinthListRow).attributes('aria-current')).toBeUndefined();
  });

  it('disables a button, a link, and leaves a static row alone', () => {
    const button = mount(PlinthListRow, { props: { button: true, disabled: true } });
    expect(button.attributes('disabled')).toBe('');

    const link = mount(PlinthListRow, { props: { href: '/billing', disabled: true } });
    expect(link.attributes()).toMatchObject({ role: 'link', 'aria-disabled': 'true' });
    expect(link.attributes('href')).toBeUndefined();

    const row = mount(PlinthListRow, { props: { disabled: true } });
    expect(row.attributes()).toEqual({ class: 'plinth-list-row' });
  });

  it('escapes the title and the description', () => {
    const wrapper = mount(PlinthListRow, {
      props: { description: '<b>y</b>' },
      slots: { default: () => '<b>x</b>' },
    });

    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(wrapper.html()).toContain('&lt;b&gt;y&lt;/b&gt;');
  });

  it('passes extra attributes and listeners to its root', async () => {
    let clicks = 0;
    const wrapper = mount(PlinthListRow, {
      props: { button: true },
      attrs: { class: 'ms-2', id: 'sign-out', type: 'submit', onClick: () => clicks++ },
    });

    expect(wrapper.classes()).toEqual(['plinth-list-row', 'ms-2']);
    expect(wrapper.attributes()).toMatchObject({ id: 'sign-out', type: 'submit' });
    await wrapper.trigger('click');
    expect(clicks).toBe(1);
  });

  it('is a label with a checkbox while selecting, and never navigates', () => {
    const wrapper = mount(PlinthListRow, {
      props: { href: '/tickets/1', chevron: true, selectable: true, name: 'tickets[]', value: '1' },
      slots: { default: 'Cannot export', leading: '<i>avatar</i>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<label class="plinth-list-row"><span class="plinth-list-row-leading"><input type="checkbox" class="plinth-list-row-checkbox" name="tickets[]" value="1"></span><span class="plinth-list-row-content"><span class="plinth-list-row-title">Cannot export</span></span></label>',
    );
    const checkbox = wrapper.get('input').element as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
  });

  it('checks a selected row, disables it, and emits the change', async () => {
    const wrapper = mount(PlinthListRow, {
      props: { selectable: true, selected: true, disabled: true, current: true },
      slots: { default: 'Ticket' },
    });
    const checkbox = wrapper.get('input');

    expect(wrapper.attributes('aria-current')).toBe('page');
    expect((checkbox.element as HTMLInputElement).checked).toBe(true);
    expect((checkbox.element as HTMLInputElement).disabled).toBe(true);
    expect(checkbox.attributes('name')).toBeUndefined();
    expect(checkbox.attributes('value')).toBeUndefined();

    const enabled = mount(PlinthListRow, {
      props: { selectable: true, selected: true },
      slots: { default: 'Ticket' },
    });
    await enabled.get('input').setValue(false);
    expect(enabled.emitted('update:selected')).toEqual([[false]]);
  });

  it('keeps name and value on the root of a row that is not selectable', () => {
    const wrapper = mount(PlinthListRow, {
      props: { button: true, name: 'action', value: 'archive' },
      attrs: { type: 'submit' },
      slots: { default: 'Archive' },
    });

    expect(wrapper.attributes()).toMatchObject({
      type: 'submit',
      name: 'action',
      value: 'archive',
    });
  });
});
