import { iconGlyph } from './icon';

/**
 * The chevron at the end of a stat that links to its detail: the built-in chevron-right glyph,
 * which points the other way in right-to-left text (data-mirror). Blade's stat prints the same
 * markup.
 */
export const statChevron = `<span class="plinth-icon plinth-stat-chevron" data-size="sm" data-icon="chevron-right" data-mirror aria-hidden="true">${iconGlyph('chevron-right')}</span>`;
