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
        '<div class="plinth-app-shell-nav"><nav>nav</nav></div>' +
        '<div class="plinth-app-shell-bar"><header>bar</header></div>' +
        '<main class="plinth-app-shell-main"><p>page</p></main>' +
        '</div>',
    );
  });

  it('prints only the main without a nav or a bar', () => {
    const wrapper = mount(PlinthAppShell, { slots: { nav: () => [], bar: () => ' ' } });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-app-shell"><!--v-if--><!--v-if--><main class="plinth-app-shell-main"></main></div>',
    );
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
