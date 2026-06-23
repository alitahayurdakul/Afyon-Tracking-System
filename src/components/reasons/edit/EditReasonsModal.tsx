import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { EditReasonForm } from "./EditReasonForm";
import { EDIT_REASON_MODAL } from "@/consts/modals";
import { useGetReasonDetailDataQuery } from "@/api/queries/useGetReasonsQueries";

export const EditReasonsModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isFetching } = useGetReasonDetailDataQuery(id);

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `${EDIT_REASON_MODAL}_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>Güncelle</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_REASON_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title="Sebep Bilgilerini Güncelle"
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditReasonForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
