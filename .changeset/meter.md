---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the meter: a value against a limit, such as spend against a monthly cap. A label, the value
text the app formats, a native `<meter>` and an optional description. The tone is the app's
choice, or the numbers decide it as the browser decides the meter's region (`low`, `high`,
`optimum`), with danger past a cap's `max`; the description gets the tone's icon so colour is never the
only cue. Adds the component tokens `--plinth-meter-height`, `--plinth-meter-track` and
`--plinth-meter-<tone>-fill`.
