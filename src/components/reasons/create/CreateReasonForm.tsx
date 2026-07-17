"use client";
/* eslint-disable */

import styles from "@/styles/components/reasons/ReasonForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReasonFormValidation } from "@/utils/validations/reasonFormValidation";
import React, { useCallback } from "react";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IReasonFormDataTypes } from "@/types/reasonsTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { useTranslations } from "next-intl";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";

export const CreateReasonForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IReasonFormDataTypes>({
    resolver: yupResolver(ReasonFormValidation(tValidation)),
    defaultValues: {
      name: "",
      desc: "",
    },
  });

  const t = useTranslations("delayReasons");
  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IReasonFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          name: data.name,
          description: data.desc,
          // Backend, gecikme nedeni şemasında "creator" tutmuyor; oluşturmada
          // zorunlu alan olarak "editor" bekliyor
          editor: currentUserName,
        };
        await axiosInstance.post(CLIENT_END_POINTS.reason.create, {
          type: ReasonQueryTypes.createReason,
          params,
        });
        dispatch(
          addToastify({
            message: t("notifications.create.success"),
            type: "success",
            icon: "close",
            id: "createReason" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: (err as Error)?.message || t("notifications.create.error"),
            type: "error",
            icon: "close",
            id: "createReason" + Date.now(),
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
        label={t("form.labels.name")}
        name="name"
        placeholder={t("form.placeholders.name")}
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <TextAreaBox
        control={control as any}
        label={t("form.labels.description")}
        {...register("desc")}
        required
        rows={5}
        placeholder={t("form.placeholders.description")}
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />
      <div className={styles["btn-group"]}>
        <Button
          clickFn={onCancel}
          type="simple"
          className={styles["cancel-btn"]}
          label={t("form.buttons.cancel")}
          disabled={isSubmitting}
        />

        <Button
          clickFn={handleSubmit(onSubmit)}
          type="simple"
          className={styles["submit-btn"]}
          label={t("form.buttons.save")}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
