"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/workflowList/SelectedStages.module.scss";
import { IOptionType } from "@/types/formTypes";

interface IPropsTypes {
  selectedMaterials: IOptionType[];
  setValue: any;
}

export default function SelectedMaterials({
  selectedMaterials,
  setValue,
}: IPropsTypes) {
  const onDeleteHandler = (value: string | number | boolean) => {
    const filtered = selectedMaterials.filter(
      (material: IOptionType) => material.value !== value,
    );
    setValue && setValue("materials", filtered);
  };

  return (
    <div className={styles["selected-stages"]}>
      <label className={styles["section-label"]}>Seçilen Malzemeler</label>

      <div className={styles["path-list"]}>
        {selectedMaterials.length > 0 &&
          selectedMaterials.map((material: IOptionType, index: number) => (
            <div
              key={index}
              className={`${styles["path-card"]} ${styles.primary}`}
            >
              <div className={styles["path-left"]}>
                <div className={styles["path-icon"]}>
                  <FontAwesomeIcon icon={faBoxOpen} />
                </div>

                <p className={styles["path-title"]}>{material.label}</p>
              </div>

              <button
                type="button"
                className={styles["delete-path"]}
                onClick={() => onDeleteHandler(material.value)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
