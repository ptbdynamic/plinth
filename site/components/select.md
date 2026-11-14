# Select

A dropdown for choosing one option from a list: a role, a country, a status. It is the browser's
own `<select>`, so it works with the keyboard, with screen readers and with the phone's native
picker, and it comes with its label and optionally a line that helps and an error that says what to
fix. The options are yours: you put `<option>` and `<optgroup>` inside it.

## When not to use it

- For two or three choices that should stay visible: use radio buttons, so the person sees them
  all at once.
- To turn one thing on or off: use a [switch](switch.md) or a [checkbox](checkbox.md).
- For a long list the person has to search, or to choose several: a select can't filter or take
  more than one value. Use a search field with a list under it.
- For free text: use the [text field](text-field.md).

## The label

Every select has a label: it is what screen readers announce, and tapping it focuses the select.
Write it as a noun, in sentence case (_Role_, _Country_), and keep instructions for the
description.

```blade example
<x-plinth::select id="docs-role" label="Role">
    <option value="admin">Admin</option>
    <option value="editor" selected>Editor</option>
    <option value="viewer">Viewer</option>
</x-plinth::select>
```

**A hidden label** (`hide-label`) is still read by screen readers but isn't shown. Use it only
where the select's purpose is plain without it, such as a sort order next to the list it sorts.

```blade example
<x-plinth::select id="docs-sort" label="Sort tickets" hide-label>
    <option value="newest">Newest first</option>
    <option value="oldest">Oldest first</option>
</x-plinth::select>
```

## The placeholder

Give a `placeholder` when nothing should be chosen yet. Plinth prints it as a first option that is
disabled and selected, so it shows while the value is empty and can't be picked again. Together
with `required`, the browser asks for a real choice before it sends the form. The placeholder is a
prompt (_Choose a role_), not a label.

```blade example
<x-plinth::select id="docs-placeholder" label="Role" placeholder="Choose a role" required>
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
    <option value="viewer">Viewer</option>
</x-plinth::select>
```

## With an icon

A leading icon helps the eye find the select in a busy form: a person for an owner, a
funnel for a filter. It is 16px, decorative and hidden from screen readers, so the label still names the
select. Give it in the `icon` slot.

```blade example
<x-plinth::select id="docs-icon" label="Owner">
    <x-slot:icon><x-site.glyph name="user" /></x-slot:icon>
    <option value="ana">Ana Lopes</option>
    <option value="sam">Sam Reed</option>
    <option value="noor">Noor Haddad</option>
</x-plinth::select>
```

## Groups

Use `<optgroup label="…">` to split a long list into named sections. Screen readers read the
group's name with the option.

```blade example
<x-plinth::select id="docs-country" label="Country" placeholder="Choose a country">
    <optgroup label="Europe">
        <option value="pt">Portugal</option>
        <option value="fr">France</option>
    </optgroup>
    <optgroup label="Americas">
        <option value="br">Brazil</option>
        <option value="ca">Canada</option>
    </optgroup>
</x-plinth::select>
```

## Description and error

The **description** is a line under the select that helps choose: what the options change, where the
value is used. The **error** says what is wrong and how to fix it, in plain words: _Choose a role
for the new member_, not _Invalid input_. With an error the select is marked invalid
(`aria-invalid`) and its edge turns red and thicker, so colour isn't the only cue. Screen readers
read the description and the error after the label.

```blade example
<x-plinth::select id="docs-description" label="Role" description="What the person may change in this project.">
    <option value="admin">Admin</option>
    <option value="viewer">Viewer</option>
</x-plinth::select>
<x-plinth::select id="docs-error" label="Role" placeholder="Choose a role" required error="Choose a role for the new member.">
    <option value="admin">Admin</option>
    <option value="viewer">Viewer</option>
</x-plinth::select>
```

Show an error when the person leaves the select or submits the form, and remove it as soon as the
choice is made.

## Sizes

