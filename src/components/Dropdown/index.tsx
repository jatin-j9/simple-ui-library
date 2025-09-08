import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ComponentProps,
  type ReactNode,
  type KeyboardEvent,
} from 'react';

// Dropdown Context
interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  itemsCount: number;
  setItemsCount: (count: number) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
};

// Dropdown Root Component
interface DropdownProps {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown = ({
  children,
  defaultOpen = false,
  onOpenChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [itemsCount, setItemsCount] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
    if (!open) {
      setActiveIndex(-1);
    }
  };

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen: handleOpenChange,
        activeIndex,
        setActiveIndex,
        itemsCount,
        setItemsCount,
        triggerRef,
      }}
    >
      <div className='relative inline-block'>{children}</div>
    </DropdownContext.Provider>
  );
};

// Dropdown Trigger Component
const triggerStyles = cva([
  'inline-flex',
  'items-center',
  'justify-between',
  'w-full',
  'px-4',
  'py-2',
  'text-left',
  'bg-white',
  'border',
  'border-gray-200',
  'rounded-lg',
  'shadow-sm',
  'hover:bg-gray-50',
  'focus:outline-none',
  // 'focus:ring-2',
  // 'focus:ring-primary-500',
  // 'focus:border-transparent',
  'transition-all',
  'duration-200',
  'cursor-pointer',
]);

type DropdownTriggerProps = ComponentProps<'button'> &
  VariantProps<typeof triggerStyles>;

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen, setActiveIndex, itemsCount, triggerRef } =
    useDropdown();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(itemsCount - 1);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <button
      ref={(node) => {
        triggerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      type='button'
      aria-expanded={isOpen}
      aria-haspopup='true'
      className={cn(triggerStyles({ className }))}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
});

// Dropdown Content Component
const contentStyles = cva([
  'absolute',
  'z-50',
  'w-full',
  'mt-1',
  'bg-white',
  'border',
  'border-gray-200',
  'rounded-lg',
  'shadow-lg',
  'max-h-60',
  'overflow-auto',
  'py-1',
]);

interface DropdownContentProps
  extends ComponentProps<'div'>,
    VariantProps<typeof contentStyles> {
  align?: 'start' | 'end';
}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, align = 'start', ...props }, ref) => {
    const { isOpen, setIsOpen, setActiveIndex, setItemsCount, triggerRef } =
      useDropdown();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isOpen && contentRef.current) {
        const items = contentRef.current.querySelectorAll('[role="menuitem"]');
        setItemsCount(items.length);
      }
    }, [isOpen, children, setItemsCount]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        // Check if click is outside both content and trigger
        const isClickOnTrigger =
          triggerRef.current && triggerRef.current.contains(target);
        const isClickOnContent =
          contentRef.current && contentRef.current.contains(target);

        if (!isClickOnTrigger && !isClickOnContent) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen, setIsOpen, triggerRef]);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const items = contentRef.current?.querySelectorAll('[role="menuitem"]');
      if (!items) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev: number) => (prev + 1) % items.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(
            (prev: number) => (prev - 1 + items.length) % items.length
          );
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(items.length - 1);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'Tab':
          setIsOpen(false);
          break;
      }
    };

    if (!isOpen) return null;

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role='menu'
        className={cn(
          contentStyles({ className }),
          align === 'end' && 'right-0'
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Dropdown Item Component
const itemStyles = cva(
  [
    'w-full',
    'px-4',
    'py-2',
    'text-left',
    'text-sm',
    'text-gray-700',
    'hover:bg-gray-100',
    'focus:bg-gray-100',
    'focus:outline-none',
    'cursor-pointer',
    'transition-colors',
    'duration-150',
  ],
  {
    variants: {
      variant: {
        default: '',
        destructive: 'text-red-600 hover:bg-red-50 focus:bg-red-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface DropdownItemProps
  extends ComponentProps<'button'>,
    VariantProps<typeof itemStyles> {
  onSelect?: () => void;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, variant, onSelect, children, ...props }, ref) => {
    const { setIsOpen, activeIndex } = useDropdown();
    const itemRef = useRef<HTMLButtonElement>(null);
    const [itemIndex, setItemIndex] = useState(-1);

    useEffect(() => {
      if (itemRef.current) {
        const parent = itemRef.current.closest('[role="menu"]');
        if (parent) {
          const items = parent.querySelectorAll('[role="menuitem"]');
          const index = Array.from(items).indexOf(itemRef.current);
          setItemIndex(index);
        }
      }
    }, []);

    useEffect(() => {
      if (activeIndex === itemIndex && itemRef.current) {
        itemRef.current.focus();
      }
    }, [activeIndex, itemIndex]);

    const handleClick = () => {
      onSelect?.();
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <button
        ref={(node) => {
          itemRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role='menuitem'
        type='button'
        className={cn(itemStyles({ variant, className }))}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Dropdown Separator Component
export const DropdownSeparator = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('h-px bg-gray-200 my-1', className)}
    role='separator'
    {...props}
  />
);

// Dropdown Label Component
export const DropdownLabel = ({
  className,
  children,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn(
      'px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
