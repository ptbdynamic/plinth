import type { Meta, StoryObj } from '@storybook/html-vite';
import { avatar } from './avatar.ts';
import { badge } from './badge.ts';
import { icon } from './icon.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { listRow, type ListRowArgs } from './list-row.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/avatar.css';
import '@ptbdynamic/plinth-css/src/components/badge.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/switch.css';

const leadingIcon = (svg: string) => icon({ size: 'md', mirror: false, svg });
const person = avatar({ name: 'Ana Lima', size: 'md', decorative: true });
const moreActions = iconButton({
  label: 'More actions for Ana Lima',
  variant: 'ghost',
  size: 'sm',
  disabled: false,
  busy: false,
  svg: sampleIcons.more,
});

const meta = {
  title: 'Components/List Row',
  render: (args) => listRow(args),
  args: {
    title: 'Notifications',
    chevron: false,
    button: false,
    current: false,
    disabled: false,
    selectable: false,
    selected: false,
    toggle: false,
    checked: false,
  },
  argTypes: {
    description: { control: 'text' },
    href: { control: 'text' },
    leading: { control: 'text' },
    trailing: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    switchId: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          "One row of a list: a title, a description, and a leading and a trailing slot. A link, a button or plain. While the app is selecting rows, `selectable` makes it a `<label>` with a checkbox in the leading slot, named by the row's text; selecting never navigates, and the app owns which rows are `selected` (it listens to the checkbox's `change`). A setting row, `toggle`, is a `<label>` with a switch in the trailing slot, named by the title and described by the description; the whole row flips it, and the app owns whether it is `checked`.",
      },
    },
  },
} satisfies Meta<ListRowArgs>;

export default meta;
type Story = StoryObj<ListRowArgs>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Email and push' } };
export const WithIcon: Story = { args: { leading: leadingIcon(sampleIcons.bell) } };
export const WithAvatar: Story = {
  args: { title: 'Ana Lima', description: 'ana@example.com', leading: person },
};
export const WithValue: Story = {
  args: { title: 'Language', leading: leadingIcon(sampleIcons.globe), trailing: 'English' },
};
export const WithBadge: Story = {
  args: { title: 'Invoices', trailing: badge({ label: '3 due', tone: 'warning', dot: false }) },
};
export const Link: Story = {
  args: {
    title: 'Language',
    leading: leadingIcon(sampleIcons.globe),
    trailing: 'English',
    chevron: true,
    href: '#language',
  },
};
export const Button: Story = { args: { title: 'Sign out', button: true } };
export const Current: Story = {
  args: {
    title: 'Overview',
    description: 'Everything at a glance',
    leading: leadingIcon(sampleIcons.star),
    trailing: '12',
    chevron: true,
    href: '#overview',
    current: true,
  },
};
export const Disabled: Story = { args: { title: 'Export', button: true, disabled: true } };
export const DisabledLink: Story = {
  args: { title: 'Billing', href: '#billing', chevron: true, disabled: true },
};
export const WithAction: Story = {
  args: { title: 'Ana Lima', description: 'Owner', leading: person, trailing: moreActions },
};
export const LongText: Story = {
  args: {
    title: 'Send a summary of the week to everyone in the workspace',
    description: 'Every Monday morning, in the language each person has chosen for their account',
    trailing: 'Weekly',
    chevron: true,
    href: '#summary',
  },
};
export const LongValue: Story = {
  args: {
    title: 'Billing contact',
    trailing: 'Accounts payable, second floor, north building',
    chevron: true,
    href: '#billing',
  },
};

