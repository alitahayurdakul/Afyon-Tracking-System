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

interface IPropsTypes {
  id: string;
  data?: IReasonType;
}

export const EditReasonForm = ({ id, data }: IPropsTypes) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<IReasonFormDataTypes>({
    resolver: yupResolver(ReasonFormValidation()),
    defaultValues: {
      name: data?.name ?? "",
      desc: data?.description ?? "",
    },
  });

  const dispatch = useDispatch();
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
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.reason.edit, {
          type: ReasonQueryTypes.editReason,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla güncellendi",
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
            message: (err as Error)?.message || "Güncelleme başarısız",
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
        label="Sebep Başlığı"
        name="name"
        placeholder="Sebep başlığı giriniz"
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <TextAreaBox
        control={control as any}
        label="Açıklama"
        {...register("desc")}
        required
        rows={5}
        placeholder="Açıklama giriniz"
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
          <span className={styles["activity-value"]}>
            {data?.editor ?? "-"}
          </span>
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

      <div className={styles["info-alert"]}>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />

        <p>
          Sebep bilgilerini güncellemek ilişkili gecikme kayıtlarını ve
          raporları etkileyebilir. Kaydetmeden önce değişiklikleri kontrol
          ettiğinizden emin olun.
        </p>
      </div>

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
