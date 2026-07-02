"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { useGetProjectOptionsDataQuery } from "@/api/queries/useGetProjectsQueries";
import { usePathname, useRouter } from "@/i18n/routing";
import styles from "@/styles/components/activeProcesses/ActiveProcessesHeader.module.scss";
import { IFilterType } from "@/types/filterTypes";
import { IOptionType } from "@/types/formTypes";
import {
  useAddQueryParam,
  useRemoveQueryParamModal,
} from "@/utils/searchParams";
import { toSearchParams } from "@/utils/toSearchParams";

import { SelectBox } from "../formElements/SelectBox";

export const ActiveProcessesHeader = () => {
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId") || "";
  const { control } = useForm<{ project: string }>({
    defaultValues: {
      project: projectId,
    },
  });
  const t = useTranslations("activeProcess");
  const { data: projectOptions } = useGetProjectOptionsDataQuery("ACTIVE");

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
