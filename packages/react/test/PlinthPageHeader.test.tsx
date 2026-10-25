import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthPageHeader, type PageHeaderLevel } from '../src/index.ts';

const root = (element: ReactElement) => render(element).container.firstElementChild!;

describe('PlinthPageHeader', () => {
  it('prints the leading action, the heading and the actions', () => {
    expect(
      renderToStaticMarkup(
        <PlinthPageHeader
          heading="Message"
          leading={<a href="/inbox">Back</a>}
          actions={<button type="button">Archive</button>}
        />,
      ),
    ).toBe(
      '<header class="plinth-page-header"><div class="plinth-page-header-leading"><a href="/inbox">Back</a></div>' +
        '<h1 class="plinth-page-header-heading">Message</h1>' +
        '<div class="plinth-page-header-actions"><button type="button">Archive</button></div></header>',
    );
  });

  it('leaves out leading and actions that print nothing, an empty list or fragment too', () => {
    for (const [leading, actions] of [
      [' ', null],
      [[], <>{false}</>],
    ]) {
      expect(
        renderToStaticMarkup(
          <PlinthPageHeader heading="Settings" leading={leading} actions={actions} />,
        ),
      ).toBe(
        '<header class="plinth-page-header"><h1 class="plinth-page-header-heading">Settings</h1></header>',
      );
    }
  });

  it('prints the heading at the level asked for, and h1 for one it does not know', () => {
    const tag = (level?: string) =>
      root(<PlinthPageHeader heading="Ticket" level={level as PageHeaderLevel} />).querySelector(
        '.plinth-page-header-heading',
      )!.tagName;

    expect(tag('h2')).toBe('H2');
    expect(tag('h6')).toBe('H6');
    expect(tag('h7')).toBe('H1');
    expect(tag()).toBe('H1');
  });

  it("marks the screen's top bar with data-top", () => {
    expect(renderToStaticMarkup(<PlinthPageHeader heading="Inbox" top />)).toContain(
      '<header class="plinth-page-header" data-top="">',
    );
    expect(renderToStaticMarkup(<PlinthPageHeader heading="Inbox" />)).not.toContain('data-top');
  });

  it('escapes the heading', () => {
    expect(renderToStaticMarkup(<PlinthPageHeader heading="<b>A</b>" />)).toContain(
      '<h1 class="plinth-page-header-heading">&lt;b&gt;A&lt;/b&gt;</h1>',
    );
  });

  it('needs a heading', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<PlinthPageHeader heading=" " />)).toThrow('needs a heading');
    vi.restoreAllMocks();
  });

  it('passes other props, the title attribute and the ref to the root', () => {
    const ref = createRef<HTMLElement>();
    const header = root(
      <PlinthPageHeader
        ref={ref}
        heading="Inbox"
        title="Your inbox"
        className="app-header"
        id="top"
      />,
    );

    expect(header.className).toBe('plinth-page-header app-header');
    expect(header.getAttribute('title')).toBe('Your inbox');
    expect(header.id).toBe('top');
    expect(ref.current).toBe(header);
  });

  it("lets the project's data-top win over its own", () => {
    expect(
      root(<PlinthPageHeader heading="Inbox" top data-top="notch" />).getAttribute('data-top'),
    ).toBe('notch');
  });
});
