"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions */
import Pagination from "@/components/common/pagination/Pagination";
import { useRouter } from "next/navigation";
import React from "react";

const ArticlePagination = ({
  current,
  total,
  limit,
}: {
  current: number;
  total: number;
  limit: number;
}) => {
  const router = useRouter();
  return (
    <div className="flex   justify-end">
      <Pagination
        current={current}
        onChange={(p) => {
          p === 1
            ? router.push("/dashboard/articles")
            : router.push("/dashboard/articles/page/" + p);
        }}
        total={Math.ceil((total || 0) / limit)}
      />
    </div>
  );
};

export default ArticlePagination;
