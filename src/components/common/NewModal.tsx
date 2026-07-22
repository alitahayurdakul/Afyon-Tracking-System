"use client";

import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren, useRef } from "react";

import { useBodyScrollLock } from "@/api/queries/useBodyScrollLock";
import { NewSpinner } from "@/components/loaders/NewSpinner";
import styles from "@/styles/components/common/Modal.module.scss";
import {
  useAddQueryParam,
  useRemoveQueryParamModal,
} from "@/utils/searchParams";

const IconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 8.59824L16.3079 2.29031C16.695 1.90323 17.3226 1.90323 17.7097 2.29031C18.0968 2.6774 18.0968 3.30499 17.7097 3.69208L11.4018 10L17.7097 16.3079C18.0968 16.695 18.0968 17.3226 17.7097 17.7097C17.3226 18.0968 16.695 18.0968 16.3079 17.7097L10 11.4018L3.69208 17.7097C3.30499 18.0968 2.6774 18.0968 2.29031 17.7097C1.90323 17.3226 1.90323 16.695 2.29031 16.3079L8.59824 10L2.29031 3.69208C1.90323 3.30499 1.90323 2.6774 2.29031 2.29031C2.6774 1.90323 3.30499 1.90323 3.69208 2.29031L10 8.59824Z"
      fill="#262B2F"
    />
  </svg>
);

interface ModalProps {
  /** URL'deki ?modal=NAME değeriyle eşleşince modal açılır. */
  name?: string;
  title: string | React.ReactElement | false;
  className?: string;
  classNameContent?: string;
  classNameCloseIcon?: string;
  width?: string;
  height?: string;
  isCloseOutside?: boolean;
  isCloseEsc?: boolean;
  modalButton?: (clickFn: () => void) => React.ReactElement;
  footer?: (clickFn: () => void) => React.ReactElement;
  closeElement?: ((clickFn: () => void) => React.ReactElement) | false;
  mobilePosition?: "bottom" | "center";
  loading?: boolean;
  isDivider?: boolean;
  parentContainer?: HTMLElement;
  /** Modal kapanırken çalışacak temizlik callback'i (örn. form state reset). */
  closeFn?: () => void;
  titleClassName?: string;
  ignoreName?: boolean;
}

export const NewModal = ({
  name,
  title,
  children,
  className,
  classNameContent,
  classNameCloseIcon,
  width,
  height,
  isCloseOutside = false,
  isCloseEsc = false,
  closeElement,
  modalButton,
  footer,
  mobilePosition = "bottom",
  loading,
  parentContainer,
  isDivider = false,
  closeFn,
  titleClassName,
  ignoreName
}: PropsWithChildren<ModalProps>) => {
  const searchParams = useSearchParams();
  const addQueryParam = useAddQueryParam();
  const removeModal = useRemoveQueryParamModal();
  const ref = useRef<HTMLDivElement>(null);

  const visible = searchParams?.get("modal") === name || !!ignoreName;

  useBodyScrollLock(visible);

  const handleOpen = () => {
    name && addQueryParam("modal", name);
  };

  const handleClose = () => {
    removeModal();
    closeFn?.();
  };

  return (
    <>
      {modalButton && modalButton(handleOpen)}
      <Dialog.Root
        open={visible}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose();
        }}
      >
        <Dialog.Portal container={parentContainer}>
          <Dialog.Overlay className={styles["overlay"]} />

          <Dialog.Content
            ref={ref}
            aria-describedby={name}
            onPointerDownOutside={(e) => {
              if (!isCloseOutside) e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              if (!isCloseEsc) e.preventDefault();
            }}
            style={{ width, height }}
            className={clsx(
              {
                [styles["container"]]: mobilePosition === "bottom",
                [styles["container-center"]]: mobilePosition === "center",
              },
              className,
            )}
          >
            <NewSpinner className={styles["spinner"]} spin={loading}>
              {title && (
                <Dialog.Title className={clsx(styles["title"], titleClassName)}>
                  {title}
                </Dialog.Title>
              )}
              {isDivider && <div className={styles["divider-view"]} />}

              <div
                className={clsx(
                  { [classNameContent || ""]: classNameContent },
                  styles["content"],
                )}
              >
                {children}
                {footer ? (
                  <div className={styles["footer"]}>{footer(handleClose)}</div>
                ) : (
                  <div className={styles["footer"]} />
                )}
              </div>

              {closeElement !== false && (
                <Dialog.Close asChild>
                  {closeElement ? (
                    closeElement(handleClose)
                  ) : (
                    <button
                      type="button"
                      className={clsx(styles["close-btn"], classNameCloseIcon)}
                      onClick={handleClose}
                      aria-label="Close"
                    >
                      <IconClose />
                    </button>
                  )}
                </Dialog.Close>
              )}
            </NewSpinner>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
