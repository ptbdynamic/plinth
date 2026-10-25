import {
  iconGlyph,
  iconNames,
  iconSizes,
  mirroredIconNames,
  type IconName,
  type IconSize,
} from '@ptbdynamic/plinth-vue';

export { iconNames, iconSizes, type IconName, type IconSize };

export interface IconArgs {
  /** A built-in glyph by name; without one (or with an unknown one) the icon shows `svg`. */
  name?: IconName;
  size: IconSize;
  /** Makes the icon meaningful; without it the icon is decorative and hidden. */
  label?: string;
  /** Flips the icon in right-to-left text, for icons that point a direction. */
  mirror: boolean;
  /** The project's own SVG markup (trusted, not escaped). */
  svg?: string;
}

/** A built-in glyph's name, or nothing when it is not one. */
export function glyphName(name: string | undefined): IconName | undefined {
  return iconNames.includes(name as IconName) ? (name as IconName) : undefined;
}

/** What goes inside an icon's span: the glyph's data-icon, data-mirror and SVG, or the slot. */
export function iconInside(
  name: string | undefined,
  mirror: boolean | undefined,
  svg: string | undefined,
): { attributes: string; svg: string } {
  const glyph = glyphName(name);
  const mirrored = mirror || (glyph !== undefined && mirroredIconNames.includes(glyph));
  return {
    attributes: `${glyph ? ` data-icon="${glyph}"` : ''}${mirrored ? ' data-mirror' : ''}`,
    svg: glyph ? iconGlyph(glyph) : (svg ?? ''),
  };
}

import { escape, rootAttributes, type Attributes } from './markup.ts';

/**
 * The icon's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts).
 * A label can also come as an aria-label attribute; a blank one leaves the icon decorative.
 */
export function icon(
  { name: glyph, size, label, mirror, svg }: IconArgs,
  attributes: Attributes = {},
): string {
  const { 'aria-label': ariaLabel, ...others } = attributes;
  const name = (label ?? ariaLabel ?? '').trim() ? (label ?? ariaLabel) : undefined;
  const { classes, extra } = rootAttributes('plinth-icon', others);
  const meaning = name ? ` role="img" aria-label="${escape(name)}"` : ' aria-hidden="true"';
  const inside = iconInside(glyph, mirror, svg);
  return `<span class="${classes}"${extra} data-size="${size}"${inside.attributes}${meaning}>${inside.svg}</span>`;
}
