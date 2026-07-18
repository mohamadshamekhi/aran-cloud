import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";
import Icon, { IconName } from "../icon/Icon";
import { LoadingSpinner } from "../loading/LoadingSpinner";

const buttonVariants = cva(
  "h-10 flex cursor-pointer  justify-center w-full items-center text-body-2-strong rounded-lg  py-[10px] ",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-bg2-default not-disabled:hover:bg-primary-bg2-hover disabled:bg-primary-bg2-disable not-disabled:active:bg-primary-bg2-press text-neutral-fg3-default px-4",
        secondary:
          "border border-neutral-st2-default not-disabled:hover:border-neutral-st2-hover disabled:border-neutral-st2-disable not-disabled:active:border-neutral-st2-press text-neutral-fg1-default hover:text-neutral-fg1-hover active:text-neutral-fg1-press disabled:text-neutral-fg1-disable px-[15px]",
        danger:
          "bg-error-bg2-default not-disabled:hover:bg-error-bg2-hover disabled:bg-error-bg2-disable not-disabled:active:bg-error-bg2-press text-neutral-fg3-default px-4",
      },
      disable: {
        true: "cursor-not-allowed ",
        false: "",
      },
      withIcon: {
        true: "px-[10px] data-[variant=secondary]:!px-0  data-[variant=secondary]:w-10",
        false: "",
      },
      isLoading: {
        true: "cursor-not-allowed ",
        false: "",
      },
    },
    defaultVariants: {
      disable: false,
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "disabled" | "onClick"
    > {
  disable?: boolean;
  title?: string;
  isLoading?: boolean;
  icon?: IconName;
  ariaLabel?: string;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      disable,
      title,
      icon,
      isLoading,
      ariaLabel,
      onClick,
      type = "button",
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disable || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        data-variant={variant}
        disabled={isDisabled}
        onClick={onClick}
        aria-busy={isLoading || undefined}
        aria-label={icon && !title ? ariaLabel : undefined}
        className={cn(
          buttonVariants({
            variant,
            disable,
            withIcon: !!icon,
            isLoading,
          }) + ` ${className}`
        )}
        {...rest}
      >
        {isLoading ? (
          <LoadingSpinner
            color={variant === "secondary" ? "#333333" : "white"}
          />
        ) : icon ? (
          <Icon size={20} name={icon} />
        ) : (
          title
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
