import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthSectionHeading } from '../src/index.ts';

describe('PlinthSectionHeading', () => {
  it('prints the section heading markup contract', () => {
    expect(renderToStaticMarkup(<PlinthSectionHeading heading="Budget" />)).toBe(
      '<div class="plinth-section-heading"><div class="plinth-section-heading-text"><h2 class="plinth-section-heading-title">Budget</h2></div></div>',
    );
  });

  it('prints the heading id, the description and the actions', () => {
    expect(
      renderToStaticMarkup(
        <PlinthSectionHeading
          heading="Budget"
          headingId="budget-heading"
          description="Runs pause at the cap."
          actions={<button type="button">Set a cap</button>}
        />,
      ),
    ).toBe(
      '<div class="plinth-section-heading"><div class="plinth-section-heading-text"><h2 class="plinth-section-heading-title" id="budget-heading">Budget</h2><p class="plinth-section-heading-description">Runs pause at the cap.</p></div><div class="plinth-section-heading-actions"><button type="button">Set a cap</button></div></div>',
    );
  });

  it('leaves out a blank id, a blank description and actions that print nothing', () => {
    const html = renderToStaticMarkup(
      <PlinthSectionHeading heading="Budget" headingId=" " description="  " actions={false} />,
    );

    expect(html).not.toContain('id=');
    expect(html).not.toContain('plinth-section-heading-description');
    expect(html).not.toContain('plinth-section-heading-actions');
  });

  it('draws the divider only when asked', () => {
    expect(renderToStaticMarkup(<PlinthSectionHeading heading="Budget" divider />)).toContain(
      '<div class="plinth-section-heading" data-divider="">',
    );
    expect(renderToStaticMarkup(<PlinthSectionHeading heading="Budget" />)).not.toContain(
      'data-divider',
    );
  });

  it('takes a heading level, and falls back to h2', () => {
    expect(
      renderToStaticMarkup(<PlinthSectionHeading heading="Budget" headingLevel="h4" />),
    ).toContain('<h4 class="plinth-section-heading-title">');
    expect(
      renderToStaticMarkup(<PlinthSectionHeading heading="Budget" headingLevel={'h1' as 'h2'} />),
    ).toContain('<h2 class="plinth-section-heading-title">');
  });

  it('needs a heading', () => {
    expect(() => renderToStaticMarkup(<PlinthSectionHeading heading=" " />)).toThrow(
      'needs a heading',
    );
  });

  it('escapes the text', () => {
    const html = renderToStaticMarkup(
      <PlinthSectionHeading heading="<b>x</b>" description="<b>x</b>" />,
    );

    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes, attributes and the ref on its root, and the project wins a clash', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthSectionHeading
        heading="Budget"
        divider
        ref={ref}
        className="mb-4"
        id="budget"
        data-divider="strong"
      />,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-section-heading mb-4');
    expect(root.id).toBe('budget');
    expect(root.getAttribute('data-divider')).toBe('strong');
    expect(ref.current).toBe(root);
  });
});
