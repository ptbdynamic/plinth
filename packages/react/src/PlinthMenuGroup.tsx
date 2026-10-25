// Markup contract: packages/css/src/components/menu.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

interface MenuGroupOptions {
  /** The heading over the group's items, and the group's accessible name. */
  label?: string;
}

/** A `<div role="group">` of menu items under a heading. */
export type PlinthMenuGroupProps = MenuGroupOptions &
  Omit<ComponentProps<'div'>, keyof MenuGroupOptions>;

export function PlinthMenuGroup({ label, className, children, ...rest }: PlinthMenuGroupProps) {
  // A blank label counts as missing, as Blade's filled() decides.
  const named = Boolean(label?.trim());
  return (
    <div
      role="group"
      aria-label={named ? label : undefined}
      {...rest}
      className={classNames('plinth-menu-group', className)}
    >
      {named ? (
        <div className="plinth-menu-heading" aria-hidden="true">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
}
