"use client";
/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/subStages/SubStageForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ISubStageFormDataTypes,
  ISubStageMaterial,
  ISubStageType,
} from "@/types/subStagesTypes";
import { SubStageFormValidation } from "@/utils/validations/subStageFormValidation";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
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
import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IOptionType } from "@/types/formTypes";
import {
  useGetMaterialsDataQuery,
  useGetMaterialsOptionsDataQuery,
} from "@/api/queries/useGetMaterialsQueries";
import SelectedItemList from "@/components/common/SelectedItemList";

interface IPropsTypes {
  id: string;
  data?: ISubStageType;
}

export const EditSubStageForm = ({ id, data }: IPropsTypes) => {
  const t = useTranslations("subStages");
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ISubStageFormDataTypes>({
    resolver: yupResolver(SubStageFormValidation()),
    defaultValues: {
      name: data?.name ?? "",
      materials: (data?.materials ?? []).map((material: ISubStageMaterial) => ({
        label: material.name,
        value: material._id,
      })),
      desc: data?.description ?? "",
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();
  const { data: materialOptions } = useGetMaterialsOptionsDataQuery();

  const selectedMaterials = watch("materials");

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ISubStageFormDataTypes> = useCallback(
    async (formData) => {
      try {
        const params = {
          id,
          name: formData.name,
          materialIds: formData.materials.map(
            (material: IOptionType) => material.value,
          ),
          description: formData.desc,
          lastUpdatedBy: "Ali",
        };
        await axiosInstance.post(CLIENT_END_POINTS.subStage.edit, {
          type: SubStageQueryTypes.editSubStage,
          params,
        });
        dispatch(
          addToastify({
            message: t("form.notifications.editSuccess"),
            type: "success",
            icon: "close",
            id: "editSubStage" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        removeModal();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err?.message ||
          t("form.notifications.editError");
        dispatch(
          addToastify({
            message: errorMessage,
            type: "error",
            icon: "close",
            id: "editSubStage" + Date.now(),
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
        label={t("form.nameLabel")}
        name="name"
        placeholder={t("form.namePlaceholder")}
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label={t("form.materialsLabel")}
        name="materials"
        placeholder={t("form.materialsPlaceholder")}
        required
        options={materialOptions ?? []}
        isSearchable
        isClearable
        multiselect
        hideSelectedOptions
      />

      {selectedMaterials && selectedMaterials.length > 0 && (
        <SelectedItemList
          name="materials"
          selectedItems={selectedMaterials}
          setValue={setValue}
          title={t("form.selectedMaterials")}
        />
      )}

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

      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.creator")}
          </span>
          <span className={styles["activity-value"]}>
            {data?.creator || "Admin"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.createdAt")}
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.editor")}
          </span>
          <span className={styles["activity-value"]}>
            {data?.lastUpdatedBy ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.updatedAt")}
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]}>{t("form.editInfo")}</span>
      </div>

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
