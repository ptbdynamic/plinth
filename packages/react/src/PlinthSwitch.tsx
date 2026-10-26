// Markup contract: packages/css/src/components/switch.css
import { useId, type ComponentProps } from 'react';
import { classNames } from './markup';
import { fieldDescribedBy } from './text-field';

interface SwitchOptions {
  /** The label beside the switch, and its accessible name. */
  label: string;
  /** A line under the label that says more about the setting. */
  description?: string;
  /** What is wrong; it marks the switch invalid. */
  error?: string;
}

/**
 * A switch. `className` goes on the root; every other prop (`checked`, `defaultChecked`,
 * `onChange`, `name`, `value`, `disabled`, `ref`, …) on the `<input>`.
 */
export type PlinthSwitchProps = SwitchOptions &
  Omit<ComponentProps<'input'>, keyof SwitchOptions | 'type' | 'children'>;

export function PlinthSwitch({
  label,
  id,
  description,
  error,
  className,
  ...rest
}: PlinthSwitchProps) {
  const generatedId = useId();
  if (!label?.trim()) {
    throw new Error("<PlinthSwitch> needs a label: it is the switch's accessible name.");
  }
  const inputId = id?.trim() || `plinth-switch-${generatedId}`;
  const hasError = Boolean(error?.trim());

  // The project's own props come after Plinth's and win, as in Blade and Vue; its class goes on
  // the root, added to Plinth's.
  return (
    <div className={classNames('plinth-switch', className)}>
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        className="plinth-switch-input"
        aria-describedby={fieldDescribedBy(inputId, description, error)}
        aria-invalid={hasError ? 'true' : undefined}
        {...rest}
      />
      <label className="plinth-switch-label" htmlFor={inputId}>
        {label}
      </label>
      {description?.trim() ? (
        <p id={`${inputId}-description`} className="plinth-switch-description">
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p id={`${inputId}-error`} className="plinth-switch-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
