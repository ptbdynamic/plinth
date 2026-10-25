# Text field

One line of text for a person to type: a name, an email address, a search. It comes with its
label, and optionally a line that helps fill it in and an error that says what to fix. For
several lines, such as a message or a reply, use the [textarea](textarea.md).

## When not to use it

- For several lines of text: use the [textarea](textarea.md).
- To pick from a short, fixed list: a select or radio buttons say what the choices are.
- To filter a list by a few known values: use a [pill row](pill-row.md).
- For a value that can't change: show it as text. A read-only field is for a value the person
  may want to select and copy, inside a form.

## The label

Every field has a label: it is what screen readers announce, and tapping it focuses the field.
Write it as a noun, in sentence case (_Email_, _Project name_), and keep instructions for the
description. A placeholder is not a label: it disappears as soon as the person types, and is often
too faint to read.

```blade example
<x-plinth::text-field id="docs-name" label="Project name" />
```

**A hidden label** (`hide-label`) is still read by screen readers but isn't shown. Use it only
where the field's purpose is plain without it, such as a search box with its icon in a toolbar.

```blade example
<x-plinth::text-field id="docs-find" label="Search tickets" hide-label type="search" placeholder="Search tickets">
    <x-slot:icon><x-site.glyph name="search" /></x-slot:icon>
</x-plinth::text-field>
```

## Description and error

The **description** is a line under the field that helps fill it in: a format, where the value is
used, a limit. The **error** says what is wrong and how to fix it, in plain words: _Enter an email
address, such as name@example.com_, not _Invalid input_. With an error the field is marked invalid
(`aria-invalid`) and its edge turns red and thicker, so colour isn't the only cue. Screen readers
read the description and the error after the label.

```blade example
<x-plinth::text-field id="docs-email" label="Email" type="email" description="Receipts go to this address." />
<x-plinth::text-field id="docs-email-error" label="Email" type="email" value="sam@" error="Enter an email address, such as name@example.com." />
```

Show an error when the person leaves the field or submits the form, not on every key, and move
focus to the first field with one after a submit. Remove it as soon as the value is fixed.

## Search, icons and the trailing slot

A field takes a **leading icon** (the `icon` slot), a 16px glyph that only decorates: the label
still names the field. The **trailing slot** holds one small control or hint at the end:

- a **clear button** for a search: a small ghost [icon button](icon-button.md) with a label such as
  _Clear search_. The app shows it when there is text, and empties the field and focuses it again
  when it is pressed. With a trailing slot, the browser's own clear button is hidden.
- a **keyboard hint** such as `/`, as `<kbd aria-hidden="true">`, with `aria-keyshortcuts` on the
  field so screen readers learn the shortcut. The app listens for the key.

The field keeps 32px at its end for the trailing slot (`--plinth-text-field-trailing-size`); a
project with a wider hint raises it.

```blade example
<x-plinth::text-field id="docs-search" label="Search tickets" hide-label type="search" placeholder="Search tickets" value="refund">
    <x-slot:icon><x-site.glyph name="search" /></x-slot:icon>
    <x-slot:trailing>
        <x-plinth::icon-button label="Clear search" size="sm"><x-site.glyph name="close" /></x-plinth::icon-button>
    </x-slot:trailing>
</x-plinth::text-field>
<x-plinth::text-field id="docs-shortcut" label="Search" hide-label type="search" placeholder="Search" aria-keyshortcuts="/">
    <x-slot:icon><x-site.glyph name="search" /></x-slot:icon>
    <x-slot:trailing><kbd aria-hidden="true">/</kbd></x-slot:trailing>
</x-plinth::text-field>
```

## Sizes

**md** (32px) is the default; **sm** (28px) is for dense places such as a toolbar or a table's
filters. On a touch screen both are 40px tall, and on a phone the text is 16px so iOS doesn't zoom
in when the field takes focus; from 768px up it is 14px (md) or 13px (sm).

```blade example
<x-plinth::text-field id="docs-sm" label="Small" size="sm" />
<x-plinth::text-field id="docs-md" label="Medium" />
```

## Disabled and read-only

**Disabled** fades the field, and it can't be focused or sent with the form. Prefer explaining why
something can't be changed. **Read-only** keeps the value readable, focusable and selectable, and
sent with the form, without the field's fill: for an ID the person copies.

