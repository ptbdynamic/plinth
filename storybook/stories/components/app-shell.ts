import { escape, rootAttributes, type Attributes } from './markup.ts';

export interface AppShellArgs {
  /** The app nav (trusted markup), on the start side, as tall as the screen. */
  nav?: string;
  /** The section column's navigation (trusted markup), beside the nav from 1280px. */
  section?: string;
  /** The section's title, on a row as tall as the app bar, at the top of its column. */
  sectionTitle?: string;
  /** The section column's id, for aria-controls; its title takes "<id>-title". */
  sectionId?: string;
  /** Collapses the section column: data-section="closed". */
  sectionClosed?: boolean;
  /** The app bar (trusted markup), above the content, beside the nav. */
  bar?: string;
  /** The page (trusted markup): its page header, then its content. */
  main: string;
}

/** The section column: its header, when it has a title, then its body. */
function sectionColumn(section: string, title?: string, id?: string): string {
  return [
    `<div class="plinth-app-shell-section"${id ? ` id="${escape(id)}"` : ''}>`,
    title
      ? `<div class="plinth-app-shell-section-header"><p class="plinth-app-shell-section-title"${
          id ? ` id="${escape(id)}-title"` : ''
        }>${escape(title)}</p></div>`
      : '',
    `<div class="plinth-app-shell-section-body">${section}</div>`,
    '</div>',
  ].join('');
}

/** The app shell's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function appShell(
  { nav, section, sectionTitle, sectionId, sectionClosed, bar, main }: AppShellArgs,
  attributes: Attributes = {},
): string {
  const { classes, extra } = rootAttributes('plinth-app-shell', attributes);
  return [
    `<div class="${classes}"${extra}${sectionClosed ? ' data-section="closed"' : ''}>`,
    nav?.trim() ? `<div class="plinth-app-shell-nav">${nav}</div>` : '',
    section?.trim() ? sectionColumn(section, sectionTitle, sectionId) : '',
    bar?.trim() ? `<div class="plinth-app-shell-bar">${bar}</div>` : '',
    `<main class="plinth-app-shell-main">${main}</main>`,
    '</div>',
  ].join('');
}
