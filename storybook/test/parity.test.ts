import {
  PlinthAppBar,
  PlinthAppBarSearch,
  PlinthAppNav,
  PlinthAppNavItem,
  PlinthAppShell,
  PlinthAvatar,
  PlinthBadge,
  PlinthButton,
  PlinthCallout,
  PlinthCodeBlock,
  PlinthConfirmDialog,
  PlinthDataTable,
  PlinthDataTableCell,
  PlinthDataTableColumn,
  PlinthDataTableEmpty,
  PlinthDataTableRow,
  PlinthDataTableSort,
  PlinthDialog,
  PlinthDrawer,
  PlinthIcon,
  PlinthIconButton,
  PlinthListCard,
  PlinthListHeader,
  PlinthListRow,
  PlinthMenu,
  PlinthMenuGroup,
  PlinthMenuItem,
  PlinthMenuSeparator,
  PlinthMenuSheet,
  PlinthNavList,
  PlinthNavListGroup,
  PlinthNavListItem,
  PlinthPageHeader,
  PlinthEmptyState,
  PlinthPill,
  PlinthPillRow,
  PlinthSectionMenu,
  PlinthSectionMenuItem,
  PlinthSheet,
  PlinthSplitView,
  PlinthStat,
  PlinthTextarea,
  PlinthTextField,
  PlinthTimeline,
  PlinthTimelineEvent,
  PlinthTimelinePost,
  PlinthToolbar,
  PlinthToolbarAction,
  PlinthToolbarGroup,
  PlinthToolbarScope,
  PlinthToolbarSearch,
} from '@ptbdynamic/plinth-vue';
import {
  PlinthAppBar as ReactAppBar,
  PlinthAppBarSearch as ReactAppBarSearch,
  PlinthAppNav as ReactAppNav,
  PlinthAppNavItem as ReactAppNavItem,
  PlinthAppShell as ReactAppShell,
  PlinthAvatar as ReactAvatar,
  PlinthBadge as ReactBadge,
  PlinthButton as ReactButton,
  PlinthCallout as ReactCallout,
  PlinthCodeBlock as ReactCodeBlock,
  PlinthConfirmDialog as ReactConfirmDialog,
  PlinthDataTable as ReactDataTable,
  PlinthDataTableCell as ReactDataTableCell,
  PlinthDataTableColumn as ReactDataTableColumn,
  PlinthDataTableEmpty as ReactDataTableEmpty,
  PlinthDataTableRow as ReactDataTableRow,
  PlinthDataTableSort as ReactDataTableSort,
  PlinthDialog as ReactDialog,
  PlinthDrawer as ReactDrawer,
  PlinthIcon as ReactIcon,
  PlinthIconButton as ReactIconButton,
  PlinthListCard as ReactListCard,
  PlinthListHeader as ReactListHeader,
  PlinthListRow as ReactListRow,
  PlinthMenu as ReactMenu,
  PlinthMenuGroup as ReactMenuGroup,
  PlinthMenuItem as ReactMenuItem,
  PlinthMenuSeparator as ReactMenuSeparator,
  PlinthMenuSheet as ReactMenuSheet,
  PlinthNavList as ReactNavList,
  PlinthNavListGroup as ReactNavListGroup,
  PlinthNavListItem as ReactNavListItem,
  PlinthPageHeader as ReactPageHeader,
  PlinthEmptyState as ReactEmptyState,
  PlinthPill as ReactPill,
  PlinthPillRow as ReactPillRow,
  PlinthSectionMenu as ReactSectionMenu,
  PlinthSectionMenuItem as ReactSectionMenuItem,
  PlinthSheet as ReactSheet,
  PlinthSplitView as ReactSplitView,
  PlinthStat as ReactStat,
  PlinthTextarea as ReactTextarea,
  PlinthTextField as ReactTextField,
  PlinthTimeline as ReactTimeline,
  PlinthTimelineEvent as ReactTimelineEvent,
  PlinthTimelinePost as ReactTimelinePost,
  PlinthToolbar as ReactToolbar,
  PlinthToolbarAction as ReactToolbarAction,
  PlinthToolbarGroup as ReactToolbarGroup,
  PlinthToolbarScope as ReactToolbarScope,
  PlinthToolbarSearch as ReactToolbarSearch,
} from '@ptbdynamic/plinth-react';
import { createElement, type ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createStaticVNode, h, type Component } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';
import * as appBarStories from '../stories/components/AppBar.stories.ts';
import {
  appBar,
  appBarSearch,
  type AppBarArgs,
  type AppBarSearchArgs,
} from '../stories/components/app-bar.ts';
import * as appShellStories from '../stories/components/AppShell.stories.ts';
import { appShell, type AppShellArgs } from '../stories/components/app-shell.ts';
import * as splitViewStories from '../stories/components/SplitView.stories.ts';
import { splitView, type SplitViewArgs } from '../stories/components/split-view.ts';
import * as appNavStories from '../stories/components/AppNav.stories.ts';
import {
  appNav,
  appNavItem,
  type AppNavArgs,
  type AppNavItemArgs,
} from '../stories/components/app-nav.ts';
import * as navListStories from '../stories/components/NavList.stories.ts';
import {
  navList,
  navListGroup,
  navListItem,
  type NavListArgs,
  type NavListGroupArgs,
  type NavListItemArgs,
} from '../stories/components/nav-list.ts';
import * as avatarStories from '../stories/components/Avatar.stories.ts';
import { avatar, samplePhoto, type AvatarArgs } from '../stories/components/avatar.ts';
import * as badgeStories from '../stories/components/Badge.stories.ts';
import { badge, type Attributes, type BadgeArgs } from '../stories/components/badge.ts';
import * as buttonStories from '../stories/components/Button.stories.ts';
import { button, type ButtonArgs } from '../stories/components/button.ts';
import * as calloutStories from '../stories/components/Callout.stories.ts';
import {
  callout,
  calloutRoles,
  calloutTones,
  type CalloutArgs,
} from '../stories/components/callout.ts';
import * as codeBlockStories from '../stories/components/CodeBlock.stories.ts';
import { codeBlock, type CodeBlockArgs } from '../stories/components/code-block.ts';
import { escape } from '../stories/components/markup.ts';
import * as dataTableStories from '../stories/components/DataTable.stories.ts';
import {
  dataTable,
  dataTableBody,
  dataTableCell,
  dataTableColumn,
  dataTableEmpty,
  dataTableHead,
  dataTableRow,
  dataTableSortButton,
  type DataTableArgs,
  type DataTableCellArgs,
  type DataTableColumnArgs,
  type DataTableRowArgs,
} from '../stories/components/data-table.ts';
import * as confirmDialogStories from '../stories/components/ConfirmDialog.stories.ts';
import { confirmDialog, type ConfirmDialogArgs } from '../stories/components/confirm-dialog.ts';
import * as dialogStories from '../stories/components/Dialog.stories.ts';
import { dialog, type DialogArgs } from '../stories/components/dialog.ts';
import * as iconButtonStories from '../stories/components/IconButton.stories.ts';
import { iconButton, type IconButtonArgs } from '../stories/components/icon-button.ts';
import * as iconStories from '../stories/components/Icon.stories.ts';
import { icon, type IconArgs } from '../stories/components/icon.ts';
import * as listCardStories from '../stories/components/ListCard.stories.ts';
import { listCard, listCardRows, type ListCardArgs } from '../stories/components/list-card.ts';
import * as listHeaderStories from '../stories/components/ListHeader.stories.ts';
import { listHeader, type ListHeaderArgs } from '../stories/components/list-header.ts';
import * as listRowStories from '../stories/components/ListRow.stories.ts';
import { listRow, type ListRowArgs } from '../stories/components/list-row.ts';
import * as menuStories from '../stories/components/Menu.stories.ts';
import {
  menu,
  menuEntries,
  menuGroup,
  menuItem,
  menuSeparator,
  type MenuArgs,
  type MenuItemArgs,
} from '../stories/components/menu.ts';
import * as menuSheetStories from '../stories/components/MenuSheet.stories.ts';
import { menuSheet, type MenuSheetArgs } from '../stories/components/menu-sheet.ts';
import * as emptyStateStories from '../stories/components/EmptyState.stories.ts';
import { emptyState, type EmptyStateArgs } from '../stories/components/empty-state.ts';
import * as pageHeaderStories from '../stories/components/PageHeader.stories.ts';
import {
  pageHeader,
  type PageHeaderArgs,
  type PageHeaderLevel,
} from '../stories/components/page-header.ts';
import * as pillRowStories from '../stories/components/PillRow.stories.ts';
import { pill, pillRow, type PillArgs, type PillRowArgs } from '../stories/components/pill-row.ts';
import * as sectionMenuStories from '../stories/components/SectionMenu.stories.ts';
import {
  sectionMenu,
  sectionMenuItem,
  type SectionMenuArgs,
  type SectionMenuItemArgs,
} from '../stories/components/section-menu.ts';
import * as drawerStories from '../stories/components/Drawer.stories.ts';
import { drawer, type DrawerArgs } from '../stories/components/drawer.ts';
import * as sheetStories from '../stories/components/Sheet.stories.ts';
import { sheet, type SheetArgs } from '../stories/components/sheet.ts';
import * as statStories from '../stories/components/Stat.stories.ts';
import { stat, type StatArgs } from '../stories/components/stat.ts';
import * as textareaStories from '../stories/components/Textarea.stories.ts';
import { textarea, type TextareaArgs } from '../stories/components/textarea.ts';
import * as textFieldStories from '../stories/components/TextField.stories.ts';
import { textField, type TextFieldArgs } from '../stories/components/text-field.ts';
import * as timelineStories from '../stories/components/Timeline.stories.ts';
import {
  timeline,
  timelineEntries,
  timelineEvent,
  timelinePost,
  type TimelineArgs,
  type TimelineEventArgs,
  type TimelinePostArgs,
} from '../stories/components/timeline.ts';
import * as toolbarStories from '../stories/components/Toolbar.stories.ts';
import {
  toolbar,
  toolbarAction,
  toolbarGroup,
  toolbarScope,
  toolbarSearch,
  type ToolbarActionArgs,
  type ToolbarArgs,
  type ToolbarSearchArgs,
} from '../stories/components/toolbar.ts';
import { sampleIcons } from '../stories/components/icons.ts';
import {
  htmlToReact,
  normalize,
  reactProps,
  reactStyle,
  renderBlade,
  withoutAlpine,
} from './markup.ts';

/**
 * Parity: for every story of a component, the Blade, Vue and React output must match the story's
 * markup (ignoring whitespace and attribute order). If a layer drifts from the contract, this
 * fails. Stories with their own render (galleries such as AllTones) are not single cases.
 *
 * Each component also has a case with extra attributes, as a project adds them (a class, an id,
 * data-* and aria-*), so attribute forwarding cannot drift between the layers either, and a case
 * with an attribute that clashes with one the component sets on its root, where the project's
 * value wins (docs/adr/0002). The list card, code block, app shell, toolbar and timeline event set
 * no attribute on their root but the class (the code block's id is a prop), so they have no
 * clashing case.
 *
 * React takes the same props as Vue (docs/adr/0006), so a case's React side is its Vue side
 * with slots as `children` and node props.
 */
interface ParityCase {
  story: string;
  markup: string;
  /** `html: true` when the slot is markup (an icon's SVG) rather than text. */
  vue: {
    component: Component;
    props: Record<string, unknown>;
    slot: string;
    html?: boolean;
    /** Named slots, as markup. */
    named?: Record<string, string>;
  };
  blade: {
    component: string;
    props: Record<string, unknown>;
    attributes?: Attributes;
    slot: string;
    named?: Record<string, string>;
  };
}

/** Each Vue component and its React one. */
const reactComponents = new Map<Component, unknown>([
  [PlinthAppBar, ReactAppBar],
  [PlinthAppBarSearch, ReactAppBarSearch],
  [PlinthAppNav, ReactAppNav],
  [PlinthAppShell, ReactAppShell],
  [PlinthSplitView, ReactSplitView],
  [PlinthAppNavItem, ReactAppNavItem],
  [PlinthNavList, ReactNavList],
  [PlinthNavListGroup, ReactNavListGroup],
  [PlinthNavListItem, ReactNavListItem],
  [PlinthAvatar, ReactAvatar],
  [PlinthBadge, ReactBadge],
  [PlinthStat, ReactStat],
  [PlinthButton, ReactButton],
  [PlinthCallout, ReactCallout],
  [PlinthCodeBlock, ReactCodeBlock],
  [PlinthConfirmDialog, ReactConfirmDialog],
  [PlinthDataTable, ReactDataTable],
  [PlinthDataTableCell, ReactDataTableCell],
  [PlinthDataTableColumn, ReactDataTableColumn],
  [PlinthDataTableEmpty, ReactDataTableEmpty],
  [PlinthDataTableRow, ReactDataTableRow],
  [PlinthDataTableSort, ReactDataTableSort],
  [PlinthDialog, ReactDialog],
  [PlinthDrawer, ReactDrawer],
  [PlinthIcon, ReactIcon],
  [PlinthIconButton, ReactIconButton],
  [PlinthListCard, ReactListCard],
  [PlinthListHeader, ReactListHeader],
  [PlinthListRow, ReactListRow],
  [PlinthMenu, ReactMenu],
  [PlinthMenuGroup, ReactMenuGroup],
  [PlinthMenuItem, ReactMenuItem],
  [PlinthMenuSeparator, ReactMenuSeparator],
  [PlinthMenuSheet, ReactMenuSheet],
  [PlinthPageHeader, ReactPageHeader],
  [PlinthEmptyState, ReactEmptyState],
  [PlinthPill, ReactPill],
  [PlinthPillRow, ReactPillRow],
  [PlinthSectionMenu, ReactSectionMenu],
  [PlinthSectionMenuItem, ReactSectionMenuItem],
  [PlinthSheet, ReactSheet],
  [PlinthTextarea, ReactTextarea],
  [PlinthTextField, ReactTextField],
  [PlinthTimeline, ReactTimeline],
  [PlinthTimelineEvent, ReactTimelineEvent],
  [PlinthTimelinePost, ReactTimelinePost],
  [PlinthToolbar, ReactToolbar],
  [PlinthToolbarAction, ReactToolbarAction],
  [PlinthToolbarGroup, ReactToolbarGroup],
  [PlinthToolbarScope, ReactToolbarScope],
  [PlinthToolbarSearch, ReactToolbarSearch],
]);

/**
 * A case's React output, from its Vue side: attributes become props (`class` is `className`),
 * the default slot is `children`, and named slots are props that take a node.
 */
function renderReact(component: unknown, vue: ParityCase['vue']): string {
  const slot = vue.html ? htmlToReact(vue.slot) : vue.slot;
  const named = Object.entries(vue.named ?? {}).map(([name, html]) => [name, htmlToReact(html)]);
  // An empty default slot is no children: a field's <input> can't have any.
  const attributes = reactProps(vue.props);
  // React takes a style as an object.
  if (typeof attributes.style === 'string') attributes.style = reactStyle(attributes.style);
  const props = {
    ...attributes,
    ...Object.fromEntries(named),
    ...(slot === '' ? {} : { children: slot }),
  };
  return renderToStaticMarkup(
    createElement(component as ComponentType<Record<string, unknown>>, props),
  );
}

function storyArgs<Args>(stories: Record<string, unknown>): [string, Args][] {
  const { default: meta, ...exports } = stories as {
    default: { args?: Partial<Args> };
  } & Record<string, { args?: Partial<Args>; render?: unknown }>;
  return Object.entries(exports)
    .filter(([, story]) => !story.render)
    .map(([name, story]) => [name, { ...meta.args, ...story.args } as Args]);
}

const buttonDefaults: ButtonArgs = {
  label: 'Save',
  variant: 'primary',
  size: 'md',
  disabled: false,
  busy: false,
};

const statDefaults: StatArgs = {
  label: 'Runs today',
  value: '12',
  tone: 'neutral',
  emptyLabel: 'Not available',
};

const pageHeaderDefaults: PageHeaderArgs = { heading: 'Inbox', level: 'h1', top: false };

