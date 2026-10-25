import { icon } from './icon.ts';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface AppBarSearchArgs {
  /** The button's text and name. */
  label: string;
  /** The keyboard hint after the label, such as ⌘K or Ctrl K; the app picks it. */
  shortcut?: string;
}

export interface AppBarArgs {
  /** The start (trusted markup): the search button. */
  search?: string;
  /** The actions (trusted markup): icon buttons such as Notifications and Help. */
  actions?: string;
  /** The account (trusted markup), on the end edge: an avatar button or the account's menu. */
  account?: string;
}

/** The search button's markup contract. Blade, Vue and React must print exactly this. */
export function appBarSearch(
  { label, shortcut }: AppBarSearchArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-app-bar-search', attributes);
  return [
    `<button class="${classes}"${extra} type="button">`,
    icon({ name: 'search', size: 'sm', mirror: false }),
    `<span class="plinth-app-bar-search-label">${escape(label)}</span>`,
    shortcut?.trim()
      ? `<kbd class="plinth-app-bar-search-shortcut" aria-hidden="true">${escape(shortcut)}</kbd>`
      : '',
    '</button>',
  ].join('');
}

/** The app bar's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function appBar(
  { search, actions, account }: AppBarArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-app-bar', attributes);
  return [
    `<header class="${classes}"${extra}>`,
    search?.trim() ? `<div class="plinth-app-bar-start">${search}</div>` : '',
    actions?.trim() ? `<div class="plinth-app-bar-actions">${actions}</div>` : '',
    account?.trim() ? `<div class="plinth-app-bar-account">${account}</div>` : '',
    '</header>',
  ].join('');
}
