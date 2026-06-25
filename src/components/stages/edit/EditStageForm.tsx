"use client";
/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
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
import { WORKFLOW_FORM_CONSTS } from "@/consts/workflowConsts";
import { SelectBox } from "@/components/formElements/SelectBox";
import { axiosInstance } from "@/api/axiosInstance";
import { useGetStagesDataQuery } from "@/api/queries/useGetStagesQueries";
import { IStageFormDataTypes, IStageResponseDataTypes, IStageType } from "@/types/stagesTypes";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { StageFormValidation } from "@/utils/validations/stageFormValidation";
import SelectedItemList from "@/components/common/SelectedItemList";
import { STAGE_FORM_CONSTS } from "@/consts/stagesConsts";
import { useTranslations } from "next-intl";
interface IPropsTypes {
  id: string;
  stageData?: IStageType;
}

export const EditStageForm = ({ id, stageData }: IPropsTypes) => {
  const t = useTranslations("stages");
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
      name: stageData?.name,
      description: stageData?.description,
      subStages: [],
      materialList: []
    },
  });
  const hasSubStage = stageData?.subStages && stageData?.subStages.length > 0; 

  const { data, isLoading, isError, isFetching, refetch } =
    useGetStagesDataQuery<IStageResponseDataTypes>();

  const dispatch = useDispatch();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    // close modal
    removeModal();
  };

  const onSubmit: SubmitHandler<IStageFormDataTypes> = useCallback(
    async (data) => {
      const { subStages, ...rest } = data;
      // const newStages = stages.map((stage: IOptionType, index: number) => {
      //   return {
      //     stageInfo: stage.value,
      //     plannedOrder: index + 1,
      //   };
      // });

      // const params = {
      //   ...rest,
      //   creator: "admin",
      //   stages: newStages,
      // };
      // const response = await axiosInstance.post(CLIENT_END_POINTS.workflow.edit, {
      //   type: WorkflowQueryTypes.editWorkflow,
      //   params: {
      //     ...params,
      //     id,
      //   },
      // });
      // dispatch(
      //   addToastify({
      //     message: "Başarılı",
      //     type: "success",
      //     icon: "close",
      //     id: "contactePage" + Date.now(),
      //   }),
      // );
      //  dispatch(addTriggerTable());
      // //   try {
      // //     if (!isEqualValues) {
      // //       dispatch(
      // //         addToastify({
      // //           message: t("form.notifications.error"),
      // //           type: "error",
      // //           icon: "close",
      // //           id: "contactFormError" + Date.now(),
      // //         }),
      // //       );
      // //       return;
      // //     }

      // //     const response = await axiosInstance.post<any>(
      // //       CLIENT_END_POINTS.career,
      // //       {
      // //         params: data,
      // //       },
      // //     );

      // //     if (response.status === 200) {
      // //       dispatch(
      // //         addToastify({
      // //           message: t("form.notifications.success"),
      // //           type: "success",
      // //           icon: "close",
      // //           id: "contactePage" + Date.now(),
      // //         }),
      // //       );
      // //       reset();
      // //     }
      // //   } catch (err) {
      // //     dispatch(
      // //       addToastify({
      // //         message: (err as Error)?.message || t("form.notifications.error"),
      // //         type: "error",
      // //         icon: "close",
      // //         id: "contactFormError" + Date.now(),
      // //       }),
      // //     );
      // //   } finally {
      // //     setTriggeredCaptcha(prev => prev + 1);
      // //     setIsEqualValues(false);
      // //   }
    },
    [],
  );

  const options = useCallback(() => {
    const newOptions = data?.stages?.map((stage: any, index: number) => ({
      value: stage?._id ?? stage?.value ?? `stage-${index}`,
      label: stage?.name ?? stage?.label ?? "-",
    }));
    return newOptions;
  }, [data]);

  const selectedStages = watch("subStages");
  const selectedMaterials = watch("materialList");

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
      {selectedStages && selectedStages.length > 0 && (
        <SelectedItemList name="subStages" selectedItems={selectedStages} setValue={setValue} title={t("form.selectedStages")} />
      )}

      {selectedMaterials && selectedMaterials.length > 0 && (
        <SelectedItemList name="materialList" selectedItems={selectedMaterials} setValue={setValue} title={t("form.selectedMaterials")} />
      )}

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]}>
          Aşama bilgilerini güncellemek ilişkili süreç kayıtlarını
          etkileyebilir. Kaydetmeden önce değişiklikleri kontrol ettiğinizden
          emin olun.
        </span>
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
    // </div>
  );
};
