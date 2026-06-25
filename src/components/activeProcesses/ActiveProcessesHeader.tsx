"use client";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import styles from "@/styles/components/activeProcesses/ActiveProcessesHeader.module.scss";

import { SelectBox } from "../formElements/SelectBox";

export const ActiveProcessesHeader = () => {
  const { control } = useForm();
  const t = useTranslations("activeProcess");

  const onChangeProjectSelect = useCallback(
    (selectedProject: string | null) => {
      console.log("Selected Project:", selectedProject);
    },
    [],
  );

  return (
    <section className={styles["active-processes-header"]}>
      <div className={styles["title"]}>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
      </div>

      <div className={styles["right-side"]}>
        <div>
          <SelectBox
            key="project-select"
            name="project"
            options={[
              { value: "project1", label: "Proje 1" },
              { value: "project2", label: "Proje 2" },
            ]}
            control={control}
            placeholder={t("select-placeholder")}
            formLabelClassName={styles["form-label"]}
            isSearchable
            isClearable
            // loading={isLoading}
            changeExtraFn={onChangeProjectSelect}
          />
        </div>
        <div className={styles["stat-box"]}>
          <div className={styles["stat-item"]}>
            <span className={styles["label"]}>{t("active-unit-count")}</span>
            <span className={styles["value"]}>12</span>
          </div>
        </div>
      </div>
    </section>
  );
};
