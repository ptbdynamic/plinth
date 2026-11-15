# List row

One row of a list or a sheet: a setting, a person, a section of the app. It has a title, an
optional description under it, a leading slot for an icon or an avatar, and a trailing slot for a
value, a badge or a control. It is 44px tall at least, and grows with a description.

## When not to use it

- For records with several fields to compare side by side, use the [data table](data-table.md).
- For the main action of a screen, use a [button](button.md): a row is one item among many.
- For a row of filters or segments, use the [pill row](pill-row.md).

## Static, link or button

The row's root is the element the app talks to, so `href`, `wire:click` and `x-on:click` land on
it (ADR 2):

- a row that only shows something is a `<div>`;
- a row that navigates gets an **`href`** and becomes an `<a>`;
- a row that acts (sign out, open a sheet) gets **`button`** and becomes a `<button type="button">`.

Set **`chevron`** on a row that opens another page or a sheet: the icon's `chevron-right` glyph. It
points the other way in right-to-left text.

```blade example layout="stack"
<x-plinth::list-card>
    <li><x-plinth::list-row description="Monthly, by email">Invoice summary</x-plinth::list-row></li>
    <li><x-plinth::list-row href="#" chevron>Notifications</x-plinth::list-row></li>
    <li><x-plinth::list-row button>Sign out</x-plinth::list-row></li>
</x-plinth::list-card>
```

## Leading and trailing

The leading slot takes an icon or an avatar. When the avatar shows the person in the title, make
it **decorative**, so screen readers don't read the name twice. The trailing slot takes a value
(_English_), a badge or, in a static row, a control.

```blade example layout="stack"
<x-plinth::list-card>
    <li>
        <x-plinth::list-row description="ana@example.com">
            <x-slot:leading><x-plinth::avatar name="Ana Lima" size="sm" decorative /></x-slot:leading>
            Ana Lima
            <x-slot:trailing><x-plinth::badge tone="success" dot>Online</x-plinth::badge></x-slot:trailing>
        </x-plinth::list-row>
    </li>
    <li>
        <x-plinth::list-row href="#" chevron>
            <x-slot:leading><x-plinth::icon><x-site.glyph name="window" /></x-plinth::icon></x-slot:leading>
            Language
            <x-slot:trailing>English</x-slot:trailing>
        </x-plinth::list-row>
    </li>
    <li>
        <x-plinth::list-row>
            Invoices
            <x-slot:trailing><x-plinth::badge tone="warning">3 due</x-plinth::badge></x-slot:trailing>
        </x-plinth::list-row>
    </li>
</x-plinth::list-card>
```

