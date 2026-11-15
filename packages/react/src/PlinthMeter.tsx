// Markup contract: packages/css/src/components/meter.css
import { useId, type ComponentProps } from 'react';
import { calloutIcons } from './callout';
import { classNames } from './markup';
import { meterRange, meterTone } from './meter';
import type { Tone } from './tones';

interface MeterOptions {
  /** What is measured: "Spend this month". The meter's accessible name. */
  label: string;
  /** The amount so far. */
  value?: number | string | null;
  /** The bottom of the range (0 by default). */
  min?: number | string | null;
  /** The limit (100 by default). */
  max?: number | string | null;
  /** Where the low part of the range ends. */
  low?: number | string | null;
  /** Where the high part of the range starts. */
  high?: number | string | null;
  /** The best value: below low, within the range, or above high. */
  optimum?: number | string | null;
  /** The numbers in words, formatted by the app: "€120 of €150". */
  valueText?: string;
  /** A line under the bar: what happens at the limit. */
  description?: string;
  /** The tone the app chooses; without one, the numbers decide it. */
  tone?: Tone;
  /** The `<meter>`'s id; one is made up without it. */
  id?: string;
}

/** A value against a limit. `id` goes on the `<meter>`; every other prop on the root `<div>`. */
export type PlinthMeterProps = MeterOptions &
  Omit<ComponentProps<'div'>, keyof MeterOptions | 'children'>;

export function PlinthMeter({
  label,
  value = null,
  min = 0,
  max = 100,
  low = null,
  high = null,
  optimum = null,
  valueText,
  description,
  tone,
  id,
  className,
  ...rest
}: PlinthMeterProps) {
  const generatedId = useId();
  if (!label?.trim()) {
    throw new Error("<PlinthMeter> needs a label: it is the meter's accessible name.");
  }
  const meterId = id?.trim() || `plinth-meter-${generatedId}`;
  const numbers = { value, min, max, low, high, optimum };
  const range = meterRange(numbers);
  const dataTone = meterTone(numbers, tone);
  const text = valueText?.trim() ? valueText : undefined;
  const note = description?.trim() ? description : undefined;

  // The project's own attributes come after Plinth's and win, as in Blade and Vue; its class is
  // added to Plinth's.
  return (
    <div data-tone={dataTone} {...rest} className={classNames('plinth-meter', className)}>
      <label className="plinth-meter-label" htmlFor={meterId}>
        {label}
      </label>
      {text ? (
        <span className="plinth-meter-value" aria-hidden="true">
          {text}
        </span>
      ) : null}
      <meter
        className="plinth-meter-bar"
        id={meterId}
        min={range.min}
        max={range.max}
        low={range.low}
        high={range.high}
        optimum={range.optimum}
        value={range.value}
        aria-describedby={note ? `${meterId}-description` : undefined}
        aria-valuetext={text}
      >
        {text ?? String(range.value)}
      </meter>
      {note ? (
        <span className="plinth-meter-description" id={`${meterId}-description`}>
          {dataTone === 'neutral' ? null : (
            <span
              className="plinth-icon plinth-meter-tone"
              data-size="sm"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: calloutIcons[dataTone] }}
            />
          )}
          {note}
        </span>
      ) : null}
    </div>
  );
}
