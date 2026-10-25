import type { Meta, StoryObj } from '@storybook/html-vite';
import { textarea, type TextareaArgs } from './textarea.ts';
import '@ptbdynamic/plinth-css/src/components/textarea.css';

const longReply = [
  'Thanks for writing in.',
  'I have looked at the order and the refund went out this morning.',
  'It can take three to five working days to show on your statement, depending on the bank.',
  'If it has not arrived by Friday, reply here and I will chase it for you.',
  'Have a good week.',
].join('\n');

const meta = {
  title: 'Components/Textarea',
  render: (args) => textarea(args),
  args: {
    id: 'reply',
    label: 'Reply',
    hideLabel: false,
    rows: 3,
    grow: false,
    maxRows: 8,
    placeholder: 'Write a reply',
    disabled: false,
    readonly: false,
  },
  argTypes: {
    hideLabel: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1 } },
    grow: { control: 'boolean' },
    maxRows: { control: { type: 'number', min: 1 } },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Several lines of text with its label, and an optional description and error. With grow it grows with its content (field-sizing: content) from rows lines to max-rows, then scrolls; where the browser has no field-sizing it keeps rows lines and can be resized. The label is required (it can be hidden visually); every attribute but the class goes to the textarea.',
      },
    },
  },
} satisfies Meta<TextareaArgs>;

export default meta;
type Story = StoryObj<TextareaArgs>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: { description: 'The customer sees this reply.' },
};
export const WithError: Story = {
  args: { error: 'Write a reply before you send it.' },
};
export const Grow: Story = {
  args: { grow: true, rows: 2, value: longReply.split('\n').slice(0, 2).join('\n') },
};
export const GrowToMaximum: Story = {
  args: { grow: true, rows: 2, maxRows: 4, value: longReply },
};
export const HiddenLabel: Story = { args: { hideLabel: true, grow: true } };
export const Disabled: Story = { args: { value: longReply, disabled: true } };
export const ReadOnly: Story = {
  args: { label: 'Original message', value: longReply, readonly: true, placeholder: undefined },
};
