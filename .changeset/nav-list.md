---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the nav list: a vertical list of links for a page's own navigation, such as an inbox's
folders and views, with groups under optional headings and items with a label and an optional
count. The current item (`aria-current="page"`) takes a tint, a 2px accent edge and a heavier
label. In Blade `<x-plinth::nav-list>`, `<x-plinth::nav-list-group>` and
`<x-plinth::nav-list-item>`; in Vue and React `PlinthNavList`, `PlinthNavListGroup` and
`PlinthNavListItem`.
