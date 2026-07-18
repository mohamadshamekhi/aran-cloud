import React, { useState } from "react";
import Button from "../button/Button";

const ModalFooter = ({
  onApprove,
  onClose,
  isDelete,
}: {
  onApprove: () => void;
  onClose: () => void;
  isDelete: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="py-4 flex gap-4 justify-end px-6">
      {isDelete && (
        <Button
          className="w-fit"
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            onApprove();
          }}
          title="Delete"
          variant={"danger"}
        />
      )}
      <Button
        className="w-fit"
        onClick={onClose}
        title="Cancel"
        variant={"secondary"}
      />
      {!isDelete && (
        <Button
          className="w-fit"
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            onApprove();
          }}
          title="Confirm"
        />
      )}
    </div>
  );
};

export default ModalFooter;
