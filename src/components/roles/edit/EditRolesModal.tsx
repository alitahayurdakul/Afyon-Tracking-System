import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { EDIT_ROLE_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import compactStyles from "@/styles/components/roles/RolesTableActionsCol.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditRoleModalWrapper } from "./EditRoleModalWrapper";

export const EditRolesModal = ({ id }: { id: string }) => {
  const t = useTranslations("roles");
  const addQueryParam = useAddQueryParam();
  const searchParams = useSearchParams();
  const modalName = `${EDIT_ROLE_MODAL}_${id}`;
  const isOpen = searchParams.get("modal") === modalName;

  return (
    <>
      <button
        className={clsx(styles["edit-btn"], compactStyles["compact-btn"])}
        onClick={() => addQueryParam("modal", `${EDIT_ROLE_MODAL}_${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {isOpen && <EditRoleModalWrapper id={id} />}
    </>
  );
};
