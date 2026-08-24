import React from "react";
import { useDispatch } from "react-redux";

import * as Toast from "@radix-ui/react-toast";

import { IToastElement, removeToastify } from "@/redux/slices/toastSlice";
import { getIcon, getLink } from "@/utils/toastUtils";

import styles from "@/styles/components/notifications/NotificationProvider.module.scss";
import successStyles from "@/styles/components/notifications/SuccessNotification.module.scss";

interface SuccessNotificationElementProps {
  toast: IToastElement;
}

export const SuccessNotificationElement = ({
  toast
}: SuccessNotificationElementProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const handleOpenChange = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(removeToastify(toast.id));
    }, 1000);
  };

  return (
    <>
      <Toast.Root
        duration={(toast.deadTime || 3) * 1000}
        className={styles["ToastRoot"]}
        open={open}
        onPause={() => {}}
        onOpenChange={handleOpenChange}
      >
        <Toast.Title className={successStyles["ToastTitle"]}>
          <div className={successStyles["success-icon"]}>
            {getIcon("success")}
          </div>
          <span className={toast.titleClassName ? toast.titleClassName : ""}>
            {toast.message}
          </span>

          {toast.link ? (
            <div className={styles["link-button"]}>
              {getLink(toast.link)}
            </div>
          ) : null}
          {toast.isClose !== false ? (
            <Toast.Action
              className={successStyles["ToastAction"]}
              asChild
              altText="Close"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={styles["close-btn"]}
              >
                <IconClose />
              </button>
            </Toast.Action>
          ) : null}
        </Toast.Title>
        {/* <Toast.Description asChild>{toast.message}</Toast.Description> */}
      </Toast.Root>
    </>
  );
};

const IconClose = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5303 6.53033C18.8232 6.23744 18.8232 5.76256 18.5303 5.46967C18.2374 5.17678 17.7626 5.17678 17.4697 5.46967L12 10.9393L6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L10.9393 12L5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L12 13.0607L17.4697 18.5303C17.7626 18.8232 18.2374 18.8232 18.5303 18.5303C18.8232 18.2374 18.8232 17.7626 18.5303 17.4697L13.0607 12L18.5303 6.53033Z"
        fill="#42525E"
      />
    </svg>
  );
};
