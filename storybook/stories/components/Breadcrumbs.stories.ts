import type { Meta, StoryObj } from '@storybook/html-vite';
import { appBar } from './app-bar.ts';
import {
  breadcrumbs,
  breadcrumbsCollapses,
  type BreadcrumbsArgs,
  type BreadcrumbsEntry,
  type BreadcrumbsItemArgs,
} from './breadcrumbs.ts';
import { sampleAccount, sampleActions, sampleSearch } from './inbox.ts';
import { menu } from './menu.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/avatar.css';
import '@ptbdynamic/plinth-css/src/components/menu.css';
import '@ptbdynamic/plinth-css/src/components/app-bar.css';
import '@ptbdynamic/plinth-css/src/components/breadcrumbs.css';

const item = (label: string, href?: string, current = false): BreadcrumbsItemArgs => ({
  label,
  href,
  current,
});

const trail: BreadcrumbsEntry[] = [
  item('Settings', '#settings'),
  item('Users & roles', '#access'),
  item('Users', undefined, true),
];

const meta = {
  title: 'Components/Breadcrumbs',
  render: (args) => breadcrumbs(args),
  args: { label: 'Breadcrumb', collapse: 'none', entries: trail },
  argTypes: { collapse: { control: 'inline-radio', options: [...breadcrumbsCollapses] } },
  parameters: {
    docs: {
      description: {
        component:
          'Where a deep page sits, and a way back up. A `<nav>` named "Breadcrumb" around an ordered list, from the top of the app down to the current page, which is last, with `aria-current="page"` and no link. Put it above the page\'s title, or in the app bar\'s start before the search. The separators are drawn in CSS and never read. A long trail can put its middle pages in a menu behind a more button (the app picks which and gives the menu an id), or, on a phone, show only the parent as a back link with `collapse="parent"`.',
      },
    },
  },
} satisfies Meta<BreadcrumbsArgs>;

export default meta;
type Story = StoryObj<BreadcrumbsArgs>;

/** Two pages up, then the current page. */
export const Default: Story = {};

/** The middle pages in a menu behind the more button; the app decides which go there. */
export const WithMore: Story = {
  args: {
    entries: [
      item('Workspace', '#workspace'),
      {
        more: true,
        menu: 'trail-more',
        label: 'More pages',
        content: menu({
          id: 'trail-more',
          entries: [
            { label: 'Settings', href: '#settings', tone: 'neutral', disabled: false },
            { label: 'Users & roles', href: '#access', tone: 'neutral', disabled: false },
          ],
        }),
      },
      item('Users', '#users'),
      item('Alex Morgan', undefined, true),
    ],
  },
};

/** On a phone, only the parent shows, as a back link; from 768px the full trail. */
export const CollapseToParent: Story = { args: { collapse: 'parent' } };

/** A trail of one: the top page itself. */
export const CurrentOnly: Story = { args: { entries: [item('Settings', undefined, true)] } };

/** Long labels in a narrow space are cut with an ellipsis rather than wrapped. */
export const LongLabels: Story = {
  args: {
    entries: [
      item('Organisation settings', '#organisation'),
      item('Integrations and connected applications', '#integrations'),
      item('Single sign-on with an identity provider', undefined, true),
    ],
  },
};

/** In right-to-left text the trail runs from the right, and the separators mirror. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${breadcrumbs(args)}</div>`,
};

/** In right-to-left text, the back link's chevron mirrors too. */
export const RightToLeftParent: Story = {
  render: (args) => `<div dir="rtl">${breadcrumbs({ ...args, collapse: 'parent' })}</div>`,
};

/** In the app bar's start, before the search, from 768px; the bar is not shown on a phone. */
export const InTheAppBar: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) =>
    appBar({
      search: breadcrumbs(args) + sampleSearch,
      actions: sampleActions,
      account: sampleAccount,
    }),
};
