# App nav

The app's main navigation, down its start side: the app's logo at the top, then a link to each
part of the app (_Content_, _Media_, _Support_, _Settings_). From 1280px it is a 240px sidebar
with an icon, a label and an optional count on each item; from 768px a 56px rail of icons alone.
On a phone it is not shown: the [menu sheet](menu-sheet.md) holds the same items.

## When not to use it

- For a page's own sections: use a [section menu](section-menu.md).
- For actions, such as _New ticket_: use a [button](button.md) or a [menu](menu.md).
- On a phone: the app nav hides itself, and the page header's menu button opens the
  [menu sheet](menu-sheet.md) instead.

## Sidebar and rail

Name the nav with **`label`** (_Main_), so it reads apart from the page's other navigation. Give
each item the `href` of its page, an icon in its `icon` slot, and set **`current`** on the item of
the page being shown (or of the part of the app it belongs to), which prints
`aria-current="page"`. The current item takes the selection tint, a 2px accent edge on its start
side and a heavier label.

At 1280px and wider, the example below is the sidebar; from 768px to 1279px, the rail, where the
labels are hidden but still name each link. Below 768px it shows nothing: the app nav is not
shown on a phone.

```blade example
<x-plinth::app-nav label="Main" brand-name="Harbour" brand-href="#">
    <x-slot:mark><x-site.glyph name="harbour" /></x-slot:mark>
    <x-plinth::app-nav-item href="#" current>
        <x-slot:icon><x-plinth::icon><x-site.glyph name="lines" /></x-plinth::icon></x-slot:icon>
        Content
    </x-plinth::app-nav-item>
    <x-plinth::app-nav-item href="#">
        <x-slot:icon><x-plinth::icon><x-site.glyph name="image" /></x-plinth::icon></x-slot:icon>
        Media
    </x-plinth::app-nav-item>
    <x-plinth::app-nav-item href="#" count="12">
        <x-slot:icon><x-plinth::icon><x-site.glyph name="support" /></x-plinth::icon></x-slot:icon>
        Support
    </x-plinth::app-nav-item>
    <x-plinth::app-nav-item href="#">
        <x-slot:icon><x-plinth::icon><x-site.glyph name="sliders" /></x-plinth::icon></x-slot:icon>
        Settings
    </x-plinth::app-nav-item>
</x-plinth::app-nav>
```

Every item needs its icon: in the rail the icon is all there is to see. The icon is decorative,
since the label names the link.

## The brand

The app nav owns the app's logo: its **`mark`** slot and **`brand-name`**, at the top, linking to
the app's home when it has a **`brand-href`**. The rail shows the mark alone and keeps the name as
the link's accessible name. The brand is as tall as the page header, with a divider below, so it
lines up with the bar on its right.

With no name, the mark names the brand itself, so give it one: an `<img alt="…">`, or an SVG with
`role="img"` and an `aria-label`. With neither a name nor a mark, there is no brand.

## Counts

An item takes an optional **`count`**, such as how many tickets wait in _Support_. In the sidebar
it sits on the item's end edge, in the mono face; in the rail it is a small pill on the icon's top
corner. Keep it short (_99+_ rather than _1,204_): the rail's pill has 40px to fit in. A count of
0 still prints; leave it out for none.

## The footer

The **`footer`** slot sits on the bottom edge, with a divider above: items such as _Help_, or the
account. The items scroll on their own when they don't fit, and the footer stays put.

```blade example
<x-plinth::app-nav label="Main">
    <x-plinth::app-nav-item href="#" current>
        <x-slot:icon><x-plinth::icon><x-site.glyph name="inbox" /></x-plinth::icon></x-slot:icon>
        Inbox
    </x-plinth::app-nav-item>
    <x-plinth::app-nav-item href="#" count="3">
        <x-slot:icon><x-plinth::icon><x-site.glyph name="bell" /></x-plinth::icon></x-slot:icon>
        Alerts
    </x-plinth::app-nav-item>
    <x-slot:footer>
        <x-plinth::app-nav-item href="#">
            <x-slot:icon><x-plinth::icon><x-site.glyph name="help" /></x-plinth::icon></x-slot:icon>
            Help
        </x-plinth::app-nav-item>
    </x-slot:footer>
</x-plinth::app-nav>
```

## On a phone: one list, two navigations

Below 768px the app nav is not shown. The page header's menu button opens the
[menu sheet](menu-sheet.md), whose nav holds the same items as list rows. Keep the items in one
list and render both from it, so they cannot drift apart; the app sets `current` in both from the
same route. The menu button is the app's to hide from 768px, where the app nav is back.

