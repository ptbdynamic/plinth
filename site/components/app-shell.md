# App shell

The app's frame: the [app nav](app-nav.md) full height on the start side, the [app bar](app-bar.md)
above the content, and the page in a `<main>` that scrolls on its own. On a phone the nav and the
bar step aside, the page's [page header](page-header.md) is the top bar, and the document scrolls
(docs/adr/0008).

## When not to use it

- For a page without the app's navigation, such as sign-in or a landing page: use the page alone.
- For panes inside a page, such as a list beside its detail: use a [split view](split-view.md) in
  the shell's main.
- More than once on a page: the shell is the page's frame, and its main the page's one `<main>`.

## The frame

The **`nav`** slot takes the app nav, the **`bar`** slot the app bar, and the default slot the page:
its page header, then its content. From 768px the shell is as tall as the screen; the nav fills its
start column, the bar sits above the main, and only the main scrolls. The shell holds the page's
`<main>`, so it can't be shown live inside this one: its stories in Storybook show it at every
width, with a support inbox in it.

```blade
<x-plinth::app-shell>
    <x-slot:nav>
        <x-plinth::app-nav label="Main" brand-name="Harbour" brand-href="#">
            <x-slot:mark><img src="/logo.svg" alt=""></x-slot:mark>
            <x-plinth::app-nav-item href="#">
                <x-slot:icon><x-plinth::icon><x-app.icon name="file" /></x-plinth::icon></x-slot:icon>
                Content
            </x-plinth::app-nav-item>
            <x-plinth::app-nav-item href="#" count="12" current>
                <x-slot:icon><x-plinth::icon><x-app.icon name="support" /></x-plinth::icon></x-slot:icon>
                Support
            </x-plinth::app-nav-item>
        </x-plinth::app-nav>
    </x-slot:nav>
    <x-slot:bar>
        <x-plinth::app-bar>
            <x-plinth::app-bar-search shortcut="⌘K" />
            <x-slot:actions>
                <x-plinth::icon-button label="Notifications"><x-app.icon name="bell" /></x-plinth::icon-button>
            </x-slot:actions>
        </x-plinth::app-bar>
    </x-slot:bar>
    <x-plinth::page-header heading="Support" top />
    <p>The page goes here, and scrolls on its own.</p>
</x-plinth::app-shell>
```

## On a phone

Below 768px the nav and the bar parts are not shown, and the page is the screen:

- Give the page header **`top`**, so it clears the status bar as the screen's top bar. Under the
  app bar, from 768px, the shell drops that safe area again.
- Its menu button opens the [menu sheet](menu-sheet.md) with the nav's items (see
  [the app nav](app-nav.md#on-a-phone-one-list-two-navigations)). Put the menu sheet in the main
  or after the shell, never in the `nav` slot: a phone doesn't render that part.
- The document scrolls, not the main, so the browser's toolbars can collapse, and the page header
  sticks to the top of the screen.

## Scrolling

From 768px the main scrolls on its own, so the nav and the bar stay put. A page header in it
sticks to the main's top: leave `--plinth-page-header-offset` at 0. The main is a flex column, so a
[split view](split-view.md) after the page header fills the height left, and its panes scroll on
their own instead.

The page header's contract asks for `scroll-padding-block-start` on its scrolling element, so a
focused element doesn't land under it. From 768px the shell sets it on its main when the main
holds a page header; below 768px the document scrolls, so the app sets it on `html`. On a phone a
split view's footer covers the bottom of the screen too: add `scroll-padding-block-end` there.

## Markup contract

| Part                    | Element  | Holds                                                      |
| ----------------------- | -------- | ---------------------------------------------------------- |
| `plinth-app-shell`      | `<div>`  | the root                                                   |
| `plinth-app-shell-nav`  | `<div>`  | optional: the app nav, full height on the start side       |
| `plinth-app-shell-bar`  | `<div>`  | optional: the app bar, above the main                      |
| `plinth-app-shell-main` | `<main>` | the page, its main landmark; scrolls on its own from 768px |

| Attribute or state | On       | Values                                                   | Default  |
| ------------------ | -------- | -------------------------------------------------------- | -------- |
| width              | the root | the page alone below 768px; nav, bar and main from 768px | by width |

The shell has no states. The app's layout state lives on what it holds: `aria-current` on the
nav's items, `pane` and `secondary-closed` on a split view.

## Props

The same names in every layer; React takes the Vue props, with slots as `children` and node props.
The app's attributes (`class`, `id`, `data-*`, `wire:*`, `x-*`) land on the root.

| Prop | Blade          | Vue              | React      | Default |
| ---- | -------------- | ---------------- | ---------- | ------- |
| nav  | `<x-slot:nav>` | `#nav` slot      | `nav={…}`  | none    |
| bar  | `<x-slot:bar>` | `#bar` slot      | `bar={…}`  | none    |
| page | the slot       | the default slot | `children` | none    |

```blade tab="Blade"
<x-plinth::app-shell>
    <x-slot:nav>
        <x-plinth::app-nav label="Main">…</x-plinth::app-nav>
    </x-slot:nav>
    <x-slot:bar>
        <x-plinth::app-bar>…</x-plinth::app-bar>
    </x-slot:bar>
    <x-plinth::page-header heading="Inbox" top>…</x-plinth::page-header>
    {{ $slot }}
</x-plinth::app-shell>
<x-plinth::menu-sheet id="menu" title="Menu">…</x-plinth::menu-sheet>
```

```vue tab="Vue"
<PlinthAppShell>
  <template #nav><PlinthAppNav label="Main">…</PlinthAppNav></template>
  <template #bar><PlinthAppBar>…</PlinthAppBar></template>
  <PlinthPageHeader heading="Inbox" top>…</PlinthPageHeader>
  <RouterView />
</PlinthAppShell>
<PlinthMenuSheet id="menu" title="Menu">…</PlinthMenuSheet>
```

```tsx tab="React"
import {
    PlinthAppBar,
    PlinthAppNav,
    PlinthAppShell,
    PlinthPageHeader,
} from '@ptbdynamic/plinth/react';

<PlinthAppShell
    nav={<PlinthAppNav label="Main">…</PlinthAppNav>}
    bar={<PlinthAppBar>…</PlinthAppBar>}
>
    <PlinthPageHeader heading="Inbox" top />
    <Outlet />
</PlinthAppShell>;
```

## Accessibility

- The nav, the bar and the main are landmarks (navigation, banner, main), so a screen reader
  skips straight to the page; the shell adds no skip link of its own.
- The source order is the reading order: the nav, the bar, then the page. Sides are logical, so
  in right-to-left text the nav is on the right.
- From 768px the main is a scrolling region: keep something focusable in it (a page always has a
  link, a button or a field), so it scrolls from the keyboard in every browser.
- On a phone the nav's links are in the menu sheet, a modal dialog with its own focus trap and
  close button.

The markup contract is at the top of
[`packages/css/src/components/app-shell.css`](../../packages/css/src/components/app-shell.css).
