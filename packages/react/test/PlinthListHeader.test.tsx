import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthListHeader } from '../src/index.ts';

describe('PlinthListHeader', () => {
  it('prints the list header markup contract', () => {
    expect(renderToStaticMarkup(<PlinthListHeader heading="Open" count={12} />)).toBe(
      '<div class="plinth-list-header"><h2 class="plinth-list-header-heading"><span class="plinth-list-header-title">Open</span><span class="plinth-list-header-count">12</span></h2><p class="plinth-list-header-selection" role="status"></p></div>',
    );
  });

  it('prints the actions, and leaves out ones that print nothing', () => {
    expect(
      renderToStaticMarkup(
        <PlinthListHeader heading="Open" actions={<button type="button">Sort</button>} />,
      ),
    ).toContain(
      '<div class="plinth-list-header-actions"><button type="button">Sort</button></div>',
    );
    expect(renderToStaticMarkup(<PlinthListHeader heading="Open" actions={false} />)).not.toContain(
      'plinth-list-header-actions',
    );
  });

  it('leaves out a blank count, and keeps a count of 0', () => {
    expect(renderToStaticMarkup(<PlinthListHeader heading="Open" count=" " />)).not.toContain(
      'plinth-list-header-count',
    );
    expect(renderToStaticMarkup(<PlinthListHeader heading="Open" count={null} />)).not.toContain(
      'plinth-list-header-count',
    );
    expect(renderToStaticMarkup(<PlinthListHeader heading="Spam" count={0} />)).toContain(
      '<span class="plinth-list-header-count">0</span>',
    );
  });

  it('says how many are selected while selecting', () => {
    expect(renderToStaticMarkup(<PlinthListHeader heading="Open" selection="2 selected" />))
      .toContain('<div class="plinth-list-header is-selecting">')
      .toContain('role="status">2 selected</p>');
    expect(renderToStaticMarkup(<PlinthListHeader heading="Open" selection=" " />)).toContain(
      '<div class="plinth-list-header">',
    );
  });

  it('takes a heading level, and falls back to h2', () => {
    expect(renderToStaticMarkup(<PlinthListHeader heading="Open" headingLevel="h4" />)).toContain(
      '<h4 class="plinth-list-header-heading">',
    );
    expect(
      renderToStaticMarkup(<PlinthListHeader heading="Open" headingLevel={'h1' as 'h2'} />),
    ).toContain('<h2 class="plinth-list-header-heading">');
  });

  it('needs a heading', () => {
    expect(() => renderToStaticMarkup(<PlinthListHeader heading=" " />)).toThrow('needs a heading');
  });

  it('escapes the text', () => {
    const html = renderToStaticMarkup(
      <PlinthListHeader heading="<b>x</b>" count="<b>x</b>" selection="<b>x</b>" />,
    );

    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes, attributes and the ref on its root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthListHeader heading="Open" ref={ref} className="mb-4" id="open" />,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-list-header mb-4');
    expect(root.id).toBe('open');
    expect(ref.current).toBe(root);
  });
});
