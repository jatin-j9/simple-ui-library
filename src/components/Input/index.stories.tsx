import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A text field that lets users enter and edit information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Insert text here',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Number',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
    placeholder: 'Date',
  },
};
