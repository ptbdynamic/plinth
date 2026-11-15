// Markup contract: packages/css/src/components/pagination.css
import type { ComponentProps, ReactNode } from 'react';
import { PlinthIconButton } from './PlinthIconButton';
import { classNames, hasContent } from './markup';
import { currentPage, pageCount, pageHref, pageItems } from './pagination';

interface PaginationOptions {
  /** The current page, from 1. */
  page?: number | string;
  /** How many pages there are. */
  pages?: number | string;
  /** The pages' URL with {page} in it (?page={page}); without it the pages are buttons. */
  href?: string;
  /** The nav's accessible name. */
  label?: string;
  /** Previous's accessible name. */
  previousLabel?: string;
  /** Next's accessible name. */
  nextLabel?: string;
  /** The summary, in the app's words (Vue's default slot). */
  children?: ReactNode;
  /** The page-size form (Vue's `size` slot). */
  size?: ReactNode;
  /** A page button was chosen (only without href): the page to show (Vue's `update:page`). */
  onPageChange?: (page: number) => void;
}

export type PlinthPaginationProps = PaginationOptions &
  Omit<ComponentProps<'nav'>, keyof PaginationOptions>;

export function PlinthPagination({
  page,
  pages,
  href,
  label = 'Pagination',
  previousLabel = 'Previous page',
  nextLabel = 'Next page',
  children,
  size,
  onPageChange,
  className,
  ...rest
}: PlinthPaginationProps) {
  const isLink = Boolean(href?.trim());
  const last = pageCount(pages);
  const current = currentPage(page, last);
  const go = (to: number) => {
    if (to !== current) onPageChange?.(to);
  };

  const step = (
    to: number,
    enabled: boolean,
    name: string,
    rel: string,
    icon: 'chevron-left' | 'chevron-right',
  ) =>
    isLink ? (
      <PlinthIconButton
        label={name}
        icon={icon}
        variant="secondary"
        size="md"
        href={pageHref(href!, to)}
        disabled={!enabled}
        rel={enabled ? rel : undefined}
      />
    ) : (
      <PlinthIconButton
        label={name}
        icon={icon}
        variant="secondary"
        size="md"
        // A button at the end keeps focus: aria-disabled, not disabled.
        aria-disabled={enabled ? undefined : 'true'}
        data-page={enabled ? String(to) : undefined}
        onClick={enabled ? () => go(to) : undefined}
      />
    );

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class
  // (taken out of them) is added to Plinth's.
  return (
    <nav className={classNames('plinth-pagination', className)} aria-label={label} {...rest}>
      {hasContent(children) ? (
        <p className="plinth-pagination-summary" role="status">
          {children}
        </p>
      ) : null}
      {hasContent(size) ? <div className="plinth-pagination-size">{size}</div> : null}
      <div className="plinth-pagination-pages">
        {step(current - 1, current > 1, previousLabel, 'prev', 'chevron-left')}
        <ol className="plinth-pagination-list">
          {pageItems(current, last).map((item, index) =>
            item === 'gap' ? (
              <li key={`gap-${index}`}>
                <span className="plinth-pagination-gap">…</span>
              </li>
            ) : (
              <li key={item}>
                {isLink ? (
                  <a
                    className="plinth-pagination-page"
                    href={pageHref(href!, item)}
                    aria-current={item === current ? 'page' : undefined}
                  >
                    {item}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="plinth-pagination-page"
                    data-page={item}
                    aria-current={item === current ? 'page' : undefined}
                    onClick={() => go(item)}
                  >
                    {item}
                  </button>
                )}
              </li>
            ),
          )}
        </ol>
        {step(current + 1, current < last, nextLabel, 'next', 'chevron-right')}
      </div>
    </nav>
  );
}
