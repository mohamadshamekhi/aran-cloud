"use client";
import Button from "@/components/common/button/Button";
import Field from "@/components/common/field/Field";
import Form from "@/components/common/form/Form";
import LinkButton from "@/components/common/linkButton/LinkButton";
import Section from "@/components/common/section/Section";
import TextInput from "@/components/common/textInput/TextInput";
import Toast from "@/components/common/toast/Toast";
import { useLogin } from "@/services/auth";
import { setAuthCookieAction } from "@/utils/auth-action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import z from "zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;
const AuthClientPage = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  return (
    <section className="flex md:px-0 px-5 justify-center items-center min-h-screen">
      <section className="w-120">
        <Section title="Sign in">
          <Form
            schema={schema}
            onSubmit={(data) => {
              mutate(
                {
                  username: data.username,
                  password: data.password,
                },
                {
                  onSuccess({ accessToken, ...others }) {
                    setAuthCookieAction(accessToken);
                    localStorage.setItem("user", JSON.stringify(others));
                    router.push("/dashboard/articles");
                  },
                  onError() {
                    setShowToast(true);
                    setTimeout(() => {
                      setShowToast(true);
                    }, 3000);
                  },
                }
              );
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

              <Field message={errors.password} label="Password">
                <TextInput
                  error={errors.password}
                  name="password"
                  placeholder="sample text"
                  type="password"
                />
              </Field>
            </div>

            <Button isLoading={isPending} type="submit" title="Sign in" />
          </Form>
          <div className="flex items-center gap-2 mt-3 justify-center">
            <span className="text-body-2 text-neutral-fg1-default ">
              Don’t have an account?
            </span>
            <LinkButton href="/sign-up" title="Sign up now" />
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

export default AuthClientPage;
