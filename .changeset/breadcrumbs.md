---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add breadcrumbs: a named `<nav>` around an ordered list of the pages above the current one, which
is last with `aria-current="page"`. Each item is its own component, so the app's attributes land
on its link; a more button opens the app's menu of the pages left out of a long trail; and
`collapse="parent"` shows only the parent as a back link on a phone. The separators are drawn in
CSS and labels truncate. The app bar's start now holds the trail before the search, with the new
`app-bar.search-min-width` token.
