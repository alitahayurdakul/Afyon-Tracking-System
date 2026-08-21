"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";
import { useGetStagesOptionsDataQuery } from "@/api/queries/useGetStagesQueries";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import SelectedItemList from "@/components/common/SelectedItemList";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { QUALITY_STAGE_ID, WORKFLOW_FORM_CONSTS } from "@/consts/workflowConsts";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
import { IWorkflowFormDataTypes } from "@/types/workflowTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { WorkflowFormValidation } from "@/utils/validations/workflowFormValidation";

import styles from "@/styles/components/workflowList/WorkflowForm.module.scss";

export const CreateWorkflowForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const qualityId = QUALITY_STAGE_ID;
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    // clearErrors,
    // setFocus,
    formState: { isSubmitting },
  } = useForm<IWorkflowFormDataTypes>({
    resolver: yupResolver(WorkflowFormValidation(tValidation)),
    defaultValues: {
      name: "",
      description: "",
      stages: [],
    },
  });

  const t = useTranslations("workflows");
  const { data: stagesOptions, isLoading } =
    useGetStagesOptionsDataQuery<IOptionType[]>();

  const newStagesOptions = useMemo(() => {
    return stagesOptions?.filter(
      (stage: IOptionType) => stage.value !== qualityId,
    );
  }, [stagesOptions]);

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    // close modal
    removeModal();
  };

  const onSubmit: SubmitHandler<IWorkflowFormDataTypes> = async (data) => {
    try {
      const { stages, ...rest } = data;
      const newStages = stages.map((stage: IOptionType, index: number) => {
        return {
          stageInfo: stage.value,
          plannedOrder: index + 1,
        };
      });
      const qualityStage = {
        stageInfo: qualityId,
        plannedOrder: newStages.length + 1,
      };

      const lastStages =
        newStages && newStages.length > 0 ? [...newStages, qualityStage] : [];

      const params = {
        ...rest,
        creator: currentUserName,
        stages: lastStages,
      };

      await axiosInstance.post(CLIENT_END_POINTS.workflow.create, {
        type: WorkflowQueryTypes.createWorkflow,
        params,
      });
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
          message: extractApiError(err, t("notifications.create.error")),
          type: "error",
          icon: "close",
          id: "createWorkflowError" + Date.now(),
        }),
      );
    }
  };

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
                options={newStagesOptions || []}
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
                loading={isLoading}
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
