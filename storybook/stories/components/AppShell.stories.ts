import type { Meta, StoryObj } from '@storybook/html-vite';
import { appShell, type AppShellArgs } from './app-shell.ts';
import {
  inboxHeader,
  sampleBar,
  sampleFolders,
  sampleMenuSheet,
  sampleNav,
  sampleReply,
  sampleTicket,
  sampleTickets,
} from './inbox.ts';
import { pageHeader } from './page-header.ts';
import { splitView } from './split-view.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/avatar.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-card.css';
import '@ptbdynamic/plinth-css/src/components/text-field.css';
import '@ptbdynamic/plinth-css/src/components/textarea.css';
import '@ptbdynamic/plinth-css/src/components/modal.css';
import '@ptbdynamic/plinth-css/src/components/sheet.css';
import '@ptbdynamic/plinth-css/src/components/menu-sheet.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/app-nav.css';
import '@ptbdynamic/plinth-css/src/components/app-bar.css';
import '@ptbdynamic/plinth-css/src/components/split-view.css';
import '@ptbdynamic/plinth-css/src/components/app-shell.css';

/** The support inbox: the page header, then the folders, the tickets and the open ticket. */
const inbox =
  inboxHeader() +
  splitView({
    pane: 'list',
    secondaryClosed: false,
    secondary: sampleFolders,
    list: sampleTickets(),
    detail: sampleTicket(),
    footer: sampleReply,
  });

/** A plain page, longer than the screen: the main scrolls on its own, under the app bar. */
const longPage =
  pageHeader({ heading: 'Settings', level: 'h1', top: true }) +
  `<div style="padding: var(--plinth-space-4); line-height: var(--plinth-font-leading-normal)">${Array.from(
    { length: 24 },
    (_, index) =>
      `<p>Section ${index + 1}. The page scrolls inside the main, and the app nav and the app bar stay where they are.</p>`,
  ).join('')}</div>`;

const meta = {
  title: 'Components/App Shell',
  // The menu sheet goes after the shell: a phone doesn't render the nav part.
  render: (args) => appShell(args) + sampleMenuSheet,
  args: { nav: sampleNav, bar: sampleBar, main: inbox },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The app's frame: the app nav full height on the start side, the app bar above the content, and the page in a `<main>` that scrolls on its own from 768px. On a phone the nav and the bar are hidden: the page header (with `top`) is the top bar, its menu button opens the menu sheet, and the document scrolls. Put the menu sheet in the main or after the shell, and leave the page header's offset at 0.",
      },
    },
  },
} satisfies Meta<AppShellArgs>;

export default meta;
type Story = StoryObj<AppShellArgs>;

/** The support inbox: the app nav, the app bar, and the page with its split view. */
export const Default: Story = {};

/** Without the app bar: the nav and the page, the page header at the top. */
export const WithoutBar: Story = { args: { bar: undefined } };

/** Without the app nav: the app bar across the top, above the page. */
export const WithoutNav: Story = { args: { nav: undefined } };

/** Only the page, in its main. */
export const PageOnly: Story = { args: { nav: undefined, bar: undefined } };

/** A page longer than the screen scrolls inside the main; the nav and the bar stay put. */
export const LongPage: Story = { args: { main: longPage } };

/** In right-to-left text the nav sits on the right, and the bar's search on its right too. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${appShell(args)}</div>${sampleMenuSheet}`,
};
