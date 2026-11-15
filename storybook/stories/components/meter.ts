import { calloutIcons, meterRange, meterTone, tones, type Tone } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { tones, type Tone };

export interface MeterArgs {
  /** The meter's id: its label and description point at it. */
  id: string;
  /** What is measured: "Spend this month". The meter's accessible name. */
  label: string;
  /** The amount so far. */
  value: number;
  /** The bottom of the range (0 by default). */
  min: number;
  /** The limit (100 by default). */
  max: number;
  /** Where the low part of the range ends. */
  low?: number;
  /** Where the high part of the range starts. */
  high?: number;
  /** The best value: below low, within the range, or above high. */
  optimum?: number;
  /** The numbers in words, formatted by the app: "€120 of €150". */
  valueText?: string;
  /** A line under the bar: what happens at the limit. */
  description?: string;
  /** The tone the app chooses; without one, the numbers decide it. */
  tone?: Tone;
}

/** The meter's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function meter(args: MeterArgs, attributes: Attributes = {}): string {
  const range = meterRange(args);
  const tone = meterTone(args, args.tone);
  const { id, label } = args;
  const valueText = args.valueText?.trim() ? args.valueText : undefined;
  const description = args.description?.trim() ? args.description : undefined;
  const { classes, extra } = rootAttributes('plinth-meter', attributes);
  const optional = (name: string, value: number | string | undefined) =>
    value === undefined ? '' : ` ${name}="${escape(String(value))}"`;
  return [
    `<div class="${classes}"${extra} data-tone="${tone}">`,
    `<label class="plinth-meter-label" for="${escape(id)}">${escape(label)}</label>`,
    valueText
      ? `<span class="plinth-meter-value" aria-hidden="true">${escape(valueText)}</span>`
      : '',
    `<meter class="plinth-meter-bar" id="${escape(id)}" min="${range.min}" max="${range.max}"` +
      optional('low', range.low) +
      optional('high', range.high) +
      optional('optimum', range.optimum) +
      ` value="${range.value}"` +
      optional('aria-describedby', description ? `${id}-description` : undefined) +
      optional('aria-valuetext', valueText) +
      `>${escape(valueText ?? String(range.value))}</meter>`,
    description
      ? `<span class="plinth-meter-description" id="${escape(id)}-description">` +
        (tone === 'neutral'
          ? ''
          : `<span class="plinth-icon plinth-meter-tone" data-size="sm" aria-hidden="true">${calloutIcons[tone]}</span>`) +
        `${escape(description)}</span>`
      : '',
    '</div>',
  ].join('');
}
