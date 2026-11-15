import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthAppShell } from '../src/index.ts';

describe('PlinthAppShell', () => {
  it('prints the nav, the bar and the page in a main', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppShell nav={<nav>nav</nav>} bar={<header>bar</header>}>
          <p>page</p>
        </PlinthAppShell>,
      ),
    ).toBe(
      '<div class="plinth-app-shell">' +
        '<div class="plinth-app-shell-nav"><nav>nav</nav></div>' +
        '<div class="plinth-app-shell-bar"><header>bar</header></div>' +
        '<main class="plinth-app-shell-main"><p>page</p></main>' +
        '</div>',
    );
  });

  it('prints only the main without a nav or a bar', () => {
    expect(renderToStaticMarkup(<PlinthAppShell nav={null} bar=" " />)).toBe(
      '<div class="plinth-app-shell"><main class="plinth-app-shell-main"></main></div>',
    );
  });

  it('prints the section column with its title and ids', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppShell
          nav={<nav>nav</nav>}
          section={<nav aria-labelledby="settings-title">links</nav>}
          sectionTitle="Settings & more"
          sectionId="settings"
          bar={<header>bar</header>}
        >
          <p>page</p>
        </PlinthAppShell>,
      ),
    ).toBe(
      '<div class="plinth-app-shell">' +
        '<div class="plinth-app-shell-nav"><nav>nav</nav></div>' +
        '<div class="plinth-app-shell-section" id="settings">' +
        '<div class="plinth-app-shell-section-header">' +
        '<p class="plinth-app-shell-section-title" id="settings-title">Settings &amp; more</p>' +
        '</div>' +
        '<div class="plinth-app-shell-section-body"><nav aria-labelledby="settings-title">links</nav></div>' +
        '</div>' +
        '<div class="plinth-app-shell-bar"><header>bar</header></div>' +
        '<main class="plinth-app-shell-main"><p>page</p></main>' +
        '</div>',
    );
  });

  it('prints the section column without a header or ids when it has no title or id', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppShell
          section={<nav aria-label="Settings">links</nav>}
          sectionTitle=""
          sectionId=""
        />,
      ),
    ).toBe(
      '<div class="plinth-app-shell">' +
        '<div class="plinth-app-shell-section">' +
        '<div class="plinth-app-shell-section-body"><nav aria-label="Settings">links</nav></div>' +
        '</div>' +
        '<main class="plinth-app-shell-main"></main>' +
        '</div>',
    );
  });

  it('prints the title without an id when the section has none', () => {
    expect(
      renderToStaticMarkup(<PlinthAppShell section={<nav>links</nav>} sectionTitle="Settings" />),
    ).toBe(
      '<div class="plinth-app-shell">' +
        '<div class="plinth-app-shell-section">' +
        '<div class="plinth-app-shell-section-header">' +
        '<p class="plinth-app-shell-section-title">Settings</p>' +
        '</div>' +
        '<div class="plinth-app-shell-section-body"><nav>links</nav></div>' +
        '</div>' +
        '<main class="plinth-app-shell-main"></main>' +
        '</div>',
    );
  });

  it('collapses the section column with sectionClosed', () => {
    expect(
      renderToStaticMarkup(<PlinthAppShell sectionClosed section={<nav>links</nav>} />),
    ).toMatch(/^<div data-section="closed" class="plinth-app-shell">/);
  });

  it('prints no section column for a blank section', () => {
    expect(renderToStaticMarkup(<PlinthAppShell section=" " sectionTitle="Settings" />)).toBe(
      '<div class="plinth-app-shell"><main class="plinth-app-shell-main"></main></div>',
    );
  });

  it('lets a clashing attribute win', () => {
    expect(renderToStaticMarkup(<PlinthAppShell sectionClosed data-section="open" />)).toBe(
      '<div data-section="open" class="plinth-app-shell"><main class="plinth-app-shell-main"></main></div>',
    );
  });

  it('spreads other props onto its root, with the ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthAppShell ref={ref} className="is-wide" id="app" data-theme="dark" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(ref.current).toBe(root);
    expect(root.className).toBe('plinth-app-shell is-wide');
    expect(root.id).toBe('app');
    expect(root.dataset.theme).toBe('dark');
  });
});
