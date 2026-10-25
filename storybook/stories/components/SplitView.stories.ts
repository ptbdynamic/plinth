import type { Meta, StoryObj } from '@storybook/html-vite';
import { appShell } from './app-shell.ts';
import {
  inboxHeader,
  sampleFolders,
  sampleMenuSheet,
  sampleNoTicket,
  sampleReply,
  sampleTicket,
  sampleTickets,
} from './inbox.ts';
import { splitView, splitViewPanes, type SplitViewArgs } from './split-view.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-card.css';
import '@ptbdynamic/plinth-css/src/components/text-field.css';
import '@ptbdynamic/plinth-css/src/components/textarea.css';
import '@ptbdynamic/plinth-css/src/components/modal.css';
import '@ptbdynamic/plinth-css/src/components/sheet.css';
import '@ptbdynamic/plinth-css/src/components/menu-sheet.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/split-view.css';
import '@ptbdynamic/plinth-css/src/components/app-shell.css';

/** The page around it, in the app shell's main: the page header, whose buttons follow the state. */
const page = (args: SplitViewArgs) =>
  appShell({
    main: inboxHeader({ back: args.pane === 'detail' }) + splitView(args),
  }) + sampleMenuSheet;

const meta = {
  title: 'Components/Split View',
  render: page,
  args: {
    pane: 'list',
    secondaryClosed: false,
    secondary: sampleFolders,
    list: sampleTickets(),
    detail: sampleTicket(),
    footer: sampleReply,
  },
  argTypes: { pane: { control: 'inline-radio', options: splitViewPanes } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Up to three panes inside a page: a secondary column (folders), a list and a detail. A phone shows one pane, the list or the detail, as the app sets `pane` from its URL; from 768px the list and the detail sit side by side, and from 1280px the secondary column too, unless `secondary-closed` (the page header's panel button, with `aria-expanded` and `aria-controls`). Each pane scrolls on its own, and the footer (a reply box) holds to the detail's bottom edge. Below 1280px, offer the secondary column's content another way.",
      },
    },
  },
} satisfies Meta<SplitViewArgs>;

export default meta;
type Story = StoryObj<SplitViewArgs>;

/** The list on a phone; the folders, the tickets and the open ticket on a wide screen. */
export const List: Story = {};

/** The detail on a phone, with a back link in the page header; the same panes on a wide screen. */
export const Detail: Story = { args: { pane: 'detail' } };

/** The secondary column collapsed, as the app's panel button does: `data-secondary="closed"`. */
export const SecondaryClosed: Story = { args: { secondaryClosed: true } };

/** Two panes: the list and the detail. */
export const WithoutSecondary: Story = { args: { secondary: undefined } };

/** Nothing open yet: the detail says so, with no reply box. */
export const NothingOpen: Story = {
  args: { list: sampleTickets(false), detail: sampleNoTicket, footer: undefined },
};

/** A long thread: the detail scrolls on its own, and the reply box holds to its bottom. */
export const LongDetail: Story = { args: { pane: 'detail', detail: sampleTicket(true) } };

/** A short list: the list pane's empty room stays its own. */
export const ShortList: Story = { args: { list: sampleTickets(true, 2) } };

/** In right-to-left text the secondary column is on the right, then the list, then the detail. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${page(args)}</div>`,
};
