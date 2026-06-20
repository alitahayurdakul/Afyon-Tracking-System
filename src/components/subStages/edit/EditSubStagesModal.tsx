import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/subStages/SubStageListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { EditSubStageForm } from "./EditSubStageForm";
import { EDIT_SUB_STAGE_MODAL } from "@/consts/modals";
import { useGetSubStageDetailDataQuery } from "@/api/queries/useGetSubStagesManageQueries";

export const EditSubStagesModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isFetching } = useGetSubStageDetailDataQuery(id);

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `${EDIT_SUB_STAGE_MODAL}_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>Güncelle</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_SUB_STAGE_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title="Alt Aşama Bilgilerini Güncelle"
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditSubStageForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
