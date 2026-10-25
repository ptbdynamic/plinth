import { iconGlyph } from './icon';

/**
 * The list row's chevron, for a row that opens something: the built-in chevron-right glyph,
 * which points the other way in right-to-left text (data-mirror). Blade's list row prints the
 * same markup.
 */
export const listRowChevron = `<span class="plinth-icon plinth-list-row-chevron" data-size="sm" data-icon="chevron-right" data-mirror aria-hidden="true">${iconGlyph('chevron-right')}</span>`;
