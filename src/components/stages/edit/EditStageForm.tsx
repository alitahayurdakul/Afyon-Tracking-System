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
import SelectedStages from "../SelectedSubStages";
import { axiosInstance } from "@/api/axiosInstance";
import { useGetStagesDataQuery } from "@/api/queries/useGetStagesQueries";
import { IStageResponseDataTypes, IStageType } from "@/types/stagesTypes";
import { WorkflowQueryTypes } from "@/app/api/workflows/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
interface IPropsTypes {
  id: string;
  workflowData?: IWorkflowFormTypes;
}

export const EditStageForm = ({ id, workflowData }: IPropsTypes) => {
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
    resolver: yupResolver(WorkflowFormValidation()),
    defaultValues: {
      name: workflowData?.name,
      description: workflowData?.description,
      stages: workflowData?.stages,
    },
  });

  const { data, isLoading, isError, isFetching, refetch } =
    useGetStagesDataQuery<IStageResponseDataTypes>();

  const dispatch = useDispatch();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    // close modal
    removeModal();
  };

  const onSubmit: SubmitHandler<IWorkflowFormDataTypes> = useCallback(
    async (data) => {
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
      const response = await axiosInstance.post(CLIENT_END_POINTS.workflow.edit, {
        type: WorkflowQueryTypes.editWorkflow,
        params: {
          ...params,
          id,
        },
      });
      dispatch(
        addToastify({
          message: "Başarılı",
          type: "success",
          icon: "close",
          id: "contactePage" + Date.now(),
        }),
      );
       dispatch(addTriggerTable());
      //   try {
      //     if (!isEqualValues) {
      //       dispatch(
      //         addToastify({
      //           message: t("form.notifications.error"),
      //           type: "error",
      //           icon: "close",
      //           id: "contactFormError" + Date.now(),
      //         }),
      //       );
      //       return;
      //     }

      //     const response = await axiosInstance.post<any>(
      //       CLIENT_END_POINTS.career,
      //       {
      //         params: data,
      //       },
      //     );

      //     if (response.status === 200) {
      //       dispatch(
      //         addToastify({
      //           message: t("form.notifications.success"),
      //           type: "success",
      //           icon: "close",
      //           id: "contactePage" + Date.now(),
      //         }),
      //       );
      //       reset();
      //     }
      //   } catch (err) {
      //     dispatch(
      //       addToastify({
      //         message: (err as Error)?.message || t("form.notifications.error"),
      //         type: "error",
      //         icon: "close",
      //         id: "contactFormError" + Date.now(),
      //       }),
      //     );
      //   } finally {
      //     setTriggeredCaptcha(prev => prev + 1);
      //     setIsEqualValues(false);
      //   }
    },
    [],
  );

  const options = useCallback(() => {
    const newOptions = data?.stages?.map((stage: any, index: number) => ({
      // Aşama verisi hem {_id, name} hem de {value, label} şeklinde gelebilir;
      // değer boş gelirse benzersizliği korumak için index'i key olarak kullan.
      value: stage?._id ?? stage?.value ?? `stage-${index}`,
      label: stage?.name ?? stage?.label ?? "-",
    }));
    return newOptions;
  }, [data]);

  const selectedStages = watch("stages");

  return (
    <form className={styles["stage-form"]}>
      {WORKFLOW_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
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
                {...register(item.name as keyof IWorkflowFormDataTypes)}
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
        if (item.type === "select") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={options() || []}
                // className={styles["row"]}
                control={control as any}
                required={item.isRequired}
                label="Aşama"
                placeholder="Aşama seçiniz"
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
        <SelectedStages selectedStages={selectedStages} setValue={setValue} />
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
