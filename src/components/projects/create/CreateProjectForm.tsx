"use client";
/* eslint-disable */

import styles from "@/styles/components/projects/ProjectForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProjectFormValidation } from "@/utils/validations/projectFormValidation";
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
        label="Proje Adı"
        name="name"
        placeholder="Proje adı giriniz"
        required
        maxLength={120}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label="Proje Kodu"
        name="code"
        placeholder="Proje kodu giriniz"
        required
        maxLength={50}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label="Durum"
        name="status"
        placeholder="Durum seçiniz"
        required
        options={PROJECT_STATUS_OPTIONS}
      />
      <TextAreaBox
        control={control as any}
        label="Açıklama"
        {...register("desc")}
        rows={5}
        placeholder="Açıklama giriniz"
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />
      <div className={styles["btn-group"]}>
        <Button
          clickFn={onCancel}
          type="simple"
          className={styles["cancel-btn"]}
          label="İptal"
          disabled={isSubmitting}
        />

        <Button
          clickFn={handleSubmit(onSubmit)}
          type="simple"
          className={styles["submit-btn"]}
          label="Kaydet"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