```blade example
<x-plinth::text-field id="docs-disabled" label="Email" value="sam@example.com" disabled />
<x-plinth::text-field id="docs-readonly" label="Account ID" value="ACC-20431" readonly />
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                             | Element   | Required | What it is                                                              |
| -------------------------------- | --------- | -------- | ----------------------------------------------------------------------- |
| `.plinth-text-field`             | `<div>`   | yes      | The root. Takes `data-size`, `data-label` and the project's class       |
| `.plinth-text-field-label`       | `<label>` | yes      | The label, with `for` pointing at the input                             |
| `.plinth-text-field-control`     | `<div>`   | yes      | Holds the icon, the input and the trailing slot                         |
| `.plinth-icon`                   | `<span>`  | no       | The leading icon, 16px, `aria-hidden="true"`                            |
| `.plinth-text-field-input`       | `<input>` | yes      | The input. Takes the `id`, the `type` and every attribute but the class |
| `.plinth-text-field-trailing`    | `<span>`  | no       | One small control or hint at the end                                    |
| `.plinth-text-field-description` | `<p>`     | no       | The help line; its id is the input's id with `-description`             |
| `.plinth-text-field-error`       | `<p>`     | no       | The error; its id is the input's id with `-error`                       |

| Attribute          | On                         | Values                                                         | Default |
| ------------------ | -------------------------- | -------------------------------------------------------------- | ------- |
| `data-size`        | `.plinth-text-field`       | `sm`, `md`                                                     | `md`    |
| `data-label`       | `.plinth-text-field`       | `hidden`: the label is hidden visually                         | none    |
| `type`             | `.plinth-text-field-input` | `text`, `email`, `url`, `tel`, `password`, `number`, `search`… | `text`  |
| `aria-describedby` | `.plinth-text-field-input` | the description's id, then the error's                         | none    |
| `aria-invalid`     | `.plinth-text-field-input` | `true` with an error                                           | none    |
| `disabled`         | `.plinth-text-field-input` | present when disabled                                          | none    |
| `readonly`         | `.plinth-text-field-input` | present when read-only                                         | none    |

A missing or unknown `data-size` looks like md, and Blade, Vue and React print `md` for a size
they don't know.

## Props

The same names in every layer. Blade writes a camelCase prop in kebab-case (`hide-label`), as Vue
can; React takes the Vue props, with the slots as props that take a node.

| Prop        | Blade                               | Vue                     | React                   | Default         |
| ----------- | ----------------------------------- | ----------------------- | ----------------------- | --------------- |
| label       | `label="Email"`                     | `label="Email"`         | `label="Email"`         | required        |
| hideLabel   | `hide-label`                        | `hide-label`            | `hideLabel`             | off             |
| id          | `id="email"`                        | `id="email"`            | `id="email"`            | a generated one |
| type        | `type="email"`                      | `type="email"`          | `type="email"`          | `text`          |
| size        | `size="sm"` (or a `Size` case)      | `size="sm"`             | `size="sm"`             | `md`            |
| description | `description="…"`                   | `description="…"`       | `description="…"`       | none            |
| error       | `:error="$errors->first('email')"`  | `:error="errors.email"` | `error={errors.email}`  | none            |
| disabled    | `disabled`                          | `disabled`              | `disabled`              | off             |
| readonly    | `readonly`                          | `readonly`              | `readOnly`              | off             |
| value       | `wire:model="email"` or `value="…"` | `v-model="email"`       | `value` and `onChange`  | none            |
| icon        | `<x-slot:icon>`                     | `#icon` slot            | `icon={<Icon />}`       | none            |
| trailing    | `<x-slot:trailing>`                 | `#trailing` slot        | `trailing={<Button />}` | none            |

**The attributes go to the input, not the root.** In Blade, `wire:model`, `x-model`, `name`,
`value`, `placeholder`, `autocomplete`, `required`, `data-*` and `aria-*` land on the `<input>`;
only `class` goes on the root, added to Plinth's. Vue does the same with the attributes that fall
through, and React with its props: `className` on the root, and `value`, `onChange`, `name`, `ref`
and every other prop on the input. An attribute that clashes with one Plinth sets on the input
(`aria-describedby`) wins. Vue emits `update:modelValue` as the person types, and the input's own
`input` and `change` events reach your listeners.

```blade tab="Blade"
<x-plinth::text-field
    label="Email"
    type="email"
    wire:model.blur="email"
    autocomplete="email"
    :error="$errors->first('email')"
/>
```

```vue tab="Vue"
<PlinthTextField v-model="query" label="Search tickets" hide-label type="search">
  <template #icon><SearchIcon /></template>
</PlinthTextField>
```

```tsx tab="React"
import { PlinthTextField } from '@ptbdynamic/plinth/react';

<PlinthTextField
    label="Email"
    type="email"
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    error={errors.email}
/>;
```

## Accessibility

- **The label is the field's name**, tied to the input with `for` and `id`, so tapping it focuses
  the field and screen readers announce it. Hidden with `hide-label`, it is still read.
- **The description and the error are read after the label,** through `aria-describedby`, and an
  error marks the field invalid (`aria-invalid="true"`). The error isn't a live region: after a
  submit, move focus to the first invalid field, and its error is read with it.
- **Colour is not the only cue:** an invalid field's edge is thicker as well as red, and the error
  says in words what to fix.
- **The focus ring** shows on the input whenever it has focus.
- **Touch:** on a touch screen the field is 40px tall, and the clear button keeps a 40px touch
  target. On a phone the text is 16px, so iOS doesn't zoom the page.
- The leading icon is hidden from screen readers. A keyboard hint is hidden too; put the shortcut
  in `aria-keyshortcuts` on the field.
- Pick the right `type` and `autocomplete`: the phone shows the right keyboard, and the browser can
  fill the value in.

The markup contract is at the top of
[`packages/css/src/components/text-field.css`](../../packages/css/src/components/text-field.css).
