// Markup contract: packages/css/src/components/timeline.css
import type { ComponentProps, ReactNode } from 'react';
import type { HeadingLevel } from './heading';
import { classNames, hasContent } from './markup';
import { PlinthAvatar } from './PlinthAvatar';
import { PlinthBadge } from './PlinthBadge';
import { timelineHeadingLevel, timelineKind, type TimelineKind } from './timeline';

interface TimelinePostOptions {
  /** Who wrote it: the heading, and where the avatar's initials come from. */
  author: string;
  /** The author's picture, shown instead of the initials. */
  avatar?: string;
  /** Who wrote it, as a ring on the avatar. */
  kind?: TimelineKind;
  /** The meta line's start: an email or a role. */
  detail?: string;
  /** When, as shown (09:14, 10 min ago). */
  time?: string;
  /** The time as a machine-readable date. */
  datetime?: string;
  /** A short id on the end side, shown from 1280px. */
  reference?: string;
  /** The note's badge. */
  noteLabel?: string;
  /** The heading's element, h2 to h6. */
  headingLevel?: HeadingLevel;
  /** The row of quiet actions under the body. */
  actions?: ReactNode;
}

/** A post on the timeline, the body as `children`. */
export type PlinthTimelinePostProps = TimelinePostOptions &
  Omit<ComponentProps<'li'>, keyof TimelinePostOptions>;

// Blank counts as missing, as Blade's filled() decides.
const filled = (text: string | undefined): text is string => !!text?.trim();

export function PlinthTimelinePost({
  author,
  avatar,
  kind,
  detail,
  time,
  datetime,
  reference,
  noteLabel = 'Internal note',
  headingLevel,
  actions,
  className,
  children,
  ...rest
}: PlinthTimelinePostProps) {
  const dataKind = timelineKind(kind);
  const Heading = timelineHeadingLevel(headingLevel);

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <li data-kind={dataKind} {...rest} className={classNames('plinth-timeline-post', className)}>
      <article className="plinth-timeline-article">
        <PlinthAvatar
          name={author}
          src={filled(avatar) ? avatar : undefined}
          size="md"
          decorative
        />
        <header className="plinth-timeline-header">
          <Heading className="plinth-timeline-heading">
            <span className="plinth-timeline-author">{author}</span>
            {dataKind === 'note' ? <PlinthBadge tone="warning">{noteLabel}</PlinthBadge> : null}
            {filled(reference) ? (
              <span className="plinth-timeline-reference">{reference}</span>
            ) : null}
          </Heading>
          {filled(detail) || filled(time) ? (
            <p className="plinth-timeline-meta">
              {filled(detail) ? <span className="plinth-timeline-detail">{detail}</span> : null}
              {filled(time) ? (
                <time
                  className="plinth-timeline-time"
                  dateTime={filled(datetime) ? datetime : undefined}
                >
                  {time}
                </time>
              ) : null}
            </p>
          ) : null}
        </header>
        <div className="plinth-timeline-body">{children}</div>
        {hasContent(actions) ? <div className="plinth-timeline-actions">{actions}</div> : null}
      </article>
    </li>
  );
}
