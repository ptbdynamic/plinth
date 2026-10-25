# Stat

One number on a tile, for a dashboard: _Runs today 12_, _Success rate 94%_, _Spend this month
€38 of €150_. It has a label, the value, and an optional supporting line with a tone, and it can
link to the detail behind the number.

## When not to use it

- For a status in words (_Paid_, _Overdue_), use a [badge](badge.md).
- For a message about what happened, use a [callout](callout.md).
- For many numbers to compare side by side, use the [data table](data-table.md).
- For a setting with its value, use a [list row](list-row.md).

## Label and value

The label says what the number is; the value is text the app formats, units and all (_12_,
_94%_, _€38_, _1.2 s_). Keep the label short, and put the most important tiles first.

```blade example layout="grid"
<x-plinth::stat label="Runs today" value="12" />
<x-plinth::stat label="Success rate" value="94%" />
<x-plinth::stat label="Spend this month" value="€38" />
```

## The supporting line

An optional line under the value, for a change, a target or a total: _Up 2 points this week_,
_of €150_. The **tone** colours it and puts an icon before it, a different shape for each tone.
Pick the tone by what the change means, not by its direction: fewer failed runs is a success.

| Tone        | Use it for                                   | Example                 |
| ----------- | -------------------------------------------- | ----------------------- |
| **neutral** | Context that is neither good nor bad         | _of €150_               |
| **success** | A change for the better, a target met        | _Up 2 points this week_ |
| **warning** | Close to a limit, worth a look soon          | _85% of the budget_     |
| **danger**  | Something has gone wrong, a limit is crossed | _Up from 1 yesterday_   |

```blade example layout="grid"
<x-plinth::stat label="Spend this month" value="€38" description="of €150" />
<x-plinth::stat label="Success rate" value="94%" description="Up 2 points this week" tone="success" />
<x-plinth::stat label="Spend this month" value="€128" description="85% of the budget" tone="warning" />
<x-plinth::stat label="Failed runs" value="7" description="Up from 1 yesterday" tone="danger" />
```

## A link to the detail

With an **`href`** the whole tile is a link, with a chevron at the end of the label that points
the other way in right-to-left text. It holds no other control.

```blade example layout="grid"
<x-plinth::stat label="Runs today" value="12" description="3 more than yesterday" href="#" />
<x-plinth::stat label="Failed runs" value="7" description="Up from 1 yesterday" tone="danger" href="#" />
```

## Empty

A value that isn't available yet (still loading, or nothing to count) shows an em dash. Screen
readers hear **`empty-label`** instead, _Not available_ unless you say otherwise. Leave `value`
out or empty; `0` is a value.

```blade example layout="grid"
<x-plinth::stat label="Average duration" description="Counted after the first run" />
<x-plinth::stat label="Failed runs" :value="0" />
```

## In a grid

The tile has no width of its own: it fills the column the page gives it, and as tall as its grid
cell, so a row of tiles lines up. The page lays them out, one column on a phone and more as the
page widens, usually as a list:

```blade tab="Blade"
<ul role="list" class="dashboard-stats">
    <li><x-plinth::stat label="Runs today" :value="$runs" href="{{ route('runs') }}" /></li>
    <li><x-plinth::stat label="Success rate" :value="$rate" /></li>
</ul>
```

```css tab="CSS"
.dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr));
    gap: var(--plinth-space-3);
    margin: 0;
    padding: 0;
    list-style: none;
}
```

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                       | Element            | Required | What it is                                                                                |
| -------------------------- | ------------------ | -------- | ----------------------------------------------------------------------------------------- |
| `.plinth-stat`             | `<div>` or `<a>`   | yes      | The root, the tile. An `<a href>` with `href`. Takes `data-tone` and forwarded attributes |
| `.plinth-stat-label`       | `<span>`           | yes      | What the number is                                                                        |
| `.plinth-stat-value`       | `<span>`           | yes      | The value, or the em dash and the empty label                                             |
| `.plinth-stat-empty`       | `<span>`           | no       | The empty label, for screen readers only; the dash before it is `aria-hidden`             |
| `.plinth-stat-description` | `<span>`           | no       | The supporting line                                                                       |
| `.plinth-stat-tone`        | `<span>` (an icon) | no       | The tone's icon, first in the supporting line; not for neutral                            |
| `.plinth-stat-chevron`     | `<span>` (an icon) | no       | The link's chevron, last in the tile; `data-mirror` flips it in right-to-left text        |

