import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetMaterialDetailDataQuery } from "@/api/queries/useGetMaterialsQueries";
import { EDIT_MATERIAL_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { Modal } from "../../common/Modal";
import { EditMaterialForm } from "./EditMaterialForm";

export const EditMaterialsModal = ({ id }: { id: string }) => {
  const t = useTranslations("materials");
  const addQueryParam = useAddQueryParam();
  const [open, setOpen] = useState<boolean | undefined>(false);
  const { data, isFetching } = useGetMaterialDetailDataQuery(id);

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => {
          if (!open) {
            addQueryParam("modal", `${EDIT_MATERIAL_MODAL}_${id}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("actions.edit")}</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_MATERIAL_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
          enableParams={true}
          open={open}
          setOpen={setOpen}
        >
          <EditMaterialForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