**md** (32px) is the default; **sm** (28px) is for dense places such as a toolbar or a table's
filters. On a touch screen both are 40px tall, and on a phone the text is 16px so iOS doesn't zoom
in when the select takes focus; from 768px up it is 14px (md) or 13px (sm). The sizes are the text
field's, so the two line up in a form.

```blade example
<x-plinth::select id="docs-sm" label="Small" size="sm">
    <option>Open</option>
    <option>Closed</option>
</x-plinth::select>
<x-plinth::select id="docs-md" label="Medium">
    <option>Open</option>
    <option>Closed</option>
</x-plinth::select>
```

## Disabled

**Disabled** fades the select, and it can't be focused or sent with the form. Prefer explaining
why something can't be changed.

```blade example
<x-plinth::select id="docs-disabled" label="Role" disabled>
    <option>Editor</option>
</x-plinth::select>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                         | Element                 | Required | What it is                                                        |
| ---------------------------- | ----------------------- | -------- | ----------------------------------------------------------------- |
| `.plinth-select`             | `<div>`                 | yes      | The root. Takes `data-size`, `data-label` and the project's class |
| `.plinth-select-label`       | `<label>`               | yes      | The label, with `for` pointing at the select                      |
| `.plinth-select-control`     | `<div>`                 | yes      | Holds the select and draws the chevron at its inline end          |
| `.plinth-icon`               | `<span>`                | no       | The leading icon, `data-size="sm"` and `aria-hidden="true"`       |
| `.plinth-select-input`       | `<select>`              | yes      | The select. Takes the `id` and every attribute but the class      |
| `<option value="" disabled>` | `<option>`              | no       | The placeholder, first, `selected` while nothing is chosen        |
| your options                 | `<option>`/`<optgroup>` | yes      | The choices, as the default slot                                  |
| `.plinth-select-description` | `<p>`                   | no       | The help line; its id is the select's id with `-description`      |
| `.plinth-select-error`       | `<p>`                   | no       | The error; its id is the select's id with `-error`                |

| Attribute          | On                     | Values                                 | Default |
| ------------------ | ---------------------- | -------------------------------------- | ------- |
| `data-size`        | `.plinth-select`       | `sm`, `md`                             | `md`    |
| `data-label`       | `.plinth-select`       | `hidden`: the label is hidden visually | none    |
| `aria-describedby` | `.plinth-select-input` | the description's id, then the error's | none    |
| `aria-invalid`     | `.plinth-select-input` | `true` with an error                   | none    |
| `disabled`         | `.plinth-select-input` | present when disabled                  | none    |
| `required`         | `.plinth-select-input` | present when a choice is required      | none    |

A missing or unknown `data-size` looks like md, and Blade, Vue and React print `md` for a size they
don't know. The chevron is drawn by CSS from tokens (no extra element); it takes no clicks, so the
whole select opens.

**The open list.** Where the browser lets a select be styled (`appearance: base-select`, in
Chromium-based browsers), the list looks like the [menu](menu.md): the raised surface, a hairline
edge, the container radius and a shadow, rows with a tint on hover and a check on the chosen one,
and group names like the menu's headings. It is still the browser's list, placed and opened by the
browser with its own keyboard. Other browsers draw their own list, in the field's colours.

## Props

The same names in every layer. Blade writes a camelCase prop in kebab-case (`hide-label`), as Vue
can; React takes the Vue props, with the options as `children`.

| Prop        | Blade                                            | Vue                    | React                                     | Default         |
| ----------- | ------------------------------------------------ | ---------------------- | ----------------------------------------- | --------------- |
| label       | `label="Role"`                                   | `label="Role"`         | `label="Role"`                            | required        |
| hideLabel   | `hide-label`                                     | `hide-label`           | `hideLabel`                               | off             |
| id          | `id="role"`                                      | `id="role"`            | `id="role"`                               | a generated one |
| size        | `size="sm"` (or a `Size` case)                   | `size="sm"`            | `size="sm"`                               | `md`            |
| placeholder | `placeholder="Choose a role"`                    | `placeholder="…"`      | `placeholder="…"`                         | none            |
| description | `description="…"`                                | `description="…"`      | `description="…"`                         | none            |
| error       | `:error="$errors->first('role')"`                | `:error="errors.role"` | `error={errors.role}`                     | none            |
| disabled    | `disabled`                                       | `disabled`             | `disabled`                                | off             |
| required    | `required`                                       | `required`             | `required`                                | off             |
| value       | `selected` on the option, or `wire:model="role"` | `v-model="role"`       | `value` and `onChange`, or `defaultValue` | none            |
| options     | the slot                                         | the default slot       | `children`                                | none            |
| icon        | `<x-slot:icon>`                                  | `#icon` slot           | `icon={<svg … />}`                        | none            |

