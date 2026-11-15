/**
 * The app nav's form from 1280px: `sidebar` (the default, which prints no attribute) or `rail`,
 * the rail it is from 768px kept at every wider width.
 */
export const appNavVariants = ['sidebar', 'rail'] as const;
export type AppNavVariant = (typeof appNavVariants)[number];

/** A variant from the list, or `sidebar` when it is not one of them. */
export function appNavVariant(value: string | undefined): AppNavVariant {
  return appNavVariants.includes(value as AppNavVariant) ? (value as AppNavVariant) : 'sidebar';
}
