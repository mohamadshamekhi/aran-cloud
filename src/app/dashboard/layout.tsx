import Header from "@/components/common/header/Header";
import SideBar from "@/components/common/sidebar/SideBar";
import React from "react";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      <section className="flex">
        <SideBar
          pages={[
            {
              link: "/dashboard/articles",
              child: ["/dashboard/articles/page"],
              title: "All Articles",
            },
            {
              link: "/dashboard/articles/create",
              child: ["/dashboard/articles/edit"],
              title: "New Article",
            },
          ]}
        />
        <section className="md:p-6 p-2 flex-1 overflow-auto">
          {children}
        </section>
      </section>
    </section>
  );
}
