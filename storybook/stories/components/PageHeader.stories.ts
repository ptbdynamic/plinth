import type { Meta, StoryObj } from '@storybook/html-vite';
import { button } from './button.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { listCard } from './list-card.ts';
import type { ListRowArgs } from './list-row.ts';
import { pageHeader, pageHeaderLevels, type PageHeaderArgs } from './page-header.ts';
import { sheet } from './sheet.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-card.css';
import '@ptbdynamic/plinth-css/src/components/modal.css';
import '@ptbdynamic/plinth-css/src/components/sheet.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';

const action = (
  label: string,
  svg: string,
  extra: Partial<Parameters<typeof iconButton>[0]> = {},
) =>
  iconButton({ label, variant: 'ghost', size: 'md', disabled: false, busy: false, svg, ...extra });

/** A menu button that opens the app's menu sheet with no script. */
const menu = iconButton(
  {
    label: 'Menu',
    variant: 'ghost',
    size: 'md',
    disabled: false,
    busy: false,
    svg: sampleIcons.menu,
  },
  { commandfor: 'menu', command: 'show-modal' },
);

/** A back link; its arrow points the other way in right-to-left text. */
const back = action('Back', sampleIcons.back, { href: '#inbox', mirror: true });

const search = action('Search', sampleIcons.search);
const more = action('More', sampleIcons.more);
const notifications = action('Notifications', sampleIcons.bell);

/** The page's one primary action, on the right. */
const newTicket = button({
  label: 'New ticket',
  variant: 'primary',
  size: 'md',
  disabled: false,
  busy: false,
});

const meta = {
  title: 'Components/Page header',
  render: (args) => pageHeader(args),
  args: { heading: 'Inbox', level: 'h1', top: false, leading: menu, actions: search + more },
  // The page header spans the page, as it does in an app.
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The bar at the top of a page: a leading action, the page's heading and a few actions. On a phone it is the screen's top bar (set `top` there, for the notch); in an app shell it heads the page under the app bar, with `--plinth-page-header-offset` set to the bar's height. Use `level` to make the heading an `h2` beside another page's `h1`. Every icon button needs its own label. Content scrolls under it, so the app sets `scroll-padding-block-start` on its scrolling element (the offset plus `--plinth-page-header-height`, plus `env(safe-area-inset-top)` with `top`).",
      },
    },
  },
  argTypes: {
    heading: { control: 'text' },
    level: { control: 'select', options: pageHeaderLevels },
    top: { control: 'boolean' },
    leading: { control: false },
    actions: { control: false },
  },
} satisfies Meta<PageHeaderArgs>;

export default meta;
type Story = StoryObj<PageHeaderArgs>;

/** A top-level page: a menu button, the heading and two actions. */
export const Default: Story = {};

/** A page under it: a back link leads, one action trails. */
export const WithBack: Story = { args: { heading: 'Message', leading: back, actions: more } };

/** A primary button on the right, the page's one main action. */
export const WithPrimaryAction: Story = { args: { actions: newTicket } };

/** The most icon buttons the actions hold: three. Put the rest in a menu. */
export const ThreeActions: Story = {
  args: { heading: 'Message', leading: back, actions: notifications + search + more },
};

/** The top of a section, with no leading action. */
export const WithoutLeading: Story = {
  args: { heading: 'Overview', leading: undefined, actions: notifications + search },
};

/** Just the heading: a page with nothing to go back to and no actions. */
export const HeadingOnly: Story = {
  args: { heading: 'Settings', leading: undefined, actions: undefined },
};

/** A heading too long for the bar ends in an ellipsis. */
export const LongHeading: Story = {
  args: {
    heading: 'A page heading long enough to run out of room on a phone screen',
    leading: back,
    actions: search + more,
  },
};

/** An `h2`, for a page beside another page's `h1`: it looks the same. */
export const LevelTwo: Story = {
  args: { heading: 'Ticket 1042', level: 'h2', leading: back, actions: more },
};

/** The screen's top bar (`top`): it adds the top safe-area inset, for the notch. */
export const TopBar: Story = { args: { top: true } };

const row = (title: string): ListRowArgs => ({
  title,
  href: `#${title.toLowerCase().replace(/\s+/g, '-')}`,
  chevron: true,
  button: false,
  current: false,
  disabled: false,
});

const conversations = (headingLevel: 'h2' | 'h3') =>
  Array.from({ length: 4 }, (_, card) =>
    listCard({
      heading: `Week ${card + 1}`,
      headingLevel,
      rows: ['Weekly planning', 'Design review', 'Release notes', 'Support handover'].map((title) =>
        row(`${title} ${card + 1}`),
      ),
    }),
  ).join('');

/** The menu sheet the menu button opens (commandfor="menu"); the app supplies it. */
const menuSheet = sheet({
  id: 'menu',
  title: 'Menu',
  closeLabel: 'Close',
  side: 'end',
  sidePhone: 'bottom',
  body: listCard({
    headingLevel: 'h3',
    rows: ['Inbox', 'Archive', 'Settings'].map((title) => row(title)),
  }),
});

const content =
  'display: grid; gap: var(--plinth-space-6); padding: var(--plinth-space-4); margin: 0;';

/** The phone's top bar on a page: it sticks to the top while the content scrolls under it. The
 * menu button opens the app's menu sheet. */
export const OnAPage: Story = {
  render: () =>
    `${pageHeader({ ...meta.args, top: true })}${menuSheet}<main style="${content}">${conversations('h2')}</main>`,
};

/** In an app shell, under an app bar: the page header sits in `<main>` (so it is no banner
 * landmark) and sticks below the bar, with `--plinth-page-header-offset` set to the bar's height. */
export const UnderAnAppBar: Story = {
  render: () =>
    `<div style="--plinth-page-header-offset: var(--plinth-space-12);">` +
    `<header style="position: sticky; inset-block-start: 0; z-index: var(--plinth-layer-sticky); display: flex; align-items: center; block-size: var(--plinth-space-12); padding-inline: var(--plinth-space-4); font-family: var(--plinth-font-family-body); color: var(--plinth-color-text-muted); background-color: var(--plinth-color-surface-sunken); border-block-end: var(--plinth-border-width-thin) solid var(--plinth-color-divider);">App bar</header>` +
    `<main>${pageHeader({ ...meta.args, leading: undefined, actions: newTicket })}<div style="${content}">${conversations('h2')}</div></main>` +
    `</div>`,
};

/** The same page header in right-to-left text: the parts swap sides and the back arrow points right. */
export const RightToLeft: Story = {
  render: () => `<div dir="rtl">${pageHeader({ ...meta.args, ...WithBack.args })}</div>`,
};
