import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthAppShell } from '../src/index.ts';

const squish = (html: string) => html.replace(/>\s+</g, '><').trim();

describe('PlinthAppShell', () => {
  it('prints the nav, the bar and the page in a main', () => {
    const wrapper = mount(PlinthAppShell, {
      slots: { nav: '<nav>nav</nav>', bar: '<header>bar</header>', default: '<p>page</p>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-app-shell">' +
        '<div class="plinth-app-shell-nav"><nav>nav</nav></div><!--v-if-->' +
        '<div class="plinth-app-shell-bar"><header>bar</header></div>' +
        '<main class="plinth-app-shell-main"><p>page</p></main>' +
        '</div>',
    );
  });

  it('prints only the main without a nav or a bar', () => {
    const wrapper = mount(PlinthAppShell, {
      slots: { nav: () => [], section: () => [], bar: () => ' ' },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-app-shell"><!--v-if--><!--v-if--><!--v-if--><main class="plinth-app-shell-main"></main></div>',
    );
  });

  it('prints the section column with its title and ids', () => {
    const wrapper = mount(PlinthAppShell, {
      props: { sectionTitle: 'Settings & more', sectionId: 'settings' },
      slots: {
        nav: '<nav>nav</nav>',
        section: '<nav aria-labelledby="settings-title">links</nav>',
        bar: '<header>bar</header>',
        default: '<p>page</p>',
      },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-app-shell">' +
        '<div class="plinth-app-shell-nav"><nav>nav</nav></div>' +
        '<div id="settings" class="plinth-app-shell-section">' +
        '<div class="plinth-app-shell-section-header">' +
        '<p id="settings-title" class="plinth-app-shell-section-title">Settings &amp; more</p>' +
        '</div>' +
        '<div class="plinth-app-shell-section-body"><nav aria-labelledby="settings-title">links</nav></div>' +
        '</div>' +
        '<div class="plinth-app-shell-bar"><header>bar</header></div>' +
        '<main class="plinth-app-shell-main"><p>page</p></main>' +
        '</div>',
    );
  });

  it('prints the section column without a header or ids when it has no title or id', () => {
    const wrapper = mount(PlinthAppShell, {
      props: { sectionTitle: '', sectionId: '' },
      slots: { section: '<nav aria-label="Settings">links</nav>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-app-shell"><!--v-if-->' +
        '<div class="plinth-app-shell-section"><!--v-if-->' +
        '<div class="plinth-app-shell-section-body"><nav aria-label="Settings">links</nav></div>' +
        '</div>' +
        '<!--v-if--><main class="plinth-app-shell-main"></main></div>',
    );
  });

  it('prints the title without an id when the section has none', () => {
    const wrapper = mount(PlinthAppShell, {
      props: { sectionTitle: 'Settings' },
      slots: { section: '<nav aria-label="Settings">links</nav>' },
    });

    expect(wrapper.find('.plinth-app-shell-section').attributes('id')).toBeUndefined();
    expect(wrapper.find('.plinth-app-shell-section-title').html()).toBe(
      '<p class="plinth-app-shell-section-title">Settings</p>',
    );
  });

  it('collapses the section column with sectionClosed', () => {
    const wrapper = mount(PlinthAppShell, {
      props: { sectionClosed: true },
      slots: { section: '<nav>links</nav>' },
    });

    expect(wrapper.attributes('data-section')).toBe('closed');
  });

  it('prints no section column for a blank section', () => {
    const wrapper = mount(PlinthAppShell, {
      props: { sectionTitle: 'Settings' },
      slots: { section: () => ' ' },
    });

    expect(wrapper.find('.plinth-app-shell-section').exists()).toBe(false);
  });

  it('lets a clashing attribute win', () => {
    const wrapper = mount(PlinthAppShell, {
      props: { sectionClosed: true },
      attrs: { 'data-section': 'open' },
    });

    expect(wrapper.attributes('data-section')).toBe('open');
  });

  it('lets attributes fall through to its root', () => {
    const wrapper = mount(PlinthAppShell, {
      attrs: { class: 'is-wide', id: 'app', 'data-theme': 'dark' },
    });

    expect(wrapper.classes()).toEqual(['plinth-app-shell', 'is-wide']);
    expect(wrapper.attributes('id')).toBe('app');
    expect(wrapper.attributes('data-theme')).toBe('dark');
  });
});
