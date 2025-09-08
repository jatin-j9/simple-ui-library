import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A set of layered sections of content—known as tab panels—that are displayed one at a time. Includes full keyboard navigation and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
    defaultValue: {
      control: 'text',
      description: 'The default active tab value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
        <TabsTrigger value='settings'>Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value='account' className='space-y-2'>
        <h3 className='text-lg font-medium'>Account Information</h3>
        <p className='text-sm text-gray-600'>
          Update your account details and personal information.
        </p>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Full Name</label>
          <input
            className='w-full px-3 py-2 border border-gray-200 rounded-md'
            defaultValue='John Doe'
            placeholder='Enter your full name'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Email Address</label>
          <input
            className='w-full px-3 py-2 border border-gray-200 rounded-md'
            defaultValue='john@example.com'
            placeholder='Enter your email address'
          />
        </div>
      </TabsContent>
      <TabsContent value='password' className='space-y-2'>
        <h3 className='text-lg font-medium'>Change Password</h3>
        <p className='text-sm text-gray-600'>
          Ensure your account is using a long, random password to stay secure.
        </p>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Current password</label>
          <input
            type='password'
            className='w-full px-3 py-2 border border-gray-200 rounded-md'
            placeholder='Enter your current password'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>New password</label>
          <input
            type='password'
            className='w-full px-3 py-2 border border-gray-200 rounded-md'
            placeholder='Enter your new password'
          />
        </div>
      </TabsContent>
      <TabsContent value='settings' className='space-y-2'>
        <h3 className='text-lg font-medium'>Preferences</h3>
        <p className='text-sm text-gray-600'>
          Manage your notification preferences and account settings.
        </p>
        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <input type='checkbox' id='notifications' />
            <label htmlFor='notifications' className='text-sm'>
              Enable Email Notifications
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <input type='checkbox' id='marketing' />
            <label htmlFor='marketing' className='text-sm'>
              Marketing Communications
            </label>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'account',
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[600px]'>
      <TabsList>
        <TabsTrigger value='overview'>Overview</TabsTrigger>
        <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        <TabsTrigger value='reports'>Reports</TabsTrigger>
        <TabsTrigger value='notifications'>Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value='overview' className='ml-2'>
        <div className='rounded-lg border p-6'>
          <h3 className='text-lg font-medium mb-2'>Overview</h3>
          <p className='text-gray-600'>
            Get a high-level view of your application's performance and key
            metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='analytics' className='ml-2'>
        <div className='rounded-lg border p-6'>
          <h3 className='text-lg font-medium mb-2'>Analytics</h3>
          <p className='text-gray-600'>
            Dive deep into user behavior and application usage patterns.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='reports' className='ml-2'>
        <div className='rounded-lg border p-6'>
          <h3 className='text-lg font-medium mb-2'>Reports</h3>
          <p className='text-gray-600'>
            Generate and view detailed reports about your application.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='notifications' className='ml-2'>
        <div className='rounded-lg border p-6'>
          <h3 className='text-lg font-medium mb-2'>Notifications</h3>
          <p className='text-gray-600'>
            Manage your notification preferences and settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'overview',
    orientation: 'vertical',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <button
            onClick={() => setActiveTab('tab1')}
            className='px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200'
          >
            Switch to Tab 1
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className='px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200'
          >
            Switch to Tab 2
          </button>
          <button
            onClick={() => setActiveTab('tab3')}
            className='px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200'
          >
            Switch to Tab 3
          </button>
        </div>

        <Tabs
          {...args}
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-[400px]'
        >
          <TabsList>
            <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
            <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
            <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value='tab1'>
            <div className='p-4 border rounded'>
              <h3 className='font-medium'>Controlled Tab 1</h3>
              <p className='text-sm text-gray-600 mt-1'>
                This tab is controlled externally. Current value: {activeTab}
              </p>
            </div>
          </TabsContent>
          <TabsContent value='tab2'>
            <div className='p-4 border rounded'>
              <h3 className='font-medium'>Controlled Tab 2</h3>
              <p className='text-sm text-gray-600 mt-1'>
                This tab is controlled externally. Current value: {activeTab}
              </p>
            </div>
          </TabsContent>
          <TabsContent value='tab3'>
            <div className='p-4 border rounded'>
              <h3 className='font-medium'>Controlled Tab 3</h3>
              <p className='text-sm text-gray-600 mt-1'>
                This tab is controlled externally. Current value: {activeTab}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
  args: {
    orientation: 'horizontal',
  },
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='available'>Available</TabsTrigger>
        <TabsTrigger value='disabled' disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value='another'>Another</TabsTrigger>
      </TabsList>
      <TabsContent value='available'>
        <div className='p-4 border rounded'>
          <h3 className='font-medium'>Available Tab</h3>
          <p className='text-sm text-gray-600 mt-1'>
            This tab is available and can be selected.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='disabled'>
        <div className='p-4 border rounded'>
          <h3 className='font-medium'>Disabled Tab</h3>
          <p className='text-sm text-gray-600 mt-1'>
            This content won't be shown as the tab is disabled.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='another'>
        <div className='p-4 border rounded'>
          <h3 className='font-medium'>Another Tab</h3>
          <p className='text-sm text-gray-600 mt-1'>
            This is another available tab.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'available',
    orientation: 'horizontal',
  },
};
