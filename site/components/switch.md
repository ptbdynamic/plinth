# Switch

A setting that is on or off and takes effect as soon as it is flipped: _Enabled_ on a sign-in
provider, _Passkeys_, _Close tickets automatically_. It is a native checkbox with the switch
role, with its label beside it and optionally a description and an error under the label, wired
the way a [field](field.md) wires its control. For a choice that is only sent with a form's other
answers, use a [checkbox](checkbox.md).

## When not to use it

- For a choice sent with the form, such as accepting terms: use a [checkbox](checkbox.md).
- For a choice between more than two options: radio buttons, or a [pill row](pill-row.md).
- For an action, such as _Archive_ or _Publish now_: use a [button](button.md). A switch
  describes a state, not something to do.

## The label

Every switch has a label beside it that names the setting, not the action: _Enabled_, not _Turn
on_. Tapping the label flips the switch, so the two are one target. On, the track fills with the
accent colour and the thumb moves to the end.

```blade example
<x-plinth::switch id="docs-enabled" label="Enabled" />
<x-plinth::switch id="docs-enabled-on" label="Enabled" checked />
```

## Description and error

The **description** is a line under the label that says what the setting does. The **error**
says why it can't be on, and how to fix it: _Add a client ID before you turn it on_. With an
error the switch is marked invalid (`aria-invalid`), and screen readers read the description and
the error after the label.

```blade example
<x-plinth::switch id="docs-passkeys" label="Passkeys" description="People can sign in with a passkey instead of a password." checked />
<x-plinth::switch id="docs-sso" label="Single sign-on" error="Add a client ID before you turn it on." />
```

## Settings

A list of settings is switches one under the other. Each applies on its own, so the app saves
it when it is flipped (`wire:model.live`, or Vue's `update:modelValue`), and shows an error under
the one that failed.

```blade example
<div style="display: grid; gap: var(--plinth-space-3);">
    <x-plinth::switch id="docs-setting-email" label="Email sign-in" description="A link sent to the address on the account." checked />
    <x-plinth::switch id="docs-setting-passkeys" label="Passkeys" checked />
    <x-plinth::switch id="docs-setting-sso" label="Single sign-on" description="Needs a provider set up first." disabled />
</div>
```

## Disabled

**Disabled** fades the switch and its label, and it can't be focused or sent with the form. Say why
in the description, when the reason isn't plain.

```blade example
<x-plinth::switch id="docs-disabled" label="Enabled" disabled />
<x-plinth::switch id="docs-disabled-on" label="Audit log" description="Your administrator turned this on." checked disabled />
```

## In a plain form

On, a switch is sent like a checkbox: its `name` with its `value` (`on` without one). Off, it is
not sent at all. An app that must hear "off" from a form without script puts a hidden input with
the same name and `0` before the switch; the switch's value comes last and wins when it is on.

```blade
<input type="hidden" name="enabled" value="0">
<x-plinth::switch label="Enabled" name="enabled" value="1" :checked="$provider->enabled" />
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                         | Element   | Required | What it is                                                                               |
| ---------------------------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `.plinth-switch`             | `<div>`   | yes      | The root. Takes the project's class                                                      |
| `.plinth-switch-input`       | `<input>` | yes      | `type="checkbox"` with `role="switch"`. Takes the `id` and every attribute but the class |
| `.plinth-switch-label`       | `<label>` | yes      | The label beside the switch, with `for` pointing at the input                            |
| `.plinth-switch-description` | `<p>`     | no       | The description; its id is the input's id with `-description`                            |
| `.plinth-switch-error`       | `<p>`     | no       | The error; its id is the input's id with `-error`                                        |

| Attribute          | On                     | Values                                 | Default  |
| ------------------ | ---------------------- | -------------------------------------- | -------- |
| `role`             | `.plinth-switch-input` | `switch`                               | `switch` |
| `checked`          | `.plinth-switch-input` | present when on                        | none     |
| `aria-describedby` | `.plinth-switch-input` | the description's id, then the error's | none     |
| `aria-invalid`     | `.plinth-switch-input` | `true` with an error                   | none     |
| `disabled`         | `.plinth-switch-input` | present when disabled                  | none     |

The switch's state is the input's checked state; it needs no `aria-checked`. The track is
`--plinth-switch-width` by `--plinth-switch-height` (32 by 20px).

## Props

The same names in every layer. React takes the Vue props, and its native `checked` or
`defaultChecked` and `onChange` for the value.

| Prop        | Blade                                    | Vue                       | React                    | Default         |
| ----------- | ---------------------------------------- | ------------------------- | ------------------------ | --------------- |
| label       | `label="Enabled"`                        | `label="Enabled"`         | `label="Enabled"`        | required        |
| id          | `id="enabled"`                           | `id="enabled"`            | `id="enabled"`           | a generated one |
| description | `description="…"`                        | `description="…"`         | `description="…"`        | none            |
| error       | `:error="$errors->first('enabled')"`     | `:error="errors.enabled"` | `error={errors.enabled}` | none            |
| disabled    | `disabled`                               | `disabled`                | `disabled`               | off             |
| checked     | `wire:model.live="enabled"` or `checked` | `v-model="enabled"`       | `checked` and `onChange` | off             |

**The attributes go to the input, not the root.** In Blade, `wire:model`, `x-model`, `name`,
`value`, `checked`, `data-*` and `aria-*` land on the `<input>`; only `class` goes on the root,
added to Plinth's. Vue does the same with the attributes that fall through, and React with its
props: `className` on the root, and `checked`, `onChange`, `name`, `ref` and every other prop on
the input. An attribute that clashes with one Plinth sets on the input (`role`,
`aria-describedby`) wins. Vue's `v-model` is a boolean, and it emits `update:modelValue` when the
switch is flipped; the input's own `change` event reaches your listeners.

```blade tab="Blade"
<x-plinth::switch
    label="Enabled"
    wire:model.live="enabled"
    :error="$errors->first('enabled')"
/>
```

```vue tab="Vue"
<PlinthSwitch v-model="provider.enabled" label="Enabled" @change="save(provider)" />
```

```tsx tab="React"
import { PlinthSwitch } from '@ptbdynamic/plinth/react';

<PlinthSwitch label="Enabled" checked={enabled} onChange={(event) => save(event.target.checked)} />;
```

## Accessibility

- **It is a native checkbox with the switch role:** screen readers announce a switch that is on or
  off, Space flips it, and a form sends it with no script.
- **The label is its name,** tied to the input with `for` and `id`; tapping it flips the switch.
- **The description and the error are read after the label,** through `aria-describedby`, and an
  error marks the switch invalid.
- **Colour is not the only cue:** the thumb moves to the end when it is on. In forced colours the
  track and thumb take the system's colours.
- **Motion:** the thumb slides on `--plinth-duration-fast`, which is 0 with reduced motion.
- **The focus ring** shows on the switch whenever it has focus.
- **Touch:** the label fills the row beside the switch, so the two are one target, 40px tall on a
  touch screen.

The markup contract is at the top of
[`packages/css/src/components/switch.css`](../../packages/css/src/components/switch.css).
