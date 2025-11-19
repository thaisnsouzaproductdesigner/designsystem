import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Ícone de exemplo (apenas para o storybook)
const IconMock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button Label',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete Account' },
};

export const WithIcon: Story = {
  args: {
    iconLeft: <IconMock />,
    children: 'Security Check',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Saving...',
  },
};