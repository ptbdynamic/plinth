// Markup contract: packages/css/src/components/app-shell.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';

interface AppShellOptions {
  /** The app nav, on the start side, as tall as the screen (Vue's `nav` slot). */
  nav?: ReactNode;
  /** The app bar, above the content, beside the nav (Vue's `bar` slot). */
  bar?: ReactNode;
}

/** The app's frame: the nav, the bar and the page in a `<main>` (`children`). */
export type PlinthAppShellProps = AppShellOptions &
  Omit<ComponentProps<'div'>, keyof AppShellOptions>;

export function PlinthAppShell({ nav, bar, className, children, ...rest }: PlinthAppShellProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <div {...rest} className={classNames('plinth-app-shell', className)}>
      {hasContent(nav) ? <div className="plinth-app-shell-nav">{nav}</div> : null}
      {hasContent(bar) ? <div className="plinth-app-shell-bar">{bar}</div> : null}
      <main className="plinth-app-shell-main">{children}</main>
    </div>
  );
}
