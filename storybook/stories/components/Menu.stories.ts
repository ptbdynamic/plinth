import type { Meta, StoryObj } from '@storybook/html-vite';
import { button } from './button.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { menu, menuItemTones, type MenuArgs, type MenuItemArgs } from './menu.ts';
import { pageHeader } from './page-header.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/menu.css';

const item = (label: string, extra: Partial<MenuItemArgs> = {}): MenuItemArgs => ({
  label,
  tone: 'neutral',
  disabled: false,
  ...extra,
});

/** The ⋯ button that opens the menu with no script: popovertarget names the menu's id. */
const opener = (id: string) =>
  iconButton(
    {
      label: 'More actions',
      variant: 'ghost',
      size: 'md',
      disabled: false,
      busy: false,
      svg: sampleIcons.more,
    },
    { popovertarget: id },
  );

const ticketActions: MenuArgs['entries'] = [
  item('Assign to me', { icon: sampleIcons.user, shortcut: 'A' }),
  item('Duplicate', { icon: sampleIcons.copy, shortcut: '⌘D' }),
  item('Archive', { icon: sampleIcons.archive, shortcut: 'E' }),
  'separator',
  item('Delete', { icon: sampleIcons.trash, tone: 'danger' }),
];

/** Opens the story's menu from its button, as a person would, so its anchor is the button. */
const openMenu = (canvas: HTMLElement) => {
  const trigger = canvas.querySelector<HTMLButtonElement>(
    ':is([popovertarget], [command="toggle-popover"])',
  );
  const popover = canvas.querySelector<HTMLElement>('.plinth-menu');
  if (trigger && popover && !popover.matches(':popover-open')) trigger.click();
};

/** Room for the open menu under its button, so the story's frame shows all of it. */
const stage = (content: string, align: 'start' | 'end' = 'start') =>
  `<div style="display: flex; justify-content: ${align === 'end' ? 'flex-end' : 'flex-start'}; min-block-size: 22rem; padding: var(--plinth-space-4);">${content}</div>`;

const meta = {
  title: 'Components/Menu',
  render: (args) => stage(opener(args.id) + menu(args)),
  // The story opens its menu, as pressing the button would. In the docs page the menus stay
  // closed until their button is pressed.
  play: ({ canvasElement }) => openMenu(canvasElement),
  args: { id: 'ticket-actions', entries: ticketActions },
  argTypes: { entries: { control: 'object' } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A short list of actions that opens from a button, in a popover anchored to it. ' +
          'Give the menu an id and its button `popovertarget` with that id; the browser opens and ' +
          'closes it, closes it on Escape or a click outside, and puts focus back on the button. ' +
          'Its items are buttons and links reached with Tab, not an ARIA `menu`. Name an icon-only ' +
          'button (`aria-label`). Tone: ' +
          menuItemTones.map((tone) => `\`${tone}\``).join(', ') +
          '.',
      },
    },
  },
} satisfies Meta<MenuArgs>;

export default meta;
type Story = StoryObj<MenuArgs>;

/** Buttons with an icon and a shortcut, a separator, and a danger item. */
export const Default: Story = {};

export const LabelsOnly: Story = {
  args: { entries: [item('Rename'), item('Move'), item('Share'), 'separator', item('Leave')] },
};

/** Groups under headings, each a `role="group"` named by its heading. */
export const Groups: Story = {
  args: {
    entries: [
      {
        label: 'Move to',
        items: [item('Inbox'), item('Waiting'), item('Done')],
      },
      'separator',
      {
        label: 'Priority',
        items: [item('High'), item('Normal'), item('Low')],
      },
    ],
  },
};

/** Items that navigate are links; they close the menu by leaving the page. */
export const Links: Story = {
  args: {
    entries: [
      item('Open in a new tab', { href: '#ticket' }),
      item('Print', { href: '#print', shortcut: '⌘P' }),
      'separator',
      item('Copy link', { icon: sampleIcons.copy }),
    ],
  },
};

export const Disabled: Story = {
  args: {
    entries: [
      item('Assign to me', { icon: sampleIcons.user }),
      item('Merge', { disabled: true }),
      item('Print', { href: '#print', disabled: true }),
      'separator',
      item('Delete', { icon: sampleIcons.trash, tone: 'danger', disabled: true }),
    ],
  },
};

/** A label longer than the menu's widest wraps, and the shortcut keeps its place. */
export const LongLabels: Story = {
  args: {
    entries: [
      item('Send a copy of this conversation to everyone who follows the ticket', {
        shortcut: '⌘⇧S',
      }),
      item('Archive'),
    ],
  },
};

/** More items than the screen holds: the menu scrolls and stays on screen. */
export const ManyItems: Story = {
  args: {
    entries: [
      {
        label: 'Assign to',
        items: [
          'Ana Silva',
          'Ben Okafor',
          'Chen Wei',
          'Dana Cohen',
          'Eli Novak',
          'Femi Adeyemi',
          'Grace Park',
          'Hugo Martin',
          'Ines Duarte',
          'Jon Berg',
          'Kai Tanaka',
          'Lea Weber',
          'Mira Shah',
          'Noor Haddad',
          'Omar Aziz',
          'Pia Larsen',
          'Quinn Reyes',
          'Rosa Lima',
        ].map((name) => item(name)),
      },
    ],
  },
};

/** A button at the end of the row: the menu flips to the button's end edge to stay on screen. */
export const AtTheEnd: Story = {
  render: (args) => stage(opener(args.id) + menu(args), 'end'),
};

/** A button near the bottom of the screen: the menu opens above it. */
export const Above: Story = {
  render: (args) =>
    `<div style="display: flex; align-items: flex-end; block-size: 100dvb; box-sizing: border-box; padding: var(--plinth-space-4);">${opener(args.id)}${menu(args)}</div>`,
};

/** The same menu in right-to-left text: it starts at the button's right edge. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${stage(opener(args.id) + menu(args))}</div>`,
};

/** A text button can open it too, with commandfor and command="toggle-popover". */
export const FromAButton: Story = {
  render: (args) =>
    stage(
      button(
        { label: 'Actions', variant: 'secondary', size: 'md', disabled: false, busy: false },
        { commandfor: args.id, command: 'toggle-popover' },
      ) + menu(args),
    ),
};

/** The page header's ⋯ overflow, at the end of its actions. */
export const InPageHeader: Story = {
  render: (args) =>
    `<div style="min-block-size: 24rem;">${pageHeader({
      heading: 'Inbox',
      level: 'h1',
      top: false,
      actions:
        iconButton({
          label: 'Search',
          variant: 'ghost',
          size: 'md',
          disabled: false,
          busy: false,
          svg: sampleIcons.search,
        }) + opener(args.id),
    })}${menu(args)}</div>`,
};
