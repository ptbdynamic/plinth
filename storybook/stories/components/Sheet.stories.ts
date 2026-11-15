import type { Meta, StoryObj } from '@storybook/html-vite';
import { sheetSides, sheetSizes, swipeToClose } from '@ptbdynamic/plinth-vue';
import { badge } from './badge.ts';
import { button } from './button.ts';
import { icon } from './icon.ts';
import { sampleIcons } from './icons.ts';
import { listCard } from './list-card.ts';
import type { ListRowArgs } from './list-row.ts';
import { sheet, type SheetArgs } from './sheet.ts';
import { textField } from './text-field.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/badge.css';
import '@ptbdynamic/plinth-css/src/components/list-row.css';
import '@ptbdynamic/plinth-css/src/components/list-card.css';
import '@ptbdynamic/plinth-css/src/components/text-field.css';
import '@ptbdynamic/plinth-css/src/components/modal.css';
import '@ptbdynamic/plinth-css/src/components/sheet.css';

const action = (label: string, variant: 'primary' | 'secondary' | 'danger', extra = {}) =>
  button({ label, variant, size: 'md', disabled: false, busy: false }, extra);

const row = (title: string, extra: Partial<ListRowArgs> = {}): ListRowArgs => ({
  title,
  chevron: false,
  button: false,
  current: false,
  disabled: false,
  ...extra,
});

const leadingIcon = (svg: string) => icon({ size: 'md', mirror: false, svg });

const filters = listCard({
  heading: 'Show',
  headingLevel: 'h3',
  rows: [
    row('Status', { trailing: badge({ label: 'Open', tone: 'success', dot: true }) }),
    row('Sort by', { trailing: 'Newest first', button: true, chevron: true }),
    row('Starred only', { leading: leadingIcon(sampleIcons.star), button: true }),
  ],
});

const footer = (id: string) =>
  action('Reset', 'secondary') + action('Apply', 'primary', { commandfor: id, command: 'close' });

/** A button that opens the sheet with no script: commandfor and command="show-modal". */
const opener = (args: SheetArgs) =>
  action('Open the sheet', 'secondary', { commandfor: args.id, command: 'show-modal' });

const meta = {
  title: 'Components/Sheet',
  render: (args) => opener(args) + sheet(args),
  // The story opens its sheet, as an app would with showModal(). In the docs page the sheets stay
  // closed until their button is pressed.
  play: ({ canvasElement }) => {
    const dialog = canvasElement.querySelector<HTMLDialogElement>('dialog.plinth-sheet');
    if (!dialog) return;
    // What the layers add: a bottom panel on a phone closes when it is swiped off.
    swipeToClose(dialog);
    dialog.showModal();
  },
  args: {
    id: 'filters',
    title: 'Filters',
    closeLabel: 'Close',
    side: 'end',
    size: 'md',
    body: filters,
    footer: footer('filters'),
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    closeLabel: { control: 'text' },
    side: { control: 'inline-radio', options: [...sheetSides] },
    sidePhone: {
      control: 'inline-radio',
      options: ['none', ...sheetSides],
      mapping: { none: undefined },
    },
    size: { control: 'inline-radio', options: [...sheetSizes] },
    body: { control: false },
    footer: { control: false },
  },
  parameters: {
    // The open dialog takes no room in the page, so the frames at every width get their height.
    everyWidth: { height: 720 },
    docs: {
      description: {
        component:
          'A modal panel on a native dialog, on the edge you pick with `side` (end, start, top or bottom) at every width; `side-phone` picks another edge below 768px, and `size` (md, lg or xl) how wide a start or end sheet is. For a modal centred on the screen, use the dialog.',
      },
    },
  },
} satisfies Meta<SheetArgs>;

export default meta;
type Story = StoryObj<SheetArgs>;

/** On the end edge, the default: the right in left-to-right text. */
export const Default: Story = {};

/** On the start edge: the left in left-to-right text. */
export const Start: Story = {
  args: { id: 'filters-start', side: 'start', footer: footer('filters-start') },
};

