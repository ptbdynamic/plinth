import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthAppNav, PlinthAppNavItem } from '../src/index.ts';

describe('PlinthAppNav', () => {
  it('prints a named nav with its brand, items and footer', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppNav
          label="Main"
          brandName="Harbour"
          brandHref="/"
          mark={<svg />}
          footer={<i>footer</i>}
        >
          <i>items</i>
        </PlinthAppNav>,
      ),
    ).toBe(
      '<nav aria-label="Main" class="plinth-app-nav">' +
        '<a class="plinth-app-nav-brand" href="/"><span class="plinth-app-nav-mark" aria-hidden="true"><svg></svg></span><span class="plinth-app-nav-name">Harbour</span></a>' +
        '<div class="plinth-app-nav-items"><i>items</i></div>' +
        '<div class="plinth-app-nav-footer"><i>footer</i></div>' +
        '</nav>',
    );
  });

  it('prints only the items without a brand, a footer or a label', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppNav label=" " brandName=" " mark={null} footer=" ">
          <i>items</i>
        </PlinthAppNav>,
      ),
    ).toBe(
      '<nav class="plinth-app-nav"><div class="plinth-app-nav-items"><i>items</i></div></nav>',
    );
  });

  it('makes the brand a div without an href', () => {
    expect(renderToStaticMarkup(<PlinthAppNav brandName="Harbour" brandHref=" " />)).toContain(
      '<div class="plinth-app-nav-brand"><span class="plinth-app-nav-name">Harbour</span></div>',
    );
  });

  it('leaves a mark alone to name the brand', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppNav brandHref="/" mark={<img src="/logo.svg" alt="Harbour" />} />,
      ),
    ).toContain(
      '<a class="plinth-app-nav-brand" href="/"><span class="plinth-app-nav-mark"><img src="/logo.svg" alt="Harbour"/></span></a>',
    );
  });

  it('escapes the brand name', () => {
    expect(renderToStaticMarkup(<PlinthAppNav brandName="<b>x</b>" />)).toContain(
      '&lt;b&gt;x&lt;/b&gt;',
    );
  });

  it('keeps extra classes, attributes and the ref on its root; the project wins a clash', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <PlinthAppNav
        ref={ref}
        label="Main"
        className="is-wide"
        aria-label="App"
        data-testid="nav"
      />,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-app-nav is-wide');
    expect(root.getAttribute('aria-label')).toBe('App');
    expect(root.getAttribute('data-testid')).toBe('nav');
    expect(ref.current).toBe(root);
  });
});

describe('PlinthAppNavItem', () => {
  it('prints a link with its icon, label and count', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppNavItem href="/support" count={12} icon={<svg />}>
          Support
        </PlinthAppNavItem>,
      ),
    ).toBe(
      '<a href="/support" class="plinth-app-nav-item"><span class="plinth-app-nav-icon" aria-hidden="true"><svg></svg></span><span class="plinth-app-nav-label">Support</span><span class="plinth-app-nav-count">12</span></a>',
    );
  });

  it('marks the current page', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppNavItem href="/content" current>
          Content
        </PlinthAppNavItem>,
      ),
    ).toContain('aria-current="page"');
  });

  it('prints a zero count, and leaves out a blank one, a blank icon and a blank href', () => {
    expect(renderToStaticMarkup(<PlinthAppNavItem href="/a" count={0} />)).toContain(
      '<span class="plinth-app-nav-count">0</span>',
    );
    expect(
      renderToStaticMarkup(
        <PlinthAppNavItem href=" " count=" " icon={false}>
          A
        </PlinthAppNavItem>,
      ),
    ).toBe('<a class="plinth-app-nav-item"><span class="plinth-app-nav-label">A</span></a>');
    expect(renderToStaticMarkup(<PlinthAppNavItem count={null}>A</PlinthAppNavItem>)).toBe(
      '<a class="plinth-app-nav-item"><span class="plinth-app-nav-label">A</span></a>',
    );
  });

  it('escapes the label and the count', () => {
    const html = renderToStaticMarkup(
      <PlinthAppNavItem href="/a" count="<b>1</b>">
        {'<b>x</b>'}
      </PlinthAppNavItem>,
    );

    expect(html).not.toContain('<b>');
  });

  it('keeps extra classes, attributes and the ref on its link; the project wins a clash', () => {
    const ref = createRef<HTMLAnchorElement>();
    const { container } = render(
      <PlinthAppNavItem
        ref={ref}
        href="/a"
        current
        className="is-new"
        aria-current="location"
        data-testid="a"
      >
        A
      </PlinthAppNavItem>,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-app-nav-item is-new');
    expect(root.getAttribute('aria-current')).toBe('location');
    expect(root.getAttribute('data-testid')).toBe('a');
    expect(ref.current).toBe(root);
  });
});
