import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthEmptyState, type HeadingLevel } from '../src/index.ts';

const root = (element: ReactElement) => render(element).container.firstElementChild!;

describe('PlinthEmptyState', () => {
  it('prints the icon, the heading, the description and the actions', () => {
    expect(
      renderToStaticMarkup(
        <PlinthEmptyState
          heading="No runs yet"
          description="Runs show here once a workflow starts."
          icon={<span className="plinth-icon" data-size="md" aria-hidden="true"></span>}
          actions={<a href="/runs/new">Start a run</a>}
        />,
      ),
    ).toBe(
      '<div class="plinth-empty-state">' +
        '<div class="plinth-empty-state-icon"><span class="plinth-icon" data-size="md" aria-hidden="true"></span></div>' +
        '<h2 class="plinth-empty-state-heading">No runs yet</h2>' +
        '<p class="plinth-empty-state-description">Runs show here once a workflow starts.</p>' +
        '<div class="plinth-empty-state-actions"><a href="/runs/new">Start a run</a></div></div>',
    );
  });

  it('leaves out a blank description, and an icon and actions that print nothing', () => {
    for (const [icon, actions] of [
      [' ', null],
      [[], <>{false}</>],
    ]) {
      expect(
        renderToStaticMarkup(
          <PlinthEmptyState heading="No runs yet" description=" " icon={icon} actions={actions} />,
        ),
      ).toBe(
        '<div class="plinth-empty-state"><h2 class="plinth-empty-state-heading">No runs yet</h2></div>',
      );
    }
  });

  it('prints the heading at the level asked for, and h2 for one it does not know', () => {
    const tag = (level?: string) =>
      root(
        <PlinthEmptyState heading="No runs yet" headingLevel={level as HeadingLevel} />,
      ).querySelector('.plinth-empty-state-heading')!.tagName;

    expect(tag('h3')).toBe('H3');
    expect(tag('h6')).toBe('H6');
    expect(tag('h1')).toBe('H2');
    expect(tag()).toBe('H2');
  });

  it('marks the framed variant with data-framed', () => {
    expect(renderToStaticMarkup(<PlinthEmptyState heading="No runs yet" framed />)).toContain(
      '<div class="plinth-empty-state" data-framed="">',
    );
    expect(renderToStaticMarkup(<PlinthEmptyState heading="No runs yet" />)).not.toContain(
      'data-framed',
    );
  });

  it('escapes the heading and the description', () => {
    const html = renderToStaticMarkup(
      <PlinthEmptyState heading="<b>A</b>" description="<b>B</b>" />,
    );
    expect(html).toContain('<h2 class="plinth-empty-state-heading">&lt;b&gt;A&lt;/b&gt;</h2>');
    expect(html).toContain('<p class="plinth-empty-state-description">&lt;b&gt;B&lt;/b&gt;</p>');
  });

  it('needs a heading', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<PlinthEmptyState heading=" " />)).toThrow('needs a heading');
    vi.restoreAllMocks();
  });

  it('passes other props and the ref to the root', () => {
    const ref = createRef<HTMLDivElement>();
    const element = root(
      <PlinthEmptyState
        ref={ref}
        heading="No runs yet"
        className="app-empty"
        id="runs-empty"
        aria-describedby="runs-help"
      />,
    );

    expect(element.className).toBe('plinth-empty-state app-empty');
    expect(element.id).toBe('runs-empty');
    expect(element.getAttribute('aria-describedby')).toBe('runs-help');
    expect(ref.current).toBe(element);
  });

  it("lets the project's data-framed win over its own", () => {
    expect(
      root(<PlinthEmptyState heading="No runs yet" framed data-framed="project" />).getAttribute(
        'data-framed',
      ),
    ).toBe('project');
  });
});
