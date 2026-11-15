# Page intro

The page's heading in the content: a large heading, a line of description under it and the
page's primary action on the end side, such as _Users_, "Manage who can sign in and what they can
do", with _Invite user_. It opens a list or settings page, in the flow of the content and with
the page's inline padding, and scrolls away with it. On a phone the same page usually keeps the
[page header](page-header.md) as its top bar; the two pair up so only one shows at a time.

## When not to use it

- For a bar that stays at the top while the page scrolls, with a menu or back button: use the
  [page header](page-header.md).
- For the heading of a part of the page (_Connections_, _Danger zone_): use the
  [section heading](section-heading.md), an `<h2>` that stacks with its siblings.
- For a page that sits under another, which needs a way back: keep the page header, whose
  leading part holds the back link.

## Heading, description and actions

Give it the page's **`heading`**, an optional **`description`** and the page's actions in the
**`actions`** slot: its primary [button](button.md), or a secondary one before it. On a phone the
actions sit under the text; from 768px they sit on the end edge, and move under the text when the
row leaves it less than 240px. A long heading or description wraps. The examples on this page are
`h3`s, since the page already has its `<h1>`.

```blade example layout="stack"
<x-plinth::page-intro heading="Users" level="h3" description="Manage who can sign in and what they can do.">
    <x-slot:actions>
        <x-plinth::button>Invite user</x-plinth::button>
    </x-slot:actions>
</x-plinth::page-intro>
```

The description and the actions are optional:

```blade example layout="stack"
<x-plinth::page-intro heading="Settings" level="h3" />
<x-plinth::page-intro heading="Billing" level="h3">
    <x-slot:actions>
        <x-plinth::button variant="secondary">Export</x-plinth::button>
        <x-plinth::button>Add a card</x-plinth::button>
    </x-slot:actions>
</x-plinth::page-intro>
```

## The heading's level

The heading is the page's `<h1>` by default. When the page sits beside another page's `<h1>`,
set **`level`** (`h2` to `h6`). The level doesn't change the look.

## With a page header

Set **`wide-only`** on the page intro (it prints `data-wide-only`) and `narrow-only` on the page
header. On a phone the page header is the screen's top bar, with its menu or back button and the
action as an icon button; from 768px, beside the [app nav](app-nav.md) and under the
[app bar](app-bar.md), the page header is not shown and the page opens with the intro. The one not
shown is `display: none`, so the page has one `<h1>` at every width and its actions are in the tab
order once. Without `wide-only` the page intro shows at every width, for a page with no page
header.

```blade
<main class="plinth-app-shell-main">
    <x-plinth::page-header heading="Users" top narrow-only>
        <x-slot:leading>
            <x-plinth::icon-button label="Menu" commandfor="menu" command="show-modal">…</x-plinth::icon-button>
        </x-slot:leading>
        <x-slot:actions>
            <x-plinth::icon-button label="Invite user" wire:click="invite">…</x-plinth::icon-button>
        </x-slot:actions>
    </x-plinth::page-header>
    <x-plinth::page-intro heading="Users" description="Manage who can sign in and what they can do." wide-only>
        <x-slot:actions>
            <x-plinth::button wire:click="invite">Invite user</x-plinth::button>
        </x-slot:actions>
    </x-plinth::page-intro>
    …the page…
</main>
```

## Page header, page intro and section heading

| Component                             | What it heads            | Where                                 | Level  |
| ------------------------------------- | ------------------------ | ------------------------------------- | ------ |
| [Page header](page-header.md)         | the page, as a bar       | sticky at the top; a phone's top bar  | `<h1>` |
| Page intro                            | the page, in the content | first in the content; scrolls with it | `<h1>` |
| [Section heading](section-heading.md) | a part of the page       | above each section's content          | `<h2>` |

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                             | Element       | Required | What it is                                                    |
| -------------------------------- | ------------- | -------- | ------------------------------------------------------------- |
| `.plinth-page-intro`             | `<div>`       | yes      | The root. A project's classes and attributes land on it       |
| `.plinth-page-intro-text`        | `<div>`       | yes      | The heading and the description                               |
| `.plinth-page-intro-heading`     | `<h1>`–`<h6>` | yes      | The page's heading                                            |
| `.plinth-page-intro-description` | `<p>`         | no       | A line saying what the page is for, with its id if one is set |
| `.plinth-page-intro-actions`     | `<div>`       | no       | The page's actions, printed only when the slot has content    |

