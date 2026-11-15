---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-blade': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
---

The split view takes a `split` (`data-split="lg"`, `split` in Blade, Vue and React, backed by the
`SplitViewSplit` enum in Blade) that puts the list and the detail side by side only from 1280px.
Up to there it shows the one pane `pane` names, as on a phone, and from 768px that pane still
scrolls on its own. Without it the panes sit side by side from 768px, as before.