const emptyStateDefaults: EmptyStateArgs = {
  heading: 'No runs yet',
  headingLevel: 'h2',
  framed: false,
};

const listRowDefaults: ListRowArgs = {
  title: 'Notifications',
  chevron: false,
  button: false,
  current: false,
  disabled: false,
};

const sheetDefaults: SheetArgs = {
  id: 'filters',
  title: 'Filters',
  closeLabel: 'Close',
  side: 'end',
  body: '<p>Body</p>',
  footer: '<button type="button">Apply</button>',
};

const drawerDefaults: DrawerArgs = {
  id: 'route',
  title: 'Route',
  closeLabel: 'Close',
  desktop: 'dialog',
  body: '<p>Body</p>',
  footer: '<button type="button">Start</button>',
};

const dialogDefaults: DialogArgs = {
  id: 'project',
  title: 'Edit project',
  closeLabel: 'Close',
  dismissible: true,
  sidePhone: 'center',
  body: '<p>Body</p>',
  footer: '<button type="button">Save</button>',
};

const confirmDialogDefaults: ConfirmDialogArgs = {
  id: 'archive',
  title: 'Archive 3 tickets?',
  message: 'You can bring them back.',
  kind: 'simple',
  confirmLabel: 'Archive',
  cancelLabel: 'Cancel',
  tone: 'neutral',
  busy: false,
  sidePhone: 'center',
};

const menuSheetDefaults: MenuSheetArgs = {
  id: 'menu',
  title: 'Menu',
  closeLabel: 'Close',
  userName: 'Sam Lee',
  userDetail: 'sam@example.com',
  userHref: '#profile',
  nav: '<a href="#inbox">Inbox</a>',
  account: '<button type="button">Sign out</button>',
};

const pillDefaults: PillArgs = { label: 'Open', selected: false, disabled: false };
const menuItemDefaults: MenuItemArgs = { label: 'Archive', tone: 'neutral', disabled: false };

const appNavItemDefaults: AppNavItemArgs = {
  label: 'Support',
  href: '#support',
  icon: '<span class="plinth-icon" data-size="md" aria-hidden="true"><svg viewBox="0 0 24 24"></svg></span>',
  current: false,
};

const navListItemDefaults: NavListItemArgs = { label: 'Open', href: '#open', current: false };

const navListGroupDefaults: NavListGroupArgs = {
  heading: 'Views',
  items: [navListItemDefaults],
};

const timelinePostDefaults: TimelinePostArgs = {
  author: 'Alex Morgan',
  kind: 'customer',
  detail: 'alex@example.com',
  time: '09:14',
  datetime: '2026-10-25T09:14',
  reference: '#4821',
  body: '<p>Hello</p>',
  actions: '<button type="button">Reply</button>',
};

const timelineEventDefaults: TimelineEventArgs = {
  text: 'Alex Morgan assigned it to <b>themselves</b>',
  time: '09:14',
  datetime: '2026-10-25T09:14',
};

const sectionMenuItemDefaults: SectionMenuItemArgs = {
  label: 'Tasks',
  href: '#tasks',
  current: false,
  disabled: false,
};

const dataTableColumnDefaults: DataTableColumnArgs = {
  label: 'Date',
  numeric: false,
  hideOnPhone: false,
};
const dataTableCellDefaults: DataTableCellArgs = {
  label: 'Date',
  content: '3 Oct 2026',
  kind: 'field',
  numeric: false,
  hideOnPhone: false,
};

const codeBlockDefaults: CodeBlockArgs = {
  code: 'npm ci',
  tabsLabel: 'Language',
  copy: true,
  copyLabel: 'Copy',
  copiedLabel: 'Copied',
  downloadLabel: 'Download',
  downloadedLabel: 'Downloaded',
};

const calloutDefaults: CalloutArgs = {
  tone: 'info',
  role: 'note',
  title: 'Invoices are sent at 9:00',
  text: 'Invoices you approve after that go out the next morning.',
};

const textFieldDefaults: TextFieldArgs = {
  id: 'email',
  label: 'Email',
  hideLabel: false,
  type: 'email',
  size: 'md',
  disabled: false,
  readonly: false,
};

const textareaDefaults: TextareaArgs = {
  id: 'reply',
  label: 'Reply',
  hideLabel: false,
  rows: 3,
  grow: false,
  maxRows: 8,
  disabled: false,
  readonly: false,
};

const toolbarActionDefaults: ToolbarActionArgs = {
  label: 'Assign',
  svg: sampleIcons.user,
  overflow: false,
  disabled: false,
};

