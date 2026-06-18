import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/materials/MaterialListBody.module.scss";
import { Modal } from "../../common/Modal";
import { useAddQueryParam } from "@/utils/searchParams";
import { useState } from "react";
import { EditMaterialForm } from "./EditMaterialForm";
import { EDIT_MATERIAL_MODAL } from "@/consts/modals";
import { useGetMaterialDetailDataQuery } from "@/api/queries/useGetMaterialsQueries";

export const EditMaterialsModal = ({ id }: { id: string }) => {
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
        <span>Güncelle</span>
      </button>
      {!isFetching && (
        <Modal
          name={`${EDIT_MATERIAL_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title="Malzeme Bilgilerini Güncelle"
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
