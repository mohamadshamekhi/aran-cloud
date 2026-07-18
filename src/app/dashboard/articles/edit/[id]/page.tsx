import { fetchArticleServer } from "@/services/articles/api.server";
import DetailPage from "../../_components/DetailPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const articleId = Number(id);

  if (!Number.isInteger(articleId) || articleId < 1) {
    notFound();
  }

  const data = await fetchArticleServer(articleId);
  return <DetailPage article={data} />;
};

export default Page;