const cases: ParityCase[] = [
  ...storyArgs<BadgeArgs>(badgeStories).map(([story, args]) => badgeCase(`Badge/${story}`, args)),
  badgeCase(
    'Badge/with extra attributes',
    { label: 'Paid', tone: 'success', dot: true },
    {
      class: 'ms-2',
      id: 'order-status',
      'data-testid': 'order-status',
      'data-status': 'paid',
      'aria-label': 'Order status: Paid',
    },
  ),
  badgeCase(
    'Badge/with a clashing attribute',
    { label: 'Paid', tone: 'success', dot: false },
    { 'data-tone': 'danger' },
  ),
  ...storyArgs<StatArgs>(statStories).map(([story, args]) => statCase(`Stat/${story}`, args)),
  statCase(
    'Stat/with extra attributes',
    { ...statDefaults, description: 'Up 2 points', tone: 'success', href: '#runs' },
    {
      class: 'ms-2',
      id: 'runs-today',
      'data-testid': 'runs-today',
      'aria-describedby': 'runs-note',
    },
  ),
  statCase(
    'Stat/with a clashing attribute',
    { ...statDefaults, description: 'Up 2 points', tone: 'success' },
    { 'data-tone': 'danger' },
  ),
  statCase('Stat/unknown tone and blank text', {
    ...statDefaults,
    value: ' ',
    description: ' ',
    href: ' ',
    tone: 'loud' as StatArgs['tone'],
  }),
  statCase('Stat/escaped text', {
    label: '<b>"Runs"</b>',
    value: '<i>12</i>',
    description: "Ana's & Rui's",
    tone: 'warning',
    href: '/runs?a=1&b="2"',
    emptyLabel: 'Not available',
  }),
  statCase('Stat/escaped empty label', { ...statDefaults, value: '', emptyLabel: '<b>None</b>' }),
  ...storyArgs<IconArgs>(iconStories).map(([story, args]) => iconCase(`Icon/${story}`, args)),
  iconCase(
    'Icon/with extra attributes',
    { size: 'lg', label: 'Done', mirror: false, svg: sampleIcons.check },
    { class: 'ms-2', id: 'saved-icon', 'data-testid': 'saved-icon', title: 'Saved' },
  ),
  iconCase(
    'Icon/with a clashing attribute',
    { size: 'md', mirror: false, svg: sampleIcons.check },
    { 'aria-hidden': 'false' },
  ),
  iconCase('Icon/a glyph and a slot', {
    name: 'check',
    size: 'sm',
    mirror: false,
    svg: sampleIcons.star,
  }),
  iconCase('Icon/an unknown glyph', {
    name: 'rocket' as IconArgs['name'],
    size: 'md',
    mirror: false,
    svg: sampleIcons.star,
  }),
  iconCase('Icon/a labelled glyph with mirror', {
    name: 'external',
    size: 'lg',
    label: 'Opens in a new tab',
    mirror: true,
  }),
  iconCase(
    'Icon/a glyph with a clashing attribute',
    { name: 'chevron-right', size: 'md', mirror: false },
    { 'data-icon': 'arrow' },
  ),
  ...storyArgs<ButtonArgs>(buttonStories).map(([story, args]) =>
    buttonCase(`Button/${story}`, args),
  ),
  buttonCase(
    'Button/with extra attributes',
    { label: 'Save', variant: 'primary', size: 'md', disabled: false, busy: false },
    {
      class: 'ms-2',
      id: 'save',
      'data-testid': 'save',
      'aria-describedby': 'save-help',
      type: 'submit',
    },
  ),
  buttonCase('Button/with its own aria-disabled', buttonDefaults, { 'aria-disabled': 'true' }),
  buttonCase('Button/with a clashing attribute', buttonDefaults, { 'data-variant': 'danger' }),
  buttonCase('Button/small with an icon', {
    ...buttonDefaults,
    size: 'sm',
    icon: sampleIcons.check,
    mirrorIcon: true,
  }),
  buttonCase('Button/busy with an icon', {
    ...buttonDefaults,
    busy: true,
    icon: sampleIcons.check,
  }),
  buttonCase('Button/busy link', { ...buttonDefaults, href: '#orders', busy: true }),
  buttonCase('Button/disabled and busy', { ...buttonDefaults, disabled: true, busy: true }),
  ...storyArgs<IconButtonArgs>(iconButtonStories).map(([story, args]) =>
    iconButtonCase(`Icon button/${story}`, args),
  ),
  iconButtonCase(
    'Icon button/with extra attributes',
    {
      label: 'Close',
      variant: 'secondary',
      size: 'md',
      disabled: false,
      busy: false,
      svg: sampleIcons.close,
    },
    { class: 'ms-2', id: 'close', 'data-testid': 'close', title: 'Close', type: 'submit' },
  ),
  iconButtonCase(
    'Icon button/with an aria-label attribute',
    {
      label: '',
      variant: 'ghost',
      size: 'sm',
      disabled: false,
      busy: false,
      svg: sampleIcons.more,
    },
    { 'aria-label': 'More actions' },
  ),
  withBlankLabel(
    iconButtonCase(
      'Icon button/with a blank label and an aria-label attribute',
      {
        label: '',
        variant: 'ghost',
        size: 'md',
        disabled: false,
        busy: false,
        svg: sampleIcons.arrow,
      },
      { 'aria-label': 'Next' },
    ),
  ),
  iconButtonCase(
    'Icon button/with a clashing attribute',
    {
      label: 'Bold',
      variant: 'ghost',
      size: 'md',
      disabled: false,
      busy: false,
      pressed: false,
      svg: sampleIcons.check,
    },
    { 'aria-pressed': 'mixed' },
  ),
  iconButtonCase('Icon button/pressed link', {
    label: 'Next page',
    variant: 'secondary',
    size: 'md',
    href: '#next',
    pressed: true,
    disabled: false,
    busy: false,
    svg: sampleIcons.arrow,
  }),
  iconButtonCase(
    'Icon button/link with a clashing attribute',
    {
      label: 'Next',
      variant: 'ghost',
      size: 'md',
      href: '#next',
      disabled: true,
      busy: false,
      svg: sampleIcons.check,
    },
    { role: 'button' },
  ),
  iconButtonCase('Icon button/a directional glyph link', {
    label: 'Back to runs',
    icon: 'back',
    variant: 'secondary',
    size: 'sm',
    href: '/runs',
    disabled: false,
    busy: false,
  }),
  iconButtonCase('Icon button/an unknown glyph', {
    label: 'Favourite',
    icon: 'rocket' as IconButtonArgs['icon'],
    variant: 'ghost',
    size: 'md',
    disabled: false,
    busy: false,
    svg: sampleIcons.star,
  }),
  ...storyArgs<AvatarArgs>(avatarStories).map(([story, args]) =>
    avatarCase(`Avatar/${story}`, args),
  ),
  avatarCase(
    'Avatar/with extra attributes',
    { name: 'Élio Ramos', size: 'lg', status: 'warning', statusLabel: 'Away', decorative: false },
    { class: 'ms-2', id: 'me', 'data-testid': 'me' },
  ),
  avatarCase(
    'Avatar/with a clashing attribute',
    { name: 'Sam Lee', size: 'md', decorative: false },
    { 'aria-label': 'Sam Lee, on call' },
  ),
  ...storyArgs<ListRowArgs>(listRowStories).map(([story, args]) =>
    listRowCase(`List row/${story}`, args),
  ),
  listRowCase(
    'List row/with extra attributes',
    { ...listRowDefaults, button: true },
    {
      class: 'ms-2',
      id: 'sign-out',
      'data-testid': 'sign-out',
      'aria-describedby': 'sign-out-help',
      type: 'submit',
    },
  ),
  listRowCase(
    'List row/link with extra attributes',
    { ...listRowDefaults, href: '#notifications', chevron: true },
    { class: 'ms-2', 'data-testid': 'notifications', type: 'text/html' },
  ),
  listRowCase(
    'List row/with a clashing attribute',
    { ...listRowDefaults, href: '#notifications', current: true },
    { 'aria-current': 'step' },
  ),
  listRowCase('List row/current button', { ...listRowDefaults, button: true, current: true }),
  listRowCase('List row/current static row', { ...listRowDefaults, current: true }),
  listRowCase('List row/disabled static row', { ...listRowDefaults, disabled: true }),
  listRowCase(
    'List row/selectable with extra attributes',
    { ...listRowDefaults, selectable: true, name: 'tickets[]', value: '"><b>x</b>' },
    { class: 'ms-2', id: 'ticket-1', 'data-testid': 'ticket', 'aria-describedby': 'ticket-help' },
  ),
  listRowCase(
    'List row/selectable with a clashing attribute',
    { ...listRowDefaults, selectable: true, current: true },
    { 'aria-current': 'step' },
  ),
  listRowCase('List row/selectable button', {
    ...listRowDefaults,
    button: true,
    chevron: true,
    selectable: true,
    selected: true,
  }),
  listRowCase(
    'List row/submit button with name and value',
    { ...listRowDefaults, button: true, name: 'action', value: 'archive' },
    { type: 'submit' },
  ),
  listRowCase('List row/selectable with a blank name and value', {
    ...listRowDefaults,
    selectable: true,
    name: '  ',
    value: ' ',
  }),
  ...storyArgs<ListHeaderArgs>(listHeaderStories).map(([story, args]) =>
    listHeaderCase(`List header/${story}`, args),
  ),
  listHeaderCase(
    'List header/with extra attributes',
    { heading: 'Open', count: '12' },
    { class: 'mb-4', id: 'open', 'data-testid': 'open', 'aria-labelledby': 'open-title' },
  ),
  listHeaderCase(
    'List header/with a clashing attribute',
    { heading: 'Open', selection: '2 selected' },
    { class: 'is-selecting' },
  ),
  listHeaderCase('List header/blank count and selection', {
    heading: 'Open',
    count: ' ',
    selection: '  ',
  }),
  listHeaderCase('List header/unknown heading level', {
    heading: 'Open',
    headingLevel: 'h1' as ListHeaderArgs['headingLevel'],
  }),
  listHeaderCase('List header/escaped text', {
    heading: '<b>Open</b>',
    count: '<i>12</i>',
    selection: '<b>2</b> selected',
  }),
  ...storyArgs<ListCardArgs>(listCardStories).map(([story, args]) =>
    listCardCase(`List card/${story}`, args),
  ),
  listCardCase(
    'List card/with extra attributes',
    {
      heading: 'Account',
      headingLevel: 'h3',
      footer: 'On this device only.',
      rows: [listRowDefaults],
    },
    { class: 'mb-4', id: 'account', 'data-testid': 'account', 'aria-describedby': 'account-help' },
  ),
  listCardCase('List card/blank heading and footer', {
    heading: '  ',
    headingLevel: 'h2',
    footer: ' ',
    rows: [listRowDefaults],
  }),
  listCardCase('List card/unknown heading level', {
    heading: 'Account',
    headingLevel: 'h1' as ListCardArgs['headingLevel'],
    rows: [listRowDefaults],
  }),
  ...storyArgs<PillRowArgs>(pillRowStories).map(([story, args]) =>
    pillRowCase(`Pill row/${story}`, args),
  ),
  pillRowCase(
    'Pill row/with extra attributes',
    { nav: false, pills: [pillDefaults] },
    { class: 'mb-4', id: 'status', 'data-testid': 'status', 'aria-labelledby': 'status-title' },
  ),
  pillRowCase(
    'Pill row/with a clashing attribute',
    { nav: false, pills: [pillDefaults] },
    { role: 'toolbar' },
  ),
  pillCase('Pill/Default', pillDefaults),
  pillCase('Pill/Selected', { ...pillDefaults, selected: true }),
  pillCase('Pill/WithCount', { ...pillDefaults, count: 12 }),
  pillCase('Pill/ZeroCount', { ...pillDefaults, count: 0 }),
  pillCase('Pill/Disabled', { ...pillDefaults, disabled: true }),
  pillCase('Pill/Link', { ...pillDefaults, href: '#open' }),
  pillCase('Pill/CurrentLink', { ...pillDefaults, href: '#open', selected: true, count: '3' }),
  pillCase('Pill/DisabledLink', { ...pillDefaults, href: '#open', disabled: true }),
  pillCase(
    'Pill/with extra attributes',
    { ...pillDefaults, count: 12 },
    {
      class: 'ms-2',
      id: 'open',
      'data-testid': 'open',
      'aria-describedby': 'open-help',
      type: 'submit',
    },
  ),
  pillCase(
    'Pill/link with extra attributes',
    { ...pillDefaults, href: '#open' },
    { class: 'ms-2', 'data-testid': 'open', type: 'text/html' },
  ),
  pillCase('Pill/with a clashing attribute', pillDefaults, { 'aria-pressed': 'mixed' }),
  ...storyArgs<AppNavArgs>(appNavStories).map(([story, args]) =>
    appNavCase(`App nav/${story}`, args),
  ),
  appNavCase(
    'App nav/with extra attributes',
    { label: 'Main', brandName: 'Harbour', items: [appNavItemDefaults] },
    { class: 'is-pinned', id: 'app-nav', 'data-testid': 'app-nav', 'aria-describedby': 'nav-help' },
  ),
  appNavCase(
    'App nav/with a clashing attribute',
    { label: 'Main', items: [appNavItemDefaults] },
    { 'aria-label': 'Primary' },
  ),
  appNavCase('App nav/blank text', {
    label: ' ',
    brandName: ' ',
    brandHref: ' ',
    mark: sampleIcons.mark,
    items: [],
  }),
  appNavCase('App nav/escaped text', {
    label: '"><b>x</b>',
    brandName: '<b>Harbour</b>',
    brandHref: '/?a=1&b="2"',
    items: [],
  }),
  appNavItemCase('App nav item/Default', appNavItemDefaults),
  appNavItemCase('App nav item/Current', { ...appNavItemDefaults, current: true }),
  appNavItemCase('App nav item/WithCount', { ...appNavItemDefaults, count: 12 }),
  appNavItemCase('App nav item/ZeroCount', { ...appNavItemDefaults, count: 0 }),
  appNavItemCase('App nav item/WithoutIcon', { ...appNavItemDefaults, icon: undefined }),
  appNavItemCase('App nav item/blank href and count', {
    ...appNavItemDefaults,
    href: ' ',
    count: ' ',
  }),
  appNavItemCase('App nav item/escaped text', {
    ...appNavItemDefaults,
    label: '<b>Support</b>',
    href: '/?a=1&b="2"',
    count: '<b>1</b>',
  }),
  appNavItemCase(
    'App nav item/with extra attributes',
    { ...appNavItemDefaults, count: 3 },
    { class: 'is-new', id: 'support', 'data-testid': 'support', 'wire:navigate': '' },
  ),
  appNavItemCase(
    'App nav item/with a clashing attribute',
    { ...appNavItemDefaults, current: true },
    { 'aria-current': 'location' },
  ),
  ...storyArgs<NavListArgs>(navListStories).map(([story, args]) =>
    navListCase(`Nav list/${story}`, args),
  ),
  navListCase(
    'Nav list/with extra attributes',
    { label: 'Folders', groups: [navListGroupDefaults] },
    { class: 'is-wide', id: 'folders', 'data-testid': 'folders', 'aria-describedby': 'help' },
  ),
  navListCase(
    'Nav list/with a clashing attribute',
    { label: 'Folders', groups: [navListGroupDefaults] },
    { 'aria-label': 'Mail' },
  ),
  navListCase('Nav list/blank label', { label: ' ', groups: [] }),
  navListCase('Nav list/escaped label', { label: '"><b>x</b>', groups: [] }),
  navListGroupCase('Nav list group/Default', navListGroupDefaults),
  navListGroupCase('Nav list group/WithoutHeading', { items: [navListItemDefaults] }),
  navListGroupCase('Nav list group/HeadingLevel', { ...navListGroupDefaults, headingLevel: 'h4' }),
  navListGroupCase('Nav list group/unknown level and blank heading', {
    heading: ' ',
    headingLevel: 'h1' as 'h2',
    items: [navListItemDefaults],
  }),
  navListGroupCase('Nav list group/unknown level', {
    ...navListGroupDefaults,
    headingLevel: 'h1' as 'h2',
  }),
  navListGroupCase('Nav list group/escaped heading', {
    ...navListGroupDefaults,
    heading: '<b>Views</b>',
  }),
  navListGroupCase('Nav list group/with extra attributes', navListGroupDefaults, {
    class: 'is-pinned',
    id: 'views',
    'data-testid': 'views',
    'aria-describedby': 'help',
  }),
  navListItemCase('Nav list item/Default', navListItemDefaults),
  navListItemCase('Nav list item/Current', { ...navListItemDefaults, current: true }),
  navListItemCase('Nav list item/WithCount', { ...navListItemDefaults, count: 12 }),
  navListItemCase('Nav list item/ZeroCount', { ...navListItemDefaults, count: 0 }),
  navListItemCase('Nav list item/blank href and count', {
    ...navListItemDefaults,
    href: ' ',
    count: ' ',
  }),
  navListItemCase('Nav list item/escaped text', {
    ...navListItemDefaults,
    label: '<b>Open</b>',
    href: '/?a=1&b="2"',
    count: '<b>1</b>',
  }),
  navListItemCase(
    'Nav list item/with extra attributes',
    { ...navListItemDefaults, count: 3 },
    { class: 'is-new', id: 'open', 'data-testid': 'open', 'wire:navigate': '' },
  ),
  navListItemCase(
    'Nav list item/with a clashing attribute',
    { ...navListItemDefaults, current: true },
    { 'aria-current': 'location' },
  ),
  ...storyArgs<AppShellArgs>(appShellStories).map(([story, args]) =>
    appShellCase(`App shell/${story}`, args),
  ),
  appShellCase(
    'App shell/with extra attributes',
    { main: '<p>Page</p>' },
    { class: 'is-wide', id: 'app', 'data-testid': 'shell', 'aria-busy': 'true' },
  ),
  appShellCase('App shell/blank nav and bar', { nav: ' ', bar: ' ', main: '<p>Page</p>' }),
  ...storyArgs<AppBarArgs>(appBarStories).map(([story, args]) =>
    appBarCase(`App bar/${story}`, args),
  ),
  appBarCase(
    'App bar/with extra attributes',
    { actions: '<button type="button">Help</button>' },
    { class: 'is-raised', id: 'bar', 'data-testid': 'bar', 'aria-describedby': 'bar-help' },
  ),
  appBarCase('App bar/with a clashing attribute', { account: '<i>me</i>' }, { role: 'toolbar' }),
  appBarCase('App bar/blank parts', { search: ' ', actions: ' ', account: ' ' }),
  appBarSearchCase('App bar search/Default', { label: 'Search' }),
  appBarSearchCase('App bar search/WithShortcut', { label: 'Search', shortcut: '⌘K' }),
  appBarSearchCase('App bar search/blank shortcut', { label: 'Find', shortcut: ' ' }),
  appBarSearchCase('App bar search/escaped text', { label: '<b>Find</b>', shortcut: '"K"' }),
  appBarSearchCase(
    'App bar search/with extra attributes',
    { label: 'Search', shortcut: 'Ctrl K' },
    {
      class: 'is-wide',
      id: 'search',
      'data-testid': 'search',
      'aria-keyshortcuts': 'Control+K',
      commandfor: 'search-dialog',
      command: 'show-modal',
    },
  ),
  appBarSearchCase(
    'App bar search/with a clashing attribute',
    { label: 'Search' },
    { type: 'submit' },
  ),
  ...storyArgs<SplitViewArgs>(splitViewStories).map(([story, args]) =>
    splitViewCase(`Split view/${story}`, args),
  ),
  splitViewCase(
    'Split view/with extra attributes',
    { pane: 'detail', secondaryClosed: false, list: '<p>List</p>', detail: '<p>Detail</p>' },
    { class: 'is-tall', id: 'inbox', 'data-testid': 'inbox', 'aria-busy': 'true' },
  ),
  splitViewCase(
    'Split view/with a clashing attribute',
    { pane: 'list', secondaryClosed: true, list: '<p>List</p>', detail: '<p>Detail</p>' },
    { 'data-pane': 'detail', 'data-secondary': 'open' },
  ),
  splitViewCase('Split view/unknown pane and blank slots', {
    pane: 'side' as SplitViewArgs['pane'],
    secondaryClosed: false,
    secondary: ' ',
    list: '<p>List</p>',
    detail: '<p>Detail</p>',
    footer: ' ',
  }),
  ...storyArgs<SectionMenuArgs>(sectionMenuStories).map(([story, args]) =>
    sectionMenuCase(`Section menu/${story}`, args),
  ),
  sectionMenuCase(
    'Section menu/with extra attributes',
    { nav: true, items: [sectionMenuItemDefaults] },
    { class: 'sticky', id: 'sections', 'data-testid': 'sections', 'aria-labelledby': 'title' },
  ),
  sectionMenuCase(
    'Section menu/with a clashing attribute',
    { nav: false, items: [sectionMenuItemDefaults] },
    { role: 'toolbar' },
  ),
  sectionMenuCase('Section menu/blank label', { label: ' ', nav: true, items: [] }),
  sectionMenuItemCase('Section menu item/blank href', { ...sectionMenuItemDefaults, href: ' ' }),
  sectionMenuItemCase('Section menu item/Default', sectionMenuItemDefaults),
  sectionMenuItemCase('Section menu item/Current', { ...sectionMenuItemDefaults, current: true }),
  sectionMenuItemCase('Section menu item/WithCount', { ...sectionMenuItemDefaults, count: 8 }),
  sectionMenuItemCase('Section menu item/ZeroCount', { ...sectionMenuItemDefaults, count: 0 }),
  sectionMenuItemCase('Section menu item/Disabled', { ...sectionMenuItemDefaults, disabled: true }),
  sectionMenuItemCase('Section menu item/Button', { ...sectionMenuItemDefaults, href: undefined }),
  sectionMenuItemCase('Section menu item/CurrentButton', {
    ...sectionMenuItemDefaults,
    href: undefined,
    current: true,
    count: '3',
  }),
  sectionMenuItemCase('Section menu item/DisabledButton', {
    ...sectionMenuItemDefaults,
    href: undefined,
    disabled: true,
  }),
  sectionMenuItemCase(
    'Section menu item/with extra attributes',
    { ...sectionMenuItemDefaults, count: 8 },
    { class: 'ms-2', id: 'tasks', 'data-testid': 'tasks', 'aria-describedby': 'tasks-help' },
  ),
  sectionMenuItemCase(
    'Section menu item/button with extra attributes',
    { ...sectionMenuItemDefaults, href: undefined },
    { class: 'ms-2', 'data-testid': 'week', type: 'submit' },
  ),
  sectionMenuItemCase(
    'Section menu item/with a clashing attribute',
    { ...sectionMenuItemDefaults, current: true },
    { 'aria-current': 'location' },
  ),
  ...storyArgs<MenuArgs>(menuStories).map(([story, args]) => menuCase(`Menu/${story}`, args)),
  menuCase(
    'Menu/with extra attributes',
    { id: 'ticket-actions', entries: [menuItemDefaults] },
    { class: 'is-wide', 'data-testid': 'actions', 'aria-busy': 'true' },
  ),
  menuCase(
    'Menu/with a clashing attribute',
    { id: 'ticket-actions', entries: [menuItemDefaults] },
    { popover: 'manual' },
  ),
  menuCase('Menu/id with spaces', { id: 'ticket-actions', entries: [] }, {}, ' ticket-actions '),
  menuItemCase('Menu item/Default', menuItemDefaults),
  menuItemCase('Menu item/Link', { ...menuItemDefaults, href: '#print' }),
  menuItemCase('Menu item/Danger', { ...menuItemDefaults, tone: 'danger' }),
  menuItemCase('Menu item/WithIcon', { ...menuItemDefaults, icon: sampleIcons.archive }),
  menuItemCase('Menu item/WithShortcut', { ...menuItemDefaults, shortcut: '⌘E' }),
  menuItemCase('Menu item/Disabled', { ...menuItemDefaults, disabled: true }),
  menuItemCase('Menu item/DisabledLink', { ...menuItemDefaults, href: '#print', disabled: true }),
  menuItemCase('Menu item/in a menu', menuItemDefaults, {}, 'ticket-actions'),
  menuItemCase(
    'Menu item/link in a menu',
    { ...menuItemDefaults, href: '#print' },
    {},
    'ticket-actions',
  ),
  menuItemCase('Menu item/blank href and shortcut', {
    ...menuItemDefaults,
    href: ' ',
    shortcut: ' ',
  }),
  menuItemCase('Menu item/unknown tone', { ...menuItemDefaults, tone: 'loud' as 'danger' }),
  menuItemCase(
    'Menu item/with extra attributes',
    menuItemDefaults,
    { class: 'is-busy', 'data-testid': 'archive', 'aria-keyshortcuts': 'E', type: 'submit' },
    'ticket-actions',
  ),
  menuItemCase(
    'Menu item/with a clashing attribute',
    menuItemDefaults,
    { command: '--archive' },
    'ticket-actions',
  ),
  menuGroupCase('Menu group/Default', 'Move to'),
  menuGroupCase('Menu group/blank label', ' '),
  menuGroupCase('Menu group/with extra attributes', 'Move to', {
    class: 'is-compact',
    'data-testid': 'move',
    'aria-describedby': 'move-help',
  }),
  menuGroupCase('Menu group/with a clashing attribute', 'Move to', { role: 'none' }),
  menuSeparatorCase('Menu separator/Default'),
  menuSeparatorCase('Menu separator/with extra attributes', {
    class: 'is-wide',
    'data-testid': 'separator',
    'aria-hidden': 'true',
  }),
  ...storyArgs<SheetArgs>(sheetStories).map(([story, args]) => sheetCase(`Sheet/${story}`, args)),
  sheetCase(
    'Sheet/with extra attributes',
    { ...sheetDefaults, description: 'Narrow the list down.' },
    {
      class: 'is-busy',
      'data-testid': 'filters',
      'aria-busy': 'true',
      closedby: 'closerequest',
    },
  ),
  sheetCase('Sheet/with a clashing attribute', sheetDefaults, {
    'aria-labelledby': 'filters-heading',
  }),
  sheetCase('Sheet/blank description, no footer', {
    ...sheetDefaults,
    description: '  ',
    footer: undefined,
  }),
  sheetCase('Sheet/empty footer', { ...sheetDefaults, footer: '  ' }),
  sheetCase('Sheet/id with spaces', { ...sheetDefaults, id: 'filters' }, {}, ' filters '),
  sheetCase('Sheet/unknown sides', {
    ...sheetDefaults,
    side: 'left' as SheetArgs['side'],
    sidePhone: 'right' as SheetArgs['sidePhone'],
  }),
  ...storyArgs<DrawerArgs>(drawerStories).map(([story, args]) =>
    drawerCase(`Drawer/${story}`, args),
  ),
  drawerCase(
    'Drawer/with extra attributes',
    { ...drawerDefaults, description: '12 min by bike.', snapPoints: ['peek', 'full'] },
    {
      class: 'is-busy',
      'data-testid': 'route',
      'aria-busy': 'true',
      closedby: 'closerequest',
    },
  ),
  drawerCase(
    'Drawer/with a clashing attribute',
    { ...drawerDefaults, snapPoints: ['peek', 'full'], snap: 'peek' },
    { 'data-snap': 'full' },
  ),
  drawerCase('Drawer/blank description, no footer', {
    ...drawerDefaults,
    description: '  ',
    footer: undefined,
  }),
  drawerCase('Drawer/empty footer', { ...drawerDefaults, footer: '  ' }),
  drawerCase('Drawer/id with spaces', { ...drawerDefaults, id: 'route' }, {}, ' route '),
  drawerCase('Drawer/unknown desktop and snap points', {
    ...drawerDefaults,
    desktop: 'side' as DrawerArgs['desktop'],
    snapPoints: ['top', 'full', 'half'] as DrawerArgs['snapPoints'],
    snap: 'peek',
  }),
  ...storyArgs<DialogArgs>(dialogStories).map(([story, args]) =>
    dialogCase(`Dialog/${story}`, args),
  ),
  dialogCase(
    'Dialog/with extra attributes',
    { ...dialogDefaults, description: 'The name shows to everyone.' },
    {
      class: 'is-busy',
      'data-testid': 'project',
      'aria-busy': 'true',
      closedby: 'closerequest',
    },
  ),
  dialogCase('Dialog/bottom on a phone, not dismissible', {
    ...dialogDefaults,
    sidePhone: 'bottom',
    dismissible: false,
  }),
  dialogCase('Dialog/with a clashing attribute', dialogDefaults, {
    'aria-labelledby': 'project-heading',
  }),
  dialogCase(
    'Dialog/not dismissible, with a clashing role',
    { ...dialogDefaults, dismissible: false },
    { role: 'dialog', closedby: 'none' },
  ),
  dialogCase('Dialog/blank description, no footer', {
    ...dialogDefaults,
    description: '  ',
    footer: undefined,
  }),
  dialogCase('Dialog/empty footer', { ...dialogDefaults, footer: '  ' }),
  dialogCase('Dialog/id with spaces', { ...dialogDefaults, id: 'project' }, {}, ' project '),
  dialogCase('Dialog/unknown side', {
    ...dialogDefaults,
    sidePhone: 'top' as DialogArgs['sidePhone'],
  }),
  ...storyArgs<ConfirmDialogArgs>(confirmDialogStories).map(([story, args]) =>
    confirmDialogCase(`Confirm dialog/${story}`, args),
  ),
  confirmDialogCase(
    'Confirm dialog/with extra attributes',
    { ...confirmDialogDefaults, kind: 'password' },
    { class: 'is-busy', 'data-testid': 'archive', 'aria-busy': 'true' },
  ),
  confirmDialogCase('Confirm dialog/with a clashing attribute', confirmDialogDefaults, {
    role: 'dialog',
    closedby: 'any',
  }),
  confirmDialogCase('Confirm dialog/a phrase with pattern characters', {
    ...confirmDialogDefaults,
    kind: 'type',
    phrase: ' a.b*c (d) [e] {f} |g\\h/i^$+? <j> ',
  }),
  confirmDialogCase('Confirm dialog/a label without the phrase', {
    ...confirmDialogDefaults,
    kind: 'type',
    phrase: 'harbour',
    fieldLabel: 'Type the name to confirm',
  }),
  confirmDialogCase('Confirm dialog/an error on the type kind', {
    ...confirmDialogDefaults,
    kind: 'type',
    phrase: 'harbour',
    error: 'That is not the name.',
  }),
  confirmDialogCase('Confirm dialog/an error without a field, and blank labels', {
    ...confirmDialogDefaults,
    error: 'Ignored',
    fieldLabel: '  ',
  }),
  confirmDialogCase('Confirm dialog/a blank error', {
    ...confirmDialogDefaults,
    kind: 'password',
    error: '  ',
  }),
  confirmDialogCase(
    'Confirm dialog/id with spaces',
    { ...confirmDialogDefaults, id: 'archive' },
    {},
    ' archive ',
  ),
  confirmDialogCase('Confirm dialog/unknown choices', {
    ...confirmDialogDefaults,
    kind: 'pin' as ConfirmDialogArgs['kind'],
    tone: 'loud' as ConfirmDialogArgs['tone'],
    sidePhone: 'top' as ConfirmDialogArgs['sidePhone'],
  }),
  ...storyArgs<MenuSheetArgs>(menuSheetStories).map(([story, args]) =>
    menuSheetCase(`Menu sheet/${story}`, args),
  ),
  menuSheetCase('Menu sheet/with extra attributes', menuSheetDefaults, {
    class: 'is-shell',
    'data-testid': 'menu',
    'aria-describedby': 'menu-hint',
    closedby: 'closerequest',
  }),
  menuSheetCase('Menu sheet/with a clashing attribute', menuSheetDefaults, {
    'aria-labelledby': 'menu-heading',
  }),
  menuSheetCase('Menu sheet/blank user parts and account', {
    ...menuSheetDefaults,
    userDetail: ' ',
    userHref: ' ',
    userSrc: ' ',
    account: '  ',
  }),
  menuSheetCase('Menu sheet/blank user name', { ...menuSheetDefaults, userName: '  ' }),
  menuSheetCase('Menu sheet/id with spaces', menuSheetDefaults, {}, ' menu '),
  ...storyArgs<PageHeaderArgs>(pageHeaderStories).map(([story, args]) =>
    pageHeaderCase(`Page header/${story}`, args),
  ),
  pageHeaderCase(
    'Page header/with extra attributes',
    { ...pageHeaderDefaults, actions: '<button type="button">Search</button>' },
    {
      class: 'app-header',
      id: 'top',
      title: 'Your inbox',
      'data-testid': 'header',
      'aria-label': 'Inbox',
    },
  ),
  pageHeaderCase(
    'Page header/with a clashing attribute',
    { ...pageHeaderDefaults, top: true },
    { 'data-top': 'notch' },
  ),
  pageHeaderCase('Page header/blank slots', {
    ...pageHeaderDefaults,
    heading: 'Settings',
    leading: '  ',
    actions: ' ',
  }),
  pageHeaderCase('Page header/unknown level', {
    ...pageHeaderDefaults,
    level: 'h7' as PageHeaderLevel,
  }),
  ...storyArgs<EmptyStateArgs>(emptyStateStories).map(([story, args]) =>
    emptyStateCase(`Empty state/${story}`, args),
  ),
  emptyStateCase(
    'Empty state/with extra attributes',
    { ...emptyStateDefaults, actions: '<a href="/runs/new">Start a run</a>' },
    {
      class: 'app-empty',
      id: 'runs-empty',
      'data-testid': 'empty',
      'aria-describedby': 'runs-help',
    },
  ),
  emptyStateCase(
    'Empty state/with a clashing attribute',
    { ...emptyStateDefaults, framed: true },
    { 'data-framed': 'project' },
  ),
  emptyStateCase('Empty state/blank parts', {
    ...emptyStateDefaults,
    description: ' ',
    icon: '  ',
    actions: ' ',
  }),
  emptyStateCase('Empty state/unknown level and escaped text', {
    ...emptyStateDefaults,
    heading: '<b>No runs</b> & "more"',
    description: "<i>Runs</i> show 'here'",
    headingLevel: 'h1' as EmptyStateArgs['headingLevel'],
  }),
  ...storyArgs<DataTableArgs>(dataTableStories).map(([story, args]) =>
    dataTableCase(`Data table/${story}`, args),
  ),
  dataTableCase(
    'Data table/with extra attributes',
    { caption: undefined, columns: [dataTableColumnDefaults], rows: [] },
    { class: 'mt-4', id: 'orders', 'data-testid': 'orders', 'aria-label': 'Orders' },
  ),
  dataTableCase(
    'Data table/with a clashing attribute',
    { caption: undefined, columns: [dataTableColumnDefaults], rows: [] },
    { role: 'grid' },
  ),
  dataTableCase('Data table/blank caption', {
    caption: '  ',
    columns: [dataTableColumnDefaults],
    rows: [],
  }),
  dataTableColumnCase('Data table column/Default', dataTableColumnDefaults),
  dataTableColumnCase('Data table column/Numeric', { ...dataTableColumnDefaults, numeric: true }),
  dataTableColumnCase('Data table column/HiddenOnPhone', {
    ...dataTableColumnDefaults,
    hideOnPhone: true,
  }),
  dataTableColumnCase('Data table column/Sortable', { ...dataTableColumnDefaults, sort: 'none' }),
  dataTableColumnCase('Data table column/Ascending', {
    ...dataTableColumnDefaults,
    sort: 'ascending',
    numeric: true,
  }),
  dataTableColumnCase('Data table column/Descending', {
    ...dataTableColumnDefaults,
    sort: 'descending',
  }),
  dataTableColumnCase('Data table column/unknown sort', {
    ...dataTableColumnDefaults,
    sort: 'sideways' as DataTableColumnArgs['sort'],
  }),
  dataTableColumnCase(
    'Data table column/with extra attributes',
    { ...dataTableColumnDefaults, sort: 'none' },
    { class: 'w-32', id: 'date', 'data-key': 'date', 'aria-describedby': 'date-help' },
  ),
  dataTableColumnCase('Data table column/with a clashing attribute', dataTableColumnDefaults, {
    scope: 'colgroup',
  }),
  dataTableSortCase('Data table sort/Default', 'Date'),
  dataTableSortCase('Data table sort/with extra attributes', 'Date', {
    class: 'is-busy',
    'data-key': 'date',
    'aria-describedby': 'date-help',
  }),
  dataTableSortCase('Data table sort/with a clashing attribute', 'Date', { type: 'submit' }),
  dataTableRowCase('Data table row/Default', {}),
  dataTableRowCase('Data table row/Selected', { selected: true }),
  dataTableRowCase('Data table row/NotSelected', { selected: false }),
  dataTableRowCase(
    'Data table row/with extra attributes',
    { selected: true },
    { class: 'is-new', id: 'order-1042', 'data-key': '1042', 'aria-describedby': 'order-help' },
  ),
  dataTableRowCase(
    'Data table row/with a clashing attribute',
    { selected: true },
    { 'aria-selected': 'false' },
  ),
  dataTableCellCase('Data table cell/Field', dataTableCellDefaults),
  dataTableCellCase('Data table cell/Title', { ...dataTableCellDefaults, kind: 'title' }),
  dataTableCellCase('Data table cell/Actions', {
    ...dataTableCellDefaults,
    label: undefined,
    kind: 'actions',
    content: '<button type="button">View</button>',
  }),
  dataTableCellCase('Data table cell/Numeric', {
    ...dataTableCellDefaults,
    numeric: true,
    content: '€86.50',
  }),
  dataTableCellCase('Data table cell/HiddenOnPhone', {
    ...dataTableCellDefaults,
    hideOnPhone: true,
  }),
  dataTableCellCase('Data table cell/blank label', { ...dataTableCellDefaults, label: ' ' }),
  dataTableCellCase('Data table cell/unknown kind', {
    ...dataTableCellDefaults,
    kind: 'header' as DataTableCellArgs['kind'],
  }),
  dataTableCellCase('Data table cell/with extra attributes', dataTableCellDefaults, {
    class: 'truncate',
    id: 'date-1042',
    'data-key': 'date',
    'aria-describedby': 'date-help',
  }),
  dataTableCellCase('Data table cell/with a clashing attribute', dataTableCellDefaults, {
    role: 'gridcell',
  }),
  dataTableEmptyCase('Data table empty/Default', 'No orders yet.', 5),
  dataTableEmptyCase('Data table empty/no columns', 'No orders yet.', 0),
  dataTableEmptyCase('Data table empty/with extra attributes', 'No orders yet.', 3, {
    class: 'is-filtered',
    id: 'empty',
    'data-testid': 'empty',
    'aria-describedby': 'empty-help',
  }),
  dataTableEmptyCase('Data table empty/with a clashing attribute', 'No orders yet.', 3, {
    role: 'presentation',
  }),
  iconCase(
    'Icon/with an aria-label attribute',
    { size: 'md', mirror: false, svg: sampleIcons.alert },
    { 'aria-label': 'Warning' },
  ),
  ...storyArgs<CodeBlockArgs>(codeBlockStories).map(([story, args]) =>
    codeBlockCase(`Code block/${story}`, args),
  ),
  codeBlockCase(
    'Code block/with extra attributes',
    { ...codeBlockDefaults, id: 'install', label: 'Terminal' },
    { class: 'ms-2', 'data-testid': 'install', 'aria-describedby': 'install-help' },
  ),
  codeBlockCase('Code block/blank label and id', { ...codeBlockDefaults, id: ' ', label: '  ' }),
  codeBlockCase('Code block/blank label slot', { ...codeBlockDefaults, labelHtml: ' ' }),
  codeBlockCase('Code block/blank download', { ...codeBlockDefaults, download: '  ' }),
  codeBlockCase(
    'Code block/download with its own words',
    {
      ...codeBlockDefaults,
      download: 'codes.txt',
      downloadLabel: 'Descarregar',
      downloadedLabel: 'Descarregado',
    },
    { class: 'mt-4', 'data-testid': 'codes' },
  ),
  codeBlockCase('Code block/highlighted tab and seven tabs', {
    ...codeBlockDefaults,
    id: 'many',
    tabs: [
      {
        label: 'PHP',
        code: 'echo',
        html: '<span style="color: var(--plinth-color-accent-text)">echo</span>',
      },
      ...Array.from({ length: 6 }, (_, i) => ({ label: `Tab ${i}`, code: `code ${i}` })),
    ],
  }),
  codeBlockCase('Code block/unknown selected tab', {
    ...codeBlockDefaults,
    id: 'pick',
    tabs: [
      { label: 'Vue', code: '<PlinthBadge />' },
      { label: 'React', code: '<PlinthBadge />' },
    ],
    selected: 'Svelte',
    tabsLabel: 'Framework',
  }),
  ...storyArgs<CalloutArgs>(calloutStories).map(([story, args]) =>
    calloutCase(`Callout/${story}`, args),
  ),
  calloutCase('Callout/with extra attributes', calloutDefaults, {
    class: 'mb-4',
    id: 'sending-time',
    'data-testid': 'sending-time',
    'aria-labelledby': 'sending-time-title',
  }),
  calloutCase('Callout/with a clashing attribute', calloutDefaults, { 'data-tone': 'danger' }),
  calloutCase('Callout/unknown tone and role', {
    ...calloutDefaults,
    tone: 'loud' as CalloutArgs['tone'],
    role: 'log' as CalloutArgs['role'],
  }),
  calloutCase('Callout/blank title and text', { ...calloutDefaults, title: '  ', text: ' ' }),
  calloutCase('Callout/title only', { ...calloutDefaults, text: '' }),
  calloutCase('Callout/escaped text', {
    ...calloutDefaults,
    title: 'Fish & <chips>',
    text: '"Quotes" & <tags>',
  }),
  ...storyArgs<TextFieldArgs>(textFieldStories).map(([story, args]) =>
    textFieldCase(`Text field/${story}`, args),
  ),
  textFieldCase('Text field/with extra attributes', textFieldDefaults, {
    class: 'mb-4',
    name: 'email',
    autocomplete: 'email',
    'data-testid': 'email',
    'aria-describedby': 'email-help',
  }),
  textFieldCase(
    'Text field/with a clashing attribute',
    { ...textFieldDefaults, description: 'Receipts go to this address.' },
    { 'aria-describedby': 'my-help' },
  ),
  textFieldCase('Text field/unknown size and blank messages', {
    ...textFieldDefaults,
    size: 'lg' as TextFieldArgs['size'],
    description: ' ',
    error: '',
  }),
  textFieldCase('Text field/with a description and an error', {
    ...textFieldDefaults,
    description: 'Receipts go to this address.',
    error: 'Enter an email address.',
  }),
  textFieldCase('Text field/escaped text', {
    ...textFieldDefaults,
    label: 'Name <b>',
    value: '"quoted" & <tag>',
    description: 'A & B',
    error: 'Not <this>',
  }),
  ...storyArgs<TextareaArgs>(textareaStories).map(([story, args]) =>
    textareaCase(`Textarea/${story}`, args),
  ),
  textareaCase('Textarea/with extra attributes', textareaDefaults, {
    class: 'mb-4',
    name: 'reply',
    maxlength: '2000',
    'data-testid': 'reply',
  }),
  textareaCase(
    'Textarea/with a clashing attribute',
    { ...textareaDefaults, error: 'Write a reply first.' },
    { 'aria-invalid': 'false' },
  ),
  textareaCase(
    'Textarea/growing with its own style',
    { ...textareaDefaults, grow: true, rows: 4, maxRows: 2 },
    { style: 'color: red;' },
  ),
  textareaCase('Textarea/with a description and an error', {
    ...textareaDefaults,
    description: 'The customer sees this reply.',
    error: 'Write a reply first.',
  }),
  textareaCase('Textarea/escaped text', {
    ...textareaDefaults,
    label: 'Note <b>',
    value: 'A & B <i>',
    description: '"quoted"',
  }),
  ...storyArgs<ToolbarArgs>(toolbarStories).map(([story, args]) =>
    toolbarCase(`Toolbar/${story}`, args),
  ),
  toolbarCase(
    'Toolbar/with extra attributes',
    { label: 'Actions', actions: '<button type="button">Assign</button>' },
    { class: 'is-sticky', id: 'bar', 'data-testid': 'bar', 'aria-describedby': 'bar-help' },
  ),
  toolbarCase('Toolbar/blank target and search', {
    label: 'Actions',
    target: ' ',
    search: ' ',
    actions: '',
  }),
  toolbarCase('Toolbar/escaped label and target', {
    label: '"><b>x</b>',
    target: '<b>2</b> selected',
    actions: '',
  }),
  toolbarActionCase('Toolbar action/Default', toolbarActionDefaults),
  toolbarActionCase('Toolbar action/Glyph', { ...toolbarActionDefaults, icon: 'back' }),
  toolbarActionCase('Toolbar action/unknown glyph', {
    ...toolbarActionDefaults,
    icon: 'nope' as ToolbarActionArgs['icon'],
  }),
  toolbarActionCase('Toolbar action/Overflow', { ...toolbarActionDefaults, overflow: true }),
  toolbarActionCase('Toolbar action/Disabled', { ...toolbarActionDefaults, disabled: true }),
  toolbarActionCase('Toolbar action/escaped label', {
    ...toolbarActionDefaults,
    label: '<b>Assign</b>',
  }),
  toolbarActionCase('Toolbar action/with extra attributes', toolbarActionDefaults, {
    class: 'is-new',
    id: 'assign',
    'data-testid': 'assign',
    'aria-keyshortcuts': 'A',
  }),
  toolbarActionCase('Toolbar action/with a clashing attribute', toolbarActionDefaults, {
    type: 'submit',
    'data-variant': 'secondary',
  }),
  toolbarGroupCase('Toolbar group/Default', undefined),
  toolbarGroupCase('Toolbar group/Named', 'Remove'),
  toolbarGroupCase('Toolbar group/blank label', ' '),
  toolbarGroupCase('Toolbar group/escaped label', '"><b>x</b>'),
  toolbarGroupCase('Toolbar group/with extra attributes', 'Remove', {
    class: 'is-wide',
    id: 'remove',
    'data-testid': 'remove',
    'aria-describedby': 'remove-help',
  }),
  toolbarGroupCase('Toolbar group/with a clashing attribute', 'Remove', { role: 'none' }),
  toolbarScopeCase('Toolbar scope/Default', 'In: Open'),
  toolbarScopeCase('Toolbar scope/escaped label', 'In: <b>Open</b>'),
  toolbarScopeCase('Toolbar scope/with extra attributes', 'All folders', {
    class: 'is-wide',
    id: 'scope',
    popovertarget: 'search-scope',
    'data-testid': 'scope',
  }),
  toolbarScopeCase('Toolbar scope/with a clashing attribute', 'In: Open', { type: 'submit' }),
  toolbarSearchCase('Toolbar search/Default', { label: 'Search' }),
  toolbarSearchCase('Toolbar search/WithScope', {
    label: 'Search tickets',
    scope: '<button type="button" class="plinth-toolbar-scope">In: Open</button>',
  }),
  toolbarSearchCase('Toolbar search/blank scope', { label: 'Search', scope: ' ' }),
  toolbarSearchCase('Toolbar search/escaped label', { label: '"><b>x</b>' }),
  toolbarSearchCase(
    'Toolbar search/with extra attributes',
    { label: 'Search' },
    {
      class: 'is-wide',
      name: 'q',
      placeholder: 'Search',
      'data-testid': 'search',
    },
  ),
  toolbarSearchCase(
    'Toolbar search/with a clashing attribute',
    { label: 'Search' },
    {
      type: 'text',
      'aria-label': 'Find tickets',
    },
  ),
  ...storyArgs<TimelineArgs>(timelineStories).map(([story, args]) =>
    timelineCase(`Timeline/${story}`, args),
  ),
  timelineCase(
    'Timeline/with extra attributes',
    { label: 'Conversation', entries: [] },
    { class: 'is-wide', id: 'thread', 'data-testid': 'thread', 'aria-busy': 'true' },
  ),
  timelineCase(
    'Timeline/with a clashing attribute',
    { label: 'Conversation', entries: [] },
    { role: 'feed', 'aria-label': 'Thread' },
  ),
  timelineCase('Timeline/blank label', { label: ' ', entries: [] }),
  timelineCase('Timeline/escaped label', { label: '"><b>x</b>', entries: [] }),
  timelinePostCase('Timeline post/Default', timelinePostDefaults),
  timelinePostCase('Timeline post/Minimal', {
    author: 'Sam Lee',
    kind: 'team',
    body: 'Hi',
  }),
  timelinePostCase('Timeline post/Note', { ...timelinePostDefaults, kind: 'note' }),
  timelinePostCase('Timeline post/NoteLabel', {
    ...timelinePostDefaults,
    kind: 'note',
    noteLabel: 'Nota interna',
  }),
  timelinePostCase('Timeline post/WithPicture', { ...timelinePostDefaults, avatar: samplePhoto }),
  timelinePostCase('Timeline post/HeadingLevel', { ...timelinePostDefaults, headingLevel: 'h4' }),
  timelinePostCase('Timeline post/detail alone', {
    author: 'Sam Lee',
    kind: 'team',
    detail: 'Support team',
    body: 'Hi',
  }),
  timelinePostCase('Timeline post/time alone, blank datetime', {
    author: 'Sam Lee',
    kind: 'team',
    time: '09:14',
    datetime: ' ',
    body: 'Hi',
  }),
  timelinePostCase('Timeline post/blank parts', {
    author: 'Sam Lee',
    kind: 'team',
    avatar: ' ',
    detail: ' ',
    time: ' ',
    reference: ' ',
    body: 'Hi',
    actions: ' ',
  }),
  timelinePostCase('Timeline post/unknown kind and level', {
    ...timelinePostDefaults,
    kind: 'admin' as TimelinePostArgs['kind'],
    headingLevel: 'h1' as TimelinePostArgs['headingLevel'],
  }),
  timelinePostCase('Timeline post/escaped text', {
    author: '"><b>x</b>',
    kind: 'note',
    detail: '<b>x</b>',
    time: '<b>x</b>',
    datetime: '"x"',
    reference: '<b>x</b>',
    noteLabel: '<b>x</b>',
    body: 'Hi',
  }),
  timelinePostCase('Timeline post/with extra attributes', timelinePostDefaults, {
    class: 'is-new',
    id: 'post-1',
    'data-testid': 'post',
    'aria-current': 'true',
    'wire:key': 'post-1',
  }),
  timelinePostCase('Timeline post/with a clashing attribute', timelinePostDefaults, {
    'data-kind': 'team',
  }),
  timelineEventCase('Timeline event/Default', timelineEventDefaults),
  timelineEventCase('Timeline event/without a time', { text: 'Closed' }),
  timelineEventCase('Timeline event/blank time and datetime', {
    text: 'Closed',
    time: ' ',
    datetime: ' ',
  }),
  timelineEventCase('Timeline event/blank datetime', {
    text: 'Closed',
    time: '09:14',
    datetime: ' ',
  }),
  timelineEventCase('Timeline event/escaped time', {
    text: 'Closed',
    time: '<b>x</b>',
    datetime: '"x"',
  }),
  timelineEventCase('Timeline event/with extra attributes', timelineEventDefaults, {
    class: 'is-new',
    id: 'event-1',
    'data-testid': 'event',
    'wire:key': 'event-1',
  }),
];

