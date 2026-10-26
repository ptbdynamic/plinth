import { fieldDescribedBy } from './text-field';

/** What a field gives the control in it (field.css): Vue's slot props, React's children function. */
export interface FieldControl {
  /** The control's id, or nothing in a group, whose fieldset has it. */
  id: string | undefined;
  /** The label's id, for a control's aria-labelledby. */
  labelId: string;
  /** What the control's aria-describedby lists, or nothing; a group's fieldset has it instead. */
  describedBy: string | undefined;
  /** Whether there is an error, for the control's aria-invalid. */
  invalid: boolean;
}

/** The ids and state a field with this id, description and error gives its control. */
export function fieldControl(
  id: string,
  group: boolean,
  description: string | undefined,
  error: string | undefined,
): FieldControl {
  return {
    id: group ? undefined : id,
    labelId: `${id}-label`,
    describedBy: group ? undefined : fieldDescribedBy(id, description, error),
    invalid: Boolean(error?.trim()),
  };
}
