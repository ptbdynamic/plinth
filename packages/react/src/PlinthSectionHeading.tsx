// Markup contract: packages/css/src/components/section-heading.css
import type { ComponentProps, ReactNode } from 'react';
import { headingLevel, type HeadingLevel } from './heading';
import { classNames, hasContent } from './markup';

interface SectionHeadingOptions {
  /** The section's name, its heading. */
  heading: string;
  /** The heading's element, h2 to h6. */
  headingLevel?: HeadingLevel;
  /** The heading's id, for a <section aria-labelledby> around it. */
  headingId?: string;
  /** A line under the heading saying what the section holds. */
  description?: string;
  /** A hairline under the heading. */
  divider?: boolean;
  /** The actions: a button or two (Vue's `actions` slot). */
  actions?: ReactNode;
}

export type PlinthSectionHeadingProps = SectionHeadingOptions &
  Omit<ComponentProps<'div'>, keyof SectionHeadingOptions | 'children'>;

export function PlinthSectionHeading({
  heading,
  headingLevel: level,
  headingId,
  description,
  divider = false,
  actions,
  className,
  ...rest
}: PlinthSectionHeadingProps) {
  if (!heading?.trim()) {
    throw new Error('<PlinthSectionHeading> needs a heading: it names the section.');
  }
  const Heading = headingLevel(level);
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  return (
    <div
      className={classNames('plinth-section-heading', className)}
      data-divider={divider ? '' : undefined}
      {...rest}
    >
      <div className="plinth-section-heading-text">
        <Heading
          className="plinth-section-heading-title"
          id={headingId?.trim() ? headingId : undefined}
        >
          {heading}
        </Heading>
        {description?.trim() ? (
          <p className="plinth-section-heading-description">{description}</p>
        ) : null}
      </div>
      {hasContent(actions) ? <div className="plinth-section-heading-actions">{actions}</div> : null}
    </div>
  );
}
