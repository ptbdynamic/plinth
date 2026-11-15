import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import {
  PlinthBreadcrumbs,
  PlinthBreadcrumbsItem,
  PlinthBreadcrumbsMore,
  type BreadcrumbsCollapse,
} from '../src/index.ts';

const root = (element: ReactElement) => render(element).container.firstElementChild!;

describe('PlinthBreadcrumbs', () => {
  it('prints a nav named Breadcrumb around an ordered list of its items', () => {
    expect(
      renderToStaticMarkup(
        <PlinthBreadcrumbs>
          <PlinthBreadcrumbsItem href="/settings">Settings</PlinthBreadcrumbsItem>
          <PlinthBreadcrumbsItem current>Users</PlinthBreadcrumbsItem>
        </PlinthBreadcrumbs>,
      ),
    ).toBe(
      '<nav aria-label="Breadcrumb" class="plinth-breadcrumbs"><ol class="plinth-breadcrumbs-list">' +
        '<li class="plinth-breadcrumbs-item"><a href="/settings" class="plinth-breadcrumbs-link"><span class="plinth-breadcrumbs-label">Settings</span></a></li>' +
        '<li class="plinth-breadcrumbs-item"><a aria-current="page" class="plinth-breadcrumbs-link"><span class="plinth-breadcrumbs-label">Users</span></a></li>' +
        '</ol></nav>',
    );
  });

  it('takes its own label, and leaves out a blank one', () => {
    expect(root(<PlinthBreadcrumbs label="Settings" />).getAttribute('aria-label')).toBe(
      'Settings',
    );
    expect(root(<PlinthBreadcrumbs label=" " />).hasAttribute('aria-label')).toBe(false);
  });

  it('collapses to the parent, and falls back to none', () => {
    const collapse = (value: string) =>
      root(<PlinthBreadcrumbs collapse={value as BreadcrumbsCollapse} />).getAttribute(
        'data-collapse',
      );

    expect(collapse('parent')).toBe('parent');
    expect(collapse('none')).toBeNull();
    expect(collapse('menu')).toBeNull();
  });

  it('passes other props and the ref to the root, and lets a project attribute win', () => {
    const ref = createRef<HTMLElement>();
    const nav = root(<PlinthBreadcrumbs ref={ref} className="ms-2" aria-label="Path" />);

    expect(nav.className).toBe('plinth-breadcrumbs ms-2');
    expect(nav.getAttribute('aria-label')).toBe('Path');
    expect(ref.current).toBe(nav);
  });
});

describe('PlinthBreadcrumbsItem', () => {
  it('leaves out a missing or blank href, and the current page has none', () => {
    const link = (element: ReactElement) => root(element).querySelector('a')!;

    expect(link(<PlinthBreadcrumbsItem>Users</PlinthBreadcrumbsItem>).hasAttribute('href')).toBe(
      false,
    );
    expect(
      link(<PlinthBreadcrumbsItem href=" ">Users</PlinthBreadcrumbsItem>).hasAttribute('href'),
    ).toBe(false);
    expect(
      link(
        <PlinthBreadcrumbsItem href="/users" current>
          Users
        </PlinthBreadcrumbsItem>,
      ).hasAttribute('href'),
    ).toBe(false);
  });

  it('escapes the label', () => {
    expect(
      renderToStaticMarkup(<PlinthBreadcrumbsItem>{'<b>x</b>'}</PlinthBreadcrumbsItem>),
    ).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('passes other props, handlers and the ref to the link, and lets a project attribute win', () => {
    const ref = createRef<HTMLAnchorElement>();
    const onClick = vi.fn();
    const item = root(
      <PlinthBreadcrumbsItem
        ref={ref}
        current
        className="ms-2"
        aria-current="location"
        onClick={onClick}
      >
        Home
      </PlinthBreadcrumbsItem>,
    );
    const link = item.querySelector('a')!;
    fireEvent.click(link);

    expect(item.className).toBe('plinth-breadcrumbs-item');
    expect(link.className).toBe('plinth-breadcrumbs-link ms-2');
    expect(link.getAttribute('aria-current')).toBe('location');
    expect(ref.current).toBe(link);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('PlinthBreadcrumbsMore', () => {
  it('prints the more button with the app menu after it', () => {
    const item = root(
      <PlinthBreadcrumbsMore menu=" trail-more ">
        <div id="trail-more" popover="auto">
          menu
        </div>
      </PlinthBreadcrumbsMore>,
    );
    const button = item.querySelector('button')!;

    expect(item.tagName).toBe('LI');
    expect(item.className).toBe('plinth-breadcrumbs-item');
    expect(button.className).toBe('plinth-breadcrumbs-more');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('popovertarget')).toBe('trail-more');
    expect(button.getAttribute('aria-label')).toBe('More pages');
    expect(button.querySelector('.plinth-icon')!.getAttribute('data-icon')).toBe('more');
    expect(button.nextElementSibling!.id).toBe('trail-more');
  });

  it('takes its own label, and passes other props and the ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    const button = root(
      <PlinthBreadcrumbsMore
        ref={ref}
        menu="m"
        label="Earlier pages"
        className="ms-2"
        type="submit"
      />,
    ).querySelector('button')!;

    expect(button.getAttribute('aria-label')).toBe('Earlier pages');
    expect(button.className).toBe('plinth-breadcrumbs-more ms-2');
    expect(button.getAttribute('type')).toBe('submit');
    expect(ref.current).toBe(button);
  });

  it('needs a menu and a label', () => {
    expect(() => renderToStaticMarkup(<PlinthBreadcrumbsMore menu=" " />)).toThrow('needs a menu');
    expect(() => renderToStaticMarkup(<PlinthBreadcrumbsMore menu="m" label=" " />)).toThrow(
      'needs a label',
    );
  });
});
