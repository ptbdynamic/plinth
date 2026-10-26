// Markup contract: packages/css/src/components/one-time-code.css
import { useId, type ChangeEvent, type ClipboardEvent, type ComponentProps } from 'react';
import { PlinthField } from './PlinthField';
import { classNames } from './markup';
import { oneTimeCodeDigits, oneTimeCodeLength, pasteOneTimeCode } from './one-time-code';

interface OneTimeCodeOptions {
  /** The label, and the field's accessible name. */
  label: string;
  /** Hides the label visually; screen readers still read it. */
  hideLabel?: boolean;
  /** How many digits the code has, 4 to 8; 6 for any other. */
  length?: number;
  /** A line under the code that helps fill it in. */
  description?: string;
  /** What is wrong with the code; it marks the field invalid. */
  error?: string;
  /** Submits the input's form once every digit is in. */
  autosubmit?: boolean;
  /** Every digit is in: the code, once it reaches its length (Vue's `complete` event). */
  onComplete?: (code: string) => void;
}

/**
 * A one-time code. `className` goes on the root; every other prop (`value`, `onChange`, `name`,
 * `ref`, …) on the `<input>`. `onChange` sees the digits only.
 */
export type PlinthOneTimeCodeProps = OneTimeCodeOptions &
  Omit<ComponentProps<'input'>, keyof OneTimeCodeOptions | 'children'>;

export function PlinthOneTimeCode({
  label,
  hideLabel = false,
  id,
  length,
  description,
  error,
  autosubmit = false,
  onComplete,
  onChange,
  onPaste,
  className,
  ...rest
}: PlinthOneTimeCodeProps) {
  const generatedId = useId();
  if (!label?.trim()) {
    throw new Error("<PlinthOneTimeCode> needs a label: it is the field's accessible name.");
  }
  const inputId = id?.trim() || `plinth-one-time-code-${generatedId}`;
  const digits = oneTimeCodeLength(length);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const code = oneTimeCodeDigits(input.value, digits);
    if (input.value !== code) input.value = code;
    onChange?.(event);
    if (code.length < digits) return;
    onComplete?.(code);
    if (autosubmit) input.form?.requestSubmit();
  }

  function paste(event: ClipboardEvent<HTMLInputElement>) {
    onPaste?.(event);
    if (!event.defaultPrevented) pasteOneTimeCode(event.currentTarget, event.nativeEvent, digits);
  }

  // The project's own props come after Plinth's and win, as in Blade and Vue; its class goes on
  // the root, added to Plinth's.
  return (
    <PlinthField
      id={inputId}
      className={classNames('plinth-one-time-code', className)}
      label={label}
      hideLabel={hideLabel}
      description={description}
      error={error}
    >
      {(control) => (
        <input
          id={control.id}
          type="text"
          className="plinth-one-time-code-input"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern={`[0-9]{${digits}}`}
          maxLength={digits}
          aria-describedby={control.describedBy}
          aria-invalid={control.invalid ? 'true' : undefined}
          onChange={change}
          onPaste={paste}
          {...rest}
        />
      )}
    </PlinthField>
  );
}
