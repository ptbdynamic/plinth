import { pageHeaderLevel, type PageHeaderLevel } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface PageIntroArgs {
  /** The page's heading. */
  heading: string;
  /** The heading's element: `h1`, or `h2` to `h6` beside another page's `h1`. */
  level?: PageHeaderLevel;
  /** A line under the heading saying what the page is for. */
  description?: string;
  /** The description's id, for an `aria-describedby` that points at it. */
  descriptionId?: string;
  /** Shown from 768px only, beside a page header shown on a phone only (data-wide-only). */
  wideOnly?: boolean;
  /** The actions: the page's primary button, or a button or two (trusted markup, not escaped). */
  actions?: string;
}

/** The page intro's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function pageIntro(
  { heading, level, description, descriptionId, wideOnly, actions }: PageIntroArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-page-intro', attributes);
  const element = pageHeaderLevel(level);
  const id = descriptionId?.trim() ? ` id="${escape(descriptionId)}"` : '';
  return [
    // A project's data-wide-only wins over the page intro's own.
    `<div class="${classes}"${extra}${wideOnly && !('data-wide-only' in attributes) ? ' data-wide-only' : ''}>`,
    '<div class="plinth-page-intro-text">',
    `<${element} class="plinth-page-intro-heading">${escape(heading)}</${element}>`,
    description?.trim()
      ? `<p class="plinth-page-intro-description"${id}>${escape(description)}</p>`
      : '',
    '</div>',
    actions?.trim() ? `<div class="plinth-page-intro-actions">${actions}</div>` : '',
    '</div>',
  ].join('');
}
