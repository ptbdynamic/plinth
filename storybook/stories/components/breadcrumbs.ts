import {
  breadcrumbsCollapse,
  breadcrumbsCollapses,
  type BreadcrumbsCollapse,
} from '@ptbdynamic/plinth-vue';
import { icon } from './icon.ts';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { breadcrumbsCollapses, type BreadcrumbsCollapse };

export interface BreadcrumbsItemArgs {
  label: string;
  /** The page's address; the current page has none. */
  href?: string;
  /** The page being shown: aria-current="page", and no href. */
  current: boolean;
}

export interface BreadcrumbsMoreArgs {
  /** The id of the menu the button opens (popovertarget). */
  menu: string;
  /** The button's accessible name; "More pages" when it is missing. */
  label?: string;
  /** The menu (trusted markup): the app's menu of the pages left out of the trail. */
  content?: string;
}

/** A step of the trail: an item, or the more button with its menu. */
export type BreadcrumbsEntry = BreadcrumbsItemArgs | ({ more: true } & BreadcrumbsMoreArgs);

export interface BreadcrumbsArgs {
  /** The trail's accessible name (aria-label), "Breadcrumb" when it is missing; blank for none. */
  label?: string;
  /** On a phone, `parent` shows only the current page's parent, as a back link. */
  collapse: BreadcrumbsCollapse;
  entries: BreadcrumbsEntry[];
}

/** An item's markup contract: the link is its root. Blade, Vue and React must print exactly this. */
export function breadcrumbsItem(
  { label, href, current }: BreadcrumbsItemArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-breadcrumbs-link', attributes);
  return [
    '<li class="plinth-breadcrumbs-item">',
    `<a class="${classes}"${extra}`,
    // A blank href counts as missing, as Blade's filled() decides; the current page has none.
    !current && href?.trim() ? ` href="${escape(href)}"` : '',
    current ? ' aria-current="page"' : '',
    '>',
    `<span class="plinth-breadcrumbs-label">${escape(label)}</span>`,
    '</a></li>',
  ].join('');
}

/** The more button's markup contract: the button is its root, the app's menu follows it. */
export function breadcrumbsMore(
  { menu, label = 'More pages', content }: BreadcrumbsMoreArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-breadcrumbs-more', attributes);
  return [
    '<li class="plinth-breadcrumbs-item">',
    `<button class="${classes}"${extra} type="button" popovertarget="${escape(menu.trim())}"`,
    ` aria-label="${escape(label)}">`,
    icon({ name: 'more', size: 'sm', mirror: false }),
    '</button>',
    content ?? '',
    '</li>',
  ].join('');
}

/** The trail's markup contract, with its entries. */
export function breadcrumbs(
  { label = 'Breadcrumb', collapse, entries }: BreadcrumbsArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-breadcrumbs', attributes);
  const resolved = breadcrumbsCollapse(collapse);
  return [
    `<nav class="${classes}"${extra}`,
    label?.trim() ? ` aria-label="${escape(label)}"` : '',
    resolved === 'none' ? '' : ` data-collapse="${resolved}"`,
    '><ol class="plinth-breadcrumbs-list">',
    entries
      .map((entry) => ('more' in entry ? breadcrumbsMore(entry) : breadcrumbsItem(entry)))
      .join(''),
    '</ol></nav>',
  ].join('');
}
