# Meter

A value against a limit: _spend this month_ against a monthly cap, _runs used_ against a quota,
_storage used_. It has a label, the numbers in words, a bar, and an optional line under it, and
its tone changes as the value nears or passes the limit. It fills the column it sits in: a page,
a stat tile or a list row.

## When not to use it

- For a task under way (an upload, an import), use a native `<progress>`: a meter measures an
  amount, not how far a job has got.
- For one number with no limit, use a [stat](stat.md).
- For a status in words (_Paused_, _Over the cap_), use a [badge](badge.md).

## Value and limit

The **value** is the amount so far, **min** and **max** the range (0 and 100 unless you say
otherwise). The **value text** is the numbers in words, formatted and translated by the app,
units and all: _€38 of €150_, _640 of 1,000 runs_, _7.5 GB of 10 GB_. Screen readers hear it as
the meter's value. The optional **description** says what happens at the limit.

```blade example
<x-plinth::meter label="Spend this month" :value="38" :max="150" value-text="€38 of €150" description="Runs pause at €150." />
```

Without a value text the bar holds the bare number, and screen readers say the browser's own
reading of it, usually a percentage.

## Tone from the numbers

Give **low**, **high** and **optimum**, as on a native `<meter>`, and the numbers choose the tone
as the browser chooses the meter's region. For a cap, the optimum is 0: up to `low` the meter is
neutral, past it warning, past `high` danger. Past `max` the bar is full and a cap's meter is
danger, even without `high`; say by how much in the words.

```blade example
<x-plinth::meter label="Spend this month" :value="38" :max="150" :low="105" :high="135" :optimum="0" value-text="€38 of €150" description="Runs pause at €150." />
<x-plinth::meter label="Spend this month" :value="120" :max="150" :low="105" :high="135" :optimum="0" value-text="€120 of €150" description="Runs pause at €150." />
<x-plinth::meter label="Spend this month" :value="142" :max="150" :low="105" :high="135" :optimum="0" value-text="€142 of €150" description="Runs pause at €150, in €8." />
<x-plinth::meter label="Spend this month" :value="162" :max="150" :low="105" :high="135" :optimum="0" value-text="€162 of €150" description="Over the cap by €12. Runs are paused." />
```

Where a higher value is better, put the optimum above `high`: past `high` is neutral, between
`low` and `high` warning, under `low` danger. With the optimum between `low` and `high`, a value
inside them is neutral and one outside warning. Without `low`, `high` or `optimum` every value is
neutral. The numbers never give success: that tone comes only from the `tone` prop.

| Region             | Tone        | Example               |
| ------------------ | ----------- | --------------------- |
| optimum            | **neutral** | _€38 of €150_         |
| suboptimal         | **warning** | _€120 of €150_        |
| even less good     | **danger**  | _€142 of €150_        |
| past a cap's `max` | **danger**  | _Over the cap by €12_ |

## A tone of your own

The **tone** prop (neutral, success, warning, danger) sets the tone whatever the numbers say: a
quota met is a success, a storage limit the app treats as a warning. It colours the bar and the
description, and puts the tone's icon before the description.

```blade example
<x-plinth::meter label="Checks passed" :value="46" :max="50" value-text="46 of 50" description="Above the target of 45." tone="success" />
<x-plinth::meter label="Storage" :value="7.5" :max="10" value-text="7.5 GB of 10 GB" description="Old exports are removed after 30 days." tone="warning" />
```

## On a tile

The meter has no surface of its own. On a dashboard, put it in a tile with the stat's surface, or
under a list row's text; the page gives it its width.

