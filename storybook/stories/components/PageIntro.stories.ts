import type { Meta, StoryObj } from '@storybook/html-vite';
import { pageHeaderLevels } from '@ptbdynamic/plinth-vue';
import { button } from './button.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import { pageHeader } from './page-header.ts';
import { pageIntro, type PageIntroArgs } from './page-intro.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/page-header.css';
import '@ptbdynamic/plinth-css/src/components/page-intro.css';

const action = (label: string, variant: 'primary' | 'secondary' = 'primary') =>
  button({ label, variant, size: 'md', disabled: false, busy: false });

const meta = {
  title: 'Components/Page Intro',
  render: (args) => pageIntro(args),
  args: {
    heading: 'Users',
    level: 'h1',
    description: 'Manage who can sign in and what they can do.',
    wideOnly: false,
    actions: action('Invite user'),
  },
  // The page intro spans the page and brings the page's inline padding, as it does in an app.
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The page's heading in the content, larger than the page header's and with no bar around it: an `h1` (or `h2` to `h6` with `level`), an optional line of description and the page's primary action on the end side. It opens a list or settings page and scrolls with it; the actions move under the text on a phone and in a narrow row. Pair it with a page header: set `narrowOnly` on the page header and `wideOnly` on the page intro, and the phone keeps the page header as its top bar while from 768px the page opens with the intro. The one not shown is `display: none`, so the page has one `h1` at every width. Give the description an id (`descriptionId`) to point at it with `aria-describedby`. Each action needs its own name.",
      },
    },
  },
  argTypes: {
    heading: { control: 'text' },
    level: { control: 'select', options: pageHeaderLevels },
    description: { control: 'text' },
    descriptionId: { control: 'text' },
    wideOnly: { control: 'boolean' },
    actions: { control: false },
  },
} satisfies Meta<PageIntroArgs>;

export default meta;
type Story = StoryObj<PageIntroArgs>;

/** A heading, a line of description and the page's primary action. */
export const Default: Story = {};

/** The heading alone. */
export const HeadingOnly: Story = {
  args: { heading: 'Settings', description: undefined, actions: undefined },
};

/** A heading and a description, no actions. */
export const WithoutActions: Story = { args: { actions: undefined } };

/** A heading and an action, no description. */
export const WithoutDescription: Story = { args: { description: undefined } };

/** Two actions: a secondary one before the primary. */
export const TwoActions: Story = {
  args: { actions: [action('Export', 'secondary'), action('Invite user')].join('') },
};

/** The description with an id, for an `aria-describedby` on the page's main. */
export const DescriptionId: Story = { args: { descriptionId: 'users-description' } };

/** An `h2`, for a page beside another page's `h1`: it looks the same. */
export const LevelTwo: Story = { args: { level: 'h2' } };

/** A long heading and description wrap; the action keeps its width and moves under the text
 * when the row is narrow. */
export const LongText: Story = {
  args: {
    heading: 'People who can sign in to this workspace and the teams they belong to',
    description:
      'Invite someone by email, choose what they can see and change, and remove them when they leave. Changes apply the next time they sign in.',
  },
};

/** Shown from 768px only (`wideOnly`); on a phone it is not shown. Widen the viewport to see it. */
export const WideOnly: Story = { args: { wideOnly: true } };

const invite = iconButton({
  label: 'Invite user',
  variant: 'ghost',
  size: 'md',
  disabled: false,
  busy: false,
  svg: sampleIcons.user,
});

/** The page's content, at the page's inline padding (the page intro's). */
const content = (text: string) =>
  `<style>.story-page-content { margin: 0; padding: var(--plinth-space-4); font-family: var(--plinth-font-family-body); font-size: var(--plinth-font-size-md); color: var(--plinth-color-text-muted); } @media (min-width: 768px) { .story-page-content { padding: 0 var(--plinth-space-6); } }</style>` +
  `<p class="story-page-content">${text}</p>`;

/** Paired with a page header: on a phone the page header (`narrowOnly`) is the top bar, with the
 * action as an icon button; from 768px the page opens with the intro (`wideOnly`). One `h1` shows
 * at every width. */
export const WithAPageHeader: Story = {
  render: () =>
    `<main>${pageHeader({
      heading: 'Users',
      level: 'h1',
      top: true,
      narrowOnly: true,
      actions: invite,
    })}${pageIntro({ ...meta.args, wideOnly: true })}${content('Twelve people can sign in.')}</main>`,
};

/** The same page intro in right-to-left text: the actions sit on the left. */
export const RightToLeft: Story = {
  render: () => `<div dir="rtl">${pageIntro(meta.args)}</div>`,
};