/** A post's parity; the body is the default slot and the actions a named one. */
function timelinePostCase(
  story: string,
  args: TimelinePostArgs,
  attributes: Attributes = {},
): ParityCase {
  const optional = [
    'avatar',
    'detail',
    'time',
    'datetime',
    'reference',
    'noteLabel',
    'headingLevel',
  ] as const;
  const props = {
    author: args.author,
    kind: args.kind,
    ...Object.fromEntries(
      optional.filter((name) => args[name] !== undefined).map((name) => [name, args[name]]),
    ),
  };
  const named: Record<string, string> = args.actions !== undefined ? { actions: args.actions } : {};
  return {
    story,
    markup: timelinePost(args, attributes),
    vue: {
      component: PlinthTimelinePost,
      props: { ...props, ...attributes },
      slot: args.body,
      html: true,
      named,
    },
    blade: { component: 'timeline-post', props, attributes, slot: args.body, named },
  };
}

/** An event's parity; the sentence is the slot. */
function timelineEventCase(
  story: string,
  args: TimelineEventArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    ...(args.time !== undefined ? { time: args.time } : {}),
    ...(args.datetime !== undefined ? { datetime: args.datetime } : {}),
  };
  return {
    story,
    markup: timelineEvent(args, attributes),
    vue: {
      component: PlinthTimelineEvent,
      props: { ...props, ...attributes },
      slot: args.text,
      html: true,
    },
    blade: { component: 'timeline-event', props, attributes, slot: args.text },
  };
}