/** On the top edge, the screen's width and as tall as its content. */
export const Top: Story = {
  args: { id: 'filters-top', side: 'top', footer: footer('filters-top') },
};

/** On the bottom edge, the screen's width, clearing the home indicator. */
export const Bottom: Story = {
  args: { id: 'filters-bottom', side: 'bottom', footer: footer('filters-bottom') },
};

/** A side panel from 768px up, a bottom sheet on a phone: `side="end" side-phone="bottom"`. */
export const EndBottomOnPhone: Story = {
  args: {
    id: 'filters-end-bottom',
    side: 'end',
    sidePhone: 'bottom',
    footer: footer('filters-end-bottom'),
  },
};

/** On the start edge from 768px up, a bottom sheet on a phone. */
export const StartBottomOnPhone: Story = {
  args: {
    id: 'filters-start-bottom',
    side: 'start',
    sidePhone: 'bottom',
    footer: footer('filters-start-bottom'),
  },
};

/** On the top edge from 768px up, a bottom sheet on a phone, nearer the thumb. */
export const TopBottomOnPhone: Story = {
  args: {
    id: 'filters-top-bottom',
    side: 'top',
    sidePhone: 'bottom',
    footer: footer('filters-top-bottom'),
  },
};

/** On the bottom edge from 768px up, a panel on the start edge on a phone. */
export const BottomStartOnPhone: Story = {
  args: {
    id: 'filters-bottom-start',
    side: 'bottom',
    sidePhone: 'start',
    footer: footer('filters-bottom-start'),
  },
};

/** On the start edge from 768px up, on the end edge on a phone. */
export const StartEndOnPhone: Story = {
  args: {
    id: 'filters-start-end',
    side: 'start',
    sidePhone: 'end',
    footer: footer('filters-start-end'),
  },
};

/** On the bottom edge from 768px up, on the top edge on a phone. */
export const BottomTopOnPhone: Story = {
  args: {
    id: 'filters-bottom-top',
    side: 'bottom',
    sidePhone: 'top',
    footer: footer('filters-bottom-top'),
  },
};

/** A form in two columns where there is room, one on a phone; the grid is the page's layout. */
const clientForm = (id: string) =>
  `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); gap: var(--plinth-space-4);">${[
    ['name', 'Name', 'Harbour Freight'],
    ['email', 'Billing email', 'billing@example.com'],
    ['phone', 'Phone', '+351 210 000 000'],
    ['vat', 'VAT number', 'PT 500 000 000'],
    ['city', 'City', 'Lisbon'],
    ['country', 'Country', 'Portugal'],
  ]
    .map(([field, label, value]) =>
      textField({
        id: `${id}-${field}`,
        label: label!,
        hideLabel: false,
        type: field === 'email' ? 'email' : 'text',
        size: 'md',
        value,
        disabled: false,
        readonly: false,
      }),
    )
    .join('')}</div>`;

const formFooter = (id: string) =>
  action('Cancel', 'secondary', { commandfor: id, command: 'close' }) + action('Save', 'primary');

/** `size="lg"`: 560px wide, at most the screen less the gap. */
export const Large: Story = {
  args: {
    id: 'client-large',
    title: 'Edit client',
    size: 'lg',
    body: clientForm('client-large'),
    footer: formFooter('client-large'),
  },
};

/**
 * `size="xl"`: 720px wide for a form in two columns, at most the screen less the gap, so the
 * backdrop shows on the open side. On a phone it is the screen less the gap, one column.
 */
export const Wide: Story = {
  args: {
    id: 'client-wide',
    title: 'Edit client',
    description: 'Changes apply to every project of this client.',
    size: 'xl',
    body: clientForm('client-wide'),
    footer: formFooter('client-wide'),
  },
};

/** Wide on the start edge. */
export const WideStart: Story = {
  args: {
    id: 'client-wide-start',
    title: 'Edit client',
    side: 'start',
    size: 'xl',
    body: clientForm('client-wide-start'),
    footer: formFooter('client-wide-start'),
  },
};

