---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Adds the text field (`plinth-text-field`, `<x-plinth::text-field>`, `PlinthTextField`) and the textarea (`plinth-textarea`, `<x-plinth::textarea>`, `PlinthTextarea`): a label (visible or visually hidden), an optional description and error (`aria-describedby`, `aria-invalid`), disabled and read-only. The text field takes a leading icon, a trailing slot (a clear button or a keyboard hint) and the sm and md sizes; `grow` makes the textarea grow with its content from `rows` to `max-rows`. A project's class goes on the root and every other attribute (`wire:model`, `name`, `value`) on the input. Vue binds the value with `v-model`. New component token `--plinth-text-field-trailing-size`.