```blade tab="Blade"
<div class="plinth-stat">
    <x-plinth::meter
        label="Spend this month"
        :value="$spend"
        :max="$cap"
        :low="$cap * 0.7"
        :high="$cap * 0.9"
        :optimum="0"
        :value-text="__(':spend of :cap', ['spend' => Number::currency($spend, 'EUR'), 'cap' => Number::currency($cap, 'EUR')])"
    />
</div>
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                        | Element            | Required | What it is                                                              |
| --------------------------- | ------------------ | -------- | ----------------------------------------------------------------------- |
| `.plinth-meter`             | `<div>`            | yes      | The root. Takes `data-tone` and forwarded attributes                    |
| `.plinth-meter-label`       | `<label>`          | yes      | What is measured, the meter's name, with `for` pointing at the meter    |
| `.plinth-meter-value`       | `<span>`           | no       | The value text, hidden from screen readers: the bar reads it out        |
| `.plinth-meter-bar`         | `<meter>`          | yes      | The bar. Takes the `id`, the numbers, and the value text as its content |
| `.plinth-meter-description` | `<span>`           | no       | The line under the bar; its id is the meter's with `-description`       |
| `.plinth-meter-tone`        | `<span>` (an icon) | no       | The tone's icon, first in the description; not for neutral              |

| Attribute                | On                  | Values                                       | Default          |
| ------------------------ | ------------------- | -------------------------------------------- | ---------------- |
| `data-tone`              | `.plinth-meter`     | `neutral`, `success`, `warning`, `danger`    | from the numbers |
| `min`, `max`             | `.plinth-meter-bar` | numbers                                      | `0`, `100`       |
| `low`, `high`, `optimum` | `.plinth-meter-bar` | numbers, printed only when given             | none             |
| `value`                  | `.plinth-meter-bar` | a number; past `max` the bar is full         | `min`            |
| `aria-describedby`       | `.plinth-meter-bar` | the description's id                         | none             |
| `aria-valuetext`         | `.plinth-meter-bar` | the value text                               | none             |
| `aria-hidden`            | the value, the icon | always `true`: they repeat what the bar says | none             |

The bar's thickness, track and fills are the component tokens `--plinth-meter-height`,
`--plinth-meter-track` and `--plinth-meter-<tone>-fill`, for a project to tune.

A missing `data-tone` looks neutral. Blade, Vue and React print the tone you give, or, for no tone
or one they don't know, the one the numbers decide. Set the tone with the `tone` prop, never a
`data-tone` attribute of your own: the icon follows the prop, so an attribute that overrides
`data-tone` would change the colour and leave the icon behind.

## Props

The same names in every layer. Blade writes a camelCase prop in kebab-case (`value-text`), as Vue
can; React takes the Vue props. The meter has no slots.

| Prop        | Blade                                        | Vue               | React             | Default          |
| ----------- | -------------------------------------------- | ----------------- | ----------------- | ---------------- |
| label       | `label="Spend this month"`                   | `label="…"`       | `label="…"`       | required         |
| value       | `:value="$spend"`                            | `:value="spend"`  | `value={spend}`   | `min`            |
| min         | `:min="0"`                                   | `:min="0"`        | `min={0}`         | `0`              |
| max         | `:max="150"`                                 | `:max="150"`      | `max={150}`       | `100`            |
| low         | `:low="105"`                                 | `:low="105"`      | `low={105}`       | none             |
| high        | `:high="135"`                                | `:high="135"`     | `high={135}`      | none             |
| optimum     | `:optimum="0"`                               | `:optimum="0"`    | `optimum={0}`     | none             |
| valueText   | `value-text="€120 of €150"`                  | `value-text="…"`  | `valueText="…"`   | none             |
| description | `description="Runs pause at €150."`          | `description="…"` | `description="…"` | none             |
| tone        | `tone="warning"` or `:tone="$tone"` (`Tone`) | `tone="warning"`  | `tone="warning"`  | from the numbers |
| id          | `id="spend"`                                 | `id="spend"`      | `id="spend"`      | a generated one  |

The numbers take a number or a numeric string; anything else counts as missing. The `id` goes on
the `<meter>`. Every other attribute reaches the root `<div>`: in Blade through `$attributes`
(`class`, `data-*`, `aria-*`, `wire:key`), in Vue by falling through, and in React as props
(`className`, added to Plinth's class, `data-*`, `aria-*`, handlers and `ref`). The project's own
attribute wins a clash. In Blade the tone is a value or a case of `\BDynamic\Plinth\Enums\Tone`;
in Vue and React it is a `Tone`, and `meterTone()` gives the tone the numbers decide. The meter
emits no events.

```blade tab="Blade"
<x-plinth::meter
    label="Spend this month"
    :value="$client->spend"
    :max="$client->cap"
    :low="$client->cap * 0.7"
    :high="$client->cap * 0.9"
    :optimum="0"
    :value-text="$spendText"
    :description="$client->spend > $client->cap ? $overText : $pauseText"
/>
```

```vue tab="Vue"
<PlinthMeter
    label="Runs this month"
    :value="runs"
    :max="quota"
    :low="quota * 0.8"
    :high="quota * 0.95"
    :optimum="0"
    :value-text="`${runs} of ${quota}`"
/>
```

```tsx tab="React"
import { PlinthMeter } from '@ptbdynamic/plinth/react';

<PlinthMeter label="Storage" value={used} max={10} valueText={`${used} GB of 10 GB`} />;
```

## Accessibility

- **A native `<meter>`,** so screen readers announce a meter with its name, the label (through
  its `<label for>`), and its value: the value text through `aria-valuetext`, or the browser's
  own reading without it. The visible value text is hidden from them so it isn't read twice.
- **The description** is read after the value, through `aria-describedby`.
- **Colour is never the only cue.** The words say what the tone means (_Runs pause at €150_,
  _Over the cap by €12_); the bar's colour and the description's icon only reinforce them, and
  the icon is hidden from screen readers, so a meter with a tone other than neutral needs a
  description (or value text) that says what the tone means. The description's text meets WCAG
  AA in every tone, and the bar's fill 3:1 against its track, light and dark.
- **A value that changes while the page is open** is not announced by itself. If the change
  matters, the app says so in a container with `role="status"` that stays on the page.
- **Forced colours:** the bar keeps an outline and its fill is the system's highlight colour.
- The meter is not focusable and holds no control.

The markup contract is at the top of
[`packages/css/src/components/meter.css`](../../packages/css/src/components/meter.css).
