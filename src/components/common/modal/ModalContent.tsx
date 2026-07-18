import React, { ReactNode } from "react";
import Icon from "../icon/Icon";

const ModalContent = ({
  type,
  content,
}: {
  type: "error" | "success" | "custom" | "delete";
  content: ReactNode;
}) => {
  return (
    <div className="border-y p-6 border-neutral-st3-default">
      {type === "success" ? (
        <div className="flex  flex-col items-center">
          <div className="w-14 mb-2 h-14 flex justify-center bg-success-bg1-default text-success-fg1-default items-center rounded-full bg-bg">
            <Icon name="check-circle" />
          </div>
          <span className="text-neutral-fg1-default text-body-2">
            {content}
          </span>
        </div>
      ) : type === "error" || type === "delete" ? (
        <div className="flex  flex-col items-center">
          <div className="w-14 mb-2 h-14 flex justify-center bg-error-bg1-default text-error-fg1-default items-center rounded-full bg-bg">
            <Icon name="warning" />
          </div>
          <span className="text-neutral-fg1-default text-body-2">
            {content}
          </span>
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default ModalContent;
