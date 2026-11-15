import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { PlinthPagination } from '../src/index.ts';
import { currentPage, pageCount, pageHref, pageItems } from '../src/pagination.ts';

const squish = (html: string) => html.replace(/<!--.*?-->/g, '').replace(/>\s+</g, '><');
const numbers = (html: string) =>
  [...html.matchAll(/<li><(?:a|button|span)[^>]*>\s*([^<]*?)\s*</g)].map((match) => match[1]);

describe('PlinthPagination', () => {
  it('prints the pagination markup contract', () => {
    const wrapper = mount(PlinthPagination, {
      props: { page: 2, pages: 3, href: '?page={page}' },
      slots: { default: 'Showing <b>26</b> to <b>50</b>' },
    });
    const html = squish(wrapper.html());

    expect(html).toMatch(
      /^<nav class="plinth-pagination" aria-label="Pagination"><p class="plinth-pagination-summary" role="status">Showing <b>26<\/b> to <b>50<\/b><\/p><div class="plinth-pagination-pages"><a class="plinth-button plinth-icon-button" href="\?page=1" data-variant="secondary" data-size="md" aria-label="Previous page" rel="prev"><span class="plinth-icon" data-size="md" data-icon="chevron-left" data-mirror="" aria-hidden="true">/,
    );
    expect(html).toContain(
      '<ol class="plinth-pagination-list"><li><a class="plinth-pagination-page" href="?page=1">1</a></li><li><a class="plinth-pagination-page" href="?page=2" aria-current="page">2</a></li><li><a class="plinth-pagination-page" href="?page=3">3</a></li></ol>',
    );
    expect(html).toContain(
      'href="?page=3" data-variant="secondary" data-size="md" aria-label="Next page" rel="next"',
    );
  });

  it('prints the page-size form, and leaves out a blank summary and size', () => {
    const full = mount(PlinthPagination, { slots: { size: '<form method="get">Per page</form>' } });
    expect(full.get('.plinth-pagination-size').html()).toContain('Per page');
    expect(full.find('.plinth-pagination-summary').exists()).toBe(false);

    const blank = mount(PlinthPagination, { slots: { default: ' ', size: ' ' } });
    expect(blank.find('.plinth-pagination-size').exists()).toBe(false);
    expect(blank.find('.plinth-pagination-summary').exists()).toBe(false);
  });

  it('disables previous on the first page and next on the last', () => {
    const first = mount(PlinthPagination, { props: { page: 1, pages: 3, href: '?page={page}' } });
    const [previous, next] = first.findAll('.plinth-icon-button');
    expect(previous!.attributes()).toMatchObject({ role: 'link', 'aria-disabled': 'true' });
    expect(previous!.attributes('href')).toBeUndefined();
    expect(previous!.attributes('rel')).toBeUndefined();
    expect(next!.attributes('rel')).toBe('next');

    const last = mount(PlinthPagination, { props: { page: 3, pages: 3 } });
    const [back, forward] = last.findAll('.plinth-icon-button');
    expect(forward!.attributes('aria-disabled')).toBe('true');
    expect(forward!.attributes('disabled')).toBeUndefined();
    expect(forward!.attributes('data-page')).toBeUndefined();
    expect(back!.attributes('data-page')).toBe('2');
  });

  it('prints buttons without an href and emits update:page', async () => {
    const wrapper = mount(PlinthPagination, { props: { page: 2, pages: 3 } });
    expect(wrapper.html()).not.toContain('rel=');
    expect(
      wrapper.get('.plinth-pagination-page[aria-current="page"]').attributes('data-page'),
    ).toBe('2');

    await wrapper.get('.plinth-pagination-page[data-page="3"]').trigger('click');
    await wrapper.get('.plinth-pagination-page[data-page="2"]').trigger('click');
    await wrapper.findAll('.plinth-icon-button')[0]!.trigger('click');
    await wrapper.findAll('.plinth-icon-button')[1]!.trigger('click');

    expect(wrapper.emitted('update:page')).toEqual([[3], [1], [3]]);
  });

  it('shows the first, last, current and neighbouring pages, with gaps', () => {
    const at = (page: number, pages: number) =>
      numbers(squish(mount(PlinthPagination, { props: { page, pages } }).html()));
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
    expect(currentPage(undefined, 3)).toBe(1);
    expect(pageItems(2, 4)).toEqual([1, 2, 3, 4]);
  });

  it('reads a blank href as none, and does nothing at the ends in place', async () => {
    const wrapper = mount(PlinthPagination, { props: { page: 1, pages: 2, href: ' ' } });
    expect(wrapper.html()).not.toContain('href=');
    await wrapper.findAll('.plinth-icon-button')[0]!.trigger('click');
    expect(wrapper.emitted('update:page')).toBeUndefined();
  });

  it('puts the page in every {page} of the href', () => {
    expect(pageHref('/orders/{page}?from={page}', 2)).toBe('/orders/2?from=2');
  });

  it('takes its own labels', () => {
    const html = mount(PlinthPagination, {
      props: { label: 'Páginas', previousLabel: 'Anterior', nextLabel: 'Seguinte' },
    }).html();
    expect(html).toContain('aria-label="Páginas"');
    expect(html).toContain('aria-label="Anterior"');
    expect(html).toContain('aria-label="Seguinte"');
  });

  it('escapes the text', () => {
    const wrapper = mount(PlinthPagination, {
      props: { pages: 2, href: '?q="a"&page={page}', label: '<b>x</b>' },
    });
    expect(wrapper.attributes('aria-label')).toBe('<b>x</b>');
    expect(wrapper.find('b').exists()).toBe(false);
    expect(wrapper.html()).toContain('href="?q=&quot;a&quot;&amp;page=2"');
  });

  it('keeps extra attributes, and the project wins a clash', () => {
    const html = mount(PlinthPagination, {
      attrs: { class: 'mt-4', id: 'pages', 'data-testid': 'pages', 'aria-label': 'Orders pages' },
    }).html();
    expect(html).toContain('class="plinth-pagination mt-4"');
    expect(html).toContain('id="pages"');
    expect(html).toContain('data-testid="pages"');
    expect(html).toContain('aria-label="Orders pages"');
    expect(html).not.toContain('aria-label="Pagination"');
  });
});
