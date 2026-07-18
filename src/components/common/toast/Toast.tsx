import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const toastVariants = cva(
  "h-11 flex items-center fixed w-fit gap-1 px-4 py-3 rounded-lg shadow-elevated",
  {
    variants: {
      variant: {
        error: "bg-error-bg1-default text-error-fg1-default",
        success: "bg-success-bg1-default text-success-fg1-default",
      },
      position: {
        "top-left": "left-4 top-4",
        "top-center": "left-1/2 top-16 -translate-x-1/2",
        "top-right": "right-4 top-4",
        "bottom-left": "left-4 bottom-4",
        "bottom-right": "right-4 bottom-4",
      },
    },
    defaultVariants: {
      variant: "error",
      position: "top-left",
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  boldText?: string;
  content: string;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ boldText, content, variant, position }, ref) => {
    return (
      <div
        ref={ref}
        role={variant === "error" ? "alert" : "status"}
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={cn(toastVariants({ variant, position }))}
      >
        {boldText && (
          <strong className="text-body-2-strong ">{boldText}</strong>
        )}
        <span className="text-caption-1">{content}</span>
      </div>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
