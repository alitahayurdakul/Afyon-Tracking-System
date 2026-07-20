import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { EDIT_USER_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import compactStyles from "@/styles/components/users/UsersTableActionsCol.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditUserModalWrapper } from "./EditUserModalWrapper";

export const EditUsersModal = ({ id }: { id: string }) => {
  const t = useTranslations("users");
  const addQueryParam = useAddQueryParam();
  const modalName = `${EDIT_USER_MODAL}_${id}`;
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === modalName;

  return (
    <>
      <button
        className={clsx(styles["edit-btn"], compactStyles["compact-btn"])}
        onClick={() => addQueryParam("modal", `${EDIT_USER_MODAL}_${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {isOpen && <EditUserModalWrapper id={id} />}
    </>
  );
};
