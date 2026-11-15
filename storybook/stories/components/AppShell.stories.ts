import type { Meta, StoryObj } from '@storybook/html-vite';
import { appNav } from './app-nav.ts';
import { appShell, type AppShellArgs } from './app-shell.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import {
  inboxHeader,
  navItems,
  sampleBar,
  sampleFolders,
  sampleMenuSheet,
  sampleNav,
  sampleReply,
  sampleTicket,
  sampleTickets,
} from './inbox.ts';
import { listCard } from './list-card.ts';
import { navList, type NavListGroupArgs } from './nav-list.ts';
import { pageHeader } from './page-header.ts';
import { sectionMenu } from './section-menu.ts';
import { splitView } from './split-view.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/avatar.css';
import '@ptbdynamic/plinth-css/src/components/badge.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-card.css';
import '@ptbdynamic/plinth-css/src/components/list-header.css';
import '@ptbdynamic/plinth-css/src/components/text-field.css';
import '@ptbdynamic/plinth-css/src/components/textarea.css';
import '@ptbdynamic/plinth-css/src/components/modal.css';
import '@ptbdynamic/plinth-css/src/components/sheet.css';
import '@ptbdynamic/plinth-css/src/components/menu-sheet.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/app-nav.css';
import '@ptbdynamic/plinth-css/src/components/app-bar.css';
import '@ptbdynamic/plinth-css/src/components/split-view.css';
import '@ptbdynamic/plinth-css/src/components/timeline.css';
import '@ptbdynamic/plinth-css/src/components/nav-list.css';
import '@ptbdynamic/plinth-css/src/components/section-menu.css';
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
  `<div style="padding: var(--plinth-space-4)">${listCard({
    heading: 'Every setting',
    headingLevel: 'h2',
    rows: Array.from({ length: 24 }, (_, index) => ({
      title: `Setting ${index + 1}`,
      description: 'The page scrolls inside the main; the nav and the bar stay put.',
      href: `#setting-${index + 1}`,
      chevron: true,
      button: false,
      current: false,
      disabled: false,
    })),
  })}</div>`;

/** The app nav with Settings current, as the sidebar or as the rail. */
const settingsNav = (variant: 'sidebar' | 'rail') =>
  appNav({
    label: 'Main',
    brandName: 'Harbour',
    brandHref: '#home',
    variant,
    mark: sampleIcons.mark,
    items: navItems.map((item) => ({ ...item, current: item.label === 'Settings' })),
  });

const setting = (label: string, current = false) => ({
  label,
  href: `#${label.toLowerCase().replace(/\s+/g, '-')}`,
  current,
});

/** The Settings section's pages, in groups; Users is current. */
const settingsGroups: NavListGroupArgs[] = [
  { items: [setting('General'), setting('Billing')] },
  { heading: 'Access', items: [setting('Users', true), setting('Roles'), setting('Sign-in')] },
  { heading: 'Developers', items: [setting('Secrets'), setting('Webhooks'), setting('Logs')] },
];

/** The section column's navigation, named by the column's title. */
const settingsSection = navList(
  { groups: settingsGroups },
  { 'aria-labelledby': 'settings-section-title' },
);

/**
 * Below 1280px the section column isn't shown, so the page offers the same links as a section
 * menu under its page header, from the same list without the headings. The app hides it from
 * 1280px while the column shows, with its own rule (here the style in the story's render).
 */
const settingsMenu = sectionMenu(
  {
    label: 'Settings',
    nav: true,
    items: settingsGroups
      .flatMap((group) => group.items)
      .map((item) => ({ ...item, disabled: false })),
  },
  { class: 'story-section-menu' },
);

const settingsMenuRule =
  "<style>@media (min-width: 1280px) { .plinth-app-shell:not([data-section='closed']) .story-section-menu { display: none; } }</style>";

/** The Users page in the Settings section: its page header, the section menu and the people. */
const usersPage =
  pageHeader({
    heading: 'Users',
    level: 'h1',
    top: true,
    leading: iconButton(
      { label: 'Menu', icon: 'menu', variant: 'ghost', size: 'md', disabled: false, busy: false },
      { commandfor: 'app-menu', command: 'show-modal' },
    ),
  }) +
  settingsMenu +
  `<div style="padding: var(--plinth-space-4)">${listCard({
    heading: 'People with access',
    headingLevel: 'h2',
    rows: ['Alex Kim', 'Jo Park', 'Rui Silva', 'Mia Chen', 'Noor Ali', 'Ben Ortiz'].map((name) => ({
      title: name,
      description: 'Editor',
      href: `#${name.toLowerCase().replace(/\s+/g, '-')}`,
      chevron: true,
      button: false,
      current: false,
      disabled: false,
    })),
  })}</div>`;

/** The Settings section: the rail, the section column, the app bar and the Users page. */
const settings: Partial<AppShellArgs> = {
  nav: settingsNav('rail'),
  section: settingsSection,
  sectionTitle: 'Settings',
  sectionId: 'settings-section',
  main: usersPage,
};

const meta = {
  title: 'Components/App Shell',
  // The menu sheet goes after the shell: a phone doesn't render the nav part. The rule hides the
  // section stories' section menu while the section column shows.
  render: (args) => settingsMenuRule + appShell(args) + sampleMenuSheet,
  args: { nav: sampleNav, bar: sampleBar, main: inbox },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The app's frame: the app nav full height on the start side, the app bar above the content, and the page in a `<main>` that scrolls on its own from 768px. On a phone the nav and the bar are hidden: the page header (with `top`) is the top bar, its menu button opens the menu sheet, and the document scrolls. Put the menu sheet in the main or after the shell, and leave the page header's offset at 0. A section with many pages (Settings) can add a section column beside the nav from 1280px: `section` holds its navigation (a nav list named by the column's title through `aria-labelledby`), `section-title` its title and `section-id` its id, and `section-closed` collapses it for the app's button (`aria-expanded`, `aria-controls`). Below 1280px the page offers the same links as a section menu.",
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

/**
 * A section column beside the rail from 1280px: the section's title on a row as tall as the app
 * bar, and its links in groups. Below 1280px the page shows the same links as a section menu.
 */
export const Section: Story = { args: settings };

/** The section column beside the sidebar instead of the rail. */
export const SectionWithSidebar: Story = { args: { ...settings, nav: settingsNav('sidebar') } };

/**
 * The section column collapsed, as the app's button does (`aria-expanded`, `aria-controls`):
 * `data-section="closed"`. The page shows its section menu again.
 */
export const SectionClosed: Story = { args: { ...settings, sectionClosed: true } };

/** A section column without a title: no header row, and the nav names itself with a label. */
export const SectionWithoutTitle: Story = {
  args: {
    ...settings,
    sectionTitle: undefined,
    sectionId: undefined,
    section: navList({ label: 'Settings', groups: settingsGroups }),
  },
};

/** In right-to-left text the nav sits on the right, and the bar's search on its right too. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${appShell(args)}</div>${sampleMenuSheet}`,
};
