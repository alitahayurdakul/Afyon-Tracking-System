import styles from '@/styles/components/common/ErrorChecker.module.scss';

interface IPropsTypes {
  noDataLabel?: string;
}

export const NoDataComponent = ({
  noDataLabel = "Herhangi bir içerik yoktur."
}: IPropsTypes) => {

  return (
    <div className={styles["error-container"]}>
      <p className={styles["title"]}>{noDataLabel}</p>
    </div>
  );
};
