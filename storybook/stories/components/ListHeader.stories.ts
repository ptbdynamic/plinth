import type { Meta, StoryObj } from '@storybook/html-vite';
import { headingLevels } from '@ptbdynamic/plinth-vue';
import { button } from './button.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { listHeader, type ListHeaderArgs } from './list-header.ts';
import { listRow, type ListRowArgs } from './list-row.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-header.css';

const action = (
  label: string,
  svg: string,
  extra: Partial<Parameters<typeof iconButton>[0]> = {},
) =>
  iconButton({ label, variant: 'ghost', size: 'md', disabled: false, busy: false, svg, ...extra });

/** Select, filter and sort: the list's own actions. Select is a toggle, off. */
const listActions = [
  action('Select', sampleIcons.select, { pressed: false }),
  action('Filter', sampleIcons.filter),
  action('Sort', sampleIcons.sort),
].join('');

/** While selecting: Archive acts on the selection, Done ends it. */
const selectionActions = [
  action('Archive', sampleIcons.archive),
  button({ label: 'Done', variant: 'secondary', size: 'md', disabled: false, busy: false }),
].join('');

const meta = {
  title: 'Components/List Header',
  render: (args) => listHeader(args),
  args: { heading: 'Open', headingLevel: 'h2', count: 12, actions: listActions },
  parameters: {
    docs: {
      description: {
        component:
          "The bar on top of a list: the list's heading and count, then its actions (select, filter, sort). While the app is selecting rows, set `selection` to the app's own words for how many are selected (_2 selected_): it shows in the heading's place, is announced as a status, and the app swaps the actions for the selection's own. The rows under it become selectable list rows. Every icon button needs its own label.",
      },
    },
  },
  argTypes: {
    heading: { control: 'text' },
    headingLevel: { control: 'select', options: headingLevels },
    count: { control: 'text' },
    selection: { control: 'text' },
    actions: { control: false },
  },
} satisfies Meta<ListHeaderArgs>;

export default meta;
type Story = StoryObj<ListHeaderArgs>;

/** A folder's list: its name, how many it holds, and select, filter and sort. */
export const Default: Story = {};

/** Without a count. */
export const WithoutCount: Story = { args: { heading: 'Solved', count: undefined } };

/** A count of 0 still prints. */
export const ZeroCount: Story = { args: { heading: 'Spam', count: 0 } };

/** Without actions: the heading and the count alone. */
export const WithoutActions: Story = { args: { actions: undefined } };

/** The heading as an h3, under another h2 on the page. */
export const HeadingLevel: Story = { args: { headingLevel: 'h3' } };

/** While selecting: how many are selected, and the selection's actions. */
export const Selecting: Story = { args: { selection: '2 selected', actions: selectionActions } };

/** Selecting, before any row is chosen. */
export const NothingSelected: Story = {
  args: { selection: '0 selected', actions: selectionActions },
};

/** A long title is cut with an ellipsis; the count and the actions keep their place. */
export const LongTitle: Story = {
  args: { heading: 'Waiting on a reply from the customer for more than a week', count: 128 },
};

const tickets = [
  ['Cannot export the March report', 'Alex Kim · 10 min'],
  ['Invoice shows the wrong address', 'Jo Park · 1 h'],
  ['Two-factor code never arrives', 'Rui Silva · 3 h'],
  ['Upload stops at 90%', 'Noor Ali · yesterday'],
] as const;

const rows = (extra: (index: number) => Partial<ListRowArgs>) =>
  `<ul role="list" style="margin: 0; padding: 0; list-style: none;">${tickets
    .map(
      ([title, description], index) =>
        `<li>${listRow({
          title,
          description,
          href: `#ticket-${index + 1}`,
          chevron: false,
          button: false,
          current: false,
          disabled: false,
          ...extra(index),
        })}</li>`,
    )
    .join('')}</ul>`;

/** On top of its list: the rows are links to the tickets. */
export const WithList: Story = {
  render: () =>
    `<section>${listHeader({ ...meta.args, count: tickets.length })}${rows(() => ({}))}</section>`,
};

/** Selecting in the list: each row is a checkbox named by its text, and two are selected. */
export const SelectingInList: Story = {
  render: () =>
    `<form>${listHeader({ ...meta.args, selection: '2 selected', actions: selectionActions })}${rows(
      (index) => ({
        selectable: true,
        selected: index < 2,
        name: 'tickets[]',
        value: String(index + 1),
      }),
    )}</form>`,
};
