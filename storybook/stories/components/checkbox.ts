import { escape, rootAttributes, type Attributes } from './markup.ts';
import { describedBy, fieldMessages } from './text-field.ts';

export interface CheckboxArgs {
  /** The input's id: the label, description and error point at it. */
  id: string;
  /** The label beside the box, and its accessible name. */
  label: string;
  checked: boolean;
  /** Neither checked nor not: set on the input by script, so it prints no attribute. */
  indeterminate: boolean;
  /** A line under the label that says more about the choice. */
  description?: string;
  /** What is wrong; it marks the checkbox invalid. */
  error?: string;
  disabled: boolean;
}

/**
 * The markup of a checkbox or a switch (switch.ts): a native checkbox, its label beside it, and
 * the description and error under the label. A project's class goes on the root; its other
 * attributes on the input, first, so they win a clash (markup.ts).
 */
export function choice(
  base: 'plinth-checkbox' | 'plinth-switch',
  { id, label, checked, description, error, disabled }: Omit<CheckboxArgs, 'indeterminate'>,
  attributes: Attributes = {},
): string {
  const { class: extraClass, ...others } = attributes;
  const { classes } = rootAttributes(base, extraClass ? { class: extraClass } : {});
  const { extra } = rootAttributes(`${base}-input`, others);
  const state = [
    checked ? ' checked' : '',
    describedBy(id, description, error),
    error?.trim() ? ' aria-invalid="true"' : '',
    disabled ? ' disabled' : '',
  ].join('');
  return [
    `<div class="${classes}">`,
    `<input${extra} id="${escape(id)}" type="checkbox"`,
    base === 'plinth-switch' ? ' role="switch"' : '',
    ` class="${base}-input"${state}>`,
    `<label class="${base}-label" for="${escape(id)}">${escape(label)}</label>`,
    fieldMessages(base, id, description, error),
    '</div>',
  ].join('');
}

/**
 * The checkbox's markup contract. Blade, Vue and React must print exactly this (see
 * parity.test.ts). Indeterminate is the input's property, not an attribute, so it prints nothing.
 */
export function checkbox(args: CheckboxArgs, attributes: Attributes = {}): string {
  return choice('plinth-checkbox', args, attributes);
}
