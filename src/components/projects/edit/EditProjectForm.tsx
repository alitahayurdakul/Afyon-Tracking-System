"use client";
/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/projects/ProjectForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProjectFormDataTypes, IProjectType } from "@/types/projectsTypes";
import { ProjectFormValidation } from "@/utils/validations/projectFormValidation";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { addToastify } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { formatDate } from "@/utils/formDate";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { ProjectQueryTypes } from "@/app/api/projects/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { PROJECT_STATUS_OPTIONS } from "@/consts/projectsConsts";

interface IPropsTypes {
  id: string;
  data?: IProjectType;
}

export const EditProjectForm = ({ id, data }: IPropsTypes) => {
  const t = useTranslations("projects.form");
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<IProjectFormDataTypes>({
    resolver: yupResolver(ProjectFormValidation()),
    defaultValues: {
      name: data?.name ?? "",
      code: data?.code ?? "",
      status: data?.status ?? "",
      desc: data?.description ?? "",
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IProjectFormDataTypes> = useCallback(
    async (formData) => {
      try {
        const params = {
          id,
          name: formData.name,
          code: formData.code,
          status: formData.status,
          description: formData.desc,
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.project.edit, {
          type: ProjectQueryTypes.editProject,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla güncellendi",
            type: "success",
            icon: "close",
            id: "editProject" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        removeModal();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err?.message ||
          "Güncelleme başarısız";
        dispatch(
          addToastify({
            message: errorMessage,
            type: "error",
            icon: "close",
            id: "editProject" + Date.now(),
          }),
        );
      }
    },
    [id],
  );

  return (
    <form className={styles["train-form"]}>
      <InputBox
        control={control as any}
        label={t("nameLabel")}
        name="name"
        placeholder={t("namePlaceholder")}
        required
        maxLength={120}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label={t("codeLabel")}
        name="code"
        placeholder={t("codePlaceholder")}
        required
        maxLength={50}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label={t("statusLabel")}
        name="status"
        placeholder={t("statusPlaceholder")}
        required
        options={PROJECT_STATUS_OPTIONS}
      />
      <TextAreaBox
        control={control as any}
        label={t("descriptionLabel")}
        {...register("desc")}
        rows={5}
        placeholder={t("descriptionPlaceholder")}
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />

      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>Oluşturan:</span>
          <span className={styles["activity-value"]}>
            {data?.creator || "Admin"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>Oluşturulma Tarihi:</span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>Son Güncelleyen:</span>
          <span className={styles["activity-value"]}>{data?.editor ?? "-"}</span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            Son Güncellenme Tarihi:
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]}>{t("editInfo")}</span>
      </div>

      <div className={styles["btn-group"]}>
        <Button
          clickFn={onCancel}
          type="simple"
          className={styles["cancel-btn"]}
          label={t("cancel")}
          disabled={isSubmitting}
        />

        <Button
          clickFn={handleSubmit(onSubmit)}
          type="simple"
          className={styles["submit-btn"]}
          label={t("save")}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
