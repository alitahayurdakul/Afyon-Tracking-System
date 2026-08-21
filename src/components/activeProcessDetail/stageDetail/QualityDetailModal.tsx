import { useTranslations } from "next-intl";

import { Modal } from "@/components/common/Modal";
import { ACTIVE_STAGE_DETAIL_MODAL } from "@/consts/modals";
import { IStage } from "@/types/processTypes";

import { QualityDetailModalContent } from "./qualityDetail/QualityDetailModalContent";

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
    <Modal
      name={`${ACTIVE_STAGE_DETAIL_MODAL}_${id}`}
      open
      width="900px"
      height="auto"
      title={`${t("stage-modal-header")} — ${stageName || ""}`}
      isCloseOutside={false}
      isCloseEsc={false}
    >
      <div className={styles.modal}>
        <QualityDetailModalContent
          stages={stages ?? []}
          entryId={entryId}
          stageStatus={stageStatus}
        />
      </div>
    </Modal>
  );
};

export default QualityDetailModal;
