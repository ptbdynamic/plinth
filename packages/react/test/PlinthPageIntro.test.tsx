import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthPageIntro, type PageHeaderLevel } from '../src/index.ts';

describe('PlinthPageIntro', () => {
  it('prints the heading, the description and the actions', () => {
    expect(
      renderToStaticMarkup(
        <PlinthPageIntro
          heading="Users"
          description="Who can sign in."
          descriptionId="users-description"
          actions={<button type="button">Invite user</button>}
        />,
      ),
    ).toBe(
      '<div class="plinth-page-intro">' +
        '<div class="plinth-page-intro-text">' +
        '<h1 class="plinth-page-intro-heading">Users</h1>' +
        '<p class="plinth-page-intro-description" id="users-description">Who can sign in.</p>' +
        '</div>' +
        '<div class="plinth-page-intro-actions"><button type="button">Invite user</button></div>' +
        '</div>',
    );
  });

  it('prints only the heading without a description or actions', () => {
    expect(renderToStaticMarkup(<PlinthPageIntro heading="Settings" />)).toBe(
      '<div class="plinth-page-intro"><div class="plinth-page-intro-text">' +
        '<h1 class="plinth-page-intro-heading">Settings</h1></div></div>',
    );
  });

  it('leaves out a blank description, description id and actions', () => {
    const blank = renderToStaticMarkup(
      <PlinthPageIntro heading="Users" description=" " descriptionId="d" actions=" " />,
    );
    expect(blank).not.toContain('plinth-page-intro-description');
    expect(blank).not.toContain('plinth-page-intro-actions');
    expect(
      renderToStaticMarkup(<PlinthPageIntro heading="Users" description="Who" descriptionId=" " />),
    ).toContain('<p class="plinth-page-intro-description">Who</p>');
  });

  it('prints the heading at the level asked for, and h1 for one it does not know', () => {
    const tag = (level?: string) =>
      render(
        <PlinthPageIntro heading="Users" level={level as PageHeaderLevel} />,
      ).container.querySelector('.plinth-page-intro-heading')!.tagName;

    expect(tag('h2')).toBe('H2');
    expect(tag('h6')).toBe('H6');
    expect(tag('h7')).toBe('H1');
    expect(tag()).toBe('H1');
  });

  it('shows from 768px only with wideOnly', () => {
    expect(renderToStaticMarkup(<PlinthPageIntro heading="Users" wideOnly />)).toContain(
      '<div class="plinth-page-intro" data-wide-only="">',
    );
    expect(renderToStaticMarkup(<PlinthPageIntro heading="Users" />)).not.toContain(
      'data-wide-only',
    );
  });

  it('needs a heading', () => {
    expect(() => renderToStaticMarkup(<PlinthPageIntro heading=" " />)).toThrow('needs a heading');
    expect(() =>
      renderToStaticMarkup(<PlinthPageIntro {...({} as { heading: string })} />),
    ).toThrow('needs a heading');
  });

  it('escapes the heading and the description', () => {
    const html = renderToStaticMarkup(
      <PlinthPageIntro heading="<b>Users</b>" description="<i>Who</i>" />,
    );

    expect(html).toContain('&lt;b&gt;Users&lt;/b&gt;');
    expect(html).toContain('&lt;i&gt;Who&lt;/i&gt;');
  });

  it('keeps extra classes, attributes and the ref on its root, and the project wins a clash', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthPageIntro
        ref={ref}
        heading="Users"
        wideOnly
        className="mb-4"
        id="intro"
        data-testid="intro"
        data-wide-only="desktop"
      />,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-page-intro mb-4');
    expect(root.id).toBe('intro');
    expect(root.getAttribute('data-testid')).toBe('intro');
    expect(root.getAttribute('data-wide-only')).toBe('desktop');
    expect(ref.current).toBe(root);
  });
});
