import * as Toast from "@radix-ui/react-toast";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearToastify } from "@/redux/slices/toastSlice";
import { RootState } from "@/redux/store";
import styles from "@/styles/components/notifications/NotificationProvider.module.scss";

import { ErrorNotificationElement } from "./ErrorNotification";
import { SuccessNotificationElement } from "./SuccessNotification";

const NotificationProvider = () => {
  const toasts = useSelector((state: RootState) => state.toast.elements);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(clearToastify());
  }, [dispatch, pathname]);

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast: any) => {
        if (toast.type === "error") {
          return <ErrorNotificationElement key={toast.id} toast={toast} />;
        } else if (toast.type === "success") {
          return <SuccessNotificationElement key={toast.id} toast={toast} />;
        } else {
          return <SuccessNotificationElement key={toast.id} toast={toast} />;
        }
      })}

      <Toast.Viewport className={styles["ToastViewport"]} />
    </Toast.Provider>
  );
};

export default NotificationProvider;
