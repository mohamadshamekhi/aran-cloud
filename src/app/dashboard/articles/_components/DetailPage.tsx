/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import Button from "@/components/common/button/Button";
import Checkbox from "@/components/common/checkbox/Checkbox";
import Field from "@/components/common/field/Field";
import Form from "@/components/common/form/Form";
import Loading from "@/components/common/loading/Loading";
import Section from "@/components/common/section/Section";
import TextInput from "@/components/common/textInput/TextInput";
import Toast from "@/components/common/toast/Toast";
import { useCreateArticle, useUpdateArticle } from "@/services/articles";
import { useTags } from "@/services/tags";
import { ArticleDetailResponse } from "@/types/articles.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  body: z.string().min(1, "Body is required"),
});

type FormValues = z.infer<typeof schema>;

const DetailPage = ({ article }: { article?: ArticleDetailResponse }) => {
  const router = useRouter();
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [tags, setTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const { mutate: createMutate, isPending: createIsPending } =
    useCreateArticle();
  const { mutate: updateMutate, isPending: updateIsPending } =
    useUpdateArticle();

  const { data, isLoading } = useTags();

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    } else {
      setTags(tags.filter((t) => t !== tag));
    }
  };

  useEffect(() => {
    if (article?.id) {
      setTags(article.tags);
    }
  }, []);

  const submitData = (data: any) => {
    if (tags.length === 0) {
      return;
    }
    if (article?.id) {
      updateMutate(
        {
          id: article.id,
          payload: {
            body: data.body,
            description: data.description,
            title: data.title,
            tags: tags,
          },
        },
        {
          onSuccess() {
            setShowToast(true);
            router.push("/dashboard/articles");
          },
        }
      );
    } else {
      createMutate(
        {
          body: data.body,
          description: data.description,
          title: data.title,
          userId: JSON.parse(localStorage.user)?.id,
          created_at: new Date().getTime(),
          tags: tags,
        },
        {
          onSuccess() {
            setShowToast(true);
            router.push("/dashboard/articles");
          },
        }
      );
    }

    setErrors({});
  };

  return (
    <section className="flex gap-6">
      {showToast && (
        <Toast
          variant={"success"}
          position={"top-center"}
          content={
            article?.id
              ? "Article updated successfuly"
              : "Article created successfuly"
          }
          boldText="Well done!"
        />
      )}
      <section className="flex-1">
        <Section title={`${article?.id ? "Edit" : "New"} article`}>
          <Form
            schema={schema}
            onSubmit={submitData}
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
            <div className="grid gap-3">
              <Field error message={errors?.title} label="Title">
                <TextInput
                  defaultValue={article?.title}
                  error={errors?.title}
                  name="title"
                />
              </Field>
              <Field error message={errors?.description} label="Description">
                <TextInput
                  defaultValue={article?.description}
                  error={errors?.description}
                  name="description"
                />
              </Field>
              <Field error message={errors?.body} label="Body">
                <TextInput
                  defaultValue={article?.body}
                  error={errors?.body}
                  name="body"
                  className="h-40"
                />
              </Field>
            </div>
            <div className="flex mt-6">
              <div>
                <Button
                  isLoading={createIsPending || updateIsPending}
                  type="submit"
                  title="Submit"
                />
              </div>
            </div>
          </Form>
        </Section>
      </section>
      <section className="w-94">
        <Section>
          <div className="grid gap-6">
            <Field label="Tags">
              <TextInput
                onEnter={(v) => {
                  addTag(v);
                  setNewTags([...newTags, v]);
                }}
                placeholder="New tag"
              />
            </Field>
            <div className="p-4 border h-[344px] overflow-auto border-neutral-st3-default rounded-xl grid gap-2">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <>
                  {[...newTags, ...(data as string[])]?.map((tag, i) => (
                    <Checkbox
                      onCheckedChange={() => {
                        addTag(tag);
                      }}
                      checked={tags.includes(tag)}
                      title={tag}
                      key={i}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </Section>
      </section>
    </section>
  );
};

export default DetailPage;
