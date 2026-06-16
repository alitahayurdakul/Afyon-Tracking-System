import { StageStatus } from "@/types/process";
import styles from "./StatusChip.module.scss";

const LABELS: Record<StageStatus, string> = {
  completed: "Tamamlandı",
  active: "Aktif",
  pending: "Bekliyor",
};

export default function StatusChip({ status }: { status: StageStatus }) {
  return <span className={`${styles.chip} ${styles[status]}`}>{LABELS[status]}</span>;
}
