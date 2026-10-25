import { pageHeaderLevel, pageHeaderLevels, type PageHeaderLevel } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { pageHeaderLevels, type PageHeaderLevel };

export interface PageHeaderArgs {
  /** The page's heading. */
  heading: string;
  /** The heading's element: `h1`, or `h2` to `h6` beside another page's `h1`. */
  level: PageHeaderLevel;
  /** The screen's top bar: it adds the top safe-area inset (data-top). */
  top: boolean;
  /** The leading action, usually a menu button or a back link (trusted markup, not escaped). */
  leading?: string;
  /** The trailing actions: icon buttons or a primary button (trusted markup). */
  actions?: string;
}

/** The page header's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function pageHeader(
  { heading, level, top, leading, actions }: PageHeaderArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-page-header', attributes);
  const element = pageHeaderLevel(level);
  return [
    `<header class="${classes}"${extra}${top ? ' data-top' : ''}>`,
    leading?.trim() ? `<div class="plinth-page-header-leading">${leading}</div>` : '',
    `<${element} class="plinth-page-header-heading">${escape(heading)}</${element}>`,
    actions?.trim() ? `<div class="plinth-page-header-actions">${actions}</div>` : '',
    '</header>',
  ].join('');
}
