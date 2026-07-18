"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Page {
  title: string;
  link: string;
}

interface SideBarProps {
  pages: Page[];
}

const SideBar = ({ pages }: SideBarProps) => {
  const pathname = usePathname();

  const getLinkClasses = (isActive: boolean) => {
    const baseClasses = "p-2 text-body-1 transition-colors";

    return isActive
      ? `${baseClasses} bg-primary-bg1-default text-primary-fg1-default hover:bg-primary-bg1-hover hover:text-primary-fg1-hover`
      : `${baseClasses} text-neutral-fg1-default hover:bg-neutral-bg1-hover active:bg-neutral-bg1-press`;
  };

  return (
    <aside className="p-4  bg-neutral-bg1-default border-r border-pt-neutral-t1-st5-default w-60">
      <nav>
        <ul className="flex h-screen flex-col gap-4 overflow-auto">
          {pages.map((item) => {
            const isActive = pathname === item.link;

            return (
              <li className="grid" key={item.link}>
                <Link
                  href={item.link}
                  aria-current={isActive ? "page" : undefined}
                  className={getLinkClasses(isActive)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
