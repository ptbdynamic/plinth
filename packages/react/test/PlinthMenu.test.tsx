import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthMenu } from '../src/index.ts';

describe('PlinthMenu', () => {
  it('prints the menu markup contract', () => {
    expect(renderToStaticMarkup(<PlinthMenu>Content</PlinthMenu>)).toBe(
      '<div class="plinth-menu">Content</div>',
    );
  });

  it('escapes the content', () => {
    expect(renderToStaticMarkup(<PlinthMenu>{'<b>x</b>'}</PlinthMenu>)).toContain(
      '&lt;b&gt;x&lt;/b&gt;',
    );
  });

  it('keeps extra classes, attributes and the ref on its root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthMenu ref={ref} className="ms-2" id="extra">
        Content
      </PlinthMenu>,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-menu ms-2');
    expect(root.id).toBe('extra');
    expect(ref.current).toBe(root);
  });
});