A link or a button can't hold another control, so a row with an icon button in its trailing slot
is a static row. Give that control its own accessible name, one that says which row it belongs to
(_More actions for Rui Costa_). A switch goes in a [setting row](#setting).

```blade example layout="stack"
<x-plinth::list-card>
    <li>
        <x-plinth::list-row description="Owner">
            <x-slot:leading><x-plinth::avatar name="Rui Costa" size="sm" decorative /></x-slot:leading>
            Rui Costa
            <x-slot:trailing>
                <x-plinth::icon-button label="More actions for Rui Costa"><x-site.glyph name="more" /></x-plinth::icon-button>
            </x-slot:trailing>
        </x-plinth::list-row>
    </li>
</x-plinth::list-card>
```

## States

- **Current:** set `current` on the link row for the page being shown (it prints
  `aria-current="page"`); the app decides which one it is. It takes the selection tint and a
  heavier title. A button row doesn't print it, since a button is not a page.
- **Disabled:** a disabled button row gets `disabled`; a disabled link row loses its `href` and
  reads as a disabled link (`role="link"`, `aria-disabled="true"`).

```blade example layout="stack"
<x-plinth::list-card>
    <li><x-plinth::list-row href="#" current>Overview</x-plinth::list-row></li>
    <li><x-plinth::list-row button disabled>Export</x-plinth::list-row></li>
    <li><x-plinth::list-row href="#" chevron disabled>Billing</x-plinth::list-row></li>
</x-plinth::list-card>
```

## Selectable

While the app is selecting rows (after the [list header](list-header.md)'s Select, say), set
**`selectable`** on each row. The row becomes a `<label>` with a checkbox in its leading slot, in
place of the icon or the avatar, and the row's text names the checkbox, so the whole row toggles
it. Selecting never navigates: the row drops its `href` and its chevron until the app turns
`selectable` off. The app owns which rows are selected: set **`selected`** on those, and listen to
the checkbox's `change`, which bubbles to the row (`wire:change`, `x-on:change`). Give the
checkbox a **`name`** and a **`value`** and a form around the list sends the selection. A selected
row takes the selection tint, and the check mark says it beyond colour; a disabled row disables
its checkbox. The label's whole text names the checkbox, description and trailing text included,
so keep the trailing slot to short text or a badge, and never a control: the label would click
it too. The open ticket can stay `current`, but a screen reader folds the label into its
checkbox, so while selecting the current row is a visual cue only. On a row that isn't
selectable, `name` and `value` are the root's own, as on a submit button row.

```blade example layout="stack"
<x-plinth::list-card>
    <li><x-plinth::list-row selectable selected name="tickets[]" value="1" description="Alex Kim · 10 min">Cannot export the March report</x-plinth::list-row></li>
    <li><x-plinth::list-row selectable name="tickets[]" value="2" description="Jo Park · 1 h">Invoice shows the wrong address</x-plinth::list-row></li>
    <li><x-plinth::list-row selectable disabled name="tickets[]" value="3" description="Locked by Rui Silva">Two-factor code never arrives</x-plinth::list-row></li>
</x-plinth::list-card>
```

In Livewire, keep the selection in the component and listen on the row:
`wire:change="toggle({{ $ticket->id }})"` (not `wire:click`: a click on a label clicks its checkbox
too, so it would fire twice). Vue emits `update:selected`, so `v-model:selected` works; React calls
`onSelectedChange` with the new value; without it, React's checkbox starts at `selected` and
toggles natively, as Blade's and Vue's do.

## Setting

A settings screen is a list of rows that each turn something on or off: set **`toggle`** and the
row becomes a `<label>` with a [switch](switch.md) in its trailing slot. The row's title names the
switch and its description describes it, so it reads as _Pause runs, switch, off_ and then the
description, and a tap anywhere on the row flips it. The switch prints no label of its own. The
app owns whether it is on: set **`checked`** and listen to the switch's `change`, which bubbles
to the row (`wire:change`, `x-on:change`). **`name`** and **`value`** are the switch's, so a form
sends it when it is on. The title's and description's ids start with the switch's id,
**`switch-id`**; one is generated when you leave it out. A disabled row disables its switch and
fades all but its description, which can say why. Like a selectable row, a setting row opens
nothing (no `href`, no chevron) and holds no other control; it may keep an icon in its leading
slot. A page that uses it loads the switch's CSS too, which the full stylesheet does.

```blade example layout="stack"
<x-plinth::list-card>
    <li><x-plinth::list-row toggle switch-id="paused" name="paused" value="1" description="Stop new runs for this client">Pause runs</x-plinth::list-row></li>
    <li><x-plinth::list-row toggle checked switch-id="reports" name="reports" value="1" description="A summary every Monday">Email reports</x-plinth::list-row></li>
    <li><x-plinth::list-row toggle checked disabled switch-id="two-factor" description="Only an owner can turn it off">Two-factor sign-in</x-plinth::list-row></li>
</x-plinth::list-card>
```

In Livewire, listen with `wire:change="togglePaused"` or bind the switch with `wire:model` on a
form; Vue emits `update:checked`, so `v-model:checked` works; React calls `onCheckedChange` with
the new value; without it, React's switch starts at `checked` and toggles natively.

## In a list

Put rows next to each other, or each as the direct child of its own `<li>` in a `<ul>`, and a
hairline divider (`--plinth-color-divider`) sits between them; a wrapper element between the
`<li>` and the row drops it. The [list card](list-card.md) resets the list for you; on your own,
reset it (`margin`, `padding`, `list-style: none`) and add `role="list"`, which Safari needs to
keep announcing a list without bullets. Long titles and descriptions wrap. The trailing slot keeps
its width up to half the row, so a long title wraps before a short value does.

## Routing

Plinth never routes. A link row is a plain `<a href>`, so in a single-page app hand it your
router's link: with Vue Router, `<RouterLink custom v-slot="{ href, navigate, isActive }">` around
`<PlinthListRow :href="href" :current="isActive" @click="navigate">`; in React, pass the router's
`href` (React Router's `useHref`) and an `onClick` that calls `preventDefault()` and then
navigates; in Livewire, add `wire:navigate`. The listener and the attribute land on the row's root.

## Props

The same names in every layer. React takes the Vue props, with the title as `children` and the
slots as props that take a node.

| Prop        | Blade                               | Vue                               | React                             | Default |
| ----------- | ----------------------------------- | --------------------------------- | --------------------------------- | ------- |
| description | `description="Monthly, by email"`   | `description="Monthly, by email"` | `description="Monthly, by email"` | none    |
| href        | `href="/settings"`, makes it a link | `href="/settings"`                | `href="/settings"`                | none    |
| button      | `button`, makes it a button         | `button`                          | `button`                          | off     |
| chevron     | `chevron`                           | `chevron`                         | `chevron`                         | off     |
| current     | `current` or `:current="$active"`   | `current` or `:current="active"`  | `current={active}`                | off     |
| disabled    | `disabled`                          | `disabled`                        | `disabled`                        | off     |
| selectable  | `selectable`, makes it a label      | `selectable`                      | `selectable`                      | off     |
| selected    | `selected` or `:selected="$on"`     | `v-model:selected="on"`           | `selected={on}`                   | off     |
| toggle      | `toggle`, a label with a switch     | `toggle`                          | `toggle`                          | off     |
| checked     | `checked` or `:checked="$on"`       | `v-model:checked="on"`            | `checked={on}`                    | off     |
| switchId    | `switch-id="paused"`                | `switch-id="paused"`              | `switchId="paused"`               | made up |
| name        | `name="tickets[]"`, the control's   | `name="tickets[]"`                | `name="tickets[]"`                | none    |
| value       | `value="12"`, the control's         | `value="12"`                      | `value="12"`                      | none    |
| leading     | `<x-slot:leading>`                  | `#leading` slot                   | `leading` (a node)                | none    |
| trailing    | `<x-slot:trailing>`                 | `#trailing` slot                  | `trailing` (a node)               | none    |
| title       | the slot                            | the default slot                  | `children`                        | none    |

Extra attributes and listeners (`wire:click`, `@click`, `onClick`) reach the root: the `<a>`, the
`<button>`, the `<div>` or, while selecting or in a setting row, the `<label>`. Vue emits
`update:selected` with the checkbox's new value and `update:checked` with the switch's; React calls
`onSelectedChange(selected)` and `onCheckedChange(checked)`.

```blade tab="Blade"
<x-plinth::list-row :href="route('settings.language')" chevron wire:navigate>
    Language
    <x-slot:trailing>English</x-slot:trailing>
</x-plinth::list-row>

<x-plinth::list-row button wire:click="signOut">Sign out</x-plinth::list-row>

<x-plinth::list-row :selectable="$selecting" :selected="in_array($ticket->id, $selected)" wire:change="toggle({{ $ticket->id }})">
    {{ $ticket->subject }}
</x-plinth::list-row>

<x-plinth::list-row toggle :checked="$paused" switch-id="paused" description="Stop new runs for this client" wire:change="togglePaused">
    Pause runs
</x-plinth::list-row>
```

```vue tab="Vue"
<PlinthListRow href="/overview" :current="route.name === 'overview'">Overview</PlinthListRow>

<PlinthListRow button description="Email and push" @click="openNotifications">
  Notifications
</PlinthListRow>

<PlinthListRow :selectable="selecting" v-model:selected="selected[ticket.id]">
  {{ ticket.subject }}
</PlinthListRow>

<PlinthListRow toggle v-model:checked="paused" description="Stop new runs for this client">
  Pause runs
</PlinthListRow>
```

```tsx tab="React"
import { PlinthListRow } from '@ptbdynamic/plinth/react';

<PlinthListRow href="/settings/language" chevron trailing="English">
    Language
</PlinthListRow>;

<PlinthListRow button description="Email and push" onClick={openNotifications}>
    Notifications
</PlinthListRow>;

<PlinthListRow
    selectable={selecting}
    selected={selected.has(ticket.id)}
    onSelectedChange={(on) => select(ticket.id, on)}
>
    {ticket.subject}
</PlinthListRow>;

<PlinthListRow
    toggle
    checked={paused}
    onCheckedChange={setPaused}
    description="Stop new runs for this client"
>
    Pause runs
</PlinthListRow>;
```

## Accessibility

- The root is the native element for what the row does: a `<div>`, an `<a>` or a
  `<button type="button">`; while selecting, a `<label>` around a native checkbox, which the row's
  text names and the keyboard reaches with Tab and toggles with Space; in a setting row, a
  `<label>` around a native checkbox with `role="switch"`, named by the title alone
  (`aria-labelledby`) and described by the description (`aria-describedby`), announced as on or
  off and flipped with Space.
- The current row prints `aria-current="page"`; a disabled link row has no `href`, `role="link"`
  and `aria-disabled="true"`.
- The focus ring is drawn inside the row, so a scrolling sheet or a card doesn't cut it off; while
  selecting it is on the checkbox, and in a setting row on the switch, which take the focus.
- The minimum height is `--plinth-list-row-height` (44px), above the 40px touch target.
- A decorative avatar is hidden from screen readers, so a person's name isn't read twice.
- Checked with axe in light and dark at 390, 768 and 1440px on every pull request.

The markup contract is at the top of
[`packages/css/src/components/list-row.css`](../../packages/css/src/components/list-row.css).
