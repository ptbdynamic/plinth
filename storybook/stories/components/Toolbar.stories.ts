import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { menuItem, menuSeparator, type MenuItemArgs } from './menu.ts';
import { pageHeader } from './page-header.ts';
import { button } from './button.ts';
import {
  toolbar,
  toolbarGroups,
  toolbarScope,
  toolbarSearch,
  type ToolbarActionArgs,
  type ToolbarArgs,
  type ToolbarGroupArgs,
} from './toolbar.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/menu.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/toolbar.css';

const action = (
  label: string,
  svg: string,
  extra: Partial<ToolbarActionArgs> = {},
): ToolbarActionArgs => ({ label, svg, overflow: false, disabled: false, ...extra });

const item = (label: string, extra: Partial<MenuItemArgs> = {}): MenuItemArgs => ({
  label,
  tone: 'neutral',
  disabled: false,
  ...extra,
});

/** Assign, Solve, Snooze and Priority; then Spam and Delete, which overflow below 1280px. */
const sampleGroups = (extra: Partial<ToolbarActionArgs> = {}): ToolbarGroupArgs[] => [
  {
    actions: [
      action('Assign', sampleIcons.user, extra),
      action('Solve', sampleIcons.check, extra),
      action('Snooze', sampleIcons.clock, extra),
      action('Priority', sampleIcons.flag, extra),
    ],
  },
  {
    actions: [
      action('Spam', sampleIcons.spam, { overflow: true, ...extra }),
      action('Delete', sampleIcons.trash, { overflow: true, ...extra }),
    ],
  },
];

/** The ⋯ button and its menu: Spam and Delete below 1280px, then Merge and Print. */
const sampleMore = (id = 'ticket-more') =>
  [
    iconButton(
      {
        label: 'More actions',
        icon: 'more',
        variant: 'ghost',
        size: 'md',
        disabled: false,
        busy: false,
      },
      { popovertarget: id },
    ),
    `<div class="plinth-menu" id="${id}" popover="auto">`,
    menuItem(item('Spam', { icon: sampleIcons.spam }), { 'data-overflow': '' }, id),
    menuItem(item('Delete', { icon: sampleIcons.trash }), { 'data-overflow': '' }, id),
    menuSeparator({ 'data-overflow': '' }),
    menuItem(item('Merge into…'), {}, id),
    menuItem(item('Print', { href: '#print' })),
    '</div>',
  ].join('');

/** The search with its scope button and the menu of scopes. */
const sampleSearch = (scope = 'In: Open', id = 'search-scope') =>
  toolbarSearch(
    {
      label: 'Search tickets',
      scope: [
        toolbarScope({ label: scope }, { popovertarget: id }),
        `<div class="plinth-menu" id="${id}" popover="auto">`,
        menuItem(item('In: Open'), {}, id),
        menuItem(item('In: Pending'), {}, id),
        menuItem(item('All folders'), {}, id),
        '</div>',
      ].join(''),
    },
    { placeholder: 'Search', name: 'q' },
  );

const meta = {
  title: 'Components/Toolbar',
  render: (args) => toolbar(args),
  args: {
    label: 'Ticket actions',
    target: '2 selected',
    search: sampleSearch(),
    actions: toolbarGroups(sampleGroups()) + sampleMore(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'The row of actions under a page header, as in a mail app: a search field with its scope (_In: Open_), what the actions act on (_2 selected_, _#1042_), the actions in groups, then a ⋯ menu. It shows from 768px; on a phone the actions go in the page header. From 1280px each action shows its icon and label, below its icon alone, with the label still its name. Mark an action `overflow` to hide it below 1280px, and put it in the ⋯ menu too with `data-overflow` on the item: the menu shows it only there. In Blade, Vue and React the actions are one tab stop and the arrow keys move between them (the stories have no script, so Tab goes through each). Name the toolbar with `label`, and the search field with its own `label`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    target: { control: 'text' },
    search: { control: false },
    actions: { control: false },
  },
} satisfies Meta<ToolbarArgs>;

export default meta;
type Story = StoryObj<ToolbarArgs>;

/** Two tickets selected: the search in Open, the actions in two groups, and ⋯. */
export const Default: Story = {};

/** One ticket open: the target is its number. */
export const OneTicket: Story = { args: { target: '#1042' } };

/** The search looks in every folder. */
export const AllFolders: Story = { args: { search: sampleSearch('All folders') } };

/** Without a target: the actions act on what the page shows. */
export const WithoutTarget: Story = { args: { target: undefined } };

/** Without the search: the target, then the actions. */
export const WithoutSearch: Story = { args: { search: undefined } };

/** Nothing selected yet: the actions are disabled until something is. */
export const NothingSelected: Story = {
  args: {
    target: '0 selected',
    actions: toolbarGroups(sampleGroups({ disabled: true })) + sampleMore(),
  },
};

/** Groups named on their own, for a screen reader: Ticket and Remove. */
export const NamedGroups: Story = {
  args: {
    actions:
      toolbarGroups(
        sampleGroups().map((group, index) => ({ ...group, label: ['Ticket', 'Remove'][index] })),
      ) + sampleMore(),
  },
};

/** Nothing overflows: every action stays in the toolbar at every width. */
export const NoOverflow: Story = {
  args: {
    actions:
      toolbarGroups(
        sampleGroups().map((group) => ({
          ...group,
          actions: group.actions.map((entry) => ({ ...entry, overflow: false })),
        })),
      ) +
      iconButton(
        {
          label: 'More actions',
          icon: 'more',
          variant: 'ghost',
          size: 'md',
          disabled: false,
          busy: false,
        },
        { popovertarget: 'ticket-more-plain' },
      ) +
      `<div class="plinth-menu" id="ticket-more-plain" popover="auto">${menuItem(
        item('Merge into…'),
        {},
        'ticket-more-plain',
      )}</div>`,
  },
};

/** Under the page header, as in the support inbox; on a phone only the page header shows. */
export const UnderPageHeader: Story = {
  render: (args) =>
    pageHeader({
      heading: 'Inbox',
      level: 'h1',
      top: false,
      actions: button({
        label: 'New ticket',
        variant: 'primary',
        size: 'md',
        disabled: false,
        busy: false,
      }),
    }) + toolbar(args),
};
