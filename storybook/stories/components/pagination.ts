import { pageItems, pageHref, pageCount, currentPage } from '@ptbdynamic/plinth-vue';
import { iconButton } from './icon-button.ts';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface PaginationArgs {
  /** The current page, from 1. */
  page: number;
  /** How many pages there are. */
  pages: number;
  /** The pages' URL with {page} in it (?page={page}); without it the pages are buttons. */
  href?: string;
  /** The nav's accessible name. */
  label?: string;
  /** Previous's accessible name. */
  previousLabel?: string;
  /** Next's accessible name. */
  nextLabel?: string;
  /** The summary, in the app's words (trusted markup, not escaped). */
  summary?: string;
  /** The page-size form (trusted markup, not escaped). */
  size?: string;
}

/**
 * The pagination's markup contract. Blade, Vue and React must print exactly this (see
 * parity.test.ts).
 */
export function pagination(
  {
    page,
    pages,
    href,
    label = 'Pagination',
    previousLabel = 'Previous page',
    nextLabel = 'Next page',
    summary,
    size,
  }: PaginationArgs,
  attributes: Attributes = {},
): string {
  const { 'aria-label': ariaLabel = label, ...others } = attributes;
  const { classes, extra } = rootAttributes('plinth-pagination', others);
  const last = pageCount(pages);
  const current = currentPage(page, last);
  const isLink = Boolean(href?.trim());
  const target = (to: number) => (isLink ? pageHref(href!, to) : undefined);

  const step = (
    to: number,
    enabled: boolean,
    name: string,
    rel: string,
    icon: 'chevron-left' | 'chevron-right',
  ) =>
    iconButton(
      {
        label: name,
        icon,
        variant: 'secondary',
        size: 'md',
        href: target(to),
        // A button at the end keeps focus: aria-disabled, not disabled.
        disabled: !enabled && isLink,
        busy: false,
      },
      enabled
        ? isLink
          ? { rel }
          : { 'data-page': String(to) }
        : isLink
          ? {}
          : { 'aria-disabled': 'true' },
    );

  const items = pageItems(current, last)
    .map((item) => {
      if (item === 'gap') {
        return '<li><span class="plinth-pagination-gap">…</span></li>';
      }
      const state = item === current ? ' aria-current="page"' : '';
      return isLink
        ? `<li><a class="plinth-pagination-page" href="${escape(pageHref(href!, item))}"${state}>${item}</a></li>`
        : `<li><button type="button" class="plinth-pagination-page" data-page="${item}"${state}>${item}</button></li>`;
    })
    .join('');

  return [
    `<nav class="${classes}"${extra} aria-label="${escape(ariaLabel)}">`,
    summary?.trim() ? `<p class="plinth-pagination-summary" role="status">${summary}</p>` : '',
    size?.trim() ? `<div class="plinth-pagination-size">${size}</div>` : '',
    '<div class="plinth-pagination-pages">',
    step(current - 1, current > 1, previousLabel, 'prev', 'chevron-left'),
    `<ol class="plinth-pagination-list">${items}</ol>`,
    step(current + 1, current < last, nextLabel, 'next', 'chevron-right'),
    '</div>',
    '</nav>',
  ].join('');
}
