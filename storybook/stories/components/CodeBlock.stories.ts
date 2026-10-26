import type { Decorator, Meta, StoryObj } from '@storybook/html-vite';
import { badge } from './badge.ts';
import { codeBlock, type CodeBlockArgs, type CodeBlockTab } from './code-block.ts';
import '@ptbdynamic/plinth-css/src/components/badge.css';
import '@ptbdynamic/plinth-css/src/components/button.css';
import '@ptbdynamic/plinth-css/src/components/code-block.css';

/**
 * What the Blade (Alpine), Vue and React layers add: the copy and download buttons show, and copy
 * or save the code that shows. A demonstration for the stories; the plain HTML works without it,
 * and no Plinth script ships (ADR 2).
 */
/** The code of the checked tab's <pre>, or of the only one. */
const codeBlockText = (button: Element) => {
  const block = button.closest('.plinth-code-block')!;
  const inputs = [...block.querySelectorAll<HTMLInputElement>('.plinth-code-block-tab-input')];
  const index = Math.max(
    0,
    inputs.findIndex((input) => input.checked),
  );
  return block.querySelectorAll('.plinth-code-block-code')[index]?.textContent ?? '';
};

/** Says `done` on the button and in its status for two seconds, then `idle` again. */
const timers = new WeakMap<Element, ReturnType<typeof setTimeout>>();
const say = (button: HTMLButtonElement, done: string, idle: string) => {
  const label = button.querySelector('.plinth-button-label')!;
  const status = button.nextElementSibling!;
  label.textContent = done;
  status.textContent = done;
  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      label.textContent = idle;
      status.textContent = '';
    }, 2000),
  );
};

const withActions: Decorator = (story, { args }) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = story() as string;
  wrapper.querySelectorAll<HTMLButtonElement>('.plinth-code-block-copy').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      void navigator.clipboard
        ?.writeText(codeBlockText(button))
        .then(() => say(button, args.copiedLabel as string, args.copyLabel as string));
    });
  });
  wrapper.querySelectorAll<HTMLButtonElement>('.plinth-code-block-download').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([codeBlockText(button)], { type: 'text/plain' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = (args.download as string).trim();
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 40_000);
      say(button, args.downloadedLabel as string, args.downloadLabel as string);
    });
  });
  return wrapper;
};

const brand = `/* After Plinth's CSS: each colour for light and dark. */
:root {
  --plinth-color-accent: light-dark(#0f766e, #2dd4bf);
  --plinth-color-accent-hover: light-dark(#115e59, #5eead4);
  --plinth-color-on-accent: light-dark(#fff, #042f2e);
  --plinth-radius-pill: 0.25rem;
}`;

const layerTabs: CodeBlockTab[] = [
  {
    label: 'Blade',
    code: `<x-plinth::button variant="secondary" size="sm">
  New invoice
</x-plinth::button>`,
  },
  {
    label: 'Vue',
    code: `<PlinthButton variant="secondary" size="sm">
  New invoice
</PlinthButton>`,
  },
  {
    label: 'React',
    code: `<PlinthButton variant="secondary" size="sm">
  New invoice
</PlinthButton>`,
  },
  {
    label: 'HTML',
    code: `<button type="button" class="plinth-button"
  data-variant="secondary" data-size="sm">
  <span class="plinth-button-label">New invoice</span>
</button>`,
  },
];

/** A highlighter's output: spans coloured by the highlighter, here with Plinth's text colours. */
const highlighted = [
  '<span style="color: var(--plinth-color-accent-text)">INVOICES_API_URL</span>=<span style="color: var(--plinth-color-success-text)">https://api.example.com/v1</span>',
  '<span style="color: var(--plinth-color-accent-text)">INVOICES_API_KEY</span>=<span style="color: var(--plinth-color-success-text)">sk_test_4f9a2c7e1b</span>',
  '<span style="color: var(--plinth-color-text-muted)"># Keep the key out of version control.</span>',
].join('\n');

