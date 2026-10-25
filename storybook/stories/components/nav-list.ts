import { headingLevel, type HeadingLevel } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface NavListItemArgs {
  label: string;
  /** The view's address. */
  href: string;
  /** A number after the label, such as how many items the view holds. */
  count?: string | number | null;
  /** The view being shown: aria-current="page". */
  current: boolean;
}

export interface NavListGroupArgs {
  /** A heading above the group's items. */
  heading?: string;
  /** The heading's element, h2 to h6 (h2 by default). */
  headingLevel?: HeadingLevel;
  items: NavListItemArgs[];
}

export interface NavListArgs {
  /** The navigation's accessible name (aria-label). */
  label?: string;
  groups: NavListGroupArgs[];
}

/** A count prints unless it is missing or blank, as Blade's filled() decides. */
const hasCount = (count: NavListItemArgs['count']): count is string | number =>
  count !== undefined && count !== null && String(count).trim() !== '';

/** An item's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function navListItem(
  { label, href, count, current }: NavListItemArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-nav-list-item', attributes);
  return [
    `<a class="${classes}"`,
    extra,
    // A blank href counts as missing, as Blade's filled() decides.
    href.trim() ? ` href="${escape(href)}"` : '',
    current ? ' aria-current="page"' : '',
    '>',
    `<span class="plinth-nav-list-label">${escape(label)}</span>`,
    hasCount(count) ? `<span class="plinth-nav-list-count">${escape(String(count))}</span>` : '',
    '</a>',
  ].join('');
}

/** A group's markup contract: the optional heading, then its items. */
export function navListGroup(
  { heading, headingLevel: level, items }: NavListGroupArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-nav-list-group', attributes);
  const tag = headingLevel(level);
  return [
    `<div class="${classes}"${extra}>`,
    heading?.trim() ? `<${tag} class="plinth-nav-list-heading">${escape(heading)}</${tag}>` : '',
    items.map((item) => navListItem(item)).join(''),
    '</div>',
  ].join('');
}

/** The nav list's markup contract, with its groups. */
export function navList({ label, groups }: NavListArgs, attributes: Attributes = {}): string {
  const { classes, extra } = rootAttributes('plinth-nav-list', attributes);
  return [
    `<nav class="${classes}"`,
    extra,
    label?.trim() ? ` aria-label="${escape(label)}"` : '',
    '>',
    groups.map((group) => navListGroup(group)).join(''),
    '</nav>',
  ].join('');
}
