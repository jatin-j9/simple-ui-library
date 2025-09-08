import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from '.';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An input control that lets users select a value or range by moving a handle along a track.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Controlled value of the slider',
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Default value for uncontrolled slider',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    step: {
      control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
      description: 'Step increment',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the slider',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    'aria-label': 'Default slider',
  },
  render: (args) => (
    <div className='w-80'>
      <Slider {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    'aria-label': 'Controlled slider',
  },
  render: (args) => {
    const [value, setValue] = useState(25);

    return (
      <div className='w-80 space-y-4'>
        <div className='text-sm text-gray-600'>
          Value: <span className='font-mono'>{value}</span>
        </div>
        <Slider {...args} value={value} onChange={setValue} />
        <div className='flex gap-2'>
          <button
            className='px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200'
            onClick={() => setValue(0)}
          >
            Reset to 0
          </button>
          <button
            className='px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200'
            onClick={() => setValue(50)}
          >
            Set to 50
          </button>
          <button
            className='px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200'
            onClick={() => setValue(100)}
          >
            Set to 100
          </button>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='w-80 space-y-6'>
      <div>
        <label className='block text-sm font-medium mb-2'>Small</label>
        <Slider size='sm' defaultValue={30} aria-label='Small slider' />
      </div>
      <div>
        <label className='block text-sm font-medium mb-2'>
          Medium (Default)
        </label>
        <Slider size='md' defaultValue={50} aria-label='Medium slider' />
      </div>
      <div>
        <label className='block text-sm font-medium mb-2'>Large</label>
        <Slider size='lg' defaultValue={70} aria-label='Large slider' />
      </div>
    </div>
  ),
};

export const CustomRange: Story = {
  args: {
    min: -50,
    max: 50,
    step: 5,
    defaultValue: 0,
    'aria-label': 'Custom range slider',
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue || 0);

    return (
      <div className='w-80 space-y-4'>
        <div className='text-sm text-gray-600'>
          Range: {args.min} to {args.max}, Step: {args.step}
        </div>
        <div className='text-sm text-gray-600'>
          Value: <span className='font-mono'>{value}</span>
        </div>
        <Slider {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 60,
    disabled: true,
    'aria-label': 'Disabled slider',
  },
  render: (args) => (
    <div className='w-80 space-y-2'>
      <div className='text-sm text-gray-500'>This slider is disabled</div>
      <Slider {...args} />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => {
    const [volume, setVolume] = useState(75);
    const [brightness, setBrightness] = useState(50);

    return (
      <div className='w-80 space-y-6'>
        <div>
          <label id='volume-label' className='block text-sm font-medium mb-2'>
            Volume: {volume}%
          </label>
          <Slider
            value={volume}
            onChange={setVolume}
            aria-labelledby='volume-label'
          />
        </div>
        <div>
          <label
            id='brightness-label'
            className='block text-sm font-medium mb-2'
          >
            Brightness: {brightness}%
          </label>
          <Slider
            value={brightness}
            onChange={setBrightness}
            aria-labelledby='brightness-label'
          />
        </div>
      </div>
    );
  },
};
