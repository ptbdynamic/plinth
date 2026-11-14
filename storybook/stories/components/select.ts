import { selectSizes, type SelectSize } from '@ptbdynamic/plinth-vue';
import { describedBy, fieldMessages } from './text-field.ts';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { selectSizes, type SelectSize };

export interface SelectArgs {
  /** The select's id: the label, description and error point at it. */
  id: string;
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel: boolean;
  size: SelectSize;
  /** The options and option groups (the app's own markup, trusted, not escaped). */
  options: string;
  /** A first, disabled option that shows while nothing is chosen. */
  placeholder?: string;
  /** A line under the field that helps fill it in. */
  description?: string;
  /** What is wrong with the value; it marks the field invalid. */
  error?: string;
  disabled: boolean;
  required: boolean;
}

/**
 * The select's markup contract. Blade, Vue and React must print exactly this (see
 * parity.test.ts). A project's class goes on the root; its other attributes on the select.
 */
export function select(
  {
    id,
    label,
    hideLabel,
    size,
    options,
    placeholder,
    description,
    error,
    disabled,
    required,
  }: SelectArgs,
  attributes: Attributes = {},
): string {
  const { class: extraClass, ...others } = attributes;
  const { classes } = rootAttributes('plinth-select', extraClass ? { class: extraClass } : {});
  // The project's attributes come first, so they win a clash (markup.ts).
  const { extra } = rootAttributes('plinth-select-input', others);
  const state = [
    describedBy(id, description, error),
    error?.trim() ? ' aria-invalid="true"' : '',
    disabled ? ' disabled' : '',
    required ? ' required' : '',
  ].join('');
  return [
    `<div class="${classes}" data-size="${size}"${hideLabel ? ' data-label="hidden"' : ''}>`,
    `<label class="plinth-select-label" for="${escape(id)}">${escape(label)}</label>`,
    '<div class="plinth-select-control">',
    `<select${extra} id="${escape(id)}" class="plinth-select-input"${state}>`,
    placeholder?.trim() ? `<option value="" disabled selected>${escape(placeholder)}</option>` : '',
    options,
    '</select>',
    '</div>',
    fieldMessages('plinth-select', id, description, error),
    '</div>',
  ].join('');
}
