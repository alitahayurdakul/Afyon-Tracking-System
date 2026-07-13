
import {
  faBox,
  faClock,
  faFlag,
  faPlay,
  faRoute,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProcessInstance } from '@/types/processTypes'
import styles from "@/styles/components/processHistory/ModalContent.module.scss";
import { formatDate } from "@/utils/formDate";
import { getElapsedTime } from "@/utils/getElapsedTime";
import { useTranslations } from "next-intl";

const ProcessInfo = ({processInfo}: {processInfo: IProcessInstance}) => {
    const t = useTranslations("processHistory");
  return (
    <div className={styles.body}>
          <div className={styles.projectRow}>
            <span className={styles.projectName}>
              {processInfo.projectName}
            </span>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <FontAwesomeIcon icon={faTrain} />
              <span>{t("modalProcessInfo.train")}</span>
              <strong>{processInfo.locomotiveNo}</strong>
            </div>
            <div className={styles.divider} />
            <div className={styles.metaItem}>
              <FontAwesomeIcon icon={faBox} />
              <span>{t("modalProcessInfo.wagon")}</span>
              <strong>{processInfo.wagonNo}</strong>
            </div>
            <div className={styles.divider} />
            <div className={styles.metaItem}>
              <FontAwesomeIcon icon={faRoute} />
              <strong>{processInfo.workflowName}</strong>
            </div>
          </div>

          <p className={styles.sectionLabel}>
            {t("modalProcessInfo.timeline")}
          </p>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>
                <FontAwesomeIcon icon={faPlay} />
                {t("modalProcessInfo.start")}
              </p>
              <p className={styles.metricValue}>
                {formatDate(processInfo.startedAt)}
              </p>
              {/* <p className={styles.metricSub}>{start.date}</p> */}
            </div>

            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>
                <FontAwesomeIcon icon={faFlag} />
                {t("modalProcessInfo.end")}
              </p>
              <p className={styles.metricValue}>
                {formatDate(processInfo.completedAt)}
              </p>
            </div>

            <div className={`${styles.metricCard} ${styles.metricCardAccent}`}>
              <p className={styles.metricLabel}>
                <FontAwesomeIcon icon={faClock} />
                {t("modalProcessInfo.totalDuration")}
              </p>
              <p className={styles.metricValue}>
                {getElapsedTime(
                  processInfo.startedAt ?? "",
                  processInfo.completedAt ?? "",
                )}
              </p>
            </div>
          </div>
        </div>
  )
}

export default ProcessInfo
