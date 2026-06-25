import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetRoleDetailDataQuery } from "@/api/queries/useGetRolesQueries";
import { EDIT_ROLE_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import compactStyles from "@/styles/components/roles/RolesTableActionsCol.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditRoleForm } from "./EditRoleForm";

export const EditRolesModal = ({ id }: { id: string }) => {
  const t = useTranslations("roles");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isFetching } = useGetRoleDetailDataQuery(id);

  return (
    <>
      <button
        className={clsx(styles["edit-btn"], compactStyles["compact-btn"])}
        onClick={() => {
          if (!open) addQueryParam("modal", `${EDIT_ROLE_MODAL}_${id}`);
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_ROLE_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditRoleForm id={id} data={data ?? undefined} />
        </Modal>
      )}
    </>
  );
};
