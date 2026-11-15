# Breadcrumbs

Where a deep page sits, and a way back up: _Settings_ / _Users & roles_ / _Users_. The trail runs
from the top of the app down to the current page, which is last and is not a link. It sits above a
page's title, or in the [app bar](app-bar.md) before the search.

## When not to use it

- For the app's main navigation: use the [app nav](app-nav.md).
- For switching between the sections of one page: use a [section menu](section-menu.md).
- For a page one level deep: a back button in the [page header](page-header.md) says enough.

## A trail

Give every page above the current one its `href`, and set `current` on the last item, which
prints `aria-current="page"` and drops the link. The separators are drawn in CSS, so the labels
hold only their own words.

```blade example
<x-plinth::breadcrumbs>
    <x-plinth::breadcrumbs-item href="#">Settings</x-plinth::breadcrumbs-item>
    <x-plinth::breadcrumbs-item href="#">Users &amp; roles</x-plinth::breadcrumbs-item>
    <x-plinth::breadcrumbs-item current>Users</x-plinth::breadcrumbs-item>
</x-plinth::breadcrumbs>
```

The trail stays on one line. When it doesn't fit, its labels are cut with an ellipsis rather than
wrapped, and none gets narrower than the 40px touch target.

## Pages in a menu

A long trail can put its middle pages behind a more button. The app decides which pages go there,
and puts a [menu](menu.md) of links in the more button's slot; **`menu`** is that menu's id, which
the button opens with `popovertarget`.

```blade example
<x-plinth::breadcrumbs>
    <x-plinth::breadcrumbs-item href="#">Workspace</x-plinth::breadcrumbs-item>
    <x-plinth::breadcrumbs-more menu="trail-more">
        <x-plinth::menu id="trail-more">
            <x-plinth::menu-item href="#">Settings</x-plinth::menu-item>
            <x-plinth::menu-item href="#">Users &amp; roles</x-plinth::menu-item>
        </x-plinth::menu>
    </x-plinth::breadcrumbs-more>
    <x-plinth::breadcrumbs-item href="#">Users</x-plinth::breadcrumbs-item>
    <x-plinth::breadcrumbs-item current>Alex Morgan</x-plinth::breadcrumbs-item>
</x-plinth::breadcrumbs>
```

## Only the parent on a phone

With **`collapse="parent"`**, a phone shows only the current page's parent, as a back link with a
chevron before it. From 768px the full trail shows again. The page's title says where it is, so
the current page isn't repeated. The example shows it below 768px.

```blade example
<x-plinth::breadcrumbs collapse="parent">
    <x-plinth::breadcrumbs-item href="#">Settings</x-plinth::breadcrumbs-item>
    <x-plinth::breadcrumbs-item href="#">Users &amp; roles</x-plinth::breadcrumbs-item>
    <x-plinth::breadcrumbs-item current>Users</x-plinth::breadcrumbs-item>
</x-plinth::breadcrumbs>
```

## In the app bar

In the app bar's start, the trail comes before the search, and the search takes what is left of
the bar. When the bar is short the trail's labels are cut first, and the search never gets
narrower than `--plinth-app-bar-search-min-width` (160px). The app bar isn't shown on a phone, so
a page that keeps its trail there puts it above the title too.

