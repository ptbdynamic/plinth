// Markup contract: packages/css/src/components/empty-state.css
import type { ComponentProps, ReactNode } from 'react';
import { headingLevel as resolveLevel, type HeadingLevel } from './heading';
import { classNames, hasContent } from './markup';

interface EmptyStateOptions {
  /** What is empty, in plain words: "No runs yet". */
  heading: string;
  /** The heading's element, h2 to h6. */
  headingLevel?: HeadingLevel;
  /** Why it is empty, or what fills it. */
  description?: string;
  /** Its own raised surface, for a page section with nothing around it (data-framed). */
  framed?: boolean;
  /** The project's own icon, decorative (Vue's `icon` slot). */
  icon?: ReactNode;
  /** The action: usually one button or link (Vue's `actions` slot). */
  actions?: ReactNode;
}

export type PlinthEmptyStateProps = EmptyStateOptions &
  Omit<ComponentProps<'div'>, keyof EmptyStateOptions | 'children'>;

export function PlinthEmptyState({
  heading,
  headingLevel,
  description,
  framed = false,
  icon,
  actions,
  className,
  ...rest
}: PlinthEmptyStateProps) {
  if (!heading?.trim()) {
    throw new Error('<PlinthEmptyState> needs a heading: it says what is empty.');
  }
  const Heading = resolveLevel(headingLevel);
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  return (
    <div
      className={classNames('plinth-empty-state', className)}
      data-framed={framed ? '' : undefined}
      {...rest}
    >
      {hasContent(icon) ? <div className="plinth-empty-state-icon">{icon}</div> : null}
      <Heading className="plinth-empty-state-heading">{heading}</Heading>
      {description?.trim() ? <p className="plinth-empty-state-description">{description}</p> : null}
      {hasContent(actions) ? <div className="plinth-empty-state-actions">{actions}</div> : null}
    </div>
  );
}
