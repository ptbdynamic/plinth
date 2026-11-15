import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { calloutIcons, meterNumber, meterRange, meterTone, PlinthMeter } from '../src/index.ts';

const squish = (html: string) => html.replace(/<!--.*?-->/g, '').replace(/>\s+</g, '><');

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
    const wrapper = mount(PlinthMeter, { props: spend });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-meter" data-tone="warning"><span id="spend-label" class="plinth-meter-label">Spend this month</span><span class="plinth-meter-value" aria-hidden="true">€120 of €150</span>' +
        '<meter id="spend" class="plinth-meter-bar" min="0" max="150" low="105" high="135" optimum="0" value="120" aria-labelledby="spend-label" aria-describedby="spend-description" aria-valuetext="€120 of €150">€120 of €150</meter>' +
        `<span id="spend-description" class="plinth-meter-description"><span class="plinth-icon plinth-meter-tone" data-size="sm" aria-hidden="true">${calloutIcons.warning}</span>Runs pause at €150.</span></div>`,
    );
  });

  it('prints only the label and the bar by default', () => {
    const wrapper = mount(PlinthMeter, { props: { id: 'quota', label: 'Quota' } });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-meter" data-tone="neutral"><span id="quota-label" class="plinth-meter-label">Quota</span><meter id="quota" class="plinth-meter-bar" min="0" max="100" value="0" aria-labelledby="quota-label">0</meter></div>',
    );
  });

  it('makes up an id without one', () => {
    const wrapper = mount(PlinthMeter, { props: { label: 'Quota', id: ' ' } });
    const id = wrapper.get('meter').attributes('id');

    expect(id).toMatch(/^plinth-meter-/);
    expect(wrapper.get('meter').attributes('aria-labelledby')).toBe(`${id}-label`);
  });

  it('needs a label', () => {
    expect(() => mount(PlinthMeter, { props: { label: ' ' } })).toThrow('needs a label');
  });

  it('leaves out a blank value text and description', () => {
    const wrapper = mount(PlinthMeter, {
      props: { label: 'Quota', value: 5, valueText: ' ', description: ' ' },
    });

    expect(wrapper.find('.plinth-meter-value').exists()).toBe(false);
    expect(wrapper.find('.plinth-meter-description').exists()).toBe(false);
    expect(wrapper.get('meter').attributes('aria-valuetext')).toBeUndefined();
    expect(wrapper.get('meter').text()).toBe('5');
  });

  it('prints a neutral description without an icon', () => {
    const wrapper = mount(PlinthMeter, {
      props: { id: 'q', label: 'Quota', value: 5, description: 'Resets monthly.' },
    });

    expect(wrapper.get('.plinth-meter-description').html()).toBe(
      '<span id="q-description" class="plinth-meter-description">Resets monthly.</span>',
    );
  });

  it('takes the tone the app chooses, and decides it from the numbers for an unknown one', () => {
    expect(
      mount(PlinthMeter, { props: { label: 'Quota', tone: 'success' } }).attributes('data-tone'),
    ).toBe('success');
    expect(
      mount(PlinthMeter, {
        // @ts-expect-error an unknown tone, as a project might pass at runtime
        props: { ...spend, value: 149, tone: 'loud' },
      }).attributes('data-tone'),
    ).toBe('danger');
  });

  it('escapes the text', () => {
    const wrapper = mount(PlinthMeter, {
      props: { label: '<b>Spend</b>', valueText: '<i>5</i>', description: '<u>Note</u>' },
    });

    expect(wrapper.html()).toContain('&lt;b&gt;Spend&lt;/b&gt;');
    expect(wrapper.html()).not.toContain('<b>');
  });

  it('lets attributes fall through to the root, the project winning a clash', () => {
    const wrapper = mount(PlinthMeter, {
      props: { label: 'Quota' },
      attrs: { class: 'ms-2', 'data-testid': 'quota', 'data-tone': 'danger' },
    });

    expect(wrapper.classes()).toEqual(['plinth-meter', 'ms-2']);
    expect(wrapper.attributes('data-testid')).toBe('quota');
    expect(wrapper.attributes('data-tone')).toBe('danger');
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
