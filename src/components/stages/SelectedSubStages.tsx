"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/workflowList/SelectedStages.module.scss";
import { IOptionType } from "@/types/formTypes";

const activePaths = [
  {
    title: "Technical Validation",
    meta: "Node ID: STG-8812 • Priority: Critical",
    variant: "primary",
  },
  {
    title: "Legal Compliance Check",
    meta: "Node ID: STG-2290 • Priority: Medium",
    variant: "primary",
  },
];

interface IPropsTypes {
    selectedStages: IOptionType[];
    setValue: any;
}

export default function SelectedStages({selectedStages, setValue}: IPropsTypes) {
const onDeleteHandler = (value: string | number | boolean) => {
    const filteredStages = selectedStages.filter((stage: IOptionType) => stage.value !== value);
    setValue && setValue('stages', filteredStages)
}
  return (
    <div className={styles["selected-stages"]}>
      <label className={styles["section-label"]}>Seçilen Aşamalar</label>

      <div className={styles["path-list"]}>
        {selectedStages.length > 0 && selectedStages.map((stage: IOptionType, index: number) => (
          <div
            key={index}
            className={`${styles["path-card"]} ${styles.primary}`}
          >
            <div className={styles["path-left"]}>
              <div className={styles["path-icon"]}>
                <FontAwesomeIcon icon={faRoute} />
              </div>

              <p className={styles["path-title"]}>{stage.label}</p>
            </div>

            <button 
              type="button"
              className={styles["delete-path"]} 
              onClick={() => onDeleteHandler(stage.value)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
