import type { Meta, StoryObj } from '@storybook/html-vite';
import { appBar, appBarSearch, type AppBarArgs } from './app-bar.ts';
import { sampleAccount, sampleActions, sampleSearch } from './inbox.ts';
import { iconButton } from './icon-button.ts';
import { sampleIcons } from './icons.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/avatar.css';
import '@ptbdynamic/plinth-css/src/components/app-bar.css';

const help = iconButton({
  label: 'Help',
  variant: 'ghost',
  size: 'md',
  disabled: false,
  busy: false,
  svg: sampleIcons.help,
});

const meta = {
  title: 'Components/App Bar',
  render: (args) => appBar(args),
  args: { search: sampleSearch, actions: sampleActions + help, account: sampleAccount },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The bar at the top of an app, beside the app nav, from 768px: a search button that opens the app's search, then the actions and the account. On a phone it is hidden, and the page header is the top bar. The search button opens a dialog with `commandfor`, or the app's own handler; the app listens for its shortcut and names the keys in `aria-keyshortcuts`. Name every icon button with its `label`.",
      },
    },
  },
} satisfies Meta<AppBarArgs>;

export default meta;
type Story = StoryObj<AppBarArgs>;

/** The search, Notifications and Help, then the account on the end edge. */
export const Default: Story = {};

/** The search with its own label and the other platform's hint. */
export const SearchLabel: Story = {
  args: {
    search: appBarSearch(
      { label: 'Search tickets and people', shortcut: 'Ctrl K' },
      { 'aria-keyshortcuts': 'Control+K' },
    ),
  },
};

/** No shortcut: the search button alone. */
export const WithoutShortcut: Story = {
  args: { search: appBarSearch({ label: 'Search' }) },
};

/** Without the search: the actions and the account keep to the end edge. */
export const WithoutSearch: Story = { args: { search: undefined } };

/** Only the account. */
export const AccountOnly: Story = { args: { search: undefined, actions: undefined } };

/** In right-to-left text the search is on the right and the account on the left. */
export const RightToLeft: Story = {
  render: (args) => `<div dir="rtl">${appBar(args)}</div>`,
};
