import type { Meta, StoryObj } from '@storybook/html-vite';
import { controlSizes, buttonVariants } from './button.ts';
import { iconButton, type IconButtonArgs } from './icon-button.ts';
import { iconNames } from './icon.ts';
import { sampleIcons } from './icons.ts';
import '@ptbdynamic/plinth-css/src/components/icon.css';
import '@ptbdynamic/plinth-css/src/components/button.css';

const meta = {
  title: 'Components/Icon button',
  render: (args) => iconButton(args),
  args: {
    label: 'More actions',
    variant: 'ghost',
    size: 'md',
    disabled: false,
    busy: false,
    svg: sampleIcons.more,
  },
  argTypes: {
    icon: { control: 'select', options: [undefined, ...iconNames] },
    variant: { control: 'inline-radio', options: buttonVariants },
    size: { control: 'inline-radio', options: controlSizes },
    href: { control: 'text' },
    pressed: { control: 'boolean' },
    mirror: { control: 'boolean' },
    svg: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A button with only an icon, for toolbars, headers and closing a sheet. It always has a label. Its icon is one of Plinth’s built-in glyphs by `icon` (as the icon’s `name`), or the project’s own SVG in the slot. With `pressed` (true or false) it is a toggle and prints `aria-pressed`; pressed shows the selection tint inside a 2px accent edge. With an `href` it is a link instead, which is never a toggle, so `pressed` is ignored there.',
      },
    },
  },
} satisfies Meta<IconButtonArgs>;

export default meta;
type Story = StoryObj<IconButtonArgs>;

export const Ghost: Story = {};
export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Close', svg: sampleIcons.close },
};
export const Primary: Story = {
  args: { variant: 'primary', label: 'Done', svg: sampleIcons.check },
};
export const DangerGhost: Story = {
  args: { variant: 'danger-ghost', label: 'Remove', svg: sampleIcons.close },
};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Pressed: Story = {
  args: { label: 'Favourite', svg: sampleIcons.star, pressed: true },
};
export const NotPressed: Story = {
  args: { label: 'Favourite', svg: sampleIcons.star, pressed: false },
};
export const Link: Story = {
  args: {
    variant: 'secondary',
    label: 'Next page',
    svg: sampleIcons.arrow,
    href: '#next',
    mirror: true,
  },
};
/** A built-in glyph by name, instead of an SVG in the slot. */
export const WithGlyph: Story = { args: { label: 'Open menu', icon: 'menu' } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledPressed: Story = {
  args: { label: 'Favourite', svg: sampleIcons.star, pressed: true, disabled: true },
};
export const Busy: Story = { args: { variant: 'secondary', busy: true, label: 'Saving' } };

/** Every variant at every size. */
export const Gallery: Story = {
  render: () =>
    `<div style="display: grid; gap: var(--plinth-space-3);">${controlSizes
      .map(
        (size) =>
          `<div style="display: flex; gap: var(--plinth-space-3); align-items: center;">${buttonVariants
            .map((variant) =>
              iconButton({
                label: `${variant} ${size}`,
                variant,
                size,
                disabled: false,
                busy: false,
                svg: sampleIcons.more,
              }),
            )
            .join('')}</div>`,
      )
      .join('')}</div>`,
};
