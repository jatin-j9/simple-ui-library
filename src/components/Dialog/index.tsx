import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

const dialogOverlayStyles = cva([
  'fixed',
  'inset-0',
  'bg-black/50',
  'backdrop-blur-sm',
  'z-50',
  'flex',
  'items-center',
  'justify-center',
  'p-4',
  'animate-in',
  'fade-in-0',
  'duration-200',
]);

const dialogContentStyles = cva(
  [
    'relative',
    'bg-white',
    'rounded-lg',
    'shadow-lg',
    'focus:outline-none',
    'animate-in',
    'zoom-in-95',
    'duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm w-full',
        md: 'max-w-md w-full',
        lg: 'max-w-lg w-full',
        xl: 'max-w-xl w-full',
        '2xl': 'max-w-2xl w-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface DialogProps extends VariantProps<typeof dialogContentStyles> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onOpenChange, children, size, className }, ref) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange(false);
        }
      };

      const handleFocusTrap = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        const focusableElements = contentRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleFocusTrap);
      document.body.style.overflow = 'hidden';

      // Focus the first focusable element
      setTimeout(() => {
        const firstFocusable = contentRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 0);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleFocusTrap);
        document.body.style.overflow = '';
      };
    }, [open, onOpenChange]);

    if (!open) return null;

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (event.target === overlayRef.current) {
        onOpenChange(false);
      }
    };

    return createPortal(
      <div
        ref={overlayRef}
        className={cn(dialogOverlayStyles())}
        onClick={handleOverlayClick}
        role='dialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
      >
        <div
          ref={contentRef}
          className={cn(dialogContentStyles({ size, className }))}
          role='document'
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

const dialogHeaderStyles = cva([
  'flex',
  'items-center',
  'justify-between',
  'p-6',
  'pb-4',
]);

type DialogHeaderProps = ComponentProps<'div'> &
  VariantProps<typeof dialogHeaderStyles>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dialogHeaderStyles({ className }))}
        {...props}
      />
    );
  }
);

const dialogTitleStyles = cva([
  'text-lg',
  'font-semibold',
  'text-gray-900',
  'leading-none',
  'tracking-tight',
]);

type DialogTitleProps = ComponentProps<'h2'> &
  VariantProps<typeof dialogTitleStyles>;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        id='dialog-title'
        className={cn(dialogTitleStyles({ className }))}
        {...props}
      />
    );
  }
);

const dialogCloseStyles = cva([
  'rounded-sm',
  'opacity-70',
  'ring-offset-white',
  'transition-opacity',
  'hover:opacity-100',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-primary-500',
  'focus:ring-offset-2',
  'disabled:pointer-events-none',
  'p-1',
]);

interface DialogCloseProps
  extends ComponentProps<'button'>,
    VariantProps<typeof dialogCloseStyles> {
  onClose: () => void;
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, onClose, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(dialogCloseStyles({ className }))}
        onClick={onClose}
        aria-label='Close dialog'
        {...props}
      >
        <svg
          width='15'
          height='15'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
        >
          <path
            d='M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z'
            fill='currentColor'
            fillRule='evenodd'
            clipRule='evenodd'
          />
        </svg>
      </button>
    );
  }
);

const dialogContentBodyStyles = cva(['px-6', 'pb-6']);

type DialogContentProps = ComponentProps<'div'> &
  VariantProps<typeof dialogContentBodyStyles>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dialogContentBodyStyles({ className }))}
        {...props}
      />
    );
  }
);

const dialogFooterStyles = cva([
  'flex',
  'flex-col-reverse',
  'sm:flex-row',
  'sm:justify-end',
  'sm:space-x-2',
  'px-6',
  'pb-6',
  'pt-4',
  'gap-2',
  'sm:gap-0',
]);

type DialogFooterProps = ComponentProps<'div'> &
  VariantProps<typeof dialogFooterStyles>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dialogFooterStyles({ className }))}
        {...props}
      />
    );
  }
);
