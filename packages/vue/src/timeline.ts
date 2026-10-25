import { headingLevels, type HeadingLevel } from './heading';

/**
 * Who wrote a timeline post, as the ring on its avatar: `team` (the default), `customer`, or
 * `note`, an internal note, whose body sits in a warning-tinted box under a badge.
 */
export const timelineKinds = ['team', 'customer', 'note'] as const;
export type TimelineKind = (typeof timelineKinds)[number];

/** A kind from the list, or `team` when it is not one of them. */
export function timelineKind(value: string | undefined): TimelineKind {
  return timelineKinds.includes(value as TimelineKind) ? (value as TimelineKind) : 'team';
}

/** A post's heading level, h2 to h6, or `h3` when it is not one of them. */
export function timelineHeadingLevel(value: string | undefined): HeadingLevel {
  return headingLevels.includes(value as HeadingLevel) ? (value as HeadingLevel) : 'h3';
}
