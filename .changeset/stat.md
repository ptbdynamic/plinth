---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the stat: one metric on a tile for a dashboard, with a label, the value and an optional
supporting line whose tone (success, warning, danger) adds an icon of its own shape. With an
`href` the tile links to the detail behind the number, and a value that isn't available yet shows
an em dash with an empty label for screen readers. It is `<x-plinth::stat>` in Blade and
`PlinthStat` in Vue and React; `statChevron` is exported from both.
