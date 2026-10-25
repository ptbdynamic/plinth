// Markup contract: packages/css/src/components/timeline.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

interface TimelineEventOptions {
  /** When, as shown (09:14, 10 min ago). */
  time?: string;
  /** The time as a machine-readable date. */
  datetime?: string;
}

/** An event on the timeline: a dot and one sentence (`children`) with its time. */
export type PlinthTimelineEventProps = TimelineEventOptions &
  Omit<ComponentProps<'li'>, keyof TimelineEventOptions>;

export function PlinthTimelineEvent({
  time,
  datetime,
  className,
  children,
  ...rest
}: PlinthTimelineEventProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <li {...rest} className={classNames('plinth-timeline-event', className)}>
      <span className="plinth-timeline-dot" aria-hidden="true"></span>
      <p className="plinth-timeline-text">
        {children}
        {time?.trim() ? (
          <time className="plinth-timeline-time" dateTime={datetime?.trim() ? datetime : undefined}>
            {time}
          </time>
        ) : null}
      </p>
    </li>
  );
}
