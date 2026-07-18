import Section from "@/components/common/section/Section";
import React from "react";
import TableRow from "../../_components/TableRow";
import Pagination from "@/components/common/pagination/Pagination";
import { ArticleListResponse } from "@/types/articles.types";
import ArticlePagination from "../../_components/ArticlePagination";

const LIMIT = 20;

const ClientPage = ({
  data,
  currentPage,
}: {
  data: ArticleListResponse;
  currentPage: number;
}) => {
  return (
    <section>
      <Section title="All Posts">
        <div className="mb-6 overflow-x-auto grid">
          <table className="border-b border-neutral-st3-default">
            <thead>
              <tr className="bg-neutral-st3-default text-title-3 text-neutral-fg1-default h-12 flex ">
                <th className="px-3 w-12 flex justify-center items-center">
                  #
                </th>
                <th className="px-3 flex justify-start items-center min-w-25 w-[10.8%]">
                  Title
                </th>
                <th className="px-3 flex justify-start items-center min-w-25 w-[17.3%]">
                  Author
                </th>
                <th className="px-3 flex justify-start items-center min-w-25 w-[10.1%]">
                  Tags
                </th>
                <th className="px-3 flex justify-start items-center min-w-25 flex-1">
                  Excerpt
                </th>
                <th className="px-3 flex justify-start items-center min-w-25 w-[16.6%]">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-st3-default">
              {data?.posts.map((item, i) => (
                <TableRow
                  article={item}
                  isFirst={i === 0}
                  key={"article-key-" + item.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        <ArticlePagination
          current={Number(currentPage)}
          total={data.total}
          limit={LIMIT}
        />
      </Section>
    </section>
  );
};

export default ClientPage;
