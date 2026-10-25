// Markup contract: packages/css/src/components/toolbar.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';

interface ToolbarGroupOptions {
  /** The group's name, when it has one of its own. */
  label?: string;
}

/** A group of a toolbar's actions, as `children`. */
export type PlinthToolbarGroupProps = ToolbarGroupOptions &
  Omit<ComponentProps<'div'>, keyof ToolbarGroupOptions>;

export function PlinthToolbarGroup({
  label,
  className,
  children,
  ...rest
}: PlinthToolbarGroupProps) {
  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <div
      role="group"
      aria-label={label?.trim() ? label : undefined}
      {...rest}
      className={classNames('plinth-toolbar-group', className)}
    >
      {children}
    </div>
  );
}
