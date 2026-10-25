---
'@ptbdynamic/plinth-css': patch
'@ptbdynamic/plinth-vue': patch
'@ptbdynamic/plinth-react': patch
'@ptbdynamic/plinth-blade': patch
---

The dialog, drawer and sheet draw their close button with the icon's built-in `close` glyph, and
the list row and stat their chevron with `chevron-right`, so each path has one copy. Their markup
gains `data-icon` (`close` on the close button's icon, `chevron-right` on the chevron); nothing
else changes. `sheetCloseIcon`, `dialogCloseIcon` and `drawerCloseIcon` are still exported and are
the close glyph's SVG, which the close button prints inside a span with `data-icon="close"`;
`listRowChevron` and `statChevron` print the same chevron as the components.
