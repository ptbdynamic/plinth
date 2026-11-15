---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-blade': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
---

The app shell takes a section column: a full-height column of the section's own links between the
app nav and the app bar and main, from 1280px. It has a `section` slot (a prop in React) for its
navigation, `section-title` for the title on a row as tall as the app bar, `section-id` for the
column's id (the title takes `<id>-title`, for the nav's `aria-labelledby`), and `section-closed`
(`data-section="closed"`) to collapse it. Its width is the new `--plinth-app-shell-section-width`
token (240px). Without a section the shell is as before.
