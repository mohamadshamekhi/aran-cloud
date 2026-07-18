"use client";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useCallback, useState } from "react";

const checkVariants = cva(
  "w-4 h-4 rounded-md flex justify-center items-center cursor-pointer border-2 transition-all duration-200 disable:bg-primary-bg2-disable",
  {
    variants: {
      state: {
        default:
          "border-neutral-st2-default not-aria-disabled:hover:border-neutral-st1-hover not-aria-disabled:hover:bg-neutral-bg1-hover not-aria-disabled:active:border-neutral-st1-press not-aria-disabled:active:bg-neutral-bg1-press aria-disabled:bg-primary-bg2-disable aria-disabled:border-primary-bg2-disable",
        checked:
          "border-primary-bg2-default bg-primary-bg2-default not-aria-disabled:hover:bg-primary-bg2-hover not-aria-disabled:hover:border-primary-bg2-hover not-aria-disabled:active:bg-primary-bg2-press active:border-primary-bg2-press",
        indeterminate:
          "border-primary-bg2-default bg-primary-bg2-default not-aria-disabled:hover:bg-primary-bg2-hover not-aria-disabled:hover:border-primary-bg2-hover not-aria-disabled:active:bg-primary-bg2-press active:border-primary-bg2-press aria-disabled:bg-primary-bg2-disable aria-disabled:border-primary-bg2-disable",
      },
      disable: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      state: "default",
      disable: false,
    },
  }
);

type CheckState = "default" | "checked" | "indeterminate";

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.818 2.68179C10.9937 2.85753 10.9937 3.14245 10.818 3.31819L4.6305 9.50569C4.45477 9.68142 4.16984 9.68142 3.99411 9.50569L1.18161 6.69319C1.00587 6.51745 1.00587 6.23253 1.18161 6.05679C1.35734 5.88105 1.64227 5.88105 1.818 6.05679L4.3123 8.55109L10.1816 2.68179C10.3573 2.50605 10.6423 2.50605 10.818 2.68179Z"
      fill="white"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg
    width="8"
    height="1"
    viewBox="0 0 8 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0.45C0 0.201472 0.214903 0 0.48 0H6.72C6.9851 0 7.2 0.201472 7.2 0.45C7.2 0.698528 6.9851 0.9 6.72 0.9H0.48C0.214903 0.9 0 0.698528 0 0.45Z"
      fill="white"
    />
  </svg>
);

export interface CheckboxProps extends VariantProps<typeof checkVariants> {
  /** برای استفاده‌ی کنترل‌شده (controlled) — اگر بدی، خودت مسئول آپدیت کردنشی */
  checked?: boolean;
  /** فقط برای حالت غیرکنترل‌شده (uncontrolled) — مقدار اولیه‌ی چک‌باکس */
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disable?: boolean;
  ariaLabel?: string;
  onCheckedChange?: (checked: boolean) => void;
  title?: string;
}

const Checkbox = forwardRef<HTMLSpanElement, CheckboxProps>(
  (
    {
      disable,
      indeterminate,
      title,
      checked: controlledChecked,
      defaultChecked = false,
      ariaLabel,
      onCheckedChange,
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const getState = (): CheckState => {
      if (indeterminate) return "indeterminate";
      return checked ? "checked" : "default";
    };

    const toggle = useCallback(() => {
      if (disable) return;

      const next = !checked;

      if (!isControlled) {
        setInternalChecked(next);
      }

      onCheckedChange?.(next);
    }, [disable, checked, isControlled, onCheckedChange]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <div className="flex items-center gap-1.5">
        <span
          ref={ref}
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : checked}
          aria-disabled={disable}
          aria-label={ariaLabel}
          tabIndex={disable ? -1 : 0}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          className={cn(checkVariants({ state: getState(), disable }))}
        >
          {indeterminate ? (
            <IndeterminateIcon />
          ) : checked ? (
            <CheckIcon />
          ) : null}
        </span>
        {title && (
          <span className="text-body-2 text-neutral-fg1-default">{title}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
