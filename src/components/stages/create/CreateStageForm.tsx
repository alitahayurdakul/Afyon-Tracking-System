"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";
import { useGetSubStagesOptionsListDataQuery } from "@/api/queries/useGetSubStagesManageQueries";
import { StageQueryTypes } from "@/app/api/stages/route";
import SelectedItemList from "@/components/common/SelectedItemList";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { STAGE_FORM_CONSTS } from "@/consts/stagesConsts";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
import { IStageFormDataTypes } from "@/types/stagesTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { StageFormValidation } from "@/utils/validations/stageFormValidation";

import styles from "@/styles/components/stages/StageForm.module.scss";

export const CreateStageForm = () => {
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
    formState: { isSubmitting },
  } = useForm<IStageFormDataTypes>({
    resolver: yupResolver(StageFormValidation(tValidation)),
    defaultValues: {
      name: "",
      description: "",
      subStages: [],
    },
  });

  const { data: subStagesOptions } =
    useGetSubStagesOptionsListDataQuery<IOptionType[]>();
  const selectedStages = watch("subStages");
  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IStageFormDataTypes> = async (data) => {
    try {
      const { subStages, ...rest } = data;
      const newSubStages = subStages?.map(
        (sStage: IOptionType) => sStage.value,
      );

      const params = {
        ...rest,
        creator: currentUserName,
        subStageIds: newSubStages,
      };

      await axiosInstance.post(CLIENT_END_POINTS.stage.create, {
        type: StageQueryTypes.createStage,
        params,
      });
      dispatch(
        addToastify({
          message: t("form.notifications.createSuccess"),
          type: "success",
          icon: "close",
          id: "createStageSuccess" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("stages"));
      reset();
      removeModal();
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.createError")),
          type: "error",
          icon: "close",
          id: "createStageError" + Date.now(),
        }),
      );
    }
  };

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
                options={subStagesOptions || []}
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
      {selectedStages &&
        Array.isArray(selectedStages) &&
        selectedStages.length > 0 && (
          <SelectedItemList
            name="subStages"
            selectedItems={selectedStages}
            setValue={setValue}
            title={t("form.selectedStages")}
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
    // </div>
  );
};
