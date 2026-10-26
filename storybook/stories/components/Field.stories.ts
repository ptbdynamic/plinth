import type { Meta, StoryObj } from '@storybook/html-vite';
import { field, fieldControl, type FieldArgs } from './field.ts';
import { pillRow } from './pill-row.ts';
import { escape } from './markup.ts';
import '@ptbdynamic/plinth-css/src/components/field.css';
import '@ptbdynamic/plinth-css/src/components/pill-row.css';

/*
 * Plinth has no select yet, so the stories style a native one here, with tokens only. It stands
 * for any control the app brings; it is not part of the field's contract.
 */
const storySelect = `<style>
.story-select {
  box-sizing: border-box;
  min-block-size: var(--plinth-control-md);
  padding-inline: var(--plinth-space-3);
  font: inherit;
  font-size: var(--plinth-font-size-field);
  color: var(--plinth-color-text);
  background-color: var(--plinth-color-surface-sunken);
  border: var(--plinth-border-width-thin) solid var(--plinth-color-border-strong);
  border-radius: var(--plinth-radius-control);
}
.story-select[aria-invalid='true'] {
  border-color: var(--plinth-color-danger);
  border-width: var(--plinth-border-width-thick);
}
.story-select:focus-visible {
  outline: var(--plinth-focus-ring-width) solid var(--plinth-color-focus-ring);
  outline-offset: var(--plinth-focus-ring-offset);
}
@media (pointer: coarse) {
  .story-select { min-block-size: var(--plinth-touch-target); }
}
</style>`;

/** A native select, with the ids the field gives it. */
function select(args: Pick<FieldArgs, 'id' | 'description' | 'error' | 'required'>): string {
  const { id, describedBy, invalid } = fieldControl(args.id, false, args.description, args.error);
  return [
    `<select class="story-select" id="${escape(id)}"`,
    args.required ? ' required' : '',
    describedBy ? ` aria-describedby="${escape(describedBy)}"` : '',
    invalid ? ' aria-invalid="true"' : '',
    '><option value="">Choose a team</option><option>Billing</option><option>Support</option></select>',
  ].join('');
}

/** The pills a group holds: a status filter. */
const statusPills = (selected: string[]) =>
  pillRow({
    nav: false,
    pills: ['Open', 'Pending', 'Closed'].map((label) => ({
      label,
      selected: selected.includes(label),
      disabled: false,
    })),
  });

const meta = {
  title: 'Components/Field',
  render: (args) => field(args),
  decorators: [(story) => `${storySelect}${story()}`],
  args: {
    id: 'team',
    label: 'Team',
    hideLabel: false,
    group: false,
    required: false,
    control: select({ id: 'team' }),
  },
  argTypes: {
    hideLabel: { control: 'boolean' },
    group: { control: 'boolean' },
    required: { control: 'boolean' },
    description: { control: 'text' },
    error: { control: 'text' },
    control: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A label, an optional description and an error around a control the app brings: a select, a switch, or a group of pills, radios or checkboxes. With one control, the label points at the control's id, and the control sets aria-describedby and aria-invalid from the ids the field gives it (Vue's slot props, React's children function, Blade's Field::describedBy()). A group is a fieldset with a legend, described by the field's description and error, and `disabled` on it disables every control inside. The required mark is hidden from screen readers: the control says it is required itself. The text field and the textarea print the same parts for their own input.",
      },
    },
  },
} satisfies Meta<FieldArgs>;

export default meta;
type Story = StoryObj<FieldArgs>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: {
    description: 'The team answers new tickets first.',
    control: select({ id: 'team', description: 'The team answers new tickets first.' }),
  },
};
export const WithError: Story = {
  args: {
    description: 'The team answers new tickets first.',
    error: 'Pick a team.',
    control: select({
      id: 'team',
      description: 'The team answers new tickets first.',
      error: 'Pick a team.',
    }),
  },
};
export const Required: Story = {
  args: { required: true, control: select({ id: 'team', required: true }) },
};
export const HiddenLabel: Story = {
  args: { hideLabel: true, control: select({ id: 'team' }) },
};
export const Group: Story = {
  args: {
    id: 'status',
    label: 'Status',
    group: true,
    description: 'Show tickets in these states.',
    control: statusPills(['Open']),
  },
};
export const GroupWithError: Story = {
  args: {
    id: 'status',
    label: 'Status',
    group: true,
    required: true,
    description: 'Show tickets in these states.',
    error: 'Pick at least one status.',
    control: statusPills([]),
  },
};

/** `disabled` on the fieldset disables every pill in it, natively. */
export const DisabledGroup: Story = {
  render: () =>
    field(
      {
        id: 'status-disabled',
        label: 'Status',
        hideLabel: false,
        group: true,
        required: false,
        description: 'Filters are off while the export runs.',
        control: statusPills(['Open']),
      },
      { disabled: '' },
    ),
};
