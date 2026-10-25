import type { Meta, StoryObj } from '@storybook/html-vite';
import { samplePhoto } from './avatar.ts';
import { samplePostActions, sampleThread } from './inbox.ts';
import { timeline, type TimelineArgs, type TimelineEntry } from './timeline.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/avatar.css';
import '@ptbdynamic/plinth-css/src/components/badge.css';
import '@ptbdynamic/plinth-css/src/components/timeline.css';

/** The column it sits in: as wide as a split view's detail can be, with its padding. */
const column = (content: string) =>
  `<div style="max-inline-size: 48rem; padding: var(--plinth-space-4)">${content}</div>`;

const post = (extra: Partial<TimelineEntry & { type: 'post' }>): TimelineEntry => ({
  type: 'post',
  author: 'Sam Lee',
  kind: 'team',
  detail: 'Support team',
  time: '09:21',
  datetime: '2026-10-25T09:21',
  body: '<p>Thanks, we are on it.</p>',
  ...extra,
});

const meta = {
  title: 'Components/Timeline',
  render: (args) => column(timeline(args)),
  args: { label: 'Conversation', entries: sampleThread },
  parameters: {
    docs: {
      description: {
        component:
          "A conversation or an activity feed on one vertical line, such as a ticket's thread. **Posts** have the author's avatar on the line, ringed by `kind` (`team`, the default, `customer`, or `note`), the name as a heading (an `<h3>`; set `headingLevel` to fit the page), a meta line in mono (the `detail`, an email or a role, and the `time`), a short `reference` on the end side from 1280px, the body, and a row of quiet `actions`. A **note** is a post whose body sits in a faint warning-tinted box under an *Internal note* badge (`noteLabel`). **Events** are a dot on the line and one sentence with its time. Name the list with `label`. The ring is not the only cue: say who wrote a post in its `detail`. The post's heading and meta line stay on one line on a phone, the name and the detail ending in an ellipsis.",
      },
    },
  },
} satisfies Meta<TimelineArgs>;

export default meta;
type Story = StoryObj<TimelineArgs>;

/** A ticket's thread: the customer's post, an event, an internal note, a reply and an event. */
export const Default: Story = {};

/** The three kinds of post: a customer's, the team's and an internal note, each ringed. */
export const Kinds: Story = {
  args: {
    entries: [
      post({
        author: 'Alex Kim',
        kind: 'customer',
        detail: 'alex.kim@example.com',
        body: '<p>The export still stops at the same place.</p>',
      }),
      post({ body: '<p>Thanks, we are on it.</p>' }),
      post({ kind: 'note', body: '<p>Only reports over 3,000 rows fail.</p>' }),
    ],
  },
};

/** An internal note: the body in a warning-tinted box, under its badge. */
export const Note: Story = {
  args: {
    entries: [
      post({
        kind: 'note',
        reference: '#4822',
        body: '<p>Same error on our side with any report over 3,000 rows.</p><p>Asking the reports team.</p>',
        actions: samplePostActions,
      }),
    ],
  },
};

/** Events alone: an activity feed of dots and sentences. */
export const Events: Story = {
  args: {
    label: 'Activity',
    entries: [
      { type: 'event', text: 'Alex Kim opened the ticket', time: '09:02' },
      { type: 'event', text: 'Sam Lee assigned it to themselves', time: '09:14' },
      { type: 'event', text: 'Sam Lee set the status to <strong>Pending</strong>', time: '09:22' },
      { type: 'event', text: 'The ticket was merged into #4790' },
    ],
  },
};

/** A post with only what it needs: the author and the body, no meta line or actions. */
export const Minimal: Story = {
  args: {
    entries: [
      { type: 'post', author: 'Sam Lee', kind: 'team', body: '<p>Closing this one, thanks.</p>' },
    ],
  },
};

/** The author's picture instead of the initials. */
export const WithPicture: Story = {
  args: {
    entries: [post({ avatar: samplePhoto, reference: '#4823', actions: samplePostActions })],
  },
};

/**
 * Long names and details: on a phone the heading and the meta line keep to one line each, the
 * name and the detail ending in an ellipsis; the time and the badge always show.
 */
export const LongText: Story = {
  args: {
    entries: [
      post({
        author: 'Maximiliana Alexandra Fitzgerald-Montgomery',
        kind: 'note',
        detail: 'maximiliana.fitzgerald-montgomery@example.com',
        reference: '#48210',
        body: '<p>A long body wraps like any paragraph, and a long address such as https://example.com/reports/march/export?rows=4000&amp;format=csv breaks where it must.</p>',
        actions: samplePostActions,
      }),
      {
        type: 'event',
        text: 'Maximiliana Alexandra Fitzgerald-Montgomery moved it from Billing questions to Reports and exports',
        time: 'yesterday',
      },
    ],
  },
};

/** In right-to-left text the line, the avatars and the reference swap sides. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${column(timeline(args))}</div>`,
};

/** On a raised surface: `--plinth-timeline-surface` matches the gaps around the avatars and dots. */
export const OnACard: Story = {
  render: (args) =>
    column(
      `<div style="padding: var(--plinth-space-4); background: var(--plinth-color-surface-raised); border: var(--plinth-border-width-thin) solid var(--plinth-color-border); border-radius: var(--plinth-radius-container)">${timeline(
        args,
        { style: '--plinth-timeline-surface: var(--plinth-color-surface-raised)' },
      )}</div>`,
    ),
};
