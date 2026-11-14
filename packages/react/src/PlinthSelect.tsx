// Markup contract: packages/css/src/components/select.css
import { useId, type ComponentProps, type ReactNode } from 'react';
import { classNames, hasContent } from './markup';
import { selectSize, type SelectSize } from './select';
import { fieldDescribedBy } from './text-field';

interface SelectOptions {
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel?: boolean;
  size?: SelectSize;
  /** A first, disabled option that shows while nothing is chosen. */
  placeholder?: string;
  /** A line under the field that helps fill it in. */
  description?: string;
  /** What is wrong with the value; it marks the field invalid. */
  error?: string;
  /** The leading icon (Vue's `icon` slot). */
  icon?: ReactNode;
}

/**
 * A select. `className` goes on the root; every other prop (`value`, `defaultValue`, `onChange`,
 * `name`, `required`, `ref`, …) on the `<select>`. The options are `children`.
 */
export type PlinthSelectProps = SelectOptions & Omit<ComponentProps<'select'>, keyof SelectOptions>;

export function PlinthSelect({
  label,
  hideLabel = false,
  id,
  size,
  placeholder,
  description,
  error,
  icon,
  className,
  children,
  ...rest
}: PlinthSelectProps) {
  const generatedId = useId();
  if (!label?.trim()) {
    throw new Error("<PlinthSelect> needs a label: it is the field's accessible name.");
  }
  const selectId = id?.trim() || `plinth-select-${generatedId}`;
  const hasError = Boolean(error?.trim());
  const hasPlaceholder = Boolean(placeholder?.trim());
  // Left alone, the browser would pick the first option that isn't disabled.
  const startsOnPlaceholder =
    hasPlaceholder && rest.value === undefined && rest.defaultValue === undefined;

  // The project's own props come after Plinth's and win, as in Blade and Vue; its class goes on
  // the root, added to Plinth's.
  return (
    <div
      className={classNames('plinth-select', className)}
      data-size={selectSize(size)}
      data-label={hideLabel ? 'hidden' : undefined}
    >
      <label className="plinth-select-label" htmlFor={selectId}>
        {label}
      </label>
      <div className="plinth-select-control">
        {hasContent(icon) ? (
          <span className="plinth-icon" data-size="sm" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <select
          id={selectId}
          className="plinth-select-input"
          defaultValue={startsOnPlaceholder ? '' : undefined}
          aria-describedby={fieldDescribedBy(selectId, description, error)}
          aria-invalid={hasError ? 'true' : undefined}
          {...rest}
        >
          {hasPlaceholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>
      </div>
      {description?.trim() ? (
        <p id={`${selectId}-description`} className="plinth-select-description">
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p id={`${selectId}-error`} className="plinth-select-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
