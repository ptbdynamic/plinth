// Markup contract: packages/css/src/components/timeline.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

interface TimelineOptions {
  /** The list's accessible name (aria-label). */
  label?: string;
}

/** An `<ol>` holding the posts and events (`children`). */
export type PlinthTimelineProps = TimelineOptions &
  Omit<ComponentProps<'ol'>, keyof TimelineOptions>;

export function PlinthTimeline({ label, className, children, ...rest }: PlinthTimelineProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <ol
      role="list"
      aria-label={label?.trim() ? label : undefined}
      {...rest}
      className={classNames('plinth-timeline', className)}
    >
      {children}
    </ol>
  );
}
