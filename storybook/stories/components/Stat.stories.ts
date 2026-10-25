import type { Meta, StoryObj } from '@storybook/html-vite';
import { stat, tones, type StatArgs } from './stat.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/stat.css';

const meta = {
  title: 'Components/Stat',
  render: (args) => stat(args),
  args: { label: 'Runs today', value: '12', tone: 'neutral', emptyLabel: 'Not available' },
  argTypes: {
    value: { control: 'text' },
    description: { control: 'text' },
    tone: { control: 'inline-radio', options: tones },
    href: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'One metric on a tile, for a dashboard: a label, the value, and an optional supporting line (a change, a target, or "of €150") with a tone. ' +
          'The tone colours the supporting line and adds an icon of its own shape; the words must still say what it means ("Up 2 points", "Over budget"). ' +
          'With an `href` the whole tile links to the detail behind the number. A value that isn’t available yet shows an em dash, and screen readers hear the empty label instead. ' +
          'The tile has no width of its own: lay the tiles out in a grid on the page.',
      },
    },
  },
} satisfies Meta<StatArgs>;

export default meta;
type Story = StoryObj<StatArgs>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: { label: 'Spend this month', value: '€38', description: 'of €150' },
};
export const Success: Story = {
  args: {
    label: 'Success rate',
    value: '94%',
    description: 'Up 2 points this week',
    tone: 'success',
  },
};
export const Warning: Story = {
  args: {
    label: 'Spend this month',
    value: '€128',
    description: '85% of the budget',
    tone: 'warning',
  },
};
export const Danger: Story = {
  args: { label: 'Failed runs', value: '7', description: 'Up from 1 yesterday', tone: 'danger' },
};
export const Empty: Story = {
  args: { label: 'Average duration', value: '', description: 'Counted after the first run' },
};
export const Link: Story = {
  args: { label: 'Runs today', value: '12', description: '3 more than yesterday', href: '#runs' },
};
export const LinkWithTone: Story = {
  args: {
    label: 'Failed runs',
    value: '7',
    description: 'Up from 1 yesterday',
    tone: 'danger',
    href: '#failed-runs',
  },
};
export const LongText: Story = {
  args: {
    label: 'Documents waiting for a second signature from the finance team',
    value: '1,284,903',
    description: 'Most of them were uploaded before the end of the previous quarter',
    tone: 'warning',
    href: '#documents',
  },
};

const tiles = [
  stat({ ...meta.args, href: '#runs' }),
  stat({ ...meta.args, ...Success.args }),
  stat({ ...meta.args, ...Warning.args }),
  stat({ ...meta.args, ...Empty.args }),
];

const grid =
  'display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr)); gap: var(--plinth-space-3); margin: 0; padding: 0; list-style: none;';

/** Tiles in the page's grid: one column on a phone, more as the page widens. */
export const Dashboard: Story = {
  render: () =>
    `<ul role="list" style="${grid}">${tiles.map((tile) => `<li>${tile}</li>`).join('')}</ul>`,
};

/** The same tiles in right-to-left text: the chevron points left. */
export const RightToLeft: Story = {
  render: () => `<div dir="rtl" style="${grid}">${tiles.join('')}</div>`,
};
