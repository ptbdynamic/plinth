import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { calloutIcons, PlinthStat, statChevron } from '../src/index.ts';

describe('PlinthStat', () => {
  it('prints a static tile with its label and value', () => {
    expect(renderToStaticMarkup(<PlinthStat label="Runs today" value="12" />)).toBe(
      '<div data-tone="neutral" class="plinth-stat"><span class="plinth-stat-label">Runs today</span><span class="plinth-stat-value">12</span></div>',
    );
  });

  it('prints a number, zero included', () => {
    expect(renderToStaticMarkup(<PlinthStat label="Failed runs" value={0} />)).toContain(
      '<span class="plinth-stat-value">0</span>',
    );
  });

  it('prints the supporting line, without an icon when neutral', () => {
    expect(
      renderToStaticMarkup(
        <PlinthStat label="Spend this month" value="€38" description="of €150" />,
      ),
    ).toContain('<span class="plinth-stat-description">of €150</span>');
  });

  it.each(['success', 'warning', 'danger'] as const)(
    'puts the %s tone and its icon on the supporting line',
    (tone) => {
      const html = renderToStaticMarkup(
        <PlinthStat label="Success rate" value="94%" description="Up 2 points" tone={tone} />,
      );

      expect(html).toContain(`data-tone="${tone}"`);
      expect(html).toContain(
        `<span class="plinth-stat-description"><span class="plinth-icon plinth-stat-tone" data-size="sm" aria-hidden="true">${calloutIcons[tone]}</span>Up 2 points</span>`,
      );
    },
  );

  it('falls back to neutral for an unknown tone', () => {
    const html = renderToStaticMarkup(
      // @ts-expect-error an unknown tone, as a project might pass at runtime
      <PlinthStat label="Errors" value="3" description="Fewer" tone="loud" />,
    );

    expect(html).toContain('data-tone="neutral"');
    expect(html).not.toContain('plinth-stat-tone');
  });

  it('leaves out an empty supporting line', () => {
    expect(
      renderToStaticMarkup(
        <PlinthStat label="Runs today" value="12" description=" " tone="success" />,
      ),
    ).not.toContain('plinth-stat-description');
  });

  it.each([undefined, null, '', ' '])('prints the empty state for %j', (value) => {
    expect(renderToStaticMarkup(<PlinthStat label="Runs today" value={value} />)).toContain(
      '<span class="plinth-stat-value is-empty"><span aria-hidden="true">—</span><span class="plinth-stat-empty">Not available</span></span>',
    );
  });

  it('takes its own empty label', () => {
    expect(
      renderToStaticMarkup(<PlinthStat label="Runs today" emptyLabel="Still counting" />),
    ).toContain('<span class="plinth-stat-empty">Still counting</span>');
  });

  it('is a link with an href, with its chevron', () => {
    const html = renderToStaticMarkup(<PlinthStat label="Runs today" value="12" href="/runs" />);

    expect(html).toMatch(/^<a href="\/runs" data-tone="neutral" class="plinth-stat">/);
    expect(html).toContain(`${statChevron.replace('data-mirror', 'data-mirror=""')}</a>`);
    expect(renderToStaticMarkup(<PlinthStat label="Runs today" />)).not.toContain(
      'plinth-stat-chevron',
    );
  });

  it('escapes the text', () => {
    const html = renderToStaticMarkup(
      <PlinthStat label="<b>x</b>" value="<b>x</b>" description="<b>x</b>" />,
    );

    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes, attributes and the ref on its root, and the project wins a clash', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <PlinthStat
        ref={ref}
        label="Runs today"
        value="12"
        className="ms-2"
        id="runs"
        data-tone="warning"
      />,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-stat ms-2');
    expect(root.id).toBe('runs');
    expect(root.getAttribute('data-tone')).toBe('warning');
    expect(ref.current).toBe(root);
  });
  it('is no link with a blank href', () => {
    const html = renderToStaticMarkup(<PlinthStat label="Runs today" value="12" href=" " />);

    expect(html).toMatch(/^<div data-tone="neutral" class="plinth-stat">/);
    expect(html).not.toContain('href');
  });
});
