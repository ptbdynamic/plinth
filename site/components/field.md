# Field

A label, an optional description and an error around a control you bring: a select, a switch, or
a group of pills, radios or checkboxes. It gives every control the same label and messages as the
[text field](text-field.md) and the [textarea](textarea.md), and the ids the control points at,
so a screen reader reads the description and the error with it.

## When not to use it

- Around a [text field](text-field.md) or a [textarea](textarea.md): they have their own label,
  description and error.
- For an error about the whole form or the page, such as a failed save: that is a
  [callout](callout.md) above the form. A field's error says what is wrong with one value.
- As a heading for a section of a form. A group's legend names a few controls that answer one
  question, not a page of them.

## A group

Set **`group`** for controls that answer one question together: a row of filter pills, radios or
checkboxes. The field is a `<fieldset>`, the label is its `<legend>`, and the fieldset is
described by the description and the error. Each control inside keeps its own label.

```blade example
<x-plinth::field id="status" label="Status" group description="Show tickets in these states.">
    <x-plinth::pill-row>
        <x-plinth::pill selected>Open</x-plinth::pill>
        <x-plinth::pill>Pending</x-plinth::pill>
        <x-plinth::pill>Closed</x-plinth::pill>
    </x-plinth::pill-row>
</x-plinth::field>
```

## An error

The **`error`** prints under the control in the danger text colour, and says what to fix. In
Blade, pass the validation message (`:error="$errors->first('status')"`).

```blade example
<x-plinth::field id="status-error" label="Status" group required description="Show tickets in these states." error="Pick at least one status.">
    <x-plinth::pill-row>
        <x-plinth::pill>Open</x-plinth::pill>
        <x-plinth::pill>Pending</x-plinth::pill>
        <x-plinth::pill>Closed</x-plinth::pill>
    </x-plinth::pill-row>
</x-plinth::field>
```

## Disabled

`disabled` on a group's fieldset disables every control in it, natively, and fades the legend.

```blade example
<x-plinth::field id="status-disabled" label="Status" group disabled description="Filters are off while the export runs.">
    <x-plinth::pill-row>
        <x-plinth::pill selected>Open</x-plinth::pill>
        <x-plinth::pill>Pending</x-plinth::pill>
        <x-plinth::pill>Closed</x-plinth::pill>
    </x-plinth::pill-row>
</x-plinth::field>
```

## One control

Without `group`, the label is a `<label>` that points at the control's id, so the control takes
the field's **`id`**. The control sets `aria-describedby` to the description's and the error's
ids, and `aria-invalid="true"` when there is an error. Each layer gives you those: Vue's slot
props, React's children function, and in Blade `\BDynamic\Plinth\Support\Field::describedBy()`.

```blade
<x-plinth::field id="team" label="Team" required description="The team answers new tickets first." :error="$errors->first('team')">
    <select
        id="team"
        name="team"
        required
        aria-describedby="{{ \BDynamic\Plinth\Support\Field::describedBy('team', 'The team answers new tickets first.', $errors->first('team')) }}"
        @error('team') aria-invalid="true" @enderror
    >…</select>
</x-plinth::field>
```

A control that a `<label>` can't name (one that isn't an input, a select, a textarea or a button)
sets `aria-labelledby` to the label's id, `<id>-label`.

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                        | Element                                 | Required | What it is                                                         |
| --------------------------- | --------------------------------------- | -------- | ------------------------------------------------------------------ |
| `.plinth-field`             | `<div>`, or `<fieldset>` with `group`   | yes      | The root. Takes every attribute the app forwards                   |
| `.plinth-field-label`       | `<label for>`, or `<legend>` in a group | yes      | The label, with the id `<id>-label`                                |
| `.plinth-field-required`    | `<span>`                                | no       | `*` after the label, hidden from screen readers                    |
| the control                 | the app's                               | yes      | Between the label and the messages; one control takes the field id |
| `.plinth-field-description` | `<p>`                                   | no       | Under the control, with the id `<id>-description`                  |
| `.plinth-field-error`       | `<p>`                                   | no       | Under the description, with the id `<id>-error`                    |

