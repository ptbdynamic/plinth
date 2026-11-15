# Data table

A collection of records (invoices, projects, people) from one markup: a stack of cards on a phone
and a table from 768px up. The CSS alone changes the layout, so there is no script, and every
layer prints the table once.

## When not to use it

- For a short list of settings or people with no columns to compare, use a
  [list card](list-card.md) of [list rows](list-row.md).
- In a Filament panel, which keeps its own tables.
- For a spreadsheet the person edits cell by cell: the data table shows records, it doesn't edit
  them.

## Cards on a phone, a table from 768px

Each row becomes a card on a phone: the **title** cell first, then each **field** as its label and
its value, then the **actions** under a divider. Pick the kind with `kind`; `field` is the default.
Narrow the window to see the cards.

```blade example layout="stack"
<x-plinth::data-table caption="Invoices">
    <x-slot:head>
        <x-plinth::data-table-column>Invoice</x-plinth::data-table-column>
        <x-plinth::data-table-column>Client</x-plinth::data-table-column>
        <x-plinth::data-table-column>Status</x-plinth::data-table-column>
        <x-plinth::data-table-column numeric>Total</x-plinth::data-table-column>
        <x-plinth::data-table-column>Actions</x-plinth::data-table-column>
    </x-slot:head>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Invoice" kind="title">INV-1042</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Client">Atlas Studio</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Status"><x-plinth::badge tone="success">Paid</x-plinth::badge></x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Total" numeric>€1,240.00</x-plinth::data-table-cell>
        <x-plinth::data-table-cell kind="actions">
            <x-plinth::button variant="secondary" size="sm" href="#">View INV-1042</x-plinth::button>
        </x-plinth::data-table-cell>
    </x-plinth::data-table-row>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Invoice" kind="title">INV-1041</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Client">Kestrel Labs</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Status"><x-plinth::badge tone="warning">Due soon</x-plinth::badge></x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Total" numeric>€380.00</x-plinth::data-table-cell>
        <x-plinth::data-table-cell kind="actions">
            <x-plinth::button variant="secondary" size="sm" href="#">View INV-1041</x-plinth::button>
        </x-plinth::data-table-cell>
    </x-plinth::data-table-row>
</x-plinth::data-table>
```

- **`kind="title"`** is the card's title, such as the invoice number, with no label. It must be the
  row's first cell, and the actions cell its last: the card moves them with `order`, which must
  not change the reading and focus order.
