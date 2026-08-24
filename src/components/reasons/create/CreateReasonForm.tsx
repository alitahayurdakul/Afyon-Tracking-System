"use client";


import React from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IReasonFormDataTypes } from "@/types/reasonsTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { ReasonFormValidation } from "@/utils/validations/reasonFormValidation";

import styles from "@/styles/components/reasons/ReasonForm.module.scss";

export const CreateReasonForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
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

  const onSubmit: SubmitHandler<IReasonFormDataTypes> = async (data) => {
    try {
      const params = {
        name: data.name,
        description: data.desc,
        creator: currentUserName,
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
      dispatch(addTriggerTable("reasons"));
      reset();
      removeModal();
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.create.error")),
          type: "error",
          icon: "close",
          id: "createReason" + Date.now(),
        }),
      );
    }
  };

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
