---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-blade': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
---

The app nav takes a `rail` variant (`data-variant="rail"`, `variant` in Blade, Vue and React,
backed by the `AppNavVariant` enum in Blade) that keeps it a rail from 1280px too, for apps that
put a section's own column of links beside it. Without it the app nav is the sidebar from 1280px,
as before.
