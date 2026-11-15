# Pagination

The footer of a long list or table: a summary of what is shown (_Showing 26 to 50 of 120
results_), an optional page-size choice, and previous, next and the page numbers. Put it under a
[data table](data-table.md) or a [list card](list-card.md), inside the same bordered container
when the list has one.

## When not to use it

- For moving between the sections of one page: use the [section menu](section-menu.md).
- For a list that loads more as you scroll, or with a _Show more_ button: a [button](button.md)
  under the list is enough.
- For steps a user goes through in order (a wizard): previous and next there are the form's own
  buttons.

## Links

Give it the current **`page`**, the number of **`pages`** and the pages' URL in **`href`**, with
`{page}` where the number goes (`?page={page}`), with the list's other query parameters in it
too (`?status=open&page={page}`). Every page is then a link, so server-rendered
pages page without script; previous and next carry `rel="prev"` and `rel="next"`. The summary is
the slot, in the app's own words so it can count and translate them; `<b>` sets the numbers
apart.

```blade example layout="stack"
<x-plinth::pagination :page="2" :pages="5" href="?page={page}">
    Showing <b>26</b> to <b>50</b> of <b>120</b> results
</x-plinth::pagination>
```

## The first and last pages

On the first page previous is disabled, and on the last page next is: a link without an `href`,
with `aria-disabled="true"`. A button (paging in place) takes `aria-disabled="true"` and no
`data-page` instead of `disabled`, so it keeps focus when the user reaches the end with it.

```blade example layout="stack"
<x-plinth::pagination :page="1" :pages="5" href="?page={page}">
    Showing <b>1</b> to <b>25</b> of <b>120</b> results
</x-plinth::pagination>
```

## Many pages

The numbers show the first and last pages, the current one and its neighbours. A gap of one page
shows that page; a longer one is an ellipsis. On a phone only the current page shows, between
previous and next.

```blade example layout="stack"
<x-plinth::pagination :page="7" :pages="20" href="?page={page}">
    Showing <b>151</b> to <b>175</b> of <b>500</b> results
</x-plinth::pagination>
```

## The page size

The **`size`** slot holds the app's page-size form, with a [select](select.md); the select's
label sits beside it here. A form without script needs a submit button; with Livewire, bind the
select with `wire:model.live`. Give that select no description or error: its label sits beside
it. On a phone the summary takes the first line, and the page size and the pages the second.

```blade example layout="stack"
<x-plinth::pagination :page="2" :pages="5" href="?page={page}">
    Showing <b>26</b> to <b>50</b> of <b>120</b> results
    <x-slot:size>
        <form method="get">
            <x-plinth::select id="per-page" name="per_page" label="Per page">
                <option value="25" selected>25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </x-plinth::select>
        </form>
    </x-slot:size>
</x-plinth::pagination>
```

## Paging in place

Without `href` the pages are buttons, each with `data-page`, for paging without a page load. The
app owns the page: Vue emits `update:page` (so `v-model:page` works) and React calls
`onPageChange`, with the page to show. In Blade, read `data-page` with Alpine, for example
calling Livewire's `gotoPage()` (see Props).

