"use client";


import React, { useCallback } from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";
import { ProjectQueryTypes } from "@/app/api/projects/route";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { PROJECT_STATUS_OPTIONS } from "@/consts/projectsConsts";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IOptionType } from "@/types/formTypes";
import { IProjectFormDataTypes } from "@/types/projectsTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { ProjectFormValidation } from "@/utils/validations/projectFormValidation";

import styles from "@/styles/components/projects/ProjectForm.module.scss";

export const CreateProjectForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const t = useTranslations("projects");
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<IProjectFormDataTypes>({
    resolver: yupResolver(ProjectFormValidation(tValidation)),
    defaultValues: {
      name: "",
      code: "",
      status: "",
      desc: "",
    },
  });

  const options = useCallback(() => {
    return PROJECT_STATUS_OPTIONS.map((s: IOptionType) => {
      return {
        value: s.value,
        label: t(`form.status.${s.label}`),
      };
    });
  }, [t, PROJECT_STATUS_OPTIONS]);

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IProjectFormDataTypes> = async (data) => {
    try {
      const params = {
        name: data.name,
        projectCode: data.code,
        status: data.status,
        description: data.desc,
        creator: currentUserName,
      };
      await axiosInstance.post(CLIENT_END_POINTS.project.create, {
        type: ProjectQueryTypes.createProject,
        params,
      });
      dispatch(
        addToastify({
          message: t("form.notifications.createSuccess"),
          type: "success",
          icon: "close",
          id: "createProject" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("projects"));
      reset();
      removeModal();
    } catch (err: any) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.createError")),
          type: "error",
          icon: "close",
          id: "createProject" + Date.now(),
        }),
      );
    }
  };

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
        options={options()}
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
