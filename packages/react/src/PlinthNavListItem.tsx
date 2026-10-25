// Markup contract: packages/css/src/components/nav-list.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

interface NavListItemOptions {
  /** A number after the label, such as how many items the view holds. */
  count?: string | number | null;
  /** The view being shown: aria-current="page". */
  current?: boolean;
}

/** A link to one of the page's views, the label as `children`. */
export type PlinthNavListItemProps = NavListItemOptions &
  Omit<ComponentProps<'a'>, keyof NavListItemOptions>;

export function PlinthNavListItem({
  href,
  count,
  current = false,
  className,
  children,
  ...rest
}: PlinthNavListItemProps) {
  // Missing or blank prints no count, as Blade's filled() decides.
  const hasCount = count != null && String(count).trim() !== '';

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <a
      href={href?.trim() ? href : undefined}
      aria-current={current ? 'page' : undefined}
      {...rest}
      className={classNames('plinth-nav-list-item', className)}
    >
      <span className="plinth-nav-list-label">{children}</span>
      {hasCount ? <span className="plinth-nav-list-count">{count}</span> : null}
    </a>
  );
}
