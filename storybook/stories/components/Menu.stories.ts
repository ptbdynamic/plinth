import type { Meta, StoryObj } from '@storybook/html-vite';
import { menu, type MenuArgs } from './menu.ts';
import '@ptbdynamic/plinth-css/src/components/menu.css';

const meta = {
  title: 'Components/Menu',
  render: (args) => menu(args),
  args: { label: 'Content' },
  parameters: {
    docs: {
      description: {
        component: 'TODO what it is, when to use it, and what a user must know.',
      },
    },
  },
} satisfies Meta<MenuArgs>;

export default meta;
type Story = StoryObj<MenuArgs>;

export const Default: Story = {};
