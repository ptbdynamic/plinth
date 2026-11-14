import type { Meta, StoryObj } from '@storybook/html-vite';
import { select, selectSizes, type SelectArgs } from './select.ts';
import { sampleIcons } from './icons.ts';
import '@ptbdynamic/plinth-css/src/components/select.css';
import '@ptbdynamic/plinth-css/src/components/icon.css';

const roles = [
  '<option value="admin">Admin</option>',
  '<option value="editor">Editor</option>',
  '<option value="viewer">Viewer</option>',
].join('');

const meta = {
  title: 'Components/Select',
  render: (args) => select(args),
  args: {
    id: 'role',
    label: 'Role',
    hideLabel: false,
    size: 'md',
    options: roles,
    disabled: false,
    required: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: selectSizes },
    hideLabel: { control: 'boolean' },
    options: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    icon: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A native dropdown for choosing one option from a list, with its label and an optional description and error. The label is required (it can be hidden visually); the options are the app's own <option> and <optgroup> elements in the slot, and every attribute but the class (name, required, wire:model) goes to the select. A placeholder adds a first, disabled option that shows while nothing is chosen. It looks like the text field, with a chevron at its end; on a phone the text is 16px so iOS does not zoom in, and on a touch screen the field is 40px tall.",
      },
    },
  },
} satisfies Meta<SelectArgs>;

export default meta;
type Story = StoryObj<SelectArgs>;

export const Default: Story = {};
export const WithPlaceholder: Story = {
  args: { options: roles, placeholder: 'Choose a role' },
};
export const WithDescription: Story = {
  args: { description: 'What the person may change in this project.' },
};
export const WithError: Story = {
  args: {
    options: roles,
    placeholder: 'Choose a role',
    required: true,
    error: 'Choose a role for the new member.',
  },
};
export const WithIcon: Story = {
  args: {
    id: 'language',
    label: 'Language',
    icon: sampleIcons.globe,
    options: [
      '<option value="en">English</option>',
      '<option value="pt">Português</option>',
      '<option value="fr">Français</option>',
    ].join(''),
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { id: 'role-small', size: 'sm' } };
export const HiddenLabel: Story = { args: { id: 'role-hidden', hideLabel: true } };
export const WithGroups: Story = {
  args: {
    id: 'country',
    label: 'Country',
    placeholder: 'Choose a country',
    options: [
      '<optgroup label="Europe">',
      '<option value="pt">Portugal</option>',
      '<option value="fr">France</option>',
      '</optgroup>',
      '<optgroup label="Americas">',
      '<option value="br">Brazil</option>',
      '<option value="ca">Canada</option>',
      '</optgroup>',
    ].join(''),
  },
};

/** Both sizes. */
export const Sizes: Story = {
  render: () =>
    `<div style="display: grid; gap: var(--plinth-space-4); max-inline-size: 24rem;">${selectSizes
      .map((size) =>
        select({
          id: `role-${size}`,
          label: `Role (${size})`,
          hideLabel: false,
          size,
          options: roles,
          disabled: false,
          required: false,
        }),
      )
      .join('')}</div>`,
};
