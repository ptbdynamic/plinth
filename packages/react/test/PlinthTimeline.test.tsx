import { render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlinthTimeline, PlinthTimelineEvent, PlinthTimelinePost } from '../src/index.ts';

describe('PlinthTimeline', () => {
  it('prints a named list with its entries', () => {
    expect(
      renderToStaticMarkup(
        <PlinthTimeline label="Conversation">
          <i>entries</i>
        </PlinthTimeline>,
      ),
    ).toBe('<ol role="list" aria-label="Conversation" class="plinth-timeline"><i>entries</i></ol>');
  });

  it('leaves out a missing or blank label', () => {
    expect(renderToStaticMarkup(<PlinthTimeline />)).toBe(
      '<ol role="list" class="plinth-timeline"></ol>',
    );
    expect(renderToStaticMarkup(<PlinthTimeline label=" " />)).toBe(
      '<ol role="list" class="plinth-timeline"></ol>',
    );
  });

  it('keeps extra classes, attributes and the ref on its root; the project wins a clash', () => {
    const ref = createRef<HTMLOListElement>();
    const { container } = render(
      <PlinthTimeline ref={ref} label="Conversation" className="is-wide" id="thread" role="feed" />,
    );
    const root = container.firstElementChild;

    expect(root?.getAttribute('class')).toBe('plinth-timeline is-wide');
    expect(root?.getAttribute('id')).toBe('thread');
    expect(root?.getAttribute('role')).toBe('feed');
    expect(ref.current).toBe(root);
  });
});

describe('PlinthTimelinePost', () => {
  it('prints a post with its avatar, heading, meta line, body and actions', () => {
    expect(
      renderToStaticMarkup(
        <PlinthTimelinePost
          author="Alex Morgan"
          kind="customer"
          detail="alex@example.com"
          time="09:14"
          datetime="2026-10-25T09:14"
          reference="#4821"
          actions={<button type="button">Reply</button>}
        >
          <p>Hello</p>
        </PlinthTimelinePost>,
      ),
    ).toBe(
      [
        '<li data-kind="customer" class="plinth-timeline-post"><article class="plinth-timeline-article">',
        '<span data-size="md" aria-hidden="true" class="plinth-avatar"><span class="plinth-avatar-initials" aria-hidden="true">AM</span></span>',
        '<header class="plinth-timeline-header"><h3 class="plinth-timeline-heading"><span class="plinth-timeline-author">Alex Morgan</span></h3>',
        '<p class="plinth-timeline-meta"><span class="plinth-timeline-detail">alex@example.com</span><time class="plinth-timeline-time" dateTime="2026-10-25T09:14">09:14</time></p><span class="plinth-timeline-reference">#4821</span></header>',
        '<div class="plinth-timeline-body"><p>Hello</p></div>',
        '<div class="plinth-timeline-actions"><button type="button">Reply</button></div>',
        '</article></li>',
      ].join(''),
    );
  });

  it('defaults to a team post with no meta line, reference, badge or actions', () => {
    const html = renderToStaticMarkup(<PlinthTimelinePost author="Sam Lee">Hi</PlinthTimelinePost>);

    expect(html).toContain('data-kind="team"');
    expect(html).toContain('<h3 class="plinth-timeline-heading">');
    for (const part of ['meta', 'reference', 'actions']) {
      expect(html).not.toContain(`plinth-timeline-${part}`);
    }
    expect(html).not.toContain('plinth-badge');
  });

  it('leaves out blank parts and empty actions', () => {
    const html = renderToStaticMarkup(
      <PlinthTimelinePost
        author="Sam Lee"
        avatar=" "
        detail=" "
        time=" "
        reference=" "
        actions={false}
      >
        Hi
      </PlinthTimelinePost>,
    );

    for (const part of ['plinth-avatar-image', 'meta', 'reference', 'actions']) {
      expect(html).not.toContain(part.startsWith('plinth') ? part : `plinth-timeline-${part}`);
    }
  });

  it('prints the time without a blank datetime, and the detail or the time alone', () => {
    expect(
      renderToStaticMarkup(<PlinthTimelinePost author="Sam" time="09:14" datetime=" " />),
    ).toContain(
      '<p class="plinth-timeline-meta"><time class="plinth-timeline-time">09:14</time></p>',
    );
    expect(renderToStaticMarkup(<PlinthTimelinePost author="Sam" detail="Support" />)).toContain(
      '<p class="plinth-timeline-meta"><span class="plinth-timeline-detail">Support</span></p>',
    );
  });

  it('shows the picture instead of the initials', () => {
    expect(renderToStaticMarkup(<PlinthTimelinePost author="Sam" avatar="/sam.jpg" />)).toContain(
      '<img class="plinth-avatar-image" src="/sam.jpg" alt=""/>',
    );
  });

  it('marks a note with its badge, in the label given', () => {
    expect(renderToStaticMarkup(<PlinthTimelinePost author="Sam" kind="note" />)).toContain(
      '<span class="plinth-timeline-author">Sam</span><span data-tone="warning" class="plinth-badge"><span class="plinth-badge-label">Internal note</span></span>',
    );
    expect(
      renderToStaticMarkup(
        <PlinthTimelinePost author="Sam" kind="note" noteLabel="Nota interna" />,
      ),
    ).toContain('Nota interna');
  });

  it('falls back to a team post and an h3 for unknown values', () => {
    const html = renderToStaticMarkup(
      <PlinthTimelinePost author="Sam" kind={'admin' as never} headingLevel={'h1' as never} />,
    );

    expect(html).toContain('data-kind="team"');
    expect(html).toContain('<h3');
    expect(renderToStaticMarkup(<PlinthTimelinePost author="Sam" headingLevel="h4" />)).toContain(
      '<h4',
    );
  });

  it('escapes its text', () => {
    const text = '"><b>x</b>';
    const html = renderToStaticMarkup(
      <PlinthTimelinePost
        author={text}
        detail={text}
        time={text}
        reference={text}
        kind="note"
        noteLabel={text}
      />,
    );

    expect(html).not.toContain('<b>');
  });

  it('keeps extra classes, attributes and the ref on its root; the project wins a clash', () => {
    const ref = createRef<HTMLLIElement>();
    const { container } = render(
      <PlinthTimelinePost
        ref={ref}
        author="Sam"
        className="is-new"
        id="post-1"
        data-kind="customer"
      />,
    );
    const root = container.firstElementChild;

    expect(root?.getAttribute('class')).toBe('plinth-timeline-post is-new');
    expect(root?.getAttribute('id')).toBe('post-1');
    expect(root?.getAttribute('data-kind')).toBe('customer');
    expect(ref.current).toBe(root);
  });
});

