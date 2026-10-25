// Markup contract: packages/css/src/components/app-nav.css
import type { ComponentProps, ReactNode } from 'react';
import { classNames, hasContent } from './markup';

interface AppNavItemOptions {
  /** A number after the label, such as how many items wait there. */
  count?: string | number | null;
  /** The page being shown, or a page under it: aria-current="page". */
  current?: boolean;
  /** The item's icon, the only thing the rail shows (Vue's `icon` slot). */
  icon?: ReactNode;
}

/** A link to one of the app's pages, the label as `children`. */
export type PlinthAppNavItemProps = AppNavItemOptions &
  Omit<ComponentProps<'a'>, keyof AppNavItemOptions>;

export function PlinthAppNavItem({
  href,
  count,
  current = false,
  icon,
  className,
  children,
  ...rest
}: PlinthAppNavItemProps) {
  // Missing or blank prints no count, as Blade's filled() decides.
  const hasCount = count != null && String(count).trim() !== '';

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <a
      href={href?.trim() ? href : undefined}
      aria-current={current ? 'page' : undefined}
      {...rest}
      className={classNames('plinth-app-nav-item', className)}
    >
      {hasContent(icon) ? (
        <span className="plinth-app-nav-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="plinth-app-nav-label">{children}</span>
      {hasCount ? <span className="plinth-app-nav-count">{count}</span> : null}
    </a>
  );
}