```blade example layout="stack"
<x-plinth::pagination :page="2" :pages="5">
    Showing <b>26</b> to <b>50</b> of <b>120</b> results
</x-plinth::pagination>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                        | Element                  | Holds                                                             |
| --------------------------- | ------------------------ | ----------------------------------------------------------------- |
| `plinth-pagination`         | `<nav>`                  | the root, a landmark named by `aria-label`                        |
| `plinth-pagination-summary` | `<p>`                    | the optional summary, `role="status"`                             |
| `plinth-pagination-size`    | `<div>`                  | the optional page-size form                                       |
| `plinth-pagination-pages`   | `<div>`                  | previous, the numbers and next                                    |
| previous and next           | `plinth-icon-button`     | secondary icon buttons with a chevron that flips in RTL text      |
| `plinth-pagination-list`    | `<ol>`                   | the page numbers, each in an `<li>`; only the current below 768px |
| `plinth-pagination-page`    | `<a href>` or `<button>` | a page number                                                     |
| `plinth-pagination-gap`     | `<span>`                 | an ellipsis for pages left out                                    |

| Attribute or state                | On                | Values                                               | Default      |
| --------------------------------- | ----------------- | ---------------------------------------------------- | ------------ |
| `aria-label`                      | the root          | the nav's name                                       | `Pagination` |
| `aria-current="page"`             | a page            | the current page                                     | page 1       |
| `rel="prev"`, `rel="next"`        | previous and next | on links that go somewhere                           | links only   |
| `data-page`                       | buttons           | the page a button shows; left out on a disabled one  | buttons only |
| `aria-disabled="true"`, no `href` | previous or next  | a link on the first or last page, with `role="link"` | none         |
| `aria-disabled="true"`            | previous or next  | a button on the first or last page, no `data-page`   | none         |

The current page takes the selection tint inside a 2px accent edge, so colour is not its only
cue, and the system's Highlight in forced colours.

## Props

The same names in every layer. React takes the Vue props, with the summary as `children` and the
page size as a prop that takes a node. Extra attributes go to the `<nav>`, and the project's win
a clash (`class` is added), so `aria-label` names it apart from another pagination.

| Prop           | Blade                            | Vue                    | React                  | Default         |
| -------------- | -------------------------------- | ---------------------- | ---------------------- | --------------- |
| page           | `:page="$orders->currentPage()"` | `v-model:page="page"`  | `page={page}`          | `1`             |
| pages          | `:pages="$orders->lastPage()"`   | `:pages="12"`          | `pages={12}`           | `1`             |
| href           | `href="?page={page}"`            | `href="?page={page}"`  | `href="?page={page}"`  | none (buttons)  |
| label          | `label="Orders pages"`           | `label="Orders pages"` | `label="Orders pages"` | `Pagination`    |
| previous label | `previous-label="…"`             | `previous-label="…"`   | `previousLabel="…"`    | `Previous page` |
| next label     | `next-label="…"`                 | `next-label="…"`       | `nextLabel="…"`        | `Next page`     |
| summary        | the slot                         | the default slot       | `children`             | none            |
| page size      | `<x-slot:size>`                  | `#size` slot           | `size` (a node)        | none            |

`page` and `pages` take numbers or whole numbers as text; a page outside 1 to `pages` is kept
inside it. Vue emits `update:page` and React calls `onPageChange(page)` when a page button is
chosen (buttons only; the current page emits nothing).

```blade tab="Blade"
<x-plinth::pagination
    :page="$orders->currentPage()"
    :pages="$orders->lastPage()"
    :href="'?status='.urlencode($status).'&page={page}'"
>
    Showing <b>{{ $orders->firstItem() }}</b> to <b>{{ $orders->lastItem() }}</b> of <b>{{ $orders->total() }}</b> results
</x-plinth::pagination>

{{-- In place, with Livewire: --}}
<x-plinth::pagination
    :page="$orders->currentPage()"
    :pages="$orders->lastPage()"
    x-on:click="const target = $event.target.closest('[data-page]'); if (target && !target.matches('[aria-current]')) $wire.gotoPage(Number(target.dataset.page))"
>
    …
</x-plinth::pagination>
```

```vue tab="Vue"
<PlinthPagination v-model:page="page" :pages="Math.ceil(total / perPage)">
  Showing <b>{{ first }}</b> to <b>{{ last }}</b> of <b>{{ total }}</b> results
  <template #size>
    <PlinthSelect id="per-page" v-model="perPage" label="Per page">…</PlinthSelect>
  </template>
</PlinthPagination>
```

```tsx tab="React"
import { PlinthPagination } from '@ptbdynamic/plinth/react';

<PlinthPagination page={page} pages={pages} onPageChange={setPage}>
    Showing <b>{first}</b> to <b>{last}</b> of <b>{total}</b> results
</PlinthPagination>;
```

## Accessibility

- It is a `<nav>` landmark named _Pagination_; give it its own `label` when a page has two.
- The summary is a polite live region (`role="status"`), so a screen reader hears it when the
  page changes in place.
- Previous and next are icon buttons with their own names (_Previous page_, _Next page_), and
  their chevrons flip in right-to-left text. Translate the names with `previous-label` and
  `next-label`.
- The current page has `aria-current="page"`, read as _current page_; its look does not rely on
  colour alone.
- Every control keeps a 40px touch target, shows the focus ring on `:focus-visible`, and answers
  hover only where the device can hover.
- Paging in place, focus stays where it was: the buttons stay in the page as the page changes,
  and previous and next stay focusable at the ends (`aria-disabled`).

The markup contract is at the top of
[`packages/css/src/components/pagination.css`](../../packages/css/src/components/pagination.css).