/** The timeline's own parity; its entries are each a post or event case's markup, as the slot. */
function timelineCase(story: string, args: TimelineArgs, attributes: Attributes = {}): ParityCase {
  const props = args.label !== undefined ? { label: args.label } : {};
  const slot = timelineEntries(args.entries);
  return {
    story,
    markup: timeline(args, attributes),
    vue: { component: PlinthTimeline, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'timeline', props, attributes, slot },
  };
}

/** The toolbar's parity; the search and the actions are markup, passed in as slots. */
function toolbarCase(story: string, args: ToolbarArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    label: args.label,
    ...(args.target !== undefined ? { target: args.target } : {}),
  };
  const named = args.search !== undefined ? { search: args.search } : undefined;
  return {
    story,
    markup: toolbar(args, attributes),
    vue: {
      component: PlinthToolbar,
      props: { ...props, ...attributes },
      slot: args.actions,
      html: true,
      named,
    },
    blade: { component: 'toolbar', props, attributes, slot: args.actions, named },
  };
}

function toolbarActionCase(
  story: string,
  args: ToolbarActionArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    label: args.label,
    ...(args.icon ? { icon: args.icon } : {}),
    overflow: args.overflow,
    disabled: args.disabled,
  };
  return {
    story,
    markup: toolbarAction(args, attributes),
    vue: {
      component: PlinthToolbarAction,
      props: { ...props, ...attributes },
      slot: args.svg ?? '',
      html: true,
    },
    blade: { component: 'toolbar-action', props, attributes, slot: args.svg ?? '' },
  };
}

/** A group, with one action's markup as its slot. */
function toolbarGroupCase(
  story: string,
  label: string | undefined,
  attributes: Attributes = {},
): ParityCase {
  const slot = toolbarAction(toolbarActionDefaults);
  const props = label !== undefined ? { label } : {};
  return {
    story,
    markup: toolbarGroup({ label }, slot, attributes),
    vue: { component: PlinthToolbarGroup, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'toolbar-group', props, attributes, slot },
  };
}

function toolbarScopeCase(story: string, label: string, attributes: Attributes = {}): ParityCase {
  return {
    story,
    markup: toolbarScope({ label }, attributes),
    vue: { component: PlinthToolbarScope, props: { label, ...attributes }, slot: '' },
    blade: { component: 'toolbar-scope', props: { label }, attributes, slot: '' },
  };
}

/** The search's parity; its attributes go to the input, the scope is a named slot. */
function toolbarSearchCase(
  story: string,
  args: ToolbarSearchArgs,
  attributes: Attributes = {},
): ParityCase {
  const named = args.scope !== undefined ? { scope: args.scope } : undefined;
  return {
    story,
    markup: toolbarSearch(args, attributes),
    vue: {
      component: PlinthToolbarSearch,
      props: { label: args.label, ...attributes },
      slot: '',
      named,
    },
    blade: {
      component: 'toolbar-search',
      props: { label: args.label },
      attributes,
      slot: '',
      named,
    },
  };
}

function buttonCase(story: string, args: ButtonArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    variant: args.variant,
    size: args.size,
    disabled: args.disabled,
    busy: args.busy,
    mirrorIcon: args.mirrorIcon ?? false,
    mirrorTrailing: args.mirrorTrailing ?? false,
    ...(args.href ? { href: args.href } : {}),
  };
  const named = {
    ...(args.icon ? { icon: args.icon } : {}),
    ...(args.trailingIcon ? { trailing: args.trailingIcon } : {}),
  };
  return {
    story,
    markup: button(args, attributes),
    vue: { component: PlinthButton, props: { ...props, ...attributes }, slot: args.label, named },
    blade: { component: 'button', props, attributes, slot: args.label, named },
  };
}

function iconButtonCase(
  story: string,
  args: IconButtonArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    ...(args.label ? { label: args.label } : {}),
    ...(args.icon ? { icon: args.icon } : {}),
    variant: args.variant,
    size: args.size,
    disabled: args.disabled,
    busy: args.busy,
    mirror: args.mirror ?? false,
    ...(args.pressed !== undefined ? { pressed: args.pressed } : {}),
    ...(args.href ? { href: args.href } : {}),
  };
  return {
    story,
    markup: iconButton(args, attributes),
    vue: {
      component: PlinthIconButton,
      props: { ...props, ...attributes },
      slot: args.svg ?? '',
      html: true,
    },
    blade: { component: 'icon-button', props, attributes, slot: args.svg ?? '' },
  };
}

/** Passes `label=""` itself, which iconButtonCase leaves out, so a blank label falls back. */
function withBlankLabel(c: ParityCase): ParityCase {
  return {
    ...c,
    vue: { ...c.vue, props: { label: '', ...c.vue.props } },
    blade: { ...c.blade, props: { label: '', ...c.blade.props } },
  };
}

function avatarCase(story: string, args: AvatarArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    ...(args.name !== undefined ? { name: args.name } : {}),
    ...(args.src ? { src: args.src } : {}),
    ...(args.initials ? { initials: args.initials } : {}),
    size: args.size,
    ...(args.status ? { status: args.status } : {}),
    ...(args.statusLabel ? { statusLabel: args.statusLabel } : {}),
    decorative: args.decorative,
  };
  return {
    story,
    markup: avatar(args, attributes),
    vue: { component: PlinthAvatar, props: { ...props, ...attributes }, slot: '' },
    blade: { component: 'avatar', props, attributes, slot: '' },
  };
}

function listRowCase(story: string, args: ListRowArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    ...(args.description ? { description: args.description } : {}),
    chevron: args.chevron,
    ...(args.href ? { href: args.href } : {}),
    button: args.button,
    current: args.current,
    disabled: args.disabled,
    ...(args.selectable ? { selectable: true } : {}),
    ...(args.selected ? { selected: true } : {}),
    ...(args.name ? { name: args.name } : {}),
    ...(args.value ? { value: args.value } : {}),
  };
  const named = {
    ...(args.leading ? { leading: args.leading } : {}),
    ...(args.trailing ? { trailing: args.trailing } : {}),
  };
  return {
    story,
    markup: listRow(args, attributes),
    vue: { component: PlinthListRow, props: { ...props, ...attributes }, slot: args.title, named },
    blade: { component: 'list-row', props, attributes, slot: args.title, named },
  };
}

function listHeaderCase(
  story: string,
  args: ListHeaderArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    heading: args.heading,
    ...(args.headingLevel ? { headingLevel: args.headingLevel } : {}),
    ...(args.count !== undefined && args.count !== null ? { count: args.count } : {}),
    ...(args.selection !== undefined ? { selection: args.selection } : {}),
  };
  const named = args.actions ? { actions: args.actions } : undefined;
  return {
    story,
    markup: listHeader(args, attributes),
    vue: { component: PlinthListHeader, props: { ...props, ...attributes }, slot: '', named },
    blade: { component: 'list-header', props, attributes, slot: '', named },
  };
}

