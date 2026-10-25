import { escape, rootAttributes, type Attributes } from './markup.ts';
import { describedBy, fieldMessages } from './text-field.ts';

export interface TextareaArgs {
  /** The textarea's id: the label, description and error point at it. */
  id: string;
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel: boolean;
  /** The lines it shows, and where it starts when it grows. */
  rows: number;
  /** Grows with its content, from rows lines to maxRows, then scrolls. */
  grow: boolean;
  /** The most lines it grows to. */
  maxRows: number;
  placeholder?: string;
  value?: string;
  /** A line under the field that helps fill it in. */
  description?: string;
  /** What is wrong with the value; it marks the field invalid. */
  error?: string;
  disabled: boolean;
  readonly: boolean;
}

/**
 * The textarea's markup contract. Blade, Vue and React must print exactly this (see
 * parity.test.ts). A project's class goes on the root; its other attributes on the textarea.
 */
export function textarea(
  {
    id,
    label,
    hideLabel,
    rows,
    grow,
    maxRows,
    placeholder,
    value,
    description,
    error,
    disabled,
    readonly,
  }: TextareaArgs,
  attributes: Attributes = {},
): string {
  const { class: extraClass, style, ...others } = attributes;
  const { classes } = rootAttributes('plinth-textarea', extraClass ? { class: extraClass } : {});
  // The project's attributes come first, so they win a clash (markup.ts); its style is added
  // after the grow's.
  const growStyle = grow
    ? `--plinth-textarea-rows: ${rows}; --plinth-textarea-max-rows: ${Math.max(maxRows, rows)};`
    : '';
  const styles = [growStyle, style].filter(Boolean).join(' ');
  const { extra } = rootAttributes('plinth-textarea-input', {
    ...others,
    ...(placeholder ? { placeholder } : {}),
  });
  const state = [
    grow ? ' data-grow' : '',
    styles ? ` style="${escape(styles)}"` : '',
    describedBy(id, description, error),
    error?.trim() ? ' aria-invalid="true"' : '',
    disabled ? ' disabled' : '',
    readonly ? ' readonly' : '',
  ].join('');
  return [
    `<div class="${classes}"${hideLabel ? ' data-label="hidden"' : ''}>`,
    `<label class="plinth-textarea-label" for="${escape(id)}">${escape(label)}</label>`,
    `<textarea${extra} id="${escape(id)}" class="plinth-textarea-input" rows="${rows}"${state}>${escape(value ?? '')}</textarea>`,
    fieldMessages('plinth-textarea', id, description, error),
    '</div>',
  ].join('');
}
