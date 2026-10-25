# Split view

Up to three panes inside a page: a **secondary** column (folders, a [nav list](nav-list.md)), a **list** (the tickets) and a
**detail** (the open ticket). A phone shows one pane, the one the app names; from 768px the list
and the detail sit side by side, and from 1280px the secondary column too. Each pane scrolls on its
own, and the detail can hold a footer on its bottom edge, such as a reply box (docs/adr/0008).

## When not to use it

- For one list or one form: put it in the page, with no panes.
- For a page's own sections: use a [section menu](section-menu.md) or a [pill row](pill-row.md).
- For details that cover the page for a moment: use a [sheet](sheet.md).

## List and detail

The **`list`** slot takes the list, the default slot the detail, and the **`secondary`** slot
the optional column before them. Here it is framed at 28rem with an inline style; in the
[app shell](app-shell.md)'s main it fills the height under the page header. Narrow your window
to see one pane at a time.

```blade example layout="stack"
<x-plinth::split-view style="block-size: 28rem; border: var(--plinth-border-width-thin) solid var(--plinth-color-border)">
    <x-slot:secondary>
        <div style="padding: var(--plinth-space-3)">
            <x-plinth::nav-list id="docs-folders" label="Folders">
                <x-plinth::nav-list-group>
                    <x-plinth::nav-list-item href="#" count="8" current>Open</x-plinth::nav-list-item>
                    <x-plinth::nav-list-item href="#">Waiting</x-plinth::nav-list-item>
                    <x-plinth::nav-list-item href="#">Closed</x-plinth::nav-list-item>
                </x-plinth::nav-list-group>
            </x-plinth::nav-list>
        </div>
    </x-slot:secondary>
    <x-slot:list>
        <div style="padding: var(--plinth-space-3)">
            <x-plinth::list-card>
                <li><x-plinth::list-row href="#" current description="Alex Kim · 10 min">Cannot export the March report</x-plinth::list-row></li>
                <li><x-plinth::list-row href="#" description="Jo Park · 1 h">Invoice shows the wrong address</x-plinth::list-row></li>
                <li><x-plinth::list-row href="#" description="Rui Silva · 3 h">Two-factor code never arrives</x-plinth::list-row></li>
            </x-plinth::list-card>
        </div>
    </x-slot:list>
    <article style="padding: var(--plinth-space-4)">
        <p><strong>Cannot export the March report</strong></p>
        <p>When I export the March report the download stops with an error. February works fine.</p>
    </article>
    <x-slot:footer>
        <x-plinth::button variant="secondary">Reply</x-plinth::button>
    </x-slot:footer>
</x-plinth::split-view>
```

## The pane a phone shows

Below 768px the split view shows one pane: **`pane="list"`** (the default) or **`pane="detail"`**,
printed as `data-pane`. The app sets it from its URL, usually `detail` when the URL names an item,
and the page header's leading action follows: the menu button on the list, a back link to the list
on the detail. From 768px both panes show, whatever `pane` says.

```blade tab="Blade"
<x-plinth::split-view :pane="$ticket ? 'detail' : 'list'">…</x-plinth::split-view>
```

```vue tab="Vue"
<PlinthSplitView :pane="route.params.ticket ? 'detail' : 'list'">…</PlinthSplitView>
```

```tsx tab="React"
<PlinthSplitView pane={ticketId ? 'detail' : 'list'}>…</PlinthSplitView>
```

## The secondary column

