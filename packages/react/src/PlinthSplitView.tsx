// Markup contract: packages/css/src/components/split-view.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';
import { splitViewPane, type SplitViewPane } from './split-view';

interface SplitViewOptions {
  /** The one pane a phone shows: the list (the default) or the detail. */
  pane?: SplitViewPane;
  /** Collapses the secondary column: data-secondary="closed". */
  secondaryClosed?: boolean;
  /** The secondary column, such as folders; from 1280px (Vue's `secondary` slot). */
  secondary?: ReactNode;
  /** The list, such as the tickets (Vue's `list` slot). */
  list?: ReactNode;
  /** Held to the detail's bottom edge, such as a reply box (Vue's `footer` slot). */
  footer?: ReactNode;
}

/** Up to three panes in a page: the secondary column, the list and the detail (`children`). */
export type PlinthSplitViewProps = SplitViewOptions &
  Omit<ComponentProps<'div'>, keyof SplitViewOptions>;

export function PlinthSplitView({
  pane,
  secondaryClosed = false,
  secondary,
  list,
  footer,
  className,
  children,
  ...rest
}: PlinthSplitViewProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <div
      data-pane={splitViewPane(pane)}
      data-secondary={secondaryClosed ? 'closed' : undefined}
      {...rest}
      className={classNames('plinth-split-view', className)}
    >
      {hasContent(secondary) ? (
        <div className="plinth-split-view-secondary">{secondary}</div>
      ) : null}
      <div className="plinth-split-view-list">{list}</div>
      <div className="plinth-split-view-detail">
        {children}
        {hasContent(footer) ? <div className="plinth-split-view-footer">{footer}</div> : null}
      </div>
    </div>
  );
}
