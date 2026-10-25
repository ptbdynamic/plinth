import type { Meta, StoryObj } from '@storybook/html-vite';
import { button } from './button.ts';
import { dataTableHead, dataTableShell, type DataTableColumnArgs } from './data-table.ts';
import { emptyState, headingLevels, type EmptyStateArgs } from './empty-state.ts';
import { sampleIcons } from './icons.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/data-table.css';
import '@ptbdynamic/plinth-css/src/components/empty-state.css';

const icon = (svg: string) =>
  `<span class="plinth-icon" data-size="md" aria-hidden="true">${svg}</span>`;

const action = (label: string, variant: 'primary' | 'secondary' | 'ghost' = 'primary', href = '') =>
  button({
    label,
    variant,
    size: 'md',
    disabled: false,
    busy: false,
    ...(href ? { href } : {}),
  });

const meta = {
  title: 'Components/Empty state',
  render: (args) => emptyState(args),
  args: {
    heading: 'No runs yet',
    headingLevel: 'h2',
    description: 'Runs show here once a workflow starts.',
    framed: false,
    icon: icon(sampleIcons.inbox),
    actions: action('Start a run', 'primary', '#new-run'),
  },
  argTypes: {
    headingLevel: { control: 'inline-radio', options: headingLevels },
    description: { control: 'text' },
    icon: { control: false },
    actions: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A calm, centred message for a screen or a section with nothing to show yet, such as "No runs yet", often with one action. ' +
          'It has a heading (what is empty, in plain words), and optionally a decorative icon, a description (why it is empty, or what fills it) and the actions, usually one button or link. ' +
          'Plain by default, for inside a card or a panel that has its own surface; `framed` gives it a raised surface of its own, for a page section with nothing around it. ' +
          'The app decides when to show it. When it replaces results as the user types, such as a search with no match, add `role="status"` so screen readers announce it. ' +
          'Use it for nothing to show, not for an error or a warning: those are a callout.',
      },
    },
  },
} satisfies Meta<EmptyStateArgs>;

export default meta;
type Story = StoryObj<EmptyStateArgs>;

export const Default: Story = {};

export const HeadingOnly: Story = {
  args: {
    heading: 'Nothing is waiting on you',
    description: undefined,
    icon: undefined,
    actions: undefined,
  },
};

export const WithoutIcon: Story = { args: { icon: undefined } };

export const WithoutAction: Story = {
  args: {
    heading: 'Nothing is waiting on you',
    description: 'Requests that need your approval show here.',
    icon: icon(sampleIcons.check),
    actions: undefined,
  },
};

export const Framed: Story = { args: { framed: true } };

export const TwoActions: Story = {
  args: {
    heading: 'No results for "invoice 2024"',
    description: 'Check the spelling, or search all folders.',
    icon: icon(sampleIcons.search),
    actions: action('Search all folders', 'secondary') + action('Clear search', 'ghost'),
  },
};

export const HeadingLevel: Story = {
  args: { heading: 'No archived projects', headingLevel: 'h3', icon: icon(sampleIcons.archive) },
};

export const LongText: Story = {
  args: {
    framed: true,
    heading:
      'No documents are waiting for a second signature from anyone in the finance team this quarter',
    description:
      'Documents uploaded after the end of the previous quarter that need a second signature show here, newest first, with the person who uploaded them.',
  },
};

const columns: DataTableColumnArgs[] = ['Order', 'Customer', 'Total'].map((label) => ({
  label,
  numeric: label === 'Total',
  hideOnPhone: false,
}));

/** In a data table's empty cell: the cell's padding is the empty state's, so both look alike. */
export const InADataTable: Story = {
  render: (args) =>
    dataTableShell(
      'Orders',
      dataTableHead(columns),
      '<tr class="plinth-data-table-empty" role="row"><td class="plinth-data-table-empty-cell" role="cell" colspan="3">' +
        emptyState({
          ...args,
          heading: 'No orders yet',
          headingLevel: 'h3',
          description: 'Orders show here once a customer checks out.',
          icon: icon(sampleIcons.inbox),
          actions: undefined,
        }) +
        '</td></tr>',
    ),
};

/** Plain, inside a section of the page that has its own surface and heading. */
export const InACard: Story = {
  render: (args) =>
    '<section aria-labelledby="card-heading" style="background: var(--plinth-color-surface-raised); border: var(--plinth-border-width-thin) solid var(--plinth-color-border); border-radius: var(--plinth-radius-container);">' +
    '<h2 id="card-heading" style="margin: 0; padding: var(--plinth-space-4); font-size: var(--plinth-font-size-md); border-block-end: var(--plinth-border-width-thin) solid var(--plinth-color-divider);">Recent runs</h2>' +
    emptyState({ ...args, headingLevel: 'h3', framed: false }) +
    '</section>',
};

/** The same empty state in right-to-left text. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${emptyState({ ...args, framed: true })}</div>`,
};
