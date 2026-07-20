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
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { SelectBox } from "@/components/formElements/SelectBox";
import { axiosInstance } from "@/api/axiosInstance";
import { useGetStagesDataQuery } from "@/api/queries/useGetStagesQueries";
import { IStageFormDataTypes, IStageType } from "@/types/stagesTypes";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { StageFormValidation } from "@/utils/validations/stageFormValidation";
import SelectedItemList from "@/components/common/SelectedItemList";
import { STAGE_FORM_CONSTS } from "@/consts/stagesConsts";
import { useTranslations } from "next-intl";
import { optionsConverters } from "@/types/optionsConverter";
import { useGetSubStagesOptionsListDataQuery } from "@/api/queries/useGetSubStagesManageQueries";
import { StageQueryTypes } from "@/app/api/stages/route";
import { formatDate } from "@/utils/formDate";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";

interface IPropsTypes {
  id: string;
  stageData?: IStageType;
}

export const EditStageForm = ({ id, stageData }: IPropsTypes) => {
  const tValidation = useTranslations("layout.validation-errors");
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
    resolver: yupResolver(StageFormValidation(tValidation)),
    defaultValues: {
      name: stageData?.name,
      description: stageData?.description,
      subStages: optionsConverters(stageData?.subStages, "_id", "name"),
    },
  });

  const {
    data: subStagesOptions,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetSubStagesOptionsListDataQuery<IOptionType[]>();

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IStageFormDataTypes> = useCallback(
    async (data) => {
      try {
        const { subStages, ...rest } = data;
        const subStageIds = subStages?.map(
          (subStage: IOptionType) => subStage.value,
        );

        const params = {
          ...rest,
          editor: currentUserName,
          subStageIds,
        };

        await axiosInstance.post(CLIENT_END_POINTS.stage.edit, {
          type: StageQueryTypes.editStage,
          params: {
            ...params,
            id,
          },
        });

        dispatch(
          addToastify({
            message: t("form.notifications.editSuccess"),
            type: "success",
            icon: "close",
            id: "editStageSuccess" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: t("form.notifications.editError"),
            type: "error",
            icon: "close",
            id: "editStageError" + Date.now(),
          }),
        );
      }
    },
    [],
  );
  const selectedStages = watch("subStages");

  return (
    <form className={styles["stage-form"]}>
      {STAGE_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
        if (item.type === "input") {
          return (
            <React.Fragment key={index}>
              <InputBox
                control={control as any}
                label={t(`form.fields.${item.name}.label`)}
                name={item.name}
                placeholder={t(`form.fields.${item.name}.placeholder`)}
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
                label={t(`form.fields.${item.name}.label`)}
                {...register(item.name as keyof IStageFormDataTypes)}
                required={item.isRequired}
                rows={item.maxRows}
                placeholder={t(`form.fields.${item.name}.placeholder`)}
                maxLength={item.maxLength}
                visibleLimit
                textareaClassName={styles["text-input"]}
              />
            </React.Fragment>
          );
        }
        if (item.name === "subStages") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={subStagesOptions ?? []}
                control={control as any}
                required={item.isRequired}
                label={t("form.fields.subStages.label")}
                placeholder={t("form.fields.subStages.placeholder")}
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
        <SelectedItemList
          name="subStages"
          selectedItems={selectedStages}
          setValue={setValue}
          title={t("form.selectedStages")}
        />
      )}

            <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.creator")}
          </span>
          <span className={styles["activity-value"]}>
            {stageData?.creator || "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.createdAt")}
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(stageData?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.editor")}
          </span>
          <span className={styles["activity-value"]}>
            {stageData?.editor ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.updatedAt")}
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(stageData?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]}>{t("form.editInfo")}</span>
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