The secondary column shows from 1280px. **`secondary-closed`** collapses it
(`data-secondary="closed"`): the page header's panel button sets it, with `aria-expanded` on the
button and `aria-controls` naming the column's content (give that content an `id`). Below 1280px
the column isn't shown, so offer its content another way (a [sheet](sheet.md), a
[pill row](pill-row.md)); the panel button is the app's to show only from 1280px, with its own
CSS (a `min-width: 1280px` media query, or a utility such as Tailwind's `hidden xl:inline-flex`).

```blade tab="Blade"
<x-plinth::icon-button label="Folders" :aria-expanded="$foldersOpen ? 'true' : 'false'"
    aria-controls="folders" wire:click="$toggle('foldersOpen')">…</x-plinth::icon-button>

<x-plinth::split-view :secondary-closed="! $foldersOpen">
    <x-slot:secondary><nav id="folders" aria-label="Folders">…</nav></x-slot:secondary>
    …
</x-plinth::split-view>
```

## The footer

The **`footer`** slot is the detail's last part, held to its bottom edge as the detail scrolls,
for a reply box. On a phone it sticks to the bottom of the screen and clears the home indicator;
when a field in it has focus, the browser scrolls it above the on-screen keyboard.

## Height and scrolling

From 768px the split view fills the height its parent leaves it when the parent is a flex column,
as the [app shell](app-shell.md)'s main is; elsewhere give it a height. Each pane then scrolls on
its own. On a phone the panes are in the page's flow and the document scrolls.

The list is `--plinth-split-view-list-width` (320px) wide and the secondary column
`--plinth-split-view-secondary-width` (240px); the detail takes the rest. Dividers sit on the
panes' end edges; sides are logical, so in right-to-left text the list is on the right.

## Markup contract

| Part                          | Element | Holds                                                     |
| ----------------------------- | ------- | --------------------------------------------------------- |
| `plinth-split-view`           | `<div>` | the root                                                  |
| `plinth-split-view-secondary` | `<div>` | optional: a column before the list, from 1280px           |
| `plinth-split-view-list`      | `<div>` | the list                                                  |
| `plinth-split-view-detail`    | `<div>` | the detail, or an empty state when nothing is open        |
| `plinth-split-view-footer`    | `<div>` | optional, the detail's last part: held to its bottom edge |

| Attribute or state        | On       | Values                                                                  | Default     |
| ------------------------- | -------- | ----------------------------------------------------------------------- | ----------- |
| `data-pane`               | the root | `list`, `detail`: the one pane a phone shows                            | `list`      |
| `data-secondary="closed"` | the root | collapses the secondary column                                          | none (open) |
| width                     | the root | one pane below 768px, list and detail from 768px, all three from 1280px | by width    |

The panes are `<div>`s: what goes in them brings its own semantics (a `<nav>` of folders, a list
of links, an `<article>`).

## Props

The same names in every layer; React takes the Vue props, with slots as `children` and node props.
An unknown `pane` falls back to `list`. The app's attributes land on the root.

| Prop             | Blade                | Vue                | React             | Default |
| ---------------- | -------------------- | ------------------ | ----------------- | ------- |
| pane             | `pane="detail"`      | `pane="detail"`    | `pane="detail"`   | `list`  |
| secondary closed | `secondary-closed`   | `secondary-closed` | `secondaryClosed` | off     |
| secondary        | `<x-slot:secondary>` | `#secondary` slot  | `secondary={…}`   | none    |
| list             | `<x-slot:list>`      | `#list` slot       | `list={…}`        | none    |
| detail           | the slot             | the default slot   | `children`        | none    |
| footer           | `<x-slot:footer>`    | `#footer` slot     | `footer={…}`      | none    |

In Blade the pane can also be the enum, `BDynamic\Plinth\Enums\SplitViewPane`.

```blade tab="Blade"
<x-plinth::split-view :pane="$ticket ? 'detail' : 'list'" :secondary-closed="! $foldersOpen">
    <x-slot:secondary><nav id="folders" aria-label="Folders">…</nav></x-slot:secondary>
    <x-slot:list>…</x-slot:list>
    <article>…</article>
    <x-slot:footer><form wire:submit="reply">…</form></x-slot:footer>
</x-plinth::split-view>
```

```vue tab="Vue"
<PlinthSplitView :pane="ticket ? 'detail' : 'list'" :secondary-closed="!foldersOpen">
  <template #secondary><nav id="folders" aria-label="Folders">…</nav></template>
  <template #list>…</template>
  <article>…</article>
  <template #footer><form @submit.prevent="reply">…</form></template>
</PlinthSplitView>
```

```tsx tab="React"
import { PlinthSplitView } from '@ptbdynamic/plinth/react';

<PlinthSplitView
    pane={ticket ? 'detail' : 'list'}
    secondaryClosed={!foldersOpen}
    secondary={
        <nav id="folders" aria-label="Folders">
            …
        </nav>
    }
    list={<TicketList />}
    footer={<ReplyForm />}
>
    <article>…</article>
</PlinthSplitView>;
```

## Accessibility

- A pane that isn't shown is `display: none`, so it is out of the reading and tab order too.
- The panel button says whether the column is open with `aria-expanded`, and which it is with
  `aria-controls`.
- From 768px each pane is a scrolling region: keep something focusable in it (a list of links, a
  reply field), so it scrolls from the keyboard in every browser.
- The source order is the reading order: the secondary column, the list, then the detail.
- Nothing moves when the panes change, so there is no motion to reduce.

The markup contract is at the top of
[`packages/css/src/components/split-view.css`](../../packages/css/src/components/split-view.css).
