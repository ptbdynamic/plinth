# Icon

An SVG sized by Plinth (16, 20 or 24px) and coloured by the text around it: one of Plinth's
built-in interface glyphs by `name`, or the project's own SVG in the slot, inline or as a sprite
`<use>`, drawn with `currentColor`.

## When not to use it

- As a button: an icon that does something is an [icon button](icon-button.md), which brings the
  focus ring, the touch target and the accessible name.
- As the only way to say something important. Put the words next to it, or give it a `label`.
- For a status: that is a [badge](badge.md), which has words.

## Built-in glyphs

Plinth draws the handful of interface glyphs every product needs, on a 24 × 24 grid with a 2-unit
round stroke, so they line up with each other and with Plinth's sizes. Use one by `name`:

```blade example
<x-plinth::icon name="menu" />
<x-plinth::icon name="close" />
<x-plinth::icon name="back" />
<x-plinth::icon name="chevron-left" />
<x-plinth::icon name="chevron-right" />
<x-plinth::icon name="chevron-up" />
<x-plinth::icon name="chevron-down" />
<x-plinth::icon name="check" />
<x-plinth::icon name="plus" />
<x-plinth::icon name="search" />
<x-plinth::icon name="more" />
<x-plinth::icon name="external" />
<x-plinth::icon name="sign-out" />
<x-plinth::icon name="sun" />
<x-plinth::icon name="moon" />
<x-plinth::icon name="system" />
<x-plinth::icon name="info" />
<x-plinth::icon name="warning" />
```

| Name                                                          | For                                             |
| ------------------------------------------------------------- | ----------------------------------------------- |
| `menu`, `close`                                               | opening and closing navigation, sheets, dialogs |
| `back`                                                        | going up a level or back a step                 |
| `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down` | paging, disclosure, a row that leads somewhere  |
| `check`, `plus`, `search`, `more`                             | done, add, search, more actions                 |
| `external`                                                    | a link that leaves the site                     |
| `sign-out`                                                    | signing out                                     |
| `sun`, `moon`, `system`                                       | the light, dark and system theme                |
| `info`, `warning`                                             | a note, a caution                               |

The set is small on purpose: it is not an icon library. Brand and domain icons (a product's logo,
an invoice, a tractor) stay in the app and go in the slot. A name Plinth doesn't know shows the
slot instead, and with a name the slot is ignored. In Blade, `name` also takes a `Glyph` case.

## Sizes

**sm** (16px) inline with small text and in dense rows, **md** (20px, the default) next to body
text and in controls, **lg** (24px) on its own or in a header.

```blade example
<x-plinth::icon name="check" size="sm" />
<x-plinth::icon name="check" />
<x-plinth::icon name="check" size="lg" />
```

## Colour

Plinth sets no fill or stroke in CSS, so outline and filled icon sets both keep theirs. Draw the SVG with
`currentColor` and the icon takes the colour of the text around it.

```blade example
<span>
    <x-plinth::icon size="sm"><x-site.glyph name="check" /></x-plinth::icon>
    Invoice paid
</span>
```

## Decorative or meaningful

An icon is **decorative** by default and hidden from screen readers (`aria-hidden="true"`): most
icons sit next to words that already say what they mean. Give it a `label` (or an `aria-label`)
only when the icon carries meaning that nothing next to it says; it then becomes an image with
that name.

```blade example
<x-plinth::icon name="warning" label="Warning" />
```

## Direction

Set `mirror` on icons that point a direction (arrows, chevrons, back, send), so they flip in
right-to-left text; it changes nothing in left-to-right text. The built-in glyphs that point a
direction (`back`, `chevron-left`, `chevron-right`, `sign-out`) flip without it.

```blade example
<x-plinth::icon mirror><x-site.glyph name="arrow-right" /></x-plinth::icon>
<span dir="rtl"><x-plinth::icon mirror><x-site.glyph name="arrow-right" /></x-plinth::icon></span>
<span dir="rtl"><x-plinth::icon name="back" /></span>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part           | Element  | Required | What it is                                                    |
| -------------- | -------- | -------- | ------------------------------------------------------------- |
| `.plinth-icon` | `<span>` | yes      | The root. Takes the attributes below and any the app forwards |
| `<svg>`        | `<svg>`  | yes      | The built-in glyph, or the project's SVG from the slot        |

| Attribute            | On             | Values                                       | Default |
| -------------------- | -------------- | -------------------------------------------- | ------- |
| `data-size`          | `.plinth-icon` | `sm`, `md`, `lg`                             | `md`    |
| `data-icon`          | `.plinth-icon` | the glyph's name, only with a built-in glyph | none    |
| `data-mirror`        | `.plinth-icon` | present to flip in right-to-left text        | absent  |
| `aria-hidden`        | `.plinth-icon` | `true` when decorative                       | `true`  |
| `role`, `aria-label` | `.plinth-icon` | `img` and the label, when it has one         | none    |

A built-in glyph's `<svg>` is `viewBox="0 0 24 24"` with `fill="none"`, `stroke="currentColor"`,
`stroke-width="2"` and round caps and joins. A missing or unknown `data-size` is `md`.

## Props

The same names in every layer. React takes the Vue props, with the SVG as `children`.

| Prop   | Blade                                  | Vue               | React             | Default |
| ------ | -------------------------------------- | ----------------- | ----------------- | ------- |
| name   | `name="menu"` (or a `Glyph` case)      | `name="menu"`     | `name="menu"`     | none    |
| size   | `size="lg"` (or a `Size` case)         | `size="lg"`       | `size="lg"`       | `md`    |
| label  | `label="Warning"` (or an `aria-label`) | `label="Warning"` | `label="Warning"` | none    |
| mirror | `mirror`                               | `mirror`          | `mirror`          | off     |
| SVG    | the slot, without a `name`             | the default slot  | `children`        | none    |

The glyphs' names are `iconNames` in Vue and React (with the `IconName` type), and their SVG is
`iconGlyph(name)`.

Extra attributes (`class`, `id`, `data-*`) reach the `<span>`; in React, `className` and `ref` do.

## Accessibility

- Decorative by default: `aria-hidden="true"`, so screen readers skip it.
- With a `label`, the span gets `role="img"` and the label as `aria-label`, and the SVG inside is
  presentational. A blank label leaves the icon decorative.
- It is not focusable and has no touch target; put it in a button or a link to make it do
  something.
- In forced-colours mode the icon takes the system's text colour, since it draws with
  `currentColor`.

The markup contract is at the top of
[`packages/css/src/components/icon.css`](../../packages/css/src/components/icon.css).
