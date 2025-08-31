import { forwardRef, type ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const inputStyles = cva([
  'w-full',
  'border',
  'border-gray-200',
  'p-2',
  'rounded-lg',
  'transition-all',
  'duration-100',
  'focus:outline-primary-500',
  'focus:border-transparent',
  'placeholder:text-gray-400',
  'placeholder:text-sm',
]);

type InputProps = ComponentProps<'input'> & VariantProps<typeof inputStyles>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type='text'
        autoComplete='off'
        className={cn(inputStyles({ className }))}
        {...props}
      />
    );
  }
);
