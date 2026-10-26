import type { Decorator, Meta, StoryObj } from '@storybook/html-vite';
import { checkbox, type CheckboxArgs } from './checkbox.ts';
import { field } from './field.ts';
import '@ptbdynamic/plinth-css/src/components/field.css';
import '@ptbdynamic/plinth-css/src/components/checkbox.css';

/**
 * Indeterminate is the input's property, with no attribute, so the story sets it the way Vue,
 * React and Blade's Alpine do. It shows the state; it isn't part of the contract.
 */
const setIndeterminate: Decorator<CheckboxArgs> = (story, { args }) => {
  const template = document.createElement('template');
  template.innerHTML = story() as string;
  if (args.indeterminate) {
    for (const input of template.content.querySelectorAll<HTMLInputElement>('input')) {
      input.indeterminate = true;
    }
  }
  return template.content;
};

const meta = {
  title: 'Components/Checkbox',
  render: (args) => checkbox(args),
  decorators: [setIndeterminate],
  args: {
    id: 'updates',
    label: 'Email me product updates',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A choice submitted with the form: a native checkbox with its label beside it, and an optional description and error under the label. The label is required; the input takes the id, and every attribute but the class (name, value, checked, required, wire:model) goes to the input, so a plain form submits it. Indeterminate is set by script in each layer. Several checkboxes that answer one question go in a field with `group`, whose legend names them. For a setting that applies at once, use a switch.',
      },
    },
  },
} satisfies Meta<CheckboxArgs>;

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = {
  args: { id: 'all', label: 'Select all tickets', indeterminate: true },
};
export const WithDescription: Story = {
  args: { checked: true, description: 'About once a month. Unsubscribe at any time.' },
};
export const WithError: Story = {
  args: {
    id: 'terms',
    label: 'I accept the terms of service',
    error: 'Accept the terms to create the account.',
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, description: 'Your administrator turned this on.' },
};
export const LongLabel: Story = {
  args: {
    id: 'export',
    label:
      'Include archived tickets, internal notes and attachments when the export is sent to the address on the account',
  },
};

/** A group in a field: the fieldset's legend names it, each box keeps its own label. */
export const Group: Story = {
  render: () =>
    field({
      id: 'notify',
      label: 'Notify me about',
      hideLabel: false,
      group: true,
      required: false,
      description: 'Pick at least one.',
      control: [
        { id: 'notify-replies', label: 'Replies to my tickets', checked: true },
        { id: 'notify-mentions', label: 'Mentions', checked: true },
        { id: 'notify-digest', label: 'A weekly digest', checked: false },
      ]
        .map((box) => checkbox({ ...box, indeterminate: false, disabled: false }))
        .join(''),
    }),
};
