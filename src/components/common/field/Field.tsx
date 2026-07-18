/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useId } from "react";

interface FieldProps {
  label: string;
  message?: string;
  error?: boolean;
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
}

const Field = ({
  label,
  message,
  children,
  required,
  error = true,
  htmlFor,
}: FieldProps) => {
  const generatedId = useId();
  const fieldId = htmlFor ?? generatedId;
  const messageId = `${fieldId}-message`;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="text-body-2 text-neutral-fg1-default "
      >
        {label}
        {required && (
          <span
            className="text-caption-2 text-error-fg1-default"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>
      <div className="mt-2">
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, {
              id: fieldId,
              "aria-describedby": message ? messageId : undefined,
              "aria-invalid": error || undefined,
            })
          : children}
      </div>
      {message && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={`text-caption-1-strong mt-2 ${
            error ? "text-error-fg1-default" : "text-neutral-fg2-default"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Field;
