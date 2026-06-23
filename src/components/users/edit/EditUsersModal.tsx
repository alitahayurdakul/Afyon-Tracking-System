import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/common/TableListBody.module.scss";
import compactStyles from "@/styles/components/users/UsersTableActionsCol.module.scss";
import clsx from "clsx";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { EditUserForm } from "./EditUserForm";
import { EDIT_USER_MODAL } from "@/consts/modals";
import { useGetUserDetailDataQuery } from "@/api/queries/useGetUsersQueries";

export const EditUsersModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isFetching } = useGetUserDetailDataQuery(id);

  return (
    <>
      <button
        className={clsx(styles["edit-btn"], compactStyles["compact-btn"])}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `${EDIT_USER_MODAL}_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>Güncelle</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_USER_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title="Kullanıcı Bilgilerini Güncelle"
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditUserForm id={id} data={data ?? undefined} />
        </Modal>
      )}
    </>
  );
};
