"use client";
/* eslint-disable */
import styles from "@/styles/components/workflowList/WorkflowForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IWorkflowFormDataTypes } from "@/types/workflowTypes";
import { WORKFLOW_FORM_CONSTS } from "@/consts/workflowConsts";
import { SelectBox } from "@/components/formElements/SelectBox";
import { WorkflowFormValidation } from "@/utils/validations/workflowFormValidation";
import { axiosInstance } from "@/api/axiosInstance";
import { useGetStagesDataQuery, useGetStagesOptionsDataQuery } from "@/api/queries/useGetStagesQueries";
import { IStageResponseDataTypes, IStageType } from "@/types/stagesTypes";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import SelectedItemList from "@/components/common/SelectedItemList";
import { useTranslations } from "next-intl";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";

export const CreateWorkflowForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
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
  } = useForm<IWorkflowFormDataTypes>({
    resolver: yupResolver(WorkflowFormValidation(tValidation)),
    defaultValues: {
      name: "",
      description: "",
      stages: [],
    },
  });

  const t = useTranslations("workflows");
  const { data: stagesOptions, isLoading, isError, isFetching, refetch } =
    useGetStagesOptionsDataQuery<IOptionType[]>();

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    // close modal
    removeModal();
  };

  const onSubmit: SubmitHandler<IWorkflowFormDataTypes> = useCallback(
    async (data) => {
      try {
        const { stages, ...rest } = data;
        const newStages = stages.map((stage: IOptionType, index: number) => {
          return {
            stageInfo: stage.value,
            plannedOrder: index + 1,
          };
        });

        const params = {
          ...rest,
          creator: currentUserName,
          stages: newStages,
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
            message: t("notifications.create.success"),
            type: "success",
            icon: "close",
            id: "createWorkflowSuccess" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: t("notifications.create.error"),
            type: "error",
            icon: "close",
            id: "createWorkflowError" + Date.now(),
          }),
        );
      }
    },
    [],
  );

  const selectedStages = watch("stages");

  return (
    <form className={styles["stage-form"]}>
      {WORKFLOW_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
        if (item.type === "input") {
          return (
            <React.Fragment key={index}>
              <InputBox
                control={control as any}
                label={t(`form.labels.${item.label}`)}
                name={item.name}
                placeholder={t(`form.placeholders.${item.label}`)}
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
                label={t(`form.labels.${item.label}`)}
                {...register(item.name as keyof IWorkflowFormDataTypes)}
                required={item.isRequired}
                rows={item.maxRows}
                placeholder={t(`form.placeholders.${item.label}`)}
                maxLength={item.maxLength}
                visibleLimit
                textareaClassName={styles["text-input"]}
              />
            </React.Fragment>
          );
        }
        if (item.type === "select") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={stagesOptions || []}
                // className={styles["row"]}
                control={control as any}
                required={item.isRequired}
                label={t(`form.labels.${item.label}`)}
                placeholder={t(`form.placeholders.${item.label}`)}
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
      {selectedStages &&
        Array.isArray(selectedStages) &&
        selectedStages.length > 0 && (
          <SelectedItemList
            name="stages"
            selectedItems={selectedStages}
            setValue={setValue}
            title={t("form.labels.selectedStages")}
          />
        )}

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
    // </div>
  );
};
