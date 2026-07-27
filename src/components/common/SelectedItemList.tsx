"use client";

import { useState } from "react";

import { faGripVertical, faRoute, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IOptionType } from "@/types/formTypes";

import styles from "@/styles/components/common/SelectedItemList.module.scss";

interface IPropsTypes {
  selectedItems: IOptionType[];
  pinnedItems?: IOptionType[];
  setValue: any;
  title: string;
  name: string;
}

export default function SelectedItemList({
  selectedItems,
  pinnedItems = [],
  setValue,
  title,
  name,
}: IPropsTypes) {
  const [items, setItems] = useState<IOptionType[]>(selectedItems);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  if (items !== selectedItems && dragIndex === null) {
    setItems(selectedItems);
  }

  const onDeleteHandler = (value: string | number | boolean) => {
    const filteredItems = selectedItems.filter(
      (item: IOptionType) => item.value !== value,
    );
    setValue && setValue(name, filteredItems);
  };

  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragEnter = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    setOverIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }

    const reordered = [...items];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);

    setItems(reordered);
    setValue && setValue(name, reordered);
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className={styles["selected-item-list"]}>
      <label className={styles["section-label"]}>{title}</label>

      <div className={styles["path-list"]}>
        {items.map((stage: IOptionType, index: number) => (
          <div
            key={stage.value as React.Key}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={`${styles["path-card"]} ${styles.primary} ${
              dragIndex === index ? styles.dragging : ""
            } ${overIndex === index ? styles["drag-over"] : ""}`}
          >
            <div className={styles["path-left"]}>
              <div className={styles["order-badge"]}>{index + 1}</div>
              <div className={styles["drag-handle"]}>
                <FontAwesomeIcon icon={faGripVertical} />
              </div>
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

      {pinnedItems.length > 0 && (
        <div className={styles["pinned-list"]}>
          {pinnedItems.map((stage: IOptionType) => (
            <div
              key={stage.value as React.Key}
              className={`${styles["path-card"]} ${styles.primary} ${styles.pinned}`}
            >
              <div className={styles["path-left"]}>
                 <div className={styles["order-badge"]}>{selectedItems.length + 1}</div>
                <div className={styles["path-icon"]}>
                  <FontAwesomeIcon icon={faRoute} />
                </div>
                <p className={styles["path-title"]}>{stage.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}