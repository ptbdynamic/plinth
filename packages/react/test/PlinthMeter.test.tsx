import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { calloutIcons, meterNumber, meterRange, meterTone, PlinthMeter } from '../src/index.ts';

const spend = {
  id: 'spend',
  label: 'Spend this month',
  value: 120,
  max: 150,
  low: 105,
  high: 135,
  optimum: 0,
  valueText: '€120 of €150',
  description: 'Runs pause at €150.',
};

describe('PlinthMeter', () => {
  it('prints the meter markup contract', () => {
    expect(renderToStaticMarkup(<PlinthMeter {...spend} />)).toBe(
      '<div data-tone="warning" class="plinth-meter"><span class="plinth-meter-label" id="spend-label">Spend this month</span><span class="plinth-meter-value" aria-hidden="true">€120 of €150</span>' +
        '<meter class="plinth-meter-bar" id="spend" min="0" max="150" low="105" high="135" optimum="0" value="120" aria-labelledby="spend-label" aria-describedby="spend-description" aria-valuetext="€120 of €150">€120 of €150</meter>' +
        `<span class="plinth-meter-description" id="spend-description"><span class="plinth-icon plinth-meter-tone" data-size="sm" aria-hidden="true">${calloutIcons.warning}</span>Runs pause at €150.</span></div>`,
    );
  });

  it('prints only the label and the bar by default', () => {
    expect(renderToStaticMarkup(<PlinthMeter id="quota" label="Quota" />)).toBe(
      '<div data-tone="neutral" class="plinth-meter"><span class="plinth-meter-label" id="quota-label">Quota</span><meter class="plinth-meter-bar" id="quota" min="0" max="100" value="0" aria-labelledby="quota-label">0</meter></div>',
    );
  });

  it('makes up an id without one', () => {
    const { container } = render(<PlinthMeter label="Quota" id=" " />);
    const meter = container.querySelector('meter')!;

    expect(meter.id).toMatch(/^plinth-meter-/);
    expect(meter.getAttribute('aria-labelledby')).toBe(`${meter.id}-label`);
  });

  it('needs a label', () => {
    expect(() => renderToStaticMarkup(<PlinthMeter label=" " />)).toThrow('needs a label');
  });

  it('leaves out a blank value text and description', () => {
    const html = renderToStaticMarkup(
      <PlinthMeter label="Quota" value={5} valueText=" " description=" " />,
    );

    expect(html).not.toContain('plinth-meter-value');
    expect(html).not.toContain('plinth-meter-description');
    expect(html).not.toContain('aria-valuetext');
    expect(html).toContain('>5</meter>');
  });

  it('prints a neutral description without an icon', () => {
    expect(
      renderToStaticMarkup(
        <PlinthMeter id="q" label="Quota" value={5} description="Resets monthly." />,
      ),
    ).toContain('<span class="plinth-meter-description" id="q-description">Resets monthly.</span>');
  });

  it('takes the tone the app chooses, and decides it from the numbers for an unknown one', () => {
    expect(renderToStaticMarkup(<PlinthMeter label="Quota" tone="success" />)).toContain(
      'data-tone="success"',
    );
    expect(
      // @ts-expect-error an unknown tone, as a project might pass at runtime
      renderToStaticMarkup(<PlinthMeter {...spend} value={149} tone="loud" />),
    ).toContain('data-tone="danger"');
  });

  it('escapes the text', () => {
    const html = renderToStaticMarkup(
      <PlinthMeter label="<b>Spend</b>" valueText="<i>5</i>" description="<u>Note</u>" />,
    );

    expect(html).toContain('&lt;b&gt;Spend&lt;/b&gt;');
    expect(html).not.toContain('<b>');
  });

  it('spreads other props onto the root, the project winning a clash, and forwards the ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <PlinthMeter
        ref={ref}
        label="Quota"
        className="ms-2"
        data-testid="quota"
        data-tone="danger"
      />,
    );
    const root = container.firstElementChild!;

    expect(root.className).toBe('plinth-meter ms-2');
    expect(root.getAttribute('data-testid')).toBe('quota');
    expect(root.getAttribute('data-tone')).toBe('danger');
    expect(ref.current).toBe(root);
  });
});

describe('meterTone', () => {
  it.each([
    [{ value: 90 }, 'neutral'],
    [{ value: 20, low: 70, high: 90, optimum: 0 }, 'neutral'],
    [{ value: 70, low: 70, high: 90, optimum: 0 }, 'neutral'],
    [{ value: 80, low: 70, high: 90, optimum: 0 }, 'warning'],
    [{ value: 95, low: 70, high: 90, optimum: 0 }, 'danger'],
    [{ value: 120 }, 'danger'],
    [{ value: 95, low: 30, high: 90, optimum: 100 }, 'neutral'],
    [{ value: 50, low: 30, high: 90, optimum: 100 }, 'warning'],
    [{ value: 10, low: 30, high: 90, optimum: 100 }, 'danger'],
    [{ value: 50, low: 30, high: 70 }, 'neutral'],
    [{ value: 80, low: 30, high: 70 }, 'warning'],
    [{ value: 5, min: 10, max: 0 }, 'neutral'],
  ])('decides %o as the browser decides the region: %s', (numbers, tone) => {
    expect(meterTone(numbers)).toBe(tone);
  });

  it('reads numbers given as strings and ignores what is not a number', () => {
    expect(meterRange({ value: ' 2.50 ', min: '1', max: 'x', low: '', high: 4 })).toEqual({
      value: 2.5,
      min: 1,
      max: 100,
      low: undefined,
      high: 4,
      optimum: undefined,
    });
    expect(meterNumber(null)).toBeUndefined();
    expect(meterNumber(Infinity)).toBeUndefined();
    // @ts-expect-error a boolean, as a project might pass at runtime
    expect(meterNumber(true)).toBeUndefined();
  });
});
