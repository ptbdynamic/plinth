// Markup contract: packages/css/src/components/menu.css
import { use, type ComponentProps, type ElementType, type ReactNode } from 'react';
import type { InvokerCommandProps } from './button';
import { classNames, hasContent } from './markup';
import { MenuIdContext, menuItemTone, type MenuItemTone } from './menu';

interface MenuItemOptions {
  /** `danger` for an item that destroys or removes something. */
  tone?: MenuItemTone;
  /** A keyboard shortcut to show at the item's end, such as ⌘D. */
  shortcut?: string;
  /** Disables the item. */
  disabled?: boolean;
  /** The id of the menu a button item closes; the menu around it when missing. */
  menu?: string;
  /** The project's icon before the label, decorative (Vue's `icon` slot). */
  icon?: ReactNode;
}

/**
 * A `<button>` that closes its menu when pressed (its own `commandfor` and `command` win), or
 * with an `href` a link. The label is `children`.
 */
export type PlinthMenuItemProps =
  | (MenuItemOptions &
      InvokerCommandProps &
      Omit<ComponentProps<'button'>, keyof MenuItemOptions | keyof InvokerCommandProps> & {
        href?: undefined;
      })
  | (MenuItemOptions & Omit<ComponentProps<'a'>, keyof MenuItemOptions> & { href: string });

export function PlinthMenuItem({
  href,
  tone,
  shortcut,
  disabled = false,
  menu,
  icon,
  className,
  children,
  ...rest
}: PlinthMenuItemProps) {
  const around = use(MenuIdContext);
  // A blank href counts as missing, as Blade's filled() decides.
  const tag = href?.trim() ? 'a' : 'button';
  const Tag = tag as ElementType;
  const closes = tag === 'button' ? menu?.trim() || around : undefined;

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <Tag
      type={tag === 'button' ? 'button' : undefined}
      href={tag === 'a' && !disabled ? href : undefined}
      commandfor={closes || undefined}
      command={closes ? 'hide-popover' : undefined}
      data-tone={menuItemTone(tone) === 'danger' ? 'danger' : undefined}
      disabled={tag === 'button' && disabled ? true : undefined}
      role={tag === 'a' && disabled ? 'link' : undefined}
      aria-disabled={tag === 'a' && disabled ? 'true' : undefined}
      {...rest}
      className={classNames('plinth-menu-item', className)}
    >
      {hasContent(icon) ? (
        <span className="plinth-menu-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="plinth-menu-label">{children}</span>
      {shortcut?.trim() ? (
        <kbd className="plinth-menu-shortcut" aria-hidden="true">
          {shortcut}
        </kbd>
      ) : null}
    </Tag>
  );
}
