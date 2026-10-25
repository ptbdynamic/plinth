# Toolbar

The row of actions under a [page header](page-header.md), as in a mail app: a search field with
its scope (_In: Open_), what the actions act on (_2 selected_, _#1042_), the actions in groups,
then a ⋯ [menu](menu.md) for the rest. It shows from 768px, in the [app shell](app-shell.md) above
a [split view](split-view.md); on a phone it is not shown, and the actions go in the page header.

## When not to use it

- For the bar at the top of a page, with its heading: use the [page header](page-header.md).
- For a list's own actions (select, filter, sort): use the [list header](list-header.md).
- For two or three actions on a phone: the page header's actions, with the rest in a menu.

## Search, target and actions

The **`search`** slot holds `<x-plinth::toolbar-search>`: a search field named by its
**`label`**, with the scope button, `<x-plinth::toolbar-scope>`, in its **`scope`** slot. The
scope's **`label`** says where the search looks, and it opens the app's own [menu](menu.md) of
scopes with `popovertarget`. The **`target`** says what the actions act on, in the app's words.
The actions go in the default slot: `<x-plinth::toolbar-group>`s of
`<x-plinth::toolbar-action>`s, each with its **`label`** and an icon (a built-in glyph by
**`icon`**, or the project's SVG in the slot), then the ⋯ icon button and its menu. A hairline
divider sits between two groups.

In a toolbar with 1024px of room or more, each action shows its icon and its label; in a
narrower one, its icon alone, and the label stays its name for a screen reader. The toolbar
follows its own width, not the screen's, so over one pane of a wide screen it gives way as on a
narrow one. It fills the width its parent gives it.

The target stays readable: the search narrows first, then the actions drop their labels and what
overflows moves into the ⋯ menu, and the target is cut short only when the search has nothing
left to give.

```blade example layout="stack"
<x-plinth::toolbar label="Ticket actions" target="2 selected">
    <x-slot:search>
        <x-plinth::toolbar-search label="Search tickets" placeholder="Search" name="q">
            <x-slot:scope>
                <x-plinth::toolbar-scope label="In: Open" popovertarget="docs-scope" />
                <x-plinth::menu id="docs-scope">
                    <x-plinth::menu-item>In: Open</x-plinth::menu-item>
                    <x-plinth::menu-item>In: Pending</x-plinth::menu-item>
                    <x-plinth::menu-item>All folders</x-plinth::menu-item>
                </x-plinth::menu>
            </x-slot:scope>
        </x-plinth::toolbar-search>
    </x-slot:search>
    <x-plinth::toolbar-group>
        <x-plinth::toolbar-action label="Assign"><x-site.glyph name="user" /></x-plinth::toolbar-action>
        <x-plinth::toolbar-action label="Solve"><x-site.glyph name="check" /></x-plinth::toolbar-action>
        <x-plinth::toolbar-action label="Snooze"><x-site.glyph name="clock" /></x-plinth::toolbar-action>
    </x-plinth::toolbar-group>
    <x-plinth::toolbar-group>
        <x-plinth::toolbar-action label="Delete"><x-site.glyph name="trash" /></x-plinth::toolbar-action>
    </x-plinth::toolbar-group>
    <x-plinth::icon-button label="More actions" icon="more" popovertarget="docs-more" />
    <x-plinth::menu id="docs-more">
        <x-plinth::menu-item>Merge into…</x-plinth::menu-item>
        <x-plinth::menu-item href="#print">Print</x-plinth::menu-item>
    </x-plinth::menu>
</x-plinth::toolbar>
```

## Overflow

Plinth doesn't measure the actions: the app picks what gives way. Mark an action **`overflow`**
and it is hidden in a toolbar narrower than 1024px; put the same action in the ⋯ menu with
`data-overflow` on its item (and on a separator next to them), and inside a toolbar the menu shows
those only below 1024px. A group whose actions all overflow is hidden with them, and so is its
divider. From 1024px the ⋯ button is hidden when every entry of the menu right after it
overflows, so it never opens an empty menu.

```blade example layout="stack"
<x-plinth::toolbar label="Ticket actions" target="#1042">
    <x-plinth::toolbar-group>
        <x-plinth::toolbar-action label="Assign"><x-site.glyph name="user" /></x-plinth::toolbar-action>
        <x-plinth::toolbar-action label="Solve"><x-site.glyph name="check" /></x-plinth::toolbar-action>
    </x-plinth::toolbar-group>
    <x-plinth::toolbar-group>
        <x-plinth::toolbar-action label="Spam" overflow><x-site.glyph name="spam" /></x-plinth::toolbar-action>
        <x-plinth::toolbar-action label="Delete" overflow><x-site.glyph name="trash" /></x-plinth::toolbar-action>
    </x-plinth::toolbar-group>
    <x-plinth::icon-button label="More actions" icon="more" popovertarget="docs-overflow" />
    <x-plinth::menu id="docs-overflow">
        <x-plinth::menu-item data-overflow>Spam</x-plinth::menu-item>
        <x-plinth::menu-item data-overflow>Delete</x-plinth::menu-item>
        <x-plinth::menu-separator data-overflow />
        <x-plinth::menu-item>Merge into…</x-plinth::menu-item>
    </x-plinth::menu>
</x-plinth::toolbar>
```

## Disabled

An action takes **`disabled`**, as when nothing is selected yet. The arrow keys skip it.

```blade example layout="stack"
<x-plinth::toolbar label="Ticket actions" target="0 selected">
    <x-plinth::toolbar-group>
        <x-plinth::toolbar-action label="Assign" disabled><x-site.glyph name="user" /></x-plinth::toolbar-action>
        <x-plinth::toolbar-action label="Solve" disabled><x-site.glyph name="check" /></x-plinth::toolbar-action>
    </x-plinth::toolbar-group>
</x-plinth::toolbar>
```

## Keyboard

The actions are a `role="toolbar"`: one tab stop, and the arrow keys move between its buttons
and links (Left and Right, the other way round in right-to-left text, Home and End), wrapping at
the ends. That is the only script the toolbar has, and it comes with the layer: an Alpine
`x-init` in Blade (Alpine comes with Livewire and Filament), an effect in Vue and React. It keeps
the last control focused as the tab stop, and skips disabled controls, the ones hidden at this
width, and the items of the menus inside. Without it (plain HTML, or Blade without Alpine) Tab
goes through every action. The search sits outside the toolbar, so its field keeps its arrow
keys.

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                          | Element                          | Holds                                                     |
| ----------------------------- | -------------------------------- | --------------------------------------------------------- |
| `plinth-toolbar`              | `<div>`                          | the root                                                  |
| `plinth-toolbar-search`       | `<search>`                       | the search icon, the field and the scope                  |
| `plinth-toolbar-search-input` | `<input type="search">`          | the field, named by `aria-label`                          |
| `plinth-toolbar-scope`        | `<button>`                       | the scope's label and a chevron                           |
| `plinth-toolbar-scope-label`  | `<span>`                         | where the search looks                                    |
| `plinth-toolbar-target`       | `<p>`                            | the optional target                                       |
| `plinth-toolbar-actions`      | `<div role="toolbar">`           | the groups, the ⋯ button and its menu; named by the label |
| `plinth-toolbar-group`        | `<div role="group">`             | a group's actions, named by an optional `aria-label`      |
| `plinth-toolbar-action`       | `<button class="plinth-button">` | a ghost button, md: the icon and `plinth-button-label`    |

| Attribute or state | On                     | Values                                              | Default   |
| ------------------ | ---------------------- | --------------------------------------------------- | --------- |
| `aria-label`       | the toolbar            | the label                                           | `Actions` |
| `aria-label`       | the field              | the search's label                                  | `Search`  |
| `data-overflow`    | an action              | hidden in a toolbar narrower than 1024px            | none      |
| `data-overflow`    | a ⋯ menu's item        | shown only in a toolbar narrower than 1024px        | none      |
| `disabled`         | an action              | can't be used, and skipped by the arrow keys        | none      |
| `tabindex`         | the toolbar's controls | set by the layer's script: 0 on one, -1 on the rest | none      |

Its height is `--plinth-toolbar-height` (44px, a list header's), with a hairline divider under
it; the search is `--plinth-toolbar-search-width` (320px) at most and narrows with the toolbar.
It needs `button.css`, `icon.css` and `menu.css` for its parts.

## Props

The same names in every layer. React takes the Vue props, with slots as props that take a node.

| Component      | Prop     | Blade                         | Vue                | React                | Default   |
| -------------- | -------- | ----------------------------- | ------------------ | -------------------- | --------- |
| toolbar        | label    | `label="Ticket actions"`      | `label="…"`        | `label="…"`          | `Actions` |
| toolbar        | target   | `:target="$target"`           | `:target="target"` | `target={target}`    | none      |
| toolbar        | search   | `<x-slot:search>`             | `#search` slot     | `search` (a node)    | none      |
| toolbar        | actions  | the slot                      | the default slot   | `children`           | none      |
| toolbar-search | label    | `label="Search tickets"`      | `label="…"`        | `label="…"`          | `Search`  |
| toolbar-search | scope    | `<x-slot:scope>`              | `#scope` slot      | `scope` (a node)     | none      |
| toolbar-scope  | label    | `label="In: Open"` (required) | `label="…"`        | `label="…"`          | none      |
| toolbar-group  | label    | `label="Remove"`              | `label="…"`        | `label="…"`          | none      |
| toolbar-action | label    | `label="Assign"` (required)   | `label="…"`        | `label="…"`          | none      |
| toolbar-action | icon     | `icon="check"` or the slot    | `icon` or the slot | `icon` or `children` | none      |
| toolbar-action | overflow | `overflow`                    | `overflow`         | `overflow`           | `false`   |
| toolbar-action | disabled | `disabled`                    | `disabled`         | `disabled`           | `false`   |

Extra attributes go to each component's root, and the project's win a clash (`class` is added),
except on the search: its class goes on the root and every other attribute (`name`, `value`,
`placeholder`, `wire:model`, `@input`, `onChange`, `ref`) on the `<input>`. None of them emits an
event: the actions are buttons with the app's own listeners.

```blade tab="Blade"
<x-plinth::toolbar label="Ticket actions" :target="count($selected).' selected'">
    <x-slot:search>
        <x-plinth::toolbar-search label="Search tickets" placeholder="Search" wire:model.live="search">
            <x-slot:scope>
                <x-plinth::toolbar-scope :label="$scopeLabel" popovertarget="search-scope" />
                <x-plinth::menu id="search-scope">…</x-plinth::menu>
            </x-slot:scope>
        </x-plinth::toolbar-search>
    </x-slot:search>
    <x-plinth::toolbar-group>
        <x-plinth::toolbar-action label="Solve" icon="check" wire:click="solve" />
    </x-plinth::toolbar-group>
    <x-plinth::toolbar-group>
        <x-plinth::toolbar-action label="Delete" overflow wire:click="delete">…</x-plinth::toolbar-action>
    </x-plinth::toolbar-group>
    <x-plinth::icon-button label="More actions" icon="more" popovertarget="ticket-more" />
    <x-plinth::menu id="ticket-more">
        <x-plinth::menu-item data-overflow wire:click="delete">Delete</x-plinth::menu-item>
    </x-plinth::menu>
</x-plinth::toolbar>
```

```vue tab="Vue"
<PlinthToolbar label="Ticket actions" :target="`${selected.size} selected`">
  <template #search>
    <PlinthToolbarSearch
      label="Search tickets"
      placeholder="Search"
      :value="search"
      @input="search = $event.target.value"
    >
      <template #scope>
        <PlinthToolbarScope :label="scopeLabel" popovertarget="search-scope" />
        <PlinthMenu id="search-scope">…</PlinthMenu>
      </template>
    </PlinthToolbarSearch>
  </template>
  <PlinthToolbarGroup>
    <PlinthToolbarAction label="Solve" icon="check" @click="solve" />
  </PlinthToolbarGroup>
  <PlinthToolbarGroup>
    <PlinthToolbarAction label="Delete" overflow @click="remove">…</PlinthToolbarAction>
  </PlinthToolbarGroup>
  <PlinthIconButton label="More actions" icon="more" popovertarget="ticket-more" />
  <PlinthMenu id="ticket-more">
    <PlinthMenuItem data-overflow @click="remove">Delete</PlinthMenuItem>
  </PlinthMenu>
</PlinthToolbar>
```

```tsx tab="React"
import {
    PlinthIconButton,
    PlinthMenu,
    PlinthMenuItem,
    PlinthToolbar,
    PlinthToolbarAction,
    PlinthToolbarGroup,
    PlinthToolbarScope,
    PlinthToolbarSearch,
} from '@ptbdynamic/plinth/react';

<PlinthToolbar
    label="Ticket actions"
    target={`${selected.size} selected`}
    search={
        <PlinthToolbarSearch
            label="Search tickets"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            scope={<PlinthToolbarScope label={scopeLabel} popoverTarget="search-scope" />}
        />
    }
>
    <PlinthToolbarGroup>
        <PlinthToolbarAction label="Solve" icon="check" onClick={solve} />
    </PlinthToolbarGroup>
    <PlinthToolbarGroup>
        <PlinthToolbarAction label="Delete" overflow onClick={remove}>
            …
        </PlinthToolbarAction>
    </PlinthToolbarGroup>
    <PlinthIconButton label="More actions" icon="more" popoverTarget="ticket-more" />
    <PlinthMenu id="ticket-more">
        <PlinthMenuItem data-overflow onClick={remove}>
            Delete
        </PlinthMenuItem>
    </PlinthMenu>
</PlinthToolbar>;
```

## Accessibility

- The actions are a `role="toolbar"` named by its `label`; name it for what it acts on (_Ticket
  actions_). A group takes a `label` when it has a name of its own.
- One tab stop, and the arrow keys, Home and End move between the actions (see Keyboard).
- Every action has a visible label in a toolbar 1024px wide or more, and below keeps it as its
  name; the icon is decorative.
- The search field has no visible label, so its `label` is its name; the search icon is
  decorative. The scope button's text is its name, and says where the search looks.
- The target is plain text, not a live region: the list that changes the selection announces it
  ([list header](list-header.md)).
- Every control shows the focus ring on `:focus-visible` (drawn inside on the joined field and
  scope), keeps a 40px touch target on a touch screen, and nothing depends on hover.
