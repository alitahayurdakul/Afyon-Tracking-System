"use client";
/* eslint-disable */

import styles from "@/styles/components/trains/TrainForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrainFormValidation } from "@/utils/validations/trainFormValidation";
import React, { useCallback } from "react";
import { IFormFieldType } from "@/types/formTypes";
import { TRAIN_FORM_CONSTS } from "@/consts/trainsConsts";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { ITrainFormDataTypes } from "@/types/trainsTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { SelectBox } from "@/components/formElements/SelectBox";

export const CreateTrainForm = () => {
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
  } = useForm<ITrainFormDataTypes>({
    resolver: yupResolver(TrainFormValidation()),
    defaultValues: {
      trainSetNo: "",
      trainModel: "",
      year: "",
      desc: "",
    },
  });

  const dispatch = useDispatch();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    // close modal
    removeModal();
  };

  const onSubmit: SubmitHandler<ITrainFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          ...data,
          year: Number(data.year),
          creator: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.train.create, {
          type: TrainQueryTypes.createTrain,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla oluşturuldu",
            type: "success",
            icon: "close",
            id: "createTrain" + Date.now(),
          }),
        );
        reset();
        dispatch(addTriggerTable());
      } catch (err) {
        dispatch(
          addToastify({
            message: (err as Error)?.message || "Hata oluştu",
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
    /* Form */

    <form className={styles["train-form"]}>
      {TRAIN_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
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

        if (item.type === "select") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={item.options || []}
                // className={styles["row"]}
                control={control as any}
                required={item.isRequired}
                label={item.label}
                placeholder={item.placeholder}
                formLabelClassName={styles["form-label"]}
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
                label="Açıklama"
                {...register(item.name as keyof ITrainFormDataTypes)}
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
        return null;
      })}
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
