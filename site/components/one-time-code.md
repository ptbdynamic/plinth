# One-time code

A short code the person copies in from somewhere else: an authenticator app when they turn on
two-factor sign-in or sign in with it, a text message, an email. It is one input, shown as a row
of digit cells so the code is easy to read while typing, with the [field](field.md)'s label,
description and error.

## When not to use it

- For a password, a PIN the person chose, or anything that isn't sent to them: use a
  [text field](text-field.md) with `type="password"`.
- For a code with letters, such as a recovery code like `K7QX-2M9P`: use a
  [text field](text-field.md). This one keeps only digits.
- For a number the person types, such as a quantity: use a [text field](text-field.md) with
  `inputmode="numeric"`.

## One input, not one box per digit

The cells are drawn on one real `<input>`. Pasting the whole code, the phone offering a code it was
just sent, a password manager filling it in and a screen reader all work as with any field, which
a row of separate boxes breaks. The input brings up the number pad (`inputmode="numeric"`) and
asks the phone for a code it received (`autocomplete="one-time-code"`), and its `pattern` only
accepts the right number of digits.

```blade example
<x-plinth::one-time-code id="docs-code" label="Verification code" description="Open your authenticator app and enter the 6-digit code it shows." />
```

Blade (with Alpine), Vue and React keep only the digits of whatever is typed, pasted or filled in,
so a paste of _123 456_ or _Your code is 123456_ fills the field, and the code can't grow past its
length. The plain markup without them still has the pattern and the length, and the form says
when the code doesn't match.

## Length

A code has **4 to 8 digits**, **6** by default, as authenticator apps use. A text message often
sends 4; backup codes can be 8. The input is as wide as its cells, and an unknown length is 6.

```blade example
<x-plinth::one-time-code id="docs-sms" label="Code from the text message" length="4" description="We sent it to the number ending in 42." />
<x-plinth::one-time-code id="docs-backup" label="Backup code" length="8" />
```

## Sending it once it's complete

With **autosubmit**, the input's form is sent as soon as the last digit is in, so the person
doesn't have to press a button after pasting or after the phone fills the code. Keep the button
anyway, for when the code comes back wrong and they type it again, and only use it on a form with
nothing else to fill in. Vue emits `complete` and React calls `onComplete` with the code whenever
it reaches its length, with or without autosubmit.

```blade example
<x-plinth::one-time-code id="docs-autosubmit" label="Verification code" autosubmit description="We check the code as soon as every digit is in." />
```

## Error and disabled

The **error** says what went wrong and what to do: _That code didn't work. Enter the newest one
from your app_, not _Invalid code_. It marks the input invalid (`aria-invalid`) and its edge turns
red and thicker, so colour isn't the only cue. Clear the field after a wrong code, so the next one
can be pasted in straight away, and move focus back to it.

**Disabled** fades the field, and it can't be focused or sent; use it while the code is checked,
not to hide the field.

