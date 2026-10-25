import { headingLevel, headingLevels, type HeadingLevel } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export { headingLevels, type HeadingLevel };

export interface EmptyStateArgs {
  /** What is empty, in plain words: "No runs yet". */
  heading: string;
  /** The heading's element, h2 to h6. */
  headingLevel: HeadingLevel;
  /** Why it is empty, or what fills it. */
  description?: string;
  /** Its own raised surface, for a page section with nothing around it (data-framed). */
  framed: boolean;
  /** The project's own icon, decorative (trusted markup, not escaped). */
  icon?: string;
  /** The action: usually one button or link (trusted markup). */
  actions?: string;
}

/** The empty state's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function emptyState(
  { heading, headingLevel: level, description, framed, icon, actions }: EmptyStateArgs,
  attributes: Attributes = {},
): string {
  const tag = headingLevel(level);
  const { classes, extra } = rootAttributes('plinth-empty-state', attributes);
  return [
    // A project's data-framed wins over the empty state's own.
    `<div class="${classes}"${extra}${framed && !('data-framed' in attributes) ? ' data-framed' : ''}>`,
    icon?.trim() ? `<div class="plinth-empty-state-icon">${icon}</div>` : '',
    `<${tag} class="plinth-empty-state-heading">${escape(heading)}</${tag}>`,
    description?.trim()
      ? `<p class="plinth-empty-state-description">${escape(description)}</p>`
      : '',
    actions?.trim() ? `<div class="plinth-empty-state-actions">${actions}</div>` : '',
    '</div>',
  ].join('');
}
