import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetTrainDetailDataQuery } from "@/api/queries/useGetTrainsQueries";
import { useGetWagonsOptionsQuery } from "@/api/queries/useGetWagonsQueries";
import { EDIT_TRAIN_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditTrainForm } from "./EditTrainForm";

export const EditTrainsModal = ({ id }: { id: string }) => {
  const t = useTranslations("trains");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);

  const { data, isLoading } = useGetTrainDetailDataQuery(id);
  const { data: wagonOptions, isLoading: wagonsLoading } =
    useGetWagonsOptionsQuery();

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
        <span>{t("actions.edit")}</span>
      </button>
      {!isLoading && !wagonsLoading && (
        <Modal
          name={`${EDIT_TRAIN_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditTrainForm id={id} data={data} wagonOptions = {wagonOptions} />
        </Modal>
      )}
    </>
  );
};
