import React from "react";
import ClientPage from "./client-page";
import { fetchArticlesServer } from "@/services/articles/api.server";
import { notFound } from "next/navigation";
const LIMIT = 20;

interface PageProps {
  params: Promise<{ page: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { page } = await params;
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 1) {
    notFound();
  }

  const data = await fetchArticlesServer({
    skip: (currentPage - 1) * LIMIT,
    limit: LIMIT,
  });

  return <ClientPage data={data} currentPage={currentPage} />;
};

export default Page;
