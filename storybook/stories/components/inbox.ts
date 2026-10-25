/**
 * A made-up support inbox for the app shell, app bar and split view stories: the app nav, the app
 * bar, the page header, the folders, the tickets, the open ticket and the reply box. Neutral
 * sample content; no project's names or copy.
 */
import { appBar, appBarSearch } from './app-bar.ts';
import { appNav, appNavItem, type AppNavItemArgs } from './app-nav.ts';
import { avatar } from './avatar.ts';
import { button } from './button.ts';
import { icon } from './icon.ts';
import { iconButton, type IconButtonArgs } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { listCard } from './list-card.ts';
import type { ListRowArgs } from './list-row.ts';
import { menuSheet } from './menu-sheet.ts';
import { navList, type NavListGroupArgs, type NavListItemArgs } from './nav-list.ts';
import { pageHeader } from './page-header.ts';
import { textarea } from './textarea.ts';

type SampleIcon = keyof typeof sampleIcons;

const glyph = (name: SampleIcon) => icon({ size: 'md', mirror: false, svg: sampleIcons[name] });

const action = (label: string, extra: Partial<IconButtonArgs>, attributes = {}) =>
  iconButton(
    { label, variant: 'ghost', size: 'md', disabled: false, busy: false, ...extra },
    attributes,
  );

const navItem = (
  label: string,
  name: SampleIcon,
  extra: Partial<AppNavItemArgs> = {},
): AppNavItemArgs => ({
  label,
  href: `#${label.toLowerCase()}`,
  icon: glyph(name),
  current: false,
  ...extra,
});

export const navItems = [
  navItem('Content', 'file'),
  navItem('Media', 'image'),
  navItem('Support', 'support', { count: 12, current: true }),
  navItem('Settings', 'settings'),
];

/** The app nav: the brand, the sections (Support is current) and Help in the footer. */
export const sampleNav = appNav({
  label: 'Main',
  brandName: 'Harbour',
  brandHref: '#home',
  mark: sampleIcons.mark,
  items: navItems,
  footer: appNavItem(navItem('Help', 'help')),
});

/** The app bar: the search, which opens the app's search dialog, Notifications and the account. */
export const sampleSearch = appBarSearch(
  { label: 'Search', shortcut: '⌘K' },
  { 'aria-keyshortcuts': 'Meta+K Control+K' },
);
export const sampleActions = action('Notifications', { svg: sampleIcons.bell });
/**
 * The account: an avatar in a ghost icon button, named by its label. The avatar shows the person
 * glyph: initials would be visible text the name doesn't contain.
 */
export const sampleAccount = `<button type="button" class="plinth-button plinth-icon-button" data-variant="ghost" data-size="md" aria-label="Account">${avatar(
  { size: 'md', decorative: true },
)}</button>`;

export const sampleBar = appBar({
  search: sampleSearch,
  actions: sampleActions,
  account: sampleAccount,
});

