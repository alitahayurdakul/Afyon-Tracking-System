"use client";
/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/reasons/ReasonForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IReasonFormDataTypes, IReasonType } from "@/types/reasonsTypes";
import { ReasonFormValidation } from "@/utils/validations/reasonFormValidation";
import React, { useCallback } from "react";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { addToastify } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { formatDate } from "@/utils/formDate";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { ReasonQueryTypes } from "@/app/api/reasons/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { useTranslations } from "next-intl";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";

interface IPropsTypes {
  id: string;
  data?: IReasonType;
}

export const EditReasonForm = ({ id, data }: IPropsTypes) => {
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<IReasonFormDataTypes>({
    resolver: yupResolver(ReasonFormValidation(tValidation)),
    defaultValues: {
      name: data?.name ?? "",
      desc: data?.description ?? "",
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
    async (formData) => {
      try {
        const params = {
          id,
          name: formData.name,
          description: formData.desc,
          editor: currentUserName,
        };
        await axiosInstance.post(CLIENT_END_POINTS.reason.edit, {
          type: ReasonQueryTypes.editReason,
          params,
        });
        dispatch(
          addToastify({
            message: t("notifications.edit.success"),
            type: "success",
            icon: "close",
            id: "editReason" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: (err as Error)?.message || t("notifications.edit.error"),
            type: "error",
            icon: "close",
            id: "editReason" + Date.now(),
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

      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.creator")}:</span>
          <span className={styles["activity-value"]}>
            {currentUserName}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.createdDate")}:</span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.editor")}:</span>
          <span className={styles["activity-value"]}>
            {data?.editor ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.labels.editedDate")}:
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />

        <span className={styles["info-text"]}>
          {t("notifications.edit.warning-message")}
        </span>
      </div>

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
