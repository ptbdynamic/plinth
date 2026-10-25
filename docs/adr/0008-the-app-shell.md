# 8. The app shell: the document scrolls on a phone, the panes scroll from 768px

- Status: accepted
- Date: 2026-10-25
- Issue: [#130](https://github.com/ptbdynamic/plinth/issues/130)

## Context

Plinth has the pieces of an app's screen: the app nav (a sidebar from 1280px, a rail from 768px,
hidden on a phone, #129), the page header (the bar at the top of a page, #126) and the menu sheet
(the phone's navigation). What it lacks is the frame that places them, and a way to show a list
beside its detail, as an inbox does: folders, then the tickets, then the open ticket with a reply
box under it.

Those layouts are where a design system usually reaches for script: a resize observer that decides
how many panes fit, a router hook that picks the pane on a phone, a scroll lock. Plinth ships no
script (ADR 2) and must print the same markup from Blade, Vue and React, so the layout has to be
CSS reading attributes the app sets. Two questions decide the rest: what scrolls, and who says
which pane a phone shows.

## Decision

### 1. Three components

| Component      | Root                    | What it is                                                                                    |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| **App shell**  | `<div>` with a `<main>` | the frame: the app nav on the start side, the app bar above the content, the page in the main |
| **App bar**    | `<header>`              | from 768px, the bar beside the app nav: a search button, actions and the account              |
| **Split view** | `<div>`                 | inside a page: a secondary column, a list and a detail, with an optional footer on the detail |

The search button is its own component (`app-bar-search`), so the app's listeners land on the
`<button>` (ADR 2, section 5). It opens the app's search, through `commandfor` or the app's own
handler; the app listens for the shortcut (Ctrl K, ⌘K) and names it in `aria-keyshortcuts`, since
Plinth can neither bind keys nor tell the platform apart without script.

### 2. What scrolls

| Width           | Scrolls                                        | Why                                                                                                                         |
| --------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| phone (< 768px) | the document                                   | the browser's toolbars collapse, pull to refresh and scroll to top work, the page header and the footer stick to the screen |
| from 768px      | the shell's main, or each pane of a split view | the nav and the bar stay put, and the folders, the list and the thread keep their own places                                |

From 768px the shell is a grid as tall as the screen (`100dvh`): the nav fills its start column, the
bar sits above the main, and the main is a flex column that scrolls. A split view in it takes the
height left under the page header (`flex: 1`, `min-block-size: 0`), and then the main has nothing to
scroll and each pane scrolls instead. On a phone the shell is plain flow: the nav and the bar parts
are not shown, the page header (with `data-top`) is the top bar, and the document scrolls.

Set aside: a fixed-height shell on a phone with an inner scroller. It loses the collapsing
toolbars and makes the on-screen keyboard push a fixed box around.

### 3. The app says which pane shows

The split view's state is two attributes the app sets from its URL or its own state (ADR 2,
section 4):

- `data-pane="list" | "detail"` (default `list`): the one pane a phone shows. From 768px the list
  and the detail always show, whatever it says.
- `data-secondary="closed"`: collapses the secondary column, which shows from 1280px. The page
  header's panel button sets it, with `aria-expanded` and `aria-controls`.

A pane that isn't shown is `display: none`, so it leaves the reading and tab order too. Nothing
animates between panes. Below 1280px the secondary column isn't shown; the app offers its content
another way (a sheet, a pill row).

### 4. The detail's footer

The footer (a reply box) is the detail's last part, `position: sticky` at its bottom edge. Inside a
scrolling pane it holds to the pane's bottom; on a phone, in the document's flow, it holds to the
screen's bottom and pads for the home indicator. This answers the keyboard question ADR 2, section
8 left for the next component at the bottom of the screen: a sticky element in the flow moves with
the visual viewport, and the browser scrolls a focused field above the keyboard, which a
`position: fixed` bar does not get.

### 5. Heights line up

The app bar, the page header and the app nav's brand are all 56px (`app-bar.height`,
`page-header.height`), so the logo, the bar and the page's first divider meet in a line. Under the
app bar the page header isn't the screen's top bar, so the shell drops the safe area its `data-top`
adds.

## Consequences

- Layout state is two attributes and the native `aria-current`; the app keeps it in its URL, and
  every layer prints it the same way.
- No Plinth script: no resize observer, no key binding, no scroll lock.
- From 768px, a page's main or panes are scroll containers; Safari scrolls them from the keyboard
  only when they hold something focusable, which a real page does. The docs say so.
- The page header sticks to the main's top from 768px, so `--plinth-page-header-offset` stays 0 in
  the shell. A project that puts the app bar in the document's flow instead sets the offset to the
  bar's height.
- Below 1280px the secondary column has no place of its own, and the panel button has nothing to
  open there; the app hides the button or opens a sheet. A secondary column at 768px is left for an
  issue if a project needs it.
- On a tablet held sideways the app bar and the nav don't add the top safe area; only a standalone
  web app on a device with a status bar inset would need it.
