// Markup contract: packages/css/src/components/nav-list.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

interface NavListOptions {
  /** The navigation's accessible name (aria-label). */
  label?: string;
}

/** A `<nav>` holding the groups (`children`). */
export type PlinthNavListProps = NavListOptions & Omit<ComponentProps<'nav'>, keyof NavListOptions>;

export function PlinthNavList({ label, className, children, ...rest }: PlinthNavListProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <nav
      aria-label={label?.trim() ? label : undefined}
      {...rest}
      className={classNames('plinth-nav-list', className)}
    >
      {children}
    </nav>
  );
}
