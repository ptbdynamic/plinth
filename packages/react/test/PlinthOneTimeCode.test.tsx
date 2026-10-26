import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthOneTimeCode } from '../src/index.ts';

describe('PlinthOneTimeCode', () => {
  it('prints the one time code markup contract', () => {
    expect(renderToStaticMarkup(<PlinthOneTimeCode>Content</PlinthOneTimeCode>)).toBe(
      '<div class="plinth-one-time-code">Content</div>',
    );
  });

  it('escapes the content', () => {
    expect(renderToStaticMarkup(<PlinthOneTimeCode>{'<b>x</b>'}</PlinthOneTimeCode>)).toContain(
      '&lt;b&gt;x&lt;/b&gt;',
    );
  });

  it('keeps extra classes, attributes and the ref on its root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthOneTimeCode ref={ref} className="ms-2" id="extra">
        Content
      </PlinthOneTimeCode>,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-one-time-code ms-2');
    expect(root.id).toBe('extra');
    expect(ref.current).toBe(root);
  });
});
