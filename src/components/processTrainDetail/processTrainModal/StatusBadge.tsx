import { useTranslations } from "next-intl";

import styles from "@/styles/components/processTrainDetail/ProcessTrainModal.module.scss";

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations("processTrainDetail.modal");
  const map: Record<string, string> = {
    active: styles.badgeProgress,
    completed: styles.badgeDone,
  };
  return (
    <span className={`${styles.badge} ${map[status] ?? styles.badgePending}`}>
      {t(status)}
    </span>
  );
}

export default StatusBadge;
