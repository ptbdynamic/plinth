---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the app nav: the app's main navigation, a 240px sidebar from 1280px and a 56px rail of icons
from 768px, with the app's logo at its top, items with an icon, a label and an optional count, and
an optional footer. On a phone it is hidden, and the menu sheet holds the same items. It is
`<x-plinth::app-nav>` and `<x-plinth::app-nav-item>` in Blade, and `PlinthAppNav` and
`PlinthAppNavItem` in Vue and React. New tokens: `--plinth-app-nav-width`,
`--plinth-app-nav-rail-width`, `--plinth-size-sidebar` and `--plinth-size-rail`.
