import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthSectionHeading } from '../src/index.ts';

const squish = (html: string) =>
  html
    .replace(/<!--.*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/>\s+/g, '>')
    .replace(/\s+</g, '<');

describe('PlinthSectionHeading', () => {
  it('prints the section heading markup contract', () => {
    const wrapper = mount(PlinthSectionHeading, { props: { heading: 'Budget' } });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-section-heading"><div class="plinth-section-heading-text"><h2 class="plinth-section-heading-title">Budget</h2></div></div>',
    );
  });

  it('prints the heading id, the description and the actions', () => {
    const wrapper = mount(PlinthSectionHeading, {
      props: {
        heading: 'Budget',
        headingId: 'budget-heading',
        description: 'Runs pause at the cap.',
      },
      slots: { actions: '<button type="button">Set a cap</button>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<div class="plinth-section-heading"><div class="plinth-section-heading-text"><h2 id="budget-heading" class="plinth-section-heading-title">Budget</h2><p class="plinth-section-heading-description">Runs pause at the cap.</p></div><div class="plinth-section-heading-actions"><button type="button">Set a cap</button></div></div>',
    );
  });

  it('leaves out a blank id, a blank description and an empty actions slot', () => {
    const wrapper = mount(PlinthSectionHeading, {
      props: { heading: 'Budget', headingId: ' ', description: '  ' },
      slots: { actions: ' ' },
    });

    expect(wrapper.get('h2').attributes('id')).toBeUndefined();
    expect(wrapper.find('.plinth-section-heading-description').exists()).toBe(false);
    expect(wrapper.find('.plinth-section-heading-actions').exists()).toBe(false);
  });

  it('draws the divider only when asked', () => {
    expect(
      mount(PlinthSectionHeading, { props: { heading: 'Budget', divider: true } }).attributes(
        'data-divider',
      ),
    ).toBe('');
    expect(
      mount(PlinthSectionHeading, { props: { heading: 'Budget' } }).attributes('data-divider'),
    ).toBeUndefined();
  });

  it('takes a heading level, and falls back to h2', () => {
    expect(
      mount(PlinthSectionHeading, { props: { heading: 'Budget', headingLevel: 'h4' } })
        .find('h4')
        .exists(),
    ).toBe(true);
    expect(
      mount(PlinthSectionHeading, {
        props: { heading: 'Budget', headingLevel: 'h1' as 'h2' },
      })
        .find('h2')
        .exists(),
    ).toBe(true);
  });

  it('needs a heading', () => {
    expect(() => mount(PlinthSectionHeading, { props: { heading: ' ' } })).toThrow(
      'needs a heading',
    );
  });

  it('escapes the text', () => {
    const html = mount(PlinthSectionHeading, {
      props: { heading: '<b>x</b>', description: '<b>x</b>' },
    }).html();

    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('lets extra classes and attributes fall through, and the project wins a clash', () => {
    const wrapper = mount(PlinthSectionHeading, {
      props: { heading: 'Budget', divider: true },
      attrs: { class: 'mb-4', id: 'budget', 'data-divider': 'strong' },
    });

    expect(wrapper.classes()).toEqual(['plinth-section-heading', 'mb-4']);
    expect(wrapper.attributes('id')).toBe('budget');
    expect(wrapper.attributes('data-divider')).toBe('strong');
  });
});
