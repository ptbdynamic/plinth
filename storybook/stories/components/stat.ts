import { calloutIcons, statChevron, tones, type Tone } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { tones, type Tone };

export interface StatArgs {
  /** What the number is: "Runs today". */
  label: string;
  /** The number, formatted by the app. Empty (or missing) prints the empty state. */
  value?: string;
  /** A supporting line under the value: a change, a target or "of €150". */
  description?: string;
  /** The supporting line's tone, with its own icon so it never rests on colour alone. */
  tone: Tone;
  /** Renders the tile as a link to the detail behind the number. */
  href?: string;
  /** What screen readers say for an empty value. */
  emptyLabel: string;
}

/** The stat's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function stat(
  { label, value, description, tone, href, emptyLabel }: StatArgs,
  attributes: Attributes = {},
): string {
  const tag = href ? 'a' : 'div';
  // An unknown tone falls back to the default, as in Blade, Vue and React.
  const dataTone = tones.includes(tone) ? tone : 'neutral';
  const { classes, extra } = rootAttributes('plinth-stat', attributes);
  const empty = value === undefined || value.trim() === '';
  return [
    `<${tag} class="${classes}"${extra}${href ? ` href="${escape(href)}"` : ''} data-tone="${dataTone}">`,
    `<span class="plinth-stat-label">${escape(label)}</span>`,
    empty
      ? '<span class="plinth-stat-value is-empty"><span aria-hidden="true">—</span>' +
        `<span class="plinth-stat-empty">${escape(emptyLabel)}</span></span>`
      : `<span class="plinth-stat-value">${escape(value)}</span>`,
    description?.trim()
      ? '<span class="plinth-stat-description">' +
        (dataTone === 'neutral'
          ? ''
          : `<span class="plinth-icon plinth-stat-tone" data-size="sm" aria-hidden="true">${calloutIcons[dataTone]}</span>`) +
        `${escape(description)}</span>`
      : '',
    href ? statChevron : '',
    `</${tag}>`,
  ].join('');
}