| Attribute or class | On                   | Values                                        | Default   |
| ------------------ | -------------------- | --------------------------------------------- | --------- |
| `data-tone`        | `.plinth-stat`       | `neutral`, `success`, `warning`, `danger`     | `neutral` |
| `is-empty`         | `.plinth-stat-value` | set when the value isn't available            | not set   |
| `aria-hidden`      | the icons, the dash  | always `true`: they repeat what the text says | none      |

A missing or unknown `data-tone` looks neutral, and Blade, Vue and React print `neutral` for a
tone they don't know. A tile without a supporting line shows no tone. Set the tone with the
`tone` prop, never a `data-tone` attribute of your own: the icon follows the prop, so an
attribute that overrides `data-tone` would change the colour and leave the icon behind.

## Props

The same names in every layer. React takes the Vue props; the stat has no slots.

| Prop        | Blade                                        | Vue                     | React                   | Default         |
| ----------- | -------------------------------------------- | ----------------------- | ----------------------- | --------------- |
| label       | `label="Runs today"`                         | `label="Runs today"`    | `label="Runs today"`    | none            |
| value       | `value="12"` or `:value="$runs"`             | `:value="runs"`         | `value={runs}`          | empty           |
| description | `description="of €150"`                      | `description="of €150"` | `description="of €150"` | none            |
| tone        | `tone="success"` or `:tone="$tone"` (`Tone`) | `tone="success"`        | `tone="success"`        | `neutral`       |
| href        | `href="/runs"`                               | `href="/runs"`          | `href="/runs"`          | none            |
| empty label | `empty-label="Still counting"`               | `empty-label="…"`       | `emptyLabel="…"`        | `Not available` |

Extra attributes reach the root, the `<div>` or the `<a>`: in Blade through `$attributes`
(`class`, `id`, `data-*`, `aria-*`, `wire:navigate`, `wire:key`), in Vue by falling through, and
in React as props (`className`, added to Plinth's class, `id`, `data-*`, `aria-*`, handlers and
`ref`). The project's own attribute wins a clash. In Blade the tone is a value or a case of
`\BDynamic\Plinth\Enums\Tone`; in Vue and React it is a `Tone`, and the list is exported as
`tones`. The stat emits no events.

```blade tab="Blade"
<x-plinth::stat
    label="Spend this month"
    :value="Number::currency($spend, 'EUR')"
    description="of €150"
    :tone="$spend > 120 ? 'warning' : 'neutral'"
    href="{{ route('billing') }}"
    wire:navigate
/>
```

```vue tab="Vue"
<PlinthStat
    label="Success rate"
    :value="rate === null ? null : `${rate}%`"
    :description="trend"
    :tone="trendTone"
    href="/runs"
/>
```

```tsx tab="React"
import { PlinthStat } from '@ptbdynamic/plinth/react';

<PlinthStat label="Runs today" value={runs} description="3 more than yesterday" href="/runs" />;
```

## Accessibility

- **The words carry the meaning.** The tone's colour and icon only reinforce the supporting
  line, so write what it means (_Up 2 points_, _Over budget_), not just a number with a colour.
  The icons are hidden from screen readers. The text meets WCAG AA in every tone, light and dark.
- **Screen readers read the tile in order:** the label, then the value, then the supporting line.
  A link tile's accessible name is all of it: _Runs today 12 3 more than yesterday_.
- **The empty value** is an em dash for the eye; screen readers hear the empty label instead of
  "dash". Say why it is empty in the supporting line when it helps.
- **A value that changes while the page is open** is not announced by itself. If the change
  matters, the app wraps the tiles in a container with `role="status"` that stays on the page.
- **A link tile** is one target, much larger than 40 × 40 px, with the focus ring on
  `:focus-visible` and the chevron to show it is a link without hovering. A static tile is not
  focusable.
- Put a row of tiles in a list (`<ul role="list">`), so screen readers say how many there are.

The markup contract is at the top of
[`packages/css/src/components/stat.css`](../../packages/css/src/components/stat.css).
