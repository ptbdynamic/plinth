// Markup contract: packages/css/src/components/list-header.css
import type { ComponentProps, ReactNode } from 'react';
import { headingLevel, type HeadingLevel } from './heading';
import { classNames, hasContent } from './markup';

interface ListHeaderOptions {
  /** The list's name, its heading. */
  heading: string;
  /** The heading's element, h2 to h6. */
  headingLevel?: HeadingLevel;
  /** How many items the list holds, after the title. */
  count?: string | number | null;
  /** While selecting: how many rows are selected, in the app's words (2 selected). */
  selection?: string;
  /** The actions: icon buttons or a button (Vue's `actions` slot). */
  actions?: ReactNode;
}

export type PlinthListHeaderProps = ListHeaderOptions &
  Omit<ComponentProps<'div'>, keyof ListHeaderOptions | 'children'>;

export function PlinthListHeader({
  heading,
  headingLevel: level,
  count,
  selection,
  actions,
  className,
  ...rest
}: PlinthListHeaderProps) {
  if (!heading?.trim()) {
    throw new Error('<PlinthListHeader> needs a heading: it names the list.');
  }
  const Heading = headingLevel(level);
  const selecting = Boolean(selection?.trim());
  const hasCount = count !== null && count !== undefined && String(count).trim() !== '';
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  return (
    <div
      className={classNames(
        selecting ? 'plinth-list-header is-selecting' : 'plinth-list-header',
        className,
      )}
      {...rest}
    >
      <Heading className="plinth-list-header-heading">
        <span className="plinth-list-header-title">{heading}</span>
        {hasCount ? <span className="plinth-list-header-count">{count}</span> : null}
      </Heading>
      <p className="plinth-list-header-selection" role="status">
        {selecting ? selection : ''}
      </p>
      {hasContent(actions) ? <div className="plinth-list-header-actions">{actions}</div> : null}
    </div>
  );
}
