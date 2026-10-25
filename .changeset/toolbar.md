---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the toolbar: the row of actions under a page header, from 768px. A search field with a scope
button joined to it, what the actions act on (`target`), then the actions in groups with dividers
and the app's ⋯ menu. From 1280px each action shows its icon and label, below its icon alone; an
action marked `overflow` hides below 1280px, and items in the ⋯ menu marked `data-overflow` show
only there. The actions are a `role="toolbar"` with one tab stop and arrow-key movement: an Alpine
`x-init` in Blade, an effect in Vue and React (`toolbarKeys`). It is `<x-plinth::toolbar>`,
`toolbar-search`, `toolbar-scope`, `toolbar-group` and `toolbar-action` in Blade, and
`PlinthToolbar`, `PlinthToolbarSearch`, `PlinthToolbarScope`, `PlinthToolbarGroup` and
`PlinthToolbarAction` in Vue and React. New tokens: `--plinth-toolbar-height` and
`--plinth-toolbar-search-width`.
