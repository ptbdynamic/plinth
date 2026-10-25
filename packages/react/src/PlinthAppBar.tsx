// Markup contract: packages/css/src/components/app-bar.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';

interface AppBarOptions {
  /** Icon buttons such as Notifications and Help (Vue's `actions` slot). */
  actions?: ReactNode;
  /** On the end edge: an avatar button or the account's menu (Vue's `account` slot). */
  account?: ReactNode;
}

/** The bar at the top of an app: the search (`children`), the actions and the account. */
export type PlinthAppBarProps = AppBarOptions & Omit<ComponentProps<'header'>, keyof AppBarOptions>;

export function PlinthAppBar({
  actions,
  account,
  className,
  children,
  ...rest
}: PlinthAppBarProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <header {...rest} className={classNames('plinth-app-bar', className)}>
      {hasContent(children) ? <div className="plinth-app-bar-start">{children}</div> : null}
      {hasContent(actions) ? <div className="plinth-app-bar-actions">{actions}</div> : null}
      {hasContent(account) ? <div className="plinth-app-bar-account">{account}</div> : null}
    </header>
  );
}