/** While the app is selecting: a checkbox in place of the avatar, and the row opens nothing. */
export const Selectable: Story = {
  args: {
    title: 'Cannot export the March report',
    description: 'Alex Kim · 10 min',
    leading: person,
    trailing: badge({ label: 'Urgent', tone: 'danger', dot: false }),
    href: '#ticket-1',
    chevron: true,
    selectable: true,
    name: 'tickets[]',
    value: '1',
  },
};
export const Selected: Story = { args: { ...Selectable.args, selected: true } };
export const SelectableDisabled: Story = {
  args: { ...Selectable.args, title: 'Ticket locked by Jo Park', disabled: true },
};
/** The open ticket stays current while the app is selecting. */
export const SelectableCurrent: Story = {
  args: { ...Selectable.args, current: true, selected: true },
};

const tickets = [
  ['Cannot export the March report', 'Alex Kim · 10 min', true],
  ['Invoice shows the wrong address', 'Jo Park · 1 h', true],
  ['Two-factor code never arrives', 'Rui Silva · 3 h', false],
] as const;

/** Rows while selecting, in a list: two selected, one not. */
export const SelectableList: Story = {
  render: () =>
    `<ul role="list" style="margin: 0; padding: 0; list-style: none;">${tickets
      .map(
        ([title, description, selected], index) =>
          `<li>${listRow({ ...meta.args, title, description, selectable: true, selected, name: 'tickets[]', value: String(index + 1) })}</li>`,
      )
      .join('')}</ul>`,
};

/** A setting row: the row's text names the switch, and a tap anywhere on the row flips it. */
export const Setting: Story = {
  args: {
    title: 'Pause runs',
    description: 'Stop new runs for this client',
    toggle: true,
    switchId: 'paused',
    name: 'paused',
    value: '1',
  },
};
export const SettingOn: Story = { args: { ...Setting.args, checked: true } };
export const SettingDisabled: Story = {
  args: {
    ...Setting.args,
    description: 'Only an owner can pause runs',
    checked: true,
    disabled: true,
  },
};
export const SettingWithIcon: Story = {
  args: {
    ...Setting.args,
    leading: leadingIcon(sampleIcons.bell),
    title: 'Notifications',
    description: undefined,
    switchId: 'notify',
  },
};

const switches = [
  ['Pause runs', 'Stop new runs for this client', 'paused', false],
  ['Email reports', 'A summary every Monday', 'reports', true],
  ['Two-factor sign-in', undefined, 'two-factor', true],
] as const;

/** Setting rows in a list, as on a settings screen or in a menu sheet. */
export const SettingList: Story = {
  render: () =>
    `<ul role="list" style="margin: 0; padding: 0; list-style: none;">${switches
      .map(
        ([title, description, id, checked]) =>
          `<li>${listRow({ ...meta.args, title, description, toggle: true, switchId: id, name: id, value: '1', checked })}</li>`,
      )
      .join('')}</ul>`,
};

const settings = [
  listRow({
    ...meta.args,
    title: 'Overview',
    leading: leadingIcon(sampleIcons.star),
    href: '#overview',
    current: true,
  }),
  listRow({
    ...meta.args,
    leading: leadingIcon(sampleIcons.bell),
    trailing: badge({ label: 'On', tone: 'success', dot: true }),
    href: '#notifications',
    chevron: true,
  }),
  listRow({
    ...meta.args,
    title: 'Language',
    leading: leadingIcon(sampleIcons.globe),
    trailing: 'English',
    href: '#language',
    chevron: true,
  }),
  listRow({ ...meta.args, title: 'Sign out', button: true }),
];

/** Rows in a list, each in its own `<li>`, with the dividers between them. */
export const List: Story = {
  render: () =>
    `<ul role="list" style="margin: 0; padding: 0; list-style: none;">${settings.map((row) => `<li>${row}</li>`).join('')}</ul>`,
};

/** Rows in a short scrolling area, as in a sheet: Tab to a row and the ring stays whole. */
export const InScrollingSheet: Story = {
  render: () => `<div style="max-block-size: 7rem; overflow: auto;">${settings.join('')}</div>`,
};

/** The same rows in right-to-left text: the slots swap sides and the chevrons point left. */
export const RightToLeft: Story = {
  render: () => `<div dir="rtl">${settings.join('')}</div>`,
};
