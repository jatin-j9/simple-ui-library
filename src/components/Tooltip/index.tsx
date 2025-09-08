import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, useRef, useEffect, type ReactNode } from 'react';

const tooltipStyles = cva(
  [
    'absolute',
    'z-50',
    'px-2.5',
    'py-1',
    'text-xs',
    'text-white',
    'bg-gray-900',
    'rounded-lg',
    'shadow-lg',
    'pointer-events-none',
    'opacity-0',
    'transition-opacity',
    'duration-200',
    'whitespace-nowrap',
  ],
  {
    variants: {
      placement: {
        top: '-translate-y-full -top-2 left-1/2 -translate-x-1/2',
        bottom: 'translate-y-full -bottom-2 left-1/2 -translate-x-1/2',
        left: '-translate-x-full -left-2 top-1/2 -translate-y-1/2',
        right: 'translate-x-full -right-2 top-1/2 -translate-y-1/2',
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  }
);

const arrowStyles = cva(
  ['absolute', 'w-2', 'h-2', 'bg-gray-900', 'rotate-45'],
  {
    variants: {
      placement: {
        top: 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2',
        left: 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2',
        right: 'right-full top-1/2 -translate-y-1/2 translate-x-1/2',
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  }
);

interface TooltipProps extends VariantProps<typeof tooltipStyles> {
  content: ReactNode;
  children: ReactNode;
  delay?: number;
  disabled?: boolean;
  className?: string;
  showArrow?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      placement = 'top',
      delay = 500,
      disabled = false,
      className,
      showArrow = true,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipId] = useState(
      () => `tooltip-${Math.random().toString(36).substr(2, 9)}`
    );
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
      if (disabled) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideTooltip();
      }
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref || triggerRef}
        className='relative inline-block'
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        onKeyDown={handleKeyDown}
        aria-describedby={isVisible ? tooltipId : undefined}
        {...props}
      >
        {children}

        {content && (
          <div
            id={tooltipId}
            role='tooltip'
            className={cn(
              tooltipStyles({ placement, className }),
              isVisible && 'opacity-100'
            )}
            aria-hidden={!isVisible}
          >
            {content}
            {showArrow && <div className={cn(arrowStyles({ placement }))} />}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
