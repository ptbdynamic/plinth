# List header

The bar on top of a list: the list's heading and how many items it holds (_Open 12_), then its
actions, such as select, filter and sort. While the app is selecting rows it says how many are
selected (_2 selected_) in the heading's place. It sits over a list of [list rows](list-row.md),
such as the tickets in a [split view](split-view.md)'s list.

## When not to use it

- For the bar at the top of a page, with the page's heading: use the [page header](page-header.md).
- For a heading over a card of settings: use the [list card](list-card.md)'s own `heading`.
- For filters that show as choices under the bar: use a [pill row](pill-row.md) below it.

## Heading, count and actions

Give it the list's **`heading`**, an `<h2>` unless **`heading-level`** says otherwise (h2 to h6),
and an optional **`count`**, read after the title in the mono face. A count of 0 still prints;
leave it out for none. The actions go in the **`actions`** slot: icon buttons, each with its own
label, or a button. A long heading is cut with an ellipsis, and the count and the actions keep
their place.

```blade example layout="stack"
<x-plinth::list-header heading="Open" count="12">
    <x-slot:actions>
        <x-plinth::icon-button label="Select" :pressed="false"><x-site.glyph name="select" /></x-plinth::icon-button>
        <x-plinth::icon-button label="Filter"><x-site.glyph name="filter" /></x-plinth::icon-button>
        <x-plinth::icon-button label="Sort"><x-site.glyph name="sort" /></x-plinth::icon-button>
    </x-slot:actions>
</x-plinth::list-header>
```

## Selecting

The app owns the selection. When the user turns selecting on, set **`selection`** to the app's
own words for how many rows are selected (_2 selected_, _No tickets selected_), so it counts and
translates them; the header adds `is-selecting`, and the text shows in the heading's place. The
heading stays in the page's outline, hidden from sight, and the text is a polite live region
(`role="status"`), so a screen reader hears it change. Swap the actions for the selection's own
(_Archive_, _Done_), and make the rows under it [selectable](list-row.md#selectable).

```blade example layout="stack"
<form>
    <x-plinth::list-header heading="Open" count="12" selection="2 selected">
        <x-slot:actions>
            <x-plinth::icon-button label="Archive"><x-site.glyph name="archive" /></x-plinth::icon-button>
            <x-plinth::button variant="secondary">Done</x-plinth::button>
        </x-slot:actions>
    </x-plinth::list-header>
    <x-plinth::list-card>
        <li><x-plinth::list-row selectable selected name="tickets[]" value="1" description="Alex Kim · 10 min">Cannot export the March report</x-plinth::list-row></li>
        <li><x-plinth::list-row selectable selected name="tickets[]" value="2" description="Jo Park · 1 h">Invoice shows the wrong address</x-plinth::list-row></li>
        <li><x-plinth::list-row selectable name="tickets[]" value="3" description="Rui Silva · 3 h">Two-factor code never arrives</x-plinth::list-row></li>
    </x-plinth::list-card>
</form>
```

Swapping the actions removes the button that has focus, so move focus to the new control as you
swap them: to _Done_ (or the first of the selection's actions) on the way in, back to _Select_ on
the way out. Or keep _Select_ in place as a toggle (`pressed`), so its state is announced and focus
stays put. When selecting ends, leave `selection` out: the header shows the heading again and the
status empties.

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                           | Element          | Holds                                                         |
| ------------------------------ | ---------------- | ------------------------------------------------------------- |
| `plinth-list-header`           | `<div>`          | the root                                                      |
| `plinth-list-header-heading`   | `<h2>` to `<h6>` | the list's heading                                            |
| `plinth-list-header-title`     | `<span>`         | the heading's text                                            |
| `plinth-list-header-count`     | `<span>`         | the optional count, after the title                           |
| `plinth-list-header-selection` | `<p>`            | the selection text, `role="status"`; empty when not selecting |
| `plinth-list-header-actions`   | `<div>`          | the optional actions                                          |

| Attribute or state | On            | Values                                          | Default |
| ------------------ | ------------- | ----------------------------------------------- | ------- |
| heading level      | the heading   | `h2` to `h6`; anything else falls back to `h2`  | `h2`    |
| `is-selecting`     | the root      | while selecting, set from `selection`           | none    |
| `role="status"`    | the selection | always, so the count is announced as it changes | always  |

The height is `--plinth-list-header-height` (44px), a list row's, with a hairline divider under it.

## Props

The same names in every layer. React takes the Vue props, with the slot as a prop that takes a
node. Extra attributes go to the root `<div>`, and the project's win a clash (`class` is added).
It emits no events: the actions are the app's own buttons, with their own listeners.

| Prop          | Blade                                | Vue                  | React               | Default |
| ------------- | ------------------------------------ | -------------------- | ------------------- | ------- |
| heading       | `heading="Open"` (required)          | `heading="Open"`     | `heading="Open"`    | none    |
| heading level | `heading-level="h3"`                 | `heading-level="h3"` | `headingLevel="h3"` | `h2`    |
| count         | `count="12"` or `:count="$open"`     | `:count="12"`        | `count={12}`        | none    |
| selection     | `:selection="$selecting ? … : null"` | `:selection="text"`  | `selection={text}`  | none    |
| actions       | `<x-slot:actions>`                   | `#actions` slot      | `actions` (a node)  | none    |

In Blade, `heading-level` takes the string or the `HeadingLevel` enum.

```blade tab="Blade"
<x-plinth::list-header heading="Open" :count="$tickets->count()" :selection="$selecting ? count($selected).' selected' : null">
    <x-slot:actions>
        @if ($selecting)
            <x-plinth::icon-button label="Archive" wire:click="archive">…</x-plinth::icon-button>
            <x-plinth::button variant="secondary" wire:click="$set('selecting', false)">Done</x-plinth::button>
        @else
            <x-plinth::icon-button label="Select" :pressed="false" wire:click="$set('selecting', true)">…</x-plinth::icon-button>
        @endif
    </x-slot:actions>
</x-plinth::list-header>
```

```vue tab="Vue"
<PlinthListHeader
    heading="Open"
    :count="tickets.length"
    :selection="selecting ? `${selected.size} selected` : undefined"
>
  <template #actions>
    <PlinthIconButton v-if="!selecting" label="Select" :pressed="false" @click="selecting = true">…</PlinthIconButton>
    <PlinthButton v-else variant="secondary" @click="selecting = false">Done</PlinthButton>
  </template>
</PlinthListHeader>
```

```tsx tab="React"
import { PlinthButton, PlinthListHeader } from '@ptbdynamic/plinth/react';

<PlinthListHeader
    heading="Open"
    count={tickets.length}
    selection={selecting ? `${selected.size} selected` : undefined}
    actions={
        <PlinthButton variant="secondary" onClick={() => setSelecting(false)}>
            Done
        </PlinthButton>
    }
/>;
```

## Accessibility

- The heading is a real heading that names the list, so a screen reader can jump to it; the
  count is read after the title (_Open 12_).
- While selecting, the selection text is a polite live region (`role="status"`), printed empty
  otherwise so the change is heard; the heading stays in the outline, hidden from sight.
- Every icon button needs its own `label`; a select button that toggles takes `pressed`.
- When the app swaps the actions, it moves focus to the new control, since the focused one
  leaves the page.
- The actions keep the 40px touch target and show the focus ring on `:focus-visible`; nothing
  depends on hover, and nothing moves, so reduced motion has nothing to stop.
- Checked with axe in light and dark at 390, 768 and 1440px on every pull request.

The markup contract is at the top of
[`packages/css/src/components/list-header.css`](../../packages/css/src/components/list-header.css).
