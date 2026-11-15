---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Nav list: group headings now read as headings rather than as one more item: smaller, uppercase,
letter-spaced and a step quieter, with a wider space between groups. Their face, size, weight,
letter spacing and colour are new `--plinth-nav-list-heading-*` tokens, and the space between
groups is `--plinth-nav-list-group-gap`. Items take an optional decorative icon before the label
(the `icon` slot in Blade and Vue, the `icon` prop in React). Adds the `font-tracking-wide`
token (0.04em) for small uppercase labels.
