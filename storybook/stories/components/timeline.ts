import {
  timelineHeadingLevel,
  timelineKind,
  timelineKinds,
  type HeadingLevel,
  type TimelineKind,
} from '@ptbdynamic/plinth-vue';
import { avatar } from './avatar.ts';
import { badge } from './badge.ts';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { timelineKinds, type TimelineKind };

/** Blank counts as missing, as Blade's filled() decides. */
const filled = (text: string | undefined): text is string => !!text?.trim();

export interface TimelinePostArgs {
  /** Who wrote it: the heading, and where the avatar's initials come from. */
  author: string;
  /** The author's picture, shown instead of the initials. */
  avatar?: string;
  /** Who wrote it, as a ring on the avatar: team (default), customer, or an internal note. */
  kind: TimelineKind;
  /** The meta line's start: an email or a role. */
  detail?: string;
  /** When, as shown (09:14, 10 min ago). */
  time?: string;
  /** The time as a machine-readable date (2026-10-25T09:14). */
  datetime?: string;
  /** A short id on the end side, shown from 1280px. */
  reference?: string;
  /** The note's badge. */
  noteLabel?: string;
  /** The heading's element, h2 to h6 (h3 by default). */
  headingLevel?: HeadingLevel;
  /** The body, as markup. */
  body: string;
  /** The actions, as markup. */
  actions?: string;
}

export interface TimelineEventArgs {
  /** The sentence, as markup. */
  text: string;
  time?: string;
  datetime?: string;
}

export type TimelineEntry =
  ({ type: 'post' } & TimelinePostArgs) | ({ type: 'event' } & TimelineEventArgs);

export interface TimelineArgs {
  /** The list's accessible name (aria-label). */
  label?: string;
  entries: TimelineEntry[];
}

const timeElement = (time: string | undefined, datetime: string | undefined) =>
  filled(time)
    ? `<time class="plinth-timeline-time"${filled(datetime) ? ` datetime="${escape(datetime)}"` : ''}>${escape(time)}</time>`
    : '';

/** A post's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function timelinePost(
  {
    author,
    avatar: src,
    kind,
    detail,
    time,
    datetime,
    reference,
    noteLabel = 'Internal note',
    headingLevel,
    body,
    actions,
  }: TimelinePostArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-timeline-post', attributes);
  const dataKind = timelineKind(kind);
  const tag = timelineHeadingLevel(headingLevel);
  const meta = filled(detail) || filled(time);
  return [
    `<li class="${classes}"${extra} data-kind="${dataKind}">`,
    '<article class="plinth-timeline-article">',
    avatar({ name: author, src: filled(src) ? src : undefined, size: 'md', decorative: true }),
    '<header class="plinth-timeline-header">',
    `<${tag} class="plinth-timeline-heading">`,
    `<span class="plinth-timeline-author">${escape(author)}</span>`,
    dataKind === 'note' ? badge({ label: noteLabel, tone: 'warning', dot: false }) : '',
    `</${tag}>`,
    meta ? '<p class="plinth-timeline-meta">' : '',
    filled(detail) ? `<span class="plinth-timeline-detail">${escape(detail)}</span>` : '',
    timeElement(time, datetime),
    meta ? '</p>' : '',
    filled(reference) ? `<span class="plinth-timeline-reference">${escape(reference)}</span>` : '',
    '</header>',
    `<div class="plinth-timeline-body">${body}</div>`,
    actions?.trim() ? `<div class="plinth-timeline-actions">${actions}</div>` : '',
    '</article>',
    '</li>',
  ].join('');
}

/** An event's markup contract: the dot, then the sentence and its time. */
export function timelineEvent(
  { text, time, datetime }: TimelineEventArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-timeline-event', attributes);
  return [
    `<li class="${classes}"${extra}>`,
    '<span class="plinth-timeline-dot" aria-hidden="true"></span>',
    `<p class="plinth-timeline-text">${text}${timeElement(time, datetime)}</p>`,
    '</li>',
  ].join('');
}

/** The entries, each a post or an event. */
export function timelineEntries(entries: TimelineEntry[]): string {
  return entries
    .map((entry) => (entry.type === 'post' ? timelinePost(entry) : timelineEvent(entry)))
    .join('');
}

/** The timeline's markup contract, with its entries. */
export function timeline({ label, entries }: TimelineArgs, attributes: Attributes = {}): string {
  const { classes, extra } = rootAttributes('plinth-timeline', attributes);
  return [
    `<ol class="${classes}"`,
    extra,
    ' role="list"',
    filled(label) ? ` aria-label="${escape(label)}"` : '',
    '>',
    timelineEntries(entries),
    '</ol>',
  ].join('');
}
