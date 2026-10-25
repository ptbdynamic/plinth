// Markup contract: packages/css/src/components/nav-list.css
import type { ComponentProps } from 'react';
import { headingLevel as resolveLevel, type HeadingLevel } from './heading';
import { classNames } from './markup';

interface NavListGroupOptions {
  /** A heading above the group's items. */
  heading?: string;
  /** The heading's element, h2 to h6. */
  headingLevel?: HeadingLevel;
}

/** A run of items (`children`) with an optional heading. */
export type PlinthNavListGroupProps = NavListGroupOptions &
  Omit<ComponentProps<'div'>, keyof NavListGroupOptions>;

export function PlinthNavListGroup({
  heading,
  headingLevel,
  className,
  children,
  ...rest
}: PlinthNavListGroupProps) {
  const Heading = resolveLevel(headingLevel);
  return (
    <div {...rest} className={classNames('plinth-nav-list-group', className)}>
      {heading?.trim() ? <Heading className="plinth-nav-list-heading">{heading}</Heading> : null}
      {children}
    </div>
  );
}
