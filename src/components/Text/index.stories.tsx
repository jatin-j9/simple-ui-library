import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '.';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A typography component for rendering styled text with customizable appearance.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'h1',
    children:
      'be parts correct potatoes sides donkey extra climate happily freedom relationship tape until tall hung call cat window steady world front graph paricular pick',
  },
};
