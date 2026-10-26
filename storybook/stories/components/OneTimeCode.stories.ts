import type { Meta, StoryObj } from '@storybook/html-vite';
import { oneTimeCode, oneTimeCodeLengths, type OneTimeCodeArgs } from './one-time-code.ts';
import '@ptbdynamic/plinth-css/src/components/field.css';
import '@ptbdynamic/plinth-css/src/components/one-time-code.css';

const meta = {
  title: 'Components/One-Time Code',
  render: (args) => oneTimeCode(args),
  args: {
    id: 'code',
    label: 'Verification code',
    hideLabel: false,
    length: 6,
    disabled: false,
    autosubmit: false,
  },
  argTypes: {
    length: { control: 'inline-radio', options: oneTimeCodeLengths },
    hideLabel: { control: 'boolean' },
    value: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    autosubmit: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A code from an authenticator app, an SMS or an email, as one real input styled as a row of digit cells, so paste, autofill and screen readers work as for any field. It has the field\'s label, description and error. The input brings up the number pad and offers a code the phone was sent (`autocomplete="one-time-code"`); Blade, Vue and React keep only digits from what is typed or pasted, and with `autosubmit` send the form once every digit is in. The label is required (it can be hidden visually); every attribute but the class (name, wire:model) goes to the input. The story is the plain markup, without that behaviour.',
      },
    },
  },
} satisfies Meta<OneTimeCodeArgs>;

export default meta;
type Story = StoryObj<OneTimeCodeArgs>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: { description: 'Open your authenticator app and enter the 6-digit code it shows.' },
};
export const Filled: Story = { args: { value: '204816' } };
export const WithError: Story = {
  args: { value: '204861', error: "That code didn't work. Enter the newest one from your app." },
};
export const FourDigits: Story = {
  args: {
    id: 'sms-code',
    label: 'Code from the text message',
    length: 4,
    value: '73',
    description: 'We sent it to the number ending in 42.',
  },
};
export const EightDigits: Story = {
  args: { id: 'backup-code', label: 'Backup code', length: 8 },
};
export const HiddenLabel: Story = { args: { hideLabel: true } };
export const Disabled: Story = { args: { value: '204816', disabled: true } };
export const Autosubmit: Story = {
  args: { autosubmit: true, description: 'The form is sent once every digit is in.' },
};
