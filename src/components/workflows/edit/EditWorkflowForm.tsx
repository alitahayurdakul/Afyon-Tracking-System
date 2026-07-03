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
import {
  IWorkflowFormDataTypes,
  IWorkflowFormTypes,
} from "@/types/workflowTypes";
import { WORKFLOW_FORM_CONSTS } from "@/consts/workflowConsts";
import { SelectBox } from "@/components/formElements/SelectBox";
import { WorkflowFormValidation } from "@/utils/validations/workflowFormValidation";
import { axiosInstance } from "@/api/axiosInstance";
import {
  useGetStagesOptionsDataQuery,
} from "@/api/queries/useGetStagesQueries";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import SelectedItemList from "@/components/common/SelectedItemList";
import { useTranslations } from "next-intl";
import { formatDate } from "@/utils/formDate";
interface IPropsTypes {
  id: string;
  workflowData?: IWorkflowFormTypes;
}

export const EditWorkflowForm = ({ id, workflowData }: IPropsTypes) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IWorkflowFormDataTypes>({
    resolver: yupResolver(WorkflowFormValidation()),
    defaultValues: {
      name: workflowData?.name,
      description: workflowData?.description,
      stages: workflowData?.stages,
    },
  });

  const { data: stagesOptions } = useGetStagesOptionsDataQuery<IOptionType[]>();

  const t = useTranslations("workflows");
  const dispatch = useDispatch();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
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
          creator: "admin",
          stages: newStages,
        };
        await axiosInstance.post(CLIENT_END_POINTS.workflow.edit, {
          type: WorkflowQueryTypes.editWorkflow,
          params: {
            ...params,
            id,
          },
        });
        dispatch(
          addToastify({
            message: t("notifications.edit.success"),
            type: "success",
            icon: "close",
            id: "editWorkflowSuccess" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
      } catch (err) {
        dispatch(
          addToastify({
            message: (err as Error)?.message || t("notifications.edit.error"),
            type: "error",
            icon: "close",
            id: "editWorkflowError" + Date.now(),
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
                isClearable
                multiselect
                hideSelectedOptions
              />
            </React.Fragment>
          );
        }
        return null;
      })}
      {selectedStages && selectedStages.length > 0 && (
        <SelectedItemList
          name="stages"
          selectedItems={selectedStages}
          setValue={setValue}
          title={t("form.labels.selectedStages")}
        />
      )}
      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.creator")}:</span>
          <span className={styles["activity-value"]}>
            {workflowData?.creator || "Admin"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.createdDate")}:</span>
          <span className={styles["activity-value"]}>
            {formatDate(workflowData?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.editor")}:</span>
          <span className={styles["activity-value"]}>
            {workflowData?.editor ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.labels.editedDate")}:
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(workflowData?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

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
