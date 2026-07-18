import React, { ReactNode } from "react";
import { z, ZodSchema } from "zod";

interface FormProps<T extends ZodSchema> {
  children: ReactNode;
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  onError?: (errors: Partial<Record<keyof z.infer<T>, string>>) => void;
  onFieldChange?: (name: keyof z.infer<T>) => void;
}

function Form<T extends ZodSchema>({
  children,
  schema,
  onSubmit,
  onError,
  onFieldChange,
}: FormProps<T>) {
  return (
    <form
      onChange={(e) => {
        const target = e.target as unknown as HTMLInputElement;
        if (target?.name) {
          onFieldChange?.(target.name as keyof z.infer<T>);
        }
      }}
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const result = schema.safeParse(rawData);

        if (!result.success) {
          const fieldErrors: Partial<Record<keyof z.infer<T>, string>> = {};
          result.error.issues.forEach((issue) => {
            const fieldName = issue.path[0] as keyof z.infer<T>;
            fieldErrors[fieldName] = issue.message;
          });
          onError?.(fieldErrors);
          return;
        }

        onSubmit(result.data);
      }}
    >
      {children}
    </form>
  );
}

export default Form;
