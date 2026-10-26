import { fieldControl, fieldDescribedBy, type FieldControl } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { fieldControl, type FieldControl };

export interface FieldArgs {
  /** The field's id: the control's (or, in a group, the fieldset's), and its parts' ids. */
  id: string;
  /** The label, or a group's legend. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel: boolean;
  /** A fieldset with a legend, for a group of controls (pills, radios, checkboxes). */
  group: boolean;
  /** A mark after the label; the control says it is required itself. */
  required: boolean;
  /** A line under the control that helps fill it in. */
  description?: string;
  /** What is wrong with the value. */
  error?: string;
  /** The control's markup, the app's (trusted, not escaped). */
  control: string;
}

/**
 * The field's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts).
 * A project's attributes go on the root.
 */
export function field(
  { id, label, hideLabel, group, required, description, error, control }: FieldArgs,
  attributes: Attributes = {},
): string {
  const tag = group ? 'fieldset' : 'div';
  const describedBy = fieldDescribedBy(id, description, error);
  // The project's attributes come first, so they win a clash (markup.ts).
  const { classes, extra } = rootAttributes('plinth-field', attributes);
  const labelTag = group ? 'legend' : 'label';
  return [
    `<${tag} class="${classes}"${extra}`,
    hideLabel ? ' data-label="hidden"' : '',
    group ? ` id="${escape(id)}"` : '',
    group && describedBy ? ` aria-describedby="${escape(describedBy)}"` : '',
    '>',
    `<${labelTag} class="plinth-field-label" id="${escape(id)}-label"`,
    group ? '' : ` for="${escape(id)}"`,
    `>${escape(label)}`,
    required ? '<span class="plinth-field-required" aria-hidden="true">*</span>' : '',
    `</${labelTag}>`,
    control,
    description?.trim()
      ? `<p class="plinth-field-description" id="${escape(id)}-description">${escape(description)}</p>`
      : '',
    error?.trim()
      ? `<p class="plinth-field-error" id="${escape(id)}-error">${escape(error)}</p>`
      : '',
    `</${tag}>`,
  ].join('');
}
