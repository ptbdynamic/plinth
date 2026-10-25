---
'@ptbdynamic/plinth-css': patch
'@ptbdynamic/plinth-vue': patch
'@ptbdynamic/plinth-react': patch
'@ptbdynamic/plinth-blade': patch
---

The dialog, drawer and sheet draw their close button with the icon's built-in `close` glyph, and
the list row and stat their chevron with `chevron-right`, so each path has one copy. Their markup
gains `data-icon` (`close` on the close button's icon, `chevron-right` on the chevron); nothing
else changes. `sheetCloseIcon`, `dialogCloseIcon`, `drawerCloseIcon`, `listRowChevron` and
`statChevron` are still exported and print the same markup as the components.
