import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthTimeline, PlinthTimelineEvent, PlinthTimelinePost } from '../src/index.ts';

const squish = (html: string) => html.replace(/>\s+</g, '><').trim();

describe('PlinthTimeline', () => {
  it('prints a named list with its entries', () => {
    const wrapper = mount(PlinthTimeline, {
      props: { label: 'Conversation' },
      slots: { default: '<i>entries</i>' },
    });

    expect(squish(wrapper.html())).toBe(
      '<ol class="plinth-timeline" role="list" aria-label="Conversation"><i>entries</i></ol>',
    );
  });

  it('leaves out a missing or blank label', () => {
    expect(mount(PlinthTimeline).html()).toBe('<ol class="plinth-timeline" role="list"></ol>');
    expect(
      mount(PlinthTimeline, { props: { label: ' ' } }).attributes('aria-label'),
    ).toBeUndefined();
  });

  it('passes extra attributes to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthTimeline, {
      props: { label: 'Conversation' },
      attrs: { class: 'is-wide', id: 'thread', 'aria-label': 'Thread', role: 'feed' },
    });

    expect(wrapper.classes()).toEqual(['plinth-timeline', 'is-wide']);
    expect(wrapper.attributes('id')).toBe('thread');
    expect(wrapper.attributes('aria-label')).toBe('Thread');
    expect(wrapper.attributes('role')).toBe('feed');
  });
});

describe('PlinthTimelinePost', () => {
  it('prints a post with its avatar, heading, meta line, body and actions', () => {
    const wrapper = mount(PlinthTimelinePost, {
      props: {
        author: 'Alex Morgan',
        kind: 'customer',
        detail: 'alex@example.com',
        time: '09:14',
        datetime: '2026-10-25T09:14',
        reference: '#4821',
      },
      slots: { default: '<p>Hello</p>', actions: '<button type="button">Reply</button>' },
    });

    expect(squish(wrapper.html())).toBe(
      [
        '<li class="plinth-timeline-post" data-kind="customer"><article class="plinth-timeline-article">',
        '<span class="plinth-avatar" data-size="md" aria-hidden="true"><span class="plinth-avatar-initials" aria-hidden="true">AM</span>',
        '<!--v-if--></span>',
        '<header class="plinth-timeline-header"><h3 class="plinth-timeline-heading"><span class="plinth-timeline-author">Alex Morgan</span>',
        '<!--v-if--></h3>',
        '<p class="plinth-timeline-meta"><span class="plinth-timeline-detail">alex@example.com</span><time class="plinth-timeline-time" datetime="2026-10-25T09:14">09:14</time></p><span class="plinth-timeline-reference">#4821</span></header>',
        '<div class="plinth-timeline-body"><p>Hello</p></div>',
        '<div class="plinth-timeline-actions"><button type="button">Reply</button></div>',
        '</article></li>',
      ].join(''),
    );
  });

  it('defaults to a team post with no meta line, reference, badge or actions', () => {
    const wrapper = mount(PlinthTimelinePost, {
      props: { author: 'Sam Lee' },
      slots: { default: 'Hi' },
    });

    expect(wrapper.attributes('data-kind')).toBe('team');
    expect(wrapper.find('h3.plinth-timeline-heading').exists()).toBe(true);
    for (const part of ['meta', 'reference', 'actions']) {
      expect(wrapper.find(`.plinth-timeline-${part}`).exists()).toBe(false);
    }
    expect(wrapper.find('.plinth-badge').exists()).toBe(false);
  });

  it('leaves out blank parts and an empty actions slot', () => {
    const wrapper = mount(PlinthTimelinePost, {
      props: { author: 'Sam Lee', avatar: ' ', detail: ' ', time: ' ', reference: ' ' },
      slots: { default: 'Hi', actions: ' ' },
    });

    expect(wrapper.find('.plinth-avatar-image').exists()).toBe(false);
    for (const part of ['meta', 'reference', 'actions']) {
      expect(wrapper.find(`.plinth-timeline-${part}`).exists()).toBe(false);
    }
  });

  it('prints the time without a blank datetime, and the detail or the time alone', () => {
    const time = mount(PlinthTimelinePost, {
      props: { author: 'Sam', time: '09:14', datetime: ' ' },
    });
    const detail = mount(PlinthTimelinePost, { props: { author: 'Sam', detail: 'Support' } });

    expect(squish(time.find('.plinth-timeline-meta').html())).toBe(
      '<p class="plinth-timeline-meta"><!--v-if--><time class="plinth-timeline-time">09:14</time></p>',
    );
    expect(squish(detail.find('.plinth-timeline-meta').html())).toBe(
      '<p class="plinth-timeline-meta"><span class="plinth-timeline-detail">Support</span><!--v-if--></p>',
    );
  });

  it('shows the picture instead of the initials', () => {
    const wrapper = mount(PlinthTimelinePost, { props: { author: 'Sam', avatar: '/sam.jpg' } });

    expect(wrapper.find('img.plinth-avatar-image').attributes('src')).toBe('/sam.jpg');
  });

  it('marks a note with its badge, in the label given', () => {
    const note = mount(PlinthTimelinePost, { props: { author: 'Sam', kind: 'note' } });
    const translated = mount(PlinthTimelinePost, {
      props: { author: 'Sam', kind: 'note', noteLabel: 'Nota interna' },
    });

    expect(note.attributes('data-kind')).toBe('note');
    expect(note.find('.plinth-badge').html()).toBe(
      '<span class="plinth-badge" data-tone="warning"><!--v-if--><span class="plinth-badge-label">Internal note</span></span>',
    );
    expect(translated.find('.plinth-badge-label').text()).toBe('Nota interna');
  });

  it('falls back to a team post and an h3 for unknown values', () => {
    const wrapper = mount(PlinthTimelinePost, {
      props: { author: 'Sam', kind: 'admin' as never, headingLevel: 'h1' as never },
    });

    expect(wrapper.attributes('data-kind')).toBe('team');
    expect(wrapper.find('h3').exists()).toBe(true);
    expect(
      mount(PlinthTimelinePost, { props: { author: 'Sam', headingLevel: 'h4' } })
        .find('h4')
        .exists(),
    ).toBe(true);
  });

  it('escapes its text', () => {
    const text = '"><b>x</b>';
    const wrapper = mount(PlinthTimelinePost, {
      props: {
        author: text,
        detail: text,
        time: text,
        reference: text,
        kind: 'note',
        noteLabel: text,
      },
    });

    expect(wrapper.find('b').exists()).toBe(false);
    expect(wrapper.html()).toContain('&lt;b&gt;x&lt;/b&gt;');
  });

  it('passes extra attributes to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthTimelinePost, {
      props: { author: 'Sam' },
      attrs: { class: 'is-new', id: 'post-1', 'data-kind': 'customer' },
    });

    expect(wrapper.classes()).toEqual(['plinth-timeline-post', 'is-new']);
    expect(wrapper.attributes('id')).toBe('post-1');
    expect(wrapper.attributes('data-kind')).toBe('customer');
  });
});

