---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the list header: the bar on top of a list, with the list's heading and an optional count,
then its actions (select, filter, sort). While the app is selecting rows, `selection` (the app's
words, such as _2 selected_) takes the heading's place in a status region. It is
`<x-plinth::list-header>` in Blade and `PlinthListHeader` in Vue and React. List rows gain a
selectable form: `selectable` makes the row a `<label>` with a checkbox in the leading slot,
named by the row's text, that never navigates; `selected`, `name` and `value` set the checkbox
(on a row that is not selectable, `name` and `value` stay on the root),
Vue emits `update:selected` and React calls `onSelectedChange`. New token:
`--plinth-list-header-height`.
