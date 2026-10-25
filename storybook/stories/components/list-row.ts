import { listRowChevron } from '@ptbdynamic/plinth-vue';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface ListRowArgs {
  title: string;
  /** A second line under the title. */
  description?: string;
  /** Markup before the title: an icon or a decorative avatar (trusted, not escaped). */
  leading?: string;
  /** Markup after the title: a value, a badge or, in a static row, a control (trusted). */
  trailing?: string;
  /** The row's own chevron, at the end, for a row that opens something. */
  chevron: boolean;
  /** Renders the row as a link. */
  href?: string;
  /** Renders the row as a button, when it has no href. */
  button: boolean;
  /** The row for the page being shown: aria-current="page", on a link or static row. */
  current: boolean;
  /** Disables a link or button row, or a selectable row's checkbox. */
  disabled: boolean;
  /** While the app is selecting: a <label> row with a checkbox in the leading slot. */
  selectable?: boolean;
  /** A selectable row that is selected: its checkbox is checked. */
  selected?: boolean;
  /** The checkbox's name, for a form; on another row, the root's (a submit button's). */
  name?: string;
  /** The checkbox's value, for a form; on another row, the root's. */
  value?: string;
}

/** The list row's markup contract. Blade and Vue must print exactly this (see parity.test.ts). */
export function listRow(
  {
    title,
    description,
    leading,
    trailing,
    chevron,
    href,
    button,
    current,
    disabled,
    selectable,
    selected,
    name,
    value,
  }: ListRowArgs,
  attributes: Attributes = {},
): string {
  const tag = selectable ? 'label' : href ? 'a' : button ? 'button' : 'div';
  // A button's type defaults to "button"; a project's own type (submit) replaces it.
  const { type = 'button', ...others } = attributes;
  const { classes, extra } = rootAttributes(
    'plinth-list-row',
    tag === 'button' ? others : attributes,
  );
  const open = [
    tag === 'button' ? `<button type="${escape(type)}"` : `<${tag}`,
    ` class="${classes}"`,
    extra,
    tag === 'a' && !disabled ? ` href="${escape(href!)}"` : '',
    current && tag !== 'button' ? ' aria-current="page"' : '',
    // Not selecting, name and value are the root's own, as they were before they were props.
    !selectable && name?.trim() ? ` name="${escape(name)}"` : '',
    !selectable && value?.trim() ? ` value="${escape(value)}"` : '',
    disabled && tag === 'button' ? ' disabled' : '',
    disabled && tag === 'a' ? ' role="link" aria-disabled="true"' : '',
    '>',
  ].join('');
  // A selectable row shows its checkbox in the leading slot, and opens nothing: no chevron.
  const checkbox = [
    '<input type="checkbox" class="plinth-list-row-checkbox"',
    name?.trim() ? ` name="${escape(name)}"` : '',
    value?.trim() ? ` value="${escape(value)}"` : '',
    selected ? ' checked' : '',
    disabled ? ' disabled' : '',
    '>',
  ].join('');
  const start = selectable ? checkbox : leading;
  const mark = chevron && !selectable;
  const end = trailing || mark;
  return [
    open,
    start ? `<span class="plinth-list-row-leading">${start}</span>` : '',
    '<span class="plinth-list-row-content">',
    `<span class="plinth-list-row-title">${escape(title)}</span>`,
    description ? `<span class="plinth-list-row-description">${escape(description)}</span>` : '',
    '</span>',
    end
      ? `<span class="plinth-list-row-trailing">${trailing ?? ''}${mark ? listRowChevron : ''}</span>`
      : '',
    `</${tag}>`,
  ].join('');
}
