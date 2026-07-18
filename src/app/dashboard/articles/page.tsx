import ClientPage from "./page/[page]/client-page";
import { fetchArticlesServer } from "@/services/articles/api.server";

const page = async () => {
  const params = { skip: 0, limit: 20 };
  const data = await fetchArticlesServer(params);

  return <ClientPage currentPage={1} data={data} />;
};

export default page;