/** Wide from 768px up, a bottom sheet on a phone: the bottom sheet ignores the size. */
export const WideBottomOnPhone: Story = {
  args: {
    id: 'client-wide-bottom',
    title: 'Edit client',
    sidePhone: 'bottom',
    size: 'xl',
    body: clientForm('client-wide-bottom'),
    footer: formFooter('client-wide-bottom'),
  },
};

/** A top sheet is the screen's width and ignores the size. */
export const WideTop: Story = {
  args: { id: 'filters-top-wide', side: 'top', size: 'xl', footer: footer('filters-top-wide') },
};

export const WithDescription: Story = {
  args: {
    id: 'filters-described',
    description: 'Only the items that match are shown in the list.',
    footer: footer('filters-described'),
  },
};

/** No footer: the rows act on their own, and the close button ends it. */
export const WithoutFooter: Story = {
  args: {
    id: 'account',
    title: 'Account',
    footer: undefined,
    body: listCard({
      headingLevel: 'h3',
      rows: [
        row('Profile', { href: '#profile', chevron: true }),
        row('Language', { trailing: 'English', href: '#language', chevron: true }),
        row('Sign out', { button: true }),
      ],
    }),
  },
};

/** More content than fits: the body scrolls, the header and footer stay put. */
export const LongContent: Story = {
  args: {
    id: 'long',
    title: 'Notifications',
    sidePhone: 'bottom',
    footer: footer('long'),
    // Spacing between the cards is the page's layout, not the sheet's.
    body: `<div style="display: grid; gap: var(--plinth-space-4);">${[1, 2, 3]
      .map((n) =>
        listCard({
          heading: `Group ${n}`,
          headingLevel: 'h3',
          rows: ['Mentions', 'Replies', 'New items', 'Weekly summary'].map((title) =>
            row(title, { trailing: 'On', button: true, chevron: true }),
          ),
        }),
      )
      .join('')}</div>`,
  },
};

export const LongTitle: Story = {
  args: {
    id: 'long-title',
    title: 'A title long enough to wrap onto a second line on a narrow phone screen',
    description:
      'And a description that explains what the sheet is for, written long enough to wrap onto more than one line.',
    footer: footer('long-title'),
  },
};

/**
 * closedby="closerequest" on the root: Escape and the buttons close it, a tap on the backdrop
 * doesn't. For a form with unsaved changes.
 */
export const NoBackdropClose: Story = {
  render: (args) => {
    const strict = {
      ...args,
      id: 'rename',
      title: 'Rename',
      body: '<p>A tap outside the sheet leaves it open.</p>',
      footer:
        action('Cancel', 'secondary', { commandfor: 'rename', command: 'close' }) +
        action('Save', 'primary'),
    };
    return opener(strict) + sheet(strict, { closedby: 'closerequest' });
  },
};

/** Right-to-left text: the end edge is the left, and the close button sits on the left. */
export const RightToLeft: Story = {
  render: (args) => {
    const rtl = { ...args, id: 'filters-rtl', footer: footer('filters-rtl') };
    return `<div dir="rtl">${opener(rtl)}${sheet(rtl)}</div>`;
  },
};

/** Right-to-left text on the start edge: the right. */
export const RightToLeftStart: Story = {
  render: (args) => {
    const rtl = {
      ...args,
      id: 'filters-rtl-start',
      side: 'start' as const,
      footer: footer('filters-rtl-start'),
    };
    return `<div dir="rtl">${opener(rtl)}${sheet(rtl)}</div>`;
  },
};

/** Right-to-left text, on the end edge from 768px up and the start edge on a phone: the right. */
export const RightToLeftStartOnPhone: Story = {
  render: (args) => {
    const rtl = {
      ...args,
      id: 'filters-rtl-phone',
      sidePhone: 'start' as const,
      footer: footer('filters-rtl-phone'),
    };
    return `<div dir="rtl">${opener(rtl)}${sheet(rtl)}</div>`;
  },
};
