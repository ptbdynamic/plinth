# Installation

Plinth is published as one npm package and one Composer package, with one version between them.
Install the one your stack needs, or both.

> [!NOTE]
> Plinth is in pre-release: nothing is on npm or Packagist until its first release is tagged.
> Until then, link a local checkout of the repository, as the
> [README](../../README.md#using-plinth-from-a-project-while-you-work-on-it) shows.

## The packages

| Package              | Registry  | Holds                                                                           |
| -------------------- | --------- | ------------------------------------------------------------------------------- |
| `@ptbdynamic/plinth` | npm       | the tokens, the CSS and fonts, the Tailwind theme, and the Vue and React layers |
| `ptbdynamic/plinth`  | Packagist | the Blade components, the Filament plugin, and the built CSS and fonts          |

The Composer package carries the built CSS, so a Laravel app needs no Node build to use Plinth.

```bash tab="Laravel"
composer require ptbdynamic/plinth
```

```bash tab="Vue or React"
npm install @ptbdynamic/plinth
```

## What the npm package exports

| Import                            | What it is                                                     |
| --------------------------------- | -------------------------------------------------------------- |
| `@ptbdynamic/plinth/css`          | every component's CSS and the tokens, in one stylesheet        |
| `@ptbdynamic/plinth/fonts.css`    | Geist and Geist Mono, the default typefaces, self-hosted       |
| `@ptbdynamic/plinth/tokens.css`   | the tokens alone, as CSS custom properties                     |
| `@ptbdynamic/plinth/tokens`       | the tokens as a JS and TypeScript export                       |
| `@ptbdynamic/plinth/tailwind.css` | a Tailwind v4 theme, so page code gets the tokens as utilities |
| `@ptbdynamic/plinth/vue`          | the Vue 3 components                                           |
| `@ptbdynamic/plinth/react`        | the React 19 components                                        |

Vue and React are optional peer dependencies: install the one your app uses.

## Load the CSS once

Every page needs the fonts (unless your brand sets its own typefaces) and the stylesheet, before
your own CSS:

```ts label="resources/js/app.ts"
import '@ptbdynamic/plinth/fonts.css';
import '@ptbdynamic/plinth/css';
```

Laravel apps without a Node build publish the files instead; see
[Laravel and Filament](laravel.md).

## Browser support

Plinth targets Baseline "newly available": the current releases of Chrome, Edge, Firefox and
Safari. Native `<dialog>`, `popover`, `<details>`, `:has()` and invoker commands are all there.
Projects that need older browsers bring their own polyfills
([ADR 2](../../docs/adr/0002-behaviour-state-and-forwarding.md#2-browser-support)).

If you bundle the CSS, keep your bundler from rewriting `:dir()`. Vite's default CSS target
(Baseline "widely available") predates it, so its minifier turns `:dir(rtl)` into a list of
right-to-left `:lang()` selectors. Under `dir="rtl"` without a right-to-left `lang`, every
component's right-to-left rules are then lost: mirrored icons don't flip, sheets and drawers slide
from the wrong side, and the app bar, page header and section menu keep their left-to-right
safe-area padding. Set the CSS target to at least the first releases with `:dir()`:

```js label="vite.config.js"
export default defineConfig({
    build: {
        cssTarget: ['chrome120', 'edge120', 'firefox114', 'safari16.4', 'ios16.4'],
    },
});
```
