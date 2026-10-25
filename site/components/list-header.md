# List Header

TODO what it is and where it goes, in a sentence or two (site/components/badge.md is the model
for every page).

## When not to use it

- TODO what it is not, and the component to use instead.

## TODO one section per variant or state

TODO when to pick it.

```blade example
<x-plinth::list-header>Content</x-plinth::list-header>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part             | Element | Required | What it is |
| ---------------- | ------- | -------- | ---------- |
| `.plinth-list-header` | `<div>` | yes      | The root   |

TODO a table of the data-* variants, states and ARIA attributes, with their values and defaults.

## Props

The same names in every layer. React takes the Vue props, with the content as `children`.

| Prop  | Blade    | Vue              | React      | Default |
| ----- | -------- | ---------------- | ---------- | ------- |
| label | the slot | the default slot | `children` | none    |

TODO which attributes reach which element, the events Vue emits and React's `on…` callbacks.

```blade tab="Blade"
<x-plinth::list-header class="ms-2">Content</x-plinth::list-header>
```

```vue tab="Vue"
<PlinthListHeader class="ms-2">Content</PlinthListHeader>
```

```tsx tab="React"
import { PlinthListHeader } from '@ptbdynamic/plinth/react';

<PlinthListHeader className="ms-2">Content</PlinthListHeader>;
```

## Accessibility

- TODO the accessible name, what screen readers announce, the keyboard, the focus ring, touch
  targets, and anything the app must add.

The markup contract is at the top of
[`packages/css/src/components/list-header.css`](../../packages/css/src/components/list-header.css).