const meta = {
  title: 'Components/Code Block',
  render: (args) => codeBlock(args),
  decorators: [withActions],
  args: {
    label: 'resources/css/brand.css',
    code: brand,
    tabsLabel: 'Language',
    copy: true,
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    downloadLabel: 'Download',
    downloadedLabel: 'Downloaded',
  },
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    labelHtml: { control: false },
    code: { control: 'text' },
    html: { control: false },
    tabs: { control: false },
    selected: { control: 'inline-radio', options: layerTabs.map((tab) => tab.label) },
    tabsLabel: { control: 'text' },
    copy: { control: 'boolean' },
    copyLabel: { control: 'text' },
    copiedLabel: { control: 'text' },
    download: { control: 'text' },
    downloadLabel: { control: 'text' },
    downloadedLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A block of code with an optional file name or label, a copy button, an optional download button and optional language tabs (Blade, Vue, React, HTML). Use it for install commands, configuration, API keys, recovery codes and examples. The code keeps its lines and scrolls sideways inside its own box on a phone. Highlighting is the project’s: pass the highlighter’s markup and the block styles what it is given. The copy and download buttons need the Blade (Alpine), Vue or React layer; the plain HTML shows the code without them.',
      },
    },
  },
} satisfies Meta<CodeBlockArgs>;

export default meta;
type Story = StoryObj<CodeBlockArgs>;

/** A file name, the code and the copy button. */
export const Default: Story = {};

/** No label: the header holds only the copy button. */
export const WithoutLabel: Story = {
  args: { label: undefined, code: 'composer require ptbdynamic/plinth' },
};

/** Language tabs: the radio buttons pick the code that shows, with no script. */
export const Tabs: Story = {
  args: { id: 'new-invoice', label: undefined, tabs: layerTabs },
};

/** Tabs after a label, with another tab checked to start with. */
export const TabsWithLabel: Story = {
  args: { id: 'new-invoice-labelled', label: 'New invoice', tabs: layerTabs, selected: 'React' },
};

/** Code from a highlighter: the block keeps the highlighter's colours. */
export const Highlighted: Story = {
  args: { label: '.env', html: highlighted },
};

/** A long line scrolls sideways inside the block, never the page. */
export const LongLine: Story = {
  args: {
    label: 'Terminal',
    code: 'curl -H "Authorization: Bearer sk_test_4f9a2c7e1b" "https://api.example.com/v1/invoices?status=overdue&client=atlas-studio&per_page=50"',
  },
};

/** A long file name is cut short with an ellipsis. */
export const LongLabel: Story = {
  args: {
    label: 'resources/views/components/invoices/partials/summary-with-totals.blade.php',
    code: '<x-plinth::badge tone="success">Paid</x-plinth::badge>',
  },
};

const recoveryCodes = [
  'k7q2-9xmf',
  'p4wd-h3ra',
  'z8nc-2tle',
  'b6yv-m5ks',
  'r3gj-x9pu',
  'f2hn-7cwq',
  'u9tb-4dze',
  'e5ma-k8yr',
].join('\n');

/** A download next to Copy: the code is saved as a text file, here recovery codes. */
export const WithDownload: Story = {
  args: { label: 'Recovery codes', code: recoveryCodes, download: 'recovery-codes.txt' },
};

/** Download only: with copy off, the download button takes the copy button's place. */
export const DownloadWithoutCopy: Story = {
  args: {
    label: 'Recovery codes',
    code: recoveryCodes,
    copy: false,
    download: 'recovery-codes.txt',
  },
};

/** With tabs, the download saves the code of the checked tab. */
export const DownloadWithTabs: Story = {
  args: {
    id: 'new-invoice-download',
    label: undefined,
    tabs: layerTabs,
    download: 'new-invoice.txt',
  },
};

/** No copy button, for code that is only read. */
export const WithoutCopy: Story = {
  args: { copy: false },
};

/** Neither a label nor a copy button: no header at all. */
export const CodeOnly: Story = {
  args: { label: undefined, copy: false, code: 'npm install @ptbdynamic/plinth' },
};

/** A label with a little markup, here a badge (label slot in Blade and Vue, a node in React). */
export const LabelWithBadge: Story = {
  args: {
    labelHtml: `HTML, from all three ${badge({ label: 'Parity', tone: 'success', dot: true })}`,
    code: layerTabs[3]!.code,
  },
};