**The attributes go to the select, not the root.** In Blade, `wire:model`, `x-model`, `name`,
`autocomplete`, `data-*` and `aria-*` land on the `<select>`; only `class` goes on the root, added
to Plinth's. Vue does the same with the attributes that fall through, and React with its props:
`className` on the root, and `value`, `defaultValue`, `onChange`, `name`, `ref` and every other
prop on the select. An attribute that clashes with one Plinth sets on the select
(`aria-describedby`) wins; a project that sets its own `aria-describedby` lists the error's id
(`<id>-error`) in it too, so the error is still read. Vue emits `update:modelValue` when the choice
changes, and the select's own `change` event reaches your listeners.

**The chosen option.** Vue's `v-model` and React's `value` hold the option's value as a string; an
empty string (or none) shows the placeholder. In Blade the server marks the chosen option itself,
with `selected` (`@selected($role === 'admin')`), or Livewire's `wire:model` does.

```blade tab="Blade"
<x-plinth::select label="Role" name="role" placeholder="Choose a role" :error="$errors->first('role')">
    <option value="admin" @selected(old('role') === 'admin')>Admin</option>
    <option value="viewer" @selected(old('role') === 'viewer')>Viewer</option>
</x-plinth::select>
```

```vue tab="Vue"
<PlinthSelect v-model="role" label="Role" placeholder="Choose a role">
  <option value="admin">Admin</option>
  <option value="viewer">Viewer</option>
</PlinthSelect>
```

```tsx tab="React"
import { PlinthSelect } from '@ptbdynamic/plinth/react';

<PlinthSelect
    label="Role"
    placeholder="Choose a role"
    value={role}
    onChange={(event) => setRole(event.target.value)}
    error={errors.role}
>
    <option value="admin">Admin</option>
    <option value="viewer">Viewer</option>
</PlinthSelect>;
```

## Accessibility

- **The label is the select's name**, tied to it with `for` and `id`, so tapping it focuses the
  select and screen readers announce it. Hidden with `hide-label`, it is still read.
- **It is a native `<select>`:** the keyboard (arrows, typing to jump, Enter, Escape), the screen
  reader's list and the phone's picker all come from the browser. Plinth adds no listbox.
- **The description and the error are read after the label,** through `aria-describedby`, and an
  error marks the select invalid (`aria-invalid="true"`). The error isn't a live region: after a
  submit, move focus to the first invalid field, and its error is read with it.
- **The placeholder is not a label**, and it isn't a choice: it is disabled, so it can't be picked
  again, and with `required` the browser refuses the form until a real option is chosen.
- **Colour is not the only cue:** an invalid select's edge is thicker as well as red, and the error
  says in words what to fix. The chevron is decorative and adds nothing to what is announced.
- **The focus ring** shows on the select whenever it has focus.
- **Touch:** on a touch screen the select is 40px tall. On a phone the text is 16px, so iOS doesn't
  zoom the page.

The markup contract is at the top of
[`packages/css/src/components/select.css`](../../packages/css/src/components/select.css).
