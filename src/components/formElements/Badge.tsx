import clsx from "clsx";

import SpinnerIcon from "@/components/icons/SpinnerIcon";
import styles from "@/styles/components/formElements/Badge.module.scss";

interface BadgeProps {
  count?: number | string;
  className?: string;
  loading?: boolean;
}

export const Badge = ({ count, className, loading }: BadgeProps) => {
  return (
    <div className={clsx(styles["badge-content"], className)}>
      {loading ? <SpinnerIcon width={20} height={20} /> : count}
    </div>
  );
};
