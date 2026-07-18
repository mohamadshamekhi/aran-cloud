"use client";
import Button from "@/components/common/button/Button";
import DropDown from "@/components/common/dropdown/DropDown";
import Modal, { ModalRef } from "@/components/common/modal/Modal";
import Toast from "@/components/common/toast/Toast";
import { useDeleteArticle } from "@/services/articles";
import { Article } from "@/types/articles.types";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const TableRow = ({
  article,
  isFirst,
}: {
  article: Article;
  isFirst: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useDeleteArticle();
  const navigate = useRouter();
  const modalRef = useRef<ModalRef>(null);

  return (
    <tr
      key={article.id}
      className=" text-body-2 text-neutral-fg1-default h-12 flex "
    >
      <td className=" w-12 flex justify-center items-center">
        <span
          className={
            isFirst
              ? "text-title-3"
              : "w-8 h-8 bg-neutral-bg2-default rounded-sm flex justify-center items-center  text-caption-1-strong"
          }
        >
          {article.id}
        </span>
      </td>
      <td className="px-3 flex  justify-start items-center min-w-25 w-[10.8%]">
        <span className="h-6 overflow-hidden text-body-1">{article.title}</span>
      </td>
      <td className="px-3 flex justify-start items-center w-[17.3%]">
        {article.userId}
      </td>
      <td className="px-3 flex justify-start items-center min-w-25 w-[10.1%]">
        <span className="h-6 overflow-hidden">{article.tags.join(", ")}</span>
      </td>
      <td className="px-3 flex justify-start items-center flex-1">
        <p className="h-6 overflow-hidden">{article.body}</p>
      </td>
      <td className="px-3 flex justify-between items-center min-w-25 w-[16.6%]">
        <span>date</span>
        <DropDown
          items={[
            {
              title: "Edit",
              onClick: () => {
                navigate.push(`/dashboard/articles/edit/${article.id}`);
              },
            },
            {
              title: "Delete",
              onClick: () => {
                modalRef.current?.open();
              },
            },
          ]}
          trigger={<Button icon="ellipsis" variant={"secondary"} />}
        />
      </td>
      <Modal
        description=""
        content={"Are you sure you want to delete this article?"}
        ref={modalRef}
        type="delete"
        trigger
        title="Delete Article"
        onApprove={() => {
          mutate(
            { id: article?.id || 0 },
            {
              onSuccess: () => {
                modalRef.current?.close();
                setIsOpen(true);

                setTimeout(() => {
                  setIsOpen(false);
                }, 3000);
              },
            }
          );
        }}
      />

      {isOpen && (
        <Toast
          variant={"success"}
          position={"top-center"}
          content={"Article deleted successfuly"}
        />
      )}
    </tr>
  );
};

export default TableRow;
