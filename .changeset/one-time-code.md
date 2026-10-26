---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add the one-time code: one input in the field's label, description and error, styled as a row of
monospaced digit cells, for a code from an authenticator app, a text message or an email. It has
4 to 8 digits (6 by default), brings up the number pad and offers a code the phone was sent.
Blade (with Alpine), Vue and React keep only digits from what is typed, pasted or autofilled, and
with `autosubmit` send the form once every digit is in; Vue emits `complete` and React calls
`onComplete` with the code.
