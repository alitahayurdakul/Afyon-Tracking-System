"use client";
/* eslint-disable */

import styles from "@/styles/components/subStages/SubStageForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubStageFormValidation } from "@/utils/validations/subStageFormValidation";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { ISubStageFormDataTypes } from "@/types/subStagesTypes";
import { IOptionType } from "@/types/formTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { useGetMaterialsDataQuery, useGetMaterialsOptionsDataQuery } from "@/api/queries/useGetMaterialsQueries";
import SelectedItemList from "@/components/common/SelectedItemList";
import { extractApiError } from "@/utils/extractApiError";

export const CreateSubStageForm = () => {
  const t = useTranslations("subStages");
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ISubStageFormDataTypes>({
    resolver: yupResolver(SubStageFormValidation()),
    defaultValues: {
      name: "",
      materials: [],
      desc: "",
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();
  const {data: materialOptions} = useGetMaterialsOptionsDataQuery();

  const selectedMaterials = watch("materials");

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ISubStageFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          name: data.name,
          materialIds: data.materials.map((material: IOptionType) => material.value),
          description: data.desc,
          editor: "Admin",
        };

        await axiosInstance.post(CLIENT_END_POINTS.subStage.create, {
          type: SubStageQueryTypes.createSubStage,
          params,
        });
        dispatch(
          addToastify({
            message: t("form.notifications.createSuccess"),
            type: "success",
            icon: "close",
            id: "createSubStage" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err: any) {
        dispatch(
          addToastify({
            message: extractApiError(err, t("form.notifications.createError")),
            type: "error",
            icon: "close",
            id: "createSubStage" + Date.now(),
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
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
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
