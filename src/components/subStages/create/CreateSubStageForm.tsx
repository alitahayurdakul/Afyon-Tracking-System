"use client";
/* eslint-disable */

import styles from "@/styles/components/subStages/SubStageForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubStageFormValidation } from "@/utils/validations/subStageFormValidation";
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
import { useGetMaterialsDataQuery } from "@/api/queries/useGetMaterialsQueries";
import SelectedItemList from "@/components/common/SelectedItemList";

export const CreateSubStageForm = () => {
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
    async (data) => {
      try {
        const params = {
          name: data.name,
          materials: data.materials.map((material: IOptionType) => ({
            value: material.value,
            label: material.label,
          })),
          description: data.desc,
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.subStage.create, {
          type: SubStageQueryTypes.createSubStage,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla oluşturuldu",
            type: "success",
            icon: "close",
            id: "createSubStage" + Date.now(),
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
        label="Alt Aşama Adı"
        name="name"
        placeholder="Alt aşama adı giriniz"
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label="Malzemeler"
        name="materials"
        placeholder="Malzeme seçiniz"
        required
        options={materialOptions}
        isSearchable
        isClearable
        multiselect
        hideSelectedOptions
      />

      {selectedMaterials && selectedMaterials.length > 0 && (
        <SelectedItemList
          selectedItems={selectedMaterials}
          setValue={setValue}
          title="Seçilen Malzemeler"
        />
      )}

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
