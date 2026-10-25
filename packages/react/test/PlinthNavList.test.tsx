import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthNavList, PlinthNavListGroup, PlinthNavListItem } from '../src/index.ts';

describe('PlinthNavList', () => {
  it('prints a named nav with its groups', () => {
    expect(
      renderToStaticMarkup(
        <PlinthNavList label="Folders">
          <i>groups</i>
        </PlinthNavList>,
      ),
    ).toBe('<nav aria-label="Folders" class="plinth-nav-list"><i>groups</i></nav>');
  });

  it('leaves out a missing or blank label', () => {
    expect(renderToStaticMarkup(<PlinthNavList />)).toBe('<nav class="plinth-nav-list"></nav>');
    expect(renderToStaticMarkup(<PlinthNavList label=" " />)).toBe(
      '<nav class="plinth-nav-list"></nav>',
    );
  });

  it('keeps extra classes, attributes and the ref on its root; the project wins a clash', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <PlinthNavList
        ref={ref}
        label="Folders"
        className="is-wide"
        id="folders"
        aria-label="Mail"
      />,
    );
    const root = container.firstElementChild;

    expect(root?.getAttribute('class')).toBe('plinth-nav-list is-wide');
    expect(root?.getAttribute('id')).toBe('folders');
    expect(root?.getAttribute('aria-label')).toBe('Mail');
    expect(ref.current).toBe(root);
  });
});

describe('PlinthNavListGroup', () => {
  it('prints a group with its heading and items', () => {
    expect(
      renderToStaticMarkup(
        <PlinthNavListGroup heading="Views">
          <i>items</i>
        </PlinthNavListGroup>,
      ),
    ).toBe(
      '<div class="plinth-nav-list-group"><h2 class="plinth-nav-list-heading">Views</h2><i>items</i></div>',
    );
  });

  it('leaves out a missing or blank heading', () => {
    expect(renderToStaticMarkup(<PlinthNavListGroup />)).toBe(
      '<div class="plinth-nav-list-group"></div>',
    );
    expect(renderToStaticMarkup(<PlinthNavListGroup heading=" " />)).toBe(
      '<div class="plinth-nav-list-group"></div>',
    );
  });

  it('takes a heading level and falls back to h2', () => {
    expect(
      renderToStaticMarkup(<PlinthNavListGroup heading="Views" headingLevel="h4" />),
    ).toContain('<h4 class="plinth-nav-list-heading">Views</h4>');
    expect(
      renderToStaticMarkup(<PlinthNavListGroup heading="Views" headingLevel={'h1' as 'h2'} />),
    ).toContain('<h2 class="plinth-nav-list-heading">Views</h2>');
  });

  it('escapes the heading', () => {
    expect(renderToStaticMarkup(<PlinthNavListGroup heading="<b>x</b>" />)).not.toContain('<b>');
  });

  it('keeps extra classes, attributes and the ref on its root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthNavListGroup ref={ref} className="is-pinned" data-testid="views" />,
    );
    const root = container.firstElementChild;

    expect(root?.getAttribute('class')).toBe('plinth-nav-list-group is-pinned');
    expect(root?.getAttribute('data-testid')).toBe('views');
    expect(ref.current).toBe(root);
  });
});

describe('PlinthNavListItem', () => {
  it('prints a link with its label and count', () => {
    expect(
      renderToStaticMarkup(
        <PlinthNavListItem href="/open" count={12}>
          Open
        </PlinthNavListItem>,
      ),
    ).toBe(
      '<a href="/open" class="plinth-nav-list-item"><span class="plinth-nav-list-label">Open</span><span class="plinth-nav-list-count">12</span></a>',
    );
  });

  it('marks the current view', () => {
    expect(
      renderToStaticMarkup(
        <PlinthNavListItem href="/open" current>
          Open
        </PlinthNavListItem>,
      ),
    ).toBe(
      '<a href="/open" aria-current="page" class="plinth-nav-list-item"><span class="plinth-nav-list-label">Open</span></a>',
    );
  });

  it('prints a zero count, and leaves out a blank one and a blank href', () => {
    expect(renderToStaticMarkup(<PlinthNavListItem href="/a" count={0} />)).toContain(
      '<span class="plinth-nav-list-count">0</span>',
    );
    expect(renderToStaticMarkup(<PlinthNavListItem href=" " count=" " />)).toBe(
      '<a class="plinth-nav-list-item"><span class="plinth-nav-list-label"></span></a>',
    );
  });

  it('escapes the label and the count', () => {
    expect(
      renderToStaticMarkup(
        <PlinthNavListItem href="/a" count="<b>1</b>">
          {'<b>x</b>'}
        </PlinthNavListItem>,
      ),
    ).not.toContain('<b>');
  });

  it('keeps extra classes, attributes and the ref on its link; the project wins a clash', () => {
    const ref = createRef<HTMLAnchorElement>();
    const { container } = render(
      <PlinthNavListItem ref={ref} href="/a" current className="is-new" aria-current="location">
        A
      </PlinthNavListItem>,
    );
    const root = container.firstElementChild;

    expect(root?.getAttribute('class')).toBe('plinth-nav-list-item is-new');
    expect(root?.getAttribute('aria-current')).toBe('location');
    expect(ref.current).toBe(root);
  });
});
