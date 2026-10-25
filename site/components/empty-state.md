# Empty state

A calm, centred message for a screen or a section with nothing to show yet: _No runs yet_,
_Nothing is waiting on you_. It has a heading, and optionally an icon, a line on why it is empty
and one action to fill it.

## When not to use it

- For an error, a warning or something the user must act on, use a [callout](callout.md): it
  reads as a message about what happened. An empty state is calm on purpose.
- For a value that isn't available yet in a dashboard tile, use the [stat](stat.md)'s own empty
  value.
- While the content is still loading: show the empty state only once you know there is nothing.

## The parts

The **heading** says what is empty, in plain words. The **description** says why, or what fills
it. The **icon** is the project's own, decorative, in a round well. The **actions** are usually
one button or link, at most two. Only the heading is required.

```blade example layout="stack"
<x-plinth::empty-state heading="No runs yet" heading-level="h3" description="Runs show here once a workflow starts.">
    <x-slot:icon>
        <x-plinth::icon><x-site.glyph name="inbox" /></x-plinth::icon>
    </x-slot:icon>
    <x-slot:actions>
        <x-plinth::button href="#">Start a run</x-plinth::button>
    </x-slot:actions>
</x-plinth::empty-state>
```

Leave out what you don't need. With nothing for the user to do, there is no action:

```blade example layout="stack"
<x-plinth::empty-state heading="Nothing is waiting on you" heading-level="h3" description="Requests that need your approval show here.">
    <x-slot:icon>
        <x-plinth::icon><x-site.glyph name="check" /></x-plinth::icon>
    </x-slot:icon>
</x-plinth::empty-state>
<x-plinth::empty-state heading="No archived projects" heading-level="h3" />
```

A search or a filter with no match can offer two ways out:

```blade example layout="stack"
<x-plinth::empty-state heading="No results for &quot;invoice 2024&quot;" heading-level="h3" description="Check the spelling, or search all folders.">
    <x-slot:icon>
        <x-plinth::icon><x-site.glyph name="search" /></x-plinth::icon>
    </x-slot:icon>
    <x-slot:actions>
        <x-plinth::button variant="secondary">Search all folders</x-plinth::button>
        <x-plinth::button variant="ghost">Clear search</x-plinth::button>
    </x-slot:actions>
</x-plinth::empty-state>
```

## Plain or framed

**Plain**, the default, has no surface of its own: use it inside a card, a panel or a sheet that
already has one. **`framed`** gives it a raised surface with a hairline (it prints
`data-framed`), for a page section with nothing else around it.

```blade example layout="stack"
<x-plinth::empty-state heading="No invoices yet" heading-level="h3" description="Invoices you send show here, newest first." framed>
    <x-slot:actions>
        <x-plinth::button href="#">New invoice</x-plinth::button>
    </x-slot:actions>
</x-plinth::empty-state>
```

## In a data table

