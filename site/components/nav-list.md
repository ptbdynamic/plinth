# Nav list

A vertical list of links for a page's own navigation, such as an inbox's folders (_Open 12_,
_Pending 3_, _Solved_, _Spam_) and its saved views under a heading (_Views_: _Assigned to me 5_,
_Unassigned 4_). Each item has a label and an optional count, and the current one is marked. It
fills its column, such as the [split view](split-view.md)'s secondary column.

## When not to use it

- For the app's main navigation: use the [app nav](app-nav.md).
- For a few sections in a row under the page header: use a [section menu](section-menu.md).
- For filters that narrow a list without leaving the page: use a [pill row](pill-row.md).
- For rows with a description, an icon or actions: use a [list card](list-card.md).

## Groups and items

Name the nav with **`label`** (_Folders_), so it reads apart from the app nav. Put its items in
groups: a group takes an optional **`heading`**, an `<h2>` unless **`heading-level`** says
otherwise (h2 to h6). Give each item the `href` of its view, an optional **`count`**, and set
**`current`** on the item of the view being shown, which prints `aria-current="page"`. The current
item takes the selection tint, a 2px accent edge on its start side and a heavier label. No item
is current on a page outside every view. Give every item its `href`: without one it prints a
plain `<a>`, which is no link and can't be reached with Tab.

```blade example
<x-plinth::nav-list label="Folders" style="max-inline-size: 15rem">
    <x-plinth::nav-list-group>
        <x-plinth::nav-list-item href="#" count="12" current>Open</x-plinth::nav-list-item>
        <x-plinth::nav-list-item href="#" count="3">Pending</x-plinth::nav-list-item>
        <x-plinth::nav-list-item href="#">Solved</x-plinth::nav-list-item>
        <x-plinth::nav-list-item href="#">Spam</x-plinth::nav-list-item>
    </x-plinth::nav-list-group>
    <x-plinth::nav-list-group heading="Views" heading-level="h3">
        <x-plinth::nav-list-item href="#" count="5">Assigned to me</x-plinth::nav-list-item>
        <x-plinth::nav-list-item href="#" count="4">Unassigned</x-plinth::nav-list-item>
    </x-plinth::nav-list-group>
</x-plinth::nav-list>
```

Items always go in a group; a list with no headings is one group without one. The heading is a
real heading, so a screen reader can jump to it: pick the level that fits the page's outline.

## Counts

A count sits on the item's end edge, in the mono face, such as how many tickets a folder holds.
Keep it short (_99+_ rather than _1,204_). A count of 0 still prints; leave it out for none. A
long label wraps, and the count keeps to the end edge.

## Paired with a section menu

The nav list goes in the split view's secondary column, which shows from 1280px. Below that the
app shows the same items as a [section menu](section-menu.md) under the page header: keep the
items in one list and render both from it, in the same order and without the headings, so they
cannot drift apart, and set `current` in both from the same route. The section menu is the app's
to hide from 1280px, while the nav list shows, with its own rule (or to keep when the app closes
the secondary column).

```blade tab="Blade"
@php
    $folders = [
        ['label' => 'Open', 'href' => route('inbox', 'open'), 'count' => $open],
        ['label' => 'Pending', 'href' => route('inbox', 'pending'), 'count' => $pending],
        ['label' => 'Solved', 'href' => route('inbox', 'solved')],
    ];
@endphp

<x-plinth::section-menu label="Folders" class="app-folders-menu">
    @foreach ($folders as $folder)
        <x-plinth::section-menu-item :href="$folder['href']" :count="$folder['count'] ?? null" :current="url()->current() === $folder['href']">
            {{ $folder['label'] }}
        </x-plinth::section-menu-item>
    @endforeach
</x-plinth::section-menu>

<x-plinth::split-view>
    <x-slot:secondary>
        <x-plinth::nav-list label="Folders" id="folders">
            <x-plinth::nav-list-group>
                @foreach ($folders as $folder)
                    <x-plinth::nav-list-item :href="$folder['href']" :count="$folder['count'] ?? null" :current="url()->current() === $folder['href']" wire:navigate>
                        {{ $folder['label'] }}
                    </x-plinth::nav-list-item>
                @endforeach
            </x-plinth::nav-list-group>
        </x-plinth::nav-list>
    </x-slot:secondary>
    …
</x-plinth::split-view>
```

