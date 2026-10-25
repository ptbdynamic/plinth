import type { Meta, StoryObj } from '@storybook/html-vite';
import { appShell } from './app-shell.ts';
import {
  inboxHeader,
  sampleFolderGroups,
  sampleMenuSheet,
  sampleNoTicket,
  sampleTickets,
} from './inbox.ts';
import { navList, type NavListArgs, type NavListItemArgs } from './nav-list.ts';
import { sectionMenu } from './section-menu.ts';
import { splitView } from './split-view.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-card.css';
import '@ptbdynamic/plinth-css/src/components/list-header.css';
import '@ptbdynamic/plinth-css/src/components/modal.css';
import '@ptbdynamic/plinth-css/src/components/sheet.css';
import '@ptbdynamic/plinth-css/src/components/menu-sheet.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/section-menu.css';
import '@ptbdynamic/plinth-css/src/components/split-view.css';
import '@ptbdynamic/plinth-css/src/components/app-shell.css';
import '@ptbdynamic/plinth-css/src/components/nav-list.css';

const item = (label: string, extra: Partial<NavListItemArgs> = {}): NavListItemArgs => ({
  label,
  href: `#${label.toLowerCase().replace(/\s+/g, '-')}`,
  current: false,
  ...extra,
});

/** The column it sits in: as wide as the split view's secondary column. */
const column = (content: string) =>
  `<div style="max-inline-size: var(--plinth-split-view-secondary-width); padding: var(--plinth-space-3)">${content}</div>`;

const meta = {
  title: 'Components/Nav List',
  render: (args) => column(navList(args)),
  args: { label: 'Folders', groups: sampleFolderGroups },
  parameters: {
    docs: {
      description: {
        component:
          "A vertical list of links with counts and group headings, for a page's own navigation, such as an inbox's folders and views. Name it with `label`, put the items in groups (a heading is optional), and set `current` on the item of the view being shown: it takes a tint, an accent edge and a heavier label. It fills its column; the split view's secondary column shows it from 1280px, and below that the app shows the same items as a section menu under the page header.",
      },
    },
  },
} satisfies Meta<NavListArgs>;

export default meta;
type Story = StoryObj<NavListArgs>;

/** Two groups, the second with a heading; the current item has `aria-current="page"`. */
export const Default: Story = {};

/** One group without a heading: a plain list of views. */
export const WithoutHeadings: Story = {
  args: {
    label: 'Settings',
    groups: [
      {
        items: [
          item('Profile', { current: true }),
          item('Notifications'),
          item('Security'),
          item('Billing'),
        ],
      },
    ],
  },
};

/** No item is current, as on a page outside every view. */
export const NoneCurrent: Story = {
  args: {
    groups: sampleFolderGroups.map((group) => ({
      ...group,
      items: group.items.map((entry) => ({ ...entry, current: false })),
    })),
  },
};

/** Counts as numbers or text, a zero included; the heading here is an `<h3>`. */
export const WithCounts: Story = {
  args: {
    groups: [
      {
        heading: 'Queues',
        headingLevel: 'h3',
        items: [
          item('Open', { count: '99+', current: true }),
          item('Pending', { count: 0 }),
          item('Escalated', { count: 2 }),
        ],
      },
    ],
  },
};

/** A long label wraps, and the count keeps to the end edge. */
export const LongLabels: Story = {
  args: {
    groups: [
      {
        heading: 'Saved views with a long name',
        items: [
          item('Waiting on a reply from the customer for more than a week', { count: 14 }),
          item('Open', { count: 12, current: true }),
        ],
      },
    ],
  },
};

/** In right-to-left text the accent edge and the counts swap sides. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${column(navList(args))}</div>`,
};

/**
 * The pairing: the nav list in the split view's secondary column from 1280px, and below that the
 * same items as a section menu under the page header, rendered from the same list without the
 * headings. The app hides the section menu from 1280px with its own rule, here an inline style.
 */
export const WithSectionMenu: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => {
    const menu = sectionMenu(
      {
        label: args.label,
        nav: true,
        items: args.groups
          .flatMap((group) => group.items)
          .map(({ label, href, count, current }) => ({
            label,
            href,
            count,
            current,
            disabled: false,
          })),
      },
      { class: 'story-folders-menu' },
    );
    const style =
      '<style>@media (min-width: 1280px) { .story-folders-menu { display: none; } }</style>';
    return (
      style +
      appShell({
        main:
          inboxHeader() +
          menu +
          splitView({
            pane: 'list',
            secondaryClosed: false,
            secondary: `<div style="padding: var(--plinth-space-3)">${navList(args, { id: 'folders' })}</div>`,
            list: sampleTickets(false, 4),
            detail: sampleNoTicket,
          }),
      }) +
      sampleMenuSheet
    );
  },
};
