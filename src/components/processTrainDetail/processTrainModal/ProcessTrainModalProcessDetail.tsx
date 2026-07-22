import { faChevronDown, faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useState } from "react";

import StagesInfo from "@/components/processHistory/sections/StagesInfo";
import styles from "@/styles/components/processTrainDetail/ProcessTrainModal.module.scss";
import { ProcessResponse } from "@/types/processTypes";
import { formatDate } from "@/utils/formDate";
import { getStatus } from "@/utils/getStatus";

import StatusBadge from "./StatusBadge";

export const ProcessTrainModalProcessDetail = ({
  processInfo,
}: {
  processInfo?: ProcessResponse;
}) => {
  const [expanded, setExpanded] = useState(false);

  const process = processInfo?.process;

  const timestamp = formatDate(
    process?.completedAt ?? process?.startedAt ?? process?.createdAt,
  );
  const t = useTranslations("processTrainDetail.modal");

  const wagonPosition =
    process?.wagonOrder && process?.totalWagonCount
      ? t.rich("wagon", {
          data: `${process.wagonOrder} / ${process.totalWagonCount}`,
        })
      : "-";

  return (
    <section className={styles.card}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className={styles.headerIcon}>
          <FontAwesomeIcon icon={faTrain} />
        </span>
        <span className={styles.headerText}>
          <span className={styles.headerTitle}>
            {process?.projectName ?? "-"}
          </span>
          <span className={styles.headerSubtitle}>
            {process?.wagonNo ?? "-"} · {wagonPosition} · {timestamp}
          </span>
        </span>
        <span className={styles.headerRight}>
          <StatusBadge status={getStatus(process?.status as string)} />
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}
          />
        </span>
      </button>
      {expanded && <StagesInfo stages={processInfo?.stages ?? []} />}
    </section>
  );
};

export default ProcessTrainModalProcessDetail;
