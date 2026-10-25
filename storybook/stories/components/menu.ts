import { menuItemTones, type MenuItemTone } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { menuItemTones, type MenuItemTone };

export interface MenuItemArgs {
  label: string;
  /** The item's address; without it the item is a button. */
  href?: string;
  /** danger for an action that destroys or removes something. */
  tone: MenuItemTone;
  /** A keyboard shortcut to show at the item's end, such as ⌘D. */
  shortcut?: string;
  /** The project's own SVG markup for an icon before the label (trusted, not escaped). */
  icon?: string;
  /** Disables the item. */
  disabled: boolean;
}

export interface MenuGroupArgs {
  /** The heading over the group's items, and the group's accessible name. */
  label?: string;
  items: MenuItemArgs[];
}

/** One entry of a menu: an item, a separator or a group. */
export type MenuEntry = MenuItemArgs | 'separator' | MenuGroupArgs;

export interface MenuArgs {
  /** The menu's id, which its button names in popovertarget. */
  id: string;
  entries: MenuEntry[];
}

/**
 * An item's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts).
 * Inside a menu, a button item closes it: `menu` is that menu's id.
 */
export function menuItem(
  { label, href, tone, shortcut, icon, disabled }: MenuItemArgs,
  attributes: Attributes = {},
  menu?: string,
): string {
  // A blank href counts as missing, as Blade's filled() decides.
  const tag = href?.trim() ? 'a' : 'button';
  // A button's type defaults to "button"; a project's own type (submit) replaces it.
  const { type = 'button', ...others } = attributes;
  const { classes, extra } = rootAttributes(
    'plinth-menu-item',
    tag === 'button' ? others : attributes,
  );
  const closes = tag === 'button' && menu;
  const open = [
    tag === 'button' ? `<button type="${escape(type)}"` : '<a',
    ` class="${classes}"`,
    extra,
    tag === 'a' && !disabled ? ` href="${escape(href ?? '')}"` : '',
    closes ? ` commandfor="${escape(menu)}" command="hide-popover"` : '',
    tone === 'danger' ? ' data-tone="danger"' : '',
    disabled && tag === 'button' ? ' disabled' : '',
    disabled && tag === 'a' ? ' role="link" aria-disabled="true"' : '',
    '>',
  ].join('');
  return [
    open,
    icon?.trim() ? `<span class="plinth-menu-icon" aria-hidden="true">${icon}</span>` : '',
    `<span class="plinth-menu-label">${escape(label)}</span>`,
    shortcut?.trim()
      ? `<kbd class="plinth-menu-shortcut" aria-hidden="true">${escape(shortcut)}</kbd>`
      : '',
    `</${tag}>`,
  ].join('');
}

/** The separator's markup contract. */
export function menuSeparator(attributes: Attributes = {}): string {
  const { classes, extra } = rootAttributes('plinth-menu-separator', attributes);
  return `<hr class="${classes}"${extra}>`;
}

/** A group's markup contract, around its items' markup. */
export function menuGroup(
  { label }: Pick<MenuGroupArgs, 'label'>,
  content: string,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-menu-group', attributes);
  const named = label?.trim();
  return [
    `<div class="${classes}"${extra} role="group"`,
    named ? ` aria-label="${escape(label ?? '')}"` : '',
    '>',
    named ? `<div class="plinth-menu-heading" aria-hidden="true">${escape(label ?? '')}</div>` : '',
    content,
    '</div>',
  ].join('');
}

/** A menu's entries, each item closing the menu with the id given. */
export function menuEntries(entries: MenuEntry[], menu?: string): string {
  return entries
    .map((entry) => {
      if (entry === 'separator') return menuSeparator();
      if ('items' in entry) {
        return menuGroup(entry, entry.items.map((item) => menuItem(item, {}, menu)).join(''));
      }
      return menuItem(entry, {}, menu);
    })
    .join('');
}

/** The menu's markup contract, with its entries. */
export function menu({ id, entries }: MenuArgs, attributes: Attributes = {}): string {
  const { classes, extra } = rootAttributes('plinth-menu', attributes);
  return [
    `<div class="${classes}"${extra} id="${escape(id)}" popover="auto">`,
    menuEntries(entries, id),
    '</div>',
  ].join('');
}
