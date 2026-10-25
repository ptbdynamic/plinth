# Menu

A short list of actions that opens from a button: _Assign to me_, _Duplicate_, _Archive_,
_Delete_. It sits next to its button in a popover, on the native `popover` attribute, so the
browser opens and closes it with no script: a click outside or Escape closes it, and focus goes
back to the button. It is the ⋯ overflow of a page header or a toolbar.

## When not to use it

- For the app's main navigation: use the [menu sheet](menu-sheet.md).
- For switching between a page's sections: use the [section menu](section-menu.md).
- For a long list, or a list a person searches or picks several from: use a [sheet](sheet.md) or a
  [dialog](dialog.md).
- For one or two actions: show them as [buttons](button.md).

## Opening it

Give the menu an **`id`** and its button `popovertarget` with the same id. The button is your own,
usually an [icon button](icon-button.md) with a name (_More actions_), or a text button. A button
item closes the menu when it is pressed: it prints `commandfor` with the menu's id and
`command="hide-popover"`, which every layer works out from the menu around the item.

```blade example layout="stack"
<x-plinth::icon-button label="More actions" variant="ghost" popovertarget="ticket-actions"><x-site.glyph name="more" /></x-plinth::icon-button>
<x-plinth::menu id="ticket-actions">
    <x-plinth::menu-item shortcut="A">
        <x-slot:icon><x-site.glyph name="user" /></x-slot:icon>
        Assign to me
    </x-plinth::menu-item>
    <x-plinth::menu-item shortcut="⌘D">
        <x-slot:icon><x-site.glyph name="copy" /></x-slot:icon>
        Duplicate
    </x-plinth::menu-item>
    <x-plinth::menu-item shortcut="E">
        <x-slot:icon><x-site.glyph name="archive" /></x-slot:icon>
        Archive
    </x-plinth::menu-item>
    <x-plinth::menu-separator />
    <x-plinth::menu-item tone="danger">
        <x-slot:icon><x-site.glyph name="trash" /></x-slot:icon>
        Delete
    </x-plinth::menu-item>
</x-plinth::menu>
```

It opens below the button, from its start edge, through CSS anchor positioning: the button that
opens a popover is its anchor. It takes the side of the button with more room, above or below, and
is never taller than that room, so a long menu scrolls; when it would leave the screen sideways it
lines up with the button's end edge instead. It looks the same at every width: a phone gets no
bottom sheet, since a menu is a few actions next to the button that opened them. A browser without
anchor positioning shows it in the middle of the screen, where it still works.

A text button opens it the same way, or with `commandfor` and `command="toggle-popover"`. To open
it from script, call `showPopover({ source: button })`, so it knows its anchor.

## Items

An item is a button, or with **`href`** a link. It takes an optional **`icon`** (your SVG, in the
`icon` slot; decorative) and an optional **`shortcut`**, a hint at its end in the mono face. The
hint is for the eye: it is hidden from assistive technology, so where the app has the shortcut,
add `aria-keyshortcuts` to the item (`aria-keyshortcuts="Control+D"`).

A link closes the menu by leaving the page. An app that routes without loading a page (Livewire's
`wire:navigate`, a Vue or React router) closes it with `hidePopover()`.

```blade example layout="stack"
<x-plinth::button variant="secondary" popovertarget="ticket-links">Open</x-plinth::button>
<x-plinth::menu id="ticket-links">
    <x-plinth::menu-item href="#">Open in a new tab</x-plinth::menu-item>
    <x-plinth::menu-item href="#" shortcut="⌘P">Print</x-plinth::menu-item>
    <x-plinth::menu-separator />
    <x-plinth::menu-item>Copy link</x-plinth::menu-item>
</x-plinth::menu>
```

## Danger

**`tone="danger"`** marks an item that deletes or removes something, in the danger colour with a
danger tint on hover. Its label still says what it does, so the colour is not the only signal; put
it last, after a separator, and confirm it with a [confirmation dialog](confirm-dialog.md) when it
can't be undone.