```blade tab="Blade"
@php
    $nav = [
        ['label' => 'Content', 'href' => route('content'), 'icon' => 'file', 'current' => request()->routeIs('content*')],
        ['label' => 'Support', 'href' => route('support'), 'icon' => 'support', 'current' => request()->routeIs('support*'), 'count' => $openTickets],
    ];
@endphp

<x-plinth::app-nav label="Main" brand-name="Harbour" :brand-href="route('home')">
    <x-slot:mark><img src="/logo.svg" alt=""></x-slot:mark>
    @foreach ($nav as $item)
        <x-plinth::app-nav-item :href="$item['href']" :current="$item['current']" :count="$item['count'] ?? null">
            <x-slot:icon><x-plinth::icon><x-app.icon :name="$item['icon']" /></x-plinth::icon></x-slot:icon>
            {{ $item['label'] }}
        </x-plinth::app-nav-item>
    @endforeach
</x-plinth::app-nav>

<x-plinth::menu-sheet id="menu" title="Menu">
    <x-plinth::list-card>
        @foreach ($nav as $item)
            <li>
                <x-plinth::list-row :href="$item['href']" :current="$item['current']">
                    <x-slot:leading><x-plinth::icon><x-app.icon :name="$item['icon']" /></x-plinth::icon></x-slot:leading>
                    {{ $item['label'] }}
                </x-plinth::list-row>
            </li>
        @endforeach
    </x-plinth::list-card>
</x-plinth::menu-sheet>
```

```vue tab="Vue"
<PlinthAppNav label="Main" brand-name="Harbour" brand-href="/">
  <template #mark><img src="/logo.svg" alt="" /></template>
  <PlinthAppNavItem
    v-for="item in nav"
    :key="item.href"
    :href="item.href"
    :current="route.path.startsWith(item.href)"
    :count="item.count"
  >
    <template #icon><PlinthIcon><component :is="item.icon" /></PlinthIcon></template>
    {{ item.label }}
  </PlinthAppNavItem>
</PlinthAppNav>

<PlinthMenuSheet id="menu" title="Menu">
  <PlinthListCard>
    <li v-for="item in nav" :key="item.href">
      <PlinthListRow :href="item.href" :current="route.path.startsWith(item.href)">
        <template #leading><PlinthIcon><component :is="item.icon" /></PlinthIcon></template>
        {{ item.label }}
      </PlinthListRow>
    </li>
  </PlinthListCard>
</PlinthMenuSheet>
```

```tsx tab="React"
import {
    PlinthAppNav,
    PlinthAppNavItem,
    PlinthIcon,
    PlinthListCard,
    PlinthListRow,
    PlinthMenuSheet,
} from '@ptbdynamic/plinth/react';

<>
    <PlinthAppNav
        label="Main"
        brandName="Harbour"
        brandHref="/"
        mark={<img src="/logo.svg" alt="" />}
    >
        {nav.map((item) => (
            <PlinthAppNavItem
                key={item.href}
                href={item.href}
                current={pathname.startsWith(item.href)}
                count={item.count}
                icon={<PlinthIcon>{item.icon}</PlinthIcon>}
            >
                {item.label}
            </PlinthAppNavItem>
        ))}
    </PlinthAppNav>
    <PlinthMenuSheet id="menu" title="Menu">
        <PlinthListCard>
            {nav.map((item) => (
                <li key={item.href}>
                    <PlinthListRow
                        href={item.href}
                        current={pathname.startsWith(item.href)}
                        leading={<PlinthIcon>{item.icon}</PlinthIcon>}
                    >
                        {item.label}
                    </PlinthListRow>
                </li>
            ))}
        </PlinthListCard>
    </PlinthMenuSheet>
</>;
```

## Height and placement

The app nav fills its parent's height: in the app shell, the screen's. Its items scroll on their
own and the footer keeps to the bottom, so the parent must have a height (a grid or flex row as
tall as the screen); the app nav doesn't set one. It goes on the start side, its divider on its
end edge, and moves to the right in right-to-left text.

It is `--plinth-app-nav-width` (240px) wide as a sidebar and `--plinth-app-nav-rail-width` (56px)
as a rail. Its items are 40px tall and, in the rail, 40px wide: never less than the touch target.

## Markup contract

| Part                    | Element         | Holds                                                                  |
| ----------------------- | --------------- | ---------------------------------------------------------------------- |
| `plinth-app-nav`        | `<nav>`         | the root, named by `aria-label`                                        |
| `plinth-app-nav-brand`  | `<a>` / `<div>` | the mark and the name; a link with `brand-href`                        |
| `plinth-app-nav-mark`   | `<span>`        | the logo mark; `aria-hidden="true"` beside a name                      |
| `plinth-app-nav-name`   | `<span>`        | the app's name; visually hidden in the rail                            |
| `plinth-app-nav-items`  | `<div>`         | the items; scrolls when they don't fit                                 |
| `plinth-app-nav-item`   | `<a>`           | an item, its own component                                             |
| `plinth-app-nav-icon`   | `<span>`        | the item's icon, `aria-hidden="true"`                                  |
| `plinth-app-nav-label`  | `<span>`        | the item's label, its accessible name; visually hidden in the rail     |
| `plinth-app-nav-count`  | `<span>`        | the optional count: on the end edge, or a pill on the icon in the rail |
| `plinth-app-nav-footer` | `<div>`         | optional, on the bottom edge                                           |

