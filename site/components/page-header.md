# Page header

The bar at the top of a page: a leading action (the menu or back), the page's heading, and a few
trailing actions. On a phone it is the screen's top bar; in an app shell it heads the page beside
the sidebar, under the app bar. It sticks to the top while the content scrolls under it.

## When not to use it

- For the app bar itself, with the logo, the search or the account: that is the app's layout.
- For a heading inside a page or a card: use a heading. A page has one page header.
- For more than three icon buttons: put the rest behind a _More_ button that opens a menu.

## The parts

```blade example layout="phone"
<x-plinth::page-header heading="Invoices">
    <x-slot:leading>
        <x-plinth::icon-button label="Menu"><x-site.glyph name="menu" /></x-plinth::icon-button>
    </x-slot:leading>
    <x-slot:actions>
        <x-plinth::icon-button label="Search"><x-site.glyph name="search" /></x-plinth::icon-button>
        <x-plinth::icon-button label="More"><x-site.glyph name="more" /></x-plinth::icon-button>
    </x-slot:actions>
</x-plinth::page-header>
```

| Part                          | Element       | Required | What it is                                                              |
| ----------------------------- | ------------- | -------- | ----------------------------------------------------------------------- |
| `.plinth-page-header`         | `<header>`    | yes      | The root. A project's classes and attributes land on it                 |
| `.plinth-page-header-leading` | `<div>`       | no       | One action, usually an icon button: the menu, or back                   |
| `.plinth-page-header-heading` | `<h1>`–`<h6>` | yes      | The page's heading. One line, ending in an ellipsis when it doesn't fit |
| `.plinth-page-header-actions` | `<div>`       | no       | The trailing actions: up to three icon buttons, or a primary button     |

- The leading action is a **menu** button on a top-level page, opening the app's
  [menu sheet](menu-sheet.md) with `commandfor` and `command="show-modal"`, or a **back** link on
  a page under it (with `mirror`, so its arrow points the other way in right-to-left text).
- The leading part and the actions are printed only when they have content. Every
  [icon button](icon-button.md) needs its own name (`label`) in the page's language.

The page header has no states of its own: what its actions do is the app's, through a link, a
`commandfor`, `wire:click` or `@click` on the button.

## Back, or nothing

A page further down opens with a back link; a top-level page with nothing to go back to leaves
the leading part out, and a page with no actions shows just its heading.

```blade example layout="phone"
<x-plinth::page-header heading="Invoice 1042">
    <x-slot:leading>
        <x-plinth::icon-button label="Back" href="#" mirror><x-site.glyph name="arrow-left" /></x-plinth::icon-button>
    </x-slot:leading>
    <x-slot:actions>
        <x-plinth::icon-button label="Download"><x-site.glyph name="download" /></x-plinth::icon-button>
    </x-slot:actions>
</x-plinth::page-header>
<x-plinth::page-header heading="Settings" />
```

## A primary action

Instead of icon buttons, the actions can hold the page's one main action as a primary
[button](button.md), on the right.

```blade example layout="phone"
<x-plinth::page-header heading="Inbox">
    <x-slot:actions>
        <x-plinth::button>New ticket</x-plinth::button>
    </x-slot:actions>
</x-plinth::page-header>
```

## The heading's level

The heading is the page's `<h1>` by default. When two pages sit side by side on a wide screen,
such as a list and the item open beside it, the second one's heading is an `<h2>` under the
first's `<h1>`: set **`level`** (`h2` to `h6`). The level doesn't change the look.

```blade example layout="phone"
<x-plinth::page-header heading="Ticket 1042" level="h2">
    <x-slot:leading>
        <x-plinth::icon-button label="Back" href="#" mirror><x-site.glyph name="arrow-left" /></x-plinth::icon-button>
    </x-slot:leading>
</x-plinth::page-header>
```

## The screen's top bar

When the page header is the very top of a phone's screen, set **`top`** (it prints `data-top`).
On a phone that draws under the status bar and the notch (`viewport-fit=cover` in the viewport
meta) the page header then adds `env(safe-area-inset-top)` above its height. Leave it off when
the page header sits under an app bar: the app sets it, the page header doesn't guess.

```blade
<x-plinth::page-header heading="Inbox" top>…</x-plinth::page-header>
```

The page header is **`--plinth-page-header-height`** tall (56px), a component token a project
can tune. Its inline padding clears the notch on a phone held sideways.

## Sticky, and the offset

