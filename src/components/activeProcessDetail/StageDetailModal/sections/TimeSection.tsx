import styles from "@/components/activeProcessDetail/StageDetailModal/StageDetailModal.module.scss";
import { formatDate } from "@/utils/formDate";
import { getElapsedTime } from "@/utils/getElapsedTime";

interface IPropsTypes {
  startDate: string | null;
  endDate?: string | null;
}

const TimeSection = ({ startDate, endDate }: IPropsTypes) => {
  const date = new Date().toISOString();

  return (
    <section className={styles.section}>
      <h3>Zaman bilgileri</h3>
      <div className={styles.timeRow}>
        <div className={styles.timeCol}>
          <label>
            <b>Başlangıç</b>
          </label>
          <label>{formatDate(startDate)}</label>
        </div>
        <div className={styles.timeCol}>
          <label>
            <b>Bitiş</b>
          </label>
          <label>{formatDate(endDate)}</label>
        </div>
        <div className={styles.timeCol}>
          <label>
            <b>Geçen Süre</b>
          </label>
          <label>
            {startDate ? getElapsedTime(startDate ?? "", endDate ?? date) : "-"}
          </label>
        </div>
      </div>
    </section>
  );
};

export default TimeSection;
