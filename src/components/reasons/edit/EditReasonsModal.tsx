import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetReasonDetailDataQuery } from "@/api/queries/useGetReasonsQueries";
import { EDIT_REASON_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditReasonForm } from "./EditReasonForm";

export const EditReasonsModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isFetching } = useGetReasonDetailDataQuery(id);
  const t = useTranslations("delayReasons");

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
        <span>{t("buttons.edit")}</span>
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
