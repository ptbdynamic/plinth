import type { Meta, StoryObj } from '@storybook/html-vite';
import { switchControl, type SwitchArgs } from './switch.ts';
import '@ptbdynamic/plinth-css/src/components/switch.css';

const meta = {
  title: 'Components/Switch',
  render: (args) => switchControl(args),
  args: {
    id: 'enabled',
    label: 'Enabled',
    checked: false,
    disabled: false,
  },
  argTypes: {
    checked: { control: 'boolean' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A setting that is on or off and applies at once, such as "Enabled": a native checkbox with the switch role, its label beside it, and an optional description and error under the label. The label is required; the input takes the id, and every attribute but the class (name, value, checked, wire:model) goes to the input, so a plain form submits it when it is on. For a choice sent with a form\'s other answers, use a checkbox.',
      },
    },
  },
} satisfies Meta<SwitchArgs>;

export default meta;
type Story = StoryObj<SwitchArgs>;

export const Default: Story = {};
export const On: Story = { args: { checked: true } };
export const WithDescription: Story = {
  args: { checked: true, description: 'People can sign in with this provider.' },
};
export const WithError: Story = {
  args: { error: 'Add a client ID before you turn it on.' },
};
export const Disabled: Story = { args: { disabled: true } };
export const DisabledOn: Story = {
  args: { checked: true, disabled: true, description: 'Your administrator turned this on.' },
};
export const LongLabel: Story = {
  args: {
    id: 'auto-close',
    label:
      'Close tickets automatically when the customer has not replied for seven days after the last answer',
  },
};

/** A few settings, one under the other. */
export const Settings: Story = {
  render: () =>
    `<div style="display: grid; gap: var(--plinth-space-3); max-inline-size: 28rem;">${[
      {
        id: 'setting-email',
        label: 'Email sign-in',
        checked: true,
        description: 'A link sent to the address on the account.',
      },
      { id: 'setting-passkeys', label: 'Passkeys', checked: true },
      {
        id: 'setting-sso',
        label: 'Single sign-on',
        checked: false,
        description: 'Needs a provider set up first.',
        disabled: true,
      },
    ]
      .map((setting) => switchControl({ disabled: false, ...setting }))
      .join('')}</div>`,
};
