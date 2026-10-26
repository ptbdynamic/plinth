# Switch

TODO what it is and where it goes, in a sentence or two (site/components/badge.md is the model
for every page).

## When not to use it

- TODO what it is not, and the component to use instead.

## TODO one section per variant or state

TODO when to pick it.

```blade example
<x-plinth::switch>Content</x-plinth::switch>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part             | Element | Required | What it is |
| ---------------- | ------- | -------- | ---------- |
| `.plinth-switch` | `<div>` | yes      | The root   |

TODO a table of the data-* variants, states and ARIA attributes, with their values and defaults.

## Props

The same names in every layer. React takes the Vue props, with the content as `children`.

| Prop  | Blade    | Vue              | React      | Default |
| ----- | -------- | ---------------- | ---------- | ------- |
| label | the slot | the default slot | `children` | none    |

TODO which attributes reach which element, the events Vue emits and React's `on…` callbacks.

```blade tab="Blade"
<x-plinth::switch class="ms-2">Content</x-plinth::switch>
```

```vue tab="Vue"
<PlinthSwitch class="ms-2">Content</PlinthSwitch>
```

```tsx tab="React"
import { PlinthSwitch } from '@ptbdynamic/plinth/react';

<PlinthSwitch className="ms-2">Content</PlinthSwitch>;
```

## Accessibility

- TODO the accessible name, what screen readers announce, the keyboard, the focus ring, touch
  targets, and anything the app must add.

The markup contract is at the top of
[`packages/css/src/components/switch.css`](../../packages/css/src/components/switch.css).
