import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  useId,
  forwardRef,
  useImperativeHandle,
} from "react";
import ModalHeader from "./ModalHeader";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import ModalFooter from "./ModalFooter";
import ModalContent from "./ModalContent";

const modalVariants = cva("bg-neutral-bg1-default rounded-lg", {
  variants: {
    size: {
      sm: "w-[456px]",
      md: "w-[600px]",
      lg: "w-[800px]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface BaseModalProps extends VariantProps<typeof modalVariants> {
  title: string;
  description: string;
  onApprove: () => void;
  trigger: ReactNode;
}

type ModalProps =
  | (BaseModalProps & {
      type: "error" | "success" | "delete";
      content: string;
    })
  | (BaseModalProps & {
      type: "custom";
      content: React.ReactNode;
    });

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(
  ({ description, title, size, type, onApprove, content, trigger }, ref) => {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    const close = useCallback(() => setOpen(false), []);
    const openModal = useCallback(() => setOpen(true), []);

    useImperativeHandle(ref, () => ({
      open: openModal,
      close,
    }));

    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, close]);

    useEffect(() => {
      if (!open) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [open]);

    useEffect(() => {
      if (open) {
        dialogRef.current?.focus();
      } else {
        triggerRef.current?.focus();
      }
    }, [open]);

    return (
      <>
        <div
          ref={triggerRef}
          role="button"
          tabIndex={0}
          onClick={openModal}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openModal();
            }
          }}
        >
          {trigger}
        </div>
        {open && (
          <section
            className="fixed flex z-9999999 justify-center items-center w-screen bg-[rgba(0,0,0,0.5)] h-screen top-0 left-0"
            onClick={close}
          >
            <section
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                modalVariants({
                  size,
                })
              )}
            >
              <ModalHeader title={title} description={description} />
              <ModalContent type={type} content={content} />
              <ModalFooter
                isDelete={type === "delete"}
                onClose={close}
                onApprove={onApprove}
              />
            </section>
          </section>
        )}
      </>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
