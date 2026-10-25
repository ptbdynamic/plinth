---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the app shell, the app bar and the split view (ADR 8). The app shell frames an app: the app nav
full height on the start side, the app bar above the content, and the page in a `<main>` that
scrolls on its own from 768px; on a phone the page header is the top bar and the document scrolls.
The app bar holds a search button that opens the app's search (with an optional shortcut hint),
the actions and the account, and hides on a phone. The split view shows a list beside its detail
from 768px and a secondary column from 1280px; on a phone `pane` picks the one pane, and
`secondary-closed` collapses the column. It is `<x-plinth::app-shell>`, `<x-plinth::app-bar>`,
`<x-plinth::app-bar-search>` and `<x-plinth::split-view>` in Blade, and `PlinthAppShell`,
`PlinthAppBar`, `PlinthAppBarSearch` and `PlinthSplitView` in Vue and React. New tokens:
`--plinth-app-bar-height`, `--plinth-app-bar-search-width`, `--plinth-split-view-list-width`,
`--plinth-split-view-secondary-width`, `--plinth-size-list` and `--plinth-size-search`.
