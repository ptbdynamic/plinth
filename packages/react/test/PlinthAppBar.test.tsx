import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthAppBar, PlinthAppBarSearch } from '../src/index.ts';

describe('PlinthAppBar', () => {
  it('prints the search, the actions and the account', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppBar actions={<button>help</button>} account={<button>account</button>}>
          <button>search</button>
        </PlinthAppBar>,
      ),
    ).toBe(
      '<header class="plinth-app-bar">' +
        '<div class="plinth-app-bar-start"><button>search</button></div>' +
        '<div class="plinth-app-bar-actions"><button>help</button></div>' +
        '<div class="plinth-app-bar-account"><button>account</button></div>' +
        '</header>',
    );
  });

  it('prints only the parts that have content', () => {
    expect(
      renderToStaticMarkup(
        <PlinthAppBar actions={null} account={<i>me</i>}>
          {' '}
        </PlinthAppBar>,
      ),
    ).toBe(
      '<header class="plinth-app-bar"><div class="plinth-app-bar-account"><i>me</i></div></header>',
    );
  });

  it('spreads other props onto its root, with the ref', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(<PlinthAppBar ref={ref} className="is-raised" role="toolbar" />);
    const root = container.firstElementChild as HTMLElement;

    expect(ref.current).toBe(root);
    expect(root.className).toBe('plinth-app-bar is-raised');
    expect(root.getAttribute('role')).toBe('toolbar');
  });
});

describe('PlinthAppBarSearch', () => {
  it('prints a search button with its icon, label and shortcut', () => {
    const html = renderToStaticMarkup(<PlinthAppBarSearch shortcut="⌘K" />);

    expect(html).toMatch(
      /^<button type="button" class="plinth-app-bar-search"><span class="plinth-icon" data-size="sm" data-icon="search" aria-hidden="true"><svg/,
    );
    expect(html).toMatch(
      /<span class="plinth-app-bar-search-label">Search<\/span><kbd class="plinth-app-bar-search-shortcut" aria-hidden="true">⌘K<\/kbd><\/button>$/,
    );
  });

  it('takes its own label, and prints no hint without a shortcut', () => {
    const html = renderToStaticMarkup(<PlinthAppBarSearch label="Find a ticket" shortcut=" " />);

    expect(html).toMatch(
      /<span class="plinth-app-bar-search-label">Find a ticket<\/span><\/button>$/,
    );
  });

  it('needs a label', () => {
    expect(() => renderToStaticMarkup(<PlinthAppBarSearch label=" " />)).toThrow('needs a label');
  });

  it('escapes the label and the shortcut', () => {
    const html = renderToStaticMarkup(<PlinthAppBarSearch label="<b>x</b>" shortcut="<b>K</b>" />);

    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('spreads other props onto its root, with the ref, and the project wins a clash', () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    const { container } = render(
      <PlinthAppBarSearch
        ref={ref}
        className="is-wide"
        type="submit"
        aria-keyshortcuts="Control+K"
        onClick={onClick}
      />,
    );
    const root = container.firstElementChild as HTMLButtonElement;
    root.click();

    expect(ref.current).toBe(root);
    expect(root.className).toBe('plinth-app-bar-search is-wide');
    expect(root.type).toBe('submit');
    expect(root.getAttribute('aria-keyshortcuts')).toBe('Control+K');
    expect(onClick).toHaveBeenCalledOnce();
  });
});
