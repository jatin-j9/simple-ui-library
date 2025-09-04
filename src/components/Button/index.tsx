import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentProps } from 'react';

const buttonStyles = cva(
  ['w-full', 'rounded-md', 'focus:outline-none', 'disabled:cursor-not-allowed'],
  {
    variants: {
      variant: {
        primary: 'text-white bg-primary-500 hover:bg-primary-600',
        secondary: 'text-black bg-gray-100 hover:bg-gray-200',
        destructive: 'text-white bg-red-500 hover:bg-red-600',
        outline:
          'border-2 text-black border-gray-200 bg-transparent hover:bg-gray-100',
        ghost:
          'text-black bg-transparent hover:bg-gray-100 transition-colors duration-300',
        link: 'text-black bg-transparent hover:underline',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-1 text-base',
        lg: 'px-5 py-2 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, className }))}
        {...props}
      />
    );
  }
);
