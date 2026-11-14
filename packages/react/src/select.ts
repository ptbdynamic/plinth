import { resolveSize, type Size } from './size';

/** The select sizes (28 and 32 px), from the shared size scale. `md` is the default. */
export const selectSizes = ['sm', 'md'] as const satisfies readonly Size[];

export type SelectSize = (typeof selectSizes)[number];

/** A size from the list, or `md` when it is not one of them. */
export function selectSize(value: string | undefined): SelectSize {
  return resolveSize(value, selectSizes, 'md');
}
