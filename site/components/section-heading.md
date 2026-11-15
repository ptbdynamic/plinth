# Section heading

The heading of a part of a page that is not a list, such as _Connections_, _Budget_ or _Danger
zone_ on a settings page: a real heading, an optional line of description and the section's
actions, above its content (a form, a [data table](data-table.md), [stats](stat.md)). Sections
with one stack evenly down the page.

## When not to use it

- For the page's own heading: use the [page header](page-header.md).
- For the bar on top of a list, with a count and selection: use the [list header](list-header.md).
- For a heading over a card of settings rows: use the [list card](list-card.md)'s own `heading`.

## Heading, description and actions

Give it the section's **`heading`**, an `<h2>` unless **`heading-level`** says otherwise (h2 to
h6), an optional **`description`** that says what the section holds, and the section's actions in
the **`actions`** slot: a button or two, each with its own name. On a phone the actions sit under
the text; from 768px they sit on the end edge, and move under the text when its container leaves
it less than 240px (a pane, a drawer). A long heading or description wraps.

```blade example layout="stack"
<x-plinth::section-heading heading="Connections" description="The services this workspace sends data to.">
    <x-slot:actions>
        <x-plinth::button variant="secondary">Add connection</x-plinth::button>
    </x-slot:actions>
</x-plinth::section-heading>
```

The description and the actions are optional:

```blade example layout="stack"
<x-plinth::section-heading heading="Budget" />
```

## Divider

**`divider`** draws a hairline under the heading, for a settings page's look.

```blade example layout="stack"
<x-plinth::section-heading heading="Budget" description="Runs pause when the spend reaches the cap." divider>
    <x-slot:actions>
        <x-plinth::button variant="secondary">Set a cap</x-plinth::button>
    </x-slot:actions>
</x-plinth::section-heading>
```

## Sections as regions

To make a section a landmark region a screen reader can list, wrap it in a
`<section aria-labelledby>` and give the heading the matching **`heading-id`**. A heading that
follows other content in the same parent, or opens a `<section>` that follows another, has
`--plinth-section-heading-space-before` (40px) above it, so the sections stack evenly; a heading
that is its parent's first child, such as the first section's, adds nothing above itself.
`--plinth-section-heading-space-after` (16px) separates it from its content.

```blade example layout="stack"
<div>
    <section aria-labelledby="example-budget">
        <x-plinth::section-heading heading="Budget" heading-id="example-budget" description="Runs pause when the spend reaches the cap." divider />
        <p>No cap set.</p>
    </section>
    <section aria-labelledby="example-danger">
        <x-plinth::section-heading heading="Danger zone" heading-id="example-danger" description="Deleting the workspace removes its data for good." divider>
            <x-slot:actions>
                <x-plinth::button variant="danger">Delete workspace</x-plinth::button>
            </x-slot:actions>
        </x-plinth::section-heading>
        <p>This cannot be undone.</p>
    </section>
</div>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                                 | Element          | Holds                                     |
| ------------------------------------ | ---------------- | ----------------------------------------- |
| `plinth-section-heading`             | `<div>`          | the root                                  |
| `plinth-section-heading-text`        | `<div>`          | the title and the description             |
| `plinth-section-heading-title`       | `<h2>` to `<h6>` | the section's heading, with its id if set |
| `plinth-section-heading-description` | `<p>`            | the optional line of description          |
| `plinth-section-heading-actions`     | `<div>`          | the optional actions                      |

| Attribute or state | On        | Values                                         | Default |
| ------------------ | --------- | ---------------------------------------------- | ------- |
| heading level      | the title | `h2` to `h6`; anything else falls back to `h2` | `h2`    |
| `id`               | the title | the heading id, for `aria-labelledby`          | none    |
| `data-divider`     | the root  | present for a hairline under the heading       | absent  |

The spacing is `--plinth-section-heading-space-before` (40px) and
`--plinth-section-heading-space-after` (16px), and the least width the text keeps beside the
actions is `--plinth-section-heading-text-min-width` (240px): component tokens a project can
override.

## Props

The same names in every layer. React takes the Vue props, with the slot as a prop that takes a
node. Extra attributes go to the root `<div>`, and the project's win a clash (`class` is added).
It emits no events: the actions are the app's own buttons, with their own listeners.

| Prop          | Blade                         | Vue                   | React                | Default |
| ------------- | ----------------------------- | --------------------- | -------------------- | ------- |
| heading       | `heading="Budget"` (required) | `heading="Budget"`    | `heading="Budget"`   | none    |
| heading level | `heading-level="h3"`          | `heading-level="h3"`  | `headingLevel="h3"`  | `h2`    |
| heading id    | `heading-id="budget"`         | `heading-id="budget"` | `headingId="budget"` | none    |
| description   | `description="…"`             | `description="…"`     | `description="…"`    | none    |
| divider       | `divider`                     | `divider`             | `divider`            | off     |
| actions       | `<x-slot:actions>`            | `#actions` slot       | `actions` (a node)   | none    |

In Blade, `heading-level` takes the string or the `HeadingLevel` enum.

```blade tab="Blade"
<section aria-labelledby="budget-heading">
    <x-plinth::section-heading heading="Budget" heading-id="budget-heading" description="Runs pause when the spend reaches the cap." divider>
        <x-slot:actions>
            <x-plinth::button variant="secondary" wire:click="editCap">Set a cap</x-plinth::button>
        </x-slot:actions>
    </x-plinth::section-heading>
    …
</section>
```

```vue tab="Vue"
<section aria-labelledby="budget-heading">
  <PlinthSectionHeading
    heading="Budget"
    heading-id="budget-heading"
    description="Runs pause when the spend reaches the cap."
    divider
  >
    <template #actions>
      <PlinthButton variant="secondary" @click="editCap">Set a cap</PlinthButton>
    </template>
  </PlinthSectionHeading>
</section>
```

```tsx tab="React"
import { PlinthButton, PlinthSectionHeading } from '@ptbdynamic/plinth/react';

<section aria-labelledby="budget-heading">
    <PlinthSectionHeading
        heading="Budget"
        headingId="budget-heading"
        description="Runs pause when the spend reaches the cap."
        divider
        actions={
            <PlinthButton variant="secondary" onClick={editCap}>
                Set a cap
            </PlinthButton>
        }
    />
</section>;
```

## Accessibility

- The heading is a real heading, so a screen reader can jump between the page's sections; pick
  the level that fits the page's outline.
- To make the section a region, the app wraps it in a `<section aria-labelledby>` pointing at the
  heading's id. The description is plain text; reference it with `aria-describedby` if the
  section needs it.
- Each action carries its own name, keeps the 40px touch target and shows the focus ring on
  `:focus-visible`. Nothing depends on hover, and nothing moves, so reduced motion has nothing to
  stop.
- Checked with axe in light and dark at 390, 768 and 1440px on every pull request.

The markup contract is at the top of
[`packages/css/src/components/section-heading.css`](../../packages/css/src/components/section-heading.css).
