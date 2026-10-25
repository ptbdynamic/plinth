# Stat

TODO what it is and where it goes, in a sentence or two (site/components/badge.md is the model
for every page).

## When not to use it

- TODO what it is not, and the component to use instead.

## TODO one section per variant or state

TODO when to pick it.

```blade example
<x-plinth::stat>Content</x-plinth::stat>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part             | Element | Required | What it is |
| ---------------- | ------- | -------- | ---------- |
| `.plinth-stat` | `<div>` | yes      | The root   |

TODO a table of the data-* variants, states and ARIA attributes, with their values and defaults.

## Props

The same names in every layer. React takes the Vue props, with the content as `children`.

| Prop  | Blade    | Vue              | React      | Default |
| ----- | -------- | ---------------- | ---------- | ------- |
| label | the slot | the default slot | `children` | none    |

TODO which attributes reach which element, the events Vue emits and React's `on…` callbacks.

```blade tab="Blade"
<x-plinth::stat class="ms-2">Content</x-plinth::stat>
```

```vue tab="Vue"
<PlinthStat class="ms-2">Content</PlinthStat>
```

```tsx tab="React"
import { PlinthStat } from '@ptbdynamic/plinth/react';

<PlinthStat className="ms-2">Content</PlinthStat>;
```

## Accessibility

- TODO the accessible name, what screen readers announce, the keyboard, the focus ring, touch
  targets, and anything the app must add.

The markup contract is at the top of
[`packages/css/src/components/stat.css`](../../packages/css/src/components/stat.css).
