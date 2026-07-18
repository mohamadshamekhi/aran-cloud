import Header from "@/components/common/header/Header";
import SideBar from "@/components/common/sidebar/SideBar";
import { cookies } from "next/headers";
import React from "react";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  return (
    <section>
      <Header />
      <section className="flex">
        <SideBar
          pages={[
            { link: "/dashboard/articles", title: "All Articles" },
            { link: "/dashboard/articles/create", title: "New Article" },
          ]}
        />
        <section className="p-6 flex-1">{children}</section>
      </section>
    </section>
  );
}
