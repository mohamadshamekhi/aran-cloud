"use client";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React, { useRef } from "react";

const inputVariants = cva(
  "border rounded-md w-full p-2 hover:border-neutral-st2-hover hover:text-neutral-fg1-hover text-body-2 disable:border-neutral-st2-disable disable:text-neutral-st2-default disable:pointer-not-allow focus-visible:outline-0  focus:border-success-fg1-default",
  {
    variants: {
      variant: {
        default:
          "border-neutral-st2-default  placeholder:text-neutral-st2-default ",
        error:
          "border-neutral-st2-default outline outline-error-fg1-default text-error-fg1-disable",
      },
      inputSize: {
        sm: "h-[36px]",
        md: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

interface InputVariants
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
  onEnter?: (_v: string) => void;
}

const TextInput = ({
  inputSize,
  error,
  className,
  onEnter,
  ...props
}: InputVariants) => {
  const innerRef = useRef<HTMLInputElement>(null);
  return (
    <input
      type="text"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = e.currentTarget.value;
          onEnter?.(value);
          if (innerRef.current) {
            innerRef.current.value = "";
          }
        }
      }}
      className={cn(
        inputVariants({
          inputSize,
          variant: error ? "error" : "default",
          className,
        }) + "  "
      )}
      {...props}
    />
  );
};

export default TextInput;
