"use client";
/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/materials/MaterialForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaterialFormDataTypes, IMaterialType } from "@/types/materialsTypes";
import { MaterialFormValidation } from "@/utils/validations/materialFormValidation";
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
import { MaterialQueryTypes } from "@/app/api/materials/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { useTranslations } from "next-intl";

interface IPropsTypes {
  id: string;
  data?: IMaterialType;
}

export const EditMaterialForm = ({ id, data }: IPropsTypes) => {
  const t = useTranslations("materials.form");
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<IMaterialFormDataTypes>({
    resolver: yupResolver(MaterialFormValidation()),
    defaultValues: {
      name: data?.name ?? "",
      code: data?.code ?? "",
      unit: data?.unit ?? "",
      stock: data?.stock != null ? String(data.stock) : "",
      desc: data?.description ?? "",
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IMaterialFormDataTypes> = useCallback(
    async (formData) => {
      try {
        const params = {
          id,
          name: formData.name,
          code: formData.code,
          unit: formData.unit,
          stock: Number(formData.stock),
          description: formData.desc,
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.material.edit, {
          type: MaterialQueryTypes.editMaterial,
          params,
        });
        dispatch(
          addToastify({
            message: t("notifications.editSuccess"),
            type: "success",
            icon: "close",
            id: "editMaterial" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        removeModal();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err?.message ||
          t("notifications.editError");
        dispatch(
          addToastify({
            message: errorMessage,
            type: "error",
            icon: "close",
            id: "editMaterial" + Date.now(),
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
        maxLength={100}
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
      <InputBox
        control={control as any}
        label={t("unitLabel")}
        name="unit"
        placeholder={t("unitPlaceholder")}
        required
        maxLength={20}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label={t("stockLabel")}
        name="stock"
        placeholder={t("stockPlaceholder")}
        required
        maxLength={10}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
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
          <span className={styles["activity-label"]}>{t("activity.creator")}</span>
          <span className={styles["activity-value"]}>
            {data?.creator || "Admin"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("activity.createdAt")}</span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("activity.editor")}</span>
          <span className={styles["activity-value"]}>{data?.editor ?? "-"}</span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("activity.updatedAt")}
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]} >
          {t("editInfo")}
        </span>
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
