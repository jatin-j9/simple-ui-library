import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

// Context for managing tabs state
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Root Tabs component
const tabsStyles = cva(['w-full'], {
  variants: {
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex flex-row',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

interface TabsProps extends VariantProps<typeof tabsStyles> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
  className?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      controlledValue || defaultValue || ''
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    useEffect(() => {
      if (isControlled && controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue, isControlled]);

    return (
      <TabsContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn(tabsStyles({ orientation, className }))}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

// TabsList component
const tabsListStyles = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-lg',
    'bg-gray-100',
    'p-1',
    'text-gray-500',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'h-10 w-full',
        vertical: 'h-auto w-auto flex-col',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

type TabsListProps = ComponentProps<'div'> &
  VariantProps<typeof tabsListStyles>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useTabsContext();
    const listRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const tabs = listRef.current?.querySelectorAll(
        '[role="tab"]:not([disabled])'
      ) as NodeListOf<HTMLButtonElement>;

      if (!tabs || tabs.length === 0) return;

      const currentIndex = Array.from(tabs).findIndex(
        (tab) => tab === document.activeElement
      );

      let nextIndex = currentIndex;

      const isHorizontal = orientation === 'horizontal';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      switch (event.key) {
        case nextKey:
          event.preventDefault();
          nextIndex = currentIndex + 1;
          if (nextIndex >= tabs.length) nextIndex = 0;
          break;
        case prevKey:
          event.preventDefault();
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) nextIndex = tabs.length - 1;
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      tabs[nextIndex]?.focus();
    };

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          listRef.current = node;
        }}
        role='tablist'
        aria-orientation={orientation}
        className={cn(tabsListStyles({ orientation, className }))}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
// TabsTrigger component
const tabsTriggerStyles = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'rounded-md',
    'px-3',
    'py-1.5',
    'text-sm',
    'font-medium',
    'ring-offset-white',
    'transition-all',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary-500',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'cursor-pointer',
  ],
  {
    variants: {
      active: {
        true: 'bg-white text-gray-950 shadow-sm',
        false: 'hover:bg-gray-200/50 hover:text-gray-900',
      },
      orientation: {
        horizontal: 'flex-1',
        vertical: 'w-full justify-start',
      },
    },
    defaultVariants: {
      active: false,
      orientation: 'horizontal',
    },
  }
);

interface TabsTriggerProps
  extends ComponentProps<'button'>,
    VariantProps<typeof tabsTriggerStyles> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const {
      value: selectedValue,
      onValueChange,
      orientation,
    } = useTabsContext();
    const isActive = selectedValue === value;

    return (
      <button
        ref={ref}
        role='tab'
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          tabsTriggerStyles({ active: isActive, orientation, className })
        )}
        onClick={() => onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// TabsContent component
const tabsContentStyles = cva([
  'mt-2',
  'ring-offset-white',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-primary-500',
  'focus-visible:ring-offset-2',
]);

interface TabsContentProps
  extends ComponentProps<'div'>,
    VariantProps<typeof tabsContentStyles> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const isActive = selectedValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role='tabpanel'
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={cn(tabsContentStyles({ className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