/** The card's own parity; its rows are each a list row's markup in an <li>, passed in as the slot. */
function listCardCase(story: string, args: ListCardArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    ...(args.heading ? { heading: args.heading } : {}),
    headingLevel: args.headingLevel,
    ...(args.footer ? { footer: args.footer } : {}),
  };
  const slot = listCardRows(args.rows);
  return {
    story,
    markup: listCard(args, attributes),
    vue: { component: PlinthListCard, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'list-card', props, attributes, slot },
  };
}

function emptyStateCase(
  story: string,
  args: EmptyStateArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    heading: args.heading,
    headingLevel: args.headingLevel,
    framed: args.framed,
    ...(args.description !== undefined ? { description: args.description } : {}),
  };
  const named = {
    ...(args.icon ? { icon: args.icon } : {}),
    ...(args.actions ? { actions: args.actions } : {}),
  };
  return {
    story,
    markup: emptyState(args, attributes),
    vue: { component: PlinthEmptyState, props: { ...props, ...attributes }, slot: '', named },
    blade: { component: 'empty-state', props, attributes, slot: '', named },
  };
}

function pageHeaderCase(
  story: string,
  args: PageHeaderArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = { heading: args.heading, level: args.level, top: args.top };
  const named = {
    ...(args.leading ? { leading: args.leading } : {}),
    ...(args.actions ? { actions: args.actions } : {}),
  };
  return {
    story,
    markup: pageHeader(args, attributes),
    vue: { component: PlinthPageHeader, props: { ...props, ...attributes }, slot: '', named },
    blade: { component: 'page-header', props, attributes, slot: '', named },
  };
}

function pillProps(args: PillArgs) {
  return {
    ...(args.count !== undefined ? { count: args.count } : {}),
    ...(args.href ? { href: args.href } : {}),
    selected: args.selected,
    disabled: args.disabled,
  };
}

function pillCase(story: string, args: PillArgs, attributes: Attributes = {}): ParityCase {
  const props = pillProps(args);
  return {
    story,
    markup: pill(args, attributes),
    vue: { component: PlinthPill, props: { ...props, ...attributes }, slot: args.label },
    blade: { component: 'pill', props, attributes, slot: args.label },
  };
}

/** The row's own parity; its pills are each a pill case's markup, passed in as the slot. */
function pillRowCase(story: string, args: PillRowArgs, attributes: Attributes = {}): ParityCase {
  const props = { ...(args.label ? { label: args.label } : {}), nav: args.nav };
  const slot = args.pills.map((p) => pill(p)).join('');
  return {
    story,
    markup: pillRow(args, attributes),
    vue: { component: PlinthPillRow, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'pill-row', props, attributes, slot },
  };
}

function sectionMenuItemProps(args: SectionMenuItemArgs) {
  return {
    ...(args.count !== undefined ? { count: args.count } : {}),
    ...(args.href !== undefined ? { href: args.href } : {}),
    current: args.current,
    disabled: args.disabled,
  };
}

function appNavItemCase(
  story: string,
  args: AppNavItemArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    href: args.href,
    ...(args.count !== undefined ? { count: args.count } : {}),
    current: args.current,
  };
  const named: Record<string, string> = args.icon ? { icon: args.icon } : {};
  return {
    story,
    markup: appNavItem(args, attributes),
    vue: {
      component: PlinthAppNavItem,
      props: { ...props, ...attributes },
      slot: escape(args.label),
      html: true,
      named,
    },
    blade: { component: 'app-nav-item', props, attributes, slot: escape(args.label), named },
  };
}

/** The nav's own parity; its items are each an item case's markup, passed in as the slot. */
function appNavCase(story: string, args: AppNavArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    ...(args.label !== undefined ? { label: args.label } : {}),
    ...(args.brandName !== undefined ? { brandName: args.brandName } : {}),
    ...(args.brandHref !== undefined ? { brandHref: args.brandHref } : {}),
  };
  const named = {
    ...(args.mark ? { mark: args.mark } : {}),
    ...(args.footer ? { footer: args.footer } : {}),
  };
  const slot = args.items.map((item) => appNavItem(item)).join('');
  return {
    story,
    markup: appNav(args, attributes),
    vue: {
      component: PlinthAppNav,
      props: { ...props, ...attributes },
      slot,
      html: true,
      named,
    },
    blade: { component: 'app-nav', props, attributes, slot, named },
  };
}

function navListItemCase(
  story: string,
  args: NavListItemArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    href: args.href,
    ...(args.count !== undefined ? { count: args.count } : {}),
    current: args.current,
  };
  return {
    story,
    markup: navListItem(args, attributes),
    vue: {
      component: PlinthNavListItem,
      props: { ...props, ...attributes },
      slot: escape(args.label),
      html: true,
    },
    blade: { component: 'nav-list-item', props, attributes, slot: escape(args.label) },
  };
}

/** A group's own parity; its items are each an item case's markup, passed in as the slot. */
function navListGroupCase(
  story: string,
  args: NavListGroupArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    ...(args.heading !== undefined ? { heading: args.heading } : {}),
    ...(args.headingLevel !== undefined ? { headingLevel: args.headingLevel } : {}),
  };
  const slot = args.items.map((item) => navListItem(item)).join('');
  return {
    story,
    markup: navListGroup(args, attributes),
    vue: { component: PlinthNavListGroup, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'nav-list-group', props, attributes, slot },
  };
}

/** The nav's own parity; its groups are each a group case's markup, passed in as the slot. */
function navListCase(story: string, args: NavListArgs, attributes: Attributes = {}): ParityCase {
  const props = args.label !== undefined ? { label: args.label } : {};
  const slot = args.groups.map((group) => navListGroup(group)).join('');
  return {
    story,
    markup: navList(args, attributes),
    vue: { component: PlinthNavList, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'nav-list', props, attributes, slot },
  };
}

/** The shell's parity; the nav, the bar and the page are markup, passed in as slots. */
function appShellCase(story: string, args: AppShellArgs, attributes: Attributes = {}): ParityCase {
  const named = {
    ...(args.nav !== undefined ? { nav: args.nav } : {}),
    ...(args.bar !== undefined ? { bar: args.bar } : {}),
  };
  return {
    story,
    markup: appShell(args, attributes),
    vue: {
      component: PlinthAppShell,
      props: { ...attributes },
      slot: args.main,
      html: true,
      named,
    },
    blade: { component: 'app-shell', props: {}, attributes, slot: args.main, named },
  };
}

/** The bar's parity; the search is the default slot, the actions and the account named ones. */
function appBarCase(story: string, args: AppBarArgs, attributes: Attributes = {}): ParityCase {
  const named = {
    ...(args.actions !== undefined ? { actions: args.actions } : {}),
    ...(args.account !== undefined ? { account: args.account } : {}),
  };
  const slot = args.search ?? '';
  return {
    story,
    markup: appBar(args, attributes),
    vue: { component: PlinthAppBar, props: { ...attributes }, slot, html: true, named },
    blade: { component: 'app-bar', props: {}, attributes, slot, named },
  };
}

function appBarSearchCase(
  story: string,
  args: AppBarSearchArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    label: args.label,
    ...(args.shortcut !== undefined ? { shortcut: args.shortcut } : {}),
  };
  return {
    story,
    markup: appBarSearch(args, attributes),
    vue: { component: PlinthAppBarSearch, props: { ...props, ...attributes }, slot: '' },
    blade: { component: 'app-bar-search', props, attributes, slot: '' },
  };
}

/** The split view's parity; the detail is the default slot, the other panes named ones. */
function splitViewCase(
  story: string,
  args: SplitViewArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = { pane: args.pane, secondaryClosed: args.secondaryClosed };
  const named = {
    ...(args.secondary !== undefined ? { secondary: args.secondary } : {}),
    list: args.list,
    ...(args.footer !== undefined ? { footer: args.footer } : {}),
  };
  return {
    story,
    markup: splitView(args, attributes),
    vue: {
      component: PlinthSplitView,
      props: { ...props, ...attributes },
      slot: args.detail,
      html: true,
      named,
    },
    blade: { component: 'split-view', props, attributes, slot: args.detail, named },
  };
}

function sectionMenuItemCase(
  story: string,
  args: SectionMenuItemArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = sectionMenuItemProps(args);
  return {
    story,
    markup: sectionMenuItem(args, attributes),
    vue: { component: PlinthSectionMenuItem, props: { ...props, ...attributes }, slot: args.label },
    blade: { component: 'section-menu-item', props, attributes, slot: args.label },
  };
}

/** The menu's own parity; its items are each an item case's markup, passed in as the slot. */
function sectionMenuCase(
  story: string,
  args: SectionMenuArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = { ...(args.label !== undefined ? { label: args.label } : {}), nav: args.nav };
  const slot = args.items.map((item) => sectionMenuItem(item)).join('');
  return {
    story,
    markup: sectionMenu(args, attributes),
    vue: { component: PlinthSectionMenu, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'section-menu', props, attributes, slot },
  };
}

/** The menu's parity; its entries are markup, passed in as the slot. */
function menuCase(
  story: string,
  args: MenuArgs,
  attributes: Attributes = {},
  id: string = args.id,
): ParityCase {
  const props = { id };
  const slot = menuEntries(args.entries, args.id);
  return {
    story,
    markup: menu(args, attributes),
    vue: { component: PlinthMenu, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'menu', props, attributes, slot },
  };
}

/** An item on its own, or with `menu` the id of the menu it closes. */
function menuItemCase(
  story: string,
  args: MenuItemArgs,
  attributes: Attributes = {},
  menuId?: string,
): ParityCase {
  const props = {
    ...(args.href !== undefined ? { href: args.href } : {}),
    tone: args.tone,
    ...(args.shortcut !== undefined ? { shortcut: args.shortcut } : {}),
    disabled: args.disabled,
    ...(menuId ? { menu: menuId } : {}),
  };
  const named = args.icon ? { icon: args.icon } : undefined;
  return {
    story,
    markup: menuItem(args, attributes, menuId),
    vue: { component: PlinthMenuItem, props: { ...props, ...attributes }, slot: args.label, named },
    blade: { component: 'menu-item', props, attributes, slot: args.label, named },
  };
}

/** A group, with one item's markup as its slot. */
function menuGroupCase(story: string, label: string, attributes: Attributes = {}): ParityCase {
  const slot = menuItem(menuItemDefaults);
  return {
    story,
    markup: menuGroup({ label }, slot, attributes),
    vue: { component: PlinthMenuGroup, props: { label, ...attributes }, slot, html: true },
    blade: { component: 'menu-group', props: { label }, attributes, slot },
  };
}

function menuSeparatorCase(story: string, attributes: Attributes = {}): ParityCase {
  return {
    story,
    markup: menuSeparator(attributes),
    vue: { component: PlinthMenuSeparator, props: { ...attributes }, slot: '' },
    blade: { component: 'menu-separator', props: {}, attributes, slot: '' },
  };
}

/** The menu sheet's parity; its nav and account are markup, passed in as the slots. */
function menuSheetCase(
  story: string,
  args: MenuSheetArgs,
  attributes: Attributes = {},
  id: string = args.id,
): ParityCase {
  const props = {
    id,
    title: args.title,
    closeLabel: args.closeLabel,
    ...Object.fromEntries(
      (['userName', 'userDetail', 'userSrc', 'userHref'] as const)
        .filter((name) => args[name] !== undefined)
        .map((name) => [name, args[name]]),
    ),
  };
  const named: Record<string, string> = args.account ? { account: args.account } : {};
  return {
    story,
    markup: menuSheet(args, attributes),
    vue: {
      component: PlinthMenuSheet,
      props: { ...props, ...attributes },
      slot: args.nav,
      html: true,
      named,
    },
    blade: { component: 'menu-sheet', props, attributes, slot: args.nav, named },
  };
}

/** The confirmation dialog's parity; it has no slots. */
function confirmDialogCase(
  story: string,
  args: ConfirmDialogArgs,
  attributes: Attributes = {},
  id: string = args.id,
): ParityCase {
  const props = {
    id,
    ...Object.fromEntries(
      (
        [
          'title',
          'message',
          'kind',
          'phrase',
          'fieldLabel',
          'confirmLabel',
          'cancelLabel',
          'tone',
          'error',
          'busy',
          'sidePhone',
        ] as const
      )
        .filter((name) => args[name] !== undefined)
        .map((name) => [name, args[name]]),
    ),
  };
  return {
    story,
    markup: confirmDialog(args, attributes),
    vue: { component: PlinthConfirmDialog, props: { ...props, ...attributes }, slot: '' },
    blade: { component: 'confirm-dialog', props, attributes, slot: '' },
  };
}

/** The dialog's parity; its body and footer are markup, passed in as the slots. */
function dialogCase(
  story: string,
  args: DialogArgs,
  attributes: Attributes = {},
  id: string = args.id,
): ParityCase {
  const props = {
    id,
    title: args.title,
    ...(args.description ? { description: args.description } : {}),
    closeLabel: args.closeLabel,
    dismissible: args.dismissible,
    sidePhone: args.sidePhone,
  };
  const named: Record<string, string> = args.footer ? { footer: args.footer } : {};
  return {
    story,
    markup: dialog(args, attributes),
    vue: {
      component: PlinthDialog,
      props: { ...props, ...attributes },
      slot: args.body,
      html: true,
      named,
    },
    blade: { component: 'dialog', props, attributes, slot: args.body, named },
  };
}

/** The drawer's parity; its body and footer are markup, passed in as the slots. */
function drawerCase(
  story: string,
  args: DrawerArgs,
  attributes: Attributes = {},
  id: string = args.id,
): ParityCase {
  const props = {
    id,
    title: args.title,
    ...(args.description ? { description: args.description } : {}),
    closeLabel: args.closeLabel,
    desktop: args.desktop,
    ...(args.snapPoints ? { snapPoints: args.snapPoints } : {}),
    ...(args.snap ? { snap: args.snap } : {}),
  };
  const named: Record<string, string> = args.footer ? { footer: args.footer } : {};
  return {
    story,
    markup: drawer(args, attributes),
    vue: {
      component: PlinthDrawer,
      props: { ...props, ...attributes },
      slot: args.body,
      html: true,
      named,
    },
    blade: { component: 'drawer', props, attributes, slot: args.body, named },
  };
}

/** The sheet's own parity; its body and footer are markup, passed in as the slots. */
function sheetCase(
  story: string,
  args: SheetArgs,
  attributes: Attributes = {},
  id: string = args.id,
): ParityCase {
  const props = {
    id,
    title: args.title,
    ...(args.description ? { description: args.description } : {}),
    closeLabel: args.closeLabel,
    side: args.side,
    ...(args.sidePhone ? { sidePhone: args.sidePhone } : {}),
  };
  const named: Record<string, string> = args.footer ? { footer: args.footer } : {};
  return {
    story,
    markup: sheet(args, attributes),
    vue: {
      component: PlinthSheet,
      props: { ...props, ...attributes },
      slot: args.body,
      html: true,
      named,
    },
    blade: { component: 'sheet', props, attributes, slot: args.body, named },
  };
}

function iconCase(story: string, args: IconArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    ...(args.name ? { name: args.name } : {}),
    size: args.size,
    mirror: args.mirror,
    ...(args.label ? { label: args.label } : {}),
  };
  const slot = args.svg ?? '';
  return {
    story,
    markup: icon(args, attributes),
    vue: { component: PlinthIcon, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'icon', props, attributes, slot },
  };
}

/** The data table's parity; its column headers and rows are markup, passed in as the slots. */
function dataTableCase(
  story: string,
  args: DataTableArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = args.caption !== undefined ? { caption: args.caption } : {};
  const named = { head: dataTableHead(args.columns) };
  const slot = dataTableBody(args);
  return {
    story,
    markup: dataTable(args, attributes),
    vue: {
      component: PlinthDataTable,
      props: { ...props, ...attributes },
      slot,
      html: true,
      named,
    },
    blade: { component: 'data-table', props, attributes, slot, named },
  };
}