- **`kind="actions"`** holds the row's buttons, last on the card, with no label. From 768px up
  they sit at the start of their cell, under the column header (at the end of the row in a
  [framed](#framed) table).
- **`numeric`** aligns numbers to the end of a table cell, with figures of one width. Put it on
  the column header and its cells.
- **`hide-on-phone`** leaves a less important column out of the card and shows it from 768px up.
  Put it on the column header **and** on every cell of the column, so the headers still match the
  cells for a screen reader.
- A wide table from 768px up belongs in a scrolling container: a [framed](#framed) table brings
  its own, or the app adds one. Text wraps in its cell. Or let its less important columns give
  way with a [priority](#column-priority).

## Framed

`framed` makes the table a card of its own, for a table that stands alone on an admin screen.
From 768px up the table sits in a frame (a raised surface, a hairline border and the container
radius), which is also its scrolling container, so a wide table scrolls inside it. The head row
becomes a header band on a sunken surface, its labels small, uppercase and letter-spaced. The
first and last cells take wider padding, the row dividers run to the frame's edges, and the
actions cell, when it ends the row, holds its buttons to the end, and the last column header
with it (while the table has rows). On a phone the frame steps
aside: the rows are already cards.

```blade example layout="stack"
<x-plinth::data-table framed aria-label="Clients">
    <x-slot:head>
        <x-plinth::data-table-column>Client</x-plinth::data-table-column>
        <x-plinth::data-table-column sort="ascending">
            <x-plinth::data-table-sort>Plan</x-plinth::data-table-sort>
        </x-plinth::data-table-column>
        <x-plinth::data-table-column>Status</x-plinth::data-table-column>
        <x-plinth::data-table-column numeric>Seats</x-plinth::data-table-column>
        <x-plinth::data-table-column>Actions</x-plinth::data-table-column>
    </x-slot:head>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Client" kind="title">Atlas Studio</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Plan">Business</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Status"><x-plinth::badge tone="success">Active</x-plinth::badge></x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Seats" numeric>24</x-plinth::data-table-cell>
        <x-plinth::data-table-cell kind="actions">
            <x-plinth::button variant="secondary" size="sm" href="#">Open Atlas Studio</x-plinth::button>
        </x-plinth::data-table-cell>
    </x-plinth::data-table-row>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Client" kind="title">Kestrel Labs</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Plan">Team</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Status"><x-plinth::badge tone="warning">Trial</x-plinth::badge></x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Seats" numeric>6</x-plinth::data-table-cell>
        <x-plinth::data-table-cell kind="actions">
            <x-plinth::button variant="secondary" size="sm" href="#">Open Kestrel Labs</x-plinth::button>
        </x-plinth::data-table-cell>
    </x-plinth::data-table-row>
</x-plinth::data-table>
```

The band's look is a set of component tokens, so a brand can pick its own label face (a
condensed or mono face, say) without touching the component:

| Token                                  | Default                | What it sets                             |
| -------------------------------------- | ---------------------- | ---------------------------------------- |
| `--plinth-data-table-head-background`  | `color-surface-sunken` | the header band                          |
| `--plinth-data-table-head-font-family` | `font-family-body`     | the column labels' face                  |
| `--plinth-data-table-head-font-size`   | `font-size-xs` (12px)  | their size                               |
| `--plinth-data-table-head-font-weight` | `font-weight-medium`   | their weight                             |
| `--plinth-data-table-head-tracking`    | `font-tracking-wide`   | their letter spacing                     |
| `--plinth-data-table-head-color`       | `color-text-muted`     | their colour                             |
| `--plinth-data-table-frame-edge`       | `space-5` (20px)       | the first and last cells' inline padding |

## Column priority

A table can be narrow on a wide screen: in a split view's list, beside a section column, on a
tablet with a rail. Give its less important columns a `priority` and they give way to the
table's own width, not the screen's. The table needs a size container to measure: `contained`
wraps a table without a frame in one (`plinth-data-table-container`), and a `framed` table's
frame becomes one once a column has a priority.

- **`priority="3"`** shows from 960px of container, **`priority="2"`** from 640px, and
  **`priority="1"`** always, like a column without one. Put it on the column header **and** on
  every cell of the column, as with `hide-on-phone`.
- It works in the table layout, from 768px up. A phone's card shows every field but those hidden
  on a phone, so pair a priority with `hide-on-phone` where the card should leave it out too.
- Leave the title column (the first) and the actions column without a priority, and a sortable
  column or one whose cells hold controls: a column that gives way while one of its controls has
  focus loses that focus. In a framed table the last column left takes the frame's edge padding.
- What a hidden column holds must be reachable elsewhere, on the row's own page, say.
- The container takes its width from its parent, never from the table: don't put it in a row
  that sizes it to fit. Without a container (a bare table, or one nested in a cell), every column
  shows.

This page's column is narrower than 960px, so the email (`priority="3"`) stays hidden here; the
Storybook stories show it on a wide screen. Narrow the window and below 640px of container the
plan and the seats go too.

```blade example layout="stack"
<x-plinth::data-table contained aria-label="Clients">
    <x-slot:head>
        <x-plinth::data-table-column>Client</x-plinth::data-table-column>
        <x-plinth::data-table-column priority="3" hide-on-phone>Email</x-plinth::data-table-column>
        <x-plinth::data-table-column priority="2">Plan</x-plinth::data-table-column>
        <x-plinth::data-table-column>Status</x-plinth::data-table-column>
        <x-plinth::data-table-column numeric priority="2">Seats</x-plinth::data-table-column>
        <x-plinth::data-table-column>Actions</x-plinth::data-table-column>
    </x-slot:head>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Client" kind="title">Atlas Studio</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Email" priority="3" hide-on-phone>billing@atlas.example</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Plan" priority="2">Business</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Status"><x-plinth::badge tone="success">Active</x-plinth::badge></x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Seats" numeric priority="2">24</x-plinth::data-table-cell>
        <x-plinth::data-table-cell kind="actions">
            <x-plinth::button variant="secondary" size="sm" href="#">Open Atlas Studio</x-plinth::button>
        </x-plinth::data-table-cell>
    </x-plinth::data-table-row>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Client" kind="title">Kestrel Labs</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Email" priority="3" hide-on-phone>ops@kestrel.example</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Plan" priority="2">Team</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Status"><x-plinth::badge tone="warning">Trial</x-plinth::badge></x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Seats" numeric priority="2">6</x-plinth::data-table-cell>
        <x-plinth::data-table-cell kind="actions">
            <x-plinth::button variant="secondary" size="sm" href="#">Open Kestrel Labs</x-plinth::button>
        </x-plinth::data-table-cell>
    </x-plinth::data-table-row>
</x-plinth::data-table>
```

960px and 640px are the table's own values, not tokens: a container query can't read a custom
property.

## Sorting

The app owns sorting, paging and selection (ADR 2); the table only shows them. A sortable column
header takes `sort`: `none`, `ascending` or `descending`, with one column sorted at a time. Its
label is a data table sort button, which the app listens to; its icon shows both arrows, or the
one of the order. On a phone the sortable headers stay visible above the cards as a row of sort
buttons.

```blade example layout="stack"
<x-plinth::data-table caption="Projects">
    <x-slot:head>
        <x-plinth::data-table-column>Project</x-plinth::data-table-column>
        <x-plinth::data-table-column sort="descending">
            <x-plinth::data-table-sort>Updated</x-plinth::data-table-sort>
        </x-plinth::data-table-column>
        <x-plinth::data-table-column sort="none">
            <x-plinth::data-table-sort>Owner</x-plinth::data-table-sort>
        </x-plinth::data-table-column>
    </x-slot:head>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Project" kind="title">Website redesign</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Updated">Today</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Owner">Ana Lima</x-plinth::data-table-cell>
    </x-plinth::data-table-row>
    <x-plinth::data-table-row>
        <x-plinth::data-table-cell label="Project" kind="title">Billing export</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Updated">Yesterday</x-plinth::data-table-cell>
        <x-plinth::data-table-cell label="Owner">Rui Costa</x-plinth::data-table-cell>
    </x-plinth::data-table-row>
</x-plinth::data-table>
```

## Selection and the empty state

- **Selection:** a table whose rows can be selected puts `selected` on every row, true on the
  selected ones (it prints `aria-selected`). A selected row takes the selection tint and an accent
  edge at its start. `aria-selected` only drives the styling: screen readers don't announce it in
  a table. The control that selects a row (a checkbox, a pressed button) is the app's, and it
  carries the state.
- **The empty state:** one empty row in the body, whose cell spans every column (`columns`).
- **Paging** controls sit outside the table.

```blade example layout="stack"
<x-plinth::data-table caption="Team">
    <x-slot:head>
        <x-plinth::data-table-column>Name</x-plinth::data-table-column>
        <x-plinth::data-table-column>Role</x-plinth::data-table-column>
    </x-slot:head>
    <x-plinth::data-table-empty :columns="2">No one has joined yet.</x-plinth::data-table-empty>
</x-plinth::data-table>
```

## Markup contract

- **`plinth-data-table`**, the root, is the `<table>`; a project's classes and attributes land on
  it, framed or not. The **caption** is optional: without one, name the table with `aria-label`
  or `aria-labelledby`.
- **`plinth-data-table-frame`**, a `<div>` around the table when it is framed. It takes no
  attributes: to place a framed table, wrap it in your own element.
- **`plinth-data-table-container`**, a `<div>` around a contained table without a frame: a size
  container from 768px up, as a frame with a priority column is. It takes no attributes either.
- **The explicit roles** (`table`, `rowgroup`, `row`, `columnheader`, `cell`) are part of the
  contract. Some browsers, Safari in particular, drop a table's semantics once its rows stop
  displaying as table rows, which is what the phone's cards do.
- **`plinth-data-table-label`** repeats the column's name in each cell. It shows only on a phone's
  card and is `aria-hidden`, since the column header already names the cell.
- `data-kind`, `data-numeric`, `data-phone="hidden"`, `data-priority` and `aria-sort` are the
  attributes the props print.

## Props

The same names in every layer. React takes the Vue props, with the rows as `children` and the
header row as the `head` prop, which takes a node.

| Component         | Prop        | Blade                                          | Vue                  | React                | Default |
| ----------------- | ----------- | ---------------------------------------------- | -------------------- | -------------------- | ------- |
| data-table        | caption     | `caption="Invoices"`                           | `caption="Invoices"` | `caption="Invoices"` | none    |
| data-table        | header row  | `<x-slot:head>`                                | `#head` slot         | `head` (a node)      | none    |
| data-table        | rows        | the slot                                       | the default slot     | `children`           | none    |
| data-table        | framed      | `framed`                                       | `framed`             | `framed`             | off     |
| data-table        | contained   | `contained`                                    | `contained`          | `contained`          | off     |
| data-table-column | sort        | `sort="ascending"` (or a `DataTableSort` case) | `sort="ascending"`   | `sort="ascending"`   | none    |
| data-table-column | numeric     | `numeric`                                      | `numeric`            | `numeric`            | off     |
| data-table-column | hideOnPhone | `hide-on-phone`                                | `hide-on-phone`      | `hideOnPhone`        | off     |
| data-table-column | priority    | `priority="3"` (or a `DataTablePriority` case) | `priority="3"`       | `priority="3"`       | none    |
| data-table-row    | selected    | `:selected="true"`                             | `:selected="true"`   | `selected={true}`    | none    |
| data-table-cell   | label       | `label="Total"`                                | `label="Total"`      | `label="Total"`      | none    |
| data-table-cell   | kind        | `kind="title"` (or a `DataTableCellKind` case) | `kind="title"`       | `kind="title"`       | `field` |
| data-table-cell   | numeric     | `numeric`                                      | `numeric`            | `numeric`            | off     |
| data-table-cell   | hideOnPhone | `hide-on-phone`                                | `hide-on-phone`      | `hideOnPhone`        | off     |
| data-table-cell   | priority    | `priority="3"` (or a `DataTablePriority` case) | `priority="3"`       | `priority="3"`       | none    |
| data-table-empty  | columns     | `:columns="4"`                                 | `:columns="4"`       | `columns={4}`        | `1`     |
| data-table-sort   | label       | the slot                                       | the default slot     | `children`           | none    |

An unknown sort falls back to `none`, an unknown kind to `field` and an unknown priority to `1`. The app's attributes
(`wire:key`, `wire:click`, `@click`, `onClick`, `data-*`, `aria-*`) reach each part's root.

```blade tab="Blade"
<x-plinth::data-table caption="Invoices">
    <x-slot:head>
        <x-plinth::data-table-column>Invoice</x-plinth::data-table-column>
        <x-plinth::data-table-column :sort="$sort === 'date' ? $direction : 'none'">
            <x-plinth::data-table-sort wire:click="sortBy('date')">Date</x-plinth::data-table-sort>
        </x-plinth::data-table-column>
        <x-plinth::data-table-column numeric>Total</x-plinth::data-table-column>
    </x-slot:head>
    @forelse ($invoices as $invoice)
        <x-plinth::data-table-row wire:key="invoice-{{ $invoice->id }}">
            <x-plinth::data-table-cell label="Invoice" kind="title">{{ $invoice->number }}</x-plinth::data-table-cell>
            <x-plinth::data-table-cell label="Date">{{ $invoice->date }}</x-plinth::data-table-cell>
            <x-plinth::data-table-cell label="Total" numeric>{{ $invoice->total }}</x-plinth::data-table-cell>
        </x-plinth::data-table-row>
    @empty
        <x-plinth::data-table-empty :columns="3">No invoices yet.</x-plinth::data-table-empty>
    @endforelse
</x-plinth::data-table>
```

```vue tab="Vue"
<PlinthDataTable caption="Invoices">
  <template #head>
    <PlinthDataTableColumn>Invoice</PlinthDataTableColumn>
    <PlinthDataTableColumn :sort="sort === 'date' ? direction : 'none'">
      <PlinthDataTableSort @click="sortBy('date')">Date</PlinthDataTableSort>
    </PlinthDataTableColumn>
    <PlinthDataTableColumn numeric>Total</PlinthDataTableColumn>
  </template>
  <PlinthDataTableRow v-for="invoice in invoices" :key="invoice.id">
    <PlinthDataTableCell label="Invoice" kind="title">{{ invoice.number }}</PlinthDataTableCell>
    <PlinthDataTableCell label="Date">{{ invoice.date }}</PlinthDataTableCell>
    <PlinthDataTableCell label="Total" numeric>{{ invoice.total }}</PlinthDataTableCell>
  </PlinthDataTableRow>
  <PlinthDataTableEmpty v-if="invoices.length === 0" :columns="3">No invoices yet.</PlinthDataTableEmpty>
</PlinthDataTable>
```

```tsx tab="React"
import {
    PlinthDataTable,
    PlinthDataTableCell,
    PlinthDataTableColumn,
    PlinthDataTableEmpty,
    PlinthDataTableRow,
    PlinthDataTableSort,
} from '@ptbdynamic/plinth/react';

<PlinthDataTable
    caption="Invoices"
    head={
        <>
            <PlinthDataTableColumn>Invoice</PlinthDataTableColumn>
            <PlinthDataTableColumn sort={sort === 'date' ? direction : 'none'}>
                <PlinthDataTableSort onClick={() => sortBy('date')}>Date</PlinthDataTableSort>
            </PlinthDataTableColumn>
            <PlinthDataTableColumn numeric>Total</PlinthDataTableColumn>
        </>
    }
>
    {invoices.map((invoice) => (
        <PlinthDataTableRow key={invoice.id}>
            <PlinthDataTableCell label="Invoice" kind="title">
                {invoice.number}
            </PlinthDataTableCell>
            <PlinthDataTableCell label="Date">{invoice.date}</PlinthDataTableCell>
            <PlinthDataTableCell label="Total" numeric>
                {invoice.total}
            </PlinthDataTableCell>
        </PlinthDataTableRow>
    ))}
    {invoices.length === 0 ? (
        <PlinthDataTableEmpty columns={3}>No invoices yet.</PlinthDataTableEmpty>
    ) : null}
</PlinthDataTable>;
```

## Accessibility

- A real `<table>` with explicit roles, so it stays a table for screen readers even when a phone
  shows its rows as cards. On a phone the header row stays in the accessibility tree, visually
  hidden, so every cell keeps its header.
- The label repeated in each card is `aria-hidden`: the column header already names the cell.
- A sorted column says so with `aria-sort`, and its sort button is a real `<button>`.
- A hidden-on-phone column is hidden on its header and every cell, so headers and cells still
  match; so is a column that gives way to its priority (`display: none` on both). Its content
  must be reachable elsewhere, such as the row's own page, and it holds no controls: a control
  hidden while it has focus loses that focus.
- A framed table scrolls inside its frame from 768px up; the frame changes nothing for a screen
  reader. Keyboard users scroll it by tabbing through the table's sort buttons and actions, so
  keep a wide read-only table (with neither) narrow enough for its frame: not every browser lets
  the keyboard scroll a frame with nothing to focus in it.
- The minimum row height is `--plinth-data-table-row-height` (44px) in the table layout.
- Checked with axe in light and dark at 390, 768 and 1440px on every pull request.

The markup contract is at the top of
[`packages/css/src/components/data-table.css`](../../packages/css/src/components/data-table.css).
