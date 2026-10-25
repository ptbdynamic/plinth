import type { Meta, StoryObj } from '@storybook/html-vite';
import { icon, iconNames, iconSizes, type IconArgs } from './icon.ts';
import { sampleIcons } from './icons.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';

const meta = {
  title: 'Components/Icon',
  render: (args) => icon(args),
  args: { size: 'md', mirror: false, svg: sampleIcons.check },
  argTypes: {
    name: { control: 'select', options: [undefined, ...iconNames] },
    size: { control: 'inline-radio', options: iconSizes },
    label: { control: 'text' },
    mirror: { control: 'boolean' },
    svg: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An SVG sized by Plinth (16, 20 or 24 px) and coloured by the text around it: one of Plinth’s built-in interface glyphs by `name` (menu, close, chevrons, back, check, plus, search, more, external, sign out, sun, moon, system, info, warning), or the project’s own SVG in the slot, inline or as a sprite `<use>`, drawn with `currentColor`. The built-in set is small on purpose; brand and domain icons stay in the app. An icon is decorative and hidden from screen readers unless it has a `label` (or an `aria-label`); give it one only when the icon carries meaning that nothing next to it says. Set `mirror` on icons that point a direction (arrows, chevrons, back, send), so they flip in right-to-left text; it changes nothing in left-to-right text. The built-in glyphs that point a direction (back, the side chevrons, sign out) flip without it. Switch **Direction** in the toolbar to see it.',
      },
    },
  },
} satisfies Meta<IconArgs>;

export default meta;
type Story = StoryObj<IconArgs>;

/**
 * Fails when the icon's glyph isn't flipped, as when a build rewrites :dir(rtl) into :lang()
 * selectors that a bare dir="rtl" doesn't match (#151).
 */
const expectFlipped: Story['play'] = ({ canvasElement }) => {
  const svg = canvasElement.querySelector('.plinth-icon > svg');
  const transform = svg ? getComputedStyle(svg).transform : 'no svg';
  if (transform !== 'matrix(-1, 0, 0, 1, 0, 0)') {
    throw new Error(`The icon isn't flipped right to left: transform is ${transform}`);
  }
};

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Labelled: Story = { args: { svg: sampleIcons.alert, label: 'Warning' } };
export const Filled: Story = { args: { svg: sampleIcons.star } };
/** Rendered right to left, where the mirrored arrow points the other way. */
export const Mirrored: Story = {
  args: { svg: sampleIcons.arrow, mirror: true },
  decorators: [(story) => `<div dir="rtl">${story() as string}</div>`],
  play: expectFlipped,
};

/** A built-in glyph by name, instead of an SVG in the slot. */
export const Glyph: Story = { args: { name: 'menu' } };
/** A built-in glyph that points a direction flips in right-to-left text on its own. */
export const DirectionalGlyph: Story = {
  args: { name: 'back' },
  decorators: [(story) => `<div dir="rtl">${story() as string}</div>`],
  play: expectFlipped,
};

/** Every built-in glyph, with its name. */
export const Glyphs: Story = {
  render: () =>
    `<ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr)); gap: var(--plinth-space-4); padding: 0; margin: 0; list-style: none;">${iconNames
      .map(
        (name) =>
          `<li style="display: flex; gap: var(--plinth-space-2); align-items: center;">${icon({ name, size: 'md', mirror: false })}<code>${name}</code></li>`,
      )
      .join('')}</ul>`,
};

/** Every size, and the icon taking its colour from the text around it. */
export const Gallery: Story = {
  render: () =>
    `<div style="display: grid; gap: var(--plinth-space-4);">
      <div style="display: flex; gap: var(--plinth-space-4); align-items: center;">${iconSizes
        .map((size) => icon({ size, mirror: false, svg: sampleIcons.check }))
        .join('')}</div>
      <p style="margin: 0; color: var(--plinth-color-accent-text);">${icon({ size: 'sm', mirror: false, svg: sampleIcons.star })} Text and icon share a colour</p>
      <p dir="rtl" lang="ar" style="margin: 0;">${icon({ size: 'md', mirror: true, svg: sampleIcons.arrow })} النص من اليمين إلى اليسار</p>
    </div>`,
};
