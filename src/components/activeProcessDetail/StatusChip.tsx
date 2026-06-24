import { useTranslations } from "next-intl";

import { STATUS } from "@/consts/options";
import { StageStatus } from "@/types/activeProcessDetailTypes";
import { IStatusType } from "@/types/commonTypes";

import styles from "./StatusChip.module.scss";

export default function StatusChip({ status }: { status: number | string }) {
  const t = useTranslations("activeProcessDetail");
  
  const statusInfo: IStatusType | undefined =
    STATUS.find((s: IStatusType) => s.code === status);

  return (
    <span className={`${styles.chip} ${styles[statusInfo?.valueKey ?? ""]}`}>
      {statusInfo?.valueKey ? t(`status.${statusInfo.valueKey}`) : "-"}
    </span>
  );
}