The page header is `position: sticky` on the **`--plinth-layer-sticky`** z-index: above the
page's content, below sheets and menus, which sit in the browser's top layer. It sticks
**`--plinth-page-header-offset`** from the top of its scrolling parent: 0 by default. In a shell
with an app bar that stays at the top, set the offset to the bar's height, and the page header
sticks just below it.

```css
.app-shell {
    --plinth-page-header-offset: var(--plinth-space-12);
}
```

Content scrolls under the page header, so a focused element or the target of an in-page link can
land behind it. Set `scroll-padding-block-start` on the page's scrolling element to keep them
clear (add `env(safe-area-inset-top)` for the screen's top bar):

```css
html {
    scroll-padding-block-start: calc(
        var(--plinth-page-header-offset) + var(--plinth-page-header-height)
    );
}
```

In right-to-left text the leading action and the actions swap sides, and a mirrored back arrow
points right.

## Landmarks

The root is a `<header>`. At the top of the page, outside `<main>`, `<article>` and `<section>`,
it is the page's **banner** landmark, as on a phone where it is the top bar. Inside `<main>`, as
in an app shell where the app bar is the banner, it is no landmark: only the page's header, with
the page's heading in it.

## Markup contract

| Attribute  | On       | Values  | Default | What it does                                       |
| ---------- | -------- | ------- | ------- | -------------------------------------------------- |
| `data-top` | the root | present | absent  | The screen's top bar: adds the top safe-area inset |

The heading's element is `h1` to `h6`; an unknown level prints `h1`.

## Props

The same names in every layer. React takes the Vue props, with the slots as props that take a
node.

| Prop    | Blade                           | Vue                  | React                | Default |
| ------- | ------------------------------- | -------------------- | -------------------- | ------- |
| heading | `heading="Invoices"` (required) | `heading="Invoices"` | `heading="Invoices"` | none    |
| level   | `level="h2"`                    | `level="h2"`         | `level="h2"`         | `h1`    |
| top     | `top`                           | `top`                | `top`                | off     |
| leading | `<x-slot:leading>`              | `#leading` slot      | `leading` (a node)   | none    |
| actions | `<x-slot:actions>`              | `#actions` slot      | `actions` (a node)   | none    |

Every layer needs a `heading` and throws without one. Blade takes `level` as a string or a
`PageHeaderLevel` case. Extra attributes reach the `<header>`, the HTML `title` attribute too,
and a project's attribute wins over the page header's own (`data-top`). Vue emits no events.

```blade tab="Blade"
<x-plinth::page-header heading="Message">
    <x-slot:leading>
        <x-plinth::icon-button label="Back" :href="route('inbox')" mirror>…</x-plinth::icon-button>
    </x-slot:leading>
    <x-slot:actions>
        <x-plinth::icon-button label="Archive" wire:click="archive">…</x-plinth::icon-button>
    </x-slot:actions>
</x-plinth::page-header>
```

```vue tab="Vue"
<PlinthPageHeader heading="Message">
  <template #leading>
    <PlinthIconButton label="Back" href="/inbox" mirror>…</PlinthIconButton>
  </template>
  <template #actions>
    <PlinthIconButton label="Archive" @click="archive">…</PlinthIconButton>
  </template>
</PlinthPageHeader>
```

```tsx tab="React"
import { PlinthIconButton, PlinthPageHeader } from '@ptbdynamic/plinth/react';

<PlinthPageHeader
    heading="Message"
    leading={
        <PlinthIconButton label="Back" href="/inbox" mirror>
            <BackIcon />
        </PlinthIconButton>
    }
    actions={
        <PlinthIconButton label="Archive" onClick={archive}>
            <ArchiveIcon />
        </PlinthIconButton>
    }
/>;
```

## Accessibility

- The heading is the page's `<h1>`, or a lower level when the page sits beside another page's
  `<h1>`.
- The page header is the banner landmark when it sits outside `<main>`, `<article>` and
  `<section>`, and no landmark inside `<main>`.
- Every icon button in it has its own accessible name, in the page's language.
- The leading and trailing parts follow the reading order, so they swap sides in right-to-left
  text and a mirrored back arrow points the right way.
- Set `scroll-padding-block-start` so focus and in-page links don't land under the sticky page
  header.
- Every action keeps a 40 × 40px touch target.

The markup contract is at the top of
[`packages/css/src/components/page-header.css`](../../packages/css/src/components/page-header.css).
