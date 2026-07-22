import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EDIT_MATERIAL_MODAL } from "@/consts/modals";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditMaterialModalWrapper } from "./EditMaterialModalWrapper";

import styles from "@/styles/components/common/TableListBody.module.scss";

export const EditMaterialsModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const t = useTranslations("materials");
  const searchParams = useSearchParams();
  const modalName = `${EDIT_MATERIAL_MODAL}_${id}`;
  const isOpen = searchParams.get("modal") === modalName;

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", `${EDIT_MATERIAL_MODAL}_${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("buttons.edit")}</span>
      </button>
      {isOpen && <EditMaterialModalWrapper id={id} />}
    </>
  );
};
