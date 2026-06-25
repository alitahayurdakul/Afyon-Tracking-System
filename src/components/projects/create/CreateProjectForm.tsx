"use client";
/* eslint-disable */

import styles from "@/styles/components/projects/ProjectForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProjectFormValidation } from "@/utils/validations/projectFormValidation";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IProjectFormDataTypes } from "@/types/projectsTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { ProjectQueryTypes } from "@/app/api/projects/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { PROJECT_STATUS_OPTIONS } from "@/consts/projectsConsts";

export const CreateProjectForm = () => {
  const t = useTranslations("projects");
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<IProjectFormDataTypes>({
    resolver: yupResolver(ProjectFormValidation()),
    defaultValues: {
      name: "",
      code: "",
      status: "",
      desc: "",
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IProjectFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          name: data.name,
          code: data.code,
          status: data.status,
          description: data.desc,
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.project.create, {
          type: ProjectQueryTypes.createProject,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla oluşturuldu",
            type: "success",
            icon: "close",
            id: "createProject" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err?.message ||
          "Oluşturma başarısız";
        dispatch(
          addToastify({
            message: errorMessage,
            type: "error",
            icon: "close",
            id: "createProject" + Date.now(),
          }),
        );
      }
    },
    [],
  );

  return (
    <form className={styles["train-form"]}>
      <InputBox
        control={control as any}
        label={t("form.nameLabel")}
        name="name"
        placeholder={t("form.namePlaceholder")}
        required
        maxLength={120}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label={t("form.codeLabel")}
        name="code"
        placeholder={t("form.codePlaceholder")}
        required
        maxLength={50}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label={t("form.statusLabel")}
        name="status"
        placeholder={t("form.statusPlaceholder")}
        required
        options={PROJECT_STATUS_OPTIONS}
      />
      <TextAreaBox
        control={control as any}
        label={t("form.descriptionLabel")}
        {...register("desc")}
        rows={5}
        placeholder={t("form.descriptionPlaceholder")}
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />
      <div className={styles["btn-group"]}>
        <Button
          clickFn={onCancel}
          type="simple"
          className={styles["cancel-btn"]}
          label={t("form.cancel")}
          disabled={isSubmitting}
        />

        <Button
          clickFn={handleSubmit(onSubmit)}
          type="simple"
          className={styles["submit-btn"]}
          label={t("form.save")}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
