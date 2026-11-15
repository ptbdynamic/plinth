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
  /** A setting row: a <label> with a switch in the trailing slot, named by the row's title. */
  toggle?: boolean;
  /** A setting row whose switch is on. */
  checked?: boolean;
  /** The switch's id, which its title's and description's ids start with. */
  switchId?: string;
  /** The checkbox's or switch's name, for a form; on another row, the root's (a submit button's). */
  name?: string;
  /** The checkbox's or switch's value, for a form; on another row, the root's. */
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
    toggle,
    checked,
    switchId = 'plinth-list-row-switch',
    name,
    value,
  }: ListRowArgs,
  attributes: Attributes = {},
): string {
  // A selectable row wins over a setting row, and both over a link or a button.
  const setting = !selectable && Boolean(toggle);
  const control = selectable || setting;
  const tag = control ? 'label' : href ? 'a' : button ? 'button' : 'div';
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
    !control && name?.trim() ? ` name="${escape(name)}"` : '',
    !control && value?.trim() ? ` value="${escape(value)}"` : '',
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
  // A setting row's switch is named by the title alone and described by the description, so the
  // label's whole text isn't read as its name.
  const id = escape(switchId.trim() || 'plinth-list-row-switch');
  const toggleSwitch = [
    `<input type="checkbox" role="switch" class="plinth-switch-input" id="${id}"`,
    ` aria-labelledby="${id}-title"`,
    description ? ` aria-describedby="${id}-description"` : '',
    name?.trim() ? ` name="${escape(name)}"` : '',
    value?.trim() ? ` value="${escape(value)}"` : '',
    checked ? ' checked' : '',
    disabled ? ' disabled' : '',
    '>',
  ].join('');
  const start = selectable ? checkbox : leading;
  // A selectable or setting row opens nothing: no chevron.
  const mark = chevron && !control;
  const end = trailing || mark || setting;
  return [
    open,
    start ? `<span class="plinth-list-row-leading">${start}</span>` : '',
    '<span class="plinth-list-row-content">',
    setting
      ? `<span class="plinth-list-row-title" id="${id}-title">${escape(title)}</span>`
      : `<span class="plinth-list-row-title">${escape(title)}</span>`,
    description
      ? setting
        ? `<span class="plinth-list-row-description" id="${id}-description">${escape(description)}</span>`
        : `<span class="plinth-list-row-description">${escape(description)}</span>`
      : '',
    '</span>',
    end
      ? `<span class="plinth-list-row-trailing">${trailing ?? ''}${mark ? listRowChevron : ''}${setting ? toggleSwitch : ''}</span>`
      : '',
    `</${tag}>`,
  ].join('');
}
