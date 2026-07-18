import Link from "next/link";
import React, { forwardRef } from "react";

interface LinkButtonProps {
  href: string;
  title: string;
  disable?: boolean;
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ href, title, disable }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        aria-disabled={disable}
        tabIndex={disable ? -1 : undefined}
        data-disable={disable}
        className="text-body-2-strong text-info-fg1-default not-data-disable:hover:text-info-fg1-hover not-data-disable:active:text-info-fg1-press data-disable:text-info-fg1-disable data-disable:cursor-not-allowed "
      >
        {title}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