```css
/* The app's own rule: the nav list takes over from 1280px. */
@media (min-width: 1280px) {
    .app-folders-menu {
        display: none;
    }
}
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                      | Element          | Holds                                 |
| ------------------------- | ---------------- | ------------------------------------- |
| `plinth-nav-list`         | `<nav>`          | the root, named by `aria-label`       |
| `plinth-nav-list-group`   | `<div>`          | a group, its own component            |
| `plinth-nav-list-heading` | `<h2>` to `<h6>` | the group's optional heading          |
| `plinth-nav-list-item`    | `<a>`            | an item, its own component            |
| `plinth-nav-list-label`   | `<span>`         | the item's label, its accessible name |
| `plinth-nav-list-count`   | `<span>`         | the optional count, on the end edge   |

| Attribute or state    | On        | Values                                           | Default |
| --------------------- | --------- | ------------------------------------------------ | ------- |
| `aria-label`          | the root  | the nav's name                                   | none    |
| heading level         | a heading | `h2` to `h6`; anything else falls back to `h2`   | `h2`    |
| `aria-current="page"` | an item   | the item of the view being shown, set by the app | none    |

## Props

The nav, each group and each item are their own components, so the app's attributes and
listeners (`wire:navigate`, `x-on:click`, `@click`, `onClick`) land on the item's link. Extra
attributes go to each component's root, and the project's win a clash (`class` is added). The
same names in every layer; React takes the Vue props, with the slot as `children`.

| Component | Prop          | Blade                            | Vue                          | React                | Default |
| --------- | ------------- | -------------------------------- | ---------------------------- | -------------------- | ------- |
| nav       | label         | `label="Folders"`                | `label="Folders"`            | `label="Folders"`    | none    |
| nav       | groups        | the slot                         | the default slot             | `children`           | none    |
| group     | heading       | `heading="Views"`                | `heading="Views"`            | `heading="Views"`    | none    |
| group     | heading level | `heading-level="h3"`             | `heading-level="h3"`         | `headingLevel="h3"`  | `h2`    |
| group     | items         | the slot                         | the default slot             | `children`           | none    |
| item      | href          | `href="/inbox/open"`             | `href="/inbox/open"`         | `href="/inbox/open"` | none    |
| item      | count         | `count="12"` or `:count="$open"` | `:count="12"`                | `count={12}`         | none    |
| item      | current       | `current` or `:current="$on"`    | `current` or `:current="on"` | `current={on}`       | off     |
| item      | label         | the slot                         | the default slot             | `children`           | none    |

In Blade, `heading-level` takes the string or the `HeadingLevel` enum.

```blade tab="Blade"
<x-plinth::nav-list label="Folders">
    <x-plinth::nav-list-group heading="Views">
        <x-plinth::nav-list-item :href="route('inbox', 'mine')" :count="$mine" :current="request()->routeIs('inbox') && request()->route('folder') === 'mine'" wire:navigate>
            Assigned to me
        </x-plinth::nav-list-item>
    </x-plinth::nav-list-group>
</x-plinth::nav-list>
```

```vue tab="Vue"
<PlinthNavList label="Folders">
  <PlinthNavListGroup heading="Views">
    <PlinthNavListItem href="/inbox/mine" :count="mine" :current="route.path === '/inbox/mine'">
      Assigned to me
    </PlinthNavListItem>
  </PlinthNavListGroup>
</PlinthNavList>
```

```tsx tab="React"
import { PlinthNavList, PlinthNavListGroup, PlinthNavListItem } from '@ptbdynamic/plinth/react';

<PlinthNavList label="Folders">
    <PlinthNavListGroup heading="Views">
        <PlinthNavListItem href="/inbox/mine" count={mine} current={pathname === '/inbox/mine'}>
            Assigned to me
        </PlinthNavListItem>
    </PlinthNavListGroup>
</PlinthNavList>;
```

## Accessibility

- The nav list is a named `<nav>` landmark, and the current item says so (`aria-current="page"`).
- Group headings are real headings, so they can be reached from a screen reader's list of
  headings; a count is read after the label (_Open 12_).
- The current item has a 2px accent edge and a heavier label as well as its tint, so colour is not
  its only cue; in forced colours it takes the system highlight.
- Every item is at least 40px tall, and shows the focus ring on `:focus-visible`, inside its row
  so a scrolling column doesn't cut it off. Hover only adds a surface step; nothing depends on it.
- Only colours change, on the duration tokens, which reduced motion sets to 0.

The markup contract is at the top of
[`packages/css/src/components/nav-list.css`](../../packages/css/src/components/nav-list.css).
