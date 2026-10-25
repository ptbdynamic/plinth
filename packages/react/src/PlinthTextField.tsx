// Markup contract: packages/css/src/components/text-field.css
import { useId, type ComponentProps, type ReactNode } from 'react';
import { classNames, hasContent } from './markup';
import { fieldDescribedBy, textFieldSize, type TextFieldSize } from './text-field';

interface TextFieldOptions {
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel?: boolean;
  size?: TextFieldSize;
  /** A line under the field that helps fill it in. */
  description?: string;
  /** What is wrong with the value; it marks the field invalid. */
  error?: string;
  /** The leading icon (Vue's `icon` slot). */
  icon?: ReactNode;
  /** A small control or hint at the end, such as a clear button (Vue's `trailing` slot). */
  trailing?: ReactNode;
}

/**
 * A text field. `className` goes on the root; every other prop (`value`, `onChange`, `name`,
 * `placeholder`, `ref`, …) on the `<input>`.
 */
export type PlinthTextFieldProps = TextFieldOptions &
  Omit<ComponentProps<'input'>, keyof TextFieldOptions | 'children'>;

export function PlinthTextField({
  label,
  hideLabel = false,
  id,
  type = 'text',
  size,
  description,
  error,
  icon,
  trailing,
  className,
  ...rest
}: PlinthTextFieldProps) {
  const generatedId = useId();
  if (!label?.trim()) {
    throw new Error("<PlinthTextField> needs a label: it is the field's accessible name.");
  }
  const inputId = id?.trim() || `plinth-text-field-${generatedId}`;
  const hasError = Boolean(error?.trim());

  // The project's own props come after Plinth's and win, as in Blade and Vue; its class goes on
  // the root, added to Plinth's.
  return (
    <div
      className={classNames('plinth-text-field', className)}
      data-size={textFieldSize(size)}
      data-label={hideLabel ? 'hidden' : undefined}
    >
      <label className="plinth-text-field-label" htmlFor={inputId}>
        {label}
      </label>
      <div className="plinth-text-field-control">
        {hasContent(icon) ? (
          <span className="plinth-icon" data-size="sm" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          type={type}
          className="plinth-text-field-input"
          aria-describedby={fieldDescribedBy(inputId, description, error)}
          aria-invalid={hasError ? 'true' : undefined}
          {...rest}
        />
        {hasContent(trailing) ? (
          <span className="plinth-text-field-trailing">{trailing}</span>
        ) : null}
      </div>
      {description?.trim() ? (
        <p id={`${inputId}-description`} className="plinth-text-field-description">
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p id={`${inputId}-error`} className="plinth-text-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
