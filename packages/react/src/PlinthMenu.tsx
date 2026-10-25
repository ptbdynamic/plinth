// Markup contract: packages/css/src/components/menu.css
import type { ComponentProps } from 'react';
import { classNames } from './markup';
import { MenuIdContext } from './menu';

interface MenuOptions {
  /** The menu's id, which its button names in `popoverTarget`. */
  id: string;
}

/**
 * A `<div popover="auto">`: open it with a button that has `popoverTarget` set to its id (or
 * `commandfor` and `command="toggle-popover"`). Its `onToggle` is the popover's toggle event.
 */
export type PlinthMenuProps = MenuOptions & Omit<ComponentProps<'div'>, keyof MenuOptions>;

export function PlinthMenu({ id, className, children, ...rest }: PlinthMenuProps) {
  if (!id?.trim()) {
    throw new Error('<PlinthMenu> needs an id: its button names it in popoverTarget.');
  }
  const menuId = id.trim();

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <div id={menuId} popover="auto" {...rest} className={classNames('plinth-menu', className)}>
      {/* A button item closes the menu around it (PlinthMenuItem). */}
      <MenuIdContext value={menuId}>{children}</MenuIdContext>
    </div>
  );
}