| Attribute or state    | On         | Values                                                   | Default  |
| --------------------- | ---------- | -------------------------------------------------------- | -------- |
| `aria-label`          | the root   | the nav's name                                           | none     |
| `aria-current="page"` | an item    | the item of the page being shown, set by the app         | none     |
| `aria-hidden="true"`  | mark, icon | decorative: the name and the label name the links        | set      |
| width                 | the root   | hidden below 768px, rail from 768px, sidebar from 1280px | by width |

## Props

The nav and each item are their own components, so the app's attributes and listeners
(`wire:navigate`, `x-on:click`, `@click`, `onClick`) land on the item's link. The same names in
every layer; React takes the Vue props, with slots as `children` and node props.

| Component | Prop       | Blade                            | Vue                          | React                 | Default |
| --------- | ---------- | -------------------------------- | ---------------------------- | --------------------- | ------- |
| nav       | label      | `label="Main"`                   | `label="Main"`               | `label="Main"`        | none    |
| nav       | brand name | `brand-name="Harbour"`           | `brand-name="Harbour"`       | `brandName="Harbour"` | none    |
| nav       | brand href | `brand-href="/"`                 | `brand-href="/"`             | `brandHref="/"`       | none    |
| nav       | mark       | `<x-slot:mark>`                  | `#mark` slot                 | `mark={…}`            | none    |
| nav       | items      | the slot                         | the default slot             | `children`            | none    |
| nav       | footer     | `<x-slot:footer>`                | `#footer` slot               | `footer={…}`          | none    |
| item      | href       | `href="/content"`                | `href="/content"`            | `href="/content"`     | none    |
| item      | current    | `current` or `:current="$on"`    | `current` or `:current="on"` | `current={on}`        | off     |
| item      | count      | `count="12"` or `:count="$open"` | `:count="12"`                | `count={12}`          | none    |
| item      | icon       | `<x-slot:icon>`                  | `#icon` slot                 | `icon={…}`            | none    |
| item      | label      | the slot                         | the default slot             | `children`            | none    |

```blade tab="Blade"
<x-plinth::app-nav label="Main" brand-name="Harbour" :brand-href="route('home')">
    <x-slot:mark><img src="/logo.svg" alt=""></x-slot:mark>
    <x-plinth::app-nav-item :href="route('content')" :current="request()->routeIs('content*')" wire:navigate>
        <x-slot:icon><x-plinth::icon><x-app.icon name="file" /></x-plinth::icon></x-slot:icon>
        Content
    </x-plinth::app-nav-item>
</x-plinth::app-nav>
```

```vue tab="Vue"
<PlinthAppNav label="Main" brand-name="Harbour" brand-href="/">
  <template #mark><img src="/logo.svg" alt="" /></template>
  <PlinthAppNavItem href="/content" :current="route.path.startsWith('/content')">
    <template #icon><PlinthIcon><FileIcon /></PlinthIcon></template>
    Content
  </PlinthAppNavItem>
</PlinthAppNav>
```

```tsx tab="React"
import { PlinthAppNav, PlinthAppNavItem, PlinthIcon } from '@ptbdynamic/plinth/react';

<PlinthAppNav label="Main" brandName="Harbour" brandHref="/" mark={<img src="/logo.svg" alt="" />}>
    <PlinthAppNavItem
        href="/content"
        current={pathname.startsWith('/content')}
        icon={
            <PlinthIcon>
                <FileIcon />
            </PlinthIcon>
        }
    >
        Content
    </PlinthAppNavItem>
</PlinthAppNav>;
```

## Accessibility

- The app nav is a named `<nav>` landmark, and the current item says so (`aria-current="page"`).
- In the rail the labels and the app's name are visually hidden, not removed: each link keeps its
  accessible name, and a count is read after the label (_Support 12_).
- The current item has a 2px accent edge and a heavier label as well as its tint, so colour is not
  its only cue; in forced colours it takes the system highlight.
- Every item keeps a 40px touch target, and shows the focus ring on `:focus-visible`; the brand
  link's ring sits inside its row.
- On a phone the same links are in the menu sheet, a modal dialog with its own focus trap and
  close button.

The markup contract is at the top of
[`packages/css/src/components/app-nav.css`](../../packages/css/src/components/app-nav.css).
