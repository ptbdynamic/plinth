// Markup contract: packages/css/src/components/breadcrumbs.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';
import { PlinthIcon } from './PlinthIcon';

interface BreadcrumbsMoreOptions {
  /** The id of the menu the button opens (popovertarget). */
  menu: string;
  /** The button's accessible name. */
  label?: string;
}

/**
 * An `<li>` holding the more button, which is the root: the other props land on the button, and
 * `children` (the app's menu) follows it.
 */
export type PlinthBreadcrumbsMoreProps = BreadcrumbsMoreOptions &
  Omit<ComponentProps<'button'>, keyof BreadcrumbsMoreOptions>;

export function PlinthBreadcrumbsMore({
  menu,
  label = 'More pages',
  className,
  children,
  ...rest
}: PlinthBreadcrumbsMoreProps) {
  if (!menu?.trim()) {
    throw new Error('<PlinthBreadcrumbsMore> needs a menu: the id of the menu its button opens.');
  }
  if (!label?.trim()) {
    throw new Error("<PlinthBreadcrumbsMore> needs a label: it is the button's name.");
  }
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <li className="plinth-breadcrumbs-item">
      <button
        type="button"
        popoverTarget={menu.trim()}
        aria-label={label}
        {...rest}
        className={classNames('plinth-breadcrumbs-more', className)}
      >
        <PlinthIcon name="more" size="sm" />
      </button>
      {children}
    </li>
  );
}