```blade
<x-plinth::app-bar>
    <x-plinth::breadcrumbs>
        <x-plinth::breadcrumbs-item href="/settings">Settings</x-plinth::breadcrumbs-item>
        <x-plinth::breadcrumbs-item current>Users</x-plinth::breadcrumbs-item>
    </x-plinth::breadcrumbs>
    <x-plinth::app-bar-search commandfor="search" command="show-modal" />
</x-plinth::app-bar>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                        | Element                  | Required | What it is                                                      |
| --------------------------- | ------------------------ | -------- | --------------------------------------------------------------- |
| `.plinth-breadcrumbs`       | `<nav>`                  | yes      | The root, named "Breadcrumb"                                    |
| `.plinth-breadcrumbs-list`  | `<ol>`                   | yes      | The ordered list of the trail                                   |
| `.plinth-breadcrumbs-item`  | `<li>`                   | yes      | A step of the trail; its `::before` draws the separator         |
| `.plinth-breadcrumbs-link`  | `<a>`                    | yes      | The item's root: a page's link, or the current page without one |
| `.plinth-breadcrumbs-label` | `<span>`                 | yes      | The link's text, cut with an ellipsis when it doesn't fit       |
| `.plinth-breadcrumbs-more`  | `<button type="button">` | no       | The more button's root, with `popovertarget` and `aria-label`   |

| Attribute       | On   | Values        | Default    | What it does                                           |
| --------------- | ---- | ------------- | ---------- | ------------------------------------------------------ |
| `aria-label`    | root | text          | Breadcrumb | Names the trail apart from the page's other navigation |
| `data-collapse` | root | `parent`      | none       | On a phone, only the parent shows, as a back link      |
| `aria-current`  | link | `page`        | none       | The current page; it has no `href`                     |
| `popovertarget` | more | the menu's id | none       | Opens the app's menu of the left-out pages             |

## Props

The trail, each item and the more button are their own components. An item's attributes and
listeners (`wire:navigate`, `x-on:click`, `@click`, `onClick`) land on its link, not on the `<li>`;
the more button's land on the button. React takes the Vue props, with the label as `children`.

| Component | Prop     | Blade                         | Vue                          | React                   | Default    |
| --------- | -------- | ----------------------------- | ---------------------------- | ----------------------- | ---------- |
| trail     | label    | `label="Path"`                | `label="Path"`               | `label="Path"`          | Breadcrumb |
| trail     | collapse | `collapse="parent"`           | `collapse="parent"`          | `collapse="parent"`     | none       |
| item      | href     | `href="/settings"`            | `href="/settings"`           | `href="/settings"`      | none       |
| item      | current  | `current` or `:current="$on"` | `current` or `:current="on"` | `current={on}`          | off        |
| item      | label    | the slot                      | the default slot             | `children`              | none       |
| more      | menu     | `menu="trail-more"`           | `menu="trail-more"`          | `menu="trail-more"`     | required   |
| more      | label    | `label="Earlier pages"`       | `label="Earlier pages"`      | `label="Earlier pages"` | More pages |
| more      | the menu | the slot                      | the default slot             | `children`              | none       |

`collapse` takes `none` or `parent`; anything else is `none`. In Blade it also takes the
`BreadcrumbsCollapse` enum.

```blade tab="Blade"
<x-plinth::breadcrumbs collapse="parent">
    <x-plinth::breadcrumbs-item :href="route('settings')" wire:navigate>Settings</x-plinth::breadcrumbs-item>
    <x-plinth::breadcrumbs-item current>{{ $user->name }}</x-plinth::breadcrumbs-item>
</x-plinth::breadcrumbs>
```

```vue tab="Vue"
<PlinthBreadcrumbs collapse="parent">
  <PlinthBreadcrumbsItem href="/settings" @click.prevent="go('/settings')">Settings</PlinthBreadcrumbsItem>
  <PlinthBreadcrumbsItem current>{{ user.name }}</PlinthBreadcrumbsItem>
</PlinthBreadcrumbs>
```

```tsx tab="React"
import { PlinthBreadcrumbs, PlinthBreadcrumbsItem } from '@ptbdynamic/plinth/react';

<PlinthBreadcrumbs collapse="parent">
    <PlinthBreadcrumbsItem href="/settings">Settings</PlinthBreadcrumbsItem>
    <PlinthBreadcrumbsItem current>{user.name}</PlinthBreadcrumbsItem>
</PlinthBreadcrumbs>;
```

## Accessibility

- The trail is a `<nav>` named "Breadcrumb" around an ordered list, so a screen reader announces
  it as navigation and a list of so many items. Give it another `label` in another language.
- The current page says so with `aria-current="page"`, and is not a link.
- The separators and the back chevron are drawn in CSS and never read; in right-to-left text they
  mirror.
- Every link and the more button keep a 40px touch target and show the focus ring.
- The more button needs a name (`label`, "More pages" by default). Its menu is a [menu](menu.md):
  the browser opens and closes it, closes it on Escape and returns focus to the button.

The markup contract is at the top of
[`packages/css/src/components/breadcrumbs.css`](../../packages/css/src/components/breadcrumbs.css).
