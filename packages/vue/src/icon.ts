import { resolveSize, type Size } from './size';

/** The icon sizes (16, 20 and 24 px), from the shared size scale. `md` is the default. */
export const iconSizes = ['sm', 'md', 'lg'] as const satisfies readonly Size[];

export type IconSize = (typeof iconSizes)[number];

/** A size from the list, or `md` when it is not one of them. */
export function iconSize(value: string | undefined): IconSize {
  return resolveSize(value, iconSizes, 'md');
}

/**
 * The built-in glyphs, by name: the interface glyphs every product needs, drawn on a 24 × 24 grid
 * with a 2-unit round stroke. Not a general icon library; brand and domain icons stay in the app.
 */
export const iconNames = [
  'menu',
  'close',
  'back',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'check',
  'plus',
  'search',
  'more',
  'external',
  'sign-out',
  'sun',
  'moon',
  'system',
  'info',
  'warning',
] as const;

export type IconName = (typeof iconNames)[number];

/** Each glyph's paths. Blade's Glyph enum prints the same markup. */
export const iconGlyphs: Record<IconName, string> = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
  close: '<path d="M6 6l12 12M18 6L6 18"></path>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"></path>',
  'chevron-left': '<path d="M15 6l-6 6 6 6"></path>',
  'chevron-right': '<path d="M9 6l6 6-6 6"></path>',
  'chevron-up': '<path d="M6 15l6-6 6 6"></path>',
  'chevron-down': '<path d="M6 9l6 6 6-6"></path>',
  check: '<path d="M5 12l5 5L19 7"></path>',
  plus: '<path d="M12 5v14M5 12h14"></path>',
  search: '<circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4 4"></path>',
  more: '<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',
  external:
    '<path d="M14 4h6v6M20 4l-9 9"></path><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path>',
  'sign-out':
    '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"></path><path d="M15 8l4 4-4 4M19 12H9"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"></path>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"></path>',
  system:
    '<rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path>',
  info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 7.5v.01"></path>',
  warning:
    '<path d="M10.3 4.3L2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"></path><path d="M12 9.5v4M12 17v.01"></path>',
};

/** The glyphs that point a direction, mirrored in right-to-left text without `mirror`. */
export const mirroredIconNames: readonly IconName[] = [
  'back',
  'chevron-left',
  'chevron-right',
  'sign-out',
];

/** A glyph's name, or nothing when it is not one, so the slot shows instead. */
export function iconName(value: string | undefined): IconName | undefined {
  return iconNames.includes(value as IconName) ? (value as IconName) : undefined;
}

/** A glyph's SVG, as the icon prints it inside its span. */
export function iconGlyph(name: IconName): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconGlyphs[name]}</svg>`;
}