describe('PlinthTimelineEvent', () => {
  it('prints an event with its dot, sentence and time', () => {
    const wrapper = mount(PlinthTimelineEvent, {
      props: { time: '09:14', datetime: '2026-10-25T09:14' },
      slots: { default: 'Alex Morgan <b>assigned</b> it' },
    });

    expect(squish(wrapper.html())).toBe(
      '<li class="plinth-timeline-event"><span class="plinth-timeline-dot" aria-hidden="true"></span><p class="plinth-timeline-text">Alex Morgan <b>assigned</b> it<time class="plinth-timeline-time" datetime="2026-10-25T09:14">09:14</time></p></li>',
    );
  });

  it('prints no blank time or datetime', () => {
    expect(
      mount(PlinthTimelineEvent, { props: { time: ' ' } })
        .find('time')
        .exists(),
    ).toBe(false);
    expect(
      mount(PlinthTimelineEvent, { props: { time: '09:14', datetime: ' ' } })
        .find('time')
        .attributes('datetime'),
    ).toBeUndefined();
  });

  it('escapes its time', () => {
    expect(
      mount(PlinthTimelineEvent, { props: { time: '<b>x</b>' } })
        .find('b')
        .exists(),
    ).toBe(false);
  });

  it('passes extra attributes to its root, and the project wins a clash', () => {
    const wrapper = mount(PlinthTimelineEvent, {
      attrs: { class: 'is-new', id: 'event-1', 'data-testid': 'event' },
    });

    expect(wrapper.classes()).toEqual(['plinth-timeline-event', 'is-new']);
    expect(wrapper.attributes('id')).toBe('event-1');
    expect(wrapper.attributes('data-testid')).toBe('event');
  });
});
