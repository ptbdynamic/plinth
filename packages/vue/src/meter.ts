import { tones, type Tone } from './tones';

/** A meter's numbers (meter.css). Anything not a finite number counts as missing. */
export interface MeterNumbers {
  value?: number | string | null;
  min?: number | string | null;
  max?: number | string | null;
  low?: number | string | null;
  high?: number | string | null;
  optimum?: number | string | null;
}

/** A finite number, or undefined for anything else (a blank string included). */
export function meterNumber(value: number | string | null | undefined): number | undefined {
  if (typeof value === 'string' && value.trim() === '') return undefined;
  if (typeof value !== 'number' && typeof value !== 'string') return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

/** The numbers the meter prints: min 0 and max 100 by default, a missing value is the minimum. */
export function meterRange(numbers: MeterNumbers): {
  value: number;
  min: number;
  max: number;
  low?: number;
  high?: number;
  optimum?: number;
} {
  const min = meterNumber(numbers.min) ?? 0;
  return {
    value: meterNumber(numbers.value) ?? min,
    min,
    max: meterNumber(numbers.max) ?? 100,
    low: meterNumber(numbers.low),
    high: meterNumber(numbers.high),
    optimum: meterNumber(numbers.optimum),
  };
}

/**
 * The tone of a meter: the one the app chose, or else the browser's region for its numbers
 * (optimum: neutral, suboptimal: warning, even less good: danger), and danger past the maximum.
 */
export function meterTone(numbers: MeterNumbers, chosen?: string | null): Tone {
  if (tones.includes(chosen as Tone)) return chosen as Tone;
  const { value, min, max: given, low, high, optimum } = meterRange(numbers);
  const max = Math.max(given, min);
  if (value > max) return 'danger';
  const clamp = (number: number, lower: number) => Math.min(Math.max(number, lower), max);
  const current = clamp(value, min);
  const lowest = low === undefined ? min : clamp(low, min);
  const highest = high === undefined ? max : clamp(high, lowest);
  const best = optimum === undefined ? (min + max) / 2 : clamp(optimum, min);
  if (best < lowest) {
    if (current <= lowest) return 'neutral';
    return current <= highest ? 'warning' : 'danger';
  }
  if (best > highest) {
    if (current >= highest) return 'neutral';
    return current >= lowest ? 'warning' : 'danger';
  }
  return current >= lowest && current <= highest ? 'neutral' : 'warning';
}
