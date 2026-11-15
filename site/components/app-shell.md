# App shell

The app's frame: the [app nav](app-nav.md) full height on the start side, an optional section
column beside it, the [app bar](app-bar.md) above the content, and the page in a `<main>` that
scrolls on its own. On a phone the nav and the
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

## The section column

A section with many pages, such as Settings (Users, Roles, Sign-in, Secrets), can keep its own
links in a full-height column beside the app nav. It is part of the frame, not of one page, so it
stays put while the pages in the section change. From 1280px it sits between the nav and the bar
and main, 240px wide (`--plinth-app-shell-section-width`), with a divider on its end edge, and its
links scroll on their own.

- The **`section`** slot takes the section's navigation, usually a [nav list](nav-list.md) with
  grouped links and small headings. The shell pads it.
- **`section-title`** puts the section's name at the top of the column, on a row as tall as the
  app bar, so it lines up with the bar and the app nav's brand. Without a title there is no row.
- **`section-id`** gives the column its id, for the button that collapses it, and the title the
  id `<id>-title`: name the nav with `aria-labelledby` pointing at it. Without an id, give the nav
  a `label` instead.
- **`section-closed`** collapses the column (`data-section="closed"`), for a button in the app
  bar or the page header with `aria-expanded` and `aria-controls` naming the column. The app owns
  that state, from its URL or its own memory. Hide the button below 1280px, where the column
  isn't shown, as for the split view's panel button.

It sits beside the sidebar, or beside the rail: give the app nav `variant="rail"` and let the
section column carry the labels.

```blade
<x-plinth::app-shell section-title="Settings" section-id="settings">
    <x-slot:nav>
        <x-plinth::app-nav label="Main" variant="rail">…</x-plinth::app-nav>
    </x-slot:nav>
    <x-slot:section>
        <x-plinth::nav-list aria-labelledby="settings-title">
            <x-plinth::nav-list-group>
                <x-plinth::nav-list-item href="/settings">General</x-plinth::nav-list-item>
            </x-plinth::nav-list-group>
            <x-plinth::nav-list-group heading="Access">
                <x-plinth::nav-list-item href="/settings/users" current>Users</x-plinth::nav-list-item>
                <x-plinth::nav-list-item href="/settings/roles">Roles</x-plinth::nav-list-item>
            </x-plinth::nav-list-group>
        </x-plinth::nav-list>
    </x-slot:section>
    <x-slot:bar>
        <x-plinth::app-bar>…</x-plinth::app-bar>
    </x-slot:bar>
    <x-plinth::page-header heading="Users" top />
    <x-plinth::section-menu label="Settings" class="app-settings-menu">…</x-plinth::section-menu>
    …
</x-plinth::app-shell>
```

Below 1280px the column isn't shown. Offer the same links another way, rendered from the same
list: a [section menu](section-menu.md) under the page header, as above, or the menu sheet on a
phone. Hide the section menu from 1280px with your own rule while the column shows:

```css
@media (min-width: 1280px) {
    .plinth-app-shell:not([data-section='closed']) .app-settings-menu {
        display: none;
    }
}
```

## On a phone

Below 768px the nav, the section and the bar parts are not shown, and the page is the screen:

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

| Part                              | Element  | Holds                                                             |
| --------------------------------- | -------- | ----------------------------------------------------------------- |
| `plinth-app-shell`                | `<div>`  | the root                                                          |
| `plinth-app-shell-nav`            | `<div>`  | optional: the app nav, full height on the start side              |
| `plinth-app-shell-section`        | `<div>`  | optional: the section column, from 1280px; `id` from `section-id` |
| `plinth-app-shell-section-header` | `<div>`  | with a title: the row as tall as the app bar                      |
| `plinth-app-shell-section-title`  | `<p>`    | the section's name; `id` is `<section-id>-title`                  |
| `plinth-app-shell-section-body`   | `<div>`  | the section's navigation; scrolls on its own                      |
| `plinth-app-shell-bar`            | `<div>`  | optional: the app bar, above the main                             |
| `plinth-app-shell-main`           | `<main>` | the page, its main landmark; scrolls on its own from 768px        |

| Attribute or state | On       | Values                                                                                       | Default        |
| ------------------ | -------- | -------------------------------------------------------------------------------------------- | -------------- |
| width              | the root | the page alone below 768px; nav, bar and main from 768px; the section column too from 1280px | by width       |
| `data-section`     | the root | `closed`: the section column collapses                                                       | open (missing) |

The rest of the app's layout state lives on what the shell holds: `aria-current` on the nav's
and the section's items, `pane` and `secondary-closed` on a split view.

## Props

The same names in every layer; React takes the Vue props, with slots as `children` and node props.
The app's attributes (`class`, `id`, `data-*`, `wire:*`, `x-*`) land on the root.

| Prop           | Blade              | Vue              | React           | Default |
| -------------- | ------------------ | ---------------- | --------------- | ------- |
| nav            | `<x-slot:nav>`     | `#nav` slot      | `nav={…}`       | none    |
| section        | `<x-slot:section>` | `#section` slot  | `section={…}`   | none    |
| section title  | `section-title`    | `section-title`  | `sectionTitle`  | none    |
| section id     | `section-id`       | `section-id`     | `sectionId`     | none    |
| section closed | `section-closed`   | `section-closed` | `sectionClosed` | `false` |
| bar            | `<x-slot:bar>`     | `#bar` slot      | `bar={…}`       | none    |
| page           | the slot           | the default slot | `children`      | none    |

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
<PlinthAppShell section-title="Settings" section-id="settings" :section-closed="closed">
  <template #nav><PlinthAppNav label="Main" variant="rail">…</PlinthAppNav></template>
  <template #section><PlinthNavList aria-labelledby="settings-title">…</PlinthNavList></template>
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
    PlinthNavList,
    PlinthPageHeader,
} from '@ptbdynamic/plinth/react';

<PlinthAppShell
    nav={
        <PlinthAppNav label="Main" variant="rail">
            …
        </PlinthAppNav>
    }
    section={<PlinthNavList aria-labelledby="settings-title">…</PlinthNavList>}
    sectionTitle="Settings"
    sectionId="settings"
    sectionClosed={closed}
    bar={<PlinthAppBar>…</PlinthAppBar>}
>
    <PlinthPageHeader heading="Inbox" top />
    <Outlet />
</PlinthAppShell>;
```

## Accessibility

- The nav, the bar and the main are landmarks (navigation, banner, main), so a screen reader
  skips straight to the page; the shell adds no skip link of its own.
- The source order is the reading order: the nav, the section column, the bar, then the page. Sides are logical, so
  in right-to-left text the nav is on the right.
- From 768px the main is a scrolling region: keep something focusable in it (a page always has a
  link, a button or a field), so it scrolls from the keyboard in every browser.
- The section column holds a `<nav>` named by its title (`aria-labelledby`), so it reads apart
  from the app nav and the page's own navigation, and a screen reader can skip both. The title is
  a plain `<p>`, not a heading: it comes before the page's `<h1>`, and the landmark already names
  the section. The app sets `aria-current="page"` on the current link.
- A collapsed section column isn't rendered, so it leaves the reading and tab order; the button
  that collapses it says so with `aria-expanded`, and is hidden below 1280px, so it never points
  at a column that can't show.
- On a phone the nav's links are in the menu sheet, a modal dialog with its own focus trap and
  close button.

The markup contract is at the top of
[`packages/css/src/components/app-shell.css`](../../packages/css/src/components/app-shell.css).
