import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from 'react';

const sliderStyles = cva(['relative', 'w-full', 'flex', 'items-center'], {
  variants: {
    size: {
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const trackStyles = cva(
  ['absolute', 'w-full', 'bg-gray-200', 'rounded-full', 'cursor-pointer'],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const fillStyles = cva(
  ['absolute', 'bg-primary-500', 'rounded-full', 'pointer-events-none'],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbStyles = cva(
  [
    'absolute',
    'bg-white',
    'border-2',
    'border-primary-500',
    'rounded-full',
    'cursor-grab',
    'active:cursor-grabbing',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:ring-offset-2',
    'transition-all',
    'duration-150',
    'hover:scale-110',
    'shadow-sm',
  ],
  {
    variants: {
      size: {
        sm: 'w-3 h-3 -ml-1.5',
        md: 'w-4 h-4 -ml-2',
        lg: 'w-5 h-5 -ml-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface SliderProps
  extends Omit<ComponentProps<'div'>, 'onChange'>,
    VariantProps<typeof sliderStyles> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onChange,
      onValueCommit,
      size,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // Normalize value to percentage
    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = useCallback(
      (newValue: number) => {
        const clampedValue = Math.max(min, Math.min(max, newValue));
        const steppedValue = Math.round(clampedValue / step) * step;

        if (!isControlled) {
          setInternalValue(steppedValue);
        }
        onChange?.(steppedValue);
      },
      [min, max, step, isControlled, onChange]
    );

    const getValueFromPosition = useCallback(
      (clientX: number) => {
        if (!trackRef.current) return value;

        const rect = trackRef.current.getBoundingClientRect();
        const percentage = Math.max(
          0,
          Math.min(1, (clientX - rect.left) / rect.width)
        );
        return min + percentage * (max - min);
      },
      [min, max, value]
    );

    const handleMouseDown = useCallback(
      (event: React.MouseEvent) => {
        if (disabled) return;

        event.preventDefault();
        setIsDragging(true);

        const newValue = getValueFromPosition(event.clientX);
        updateValue(newValue);

        thumbRef.current?.focus();
      },
      [disabled, getValueFromPosition, updateValue]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        let newValue = value;
        const largeStep = (max - min) / 10;

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            event.preventDefault();
            newValue = value + step;
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            event.preventDefault();
            newValue = value - step;
            break;
          case 'PageUp':
            event.preventDefault();
            newValue = value + largeStep;
            break;
          case 'PageDown':
            event.preventDefault();
            newValue = value - largeStep;
            break;
          case 'Home':
            event.preventDefault();
            newValue = min;
            break;
          case 'End':
            event.preventDefault();
            newValue = max;
            break;
          default:
            return;
        }

        updateValue(newValue);
      },
      [disabled, value, step, max, min, updateValue]
    );

    // Mouse move and up handlers
    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (event: MouseEvent) => {
        const newValue = getValueFromPosition(event.clientX);
        updateValue(newValue);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        onValueCommit?.(value);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, getValueFromPosition, updateValue, onValueCommit, value]);

    return (
      <div
        ref={ref}
        className={cn(sliderStyles({ size, className }))}
        {...props}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(trackStyles({ size }))}
          onMouseDown={handleMouseDown}
        />

        {/* Fill */}
        <div
          className={cn(fillStyles({ size }))}
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb */}
        <div
          ref={thumbRef}
          className={cn(thumbStyles({ size }))}
          style={{ left: `${percentage}%` }}
          tabIndex={disabled ? -1 : 0}
          role='slider'
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
