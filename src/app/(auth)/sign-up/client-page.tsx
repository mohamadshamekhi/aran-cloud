"use client";
import React, { useState } from "react";
import z from "zod";
import Button from "@/components/common/button/Button";
import Field from "@/components/common/field/Field";
import Form from "@/components/common/form/Form";
import LinkButton from "@/components/common/linkButton/LinkButton";
import Section from "@/components/common/section/Section";
import TextInput from "@/components/common/textInput/TextInput";
import Toast from "@/components/common/toast/Toast";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

const AuthSignUpClientPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  return (
    <section className="flex md:px-0 px-5 justify-center items-center min-h-screen">
      <section className="w-120">
        <Section title="Sign up">
          <Form
            schema={schema}
            onSubmit={() => {
              setShowToast(true);
              setTimeout(() => {
                setShowToast(true);
              }, 3000);
            }}
            onFieldChange={(name) => {
              setErrors((prev) => {
                if (!prev[name]) return prev;
                const next = { ...prev };
                delete next[name];
                return next;
              });
            }}
            onError={(errs) => setErrors(errs)}
          >
            <div className="grid gap-3 mb-6">
              <Field message={errors.username} label="Username">
                <TextInput
                  error={errors.username}
                  name="username"
                  placeholder="sample text"
                />
              </Field>

              <Field message={errors.email} label="Email">
                <TextInput
                  error={errors.email}
                  name="email"
                  placeholder="sample text"
                />
              </Field>

              <Field message={errors.password} label="Password">
                <TextInput
                  error={errors.password}
                  type="password"
                  name="password"
                  placeholder="sample text"
                />
              </Field>
            </div>

            <Button type="submit" title="Sign up" />
          </Form>
          <div className="flex items-center gap-2 mt-3 justify-center">
            <span className="text-body-2 text-neutral-fg1-default ">
              Have an account?{" "}
            </span>
            <LinkButton href="/sign-in" title="Sign in" />
          </div>
        </Section>
      </section>

      {showToast && (
        <Toast
          content="Username and/or Password is invalid"
          position={"top-center"}
          boldText="Sign-in Failed!"
        />
      )}
    </section>
  );
};

export default AuthSignUpClientPage;
