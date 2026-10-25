# App bar

The bar at the top of an app, to the end side of the [app nav](app-nav.md), from 768px: a search
button that opens the app's search, then a few actions (_Notifications_, _Help_) and the account.
On a phone it is not shown, and the [page header](page-header.md) is the top bar. It goes in the
[app shell](app-shell.md)'s `bar` slot.

## When not to use it

- For a page's own title and actions, such as _Inbox_ and _New ticket_: use the
  [page header](page-header.md), under the app bar.
- For anything a phone needs: the app bar is hidden there. Put it in the page header or the
  [menu sheet](menu-sheet.md) too.
- For a field to type a search into on the page: use a [text field](text-field.md) with
  `type="search"`.

## Search, actions and the account

The default slot is the start of the bar, for the **search button**; the **`actions`** slot holds
icon buttons, each named with its `label`; the **`account`** slot sits on the end edge. Each part
prints only when it has content, and the actions and the account keep to the end edge without a
search. Below 768px the example shows nothing, as on a phone.

```blade example layout="stack"
<x-plinth::app-bar>
    <x-plinth::app-bar-search shortcut="⌘K" />
    <x-slot:actions>
        <x-plinth::icon-button label="Notifications"><x-site.glyph name="bell" /></x-plinth::icon-button>
        <x-plinth::icon-button label="Help"><x-site.glyph name="help" /></x-plinth::icon-button>
    </x-slot:actions>
    <x-slot:account>
        <x-plinth::icon-button label="Account"><x-site.glyph name="user" /></x-plinth::icon-button>
    </x-slot:account>
</x-plinth::app-bar>
```

Keep the actions to two or three, and put the rest in a [menu](menu.md). The account is usually
an avatar in an icon button, or a [menu](menu.md) of the account's links (_Profile_, _Sign out_).

## The search button

`<x-plinth::app-bar-search>` is a button that looks like a field. It doesn't search: it opens the
app's search, a [dialog](dialog.md) with `commandfor` and `command="show-modal"`, or the app's
own handler (`wire:click`, `@click`, `onClick`), which land on the button. Its **`label`** is its
text and its name (_Search_ by default).

The **`shortcut`** is a hint after the label, such as _⌘K_ or _Ctrl K_. Plinth can't tell the
platform apart and ships no script, so the app picks the hint, listens for the keys itself, and
names them in `aria-keyshortcuts`. The hint is hidden from screen readers; `aria-keyshortcuts`
says it.

```blade tab="Blade"
<x-plinth::app-bar-search shortcut="⌘K" aria-keyshortcuts="Meta+K Control+K"
    commandfor="search" command="show-modal" />

<x-plinth::dialog id="search" title="Search">…</x-plinth::dialog>
```

```vue tab="Vue"
<PlinthAppBarSearch shortcut="⌘K" aria-keyshortcuts="Meta+K Control+K" @click="searchOpen = true" />
```

```tsx tab="React"
<PlinthAppBarSearch shortcut="⌘K" aria-keyshortcuts="Meta+K Control+K" onClick={openSearch} />
```

## Height and placement

The app bar is `--plinth-app-bar-height` (56px) tall, the page header's height and the app nav
brand's, so the three line up. The search button is at most `--plinth-app-bar-search-width`
(320px) wide, and narrower when the bar is. Sides are logical: in right-to-left text the search is
on the right and the account on the left.

## Markup contract

| Part                             | Element    | Holds                                                 |
| -------------------------------- | ---------- | ----------------------------------------------------- |
| `plinth-app-bar`                 | `<header>` | the root, the page's banner outside `<main>`          |
| `plinth-app-bar-start`           | `<div>`    | optional: the search button                           |
| `plinth-app-bar-actions`         | `<div>`    | optional: icon buttons                                |
| `plinth-app-bar-account`         | `<div>`    | optional, on the end edge: the account                |
| `plinth-app-bar-search`          | `<button>` | the search button, its own component, `type="button"` |
| `plinth-app-bar-search-label`    | `<span>`   | the button's text and name                            |
| `plinth-app-bar-search-shortcut` | `<kbd>`    | optional: the keyboard hint, `aria-hidden="true"`     |

| Attribute or state   | On                 | Values                                       | Default  |
| -------------------- | ------------------ | -------------------------------------------- | -------- |
| `aria-keyshortcuts`  | the search button  | the keys the app listens for, set by the app | none     |
| `aria-hidden="true"` | the hint, the icon | decorative: the label names the button       | set      |
| width                | the root           | hidden below 768px, shown from 768px         | by width |

## Props

The bar and the search button are their own components, so the app's attributes and listeners
land on the button. The same names in every layer; React takes the Vue props, with slots as
`children` and node props.

| Component | Prop     | Blade              | Vue              | React           | Default  |
| --------- | -------- | ------------------ | ---------------- | --------------- | -------- |
| bar       | search   | the slot           | the default slot | `children`      | none     |
| bar       | actions  | `<x-slot:actions>` | `#actions` slot  | `actions={…}`   | none     |
| bar       | account  | `<x-slot:account>` | `#account` slot  | `account={…}`   | none     |
| search    | label    | `label="Find"`     | `label="Find"`   | `label="Find"`  | _Search_ |
| search    | shortcut | `shortcut="⌘K"`    | `shortcut="⌘K"`  | `shortcut="⌘K"` | none     |

A blank label is an error in every layer: it is the button's only name.

```blade tab="Blade"
<x-plinth::app-bar>
    <x-plinth::app-bar-search shortcut="⌘K" commandfor="search" command="show-modal" />
    <x-slot:actions>
        <x-plinth::icon-button label="Notifications" wire:click="openNotifications">…</x-plinth::icon-button>
    </x-slot:actions>
    <x-slot:account>
        <x-plinth::icon-button label="Account">…</x-plinth::icon-button>
    </x-slot:account>
</x-plinth::app-bar>
```

```vue tab="Vue"
<PlinthAppBar>
  <PlinthAppBarSearch shortcut="⌘K" @click="searchOpen = true" />
  <template #actions><PlinthIconButton label="Notifications">…</PlinthIconButton></template>
  <template #account><PlinthIconButton label="Account">…</PlinthIconButton></template>
</PlinthAppBar>
```

```tsx tab="React"
import { PlinthAppBar, PlinthAppBarSearch, PlinthIconButton } from '@ptbdynamic/plinth/react';

<PlinthAppBar
    actions={<PlinthIconButton label="Notifications">…</PlinthIconButton>}
    account={<PlinthIconButton label="Account">…</PlinthIconButton>}
>
    <PlinthAppBarSearch shortcut="⌘K" onClick={openSearch} />
</PlinthAppBar>;
```

## Accessibility

- Outside `<main>` the app bar is the page's banner landmark, so a page has one.
- The search button is a real `<button>`, named by its visible label; the hint is hidden and
  `aria-keyshortcuts` says the keys.
- Every icon button needs its `label`. An avatar in a button shows the person glyph, or an image:
  initials would be visible text its name doesn't contain.
- The buttons keep a 40px touch target and show the focus ring on `:focus-visible`.
- On a phone the app bar is hidden; put its search and actions in the page header or the menu
  sheet too.

The markup contract is at the top of
[`packages/css/src/components/app-bar.css`](../../packages/css/src/components/app-bar.css).
