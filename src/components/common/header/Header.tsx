/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/utils/auth-action";

const Header = () => {
  const navigate = useRouter();
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    setUserDetail(JSON.parse(localStorage.user));
  }, []);

  return (
    <header className="flex py-3 bg-neutral-bg1-default px-6 border-b border-neutral-st3-default  items-center">
      <div className="flex-1/3">
        <span className="text-body-2 text-neutral-fg1-default">Welcome </span>
        <span className="text-body-2-strong text-neutral-fg1-default">
          {userDetail?.firstName}
        </span>
      </div>
      <div className="flex-1/3 flex justify-center">
        <span className="h-10 text-neutral-fg1-default text-body-1 bg-neutral-bg2-default rounded-sm flex items-center px-3">
          Arvancloud Challenge
        </span>
      </div>

      <div className="flex-1/3 flex justify-end">
        <div className="w-fit">
          <Button
            onClick={() => {
              signOutAction();
              navigate.push("/sign-in");
            }}
            title="Log out"
            variant="secondary"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
