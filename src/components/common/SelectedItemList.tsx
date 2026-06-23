"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/components/common/SelectedItemList.module.scss";
import { IOptionType } from "@/types/formTypes";

interface IPropsTypes {
    selectedItems: IOptionType[];
    setValue: any;
    title:string;
    name: string;
}

export default function SelectedItemList({selectedItems, setValue, title, name}: IPropsTypes) {
const onDeleteHandler = (value: string | number | boolean) => {
    const filteredItems = selectedItems.filter((item: IOptionType) => item.value !== value);
    setValue && setValue(name, filteredItems)
}
  return (
    <div className={styles["selected-item-list"]}>
      <label className={styles["section-label"]}>{title}</label>

      <div className={styles["path-list"]}>
        {selectedItems.length > 0 && selectedItems.map((stage: IOptionType, index: number) => (
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