/** The phone's menu sheet, opened by the page header's menu button, with the nav's items. */
export const sampleMenuSheet = menuSheet({
  id: 'app-menu',
  title: 'Menu',
  closeLabel: 'Close',
  nav: listCard({
    headingLevel: 'h3',
    rows: navItems.map(({ label, href, icon: leading, current }) => ({
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

/**
 * The Inbox's page header: the menu button (or, with a ticket open, a back link to the list) and
 * New ticket. The folders' panel button is left out: below 1280px it would control a column that
 * isn't shown, and Plinth gives a page header action no width of its own.
 */
export function inboxHeader({ back = false }: { back?: boolean } = {}): string {
  const leading = back
    ? action('Back to the tickets', { icon: 'back', href: '#inbox' })
    : action('Menu', { icon: 'menu' }, { commandfor: 'app-menu', command: 'show-modal' });
  const newTicket = button({
    label: 'New ticket',
    variant: 'primary',
    size: 'md',
    disabled: false,
    busy: false,
  });
  return pageHeader({ heading: 'Inbox', level: 'h1', top: true, leading, actions: newTicket });
}

const row = (title: string, extra: Partial<ListRowArgs> = {}): ListRowArgs => ({
  title,
  href: `#${title.toLowerCase().replace(/[^a-z]+/g, '-')}`,
  chevron: false,
  button: false,
  current: false,
  disabled: false,
  ...extra,
});

const pane = (content: string) => `<div style="padding: var(--plinth-space-3)">${content}</div>`;

const folder = (label: string, extra: Partial<NavListItemArgs> = {}): NavListItemArgs => ({
  label,
  href: `#${label.toLowerCase().replace(/\s+/g, '-')}`,
  current: false,
  ...extra,
});

/** The folders and the saved views; Open is current. */
export const sampleFolderGroups: NavListGroupArgs[] = [
  {
    items: [
      folder('Open', { count: 12, current: true }),
      folder('Pending', { count: 3 }),
      folder('Solved'),
      folder('Spam'),
    ],
  },
  {
    heading: 'Views',
    items: [folder('Assigned to me', { count: 5 }), folder('Unassigned', { count: 4 })],
  },
];

/** The folders, a nav list in the secondary column. */
export const sampleFolders = pane(
  navList({ label: 'Folders', groups: sampleFolderGroups }, { id: 'folders' }),
);

const subjects = [
  ['Cannot export the March report', 'Alex Kim · 10 min'],
  ['Invoice shows the wrong address', 'Jo Park · 1 h'],
  ['Two-factor code never arrives', 'Rui Silva · 3 h'],
  ['Request: dark mode for the editor', 'Mia Chen · yesterday'],
  ['Upload stops at 90%', 'Noor Ali · yesterday'],
  ['How do I add a second admin?', 'Ben Ortiz · 2 days'],
  ['Password reset link expired', 'Eva Novak · 2 days'],
  ['Webhook retries too often', 'Tom Reid · 3 days'],
  ['Wrong time zone in emails', 'Lea Haas · 4 days'],
  ['Search misses older tickets', 'Ola Berg · 5 days'],
] as const;

/** The tickets, in the list; the first one is open with `current`. */
export function sampleTickets(current = true, count: number = subjects.length): string {
  return pane(
    listCard({
      heading: 'Open tickets',
      headingLevel: 'h2',
      rows: subjects
        .slice(0, count)
        .map(([title, description], index) =>
          row(title, { description, current: current && index === 0 }),
        ),
    }),
  );
}

const paragraphs = [
  'Hi, when I export the March report the download starts and then stops with an error. February works fine.',
  'I tried two browsers and cleared the cache. The report has about four thousand rows.',
  'Could you have a look? We need it for a meeting on Friday.',
];

/** The open ticket, in the detail; `long` repeats the thread so the detail scrolls. */
export function sampleTicket(long = false): string {
  const thread = (long ? [...paragraphs, ...paragraphs, ...paragraphs, ...paragraphs] : paragraphs)
    .map((text) => `<p>${text}</p>`)
    .join('');
  return `<article style="padding: var(--plinth-space-4); line-height: var(--plinth-font-leading-normal)"><h2 style="margin: 0; font-size: var(--plinth-font-size-lg)">Cannot export the March report</h2><p style="color: var(--plinth-color-text-muted)">Alex Kim · 10 min ago</p>${thread}</article>`;
}

/** Nothing open yet, in the detail on a wide screen. */
export const sampleNoTicket = `<p style="margin: auto; padding: var(--plinth-space-4); color: var(--plinth-color-text-muted)">Pick a ticket to read it.</p>`;

/** The reply box, the detail's footer. */
export const sampleReply = `<form style="display: flex; gap: var(--plinth-space-2); align-items: end"><div style="flex: 1; min-inline-size: 0">${textarea(
  {
    id: 'reply',
    label: 'Reply',
    hideLabel: true,
    rows: 1,
    grow: true,
    maxRows: 6,
    placeholder: 'Write a reply…',
    disabled: false,
    readonly: false,
  },
)}</div>${button({ label: 'Send', variant: 'primary', size: 'md', disabled: false, busy: false })}</form>`;
