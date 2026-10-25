# Changelog

## 0.1.1 (2026-10-25)

### Fixes

- The npm package is `@ptbdynamic/plinth` (`npm install @ptbdynamic/plinth`), under the same name as the GitHub organisation and the Composer package. Its subpaths are unchanged: `@ptbdynamic/plinth/vue`, `/react`, `/tokens`, `/css` and the rest.

## 0.1.0 (2026-10-25)

### New

- Give the callout its own component tokens, `--plinth-callout-<tone>-surface` and `-border` for neutral, info, success, warning and danger, in light and dark. The tones are now a faint, translucent tint with a tinted hairline border, quieter than the status surfaces, which badges keep. Component tokens can now change with the theme (`component.light.json` and `component.dark.json`), and a token's value may hold references inside it, such as a `color-mix()`, which the CSS writes as `var()`s.
- Add the callout: a note inside a page, in five tones (neutral, info, success, warning, danger) each with its own icon, with an optional title and actions, as a `note`, `status` or `alert`, in CSS, Blade, Vue and React.
- Add the code block: a block of code with an optional label, a copy button and optional language tabs, in CSS, Blade, Vue and React.
- Add the confirmation dialog: a dialog that asks a person to confirm an action before it happens (`<x-plinth::confirm-dialog>`, `<PlinthConfirmDialog>`), always an alert dialog that closes only through Cancel, Escape or its confirm button. `kind` is `simple`, `type` (the person types `phrase` exactly; the browser blocks the confirm until it matches, and the confirm button looks disabled until then, with no script) or `password` (a password field the app checks, with `error` for a wrong one and `busy` while it checks). `tone="danger"` makes the confirm button the danger variant. Its content is a `<form method="dialog">`: the app listens for `submit` on the dialog. It needs `dialog.css` and `modal.css` with `confirm-dialog.css`. A new token, `--plinth-font-size-field` (16px), is the text size of a field on a phone, so iOS doesn't zoom in when it takes focus.
- Add the dialog: a modal for a form, details or settings on a native `<dialog>`, centred at every width (`<x-plinth::dialog>`, `<PlinthDialog>`). `dismissible` set to false (`:dismissible="false"` in Blade and Vue, `dismissible={false}` in React) makes it an alert dialog with no close button that a tap on the backdrop leaves open, closing through its own buttons with Escape acting as Cancel; `side-phone="bottom"` makes it a bottom sheet below 768px. Its width is the new `--plinth-dialog-width` token. What the dialog and the sheet share (the surface, the backdrop, the scroll lock, the motion, the safe areas and the header, body and footer) moves into one base, `modal.css`, which a page that loads the components one by one (`dist/sheet.css`, `dist/dialog.css`) must now load with them; with it, the sheet's markup and look don't change.
- Display sizes for marketing pages: `--plinth-font-size-5xl` (48px), `--plinth-font-size-6xl` (64px) and `--plinth-font-leading-display` (1.05), also in the Tailwind theme as `text-5xl`, `text-6xl` and `leading-display`
- Add the drawer (`<x-plinth::drawer>`, `PlinthDrawer`): a panel on the bottom edge of a phone that
  the person drags, with optional `peek`, `half` and `full` snap points, and a dialog or a sheet
  from 768px up (`desktop`). Dragging is the browser's scroll snapping; each layer adds the few
  lines that close it when it is swiped off (`x-init` in Blade, `useSwipeToClose` in Vue and React).

  Every bottom panel on a phone now has a grab handle and closes when it is swiped down: a sheet
  whose side on a phone is the bottom, the menu sheet and a dismissible dialog with
  `side-phone="bottom"`. The dialog and the sheet print their parts in a new panel
  (`plinth-dialog-panel`, `plinth-sheet-panel`), the root's only child, with the handle in it
  (`plinth-dialog-handle`, `plinth-sheet-handle`). New token: `--plinth-drawer-peek-height`.

  **Breaking:** the dialog's and the sheet's parts are inside the panel now, so a project's CSS that
  selected them as the root's children (`.plinth-sheet > .plinth-sheet-body`) selects them inside the
  panel (`.plinth-sheet .plinth-sheet-body`), and hand-written markup adds the panel. On a phone, a
  tap above a bottom panel closes it through the layers' script, no longer through the browser's
  `closedby="any"` alone.

