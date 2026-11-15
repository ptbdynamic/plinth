// Markup contract: packages/css/src/components/breadcrumbs.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

interface BreadcrumbsItemOptions {
  /** The page's address; the current page has none. */
  href?: string;
  /** The page being shown: aria-current="page", and no href. */
  current?: boolean;
}

/** An `<li>` holding the link, which is the root: the other props land on the link. */
export type PlinthBreadcrumbsItemProps = BreadcrumbsItemOptions &
  Omit<ComponentProps<'a'>, keyof BreadcrumbsItemOptions>;

export function PlinthBreadcrumbsItem({
  href,
  current = false,
  className,
  children,
  ...rest
}: PlinthBreadcrumbsItemProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's. A blank href counts as missing, as Blade's filled() decides.
  return (
    <li className="plinth-breadcrumbs-item">
      <a
        href={!current && href?.trim() ? href : undefined}
        aria-current={current ? 'page' : undefined}
        {...rest}
        className={classNames('plinth-breadcrumbs-link', className)}
      >
        <span className="plinth-breadcrumbs-label">{children}</span>
      </a>
    </li>
  );
}
