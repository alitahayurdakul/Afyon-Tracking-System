import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { EDIT_WAGON_MODAL } from "@/consts/modals";
import styles from "@/styles/components/common/TableListBody.module.scss";
import { useAddQueryParam } from "@/utils/searchParams";

import { EditWagonModalWrapper } from "./EditWagonModalWrapper";

export const EditWagonsModal = ({ id }: { id: string }) => {
  const addQueryParam = useAddQueryParam();
  const t = useTranslations("wagons");
  const searchParams = useSearchParams();
  const modalName = `${EDIT_WAGON_MODAL}_${id}`;
  const isOpen = searchParams?.get("modal") === modalName;

  return (
    <>
      <button
        className={styles["edit-btn"]}
        onClick={() => addQueryParam("modal", modalName)}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>{t("buttons.edit")}</span>
      </button>
      {isOpen && <EditWagonModalWrapper id={id} />}
    </>
  );
};
