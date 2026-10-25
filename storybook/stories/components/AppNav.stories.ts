import type { Meta, StoryObj } from '@storybook/html-vite';
import { appNav, appNavItem, type AppNavArgs, type AppNavItemArgs } from './app-nav.ts';
import { icon } from './icon.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { listCard } from './list-card.ts';
import { menuSheet } from './menu-sheet.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-card.css';
import '@ptbdynamic/plinth-css/src/components/modal.css';
import '@ptbdynamic/plinth-css/src/components/sheet.css';
import '@ptbdynamic/plinth-css/src/components/menu-sheet.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/app-nav.css';

type SampleIcon = keyof typeof sampleIcons;

const glyph = (name: SampleIcon) => icon({ size: 'md', mirror: false, svg: sampleIcons[name] });

const item = (
  label: string,
  name: SampleIcon,
  extra: Partial<AppNavItemArgs> = {},
): AppNavItemArgs => ({
  label,
  href: `#${label.toLowerCase().replace(/\s+/g, '-')}`,
  icon: glyph(name),
  current: false,
  ...extra,
});

const items = [
  item('Content', 'file', { current: true }),
  item('Media', 'image'),
  item('Support', 'support', { count: 12 }),
  item('Settings', 'settings'),
];

const footer = appNavItem(item('Help', 'help'));

/** The app's frame: the nav full height on the start side, as the app shell places it. */
const frame = (nav: string) =>
  `<div style="display: flex; block-size: 100dvh">${nav}<main style="flex: 1"></main></div>`;

const meta = {
  title: 'Components/App Nav',
  render: (args) => frame(appNav(args)),
  args: {
    label: 'Main',
    brandName: 'Harbour',
    brandHref: '#home',
    mark: sampleIcons.mark,
    items,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The app's main navigation: a rail of icons from 768px and a sidebar from 1280px, with the app's logo at its top. On a phone it is hidden, and the menu sheet holds the same items, rendered from the same list. Name it with `label`, give every item an icon (all the rail shows), and set `current` on the item of the page being shown. In the rail the footer holds items, or content no wider than 40px.",
      },
    },
  },
} satisfies Meta<AppNavArgs>;

export default meta;
type Story = StoryObj<AppNavArgs>;

/** The brand, then the items; the current one has `aria-current="page"`. */
export const Default: Story = {};

/** A footer on the bottom edge, for items such as Help, or the account. */
export const WithFooter: Story = { args: { footer } };

/** No item is current, as on a page outside every part of the app. */
export const NoneCurrent: Story = {
  args: { items: items.map((entry) => ({ ...entry, current: false })) },
};

/** Counts: a number after the label in the sidebar, a small pill on the icon in the rail. */
export const WithCounts: Story = {
  args: {
    items: [
      item('Inbox', 'inbox', { count: 8, current: true }),
      item('Content', 'file', { count: '99+' }),
      item('Media', 'image', { count: 0 }),
      item('Support', 'support', { count: 3 }),
    ],
  },
};

/** The brand's name is not a link: no `brandHref`. */
export const BrandWithoutLink: Story = { args: { brandHref: undefined } };

/** A mark alone names the brand itself, here with `role="img"` and a label. */
export const MarkOnly: Story = {
  args: {
    brandName: undefined,
    mark: sampleIcons.mark.replace('<svg ', '<svg role="img" aria-label="Harbour" '),
  },
};

export const WithoutBrand: Story = {
  args: { brandName: undefined, brandHref: undefined, mark: undefined },
};

/** More items than the screen holds: they scroll on their own, the footer stays put. */
export const ManyItems: Story = {
  args: {
    footer,
    items: (
      [
        ['Overview', 'globe'],
        ['Inbox', 'inbox'],
        ['Content', 'file'],
        ['Media', 'image'],
        ['Support', 'support'],
        ['Members', 'user'],
        ['Notifications', 'bell'],
        ['Favourites', 'star'],
        ['Archive', 'archive'],
        ['Trash', 'trash'],
        ['Copies', 'copy'],
        ['Search', 'search'],
        ['Reports', 'check'],
        ['Alerts', 'alert'],
        ['Settings', 'settings'],
      ] as [string, SampleIcon][]
    ).map(([label, name], index) => item(label, name, { current: index === 0 })),
  },
};

/** In right-to-left text the nav sits on the right, its edge and the current item's on its start. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${frame(appNav({ ...args, footer }))}</div>`,
};

/**
 * One list, two navigations: the app nav from 768px, and on a phone the menu sheet that the page
 * header's menu button opens, its rows rendered from the same items.
 */
export const WithMenuSheet: Story = {
  render: (args) => {
    const sheet = menuSheet({
      id: 'app-menu',
      title: 'Menu',
      closeLabel: 'Close',
      nav: listCard({
        headingLevel: 'h3',
        rows: args.items.map(({ label, href, icon: leading, current }) => ({
          title: label,
          href,
          leading,
          current,
          chevron: false,
          button: false,
          disabled: false,
        })),
      }),
    });
    const opener = iconButton(
      {
        label: 'Menu',
        variant: 'ghost',
        size: 'md',
        disabled: false,
        busy: false,
        svg: sampleIcons.menu,
      },
      { commandfor: 'app-menu', command: 'show-modal' },
    );
    return (
      frame(appNav(args)).replace(
        '<main style="flex: 1"></main>',
        `<main style="flex: 1; padding: var(--plinth-space-2)">${opener}</main>`,
      ) + sheet
    );
  },
};