| Attribute          | On                             | Values                                             | Default |
| ------------------ | ------------------------------ | -------------------------------------------------- | ------- |
| `id`               | a group's fieldset             | the field's id                                     | none    |
| `aria-describedby` | a group's fieldset             | the description's id, then the error's, when shown | none    |
| `data-label`       | `.plinth-field`                | `hidden`: the label is read but not seen           | none    |
| `disabled`         | a group's fieldset (the app's) | disables every control in it                       | none    |

The description and the error print only with text. The field has no focusable element of its
own: the control brings its focus ring.

## Props

The same names in every layer. Blade writes a camelCase prop in kebab-case (`hide-label`), as Vue
can; React takes the Vue props, with the slot as `children`.

| Prop        | Blade                             | Vue                    | React                 | Default         |
| ----------- | --------------------------------- | ---------------------- | --------------------- | --------------- |
| label       | `label="Team"`                    | `label="Team"`         | `label="Team"`        | required        |
| hideLabel   | `hide-label`                      | `hide-label`           | `hideLabel`           | off             |
| id          | `id="team"`                       | `id="team"`            | `id="team"`           | a generated one |
| group       | `group`                           | `group`                | `group`               | off             |
| required    | `required`                        | `required`             | `required`            | off             |
| description | `description="…"`                 | `description="…"`      | `description="…"`     | none            |
| error       | `:error="$errors->first('team')"` | `:error="errors.team"` | `error={errors.team}` | none            |
| control     | the slot                          | the default slot       | `children`            | none            |

**The attributes go to the root:** in Blade through `$attributes` (`class`, `data-*`, `aria-*`,
`wire:key`, `x-show`, and on a group `disabled` and `name`), in Vue by falling through, and in
React as props (`className`, added to Plinth's, `data-*`, `aria-*`, `disabled` and `ref`). An
attribute that clashes with one Plinth sets on the root (a group's `aria-describedby`) wins.

`required` only prints the mark. The control says it is required itself: `required` on an input
or a select, `aria-required="true"` on a radio group; for a group of checkboxes, say in the
description how many to pick.

Vue's default slot and React's children function take `{ id, labelId, describedBy, invalid }`:
the control's id, the label's id, what its `aria-describedby` lists (nothing in a group, whose
fieldset has it) and whether there is an error. `fieldControl()` returns the same in both.

```blade tab="Blade"
@php($describedBy = \BDynamic\Plinth\Support\Field::describedBy('team', 'Who answers first.', $errors->first('team')))
<x-plinth::field id="team" label="Team" description="Who answers first." :error="$errors->first('team')">
    <select id="team" wire:model="team" aria-describedby="{{ $describedBy }}">…</select>
</x-plinth::field>
```

```vue tab="Vue"
<PlinthField label="Team" :error="errors.team" v-slot="{ id, describedBy, invalid }">
  <select :id="id" v-model="team" :aria-describedby="describedBy" :aria-invalid="invalid || undefined">…</select>
</PlinthField>
```

```tsx tab="React"
import { PlinthField } from '@ptbdynamic/plinth/react';

<PlinthField label="Team" error={errors.team}>
    {({ id, describedBy, invalid }) => (
        <select
            id={id}
            value={team}
            onChange={onTeam}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
        >
            …
        </select>
    )}
</PlinthField>;
```

## Accessibility

- **The label names the control:** a `<label for>` for one control, so tapping it focuses the
  control, or a `<legend>` that a screen reader reads as the group's name when focus enters it.
  Hidden with `hide-label`, it is still read.
- **The description and the error are read with the control** (or as the group's description),
  through `aria-describedby`. The error isn't a live region: after a submit, move focus to the
  first invalid control, and its error is read with it.
- **Colour is not the only cue:** the error says in words what to fix, and the control marks
  itself invalid.
- **The required mark is hidden from screen readers;** the control's own `required` or
  `aria-required` is what they announce.
- The field has no focus ring or touch target of its own: the control brings them.

The markup contract is at the top of
[`packages/css/src/components/field.css`](../../packages/css/src/components/field.css).
