// Markup contract: packages/css/src/components/toolbar.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';
import { toolbarKeys } from './toolbar';

interface ToolbarOptions {
  /** The actions' name (aria-label on the toolbar). */
  label?: string;
  /** What the actions act on, in the app's words: 2 selected, #1042. */
  target?: string;
  /** The search, on the start side (Vue's `search` slot). */
  search?: ReactNode;
}

/** The row of actions under a page header: the search, the target, and the actions (`children`). */
export type PlinthToolbarProps = ToolbarOptions & Omit<ComponentProps<'div'>, keyof ToolbarOptions>;

/** One tab stop, and the arrow keys between the actions, while the toolbar is mounted. */
const keys = (toolbar: HTMLDivElement) => toolbarKeys(toolbar);

export function PlinthToolbar({
  label = 'Actions',
  target,
  search,
  className,
  children,
  ...rest
}: PlinthToolbarProps) {
  if (!label?.trim()) {
    throw new Error('<PlinthToolbar> needs a label: it names the toolbar.');
  }

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <div {...rest} className={classNames('plinth-toolbar', className)}>
      {hasContent(search) ? search : null}
      {target?.trim() ? <p className="plinth-toolbar-target">{target}</p> : null}
      <div ref={keys} className="plinth-toolbar-actions" role="toolbar" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
