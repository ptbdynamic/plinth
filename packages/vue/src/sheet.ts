import { iconGlyph } from './icon';
import { resolveSize, type Size } from './size';

/**
 * The edge a sheet comes from. `end` is the default; `start` and `end` are logical, so they swap
 * in right-to-left text. The same list is the side on a phone (`sidePhone`), which has no default.
 */
export const sheetSides = ['start', 'end', 'top', 'bottom'] as const;
export type SheetSide = (typeof sheetSides)[number];

/** A side from the list, or `end` when it is not one of them. */
export function sheetSide(value: string | undefined): SheetSide {
  return sheetSidePhone(value) ?? 'end';
}

/** A side from the list, or nothing (no `data-side-phone`) when it is not one of them. */
export function sheetSidePhone(value: string | undefined): SheetSide | undefined {
  return sheetSides.includes(value as SheetSide) ? (value as SheetSide) : undefined;
}

/**
 * The width of a start or end sheet, from the shared size scale: `md` (400 px, the default), `lg`
 * (560 px) and `xl` (720 px, wide enough for a form in two columns). Top and bottom sheets ignore it.
 */
export const sheetSizes = ['md', 'lg', 'xl'] as const satisfies readonly Size[];
export type SheetSize = (typeof sheetSizes)[number];

/** A size from the list, or `md` when it is not one of them. */
export function sheetSize(value: string | undefined): SheetSize {
  return resolveSize(value, sheetSizes, 'md');
}

/** The `data-size` the sheet prints: only `lg` and `xl`; `md` is the sheet without it. */
export function sheetDataSize(value: string | undefined): Exclude<SheetSize, 'md'> | undefined {
  const size = sheetSize(value);
  return size === 'md' ? undefined : size;
}

/** The close button's icon, the built-in close glyph. Blade's sheet prints the same markup. */
export const sheetCloseIcon = iconGlyph('close');
