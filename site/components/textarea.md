# Textarea

Several lines of text for a person to write: a message, a reply, a note. It has the same label,
description and error as the [text field](text-field.md), and with `grow` it grows with what is
typed, then scrolls.

## When not to use it

- For one line, such as a name, an email address or a search: use the [text field](text-field.md).
- For formatted text with bold, links or lists: that needs a rich-text editor.
- For code to read: use a [code block](code-block.md).

## The label

Every textarea has a label: it is what screen readers announce, and tapping it focuses the field.
A placeholder is not a label. **A hidden label** (`hide-label`) is still read by screen readers but
isn't shown; use it only where the purpose is plain without it, such as a reply box under a thread.

```blade example
<x-plinth::textarea id="docs-note" label="Note" placeholder="Anything the team should know" />
```

## Growing with its content

With **grow** the textarea starts at `rows` lines (3 by default) and grows as the person types, up
to `max-rows` (8 by default); past that it scrolls. It uses the browser's `field-sizing: content`,
so no script measures it. Where the browser doesn't have it yet, the textarea keeps its `rows`
lines and the person can drag it taller, as without grow.

Use grow for a reply or a comment box, where most messages are short and a few are long. Without
grow, set `rows` to how long a usual answer is.

```blade example
<x-plinth::textarea id="docs-reply" label="Reply" placeholder="Write a reply" grow rows="2" max-rows="6" />
```

## Description and error

The **description** is a line under the field that helps fill it in. The **error** says what is
wrong and how to fix it; with it the field is marked invalid (`aria-invalid`) and its edge turns red
and thicker, so colour isn't the only cue.

```blade example
<x-plinth::textarea id="docs-message" label="Message" description="The customer sees this reply." />
<x-plinth::textarea id="docs-message-error" label="Message" error="Write a reply before you send it." />
```

## Disabled and read-only

**Disabled** fades the field, and it can't be focused or sent with the form. **Read-only** keeps
the text readable, focusable and selectable, without the field's fill.

```blade example
<x-plinth::textarea id="docs-disabled" label="Reply" placeholder="Replies are closed" disabled />
<x-plinth::textarea id="docs-readonly" label="Original message" readonly>Thanks for writing in. The refund went out this morning.</x-plinth::textarea>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                           | Element      | Required | What it is                                                             |
| ------------------------------ | ------------ | -------- | ---------------------------------------------------------------------- |
| `.plinth-textarea`             | `<div>`      | yes      | The root. Takes `data-label` and the project's class                   |
| `.plinth-textarea-label`       | `<label>`    | yes      | The label, with `for` pointing at the textarea                         |
| `.plinth-textarea-input`       | `<textarea>` | yes      | The textarea. Takes the `id`, `rows` and every attribute but the class |
| `.plinth-textarea-description` | `<p>`        | no       | The help line; its id is the textarea's id with `-description`         |
| `.plinth-textarea-error`       | `<p>`        | no       | The error; its id is the textarea's id with `-error`                   |

| Attribute          | On                       | Values                                                               | Default |
| ------------------ | ------------------------ | -------------------------------------------------------------------- | ------- |
| `data-label`       | `.plinth-textarea`       | `hidden`: the label is hidden visually                               | none    |
| `rows`             | `.plinth-textarea-input` | the lines it shows, and where it starts when it grows                | `3`     |
| `data-grow`        | `.plinth-textarea-input` | present when it grows                                                | none    |
| `style`            | `.plinth-textarea-input` | with grow, `--plinth-textarea-rows` and `--plinth-textarea-max-rows` | none    |
| `aria-describedby` | `.plinth-textarea-input` | the description's id, then the error's                               | none    |
| `aria-invalid`     | `.plinth-textarea-input` | `true` with an error                                                 | none    |
| `disabled`         | `.plinth-textarea-input` | present when disabled                                                | none    |
| `readonly`         | `.plinth-textarea-input` | present when read-only                                               | none    |

The maximum is never below `rows`.

## Props

The same names in every layer. Blade writes a camelCase prop in kebab-case (`max-rows`), as Vue
can; React takes the Vue props.

| Prop        | Blade                              | Vue                     | React                  | Default         |
| ----------- | ---------------------------------- | ----------------------- | ---------------------- | --------------- |
| label       | `label="Reply"`                    | `label="Reply"`         | `label="Reply"`        | required        |
| hideLabel   | `hide-label`                       | `hide-label`            | `hideLabel`            | off             |
| id          | `id="reply"`                       | `id="reply"`            | `id="reply"`           | a generated one |
| rows        | `rows="5"`                         | `:rows="5"`             | `rows={5}`             | `3`             |
| grow        | `grow`                             | `grow`                  | `grow`                 | off             |
| maxRows     | `max-rows="10"`                    | `:max-rows="10"`        | `maxRows={10}`         | `8`             |
| description | `description="…"`                  | `description="…"`       | `description="…"`      | none            |
| error       | `:error="$errors->first('reply')"` | `:error="errors.reply"` | `error={errors.reply}` | none            |
| disabled    | `disabled`                         | `disabled`              | `disabled`             | off             |
| readonly    | `readonly`                         | `readonly`              | `readOnly`             | off             |
| value       | `wire:model="reply"` or the slot   | `v-model="reply"`       | `value` and `onChange` | none            |

**The attributes go to the textarea, not the root.** In Blade, `wire:model`, `x-model`, `name`,
`placeholder`, `maxlength`, `required`, `data-*` and `aria-*` land on the `<textarea>`; only
`class` goes on the root, added to Plinth's. Without `wire:model`, Blade's slot is the textarea's
text. Vue does the same with the attributes that fall through, and React with its props:
`className` on the root, and `value`, `onChange`, `name`, `ref` and every other prop on the
textarea. A `style` is added after the grow's custom properties; any other attribute that clashes
with one Plinth sets wins. Vue emits `update:modelValue` as the person types.

```blade tab="Blade"
<x-plinth::textarea
    label="Reply"
    hide-label
    grow
    wire:model="reply"
    placeholder="Write a reply"
    :error="$errors->first('reply')"
/>
```

```vue tab="Vue"
<PlinthTextarea v-model="reply" label="Reply" hide-label grow placeholder="Write a reply" />
```

```tsx tab="React"
import { PlinthTextarea } from '@ptbdynamic/plinth/react';

<PlinthTextarea
    label="Reply"
    grow
    value={reply}
    onChange={(event) => setReply(event.target.value)}
/>;
```

## Accessibility

- **The label is the field's name**, tied to the textarea with `for` and `id`. Hidden with
  `hide-label`, it is still read.
- **The description and the error are read after the label,** through `aria-describedby`, and an
  error marks the field invalid. After a submit, move focus to the first invalid field.
- **Colour is not the only cue:** an invalid field's edge is thicker as well as red.
- **The focus ring** shows on the textarea whenever it has focus.
- **On a phone the text is 16px,** so iOS doesn't zoom the page; the textarea is at least 40px
  tall.
- A growing textarea scrolls past its maximum, so a long message never pushes the page's actions
  out of reach.

The markup contract is at the top of
[`packages/css/src/components/textarea.css`](../../packages/css/src/components/textarea.css).