function dataTableColumnCase(
  story: string,
  args: DataTableColumnArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    ...(args.sort !== undefined ? { sort: args.sort } : {}),
    numeric: args.numeric,
    hideOnPhone: args.hideOnPhone,
  };
  const slot = args.sort === undefined ? args.label : dataTableSortButton(args.label);
  return {
    story,
    markup: dataTableColumn(args, slot, attributes),
    vue: {
      component: PlinthDataTableColumn,
      props: { ...props, ...attributes },
      slot,
      html: args.sort !== undefined,
    },
    blade: { component: 'data-table-column', props, attributes, slot },
  };
}

function dataTableSortCase(story: string, label: string, attributes: Attributes = {}): ParityCase {
  return {
    story,
    markup: dataTableSortButton(label, attributes),
    vue: { component: PlinthDataTableSort, props: { ...attributes }, slot: label },
    blade: { component: 'data-table-sort', props: {}, attributes, slot: label },
  };
}

function dataTableRowCase(
  story: string,
  args: Omit<DataTableRowArgs, 'cells'>,
  attributes: Attributes = {},
): ParityCase {
  const props = args.selected !== undefined ? { selected: args.selected } : {};
  const slot = '<td>#1042</td>';
  return {
    story,
    markup: dataTableRow(args, slot, attributes),
    vue: { component: PlinthDataTableRow, props: { ...props, ...attributes }, slot, html: true },
    blade: { component: 'data-table-row', props, attributes, slot },
  };
}

function dataTableCellCase(
  story: string,
  args: DataTableCellArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    ...(args.label !== undefined ? { label: args.label } : {}),
    kind: args.kind,
    numeric: args.numeric,
    hideOnPhone: args.hideOnPhone,
  };
  return {
    story,
    markup: dataTableCell(args, attributes),
    vue: {
      component: PlinthDataTableCell,
      props: { ...props, ...attributes },
      slot: args.content,
      html: args.content.startsWith('<'),
    },
    blade: { component: 'data-table-cell', props, attributes, slot: args.content },
  };
}

function dataTableEmptyCase(
  story: string,
  text: string,
  columns: number,
  attributes: Attributes = {},
): ParityCase {
  return {
    story,
    markup: dataTableEmpty(text, columns, attributes),
    vue: { component: PlinthDataTableEmpty, props: { columns, ...attributes }, slot: text },
    blade: { component: 'data-table-empty', props: { columns }, attributes, slot: text },
  };
}

function codeBlockCase(
  story: string,
  args: CodeBlockArgs,
  attributes: Attributes = {},
): ParityCase {
  const props = {
    ...(args.id !== undefined ? { id: args.id } : {}),
    ...(args.label !== undefined && !args.labelHtml ? { label: args.label } : {}),
    ...(args.tabs ? { tabs: args.tabs } : {}),
    ...(args.selected !== undefined ? { selected: args.selected } : {}),
    tabsLabel: args.tabsLabel,
    copy: args.copy,
    copyLabel: args.copyLabel,
    copiedLabel: args.copiedLabel,
    ...(args.download !== undefined ? { download: args.download } : {}),
    downloadLabel: args.downloadLabel,
    downloadedLabel: args.downloadedLabel,
  };
  const named: Record<string, string> = args.labelHtml ? { label: args.labelHtml } : {};
  const code = args.tabs ? '' : args.code;
  return {
    story,
    markup: codeBlock(args, attributes),
    vue: {
      component: PlinthCodeBlock,
      props: { ...props, ...(args.html !== undefined ? { html: args.html } : {}), ...attributes },
      slot: args.html !== undefined ? '' : code,
      named,
    },
    blade: {
      component: 'code-block',
      props,
      attributes,
      slot: args.html ?? escape(code),
      named,
    },
  };
}

function textFieldCase(
  story: string,
  args: TextFieldArgs,
  attributes: Attributes = {},
): ParityCase {
  // The story prints an unknown size as it is; the layers print the default.
  const markup = textField({ ...args, size: args.size === 'sm' ? 'sm' : 'md' }, attributes);
  const props = {
    id: args.id,
    label: args.label,
    hideLabel: args.hideLabel,
    type: args.type,
    size: args.size,
    disabled: args.disabled,
    readonly: args.readonly,
    ...(args.description !== undefined ? { description: args.description } : {}),
    ...(args.error !== undefined ? { error: args.error } : {}),
  };
  const input = {
    ...(args.placeholder ? { placeholder: args.placeholder } : {}),
    ...(args.value !== undefined ? { value: args.value } : {}),
    ...(args.shortcut ? { 'aria-keyshortcuts': args.shortcut } : {}),
    ...attributes,
  };
  const named = {
    ...(args.icon ? { icon: args.icon } : {}),
    ...(args.trailing ? { trailing: args.trailing } : {}),
  };
  return {
    story,
    markup,
    vue: { component: PlinthTextField, props: { ...props, ...input }, slot: '', named },
    blade: { component: 'text-field', props, attributes: input, slot: '', named },
  };
}

function textareaCase(story: string, args: TextareaArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    id: args.id,
    label: args.label,
    hideLabel: args.hideLabel,
    rows: args.rows,
    grow: args.grow,
    maxRows: args.maxRows,
    disabled: args.disabled,
    readonly: args.readonly,
    ...(args.description !== undefined ? { description: args.description } : {}),
    ...(args.error !== undefined ? { error: args.error } : {}),
  };
  const input = { ...(args.placeholder ? { placeholder: args.placeholder } : {}), ...attributes };
  const value = args.value ?? '';
  return {
    story,
    markup: textarea(args, attributes),
    // The value is Vue's and React's value, and Blade's slot, as a textarea's content.
    vue: {
      component: PlinthTextarea,
      props: { ...props, ...input, ...(value ? { value } : {}) },
      slot: '',
    },
    blade: { component: 'textarea', props, attributes: input, slot: escape(value) },
  };
}

function calloutCase(story: string, args: CalloutArgs, attributes: Attributes = {}): ParityCase {
  // The story prints unknown values as they are; the layers print the defaults.
  const markup = callout(
    {
      ...args,
      tone: calloutTones.includes(args.tone) ? args.tone : 'neutral',
      role: calloutRoles.includes(args.role) ? args.role : 'note',
    },
    attributes,
  );
  const props = { tone: args.tone, role: args.role, ...(args.title ? { title: args.title } : {}) };
  const named = {
    ...(args.actions ? { actions: args.actions } : {}),
    ...(args.icon ? { icon: args.icon } : {}),
  };
  const html = args.textHtml !== undefined;
  const slot = args.textHtml ?? args.text;
  return {
    story,
    markup,
    vue: { component: PlinthCallout, props: { ...props, ...attributes }, slot, html, named },
    blade: {
      component: 'callout',
      props,
      attributes,
      slot: html ? slot : escape(slot),
      named,
    },
  };
}

function statCase(story: string, args: StatArgs, attributes: Attributes = {}): ParityCase {
  const props = {
    label: args.label,
    ...(args.value !== undefined ? { value: args.value } : {}),
    ...(args.description !== undefined ? { description: args.description } : {}),
    tone: args.tone,
    ...(args.href ? { href: args.href } : {}),
    emptyLabel: args.emptyLabel,
  };
  return {
    story,
    markup: stat(args, attributes),
    vue: { component: PlinthStat, props: { ...props, ...attributes }, slot: '' },
    blade: { component: 'stat', props, attributes, slot: '' },
  };
}

function badgeCase(story: string, args: BadgeArgs, attributes: Attributes = {}): ParityCase {
  return {
    story,
    markup: badge(args, attributes),
    vue: {
      component: PlinthBadge,
      props: { tone: args.tone, dot: args.dot, ...attributes },
      slot: args.label,
    },
    blade: {
      component: 'badge',
      props: { tone: args.tone, dot: args.dot },
      attributes,
      slot: args.label,
    },
  };
}

