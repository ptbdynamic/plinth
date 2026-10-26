# Checkbox

A choice that is sent with the form: _Email me product updates_, _I accept the terms_, one item
picked from a list. It is the browser's own checkbox, with its label beside it and optionally a
description and an error under the label, wired the way a [field](field.md) wires its control.
For a setting that takes effect as soon as it is flipped, use a [switch](switch.md).

## When not to use it

- For a setting that applies at once, such as turning a feature on: use a [switch](switch.md).
- To pick one of a few choices: radio buttons, or a [pill row](pill-row.md) to filter a list.
- To select rows in a list: a [list row](list-row.md) has its own selectable form, with the whole
  row as the target.
- For an action, such as _Archive_: use a [button](button.md).

## The label

Every checkbox has a label, beside it: it is what screen readers announce, and tapping it toggles
the box, so the box and its label are one target. Write it as the thing the person agrees to or
picks, in sentence case, without a full stop.

```blade example
<x-plinth::checkbox id="docs-updates" label="Email me product updates" />
<x-plinth::checkbox id="docs-updates-checked" label="Email me product updates" checked />
```

## Description and error

The **description** is a line under the label that says more about the choice. The **error** says
what is wrong and how to fix it: _Accept the terms to create the account_. With an error the
checkbox is marked invalid (`aria-invalid`), and screen readers read the description and the
error after the label.

```blade example
<x-plinth::checkbox id="docs-digest" label="Send me a weekly digest" description="Every Monday morning. Unsubscribe at any time." checked />
<x-plinth::checkbox id="docs-terms" label="I accept the terms of service" error="Accept the terms to create the account." />
```

## Indeterminate

A "select all" box is **indeterminate** when some, but not all, of the boxes it controls are
checked: it shows a dash. There is no HTML attribute for it, only the input's `indeterminate`
property, so each layer sets it: Vue and React in an effect, Blade with Alpine (`x-init`), which
Livewire and Filament already load. Clicking an indeterminate box checks it; the app then checks
every box it controls.

```blade example
<x-plinth::checkbox id="docs-all" label="Select all tickets" indeterminate />
```

## A group

Several checkboxes that answer one question go in a [field](field.md) with `group`: its legend
names them, its description says how many to pick, and each box keeps its own label. Give each
the same `name` with `[]` so a form sends the checked ones as a list.

```blade example
<x-plinth::field id="docs-notify" label="Notify me about" group description="Pick at least one.">
    <x-plinth::checkbox id="docs-notify-replies" label="Replies to my tickets" name="notify[]" value="replies" checked />
    <x-plinth::checkbox id="docs-notify-mentions" label="Mentions" name="notify[]" value="mentions" checked />
    <x-plinth::checkbox id="docs-notify-digest" label="A weekly digest" name="notify[]" value="digest" />
</x-plinth::field>
```

## Disabled

**Disabled** fades the checkbox and its text, and it can't be focused or sent with the form. Say
why in the description, when the reason isn't plain.

```blade example
<x-plinth::checkbox id="docs-disabled" label="Email me product updates" disabled />
<x-plinth::checkbox id="docs-disabled-checked" label="Security alerts" description="Your administrator turned this on." checked disabled />
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                           | Element   | Required | What it is                                                          |
| ------------------------------ | --------- | -------- | ------------------------------------------------------------------- |
| `.plinth-checkbox`             | `<div>`   | yes      | The root. Takes the project's class                                 |
| `.plinth-checkbox-input`       | `<input>` | yes      | `type="checkbox"`. Takes the `id` and every attribute but the class |
| `.plinth-checkbox-label`       | `<label>` | yes      | The label beside the box, with `for` pointing at the input          |
| `.plinth-checkbox-description` | `<p>`     | no       | The description; its id is the input's id with `-description`       |
| `.plinth-checkbox-error`       | `<p>`     | no       | The error; its id is the input's id with `-error`                   |

| Attribute          | On                       | Values                                 | Default |
| ------------------ | ------------------------ | -------------------------------------- | ------- |
| `checked`          | `.plinth-checkbox-input` | present when checked                   | none    |
| `aria-describedby` | `.plinth-checkbox-input` | the description's id, then the error's | none    |
| `aria-invalid`     | `.plinth-checkbox-input` | `true` with an error                   | none    |
| `disabled`         | `.plinth-checkbox-input` | present when disabled                  | none    |

Indeterminate is the input's property, not an attribute, so it isn't in the markup.

## Props

The same names in every layer. React takes the Vue props, and its native `checked` or
`defaultChecked` and `onChange` for the value.

| Prop          | Blade                              | Vue                     | React                    | Default         |
| ------------- | ---------------------------------- | ----------------------- | ------------------------ | --------------- |
| label         | `label="Terms"`                    | `label="Terms"`         | `label="Terms"`          | required        |
| id            | `id="terms"`                       | `id="terms"`            | `id="terms"`             | a generated one |
| description   | `description="…"`                  | `description="…"`       | `description="…"`        | none            |
| error         | `:error="$errors->first('terms')"` | `:error="errors.terms"` | `error={errors.terms}`   | none            |
| indeterminate | `indeterminate`                    | `indeterminate`         | `indeterminate`          | off             |
| disabled      | `disabled`                         | `disabled`              | `disabled`               | off             |
| checked       | `wire:model="terms"` or `checked`  | `v-model="terms"`       | `checked` and `onChange` | off             |

**The attributes go to the input, not the root.** In Blade, `wire:model`, `x-model`, `name`,
`value`, `checked`, `required`, `data-*` and `aria-*` land on the `<input>`; only `class` goes on
the root, added to Plinth's. Vue does the same with the attributes that fall through, and React
with its props: `className` on the root, and `checked`, `onChange`, `name`, `ref` and every other
prop on the input. An attribute that clashes with one Plinth sets on the input
(`aria-describedby`) wins. Vue's `v-model` is a boolean, and it emits `update:modelValue` when the
box is toggled; the input's own `change` event reaches your listeners. Without a `value`, a
checked box is sent as `on`.

```blade tab="Blade"
<x-plinth::checkbox
    label="I accept the terms of service"
    wire:model="terms"
    :error="$errors->first('terms')"
/>
```

```vue tab="Vue"
<PlinthCheckbox
    v-model="allSelected"
    label="Select all tickets"
    :indeterminate="someSelected && !allSelected"
/>
```

```tsx tab="React"
import { PlinthCheckbox } from '@ptbdynamic/plinth/react';

<PlinthCheckbox
    label="Email me product updates"
    checked={updates}
    onChange={(event) => setUpdates(event.target.checked)}
/>;
```

## Accessibility

- **It is the native checkbox:** Space toggles it, its state is announced, and a form sends and
  resets it with no script.
- **The label is its name,** tied to the input with `for` and `id`; tapping it toggles the box.
- **The description and the error are read after the label,** through `aria-describedby`, and an
  error marks the checkbox invalid. The error isn't a live region: after a submit, move focus to
  the first invalid control.
- **Colour is not the only cue:** checked shows a tick, indeterminate a dash, and the error says
  in words what to fix.
- **The focus ring** shows on the box whenever it has focus.
- **Touch:** the label fills the row beside the box, so the two are one target, 40px tall on a
  touch screen.

The markup contract is at the top of
[`packages/css/src/components/checkbox.css`](../../packages/css/src/components/checkbox.css).
