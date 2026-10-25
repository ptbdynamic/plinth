---
'@ptbdynamic/plinth-tokens': minor
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Breaking: `header` is now `page-header` (`plinth-page-header`, `<x-plinth::page-header>`, `PlinthPageHeader`), and its `title` prop is `heading`, so the `title` attribute reaches the root. It takes a `level` (`h1` by default, `h2` to `h6`), sticks at the new `--plinth-page-header-offset` token (0, or an app bar's height), and adds the top safe-area inset only with `top` (`data-top`), when it is the screen's top bar. The `--plinth-header-height` token is now `--plinth-page-header-height`.
