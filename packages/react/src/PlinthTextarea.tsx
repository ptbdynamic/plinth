// Markup contract: packages/css/src/components/textarea.css
import { useId, type ComponentProps, type CSSProperties } from 'react';
import { classNames } from './markup';
import { fieldDescribedBy } from './text-field';

interface TextareaOptions {
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel?: boolean;
  /** The lines it shows, and where it starts when it grows. */
  rows?: number;
  /** Grows with its content, from rows lines to maxRows, then scrolls. */
  grow?: boolean;
  /** The most lines it grows to. */
  maxRows?: number;
  /** A line under the field that helps fill it in. */
  description?: string;
  /** What is wrong with the value; it marks the field invalid. */
  error?: string;
}

/**
 * A textarea. `className` goes on the root; every other prop (`value`, `onChange`, `name`,
 * `placeholder`, `ref`, …) on the `<textarea>`.
 */
export type PlinthTextareaProps = TextareaOptions &
  Omit<ComponentProps<'textarea'>, keyof TextareaOptions | 'children'>;

export function PlinthTextarea({
  label,
  hideLabel = false,
  id,
  rows = 3,
  grow = false,
  maxRows = 8,
  description,
  error,
  className,
  style,
  ...rest
}: PlinthTextareaProps) {
  const generatedId = useId();
  if (!label?.trim()) {
    throw new Error("<PlinthTextarea> needs a label: it is the field's accessible name.");
  }
  const inputId = id?.trim() || `plinth-textarea-${generatedId}`;
  const hasError = Boolean(error?.trim());
  // A project's style is added after the grow's custom properties, as in Blade and Vue.
  const growStyle = grow
    ? ({
        '--plinth-textarea-rows': rows,
        '--plinth-textarea-max-rows': Math.max(maxRows, rows),
        ...style,
      } as CSSProperties)
    : style;

  // The project's own props come after Plinth's and win, as in Blade and Vue; its class goes on
  // the root, added to Plinth's.
  return (
    <div
      className={classNames('plinth-textarea', className)}
      data-label={hideLabel ? 'hidden' : undefined}
    >
      <label className="plinth-textarea-label" htmlFor={inputId}>
        {label}
      </label>
      <textarea
        id={inputId}
        className="plinth-textarea-input"
        rows={rows}
        data-grow={grow ? '' : undefined}
        style={growStyle}
        aria-describedby={fieldDescribedBy(inputId, description, error)}
        aria-invalid={hasError ? 'true' : undefined}
        {...rest}
      />
      {description?.trim() ? (
        <p id={`${inputId}-description`} className="plinth-textarea-description">
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p id={`${inputId}-error`} className="plinth-textarea-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
