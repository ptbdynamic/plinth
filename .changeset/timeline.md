---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the timeline: a conversation or an activity feed on one vertical line, such as a ticket's
thread. Posts have the author's avatar on the line, ringed by `kind` (`team`, `customer` or
`note`), the author as a heading, a mono meta line (`detail` and `time`), a `reference` shown from
1280px, the body and a row of quiet `actions`; a note's body sits in a warning-tinted box under an
_Internal note_ badge (`noteLabel`). Events are a dot and one sentence with its time. It is
`<x-plinth::timeline>`, `timeline-post` and `timeline-event` in Blade (with the `TimelineKind`
enum), and `PlinthTimeline`, `PlinthTimelinePost` and `PlinthTimelineEvent` in Vue and React
(`timelineKinds`). New tokens:
`--plinth-timeline-note-surface` and `--plinth-timeline-note-border`.