describe('parity with the stories', () => {
  const blade = renderBlade(cases.map((c) => c.blade));

  it('has a case for every story', () => {
    expect(cases.map((c) => c.story)).toEqual([
      'Badge/Neutral',
      'Badge/Success',
      'Badge/Warning',
      'Badge/Danger',
      'Badge/WithDot',
      'Badge/with extra attributes',
      'Badge/with a clashing attribute',
      'Stat/Default',
      'Stat/WithDescription',
      'Stat/Success',
      'Stat/Warning',
      'Stat/Danger',
      'Stat/Empty',
      'Stat/Link',
      'Stat/LinkWithTone',
      'Stat/LongText',
      'Stat/with extra attributes',
      'Stat/with a clashing attribute',
      'Stat/unknown tone and blank text',
      'Stat/escaped text',
      'Stat/escaped empty label',
      'Icon/Default',
      'Icon/Small',
      'Icon/Large',
      'Icon/Labelled',
      'Icon/Filled',
      'Icon/Mirrored',
      'Icon/Glyph',
      'Icon/DirectionalGlyph',
      'Icon/with extra attributes',
      'Icon/with a clashing attribute',
      'Icon/a glyph and a slot',
      'Icon/an unknown glyph',
      'Icon/a labelled glyph with mirror',
      'Icon/a glyph with a clashing attribute',
      'Button/Primary',
      'Button/Accent',
      'Button/Secondary',
      'Button/Ghost',
      'Button/Danger',
      'Button/DangerGhost',
      'Button/Small',
      'Button/Large',
      'Button/WithIcon',
      'Button/WithTrailingIcon',
      'Button/Link',
      'Button/Disabled',
      'Button/DisabledLink',
      'Button/Busy',
      'Button/with extra attributes',
      'Button/with its own aria-disabled',
      'Button/with a clashing attribute',
      'Button/small with an icon',
      'Button/busy with an icon',
      'Button/busy link',
      'Button/disabled and busy',
      'Icon button/Ghost',
      'Icon button/Secondary',
      'Icon button/Primary',
      'Icon button/DangerGhost',
      'Icon button/Small',
      'Icon button/Large',
      'Icon button/Pressed',
      'Icon button/NotPressed',
      'Icon button/Link',
      'Icon button/WithGlyph',
      'Icon button/Disabled',
      'Icon button/DisabledPressed',
      'Icon button/Busy',
      'Icon button/with extra attributes',
      'Icon button/with an aria-label attribute',
      'Icon button/with a blank label and an aria-label attribute',
      'Icon button/with a clashing attribute',
      'Icon button/pressed link',
      'Icon button/link with a clashing attribute',
      'Icon button/a directional glyph link',
      'Icon button/an unknown glyph',
      'Avatar/Initials',
      'Avatar/Image',
      'Avatar/GivenInitials',
      'Avatar/SingleName',
      'Avatar/Glyph',
      'Avatar/Small',
      'Avatar/Large',
      'Avatar/ExtraLarge',
      'Avatar/WithStatus',
      'Avatar/Decorative',
      'Avatar/with extra attributes',
      'Avatar/with a clashing attribute',
      'List row/Default',
      'List row/WithDescription',
      'List row/WithIcon',
      'List row/WithAvatar',
      'List row/WithValue',
      'List row/WithBadge',
      'List row/Link',
      'List row/Button',
      'List row/Current',
      'List row/Disabled',
      'List row/DisabledLink',
      'List row/WithAction',
      'List row/LongText',
      'List row/LongValue',
      'List row/Selectable',
      'List row/Selected',
      'List row/SelectableDisabled',
      'List row/SelectableCurrent',
      'List row/with extra attributes',
      'List row/link with extra attributes',
      'List row/with a clashing attribute',
      'List row/current button',
      'List row/current static row',
      'List row/disabled static row',
      'List row/selectable with extra attributes',
      'List row/selectable with a clashing attribute',
      'List row/selectable button',
      'List row/submit button with name and value',
      'List row/selectable with a blank name and value',
      'List header/Default',
      'List header/WithoutCount',
      'List header/ZeroCount',
      'List header/WithoutActions',
      'List header/HeadingLevel',
      'List header/Selecting',
      'List header/NothingSelected',
      'List header/LongTitle',
      'List header/with extra attributes',
      'List header/with a clashing attribute',
      'List header/blank count and selection',
      'List header/unknown heading level',
      'List header/escaped text',
      'List card/Default',
      'List card/WithoutHeading',
      'List card/WithFooter',
      'List card/HeadingLevel',
      'List card/SingleRow',
      'List card/MixedRows',
      'List card/LongText',
      'List card/with extra attributes',
      'List card/blank heading and footer',
      'List card/unknown heading level',
      'Pill row/Filters',
      'Pill row/WithoutCounts',
      'Pill row/NoneSelected',
      'Pill row/MultipleSelected',
      'Pill row/Navigation',
      'Pill row/Disabled',
      'Pill row/DisabledLink',
      'Pill row/Overflowing',
      'Pill row/with extra attributes',
      'Pill row/with a clashing attribute',
      'Pill/Default',
      'Pill/Selected',
      'Pill/WithCount',
      'Pill/ZeroCount',
      'Pill/Disabled',
      'Pill/Link',
      'Pill/CurrentLink',
      'Pill/DisabledLink',
      'Pill/with extra attributes',
      'Pill/link with extra attributes',
      'Pill/with a clashing attribute',
      'App nav/Default',
      'App nav/WithFooter',
      'App nav/NoneCurrent',
      'App nav/WithCounts',
      'App nav/BrandWithoutLink',
      'App nav/MarkOnly',
      'App nav/WithoutBrand',
      'App nav/ManyItems',
      'App nav/with extra attributes',
      'App nav/with a clashing attribute',
      'App nav/blank text',
      'App nav/escaped text',
      'App nav item/Default',
      'App nav item/Current',
      'App nav item/WithCount',
      'App nav item/ZeroCount',
      'App nav item/WithoutIcon',
      'App nav item/blank href and count',
      'App nav item/escaped text',
      'App nav item/with extra attributes',
      'App nav item/with a clashing attribute',
      'Nav list/Default',
      'Nav list/WithoutHeadings',
      'Nav list/NoneCurrent',
      'Nav list/WithCounts',
      'Nav list/LongLabels',
      'Nav list/with extra attributes',
      'Nav list/with a clashing attribute',
      'Nav list/blank label',
      'Nav list/escaped label',
      'Nav list group/Default',
      'Nav list group/WithoutHeading',
      'Nav list group/HeadingLevel',
      'Nav list group/unknown level and blank heading',
      'Nav list group/unknown level',
      'Nav list group/escaped heading',
      'Nav list group/with extra attributes',
      'Nav list item/Default',
      'Nav list item/Current',
      'Nav list item/WithCount',
      'Nav list item/ZeroCount',
      'Nav list item/blank href and count',
      'Nav list item/escaped text',
      'Nav list item/with extra attributes',
      'Nav list item/with a clashing attribute',
      'App shell/Default',
      'App shell/WithoutBar',
      'App shell/WithoutNav',
      'App shell/PageOnly',
      'App shell/LongPage',
      'App shell/with extra attributes',
      'App shell/blank nav and bar',
      'App bar/Default',
      'App bar/SearchLabel',
      'App bar/WithoutShortcut',
      'App bar/WithoutSearch',
      'App bar/AccountOnly',
      'App bar/with extra attributes',
      'App bar/with a clashing attribute',
      'App bar/blank parts',
      'App bar search/Default',
      'App bar search/WithShortcut',
      'App bar search/blank shortcut',
      'App bar search/escaped text',
      'App bar search/with extra attributes',
      'App bar search/with a clashing attribute',
      'Split view/List',
      'Split view/Detail',
      'Split view/SecondaryClosed',
      'Split view/WithoutSecondary',
      'Split view/NothingOpen',
      'Split view/LongDetail',
      'Split view/ShortList',
      'Split view/with extra attributes',
      'Split view/with a clashing attribute',
      'Split view/unknown pane and blank slots',
      'Section menu/Default',
      'Section menu/WithCounts',
      'Section menu/Buttons',
      'Section menu/NoneCurrent',
      'Section menu/DisabledLink',
      'Section menu/DisabledButton',
      'Section menu/Overflowing',
      'Section menu/with extra attributes',
      'Section menu/with a clashing attribute',
      'Section menu/blank label',
      'Section menu item/blank href',
      'Section menu item/Default',
      'Section menu item/Current',
      'Section menu item/WithCount',
      'Section menu item/ZeroCount',
      'Section menu item/Disabled',
      'Section menu item/Button',
      'Section menu item/CurrentButton',
      'Section menu item/DisabledButton',
      'Section menu item/with extra attributes',
      'Section menu item/button with extra attributes',
      'Section menu item/with a clashing attribute',
      'Menu/Default',
      'Menu/LabelsOnly',
      'Menu/Groups',
      'Menu/Links',
      'Menu/Disabled',
      'Menu/LongLabels',
      'Menu/ManyItems',
      'Menu/with extra attributes',
      'Menu/with a clashing attribute',
      'Menu/id with spaces',
      'Menu item/Default',
      'Menu item/Link',
      'Menu item/Danger',
      'Menu item/WithIcon',
      'Menu item/WithShortcut',
      'Menu item/Disabled',
      'Menu item/DisabledLink',
      'Menu item/in a menu',
      'Menu item/link in a menu',
      'Menu item/blank href and shortcut',
      'Menu item/unknown tone',
      'Menu item/with extra attributes',
      'Menu item/with a clashing attribute',
      'Menu group/Default',
      'Menu group/blank label',
      'Menu group/with extra attributes',
      'Menu group/with a clashing attribute',
      'Menu separator/Default',
      'Menu separator/with extra attributes',
      'Sheet/Default',
      'Sheet/Start',
      'Sheet/Top',
      'Sheet/Bottom',
      'Sheet/EndBottomOnPhone',
      'Sheet/StartBottomOnPhone',
      'Sheet/TopBottomOnPhone',
      'Sheet/BottomStartOnPhone',
      'Sheet/StartEndOnPhone',
      'Sheet/BottomTopOnPhone',
      'Sheet/WithDescription',
      'Sheet/WithoutFooter',
      'Sheet/LongContent',
      'Sheet/LongTitle',
      'Sheet/with extra attributes',
      'Sheet/with a clashing attribute',
      'Sheet/blank description, no footer',
      'Sheet/empty footer',
      'Sheet/id with spaces',
      'Sheet/unknown sides',
      'Drawer/Default',
      'Drawer/Peek',
      'Drawer/Half',
      'Drawer/Full',
      'Drawer/SheetOnDesktop',
      'Drawer/TitleOnly',
      'Drawer/with extra attributes',
      'Drawer/with a clashing attribute',
      'Drawer/blank description, no footer',
      'Drawer/empty footer',
      'Drawer/id with spaces',
      'Drawer/unknown desktop and snap points',
      'Dialog/Default',
      'Dialog/WithDescription',
      'Dialog/NotDismissible',
      'Dialog/BottomOnPhone',
      'Dialog/WithoutFooter',
      'Dialog/LongContent',
      'Dialog/LongTitle',
      'Dialog/with extra attributes',
      'Dialog/bottom on a phone, not dismissible',
      'Dialog/with a clashing attribute',
      'Dialog/not dismissible, with a clashing role',
      'Dialog/blank description, no footer',
      'Dialog/empty footer',
      'Dialog/id with spaces',
      'Dialog/unknown side',
      'Confirm dialog/Default',
      'Confirm dialog/Danger',
      'Confirm dialog/TypeToConfirm',
      'Confirm dialog/TypeToConfirmTyping',
      'Confirm dialog/TypeToConfirmMatching',
      'Confirm dialog/Password',
      'Confirm dialog/PasswordBusy',
      'Confirm dialog/PasswordError',
      'Confirm dialog/BottomOnPhone',
      'Confirm dialog/LongText',
      'Confirm dialog/with extra attributes',
      'Confirm dialog/with a clashing attribute',
      'Confirm dialog/a phrase with pattern characters',
      'Confirm dialog/a label without the phrase',
      'Confirm dialog/an error on the type kind',
      'Confirm dialog/an error without a field, and blank labels',
      'Confirm dialog/a blank error',
      'Confirm dialog/id with spaces',
      'Confirm dialog/unknown choices',
      'Menu sheet/Default',
      'Menu sheet/WithPhoto',
      'Menu sheet/StaticUser',
      'Menu sheet/WithoutUser',
      'Menu sheet/WithoutAccount',
      'Menu sheet/Grouped',
      'Menu sheet/LongNavigation',
      'Menu sheet/LongName',
      'Menu sheet/with extra attributes',
      'Menu sheet/with a clashing attribute',
      'Menu sheet/blank user parts and account',
      'Menu sheet/blank user name',
      'Menu sheet/id with spaces',
      'Page header/Default',
      'Page header/WithBack',
      'Page header/WithPrimaryAction',
      'Page header/ThreeActions',
      'Page header/WithoutLeading',
      'Page header/HeadingOnly',
      'Page header/LongHeading',
      'Page header/LevelTwo',
      'Page header/TopBar',
      'Page header/with extra attributes',
      'Page header/with a clashing attribute',
      'Page header/blank slots',
      'Page header/unknown level',
      'Empty state/Default',
      'Empty state/HeadingOnly',
      'Empty state/WithoutIcon',
      'Empty state/WithoutAction',
      'Empty state/Framed',
      'Empty state/TwoActions',
      'Empty state/HeadingLevel',
      'Empty state/LongText',
      'Empty state/with extra attributes',
      'Empty state/with a clashing attribute',
      'Empty state/blank parts',
      'Empty state/unknown level and escaped text',
      'Data table/Default',
      'Data table/Sorted',
      'Data table/SortedAscending',
      'Data table/Selected',
      'Data table/HiddenOnPhone',
      'Data table/Empty',
      'Data table/LongText',
      'Data table/with extra attributes',
      'Data table/with a clashing attribute',
      'Data table/blank caption',
      'Data table column/Default',
      'Data table column/Numeric',
      'Data table column/HiddenOnPhone',
      'Data table column/Sortable',
      'Data table column/Ascending',
      'Data table column/Descending',
      'Data table column/unknown sort',
      'Data table column/with extra attributes',
      'Data table column/with a clashing attribute',
      'Data table sort/Default',
      'Data table sort/with extra attributes',
      'Data table sort/with a clashing attribute',
      'Data table row/Default',
      'Data table row/Selected',
      'Data table row/NotSelected',
      'Data table row/with extra attributes',
      'Data table row/with a clashing attribute',
      'Data table cell/Field',
      'Data table cell/Title',
      'Data table cell/Actions',
      'Data table cell/Numeric',
      'Data table cell/HiddenOnPhone',
      'Data table cell/blank label',
      'Data table cell/unknown kind',
      'Data table cell/with extra attributes',
      'Data table cell/with a clashing attribute',
      'Data table empty/Default',
      'Data table empty/no columns',
      'Data table empty/with extra attributes',
      'Data table empty/with a clashing attribute',
      'Icon/with an aria-label attribute',
      'Code block/Default',
      'Code block/WithoutLabel',
      'Code block/Tabs',
      'Code block/TabsWithLabel',
      'Code block/Highlighted',
      'Code block/LongLine',
      'Code block/LongLabel',
      'Code block/WithDownload',
      'Code block/DownloadWithoutCopy',
      'Code block/DownloadWithTabs',
      'Code block/WithoutCopy',
      'Code block/CodeOnly',
      'Code block/LabelWithBadge',
      'Code block/with extra attributes',
      'Code block/blank label and id',
      'Code block/blank label slot',
      'Code block/blank download',
      'Code block/download with its own words',
      'Code block/highlighted tab and seven tabs',
      'Code block/unknown selected tab',
      'Callout/Neutral',
      'Callout/Info',
      'Callout/Success',
      'Callout/Warning',
      'Callout/Danger',
      'Callout/WithoutTitle',
      'Callout/WithLink',
      'Callout/CustomIcon',
      'Callout/LongText',
      'Callout/with extra attributes',
      'Callout/with a clashing attribute',
      'Callout/unknown tone and role',
      'Callout/blank title and text',
      'Callout/title only',
      'Callout/escaped text',
      'Text field/Default',
      'Text field/WithDescription',
      'Text field/WithError',
      'Text field/Small',
      'Text field/Search',
      'Text field/WithKeyboardHint',
      'Text field/Disabled',
      'Text field/ReadOnly',
      'Text field/with extra attributes',
      'Text field/with a clashing attribute',
      'Text field/unknown size and blank messages',
      'Text field/with a description and an error',
      'Text field/escaped text',
      'Textarea/Default',
      'Textarea/WithDescription',
      'Textarea/WithError',
      'Textarea/Grow',
      'Textarea/GrowToMaximum',
      'Textarea/HiddenLabel',
      'Textarea/Disabled',
      'Textarea/ReadOnly',
      'Textarea/with extra attributes',
      'Textarea/with a clashing attribute',
      'Textarea/growing with its own style',
      'Textarea/with a description and an error',
      'Textarea/escaped text',
      'Toolbar/Default',
      'Toolbar/OneTicket',
      'Toolbar/AllFolders',
      'Toolbar/WithoutTarget',
      'Toolbar/WithoutSearch',
      'Toolbar/NothingSelected',
      'Toolbar/NamedGroups',
      'Toolbar/NoOverflow',
      'Toolbar/with extra attributes',
      'Toolbar/blank target and search',
      'Toolbar/escaped label and target',
      'Toolbar action/Default',
      'Toolbar action/Glyph',
      'Toolbar action/unknown glyph',
      'Toolbar action/Overflow',
      'Toolbar action/Disabled',
      'Toolbar action/escaped label',
      'Toolbar action/with extra attributes',
      'Toolbar action/with a clashing attribute',
      'Toolbar group/Default',
      'Toolbar group/Named',
      'Toolbar group/blank label',
      'Toolbar group/escaped label',
      'Toolbar group/with extra attributes',
      'Toolbar group/with a clashing attribute',
      'Toolbar scope/Default',
      'Toolbar scope/escaped label',
      'Toolbar scope/with extra attributes',
      'Toolbar scope/with a clashing attribute',
      'Toolbar search/Default',
      'Toolbar search/WithScope',
      'Toolbar search/blank scope',
      'Toolbar search/escaped label',
      'Toolbar search/with extra attributes',
      'Toolbar search/with a clashing attribute',
      'Timeline/Default',
      'Timeline/Kinds',
      'Timeline/Note',
      'Timeline/Events',
      'Timeline/Minimal',
      'Timeline/WithPicture',
      'Timeline/LongText',
      'Timeline/with extra attributes',
      'Timeline/with a clashing attribute',
      'Timeline/blank label',
      'Timeline/escaped label',
      'Timeline post/Default',
      'Timeline post/Minimal',
      'Timeline post/Note',
      'Timeline post/NoteLabel',
      'Timeline post/WithPicture',
      'Timeline post/HeadingLevel',
      'Timeline post/detail alone',
      'Timeline post/time alone, blank datetime',
      'Timeline post/blank parts',
      'Timeline post/unknown kind and level',
      'Timeline post/escaped text',
      'Timeline post/with extra attributes',
      'Timeline post/with a clashing attribute',
      'Timeline event/Default',
      'Timeline event/without a time',
      'Timeline event/blank time and datetime',
      'Timeline event/blank datetime',
      'Timeline event/escaped time',
      'Timeline event/with extra attributes',
    ]);
  });

  describe.each(cases.map((c, i) => [c.story, c, i] as const))('%s', (_story, c, i) => {
    it('Vue prints the story markup', async () => {
      const slots = {
        default: () => (c.vue.html ? createStaticVNode(c.vue.slot, 1) : c.vue.slot),
        ...Object.fromEntries(
          Object.entries(c.vue.named ?? {}).map(([name, html]) => [
            name,
            () => createStaticVNode(html, 1),
          ]),
        ),
      };
      const html = await renderToString(h(c.vue.component, c.vue.props, slots));
      expect(normalize(html)).toBe(normalize(c.markup));
    });

    it('Blade prints the story markup', () => {
      expect(normalize(withoutAlpine(blade[i]!))).toBe(normalize(c.markup));
    });

    it('React prints the story markup', () => {
      expect(normalize(renderReact(reactComponents.get(c.vue.component), c.vue))).toBe(
        normalize(c.markup),
      );
    });
  });
});

describe('menu items', () => {
  // The parity cases pass a menu's items as markup; here each layer nests its own components, so
  // the items take the id of the menu around them (Blade's MenuContext, Vue's inject, React's
  // context), through a group too.
  it('take the id of the menu around them in every layer', async () => {
    const markup = menu({
      id: 'ticket-actions',
      entries: [
        menuItemDefaults,
        'separator',
        { label: 'Move to', items: [{ ...menuItemDefaults, label: 'Inbox' }] },
        { ...menuItemDefaults, label: 'Print', href: '#print' },
      ],
    });
    const [blade] = renderBlade([
      {
        template:
          '<x-plinth::menu id="ticket-actions"><x-plinth::menu-item>Archive</x-plinth::menu-item>' +
          '<x-plinth::menu-separator /><x-plinth::menu-group label="Move to">' +
          '<x-plinth::menu-item>Inbox</x-plinth::menu-item></x-plinth::menu-group>' +
          '<x-plinth::menu-item href="#print">Print</x-plinth::menu-item></x-plinth::menu>',
      },
    ]);
    const vue = await renderToString(
      h(PlinthMenu, { id: 'ticket-actions' }, () => [
        h(PlinthMenuItem, null, () => 'Archive'),
        h(PlinthMenuSeparator),
        h(PlinthMenuGroup, { label: 'Move to' }, () => [h(PlinthMenuItem, null, () => 'Inbox')]),
        h(PlinthMenuItem, { href: '#print' }, () => 'Print'),
      ]),
    );
    const react = renderToStaticMarkup(
      createElement(
        ReactMenu,
        { id: 'ticket-actions' },
        createElement(ReactMenuItem, null, 'Archive'),
        createElement(ReactMenuSeparator),
        createElement(
          ReactMenuGroup,
          { label: 'Move to' },
          createElement(ReactMenuItem, null, 'Inbox'),
        ),
        createElement(ReactMenuItem, { href: '#print' }, 'Print'),
      ),
    );

    expect(normalize(blade!)).toBe(normalize(markup));
    expect(normalize(vue)).toBe(normalize(markup));
    expect(normalize(react)).toBe(normalize(markup));
  });
});

describe('the React side', () => {
  it('has a React component for every Vue one', () => {
    expect(cases.filter((c) => !reactComponents.has(c.vue.component))).toEqual([]);
  });

  it('turns markup into the elements React prints back', () => {
    const svg = sampleIcons.more;
    expect(normalize(renderToStaticMarkup(createElement('i', null, htmlToReact(svg))))).toBe(
      normalize(`<i>${svg}</i>`),
    );
    expect(
      normalize(renderToStaticMarkup(createElement('i', null, htmlToReact('a<b>c</b>')))),
    ).toBe(normalize('<i>a<b>c</b></i>'));
    const html = '<button disabled="" style="display: grid; --gap: 1rem">x</button>';
    expect(normalize(renderToStaticMarkup(createElement('i', null, htmlToReact(html))))).toBe(
      normalize(`<i>${html}</i>`),
    );
  });
});

describe('normalize', () => {
  it('ignores whitespace, attribute order and comments', () => {
    expect(normalize('<span  b="2" a="1">\n  <!--x--> <i>hi  there</i>\n</span>')).toBe(
      normalize('<span a="1" b="2"><i>hi there</i></span>'),
    );
  });

  it('ignores the spacing in a style', () => {
    expect(normalize('<i style="display:grid;gap:var(--x)">x</i>')).toBe(
      normalize('<i style=" display: grid ; gap: var(--x); ">x</i>'),
    );
  });

  it('still tells different markup apart', () => {
    expect(normalize('<span class="a">x</span>')).not.toBe(normalize('<span class="b">x</span>'));
    expect(normalize('<span>x</span>')).not.toBe(normalize('<span><i></i>x</span>'));
    expect(normalize('<i style="color: red">x</i>')).not.toBe(
      normalize('<i style="color: blue">x</i>'),
    );
  });
});
