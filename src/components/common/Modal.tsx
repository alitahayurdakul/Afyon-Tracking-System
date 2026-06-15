/* eslint-disable */

"use client";

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

import * as Dialog from "@radix-ui/react-dialog";

import { useAddQueryParam, useRemoveQueryParamModal } from "@/utils/searchParams";

import { NewSpinner } from "@/components/loaders/NewSpinner";

import styles from "@/styles/components/common/Modal.module.scss";

const IconClose = () => {
  return (
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
};

interface ModalProps {
  name: string;
  enableParams?: boolean;
  title: string | React.ReactElement | false;
  className?: string;
  classNameContent?: string;
  classNameCloseIcon?: string;
  width?: string;
  height?: string;
  isCloseOutside?: boolean;
  isCloseEsc?: boolean;
  forceMount?: boolean;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  toggleFn?: (value: boolean) => void;
  modalButton?: (
    clickFn: () => void,
    closeOnSuccess?: boolean
  ) => React.ReactElement;
  footer?: (clickFn: () => void) => React.ReactElement;
  closeElement?: ((clickFn: () => void) => React.ReactElement) | false;
  mobilePosition?: "bottom" | "center";
  loading?: boolean;
  isPortal?: boolean;
  isDivider?: boolean;
  parentContainer?: HTMLElement;
  closeFn?: () => void; // cb fn when modal is closed for like resetting state inside modal.
  titleClassName?: string;
}

export const Modal = ({
  name,
  title,
  children,
  className,
  classNameContent,
  classNameCloseIcon,
  width,
  height,
  isCloseOutside,
  isCloseEsc,
  closeElement,
  modalButton,
  footer,
  open,
  setOpen,
  toggleFn,
  enableParams = true,
  mobilePosition = "bottom",
  loading,
  isPortal,
  parentContainer,
  isDivider = false,
  closeFn,
  titleClassName
}: // height
PropsWithChildren<ModalProps>) => {
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState<boolean>();

  const removeModal = useRemoveQueryParamModal();
  const addQueryParam = useAddQueryParam();

  useEffect(() => {
    setVisible(modal === name || open || false);
  }, [modal, name, open]);

  const handleOpen = () => {
    setOpen && setOpen(true);
    toggleFn && toggleFn(true);
    if (enableParams) {
      addQueryParam("modal", name);
      setVisible(true);
    }
  };

  const handleClose = () => {
    enableParams && removeModal();

    setOpen && setOpen(false);
    toggleFn && toggleFn(false);
    closeFn && closeFn();
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 200);

      return () => clearTimeout(timer);
    } else {
      document.body.style.pointerEvents = "auto";
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `-${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [visible]);

  return (
    <>
      {modalButton && modalButton(handleOpen)}
      {visible && (
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
              onPointerDownOutside={(e) => e.preventDefault()}
              onInteractOutside={() => (isCloseOutside ? handleClose() : false)}
              onEscapeKeyDown={() => (isCloseEsc ? handleClose() : false)}
              style={{ width: width, height: height }}
              className={clsx(
                {
                  [styles["container"]]: mobilePosition === "bottom",
                  [styles["container-center"]]: mobilePosition === "center"
                },
                className
              )}
            >
              <NewSpinner className={styles["spinner"]} spin={loading}>
                {title && (
                  <Dialog.Title
                    className={clsx(
                      styles["title"],
                      titleClassName && titleClassName
                    )}
                  >
                    {title}
                  </Dialog.Title>
                )}
                {isDivider && <div className={styles["divider-view"]}></div>}

                <div
                  className={clsx(
                    { [classNameContent || ""]: classNameContent },
                    styles["content"]
                  )}
                >
                  {isPortal ? children : children}

                  {footer ? (
                    <div className={styles["footer"]}>
                      {footer(handleClose)}
                    </div>
                  ) : (
                    <div className={styles["footer"]}></div>
                  )}
                </div>
                {typeof closeElement === "boolean" && closeElement === false ? (
                  <> </>
                ) : (
                  <Dialog.Close asChild>
                    {closeElement ? (
                      <>{closeElement(handleClose)}</>
                    ) : (
                      <button
                        type="button"
                        className={clsx(
                          styles["close-btn"],
                          classNameCloseIcon
                        )}
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
      )}
    </>
  );
};
