import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/roles/RoleListBody.module.scss";
import compactStyles from "@/styles/components/roles/RolesTableActionsCol.module.scss";
import clsx from "clsx";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { EditRoleForm } from "./EditRoleForm";
import { EDIT_ROLE_MODAL } from "@/consts/modals";
import { useGetRoleDetailDataQuery } from "@/api/queries/useGetRolesQueries";

export const EditRolesModal = ({ id }: { id: string }) => {
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
        <span>Güncelle</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_ROLE_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title="Rol Bilgilerini Güncelle"
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
