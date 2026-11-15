import type { Meta, StoryObj } from '@storybook/html-vite';
import { pagination, type PaginationArgs } from './pagination.ts';
import { select } from './select.ts';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/select.css';
import '@ptbdynamic/plinth-css/src/components/pagination.css';

const summary = (from: number, to: number, total: number) =>
  `Showing <b>${from}</b> to <b>${to}</b> of <b>${total}</b> results`;

/** The page-size form: a select labelled Per page, submitted with GET. */
const pageSize = `<form method="get">${select({
  id: 'per-page',
  label: 'Per page',
  hideLabel: false,
  size: 'md',
  options:
    '<option value="25">25</option><option value="50">50</option><option value="100">100</option>',
  disabled: false,
  required: false,
})}</form>`;

const meta = {
  title: 'Components/Pagination',
  render: (args) => pagination(args),
  args: {
    page: 2,
    pages: 5,
    href: '?page={page}',
    summary: summary(26, 50, 120),
  },
  argTypes: {
    page: { control: 'number' },
    pages: { control: 'number' },
    href: { control: 'text' },
    summary: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The footer of a long list or table: a summary of what is shown, an optional page-size choice, and previous, next and the page numbers. ' +
          'Give it the current page, the number of pages and the pages’ URL with `{page}` in it (`?page={page}`): every page is then a link, for server-rendered pages without script. Without the URL the pages are buttons with `data-page`, for paging in place; the app listens and changes the page (Vue emits `update:page`, React calls `onPageChange`). ' +
          'The summary is the app’s own words, so it can count and translate them, and a polite live region. The page size is the app’s form with a select. ' +
          'It is a `<nav>` named Pagination; name it apart (`aria-label`) when a page has two. The page numbers are hidden on a phone, where previous and next are enough.',
      },
    },
  },
} satisfies Meta<PaginationArgs>;

export default meta;
type Story = StoryObj<PaginationArgs>;

/** A page in the middle: previous and next are links, the current page is marked. */
export const Default: Story = {};

/** The first page: previous is disabled. */
export const FirstPage: Story = { args: { page: 1, summary: summary(1, 25, 120) } };

/** The last page: next is disabled. */
export const LastPage: Story = { args: { page: 5, summary: summary(101, 120, 120) } };

/** Many pages: the first, the last, the current one and its neighbours, with gaps. */
export const ManyPages: Story = {
  args: { page: 7, pages: 20, summary: summary(151, 175, 500) },
};

/** All of it fits on one page: both ends disabled. */
export const OnePage: Story = {
  args: { page: 1, pages: 1, summary: 'Showing <b>1</b> to <b>2</b> of <b>2</b> results' },
};

/** With the page-size form between the summary and the pages. */
export const WithPageSize: Story = { args: { size: pageSize } };

/** Without a URL: buttons for paging in place, the app listening for data-page. */
export const InPlace: Story = { args: { href: undefined } };

/** In place on the first page: previous is a disabled button. */
export const InPlaceFirstPage: Story = {
  args: { href: undefined, page: 1, summary: summary(1, 25, 120) },
};

/** Without a summary: just the pages, at the end. */
export const WithoutSummary: Story = { args: { summary: undefined } };
