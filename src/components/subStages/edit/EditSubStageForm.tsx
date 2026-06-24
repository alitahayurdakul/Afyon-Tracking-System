"use client";
/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/subStages/SubStageForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISubStageFormDataTypes, ISubStageType } from "@/types/subStagesTypes";
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
import { useGetMaterialsDataQuery } from "@/api/queries/useGetMaterialsQueries";
import SelectedItemList from "@/components/common/SelectedItemList";

interface IPropsTypes {
  id: string;
  data?: ISubStageType;
}

export const EditSubStageForm = ({ id, data }: IPropsTypes) => {
  const t = useTranslations("subStages.form");
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
      materials: (data?.materials ?? []).map((material) => ({
        label: material.label,
        value: material.value,
      })),
      desc: data?.description ?? "",
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();
  const { data: materialsData } = useGetMaterialsDataQuery();
  const materialOptions = useMemo(
    () =>
      (materialsData?.materials ?? []).map((material) => ({
        label: material.name,
        value: material._id,
      })),
    [materialsData],
  );

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
          materials: formData.materials.map((material: IOptionType) => ({
            value: material.value,
            label: material.label,
          })),
          description: formData.desc,
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.subStage.edit, {
          type: SubStageQueryTypes.editSubStage,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla güncellendi",
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
          "Güncelleme başarısız";
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
        label={t("nameLabel")}
        name="name"
        placeholder={t("namePlaceholder")}
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label={t("materialsLabel")}
        name="materials"
        placeholder={t("materialsPlaceholder")}
        required
        options={materialOptions}
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
          title={t("selectedMaterials")}
        />
      )}

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
