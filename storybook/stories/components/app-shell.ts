import { rootAttributes, type Attributes } from './markup.ts';

export interface AppShellArgs {
  /** The app nav (trusted markup), on the start side, as tall as the screen. */
  nav?: string;
  /** The app bar (trusted markup), above the content, beside the nav. */
  bar?: string;
  /** The page (trusted markup): its page header, then its content. */
  main: string;
}

/** The app shell's markup contract. Blade, Vue and React must print exactly this (see parity.test.ts). */
export function appShell({ nav, bar, main }: AppShellArgs, attributes: Attributes = {}): string {
  const { classes, extra } = rootAttributes('plinth-app-shell', attributes);
  return [
    `<div class="${classes}"${extra}>`,
    nav?.trim() ? `<div class="plinth-app-shell-nav">${nav}</div>` : '',
    bar?.trim() ? `<div class="plinth-app-shell-bar">${bar}</div>` : '',
    `<main class="plinth-app-shell-main">${main}</main>`,
    '</div>',
  ].join('');
}
