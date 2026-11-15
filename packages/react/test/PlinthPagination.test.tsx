import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlinthPagination } from '../src/index.ts';
import { currentPage, pageCount, pageHref, pageItems } from '../src/pagination.ts';

const numbers = (html: string) =>
  [...html.matchAll(/<li><(?:a|button|span)[^>]*>([^<]*)</g)].map((match) => match[1]);

describe('PlinthPagination', () => {
  it('prints the pagination markup contract', () => {
    const html = renderToStaticMarkup(
      <PlinthPagination page={2} pages={3} href="?page={page}">
        Showing <b>26</b> to <b>50</b>
      </PlinthPagination>,
    );

    expect(html).toMatch(
      /^<nav class="plinth-pagination" aria-label="Pagination"><p class="plinth-pagination-summary" role="status">Showing <b>26<\/b> to <b>50<\/b><\/p><div class="plinth-pagination-pages"><a class="plinth-button plinth-icon-button" data-variant="secondary" data-size="md" aria-label="Previous page" href="\?page=1" rel="prev">/,
    );
    expect(html).toContain('rel="prev"');
    expect(html).toContain(
      '<ol class="plinth-pagination-list"><li><a class="plinth-pagination-page" href="?page=1">1</a></li><li><a class="plinth-pagination-page" href="?page=2" aria-current="page">2</a></li><li><a class="plinth-pagination-page" href="?page=3">3</a></li></ol>',
    );
    expect(html).toContain('rel="next"');
  });

  it('prints the page-size form, and leaves out a blank summary and size', () => {
    const full = renderToStaticMarkup(
      <PlinthPagination size={<form method="get">Per page</form>} />,
    );
    expect(full).toContain(
      '<div class="plinth-pagination-size"><form method="get">Per page</form></div>',
    );
    expect(full).not.toContain('plinth-pagination-summary');

    const blank = renderToStaticMarkup(<PlinthPagination size={false}> </PlinthPagination>);
    expect(blank).not.toContain('plinth-pagination-size');
    expect(blank).not.toContain('plinth-pagination-summary');
  });

  it('disables previous on the first page and next on the last', () => {
    const first = renderToStaticMarkup(<PlinthPagination page={1} pages={3} href="?page={page}" />);
    expect(first).toContain('aria-label="Previous page" role="link" aria-disabled="true"');
    expect(first).not.toContain('rel="prev"');
    expect(first).toContain('rel="next"');

    const last = renderToStaticMarkup(<PlinthPagination page={3} pages={3} />);
    expect(last).toMatch(/aria-label="Next page"[^>]*aria-disabled="true"/);
    expect(last).not.toContain('disabled=""');
    expect(last).toContain('data-page="2"');
    expect(last).not.toContain('data-page="4"');
  });

  it('prints buttons without an href and calls onPageChange', () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <PlinthPagination page={2} pages={3} onPageChange={onPageChange} />,
    );
    expect(container.innerHTML).not.toContain('rel=');
    const [previous, next] = container.querySelectorAll('.plinth-icon-button');

    fireEvent.click(container.querySelector('.plinth-pagination-page[data-page="3"]')!);
    fireEvent.click(container.querySelector('.plinth-pagination-page[data-page="2"]')!);
    fireEvent.click(previous!);
    fireEvent.click(next!);

    expect(onPageChange.mock.calls).toEqual([[3], [1], [3]]);
  });

  it('reads a blank href as none, and does nothing at the ends in place', () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <PlinthPagination page={1} pages={2} href=" " onPageChange={onPageChange} />,
    );
    expect(container.innerHTML).not.toContain('href=');
    fireEvent.click(container.querySelector('.plinth-icon-button')!);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('pages in place without onPageChange', () => {
    const { container } = render(<PlinthPagination page={1} pages={2} />);
    expect(() =>
      fireEvent.click(container.querySelector('.plinth-pagination-page[data-page="2"]')!),
    ).not.toThrow();
  });

  it('shows the first, last, current and neighbouring pages, with gaps', () => {
    const at = (page: number, pages: number) =>
      numbers(renderToStaticMarkup(<PlinthPagination page={page} pages={pages} />));
    expect(at(1, 1)).toEqual(['1']);
    expect(at(1, 20)).toEqual(['1', '2', '…', '20']);
    expect(at(4, 20)).toEqual(['1', '2', '3', '4', '5', '…', '20']);
    expect(at(7, 20)).toEqual(['1', '…', '6', '7', '8', '…', '20']);
    expect(at(20, 20)).toEqual(['1', '…', '19', '20']);
  });

  it('keeps the numbers in range and reads them from text', () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount('6')).toBe(6);
    expect(pageCount(4.7)).toBe(4);
    expect(pageCount(' ')).toBe(1);
    expect(pageCount(null)).toBe(1);
    expect(pageCount(Number.NaN)).toBe(1);
    expect(currentPage(12, 3)).toBe(3);
    expect(currentPage(' 2 ', 3)).toBe(2);
    expect(currentPage('two', 3)).toBe(1);
    expect(pageItems(2, 4)).toEqual([1, 2, 3, 4]);
    expect(pageHref('/orders/{page}?from={page}', 2)).toBe('/orders/2?from=2');
  });

  it('takes its own labels', () => {
    const html = renderToStaticMarkup(
      <PlinthPagination label="Páginas" previousLabel="Anterior" nextLabel="Seguinte" />,
    );
    expect(html).toContain('aria-label="Páginas"');
    expect(html).toContain('aria-label="Anterior"');
    expect(html).toContain('aria-label="Seguinte"');
  });

  it('escapes the text', () => {
    const html = renderToStaticMarkup(
      <PlinthPagination pages={2} href={'?q="a"&page={page}'} label="<b>x</b>" />,
    );
    expect(html).toContain('aria-label="&lt;b&gt;x&lt;/b&gt;"');
    expect(html).toContain('href="?q=&quot;a&quot;&amp;page=2"');
  });

  it('keeps extra props and the ref, and the project wins a clash', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <PlinthPagination
        ref={ref}
        className="mt-4"
        id="pages"
        data-testid="pages"
        aria-label="Orders pages"
      />,
    );
    const nav = container.firstElementChild!;
    expect(ref.current).toBe(nav);
    expect(nav.className).toBe('plinth-pagination mt-4');
    expect(nav.id).toBe('pages');
    expect(nav.getAttribute('data-testid')).toBe('pages');
    expect(nav.getAttribute('aria-label')).toBe('Orders pages');
  });
});
