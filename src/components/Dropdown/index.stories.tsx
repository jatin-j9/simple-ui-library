import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from '.';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A collapsible menu for selecting actions or options from a list.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='w-64'>
      <Dropdown>
        <DropdownTrigger>Select an option</DropdownTrigger>
        <DropdownContent>
          <DropdownItem onSelect={() => console.log('Option 1 selected')}>
            Option 1
          </DropdownItem>
          <DropdownItem onSelect={() => console.log('Option 2 selected')}>
            Option 2
          </DropdownItem>
          <DropdownItem onSelect={() => console.log('Option 3 selected')}>
            Option 3
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
};

export const WithSeparatorAndLabel: Story = {
  render: () => (
    <div className='w-64'>
      <Dropdown>
        <DropdownTrigger>Account Settings</DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Account</DropdownLabel>
          <DropdownItem onSelect={() => console.log('Profile selected')}>
            Profile
          </DropdownItem>
          <DropdownItem onSelect={() => console.log('Settings selected')}>
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownLabel>Actions</DropdownLabel>
          <DropdownItem onSelect={() => console.log('Help selected')}>
            Help
          </DropdownItem>
          <DropdownItem
            variant='destructive'
            onSelect={() => console.log('Logout selected')}
          >
            Logout
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
};

export const RightAligned: Story = {
  render: () => (
    <div className='w-64 flex justify-end'>
      <Dropdown>
        <DropdownTrigger>More Actions</DropdownTrigger>
        <DropdownContent align='end'>
          <DropdownItem onSelect={() => console.log('Edit selected')}>
            Edit
          </DropdownItem>
          <DropdownItem onSelect={() => console.log('Duplicate selected')}>
            Duplicate
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem
            variant='destructive'
            onSelect={() => console.log('Delete selected')}
          >
            Delete
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
};

export const ControlledDropdown: Story = {
  render: () => {
    const handleOpenChange = (open: boolean) => {
      console.log('Dropdown is now:', open ? 'open' : 'closed');
    };

    return (
      <div className='w-64'>
        <Dropdown onOpenChange={handleOpenChange}>
          <DropdownTrigger>Controlled Dropdown</DropdownTrigger>
          <DropdownContent>
            <DropdownItem onSelect={() => console.log('Item 1 selected')}>
              Item 1
            </DropdownItem>
            <DropdownItem onSelect={() => console.log('Item 2 selected')}>
              Item 2
            </DropdownItem>
            <DropdownItem onSelect={() => console.log('Item 3 selected')}>
              Item 3
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

export const LongList: Story = {
  render: () => (
    <div className='w-64'>
      <Dropdown>
        <DropdownTrigger>Select Country</DropdownTrigger>
        <DropdownContent>
          {[
            'United States',
            'Canada',
            'United Kingdom',
            'Germany',
            'France',
            'Italy',
            'Spain',
            'Netherlands',
            'Belgium',
            'Switzerland',
            'Austria',
            'Sweden',
            'Norway',
            'Denmark',
            'Finland',
          ].map((country) => (
            <DropdownItem
              key={country}
              onSelect={() => console.log(`${country} selected`)}
            >
              {country}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  ),
};
