import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import { PlinthEmptyState } from '../src/index.ts';
import type { HeadingLevel } from '../src/heading.ts';

describe('PlinthEmptyState', () => {
  it('prints the empty state with its icon, heading, description and actions', () => {
    const wrapper = mount(PlinthEmptyState, {
      props: { heading: 'No runs yet', description: 'Runs show here once a workflow starts.' },
      slots: {
        icon: '<span class="plinth-icon" data-size="md" aria-hidden="true"><svg></svg></span>',
        actions: '<a href="/runs/new">Start a run</a>',
      },
    });

    expect(wrapper.html().replace(/\n\s*/g, '')).toBe(
      '<div class="plinth-empty-state">' +
        '<div class="plinth-empty-state-icon"><span class="plinth-icon" data-size="md" aria-hidden="true"><svg></svg></span></div>' +
        '<h2 class="plinth-empty-state-heading">No runs yet</h2>' +
        '<p class="plinth-empty-state-description">Runs show here once a workflow starts.</p>' +
        '<div class="plinth-empty-state-actions"><a href="/runs/new">Start a run</a></div>' +
        '</div>',
    );
  });

  it('prints only the heading without the optional parts', () => {
    const wrapper = mount(PlinthEmptyState, { props: { heading: 'Nothing is waiting on you' } });

    expect(wrapper.html().replace(/\n\s*|<!--v-if-->/g, '')).toBe(
      '<div class="plinth-empty-state"><h2 class="plinth-empty-state-heading">Nothing is waiting on you</h2></div>',
    );
  });

  it('leaves out a blank description and slots that render nothing', () => {
    const wrapper = mount(PlinthEmptyState, {
      props: { heading: 'No runs yet', description: ' ' },
      slots: { icon: () => '  ', actions: () => [] },
    });

    expect(wrapper.find('.plinth-empty-state-description').exists()).toBe(false);
    expect(wrapper.find('.plinth-empty-state-icon').exists()).toBe(false);
    expect(wrapper.find('.plinth-empty-state-actions').exists()).toBe(false);
  });

  it('prints the heading at the level asked for, and h2 for one it does not know', () => {
    const tag = (level?: string) =>
      mount(PlinthEmptyState, {
        props: { heading: 'No runs yet', headingLevel: level as HeadingLevel },
      }).find('.plinth-empty-state-heading').element.tagName;

    expect(tag('h3')).toBe('H3');
    expect(tag('h6')).toBe('H6');
    expect(tag('h1')).toBe('H2');
    expect(tag()).toBe('H2');
  });

  it('marks the framed variant with data-framed', () => {
    expect(
      mount(PlinthEmptyState, { props: { heading: 'No runs yet', framed: true } }).attributes(
        'data-framed',
      ),
    ).toBe('');
    expect(
      mount(PlinthEmptyState, { props: { heading: 'No runs yet' } }).attributes('data-framed'),
    ).toBeUndefined();
  });

  it('needs a heading', () => {
    expect(() => mount(PlinthEmptyState, { props: { heading: ' ' } })).toThrow('needs a heading');
    expect(() => mount(PlinthEmptyState, { props: {} as { heading: string } })).toThrow(
      'needs a heading',
    );
  });

  it('escapes the heading and the description', () => {
    const wrapper = mount(PlinthEmptyState, {
      props: { heading: '<b>x</b>', description: '<b>y</b>' },
    });

    expect(wrapper.find('h2').html()).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(wrapper.find('p').html()).toContain('&lt;b&gt;y&lt;/b&gt;');
  });

  it('keeps extra classes and attributes on the root', () => {
    const wrapper = mount(PlinthEmptyState, {
      props: { heading: 'No runs yet' },
      attrs: {
        class: 'app-empty',
        id: 'runs-empty',
        'aria-describedby': 'runs-help',
        'data-testid': 'empty',
      },
      slots: { actions: () => h('a', { href: '/runs/new' }, 'Start a run') },
    });

    expect(wrapper.classes()).toEqual(['plinth-empty-state', 'app-empty']);
    expect(wrapper.attributes()).toMatchObject({
      id: 'runs-empty',
      'aria-describedby': 'runs-help',
      'data-testid': 'empty',
    });
  });

  it("lets the project's data-framed win over its own", () => {
    const wrapper = mount(PlinthEmptyState, {
      props: { heading: 'No runs yet', framed: true },
      attrs: { 'data-framed': 'project' },
    });

    expect(wrapper.attributes('data-framed')).toBe('project');
  });
});
