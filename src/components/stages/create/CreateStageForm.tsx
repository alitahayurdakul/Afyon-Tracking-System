"use client";
/* eslint-disable */
import styles from "@/styles/components/stages/StageForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect } from "react";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { SelectBox } from "@/components/formElements/SelectBox";
import { axiosInstance } from "@/api/axiosInstance";
import { IStageFormDataTypes } from "@/types/stagesTypes";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { STAGE_FORM_CONSTS } from "@/consts/stagesConsts";
import { StageFormValidation } from "@/utils/validations/stageFormValidation";
import { CheckBox } from "@/components/formElements/Checkbox";
import SelectedItemList from "@/components/common/SelectedItemList";

export const CreateStageForm = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    // clearErrors,
    // setFocus,
    formState: { isSubmitting, errors },
  } = useForm<IStageFormDataTypes>({
    resolver: yupResolver(StageFormValidation()),
    defaultValues: {
      name: "",
      description: "",
      subStages: [],
    },
  });

  const hasSubStage = watch("hasSubStage");
  const selectedStages = watch("subStages");
  const selectedMaterials = watch("materialList");

  // const { data, isLoading, isError, isFetching, refetch } =
  //   useGetStagesDataQuery<IStagesTypes>(); // should be subStagesData

  useEffect(() => {
    if (hasSubStage) {
      setValue("materialList", []);
    } else {
      setValue("subStages", []);
    }
  }, [hasSubStage]);

  const dispatch = useDispatch();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    // close modal
    removeModal();
  };

  const onSubmit: SubmitHandler<IStageFormDataTypes> = useCallback(
    async (data) => {
      try {
        const { subStages, ...rest } = data;
        const newStages = subStages?.map(
          (stage: IOptionType, index: number) => {
            return {
              stageInfo: stage.value,
              plannedOrder: index + 1,
            };
          },
        );

        const params = {
          ...rest,
          creator: "admin",
          subStages: newStages,
        };

        const response = await axiosInstance.post(
          CLIENT_END_POINTS.workflow.create,
          {
            type: WorkflowQueryTypes.createWorkflow,
            params,
          },
        );
        dispatch(
          addToastify({
            message: "Ekleme işlemi başarılı.",
            type: "success",
            icon: "close",
            id: "createWorkflowCreate" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
      } catch (err) {
        dispatch(
          addToastify({
            message: "Silme işlemi sırasında bir sorun ile karşılaşıldı.",
            type: "error",
            icon: "close",
            id: "createWorkflowDelete" + Date.now(),
          }),
        );
      }
    },
    [],
  );

  // const options = useCallback(() => {
  //   const newOptions = data?.map((stage: IStageType) => ({
  //     value: stage._id,
  //     label: stage.name,
  //   }));
  //   return newOptions;
  // }, [data]);

  return (
    <form className={styles["stage-form"]}>
      {STAGE_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
        if (item.type === "input") {
          return (
            <React.Fragment key={index}>
              <InputBox
                control={control as any}
                label={item.label as string}
                name={item.name}
                placeholder={item.label}
                required={item.isRequired}
                maxLength={item.maxLength}
                spacesRule={
                  item.name === "email"
                    ? InputSpaceEnums.noSpaces
                    : InputSpaceEnums.limitMaxOneSpace
                }
                regex={item?.regex}
                onlyNumber={item?.onlyNumber}
                inputClassName={styles["text-input"]}
              />
            </React.Fragment>
          );
        }

        if (item.type === "textarea") {
          return (
            <React.Fragment key={index}>
              <TextAreaBox
                control={control as any}
                label="Açıklama"
                {...register(item.name as keyof IStageFormDataTypes)}
                required={item.isRequired}
                rows={item.maxRows}
                placeholder="Açıklama giriniz"
                maxLength={item.maxLength}
                visibleLimit
                textareaClassName={styles["text-input"]}
              />
            </React.Fragment>
          );
        }
        if (item.type === "checkbox") {
          return (
            <React.Fragment key={index}>
              <CheckBox
                name={item.name}
                control={control as any}
                align="top"
                className={styles["checkbox-container"]}
                classNameInput={styles["checkbox-input"]}
                classNameLabel={styles["checkbox-label"]}
                label={item.label}
                required={false}
              />
            </React.Fragment>
          );
        }
        if (item.name === "subStages" && hasSubStage) {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={
                  // options()
                  [
                    {
                      value: "1",
                      label: "Sub 1",
                    },
                    {
                      value: "2",
                      label: "Sub 2",
                    },
                  ]
                  // || []
                }
                control={control as any}
                required={item.isRequired}
                label="Aşama"
                placeholder="Alt Aşama seçiniz"
                formLabelClassName={styles["form-label"]}
                isSearchable
                multiselect
                isClearable
                hideSelectedOptions
              />
            </React.Fragment>
          );
        }
        if (item.name === "materialList" && !hasSubStage) {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={
                  // options()
                  [
                    {
                      value: "1",
                      label: "Material 1",
                    },
                    {
                      value: "2",
                      label: "Material 2",
                    },
                  ]
                  // || []
                }
                control={control as any}
                required={item.isRequired}
                label={item.label}
                placeholder="Malzeme seçiniz"
                formLabelClassName={styles["form-label"]}
                isSearchable
                multiselect
                isClearable
                hideSelectedOptions
              />
            </React.Fragment>
          );
        }
        return null;
      })}
      {hasSubStage &&
        selectedStages &&
        Array.isArray(selectedStages) &&
        selectedStages.length > 0 && (
          <SelectedItemList
            name="subStages"
            selectedItems={selectedStages}
            setValue={setValue}
            title="Seçilen Aşamalar"
          />
        )}

      {!hasSubStage &&
        selectedMaterials &&
        Array.isArray(selectedMaterials) &&
        selectedMaterials.length > 0 && (
          <SelectedItemList
            name="materialList"
            selectedItems={selectedMaterials}
            setValue={setValue}
            title="Seçilen Malzemeler"
          />
        )}

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
    // </div>
  );
};
