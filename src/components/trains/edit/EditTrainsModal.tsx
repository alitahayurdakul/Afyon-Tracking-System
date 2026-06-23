import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { useGetTrainDetailDataQuery } from "@/api/queries/useGetTrainsQueries";
import { EDIT_TRAIN_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditTrainForm } from "./EditTrainForm";

export const EditTrainsModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  const { data, isLoading } = useGetTrainDetailDataQuery(id);

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `${EDIT_TRAIN_MODAL}_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>Güncelle</span>
      </button>
      {!isLoading && (
        <Modal
          name={`${EDIT_TRAIN_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title="Tren Bilgilerini Güncelle"
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditTrainForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
