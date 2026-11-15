// Markup contract: packages/css/src/components/breadcrumbs.css
import type { ComponentProps } from 'react';
import { breadcrumbsCollapse, type BreadcrumbsCollapse } from './breadcrumbs';
import { classNames } from './markup';

interface BreadcrumbsOptions {
  /** The trail's accessible name (aria-label); blank leaves it to the app's aria-labelledby. */
  label?: string;
  /** On a phone, `parent` shows only the current page's parent, as a back link. */
  collapse?: BreadcrumbsCollapse;
}

/** A `<nav>` around the ordered list of the trail's items. */
export type PlinthBreadcrumbsProps = BreadcrumbsOptions &
  Omit<ComponentProps<'nav'>, keyof BreadcrumbsOptions>;

export function PlinthBreadcrumbs({
  label = 'Breadcrumb',
  collapse = 'none',
  className,
  children,
  ...rest
}: PlinthBreadcrumbsProps) {
  // An unknown collapse falls back to `none`, as Blade's enum does.
  const resolved = breadcrumbsCollapse(collapse);
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <nav
      aria-label={label?.trim() ? label : undefined}
      data-collapse={resolved === 'none' ? undefined : resolved}
      {...rest}
      className={classNames('plinth-breadcrumbs', className)}
    >
      <ol className="plinth-breadcrumbs-list">{children}</ol>
    </nav>
  );
}
