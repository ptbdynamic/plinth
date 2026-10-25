import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { calloutIcons, PlinthStat, statChevron } from '../src/index.ts';

const squish = (html: string) => html.replace(/<!--.*?-->/g, '').replace(/>\s+</g, '><');

describe('PlinthStat', () => {
  it('prints a static tile with its label and value', () => {
    const wrapper = mount(PlinthStat, { props: { label: 'Runs today', value: '12' } });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-stat" data-tone="neutral"><span class="plinth-stat-label">Runs today</span><span class="plinth-stat-value">12</span></div>',
    );
  });

  it('prints a number, zero included', () => {
    const wrapper = mount(PlinthStat, { props: { label: 'Failed runs', value: 0 } });

    expect(wrapper.get('.plinth-stat-value').html()).toBe(
      '<span class="plinth-stat-value">0</span>',
    );
  });

  it('prints the supporting line, without an icon when neutral', () => {
    const wrapper = mount(PlinthStat, {
      props: { label: 'Spend this month', value: '€38', description: 'of €150' },
    });

    expect(squish(wrapper.get('.plinth-stat-description').html())).toBe(
      '<span class="plinth-stat-description">of €150</span>',
    );
  });

  it.each(['success', 'warning', 'danger'] as const)(
    'puts the %s tone and its icon on the supporting line',
    (tone) => {
      const wrapper = mount(PlinthStat, {
        props: { label: 'Success rate', value: '94%', description: 'Up 2 points', tone },
      });

      expect(wrapper.attributes('data-tone')).toBe(tone);
      expect(squish(wrapper.get('.plinth-stat-description').html())).toBe(
        `<span class="plinth-stat-description"><span class="plinth-icon plinth-stat-tone" data-size="sm" aria-hidden="true">${calloutIcons[tone]}</span>Up 2 points</span>`,
      );
    },
  );

  it('falls back to neutral for an unknown tone', () => {
    const wrapper = mount(PlinthStat, {
      // @ts-expect-error an unknown tone, as a project might pass at runtime
      props: { label: 'Errors', value: '3', description: 'Fewer', tone: 'loud' },
    });

    expect(wrapper.attributes('data-tone')).toBe('neutral');
    expect(wrapper.find('.plinth-stat-tone').exists()).toBe(false);
  });

  it('leaves out an empty supporting line', () => {
    const wrapper = mount(PlinthStat, {
      props: { label: 'Runs today', value: '12', description: ' ', tone: 'success' },
    });

    expect(wrapper.find('.plinth-stat-description').exists()).toBe(false);
  });

  it.each([undefined, null, '', ' '])('prints the empty state for %j', (value) => {
    const wrapper = mount(PlinthStat, { props: { label: 'Runs today', value } });

    expect(squish(wrapper.get('.plinth-stat-value').html())).toBe(
      '<span class="plinth-stat-value is-empty"><span aria-hidden="true">—</span><span class="plinth-stat-empty">Not available</span></span>',
    );
  });

  it('takes its own empty label', () => {
    const wrapper = mount(PlinthStat, {
      props: { label: 'Runs today', emptyLabel: 'Still counting' },
    });

    expect(wrapper.get('.plinth-stat-empty').text()).toBe('Still counting');
  });

  it('is a link with an href, with its chevron', () => {
    const link = mount(PlinthStat, { props: { label: 'Runs today', value: '12', href: '/runs' } });

    expect(link.element.tagName).toBe('A');
    expect(link.attributes('href')).toBe('/runs');
    expect(squish(link.get('.plinth-stat-chevron').html())).toBe(
      statChevron.replace('data-mirror', 'data-mirror=""'),
    );
    expect(
      mount(PlinthStat, { props: { label: 'Runs today' } })
        .find('.plinth-stat-chevron')
        .exists(),
    ).toBe(false);
  });

  it('escapes the text', () => {
    const wrapper = mount(PlinthStat, {
      props: { label: '<b>x</b>', value: '<b>x</b>', description: '<b>x</b>' },
    });

    expect(wrapper.html()).not.toContain('<b>');
    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('keeps extra classes and attributes, and the project wins a clash', () => {
    const wrapper = mount(PlinthStat, {
      props: { label: 'Runs today', value: '12' },
      attrs: { class: 'ms-2', id: 'runs', 'data-tone': 'warning' },
    });

    expect(wrapper.classes()).toEqual(['plinth-stat', 'ms-2']);
    expect(wrapper.attributes('id')).toBe('runs');
    expect(wrapper.attributes('data-tone')).toBe('warning');
  });
});
