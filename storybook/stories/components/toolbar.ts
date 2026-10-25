import { icon, iconInside, type IconName } from './icon.ts';
import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface ToolbarActionArgs {
  /** The action's name, shown beside its icon from 1280px. */
  label: string;
  /** A built-in glyph by name; without one (or with an unknown one) the action shows `svg`. */
  icon?: IconName;
  /** The project's own SVG (trusted, not escaped). */
  svg?: string;
  /** Hidden below 1280px, where the app shows it in the ⋯ menu instead. */
  overflow: boolean;
  disabled: boolean;
}

export interface ToolbarGroupArgs {
  /** The group's name, when it has one of its own. */
  label?: string;
  actions: ToolbarActionArgs[];
}

export interface ToolbarSearchArgs {
  /** The field's name (aria-label). */
  label: string;
  /** The scope (trusted markup): the scope button and its menu. */
  scope?: string;
}

export interface ToolbarScopeArgs {
  /** Where the search looks, as the button shows it: In: Open, All folders. */
  label: string;
}

export interface ToolbarArgs {
  /** The actions' name (aria-label on the toolbar). */
  label: string;
  /** What the actions act on, in the app's words: 2 selected, #1042. */
  target?: string;
  /** The search (trusted markup), on the start side. */
  search?: string;
  /** The actions (trusted markup): groups, then the ⋯ button and its menu. */
  actions: string;
}

/** An action's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function toolbarAction(
  { label, icon: glyph, svg, overflow, disabled }: ToolbarActionArgs,
  attributes: Attributes = {},
): string {
  // A button's type defaults to "button"; a project's own type (submit) replaces it.
  const { type = 'button', ...others } = attributes;
  const { classes, extra } = rootAttributes('plinth-button plinth-toolbar-action', others);
  const inside = iconInside(glyph, false, svg);
  return [
    `<button type="${escape(type)}" class="${classes}"${extra} data-variant="ghost" data-size="md"`,
    overflow ? ' data-overflow' : '',
    disabled ? ' disabled' : '',
    '>',
    `<span class="plinth-icon" data-size="md"${inside.attributes} aria-hidden="true">${inside.svg}</span>`,
    `<span class="plinth-button-label">${escape(label)}</span>`,
    '</button>',
  ].join('');
}

/** A group's markup contract, around its actions' markup. */
export function toolbarGroup(
  { label }: Pick<ToolbarGroupArgs, 'label'>,
  content: string,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-toolbar-group', attributes);
  return [
    `<div class="${classes}"${extra} role="group"`,
    label?.trim() ? ` aria-label="${escape(label)}"` : '',
    '>',
    content,
    '</div>',
  ].join('');
}

/** Groups of actions, as markup. */
export const toolbarGroups = (groups: ToolbarGroupArgs[]): string =>
  groups
    .map((group) =>
      toolbarGroup(group, group.actions.map((action) => toolbarAction(action)).join('')),
    )
    .join('');

/** The scope button's markup contract. */
export function toolbarScope({ label }: ToolbarScopeArgs, attributes: Attributes = {}): string {
  const { type = 'button', ...others } = attributes;
  const { classes, extra } = rootAttributes('plinth-toolbar-scope', others);
  return [
    `<button type="${escape(type)}" class="${classes}"${extra}>`,
    `<span class="plinth-toolbar-scope-label">${escape(label)}</span>`,
    icon({ name: 'chevron-down', size: 'sm', mirror: false }),
    '</button>',
  ].join('');
}

/**
 * The search's markup contract. A project's class goes on the root and every other attribute on
 * the input, where it wins.
 */
export function toolbarSearch(
  { label, scope }: ToolbarSearchArgs,
  attributes: Attributes = {},
): string {
  const { class: extraClass, type = 'search', ...others } = attributes;
  const { extra } = rootAttributes('', others);
  const classes = ['plinth-toolbar-search', extraClass].filter(Boolean).join(' ');
  return [
    `<div class="${classes}" role="search">`,
    icon({ name: 'search', size: 'sm', mirror: false }),
    `<input type="${escape(type)}" class="plinth-toolbar-search-input"${extra} aria-label="${escape(label)}">`,
    scope?.trim() ? scope : '',
    '</div>',
  ].join('');
}

/** The toolbar's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function toolbar(
  { label, target, search, actions }: ToolbarArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-toolbar', attributes);
  return [
    `<div class="${classes}"${extra}>`,
    search?.trim() ? search : '',
    target?.trim() ? `<p class="plinth-toolbar-target">${escape(target)}</p>` : '',
    `<div class="plinth-toolbar-actions" role="toolbar" aria-label="${escape(label)}">${actions}</div>`,
    '</div>',
  ].join('');
}