## Groups and separators

A **separator** is an `<hr>` between items. A **group** puts items under a heading (_Move to_); it
is a `role="group"` named by that heading, and the heading itself is hidden from assistive
technology, which reads the group's name instead.

```blade example layout="stack"
<x-plinth::icon-button label="Move" variant="ghost" popovertarget="ticket-move"><x-site.glyph name="more" /></x-plinth::icon-button>
<x-plinth::menu id="ticket-move">
    <x-plinth::menu-group label="Move to">
        <x-plinth::menu-item>Inbox</x-plinth::menu-item>
        <x-plinth::menu-item>Waiting</x-plinth::menu-item>
        <x-plinth::menu-item>Done</x-plinth::menu-item>
    </x-plinth::menu-group>
    <x-plinth::menu-separator />
    <x-plinth::menu-group label="Priority">
        <x-plinth::menu-item>High</x-plinth::menu-item>
        <x-plinth::menu-item>Low</x-plinth::menu-item>
    </x-plinth::menu-group>
</x-plinth::menu>
```

## Disabled

A disabled button gets `disabled`; a disabled link loses its `href` and reads as a disabled link
(`role="link"`, `aria-disabled="true"`).

```blade example layout="stack"
<x-plinth::button variant="secondary" popovertarget="ticket-disabled">Actions</x-plinth::button>
<x-plinth::menu id="ticket-disabled">
    <x-plinth::menu-item>Assign to me</x-plinth::menu-item>
    <x-plinth::menu-item disabled>Merge</x-plinth::menu-item>
    <x-plinth::menu-item href="#" disabled>Print</x-plinth::menu-item>
</x-plinth::menu>
```

## Why it is not an ARIA menu

The menu is a list of buttons and links that a person reaches with Tab, not `role="menu"` with
`menuitem`s. The ARIA menu pattern promises arrow keys, a roving focus and type-ahead, which would
be script in every layer; a `role="menu"` without them is worse than none. So the button has no
`aria-haspopup`, the items read as the buttons and links they are, and the browser gives the rest
(docs/adr/0002). The browser tells assistive technology whether the button's menu is expanded,
as it does for any `popovertarget` button.

## Markup contract

| Part      | Element and class                                                | Notes                                                     |
| --------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| menu      | `<div class="plinth-menu" id popover="auto">`                    | the root; its id is required                              |
| item      | `<button type="button" class="plinth-menu-item">`, or `<a href>` | a button prints `commandfor` and `command="hide-popover"` |
| icon      | `<span class="plinth-menu-icon" aria-hidden="true">`             | optional; your SVG                                        |
| label     | `<span class="plinth-menu-label">`                               | the item's name                                           |
| shortcut  | `<kbd class="plinth-menu-shortcut" aria-hidden="true">`          | optional                                                  |
| separator | `<hr class="plinth-menu-separator">`                             |                                                           |
| group     | `<div class="plinth-menu-group" role="group" aria-label>`        | named by its label                                        |
| heading   | `<div class="plinth-menu-heading" aria-hidden="true">`           | the group's label, shown                                  |

| Attribute or state | On   | Values                                         | Default |
| ------------------ | ---- | ---------------------------------------------- | ------- |
| `data-tone`        | item | `danger`; none for neutral                     | neutral |
| `disabled`         | item | on a button                                    | off     |
| `aria-disabled`    | item | `true` on a link without `href`, `role="link"` | none    |
| open               | menu | the native `:popover-open`, never a class      | closed  |

The menu is `--plinth-menu-min-width` (192px) to `--plinth-menu-max-width` (320px) wide, and never
wider than the screen less a margin; a longer label wraps. Items are 40px tall on a touch screen
and 32px with a mouse from 768px up.

## Props

