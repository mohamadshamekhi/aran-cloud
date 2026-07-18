"use client"
import React from "react";
import Icon from "../icon/Icon";

function Pagination({
  current,
  total,
  onChange,
  disable,
}: {
  onChange: (page: number) => void;
  current: number;
  total: number;
  disable?: boolean;
}) {
  const baseClass =
    "w-8 h-8 rounded-md flex items-center justify-center text-body-2-strong  disabled:cursor-not-allowed";
  const defaultClass =
    "cursor-pointer  not-disabled:active:bg-neutral-bg1-press not-disabled:active:text-neutral-fg1-press disabled:text-neutral-fg1-disable  text-neutral-fg1-default not-disabled:hover:bg-neutral-bg1-hover not-disabled:hover:text-neutral-fg1-hover";
  const activeClass =
    "bg-primary-bg2-default disabled:bg-primary-bg2-disable text-neutral-fg3-default";

  const getPageNumbers = () => {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", total);
      } else if (current > total - 3) {
        pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }
    return pages;
  };

  return (
    <div
      aria-disabled={disable}
      className="flex gap-3 border border-neutral-st2-default p-1 rounded-md aria-disabled:border-neutral-st2-disable"
    >
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1 || disable}
        className={`${baseClass} ${defaultClass} `}
      >
        <Icon name="chevron-left" />
      </button>

      {getPageNumbers().map((p, i) => (
        <button
          key={i}
          disabled={p === "..." || disable}
          onClick={() => typeof p === "number" && onChange(p)}
          className={`${baseClass} ${
            p === current ? activeClass : defaultClass
          } ${p === "..." ? "cursor-default" : ""}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total || disable}
        className={`${baseClass} ${defaultClass} `}
      >
        <Icon name="chevron-right" />
      </button>
    </div>
  );
}

export default Pagination;
