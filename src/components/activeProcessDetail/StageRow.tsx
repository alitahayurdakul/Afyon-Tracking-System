import { useTranslations } from "next-intl";

import { useStartStage } from "@/api/queries/useGetProcessesQueries";
import { IProcessEntry, IStage } from "@/types/processTypes";
import { StatusEnums } from "@/utils/enum/commonEnums";
import { formatDate } from "@/utils/formDate";
import { getStatus } from "@/utils/getStatus";

import { PopoverBody } from "../Popover";
import styles from "./ProcessFlow.module.scss";
import StageDetailModal from "./stageDetail/StageDetailModal";
import StatusChip from "./StatusChip";

interface StageRowProps {
  stage: IStage;
  index: number;
  isLast: boolean;
  entryForStage?: IProcessEntry;
  onOpenDetail: (stage: IStage) => void;
  entriesEqStages?: boolean;
  stages: IStage[]
}

export default function StageRow({
  stage,
  entryForStage,
  index,
  isLast,
  onOpenDetail,
  entriesEqStages,
  stages
}: StageRowProps) {
  const time = () => {
    const startTime = new Date(
      entryForStage?.startedAt ?? "2026-04-19T08:00:00Z",
    );
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const nodeLabel =
    getStatus(stage.status) === StatusEnums.completed ? "✓" : index + 1;
  const t = useTranslations("activeProcessDetail");

  const {
    mutate,
    isPending,
    isError: startStageError,
    error: startError,
  } = useStartStage();

  const startStage = async () => {
    const payload = {
      stageId: stage._id,
      operator: "Admin",
    };
    mutate(payload);
  };

  return (
    <div className={styles.row}>
      {!isLast && (
        <div
          className={`${styles.connector} ${styles[getStatus(stage.status)]}`}
        />
      )}

      <div className={`${styles.node} ${styles[getStatus(stage.status)]}`}>
        {nodeLabel}
      </div>

      <div
        className={`${styles.card} ${styles[getStatus(stage.status)]}`}
        onClick={() => onOpenDetail(stage)}
      >
        <div className={styles.cardLeft}>
          <span className={styles.cardName}>
            {stage.name}
            {entryForStage && entryForStage.endedAt && (
              <span className={styles.durationChip}>{time()}</span>
            )}
          </span>

          <div className={styles.cardMeta}>
            {getStatus(stage.status) === StatusEnums.completed && (
              <>
                <span>
                  {t("start-date")}: {formatDate(entryForStage?.startedAt)}
                </span>
                <span>
                  {t("end-date")}: {formatDate(entryForStage?.endedAt)}
                </span>
              </>
            )}
            {getStatus(stage.status) === "active" && (
              <>
                <span>
                  {t("start-date")} {formatDate(entryForStage?.startedAt)}
                </span>
                <span>{t("pending")}</span>
              </>
            )}
            {getStatus(stage.status) === "pending" && (
              <span>{t("not-yet-started")}</span>
            )}
          </div>
        </div>

        <div className={styles.cardRight}>
          <StatusChip status={stage.status as string} t={t} />
          {getStatus(stage.status) === "pending" ? (
            <PopoverBody
              alignOffset={-73}
              align="start"
              triggerBody={
                <div>
                  {
                      stage.stageId === "6a548d7444cc81ed74b22b6a" ?
                      entriesEqStages ? <button className={styles.startBtn}>
                      {t("buttons.start-stage")}
                    </button> : <></>
                      :
                    <button className={styles.startBtn}>
                      {t("buttons.start-stage")}
                    </button>
                  }
                </div>
              }
              contentBody={
                <div className={styles["content"]}>
                  <p className={styles["text"]}>
                    {t("buttons.questions.start-stage")}
                  </p>
                </div>
              }
              closeContainer={
                <div className={styles["btn-container"]}>
                  <button>{t("no")}</button>
                  <button onClick={startStage}>{t("yes")}</button>
                </div>
              }
            />
          ) : (
            <StageDetailModal
              id={stage._id}
              stageName={stage.name ?? ""}
              stageStatus={stage.status}
              entryId={entryForStage?._id ?? ""}
              isQuality={
                stage.stageId === "6a548d7444cc81ed74b22b6a" &&
                entriesEqStages
              }
              stages = {stages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