| Attribute        | On              | Values       | Default | What it does                                      |
| ---------------- | --------------- | ------------ | ------- | ------------------------------------------------- |
| `data-wide-only` | the root        | present      | absent  | Shown from 768px only: `display: none` on a phone |
| `id`             | the description | the given id | none    | For an `aria-describedby` that points at it       |

The heading's element is `h1` to `h6`; an unknown level prints `h1`. The least width the text
keeps beside the actions is **`--plinth-page-intro-text-min-width`** (240px), a component token a
project can override.

## Props

The same names in every layer. React takes the Vue props, with the slot as a prop that takes a
node.

| Prop           | Blade                        | Vue                      | React                   | Default |
| -------------- | ---------------------------- | ------------------------ | ----------------------- | ------- |
| heading        | `heading="Users"` (required) | `heading="Users"`        | `heading="Users"`       | none    |
| level          | `level="h2"`                 | `level="h2"`             | `level="h2"`            | `h1`    |
| description    | `description="…"`            | `description="…"`        | `description="…"`       | none    |
| description id | `description-id="users"`     | `description-id="users"` | `descriptionId="users"` | none    |
| wide only      | `wide-only`                  | `wide-only`              | `wideOnly`              | off     |
| actions        | `<x-slot:actions>`           | `#actions` slot          | `actions` (a node)      | none    |

Every layer needs a `heading` and throws without one. Blade takes `level` as a string or a
`PageHeaderLevel` case, the page header's levels. Extra attributes reach the root `<div>`, and a
project's attribute wins over the page intro's own (`data-wide-only`; `class` is added). Vue emits
no events: the actions are the app's own buttons, with their own listeners.

```blade tab="Blade"
<x-plinth::page-intro heading="Users" description="Manage who can sign in." wide-only>
    <x-slot:actions>
        <x-plinth::button wire:click="invite">Invite user</x-plinth::button>
    </x-slot:actions>
</x-plinth::page-intro>
```

```vue tab="Vue"
<PlinthPageIntro heading="Users" description="Manage who can sign in." wide-only>
  <template #actions>
    <PlinthButton @click="invite">Invite user</PlinthButton>
  </template>
</PlinthPageIntro>
```

```tsx tab="React"
import { PlinthButton, PlinthPageIntro } from '@ptbdynamic/plinth/react';

<PlinthPageIntro
    heading="Users"
    description="Manage who can sign in."
    wideOnly
    actions={<PlinthButton onClick={invite}>Invite user</PlinthButton>}
/>;
```

## Accessibility

- The heading is the page's `<h1>`, or a lower level when the page sits beside another page's
  `<h1>`. With a page header, set `narrow-only` and `wide-only` so one of them is `display: none`
  at every width and only one `<h1>` is in the accessibility tree.
- The description is plain text. Give it an id (`description-id`) to point at it with
  `aria-describedby`, from the page's `<main>` for instance, if the app wants it read there.
- Each action carries its own name, keeps the 40px touch target and shows the focus ring on
  `:focus-visible`. Nothing depends on hover, and nothing moves, so reduced motion has nothing to
  stop.
- In right-to-left text the actions sit on the left.
- Checked with axe in light and dark at 390, 768 and 1440px on every pull request.

The markup contract is at the top of
[`packages/css/src/components/page-intro.css`](../../packages/css/src/components/page-intro.css).
