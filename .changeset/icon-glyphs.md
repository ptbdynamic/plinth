---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Add a small built-in set of interface glyphs to the icon, used by name: menu, close, back,
chevron-left, chevron-right, chevron-up, chevron-down, check, plus, search, more, external,
sign-out, sun, moon, system, info and warning, drawn on a 24 × 24 grid with a 2-unit round stroke.
The icon takes `name` and the icon button `icon`; the glyph replaces the slot, prints `data-icon`,
and the glyphs that point a direction mirror in right-to-left text on their own. An unknown name
shows the slot, so a project's own SVG still works. Blade has the `Glyph` enum; Vue and React
export `iconNames`, `iconGlyphs`, `iconGlyph()`, `iconName()` (a name, or nothing when it is not one), `mirroredIconNames` and the `IconName` type.
