// Markup contract: packages/css/src/components/page-header.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';
import { pageHeaderLevel, type PageHeaderLevel } from './page-header';

interface PageHeaderOptions {
  /** The page's heading. */
  heading: string;
  /** The heading's element: `h1`, or `h2` to `h6` beside another page's `h1`. */
  level?: PageHeaderLevel;
  /** The screen's top bar: it adds the top safe-area inset (data-top). */
  top?: boolean;
  /** The leading action, usually a menu button or a back link (Vue's `leading` slot). */
  leading?: ReactNode;
  /** The trailing actions: icon buttons or a primary button (Vue's `actions` slot). */
  actions?: ReactNode;
}

export type PlinthPageHeaderProps = PageHeaderOptions &
  Omit<ComponentProps<'header'>, keyof PageHeaderOptions | 'children'>;

export function PlinthPageHeader({
  heading,
  level,
  top = false,
  leading,
  actions,
  className,
  ...rest
}: PlinthPageHeaderProps) {
  if (!heading?.trim()) {
    throw new Error("<PlinthPageHeader> needs a heading: it is the page's heading.");
  }
  const Heading = pageHeaderLevel(level);
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  return (
    <header
      className={classNames('plinth-page-header', className)}
      data-top={top ? '' : undefined}
      {...rest}
    >
      {hasContent(leading) ? <div className="plinth-page-header-leading">{leading}</div> : null}
      <Heading className="plinth-page-header-heading">{heading}</Heading>
      {hasContent(actions) ? <div className="plinth-page-header-actions">{actions}</div> : null}
    </header>
  );
}
