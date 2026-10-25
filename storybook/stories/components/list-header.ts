import { headingLevel, type HeadingLevel } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface ListHeaderArgs {
  /** The list's name, its heading. */
  heading: string;
  /** The heading's element, h2 to h6 (h2 by default). */
  headingLevel?: HeadingLevel;
  /** How many items the list holds, after the title. */
  count?: string | number | null;
  /** While selecting: how many rows are selected, in the app's words (2 selected). */
  selection?: string;
  /** The actions: icon buttons or a button (trusted markup, not escaped). */
  actions?: string;
}

/** A count prints unless it is missing or blank, as Blade's filled() decides. */
const hasCount = (count: ListHeaderArgs['count']): count is string | number =>
  count !== undefined && count !== null && String(count).trim() !== '';

/**
 * The list header's markup contract. Blade, Vue and React must print exactly this (see
 * parity.test.ts).
 */
export function listHeader(
  { heading, headingLevel: level, count, selection, actions }: ListHeaderArgs,
  attributes: Attributes = {},
): string {
  const selecting = Boolean(selection?.trim());
  const { classes, extra } = rootAttributes(
    selecting ? 'plinth-list-header is-selecting' : 'plinth-list-header',
    attributes,
  );
  const tag = headingLevel(level);
  return [
    `<div class="${classes}"${extra}>`,
    `<${tag} class="plinth-list-header-heading">`,
    `<span class="plinth-list-header-title">${escape(heading)}</span>`,
    hasCount(count) ? `<span class="plinth-list-header-count">${escape(String(count))}</span>` : '',
    `</${tag}>`,
    `<p class="plinth-list-header-selection" role="status">${selecting ? escape(selection!) : ''}</p>`,
    actions?.trim() ? `<div class="plinth-list-header-actions">${actions}</div>` : '',
    '</div>',
  ].join('');
}
