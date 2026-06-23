import clsx from "clsx";
import Skeleton from "react-loading-skeleton";

import styles from "@/styles/components/common/Skeleton.module.scss";

interface ISkeletonTypes {
  width?: string;
  height?: string;
  className?: string;
  baseColor?: string;
  highlightColor?: string;
  duration?: number;
}

export const SkeletonContainer = ({
  width = "100px",
  height = "100%",
  className,
  baseColor = "var(--slate-20)",
  highlightColor = "var(--slate-40)",
  duration = 2,
}: ISkeletonTypes) => {
  return (
    <Skeleton
      width={width}
      height={height}
      className={clsx(styles.skeleton, {
        [className as string]: className,
      })}
      duration={duration}
      baseColor={baseColor}
      highlightColor={highlightColor}
    />
  );
};
