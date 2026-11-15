---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

The sheet takes a `size` (md, lg or xl) for the width of a start or end sheet: 400, 560 or 720 px
from the new `sheet.side-width-lg` and `sheet.side-width-xl` tokens, at most the screen less the gap.
`xl` gives a form two columns on a tablet or a desktop. Top and bottom sheets ignore it, and the
layers print `data-size` only for lg and xl. Blade takes the shared `Size` enum.
