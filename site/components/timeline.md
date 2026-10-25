# Timeline

A conversation or an activity feed on one vertical line, such as a ticket's thread: the customer's
post, _Sam Lee assigned it to themselves · 09:14_, an internal note, the team's reply. Posts have
the author's avatar on the line; events are a small dot and one sentence. It fills its column,
such as the [split view](split-view.md)'s detail, above the reply box.

## When not to use it

- For a list of things to open, such as tickets or messages: use a [list card](list-card.md).
- For one message to the reader, such as a warning above a form: use a [callout](callout.md).
- For a table of changes with columns to compare or sort: use a [data table](data-table.md).

## Posts

A post has its **`author`** (the heading, and where the avatar's initials come from), an optional
picture in **`avatar`**, a meta line in mono with the **`detail`** (an email or a role) and the
**`time`** (with **`datetime`** for the machine-readable date), a short **`reference`** on the end
side, shown from 1280px, the body in the slot, and a row of quiet **`actions`** (Reply, Quote,
Copy link), always shown. The heading and the meta line keep to one line each: on a phone a long
name or address ends in an ellipsis, and the time and the badge always show.

```blade example
<x-plinth::timeline label="Conversation">
    <x-plinth::timeline-post author="Alex Kim" kind="customer" detail="alex.kim@example.com" time="09:02" datetime="2026-10-25T09:02" reference="#4821">
        <p>Hi, when I export the March report the download starts and then stops with an error.</p>
        <x-slot:actions>
            <x-plinth::button variant="ghost" size="sm">Reply</x-plinth::button>
            <x-plinth::button variant="ghost" size="sm">Quote</x-plinth::button>
            <x-plinth::icon-button variant="ghost" size="sm" label="Copy link"><x-site.glyph name="copy" /></x-plinth::icon-button>
        </x-slot:actions>
    </x-plinth::timeline-post>
    <x-plinth::timeline-post author="Sam Lee" detail="Support team" time="09:21" datetime="2026-10-25T09:21" reference="#4823">
        <p>Thanks, Alex. We can see the error and are on it.</p>
    </x-plinth::timeline-post>
</x-plinth::timeline>
```

The author is a heading, an `<h3>` unless **`heading-level`** says otherwise (h2 to h6), so a
screen reader can move from post to post. Under a page's `<h1>` and the ticket's `<h2>`, the
default fits.

## Kinds

**`kind`** says who wrote the post, as a coloured ring on the avatar.

| Kind         | Ring  | Use it for                                                  |
| ------------ | ----- | ----------------------------------------------------------- |
| **team**     | green | the default: someone on the team, a reply the customer sees |
| **customer** | blue  | the person the conversation is with                         |
| **note**     | amber | an internal note: only the team sees it                     |

The ring is not the only cue, so give every post a `detail` that says who wrote it (the customer's
email, the team member's role): without one, a team post and a customer's differ only by colour,
and not at all in forced colours. Set the kind with `kind`, never with a `data-kind` attribute:
the note's badge follows `kind`, and a `data-kind` of its own would win on the root and leave a
note without it.

## Notes

A note is a post with `kind="note"`: its body sits in a faint warning-tinted box, and an _Internal
note_ badge follows the name. Change the badge's words with **`note-label`**.

```blade example
<x-plinth::timeline label="Conversation">
    <x-plinth::timeline-post author="Sam Lee" kind="note" detail="Support team" time="09:16" reference="#4822">
        <p>Same error on our side with any report over 3,000 rows. Asking the reports team.</p>
    </x-plinth::timeline-post>
</x-plinth::timeline>
```

## Events

An event is a dot on the line and one sentence, with its `time`: an assignment, a status change,
a merge. The sentence is the slot, and may hold a `<strong>` for the value that changed.

```blade example
<x-plinth::timeline label="Activity">
    <x-plinth::timeline-event time="09:14" datetime="2026-10-25T09:14">Sam Lee assigned it to themselves</x-plinth::timeline-event>
    <x-plinth::timeline-event time="09:22">Sam Lee set the status to <strong>Pending</strong></x-plinth::timeline-event>
</x-plinth::timeline>
```

## On another surface

The avatars and the dots sit in a small gap of the page's colour, so the line stops short of
them. On a card or another raised surface, set `--plinth-timeline-surface` on the timeline to that
surface (`--plinth-color-surface-raised`).

| Custom property                  | What it sets                                     | Default                             |
| -------------------------------- | ------------------------------------------------ | ----------------------------------- |
| `--plinth-timeline-surface`      | the gap around the avatars and the dots          | `--plinth-color-surface`            |
| `--plinth-timeline-line`         | the line's colour                                | `--plinth-color-border`             |
| `--plinth-timeline-gutter`       | the column the line runs down, the avatar's size | `--plinth-size-avatar-md`           |
| `--plinth-timeline-note-surface` | a note's faint warning tint (a token)            | the warning colour at 8% (dark), 6% |
| `--plinth-timeline-note-border`  | a note's hairline (a token)                      | the warning colour at 24%           |

## Markup contract

Blade, Vue and React print exactly this markup, and the parity tests hold them to it.

| Part                        | Element          | Holds                                                    |
| --------------------------- | ---------------- | -------------------------------------------------------- |
| `plinth-timeline`           | `<ol>`           | the root, `role="list"`, named by `aria-label`           |
| `plinth-timeline-post`      | `<li>`           | a post, its own component                                |
| `plinth-timeline-article`   | `<article>`      | the post's content                                       |
| `plinth-avatar`             | `<span>`         | the author's [avatar](avatar.md), decorative             |
| `plinth-timeline-header`    | `<header>`       | the heading and the meta line                            |
| `plinth-timeline-heading`   | `<h2>` to `<h6>` | the author, the note's badge and the reference           |
| `plinth-timeline-author`    | `<span>`         | the author's name, ending in an ellipsis                 |
| `plinth-badge`              | `<span>`         | a note's [badge](badge.md), in the warning tone          |
| `plinth-timeline-meta`      | `<p>`            | the meta line, when there is a detail or a time          |
| `plinth-timeline-detail`    | `<span>`         | the optional email or role                               |
| `plinth-timeline-time`      | `<time>`         | the optional time, with its `datetime`                   |
| `plinth-timeline-reference` | `<span>`         | the optional reference, on the heading's row from 1280px |
| `plinth-timeline-body`      | `<div>`          | the body                                                 |
| `plinth-timeline-actions`   | `<div>`          | the optional actions                                     |
| `plinth-timeline-event`     | `<li>`           | an event, its own component                              |
| `plinth-timeline-dot`       | `<span>`         | the dot on the line, hidden from screen readers          |
| `plinth-timeline-text`      | `<p>`            | the event's sentence and its time                        |

| Attribute or state | On       | Values                                            | Default |
| ------------------ | -------- | ------------------------------------------------- | ------- |
| `aria-label`       | the root | the list's name                                   | none    |
| `data-kind`        | a post   | `team`, `customer`, `note`; anything else: `team` | `team`  |
| heading level      | a post   | `h2` to `h6`; anything else falls back to `h3`    | `h3`    |

## Props

The timeline, each post and each event are their own components, so the app's attributes and
listeners (`id` for a link to a post, `wire:key`, `x-on:click`) land on the entry's `<li>`. Extra
attributes go to each component's root, and the project's win a clash (`class` is added). The
same names in every layer; React takes the Vue props, with the slot as `children` and the actions
as a node prop.

| Component | Prop          | Blade                         | Vue                    | React                  | Default         |
| --------- | ------------- | ----------------------------- | ---------------------- | ---------------------- | --------------- |
| timeline  | label         | `label="Conversation"`        | `label="Conversation"` | `label="Conversation"` | none            |
| timeline  | entries       | the slot                      | the default slot       | `children`             | none            |
| post      | author        | `author="Alex Kim"`           | `author="Alex Kim"`    | `author="Alex Kim"`    | none            |
| post      | avatar        | `avatar="/a.jpg"`             | `avatar="/a.jpg"`      | `avatar="/a.jpg"`      | initials        |
| post      | kind          | `kind="customer"`             | `kind="customer"`      | `kind="customer"`      | `team`          |
| post      | detail        | `detail="alex@example.com"`   | `detail="…"`           | `detail="…"`           | none            |
| post      | time          | `time="09:02"`                | `time="09:02"`         | `time="09:02"`         | none            |
| post      | datetime      | `datetime="2026-10-25T09:02"` | `datetime="…"`         | `datetime="…"`         | none            |
| post      | reference     | `reference="#4821"`           | `reference="#4821"`    | `reference="#4821"`    | none            |
| post      | note label    | `note-label="Nota interna"`   | `note-label="…"`       | `noteLabel="…"`        | _Internal note_ |
| post      | heading level | `heading-level="h4"`          | `heading-level="h4"`   | `headingLevel="h4"`    | `h3`            |
| post      | body          | the slot                      | the default slot       | `children`             | none            |
| post      | actions       | `<x-slot:actions>`            | `#actions`             | `actions={…}`          | none            |
| event     | time          | `time="09:14"`                | `time="09:14"`         | `time="09:14"`         | none            |
| event     | datetime      | `datetime="…"`                | `datetime="…"`         | `datetime="…"`         | none            |
| event     | sentence      | the slot                      | the default slot       | `children`             | none            |

In Blade, `kind` takes the string or the `TimelineKind` enum, and `heading-level` the string or
the `HeadingLevel` enum.

```blade tab="Blade"
<x-plinth::timeline label="Conversation">
    @foreach ($ticket->entries as $entry)
        @if ($entry->isEvent())
            <x-plinth::timeline-event :time="$entry->time" :datetime="$entry->at->toIso8601String()" wire:key="entry-{{ $entry->id }}">
                {{ $entry->sentence }}
            </x-plinth::timeline-event>
        @else
            <x-plinth::timeline-post :author="$entry->author" :kind="$entry->kind" :detail="$entry->detail" :time="$entry->time" :reference="'#'.$entry->id" id="post-{{ $entry->id }}" wire:key="entry-{{ $entry->id }}">
                {!! $entry->html !!}
                <x-slot:actions>
                    <x-plinth::button variant="ghost" size="sm" wire:click="reply({{ $entry->id }})">Reply</x-plinth::button>
                </x-slot:actions>
            </x-plinth::timeline-post>
        @endif
    @endforeach
</x-plinth::timeline>
```

```vue tab="Vue"
<PlinthTimeline label="Conversation">
  <template v-for="entry in entries" :key="entry.id">
    <PlinthTimelineEvent v-if="entry.event" :time="entry.time">{{ entry.sentence }}</PlinthTimelineEvent>
    <PlinthTimelinePost v-else :id="`post-${entry.id}`" :author="entry.author" :kind="entry.kind" :detail="entry.detail" :time="entry.time">
      <p>{{ entry.text }}</p>
      <template #actions>
        <PlinthButton variant="ghost" size="sm" @click="reply(entry)">Reply</PlinthButton>
      </template>
    </PlinthTimelinePost>
  </template>
</PlinthTimeline>
```

```tsx tab="React"
import {
    PlinthButton,
    PlinthTimeline,
    PlinthTimelineEvent,
    PlinthTimelinePost,
} from '@ptbdynamic/plinth/react';

<PlinthTimeline label="Conversation">
    {entries.map((entry) =>
        entry.event ? (
            <PlinthTimelineEvent key={entry.id} time={entry.time}>
                {entry.sentence}
            </PlinthTimelineEvent>
        ) : (
            <PlinthTimelinePost
                key={entry.id}
                id={`post-${entry.id}`}
                author={entry.author}
                kind={entry.kind}
                detail={entry.detail}
                time={entry.time}
                actions={
                    <PlinthButton variant="ghost" size="sm" onClick={() => reply(entry)}>
                        Reply
                    </PlinthButton>
                }
            >
                <p>{entry.text}</p>
            </PlinthTimelinePost>
        ),
    )}
</PlinthTimeline>;
```

## Accessibility

- The timeline is an ordered list, named by `label`, with `role="list"` so Safari keeps announcing
  it as a list without its bullets; a screen reader says how many entries it holds.
- Each post is an `<article>` with its author as a heading, so a screen reader can jump from post
  to post. The reference sits beside the heading, not in it, so the heading reads as the name
  (and the note's badge). The avatar is decorative, since the name is next to it, and the event's
  dot is hidden.
- The separator before a time is drawn by the CSS with an empty alternative, so it isn't read.
  Give each time a `datetime`.
- The kind's ring is not the only cue: a note has its badge, and the `detail` says who wrote the
  rest, so give every post one. In forced colours the ring goes, the badge and the note's box
  border stay, and the dot takes the text colour.
- The actions are the app's own [buttons](button.md): always shown, never only on hover, each
  with its focus ring, and a 40px hit area on a touch screen; the row spaces them so those areas
  don't overlap. Give an icon button its label (_Copy link_).
- Nothing moves, so reduced motion needs nothing.

The markup contract is at the top of
[`packages/css/src/components/timeline.css`](../../packages/css/src/components/timeline.css).
