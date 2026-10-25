import { textFieldSizes, type TextFieldSize } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { textFieldSizes, type TextFieldSize };

export interface TextFieldArgs {
  /** The input's id: the label, description and error point at it. */
  id: string;
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel: boolean;
  type: string;
  size: TextFieldSize;
  placeholder?: string;
  value?: string;
  /** A line under the field that helps fill it in. */
  description?: string;
  /** What is wrong with the value; it marks the field invalid. */
  error?: string;
  disabled: boolean;
  readonly: boolean;
  /** The project's own SVG for the leading icon (trusted, not escaped). */
  icon?: string;
  /** The trailing slot's markup: a small icon button or a keyboard hint (trusted, not escaped). */
  trailing?: string;
}

/** The ids a field's aria-describedby lists, or nothing. */
export function describedBy(id: string, description?: string, error?: string): string {
  const ids = [description?.trim() && `${id}-description`, error?.trim() && `${id}-error`]
    .filter(Boolean)
    .join(' ');
  return ids ? ` aria-describedby="${escape(ids)}"` : '';
}

/** The description and error paragraphs under a field. */
export function fieldMessages(base: string, id: string, description?: string, error?: string) {
  return [
    description?.trim()
      ? `<p id="${escape(id)}-description" class="${base}-description">${escape(description)}</p>`
      : '',
    error?.trim() ? `<p id="${escape(id)}-error" class="${base}-error">${escape(error)}</p>` : '',
  ].join('');
}

/**
 * The text field's markup contract. Blade, Vue and React must print exactly this (see
 * parity.test.ts). A project's class goes on the root; its other attributes on the input.
 */
export function textField(
  {
    id,
    label,
    hideLabel,
    type,
    size,
    placeholder,
    value,
    description,
    error,
    disabled,
    readonly,
    icon,
    trailing,
  }: TextFieldArgs,
  attributes: Attributes = {},
): string {
  const { class: extraClass, ...others } = attributes;
  const { classes } = rootAttributes('plinth-text-field', extraClass ? { class: extraClass } : {});
  // The project's attributes come first, so they win a clash (markup.ts).
  const { extra } = rootAttributes('plinth-text-field-input', {
    ...others,
    ...(placeholder ? { placeholder } : {}),
    ...(value !== undefined ? { value } : {}),
  });
  const state = [
    describedBy(id, description, error),
    error?.trim() ? ' aria-invalid="true"' : '',
    disabled ? ' disabled' : '',
    readonly ? ' readonly' : '',
  ].join('');
  return [
    `<div class="${classes}" data-size="${size}"${hideLabel ? ' data-label="hidden"' : ''}>`,
    `<label class="plinth-text-field-label" for="${escape(id)}">${escape(label)}</label>`,
    '<div class="plinth-text-field-control">',
    icon ? `<span class="plinth-icon" data-size="sm" aria-hidden="true">${icon}</span>` : '',
    `<input${extra} id="${escape(id)}" type="${escape(type)}" class="plinth-text-field-input"${state}>`,
    trailing ? `<span class="plinth-text-field-trailing">${trailing}</span>` : '',
    '</div>',
    fieldMessages('plinth-text-field', id, description, error),
    '</div>',
  ].join('');
}
