"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { useGetProjectOptionsDataQuery } from "@/api/queries/useGetProjectsQueries";
import styles from "@/styles/components/activeProcesses/ActiveProcessesHeader.module.scss";
import {
  useAddQueryParam,
  useRemoveQueryParamModal,
} from "@/utils/searchParams";

import { SelectBox } from "../formElements/SelectBox";
import { StatusEnums } from "@/utils/enum/commonEnums";

export const ActiveProcessesHeader = ({activeUnit}: {activeUnit: string}) => {
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId") || "";
  const { control } = useForm<{ project: string }>({
    defaultValues: {
      project: projectId,
    },
  });
  const t = useTranslations("activeProcess");
  const { data: projectOptions, isLoading } = useGetProjectOptionsDataQuery(
    StatusEnums.active,
  );

  const addQueryParam = useAddQueryParam();
  const removeQueryParam = useRemoveQueryParamModal();

  const onChangeProjectSelect = useCallback(
    (selectedProject: string | null) => {
      if (selectedProject) {
        addQueryParam("projectId", selectedProject || "");
      } else {
        removeQueryParam("projectId");
      }
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
            options={projectOptions || []}
            control={control as any}
            placeholder={t("select-placeholder")}
            isSearchable
            isClearable
            loading={isLoading}
            changeExtraFn={onChangeProjectSelect}
            valueContainerStyles={{ fontSize: "14px" }}
            controlStyles={{ width: "250px" }}
          />
        </div>
        <div className={styles["stat-box"]}>
          <div className={styles["stat-item"]}>
            <span className={styles["label"]}>{t("active-unit-count")}</span>
            <span className={styles["value"]}>{activeUnit ?? "-"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
