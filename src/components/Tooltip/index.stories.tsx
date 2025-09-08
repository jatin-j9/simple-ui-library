import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './index';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A small, contextual popup that appears on hover or focus to provide extra information about an element.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to display in the tooltip',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger element',
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the tooltip arrow',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
    delay: 500,
    disabled: false,
    showArrow: true,
  },
  render: (args) => (
    <div className='p-8'>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-8 p-16'>
      <Tooltip content='Tooltip on top' placement='top'>
        <Button>Top</Button>
      </Tooltip>

      <Tooltip content='Tooltip on bottom' placement='bottom'>
        <Button>Bottom</Button>
      </Tooltip>

      <Tooltip content='Tooltip on left' placement='left'>
        <Button>Left</Button>
      </Tooltip>

      <Tooltip content='Tooltip on right' placement='right'>
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips can be positioned in four directions: top, bottom, left, and right.',
      },
    },
  },
};

export const WithoutArrow: Story = {
  args: {
    content: 'Tooltip without arrow',
    showArrow: false,
  },
  render: (args) => (
    <div className='p-8'>
      <Tooltip {...args}>
        <Button>No arrow</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div className='flex gap-4 p-8'>
      <Tooltip content='Fast tooltip (100ms)' delay={100}>
        <Button size='sm'>Fast</Button>
      </Tooltip>

      <Tooltip content='Normal tooltip (500ms)' delay={500}>
        <Button size='sm'>Normal</Button>
      </Tooltip>

      <Tooltip content='Slow tooltip (1000ms)' delay={1000}>
        <Button size='sm'>Slow</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'You can customize the delay before the tooltip appears.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    content:
      'This is a much longer tooltip content that demonstrates how the component handles extended text',
  },
  render: (args) => (
    <div className='p-8'>
      <Tooltip {...args}>
        <Button>Long content</Button>
      </Tooltip>
    </div>
  ),
};