Each part is its own component, so the app's attributes and listeners (`wire:click`,
`x-on:click`, `@click`, `onClick`, `aria-keyshortcuts`) land on the item. The menu's own
attributes and listeners (`x-on:toggle`, `@toggle`, `onToggle`, for the popover's `toggle` event)
land on the menu. React takes the Vue props, with the label as `children` and the icon as a node.

| Component | Prop     | Blade             | Vue               | React             | Default  |
| --------- | -------- | ----------------- | ----------------- | ----------------- | -------- |
| menu      | id       | `id="actions"`    | `id="actions"`    | `id="actions"`    | required |
| item      | href     | `href="/print"`   | `href="/print"`   | `href="/print"`   | none     |
| item      | tone     | `tone="danger"`   | `tone="danger"`   | `tone="danger"`   | neutral  |
| item      | shortcut | `shortcut="⌘D"`   | `shortcut="⌘D"`   | `shortcut="⌘D"`   | none     |
| item      | disabled | `disabled`        | `disabled`        | `disabled`        | off      |
| item      | menu     | `menu="actions"`  | `menu="actions"`  | `menu="actions"`  | its menu |
| item      | icon     | `<x-slot:icon>`   | the `icon` slot   | `icon={<svg />}`  | none     |
| item      | label    | the slot          | the default slot  | `children`        | none     |
| group     | label    | `label="Move to"` | `label="Move to"` | `label="Move to"` | none     |

An item's `menu` names the menu a button item closes; it is only needed for an item rendered
outside its menu's component. In Blade an item takes `MenuItemTone::Danger` as well as its value.
Vue's menu exposes `showPopover()` and `hidePopover()`; React's takes a `ref` to the `<div>`.

```blade tab="Blade"
<x-plinth::icon-button label="More actions" variant="ghost" popovertarget="ticket-actions">…</x-plinth::icon-button>
<x-plinth::menu id="ticket-actions">
    <x-plinth::menu-item wire:click="assign">Assign to me</x-plinth::menu-item>
    <x-plinth::menu-separator />
    <x-plinth::menu-item tone="danger" wire:click="delete">Delete</x-plinth::menu-item>
</x-plinth::menu>
```

```vue tab="Vue"
<PlinthIconButton
    label="More actions"
    variant="ghost"
    popovertarget="ticket-actions"
>…</PlinthIconButton>
<PlinthMenu id="ticket-actions">
  <PlinthMenuItem @click="assign">Assign to me</PlinthMenuItem>
  <PlinthMenuSeparator />
  <PlinthMenuItem tone="danger" @click="remove">Delete</PlinthMenuItem>
</PlinthMenu>
```

```tsx tab="React"
import {
    PlinthIconButton,
    PlinthMenu,
    PlinthMenuItem,
    PlinthMenuSeparator,
} from '@ptbdynamic/plinth/react';

<>
    <PlinthIconButton label="More actions" variant="ghost" popoverTarget="ticket-actions">
        …
    </PlinthIconButton>
    <PlinthMenu id="ticket-actions">
        <PlinthMenuItem onClick={assign}>Assign to me</PlinthMenuItem>
        <PlinthMenuSeparator />
        <PlinthMenuItem tone="danger" onClick={remove}>
            Delete
        </PlinthMenuItem>
    </PlinthMenu>
</>;
```

## Accessibility

- The browser opens and closes the menu: Escape and a click outside close it, focus returns to the
  button, and the browser says whether the button's menu is expanded.
- Items are buttons and links, reached with Tab, each named by its label; an icon-only button that
  opens the menu needs its own name.
- The shortcut hint is hidden from assistive technology; `aria-keyshortcuts` on the item says it.
- A danger item says what it does in words; its colour is not the only signal.
- Every item is at least 40px tall on a touch screen, and shows the focus ring inside its edge.
- The menu fades in and out on the motion tokens, which drop to nothing under reduced motion.

The markup contract is at the top of
[`packages/css/src/components/menu.css`](../../packages/css/src/components/menu.css).
