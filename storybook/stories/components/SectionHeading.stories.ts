import type { Meta, StoryObj } from '@storybook/html-vite';
import { headingLevels } from '@ptbdynamic/plinth-vue';
import { button } from './button.ts';
import { sectionHeading, type SectionHeadingArgs } from './section-heading.ts';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/section-heading.css';

const action = (label: string, variant: 'primary' | 'secondary' | 'danger' = 'secondary') =>
  button({ label, variant, size: 'md', disabled: false, busy: false });

const meta = {
  title: 'Components/Section Heading',
  render: (args) => sectionHeading(args),
  args: {
    heading: 'Connections',
    headingLevel: 'h2',
    description: 'The services this workspace sends data to.',
    divider: false,
    actions: action('Add connection'),
  },
  parameters: {
    docs: {
      description: {
        component:
          "The heading of a part of a page that is not a list (Connections, Budget, Danger zone): a real heading (h2 by default, h2 to h6), an optional line of description and the section's actions, above its content. The actions sit under the text on a phone and on the end edge from 768px. `divider` draws a hairline under it for a settings page's look. To make the section a landmark region, wrap it in a `<section aria-labelledby>` and give the heading the matching `headingId`. Each action needs its own name.",
      },
    },
  },
  argTypes: {
    heading: { control: 'text' },
    headingLevel: { control: 'select', options: headingLevels },
    headingId: { control: 'text' },
    description: { control: 'text' },
    divider: { control: 'boolean' },
    actions: { control: false },
  },
} satisfies Meta<SectionHeadingArgs>;

export default meta;
type Story = StoryObj<SectionHeadingArgs>;

/** A heading, a line of description and one action. */
export const Default: Story = {};

/** The heading alone. */
export const HeadingOnly: Story = {
  args: { heading: 'Budget', description: undefined, actions: undefined },
};

/** A heading and a description, no actions. */
export const WithoutActions: Story = { args: { actions: undefined } };

/** A heading and an action, no description. */
export const WithoutDescription: Story = { args: { description: undefined } };

/** Two actions. */
export const TwoActions: Story = {
  args: { actions: [action('Import'), action('Add connection', 'primary')].join('') },
};

/** With a hairline under it, for a settings page. */
export const Divider: Story = { args: { divider: true } };

/** The heading as an h3, under another h2 on the page. */
export const HeadingLevel: Story = { args: { headingLevel: 'h3' } };

/** A long heading and description wrap; the action keeps its width. */
export const LongText: Story = {
  args: {
    heading: 'Connections to services outside this workspace that receive its reports',
    description:
      'Every connection receives the reports it is allowed to read, as soon as they are ready, and keeps them for as long as its own settings say.',
  },
};

const paragraph = (text: string) =>
  `<p style="margin: 0; font-family: var(--plinth-font-family-body); font-size: var(--plinth-font-size-md); color: var(--plinth-color-text-muted);">${text}</p>`;

/** Sections on a settings page, each a region named by its heading, stacked evenly. */
export const Sections: Story = {
  render: () =>
    [
      `<section aria-labelledby="connections-heading">${sectionHeading({
        ...meta.args,
        headingId: 'connections-heading',
        divider: true,
      })}${paragraph('Two connections.')}</section>`,
      `<section aria-labelledby="budget-heading">${sectionHeading({
        heading: 'Budget',
        headingId: 'budget-heading',
        description: 'Runs pause when the spend reaches the cap.',
        divider: true,
      })}${paragraph('No cap set.')}</section>`,
      `<section aria-labelledby="danger-heading">${sectionHeading({
        heading: 'Danger zone',
        headingId: 'danger-heading',
        description: 'Deleting the workspace removes its data for good.',
        divider: true,
        actions: action('Delete workspace', 'danger'),
      })}${paragraph('This cannot be undone.')}</section>`,
    ].join(''),
};