- Add the info colours (`--plinth-color-info`, `-info-surface`, `-info-text`), a quiet blue in light and dark for neutral information such as an info callout. They stay blue when a project changes its accent.
- The Composer package is now `ptbdynamic/plinth`, installed from Packagist with `composer require ptbdynamic/plinth`: a root `composer.json` points at the Blade package, and the download holds only the Blade components, the Filament plugin and the built CSS and fonts.
- A React layer, `@bdynamic/plinth/react`: React 19 components that print the same markup as Blade and Vue, starting with `PlinthBadge`, `PlinthIcon`, `PlinthButton` and `PlinthIconButton`.
- Port the remaining components to React: avatar, list row, list card, pill row and pill, header, section menu and its items, sheet, menu sheet, and the data table with its column, sort button, row, cell and empty row. They take the Vue props by the same names, with slots as `children` and node props (`leading`, `trailing`, `actions`, `footer`, `account`, `head`), and `onClose` on the sheets is the dialog's close event. The shared lists and icons (`avatarSizes`, `headingLevels`, `sheetPlacements`, `dataTableSorts`, `dataTableCellKinds` and the rest) are exported as in Vue.
- A selected item is no longer shown by colour alone: the pressed icon button, the selected pill and the current section menu item take a 2px accent edge around the selection tint. A pressed button answers hover and press with the new `color.accent-subtle-hover` and `color.accent-subtle-active` tokens, in light and dark; a project that overrides `accent-subtle` overrides these two as well.
- The sheet comes from the side you pick. `side` is `end` (the default), `start`, `top` or `bottom`, honoured at every width, and logical, so `start` and `end` swap in right-to-left text. `side-phone` (`sidePhone` in React) optionally picks another side below 768px: `side="end" side-phone="bottom"` is a side panel on a tablet or desktop and a bottom sheet on a phone. The CSS reads them from `data-side` and `data-side-phone` on the root. The menu sheet is a sheet with `side="end" side-phone="bottom"`, and looks as it did.

  **Breaking:** `placement` is removed, with `data-placement`, Blade's `SheetPlacement` enum (now `SheetSide`), `sheetPlacement` and `sheetPlacements` in Vue and React (now `sheetSide`, `sheetSidePhone` and `sheetSides`), and the `--plinth-sheet-width` token. A sheet with `placement="center"` (or none) becomes a dialog, `<x-plinth::dialog side-phone="bottom">` for the same bottom sheet on a phone, with `--plinth-dialog-width` for its width; `placement="end"` becomes `side="end" side-phone="bottom"`. A sheet without `side` is now a side panel on the end edge at every width.

### Fixes

- The badge shrinks and ends its label in an ellipsis inside a flex or grid container, such as a list row's trailing slot, instead of overflowing it
- Code block: a label slot the parent adds later (for example `<template v-if="file" #label>`) now shows. The Vue component checked the slot once, in a computed value that Vue never ran again, so the label stayed hidden; it now checks the slot as it renders, as Blade and React do.
- The icon button shows its pressed state in forced colours with the Highlight system colour, and its markup contract shows the link form and says a link never prints `aria-pressed`. In Blade, a blank `label` now falls back to the `aria-label` attribute, as in Vue and React, instead of refusing to render.
- An open dialog, sheet or drawer and its backdrop reach the edge of the screen where the scrollbar takes space. The browser never draws the top layer in the scrollbar gutter, so the modal base no longer keeps a stable gutter on the page and turns the gutter off while a modal is open; the page under the backdrop shifts by the scrollbar's width instead.
- `PlinthIcon` and `PlinthIconButton` now let a project's attribute win when it clashes with one they set, as Blade and the other components already do: `aria-hidden="false"` on an icon, or `aria-pressed="mixed"` on an icon button, is printed instead of being dropped. docs/adr/0002 records the rule for every layer.
- `PlinthButton` and `PlinthIconButton` take `commandfor` and `command` as typed props, so a TypeScript project can open and close a sheet or dialog with an invoker command without spreading the attributes in. `@types/react` doesn't list them yet; Plinth types them on its own buttons and leaves React's global types alone. The values are exported as `InvokerCommand`. A link form takes neither.