A [data table](data-table.md) with no rows holds its empty state in one empty row. Put an empty
state in it when the table needs more than one line of text: there it drops its own padding and
takes the cell's, and the cell's surface (raised on a phone's cards).

```blade example layout="stack"
<x-plinth::data-table caption="Orders">
    <x-slot:head>
        <x-plinth::data-table-column>Order</x-plinth::data-table-column>
        <x-plinth::data-table-column>Customer</x-plinth::data-table-column>
    </x-slot:head>
    <x-plinth::data-table-empty :columns="2">
        <x-plinth::empty-state heading="No orders yet" heading-level="h3" description="Orders show here once a customer checks out." />
    </x-plinth::data-table-empty>
</x-plinth::data-table>
```

## The heading's level

The heading is an `<h2>` by default. Pick the level that fits the page with **`heading-level`**
(`h2` to `h6`): inside a section with its own `<h2>`, it is an `<h3>`. The level doesn't change
the look. The examples on this page are `h3`s, since the page already has its sections.

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                              | Element       | Required | What it is                                                     |
| --------------------------------- | ------------- | -------- | -------------------------------------------------------------- |
| `.plinth-empty-state`             | `<div>`       | yes      | The root. A project's classes and attributes land on it        |
| `.plinth-empty-state-icon`        | `<div>`       | no       | The round well around the project's icon; printed with an icon |
| `.plinth-empty-state-heading`     | `<h2>`–`<h6>` | yes      | What is empty                                                  |
| `.plinth-empty-state-description` | `<p>`         | no       | Why it is empty, or what fills it                              |
| `.plinth-empty-state-actions`     | `<div>`       | no       | The actions; printed only when they have content               |

| Attribute     | On       | Values  | Default | What it does                          |
| ------------- | -------- | ------- | ------- | ------------------------------------- |
| `data-framed` | the root | present | absent  | A raised surface with a hairline edge |

The heading's element is `h2` to `h6`; an unknown level prints `h2`. The empty state has no
states of its own: the app decides when to show it.

## Props

The same names in every layer. React takes the Vue props, with the slots as props that take a
node.

| Prop          | Blade                              | Vue                     | React                   | Default |
| ------------- | ---------------------------------- | ----------------------- | ----------------------- | ------- |
| heading       | `heading="No runs yet"` (required) | `heading="No runs yet"` | `heading="No runs yet"` | none    |
| heading level | `heading-level="h3"`               | `heading-level="h3"`    | `headingLevel="h3"`     | `h2`    |
| description   | `description="…"`                  | `description="…"`       | `description="…"`       | none    |
| framed        | `framed`                           | `framed`                | `framed`                | off     |
| icon          | `<x-slot:icon>`                    | `#icon` slot            | `icon` (a node)         | none    |
| actions       | `<x-slot:actions>`                 | `#actions` slot         | `actions` (a node)      | none    |

Every layer needs a `heading` and throws without one. Blade takes `heading-level` as a string or a
`HeadingLevel` case. Extra attributes reach the root `<div>`: in Blade through `$attributes`
(`class`, `id`, `data-*`, `aria-*`, `wire:key`, `x-show`), in Vue by falling through, and in
React as props (`className`, added to Plinth's class, `id`, `data-*`, `aria-*`, handlers and
`ref`). A project's attribute wins over the empty state's own (`data-framed`). The empty state
emits no events.

```blade tab="Blade"
@if ($runs->isEmpty())
    <x-plinth::empty-state heading="No runs yet" description="Runs show here once a workflow starts.">
        <x-slot:icon>
            <x-plinth::icon>…</x-plinth::icon>
        </x-slot:icon>
        <x-slot:actions>
            <x-plinth::button :href="route('runs.create')" wire:navigate>Start a run</x-plinth::button>
        </x-slot:actions>
    </x-plinth::empty-state>
@endif
```

```vue tab="Vue"
<PlinthEmptyState
    v-if="runs.length === 0"
    heading="No runs yet"
    description="Runs show here once a workflow starts."
>
  <template #icon>
    <PlinthIcon><InboxIcon /></PlinthIcon>
  </template>
  <template #actions>
    <PlinthButton href="/runs/new">Start a run</PlinthButton>
  </template>
</PlinthEmptyState>
```

```tsx tab="React"
import { PlinthButton, PlinthEmptyState, PlinthIcon } from '@ptbdynamic/plinth/react';

{
    runs.length === 0 ? (
        <PlinthEmptyState
            heading="No runs yet"
            description="Runs show here once a workflow starts."
            icon={
                <PlinthIcon>
                    <InboxIcon />
                </PlinthIcon>
            }
            actions={<PlinthButton href="/runs/new">Start a run</PlinthButton>}
        />
    ) : null;
}
```

## Accessibility

- **The heading is a real heading**, so screen reader users find the empty section by its
  headings, as they find a full one. Pick the level that fits the page's outline.
- **The icon is decorative** and hidden from screen readers (an icon without a label is
  `aria-hidden`); the heading and the description carry the meaning.
- **An empty state that appears as the user types**, such as a search with no match, is not
  announced by itself. Put the results in a container with `role="status"` that stays on the
  page, so screen readers hear _No results_ when the empty state replaces them.
- **The actions** are ordinary [buttons](button.md) or links, with their own focus ring and 40 ×
  40 px touch targets. The empty state itself is not focusable.
- **The text** is centred in a column of reading width and wraps, long words too; the muted
  description meets WCAG AA, light and dark.

The markup contract is at the top of
[`packages/css/src/components/empty-state.css`](../../packages/css/src/components/empty-state.css).
