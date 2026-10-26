import { fieldDescribedBy, oneTimeCodeLength } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';
import { field } from './field.ts';

export { oneTimeCodeLength, oneTimeCodeLengths } from '@ptbdynamic/plinth-vue';

export interface OneTimeCodeArgs {
  /** The input's id: the label, description and error point at it. */
  id: string;
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel: boolean;
  /** How many digits the code has, 4 to 8 (6 by default). */
  length: number;
  value?: string;
  /** A line under the code that helps fill it in. */
  description?: string;
  /** What is wrong with the code; it marks the field invalid. */
  error?: string;
  disabled: boolean;
  /** Submits the form once every digit is in (Blade, Vue and React; the markup is the same). */
  autosubmit: boolean;
}

/**
 * The one-time code's markup contract: a field (field.ts) around one input. Blade, Vue and React
 * must print exactly this (see parity.test.ts). A project's class goes on the root; its other
 * attributes on the input.
 */
export function oneTimeCode(
  { id, label, hideLabel, length, value, description, error, disabled }: OneTimeCodeArgs,
  attributes: Attributes = {},
): string {
  const { class: extraClass, ...others } = attributes;
  const digits = oneTimeCodeLength(length);
  const describedBy = fieldDescribedBy(id, description, error);
  // The project's attributes come first, so they win a clash (markup.ts).
  const { extra } = rootAttributes('plinth-one-time-code-input', {
    ...others,
    ...(value !== undefined ? { value } : {}),
  });
  const input = [
    `<input${extra} id="${escape(id)}" type="text" class="plinth-one-time-code-input"`,
    ` inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{${digits}}"`,
    ` maxlength="${digits}"`,
    describedBy ? ` aria-describedby="${escape(describedBy)}"` : '',
    error?.trim() ? ' aria-invalid="true"' : '',
    disabled ? ' disabled' : '',
    '>',
  ].join('');
  return field(
    { id, label, hideLabel, group: false, required: false, description, error, control: input },
    { class: ['plinth-one-time-code', extraClass].filter(Boolean).join(' ') },
  );
}
