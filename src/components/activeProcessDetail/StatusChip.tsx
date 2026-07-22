import { STATUS } from "@/consts/options";
import { IStatusType, TFunction } from "@/types/commonTypes";

import styles from "@/styles/components/activeProcessDetail/StatusChip.module.scss";

export default function StatusChip({ status, t }: { status: number | string, t: TFunction }) {
  
  const statusInfo: IStatusType | undefined =
    STATUS.find((s: IStatusType) => s.code === status);

  return (
    <span className={`${styles.chip} ${styles[statusInfo?.valueKey ?? ""]}`}>
      {statusInfo?.valueKey ? t(`status.${statusInfo.valueKey}`) : "-"}
    </span>
  );
}
