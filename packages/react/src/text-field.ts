import { resolveSize, type Size } from './size';

/** The text field sizes (28 and 32 px), from the shared size scale. `md` is the default. */
export const textFieldSizes = ['sm', 'md'] as const satisfies readonly Size[];

export type TextFieldSize = (typeof textFieldSizes)[number];

/** A size from the list, or `md` when it is not one of them. */
export function textFieldSize(value: string | undefined): TextFieldSize {
  return resolveSize(value, textFieldSizes, 'md');
}

/**
 * What a field's aria-describedby lists: its description's id, then its error's, or nothing when
 * it has neither (text-field.css, textarea.css).
 */
export function fieldDescribedBy(
  id: string,
  description: string | undefined,
  error: string | undefined,
): string | undefined {
  const ids = [
    description?.trim() ? `${id}-description` : '',
    error?.trim() ? `${id}-error` : '',
  ].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
}
