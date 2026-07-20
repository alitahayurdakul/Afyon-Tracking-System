"use client";
/* eslint-disable */

import styles from "@/styles/components/trains/TrainForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrainFormValidation } from "@/utils/validations/trainFormValidation";
import React, { useCallback, useEffect } from "react";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
import { TRAIN_FORM_CONSTS } from "@/consts/trainsConsts";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { ITrainFormDataTypes } from "@/types/trainsTypes";
import { SelectBox } from "@/components/formElements/SelectBox";
import { useTranslations } from "next-intl";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import SelectedItemList from "@/components/common/SelectedItemList";
import { useGetWagonsOptionsQuery } from "@/api/queries/useGetWagonsQueries";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";

export const CreateTrainForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const t = useTranslations("trains");
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ITrainFormDataTypes>({
    resolver: yupResolver(TrainFormValidation(tValidation)),
    defaultValues: {
      trainSetNo: "",
      desc: "",
      wagons: [],
    },
  });

  const { data, isLoading } = useGetWagonsOptionsQuery();

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();
  const selectedWagons = watch("wagons");

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ITrainFormDataTypes> = useCallback(
    async (data) => {
      try {
        const wagons = data.wagons.map((option: IOptionType, index) => {
          return{
            order: index + 1,
            id: option.value
          }
        })
        const params = {
          trainName: data.trainSetNo ?? "",
          wagons,
          desc: data.desc,
          creator: currentUserName,
        };
        await axiosInstance.post(CLIENT_END_POINTS.train.create, {
          type: TrainQueryTypes.createTrain,
          params,
        });
        dispatch(
          addToastify({
            message: t("form.notifications.createSuccess"),
            type: "success",
            icon: "close",
            id: "createTrain" + Date.now(),
          }),
        );
        reset();
        dispatch(addTriggerTable());
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: (err as Error)?.message || t("form.notifications.error"),
            type: "error",
            icon: "close",
            id: "createTrainError" + Date.now(),
          }),
        );
      }
    },
    [],
  );

  return (
    <form className={styles["train-form"]}>
      {TRAIN_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
        if (item.type === "input") {
          return (
            <React.Fragment key={index}>
              <InputBox
                control={control as any}
                label={t(`form.fields.${item.label}.label`)}
                name={item.name}
                placeholder={t(`form.fields.${item.label}.placeholder`)}
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

        if (item.type === "select") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={data || []}
                control={control as any}
                required={item.isRequired}
                label={t(`form.fields.${item.label}.label`)}
                placeholder={t(`form.fields.${item.label}.placeholder`)}
                formLabelClassName={styles["form-label"]}
                multiselect={item.isMultiselect}
                isSearchable
                isClearable
                hideSelectedOptions
              />
            </React.Fragment>
          );
        }

        if (item.type === "textarea") {
          return (
            <React.Fragment key={index}>
              <TextAreaBox
                control={control as any}
                label={t(`form.fields.${item.label}.label`)}
                {...register(item.name as keyof ITrainFormDataTypes)}
                required={item.isRequired}
                rows={item.maxRows}
                placeholder={t(`form.fields.${item.label}.placeholder`)}
                maxLength={item.maxLength}
                visibleLimit
                textareaClassName={styles["text-input"]}
              />
            </React.Fragment>
          );
        }

        return null;
      })}

      {selectedWagons && selectedWagons.length > 0 && (
        <SelectedItemList
          name="wagons"
          selectedItems={selectedWagons}
          setValue={setValue}
          title={t("form.fields.selectedWagons")}
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
  );
};
