import type { Meta, StoryObj } from '@storybook/html-vite';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { textField, textFieldSizes, type TextFieldArgs } from './text-field.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/text-field.css';

/** The clear button a search field takes in its trailing slot. */
const clearButton = iconButton({
  label: 'Clear search',
  variant: 'ghost',
  size: 'sm',
  disabled: false,
  busy: false,
  svg: sampleIcons.close,
});

const meta = {
  title: 'Components/Text Field',
  render: (args) => textField(args),
  args: {
    id: 'email',
    label: 'Email',
    hideLabel: false,
    type: 'email',
    size: 'md',
    placeholder: 'name@example.com',
    disabled: false,
    readonly: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: textFieldSizes },
    type: {
      control: 'select',
      options: ['text', 'email', 'url', 'tel', 'password', 'number', 'search'],
    },
    hideLabel: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    icon: { control: 'text' },
    trailing: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'One line of text with its label, and an optional description and error. The label is required (it can be hidden visually); the input takes the id, and every attribute but the class (name, value, wire:model) goes to the input. A search field takes a search icon and a clear button that the app shows and wires up. The text is 16px on a phone so iOS does not zoom in; on a touch screen the field is 40px tall.',
      },
    },
  },
} satisfies Meta<TextFieldArgs>;

export default meta;
type Story = StoryObj<TextFieldArgs>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: { description: 'Receipts go to this address.' },
};
export const WithError: Story = {
  args: { value: 'sam@', error: 'Enter an email address, such as name@example.com.' },
};
export const Small: Story = {
  args: { id: 'project', label: 'Project name', type: 'text', size: 'sm', placeholder: undefined },
};
export const Search: Story = {
  args: {
    id: 'search',
    label: 'Search tickets',
    hideLabel: true,
    type: 'search',
    placeholder: 'Search tickets',
    value: 'refund',
    icon: sampleIcons.search,
    trailing: clearButton,
  },
};
export const WithKeyboardHint: Story = {
  args: {
    id: 'find',
    label: 'Search',
    hideLabel: true,
    type: 'search',
    placeholder: 'Search',
    icon: sampleIcons.search,
    trailing: '<kbd aria-hidden="true">/</kbd>',
  },
};
export const Disabled: Story = { args: { value: 'sam@example.com', disabled: true } };
export const ReadOnly: Story = {
  args: {
    id: 'account',
    label: 'Account ID',
    type: 'text',
    value: 'ACC-20431',
    readonly: true,
    placeholder: undefined,
    description: 'Give this to support when you write to them.',
  },
};

/** Both sizes, with and without an icon. */
export const Gallery: Story = {
  render: () =>
    `<div style="display: grid; gap: var(--plinth-space-4); max-inline-size: 24rem;">${textFieldSizes
      .flatMap((size) => [
        textField({
          id: `name-${size}`,
          label: `Name (${size})`,
          hideLabel: false,
          type: 'text',
          size,
          disabled: false,
          readonly: false,
        }),
        textField({
          id: `search-${size}`,
          label: `Search (${size})`,
          hideLabel: false,
          type: 'search',
          size,
          placeholder: 'Search',
          icon: sampleIcons.search,
          disabled: false,
          readonly: false,
        }),
      ])
      .join('')}</div>`,
};
