---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the pagination: the footer of a long list or table, with the app's summary, an optional
page-size form, and previous, next and the page numbers (`<x-plinth::pagination>`,
`PlinthPagination` in Vue and React). With an `href` pattern (`?page={page}`) the pages are
links; without one they are buttons for paging in place (`update:page` in Vue, `onPageChange` in
React).
