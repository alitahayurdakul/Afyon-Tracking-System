import { useTranslations } from "next-intl";

import { NewModal } from "@/components/common/NewModal";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { IStage } from "@/types/processTypes";

import { QuantityDetailModalContent } from "./quantityDetail/QuantityDetailModalContent";

import styles from "./QualityDetailModal.module.scss";

const QualityDetailModal = ({
  id,
  stageName,
  entryId,
  stageStatus,
  stages,
}: {
  id: string;
  stageName: string;
  entryId: string;
  stageStatus: string;
  stages: IStage[];
}) => {
  const t = useTranslations("activeProcessDetail");

  return (
    <NewModal
      name={`${ACTIVE_STAGE_DETAIL_MODAL}_${id}`}
      width="900px"
      height="auto"
      title={`${t("stage-modal-header")} — ${stageName || ""}`}
      isCloseOutside={false}
      isCloseEsc={false}
    >
      <div className={styles.modal}>
        <QuantityDetailModalContent
          stages={stages ?? []}
          entryId={entryId}
          stageStatus={stageStatus}
        />
      </div>
    </NewModal>
  );
};

export default QualityDetailModal;
