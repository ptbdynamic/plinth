// Markup contract: packages/css/src/components/field.css
import { useId, type ComponentProps, type ElementType, type ReactNode, type Ref } from 'react';
import { fieldControl, type FieldControl } from './field';
import { classNames } from './markup';
import { fieldDescribedBy } from './text-field';

interface FieldOptions {
  /** The label, or a group's legend. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel?: boolean;
  /** The control's id (a group's fieldset's), and its parts'; one is generated when it is missing. */
  id?: string;
  /** A fieldset with a legend, for a group of controls (pills, radios, checkboxes). */
  group?: boolean;
  /** A mark after the label; the control says it is required itself. */
  required?: boolean;
  /** A line under the control that helps fill it in. */
  description?: string;
  /** What is wrong with the value. */
  error?: string;
  /** The control, or a function that takes the ids it points at (Vue's slot props). */
  children?: ReactNode | ((control: FieldControl) => ReactNode);
}

/**
 * A field: a `<div>`, or with `group` a `<fieldset>` (which also takes `disabled`, `name` and
 * `form`), so its `ref` is an HTMLElement. Every other prop (`className`, `data-*`, `aria-*`, …)
 * goes on the root.
 */
export type PlinthFieldProps = FieldOptions &
  Omit<ComponentProps<'div'>, keyof FieldOptions | 'ref'> &
  Pick<ComponentProps<'fieldset'>, 'disabled' | 'name' | 'form'> & { ref?: Ref<HTMLElement> };

export function PlinthField({
  label,
  hideLabel = false,
  id,
  group = false,
  required = false,
  description,
  error,
  children,
  className,
  ...rest
}: PlinthFieldProps) {
  const generatedId = useId();
  if (!label?.trim()) {
    throw new Error("<PlinthField> needs a label: it is the control's accessible name.");
  }
  const fieldId = id?.trim() || `plinth-field-${generatedId}`;
  const control = fieldControl(fieldId, group, description, error);
  const Root = (group ? 'fieldset' : 'div') as ElementType;
  const Label = group ? 'legend' : 'label';

  // The project's own props come after Plinth's and win, as in Blade and Vue; its class is added
  // to Plinth's.
  return (
    <Root
      className={classNames('plinth-field', className)}
      data-label={hideLabel ? 'hidden' : undefined}
      id={group ? fieldId : undefined}
      aria-describedby={group ? fieldDescribedBy(fieldId, description, error) : undefined}
      {...rest}
    >
      <Label
        className="plinth-field-label"
        id={control.labelId}
        htmlFor={group ? undefined : fieldId}
      >
        {label}
        {required ? (
          <span className="plinth-field-required" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      {typeof children === 'function' ? children(control) : children}
      {description?.trim() ? (
        <p className="plinth-field-description" id={`${fieldId}-description`}>
          {description}
        </p>
      ) : null}
      {control.invalid ? (
        <p className="plinth-field-error" id={`${fieldId}-error`}>
          {error}
        </p>
      ) : null}
    </Root>
  );
}
