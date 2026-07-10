import { useTranslations } from "next-intl";

import styles from "@/components/activeProcessDetail/stageDetail/StageDetailModal.module.scss";
import { StatusEnums } from "@/utils/enum/commonEnums";
import { formatDate } from "@/utils/formDate";
import { getElapsedTime } from "@/utils/getElapsedTime";

interface IPropsTypes {
  startDate: string | null;
  endDate?: string | null;
  status: string;
}

const TimeSection = ({ startDate, endDate, status }: IPropsTypes) => {
  const t = useTranslations("activeProcessDetail");
  const date = new Date().toISOString();

  return (
    <section className={styles.section}>
      <h3>{t("section.time-section-header")}</h3>
      <div className={styles.timeRow}>
        <div className={styles.timeCol}>
          <label>
            <b>{t("start-date")}</b>
          </label>
          <label>{formatDate(startDate)}</label>
        </div>
        <div className={styles.timeCol}>
          <label>
            <b>{t("end-date")}</b>
          </label>
          <label>{status === StatusEnums.completed ? formatDate(endDate) : "-"}</label>
        </div>
        <div className={styles.timeCol}>
          <label>
            <b>{t("elapsed-time")}</b>
          </label>
          <label>
            {startDate
              ? getElapsedTime(
                  startDate ?? "",
                  (status === StatusEnums.completed ? endDate?.trim() : date) as string,
                )
              : "-"}
          </label>
        </div>
      </div>
    </section>
  );
};

export default TimeSection;
