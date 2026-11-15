import { headingLevel, type HeadingLevel } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface SectionHeadingArgs {
  /** The section's name, its heading. */
  heading: string;
  /** The heading's element, h2 to h6 (h2 by default). */
  headingLevel?: HeadingLevel;
  /** The heading's id, for a <section aria-labelledby> around it. */
  headingId?: string;
  /** A line under the heading saying what the section holds. */
  description?: string;
  /** A hairline under the heading. */
  divider?: boolean;
  /** The actions: a button or two (trusted markup, not escaped). */
  actions?: string;
}

/**
 * The section heading's markup contract. Blade, Vue and React must print exactly this (see
 * parity.test.ts).
 */
export function sectionHeading(
  { heading, headingLevel: level, headingId, description, divider, actions }: SectionHeadingArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-section-heading', attributes);
  const tag = headingLevel(level);
  const id = headingId?.trim() ? ` id="${escape(headingId)}"` : '';
  return [
    `<div class="${classes}"${extra}${divider ? ' data-divider=""' : ''}>`,
    '<div class="plinth-section-heading-text">',
    `<${tag} class="plinth-section-heading-title"${id}>${escape(heading)}</${tag}>`,
    description?.trim()
      ? `<p class="plinth-section-heading-description">${escape(description)}</p>`
      : '',
    '</div>',
    actions?.trim() ? `<div class="plinth-section-heading-actions">${actions}</div>` : '',
    '</div>',
  ].join('');
}
