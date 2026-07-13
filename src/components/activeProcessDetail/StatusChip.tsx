import { useTranslations } from "next-intl";

import { STATUS } from "@/consts/options";
import styles from "@/styles/components/activeProcessDetail/StatusChip.module.scss";
import { IStatusType, TFunction } from "@/types/commonTypes";

export default function StatusChip({ status, t }: { status: number | string, t: TFunction }) {
  
  const statusInfo: IStatusType | undefined =
    STATUS.find((s: IStatusType) => s.code === status);

  return (
    <span className={`${styles.chip} ${styles[statusInfo?.valueKey ?? ""]}`}>
      {statusInfo?.valueKey ? t(`status.${statusInfo.valueKey}`) : "-"}
    </span>
  );
}
