/** A page number or a gap of more than one page between the numbers shown (pagination.css). */
export type PageItem = number | 'gap';

/** A whole number from a prop, or undefined for anything else (a blank string included). */
function whole(value: number | string | null | undefined): number | undefined {
  if (typeof value === 'string' && !/^\s*\d+\s*$/.test(value)) return undefined;
  if (typeof value !== 'number' && typeof value !== 'string') return undefined;
  const number = Math.floor(Number(value));
  return Number.isFinite(number) ? number : undefined;
}

/** How many pages there are: at least 1. */
export function pageCount(pages: number | string | null | undefined): number {
  return Math.max(whole(pages) ?? 1, 1);
}

/** The current page, from 1 to the last page. */
export function currentPage(page: number | string | null | undefined, last: number): number {
  return Math.min(Math.max(whole(page) ?? 1, 1), last);
}

/** A page's URL: the pattern with every {page} replaced by the page's number. */
export function pageHref(pattern: string, page: number): string {
  return pattern.replaceAll('{page}', String(page));
}

/**
 * The page numbers shown: the first and last pages, the current one and its neighbours. A gap of
 * one page shows that page; a longer one is a gap.
 */
export function pageItems(page: number, last: number): PageItem[] {
  const shown = [...new Set([1, page - 1, page, page + 1, last])]
    .filter((number) => number >= 1 && number <= last)
    .sort((a, b) => a - b);
  const items: PageItem[] = [];
  let previous = 0;
  for (const number of shown) {
    if (number - previous === 2) items.push(previous + 1);
    else if (number - previous > 2) items.push('gap');
    items.push(number);
    previous = number;
  }
  return items;
}