describe('PlinthTimelineEvent', () => {
  it('prints an event with its dot, sentence and time', () => {
    expect(
      renderToStaticMarkup(
        <PlinthTimelineEvent time="09:14" datetime="2026-10-25T09:14">
          Alex Morgan <b>assigned</b> it
        </PlinthTimelineEvent>,
      ),
    ).toBe(
      '<li class="plinth-timeline-event"><span class="plinth-timeline-dot" aria-hidden="true"></span><p class="plinth-timeline-text">Alex Morgan <b>assigned</b> it<time class="plinth-timeline-time" dateTime="2026-10-25T09:14">09:14</time></p></li>',
    );
  });

  it('prints no blank time or datetime', () => {
    expect(
      renderToStaticMarkup(<PlinthTimelineEvent time=" ">Closed</PlinthTimelineEvent>),
    ).not.toContain('<time');
    expect(
      renderToStaticMarkup(
        <PlinthTimelineEvent time="09:14" datetime=" ">
          Closed
        </PlinthTimelineEvent>,
      ),
    ).toContain('<time class="plinth-timeline-time">09:14</time>');
  });

  it('keeps extra classes, attributes and the ref on its root; the project wins a clash', () => {
    const ref = createRef<HTMLLIElement>();
    const { container } = render(
      <PlinthTimelineEvent ref={ref} className="is-new" id="event-1" data-testid="event" />,
    );
    const root = container.firstElementChild;

    expect(root?.getAttribute('class')).toBe('plinth-timeline-event is-new');
    expect(root?.getAttribute('id')).toBe('event-1');
    expect(root?.getAttribute('data-testid')).toBe('event');
    expect(ref.current).toBe(root);
  });
});
