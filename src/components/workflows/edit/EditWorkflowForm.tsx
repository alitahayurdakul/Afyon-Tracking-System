"use client";

import React, { useCallback, useMemo } from "react";
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
import { WORKFLOW_FORM_CONSTS } from "@/consts/workflowConsts";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
import {
  IWorkflowFormDataTypes,
  IWorkflowFormTypes,
} from "@/types/workflowTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { formatDate } from "@/utils/formDate";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { WorkflowFormValidation } from "@/utils/validations/workflowFormValidation";

import styles from "@/styles/components/workflowList/WorkflowForm.module.scss";
interface IPropsTypes {
  id: string;
  workflowData?: IWorkflowFormTypes;
}

export const EditWorkflowForm = ({ id, workflowData }: IPropsTypes) => {
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<IWorkflowFormDataTypes>({
    resolver: yupResolver(WorkflowFormValidation(tValidation)),
    defaultValues: {
      name: workflowData?.name,
      description: workflowData?.description,
      stages: workflowData?.stages.filter(
        (stage: IOptionType) => stage.value !== "6a548d7444cc81ed74b22b6a",
      ),
    },
  });

  const { data: stagesOptions } = useGetStagesOptionsDataQuery<IOptionType[]>();

  const qualityData = stagesOptions?.find(
    (stage: IOptionType) => stage.value === "6a548d7444cc81ed74b22b6a",
  );

  const newStagesOptions = useMemo(() => {
    return stagesOptions?.filter(
      (stage: IOptionType) => stage.value !== "6a548d7444cc81ed74b22b6a",
    );
  }, [stagesOptions]);


  const t = useTranslations("workflows");
  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();

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
          editor: currentUserName,
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
        removeModal();
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
                options={newStagesOptions || []}
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
          selectedItems={[
            ...selectedStages,
            ...(qualityData?.value && qualityData?.label
              ? [{ value: qualityData.value, label: qualityData.label }]
              : []),
          ]}
          setValue={setValue}
          title={t("form.labels.selectedStages")}
        />
      )}
      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.labels.creator")}:
          </span>
          <span className={styles["activity-value"]}>{currentUserName}</span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.labels.createdDate")}:
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(workflowData?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.labels.editor")}:
          </span>
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
