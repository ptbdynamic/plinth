import type { Meta, StoryObj } from '@storybook/html-vite';
import { meter, tones, type MeterArgs } from './meter.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/meter.css';
import '@ptbdynamic/plinth-css/src/components/stat.css';

const meta = {
  title: 'Components/Meter',
  render: (args) => meter(args),
  args: {
    id: 'spend',
    label: 'Spend this month',
    value: 38,
    min: 0,
    max: 150,
    low: 105,
    high: 135,
    optimum: 0,
    valueText: '€38 of €150',
    description: 'Runs pause at €150.',
  },
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    low: { control: 'number' },
    high: { control: 'number' },
    optimum: { control: 'number' },
    valueText: { control: 'text' },
    description: { control: 'text' },
    tone: { control: 'inline-radio', options: [undefined, ...tones] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A value against a limit: spend this month against a cap, runs used against a quota, storage used. A label, the numbers in words, a native `<meter>` and an optional line under it. ' +
          'The tone (neutral, success, warning, danger) is the app’s choice, or the numbers decide it as the browser decides the meter’s region: give `low`, `high` and `optimum` and the bar turns warning, then danger, as the value nears the limit, and danger past it. ' +
          'The value text is the app’s, formatted and translated ("€120 of €150", "Over the cap by €12"); screen readers hear it as the meter’s value. The words must say what the tone means: the colour and the icon only reinforce them. ' +
          'Not a progress bar: a task under way uses `<progress>`.',
      },
    },
  },
} satisfies Meta<MeterArgs>;

export default meta;
type Story = StoryObj<MeterArgs>;

/** Well under the cap: the optimum region, neutral. */
export const Default: Story = {};
/** Past low: the suboptimal region, warning. */
export const NearTheLimit: Story = {
  args: { value: 120, valueText: '€120 of €150' },
};
/** Past high: the even-less-good region, danger. */
export const AtTheLimit: Story = {
  args: { value: 142, valueText: '€142 of €150', description: 'Runs pause at €150, in €8.' },
};
/** Past max: the bar is full, in danger, and the words say by how much. */
export const OverTheLimit: Story = {
  args: {
    value: 162,
    valueText: '€162 of €150',
    description: 'Over the cap by €12. Runs are paused.',
  },
};
/** A higher value is better: optimum above high, so past high is neutral. Success comes only from the app. */
export const HigherIsBetter: Story = {
  args: {
    id: 'uptime',
    label: 'Checks passed',
    value: 46,
    max: 50,
    low: 30,
    high: 45,
    optimum: 50,
    valueText: '46 of 50',
    description: 'Above the target of 45.',
  },
};
/** The app chooses the tone, whatever the numbers say. */
export const ChosenTone: Story = {
  args: {
    id: 'storage',
    label: 'Storage',
    value: 7.5,
    max: 10,
    low: undefined,
    high: undefined,
    optimum: undefined,
    valueText: '7.5 GB of 10 GB',
    description: 'Old exports are removed after 30 days.',
    tone: 'warning',
  },
};
/** No thresholds: every value is neutral. */
export const WithoutThresholds: Story = {
  args: {
    id: 'runs',
    label: 'Runs this month',
    value: 640,
    max: 1000,
    low: undefined,
    high: undefined,
    optimum: undefined,
    valueText: '640 of 1,000',
    description: undefined,
  },
};
/** Only the label: the bar holds the bare value, and screen readers say the browser's reading. */
export const LabelOnly: Story = {
  args: {
    id: 'quota',
    label: 'Quota used',
    value: 25,
    max: 100,
    low: undefined,
    high: undefined,
    optimum: undefined,
    valueText: undefined,
    description: undefined,
  },
};
export const LongText: Story = {
  args: {
    id: 'documents',
    label: 'Documents waiting for a second signature from the finance team',
    value: 1284,
    max: 1500,
    low: 1000,
    high: 1400,
    optimum: 0,
    valueText: '1,284 of 1,500 documents waiting for a signature',
    description: 'Most of them were uploaded before the end of the previous quarter.',
  },
};

const stack =
  'display: grid; gap: var(--plinth-space-6); max-inline-size: 32rem; margin: 0; padding: 0; list-style: none;';

/** Every region of one meter, from neutral to over the limit. */
export const AllTones: Story = {
  render: () =>
    `<ul role="list" style="${stack}">` +
    [Default, NearTheLimit, AtTheLimit, OverTheLimit]
      .map(
        (story, index) => `<li>${meter({ ...meta.args, ...story.args, id: `tone-${index}` })}</li>`,
      )
      .join('') +
    '</ul>',
};

/** On a stat tile's surface, which gives it the padding and the border; the meter adds none. */
export const OnATile: Story = {
  render: () =>
    `<div class="plinth-stat" style="max-inline-size: 20rem">${meter({ ...meta.args, ...NearTheLimit.args, id: 'tile' })}</div>`,
};

/** In right-to-left text: the bar fills from the right. */
export const RightToLeft: Story = {
  render: () =>
    `<div dir="rtl" style="max-inline-size: 32rem">${meter({ ...meta.args, ...NearTheLimit.args, id: 'rtl' })}</div>`,
};