```blade example
<x-plinth::one-time-code id="docs-error" label="Verification code" value="204861" error="That code didn't work. Enter the newest one from your app." />
<x-plinth::one-time-code id="docs-disabled" label="Verification code" value="204816" disabled />
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it. The root,
the label, the description and the error are the [field](field.md)'s.

| Part                          | Element   | Required | What it is                                                         |
| ----------------------------- | --------- | -------- | ------------------------------------------------------------------ |
| `.plinth-field`               | `<div>`   | yes      | The root, with `.plinth-one-time-code`, `data-label` and the class |
| `.plinth-field-label`         | `<label>` | yes      | The label, with `for` pointing at the input                        |
| `.plinth-one-time-code-input` | `<input>` | yes      | The input. Takes the `id` and every attribute but the class        |
| `.plinth-field-description`   | `<p>`     | no       | The help line; its id is the input's id with `-description`        |
| `.plinth-field-error`         | `<p>`     | no       | The error; its id is the input's id with `-error`                  |

| Attribute          | On                            | Values                                 | Default         |
| ------------------ | ----------------------------- | -------------------------------------- | --------------- |
| `data-label`       | `.plinth-field`               | `hidden`: the label is hidden visually | none            |
| `type`             | `.plinth-one-time-code-input` | `text`                                 | `text`          |
| `inputmode`        | `.plinth-one-time-code-input` | `numeric`                              | `numeric`       |
| `autocomplete`     | `.plinth-one-time-code-input` | `one-time-code`                        | `one-time-code` |
| `maxlength`        | `.plinth-one-time-code-input` | `4` to `8`; the cells follow it        | `6`             |
| `pattern`          | `.plinth-one-time-code-input` | `[0-9]{n}`, for the length             | `[0-9]{6}`      |
| `aria-describedby` | `.plinth-one-time-code-input` | the description's id, then the error's | none            |
| `aria-invalid`     | `.plinth-one-time-code-input` | `true` with an error                   | none            |
| `disabled`         | `.plinth-one-time-code-input` | present when disabled                  | none            |

The digits run left to right in a right-to-left page too, as codes are read.

## Props

The same names in every layer. Blade writes a camelCase prop in kebab-case (`hide-label`), as Vue
can; React takes the Vue props.

| Prop        | Blade                              | Vue                    | React                  | Default         |
| ----------- | ---------------------------------- | ---------------------- | ---------------------- | --------------- |
| label       | `label="Verification code"`        | `label="…"`            | `label="…"`            | required        |
| hideLabel   | `hide-label`                       | `hide-label`           | `hideLabel`            | off             |
| id          | `id="code"`                        | `id="code"`            | `id="code"`            | a generated one |
| length      | `length="4"`                       | `:length="4"`          | `length={4}`           | `6`             |
| description | `description="…"`                  | `description="…"`      | `description="…"`      | none            |
| error       | `:error="$errors->first('code')"`  | `:error="errors.code"` | `error={errors.code}`  | none            |
| disabled    | `disabled`                         | `disabled`             | `disabled`             | off             |
| autosubmit  | `autosubmit`                       | `autosubmit`           | `autosubmit`           | off             |
| value       | `wire:model="code"` or `value="…"` | `v-model="code"`       | `value` and `onChange` | none            |

**The attributes go to the input, not the root.** In Blade, `wire:model`, `x-model`, `name`,
`value`, `required`, `data-*` and `aria-*` land on the `<input>`; only `class` goes on the root,
added to Plinth's. Vue does the same with the attributes that fall through, and React with its
props: `className` on the root, and `value`, `onChange`, `name`, `ref` and every other prop on the
input. An attribute that clashes with one Plinth sets on the input (`autocomplete`,
`aria-describedby`) wins; a project that sets its own `aria-describedby` lists the error's id
(`<id>-error`) in it too. Vue emits `update:modelValue` with the digits and `complete` with the
code once it reaches its length; React's `onChange` sees the digits only, and `onComplete` gets
the code.

```blade tab="Blade"
<form wire:submit="confirm">
    <x-plinth::one-time-code
        label="Verification code"
        wire:model="code"
        autosubmit
        :error="$errors->first('code')"
    />
</form>
```

```vue tab="Vue"
<PlinthOneTimeCode
    v-model="code"
    label="Verification code"
    :error="errors.code"
    @complete="confirm"
/>
```

```tsx tab="React"
import { PlinthOneTimeCode } from '@ptbdynamic/plinth/react';

<PlinthOneTimeCode
    label="Verification code"
    value={code}
    onChange={(event) => setCode(event.target.value)}
    onComplete={confirm}
    error={errors.code}
/>;
```

## Accessibility

- **One input,** so screen readers announce one field with its label and read the code as it is
  typed, and paste and autofill work.
- **The label is the field's name,** tied to the input with `for` and `id`. Hidden with
  `hide-label`, it is still read; keep it shown where the page has more than this field.
- **The description and the error are read after the label,** through `aria-describedby`, and an
  error marks the input invalid. After a wrong code, move focus back to the field.
- **Colour is not the only cue:** an invalid input's edge is thicker as well as red, and the error
  says in words what to fix.
- **The focus ring** shows on the input whenever it has focus.
- **Touch:** the input is 40px tall at every width, and its digits are 18px, so iOS doesn't zoom
  the page.
- **Autosubmit** sends the form without a button press; say so in the description where the person
  might not expect it, and keep the submit button.

The markup contract is at the top of
[`packages/css/src/components/one-time-code.css`](../../packages/css/src/components/one-time-code.css).
