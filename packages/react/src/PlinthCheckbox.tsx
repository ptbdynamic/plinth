// Markup contract: packages/css/src/components/checkbox.css
import { useCallback, useId, type ComponentProps } from 'react';
import { classNames } from './markup';
import { fieldDescribedBy } from './text-field';

interface CheckboxOptions {
  /** The label beside the box, and its accessible name. */
  label: string;
  /** Neither checked nor not, such as a "select all" box when some are checked. */
  indeterminate?: boolean;
  /** A line under the label that says more about the choice. */
  description?: string;
  /** What is wrong; it marks the checkbox invalid. */
  error?: string;
}

/**
 * A checkbox. `className` goes on the root; every other prop (`checked`, `defaultChecked`,
 * `onChange`, `name`, `value`, `disabled`, `ref`, …) on the `<input>`.
 */
export type PlinthCheckboxProps = CheckboxOptions &
  Omit<ComponentProps<'input'>, keyof CheckboxOptions | 'type' | 'children'>;

export function PlinthCheckbox({
  label,
  id,
  indeterminate = false,
  description,
  error,
  className,
  ref,
  ...rest
}: PlinthCheckboxProps) {
  const generatedId = useId();
  // Indeterminate is a property with no attribute, so it is set when the input is attached, and
  // again when it changes; the project's ref gets the input too.
  const inputRef = useCallback(
    (element: HTMLInputElement | null) => {
      if (element) element.indeterminate = indeterminate;
      if (typeof ref === 'function') ref(element);
      else if (ref) ref.current = element;
    },
    [indeterminate, ref],
  );
  if (!label?.trim()) {
    throw new Error("<PlinthCheckbox> needs a label: it is the checkbox's accessible name.");
  }
  const inputId = id?.trim() || `plinth-checkbox-${generatedId}`;
  const hasError = Boolean(error?.trim());

  // The project's own props come after Plinth's and win, as in Blade and Vue; its class goes on
  // the root, added to Plinth's.
  return (
    <div className={classNames('plinth-checkbox', className)}>
      <input
        id={inputId}
        type="checkbox"
        className="plinth-checkbox-input"
        aria-describedby={fieldDescribedBy(inputId, description, error)}
        aria-invalid={hasError ? 'true' : undefined}
        {...rest}
        ref={inputRef}
      />
      <label className="plinth-checkbox-label" htmlFor={inputId}>
        {label}
      </label>
      {description?.trim() ? (
        <p id={`${inputId}-description`} className="plinth-checkbox-description">
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p id={`${inputId}-error`} className="plinth-checkbox-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
