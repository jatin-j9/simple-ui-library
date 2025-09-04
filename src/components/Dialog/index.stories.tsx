import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '.';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DialogDemo = ({ size }: { size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} size={size}>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogClose onClose={() => setOpen(false)} />
        </DialogHeader>
        <DialogContent>
          <p className='text-sm text-gray-600'>
            Are you sure you want to continue? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const Small: Story = {
  render: () => <DialogDemo size='sm' />,
};

export const Large: Story = {
  render: () => <DialogDemo size='lg' />,
};

export const ExtraLarge: Story = {
  render: () => <DialogDemo size='xl' />,
};

const FormDialogDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogClose onClose={() => setOpen(false)} />
        </DialogHeader>
        <DialogContent>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Name
              </label>
              <input
                id='name'
                type='text'
                className='w-full border border-gray-200 p-2 rounded-lg focus:outline-primary-500 focus:border-transparent'
                placeholder='Enter your name'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                className='w-full border border-gray-200 p-2 rounded-lg focus:outline-primary-500 focus:border-transparent'
                placeholder='Enter your email'
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const WithForm: Story = {
  render: () => <FormDialogDemo />,
};

const AlertDialogDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='destructive' onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogClose onClose={() => setOpen(false)} />
        </DialogHeader>
        <DialogContent>
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0'>
              <svg
                className='h-6 w-6 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-900'>
                This action cannot be undone
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                This will permanently delete the item and remove all associated
                data.
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={() => setOpen(false)}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const AlertDialog: Story = {
  render: () => <AlertDialogDemo />,
};
