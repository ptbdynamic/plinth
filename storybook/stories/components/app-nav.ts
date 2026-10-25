import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface AppNavItemArgs {
  label: string;
  /** The page's address. */
  href: string;
  /** The item's icon (trusted markup, not escaped): the only thing the rail shows. */
  icon?: string;
  /** A number after the label, such as how many items wait there. */
  count?: string | number | null;
  /** The page being shown, or a page under it: aria-current="page". */
  current: boolean;
}

export interface AppNavArgs {
  /** The navigation's accessible name (aria-label). */
  label?: string;
  /** The app's name, beside its mark; the rail hides it but keeps it as the brand's name. */
  brandName?: string;
  /** Makes the brand a link, to the app's home. */
  brandHref?: string;
  /** The app's logo mark (trusted markup): the rail shows it alone. */
  mark?: string;
  items: AppNavItemArgs[];
  /** Below the items, on the bottom edge (trusted markup): more items, or the account. */
  footer?: string;
}

/** A count prints unless it is missing or blank, as Blade's filled() decides. */
const hasCount = (count: AppNavItemArgs['count']): count is string | number =>
  count !== undefined && count !== null && String(count).trim() !== '';

/** An item's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function appNavItem(
  { label, href, icon, count, current }: AppNavItemArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-app-nav-item', attributes);
  return [
    `<a class="${classes}"`,
    extra,
    // A blank href counts as missing, as Blade's filled() decides.
    href.trim() ? ` href="${escape(href)}"` : '',
    current ? ' aria-current="page"' : '',
    '>',
    icon?.trim() ? `<span class="plinth-app-nav-icon" aria-hidden="true">${icon}</span>` : '',
    `<span class="plinth-app-nav-label">${escape(label)}</span>`,
    hasCount(count) ? `<span class="plinth-app-nav-count">${escape(String(count))}</span>` : '',
    '</a>',
  ].join('');
}

/** The brand: the mark and the name, a link to the app's home with an href. */
function appNavBrand({ brandName, brandHref, mark }: AppNavArgs): string {
  const name = brandName?.trim() ? brandName : undefined;
  if (!name && !mark?.trim()) return '';
  const tag = brandHref?.trim() ? 'a' : 'div';
  return [
    tag === 'a' ? `<a class="plinth-app-nav-brand" href="${escape(brandHref ?? '')}">` : '',
    tag === 'div' ? '<div class="plinth-app-nav-brand">' : '',
    // With a name beside it the mark is decorative; alone, it names the brand itself.
    mark?.trim()
      ? `<span class="plinth-app-nav-mark"${name ? ' aria-hidden="true"' : ''}>${mark}</span>`
      : '',
    name ? `<span class="plinth-app-nav-name">${escape(name)}</span>` : '',
    `</${tag}>`,
  ].join('');
}

/** The app nav's markup contract, with its items. */
export function appNav(args: AppNavArgs, attributes: Attributes = {}): string {
  const { label, items, footer } = args;
  const { classes, extra } = rootAttributes('plinth-app-nav', attributes);
  return [
    `<nav class="${classes}"`,
    extra,
    label?.trim() ? ` aria-label="${escape(label)}"` : '',
    '>',
    appNavBrand(args),
    `<div class="plinth-app-nav-items">${items.map((item) => appNavItem(item)).join('')}</div>`,
    footer?.trim() ? `<div class="plinth-app-nav-footer">${footer}</div>` : '',
    '</nav>',
  ].join('');
}
