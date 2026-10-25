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
