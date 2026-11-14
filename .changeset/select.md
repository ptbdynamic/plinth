---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the select: a native `<select>` with the text field's label, description and error, sizes
and looks, a chevron at its end and an optional leading icon. The options are the default slot; a
placeholder adds a first, disabled option that shows while nothing is chosen. Where the browser
supports `appearance: base-select`, the open list looks like the menu. Vue binds the value with
`v-model`, React takes `value` or `defaultValue`.
