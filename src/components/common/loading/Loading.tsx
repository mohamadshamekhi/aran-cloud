import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const Loading = () => {
  return (
    <div className="flex gap-2 items-center">
      <LoadingSpinner />
      <span className="text-body-2 text-neutral-fg2-default">loading...</span>
    </div>
  );
};

export default Loading;
