"use client";
/* eslint-disable */

import styles from "@/styles/components/trains/TrainForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrainFormValidation } from "@/utils/validations/trainFormValidation";
import React, { useCallback, useEffect } from "react";
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
import { useTranslations } from "next-intl";

export const CreateTrainForm = () => {
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
    resolver: yupResolver(TrainFormValidation()),
    defaultValues: {
      trainSetNo: "",
      desc: "",
      wagonDetails: [],
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();
  const wagonsCount = watch("wagonsCount");

  const { fields } = useFieldArray({
    control,
    name: "wagonDetails",
  });

  useEffect(() => {
    const count = Number(wagonsCount);
    if (!count || count < 1) {
      setValue("wagonDetails", []);
      return;
    }
    const current = watch("wagonDetails") || [];
    const next = Array.from({ length: count }, (_, i) => current[i] ?? { name: "" });
    setValue("wagonDetails", next);
  }, [wagonsCount]);

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ITrainFormDataTypes> = useCallback(
    async (data) => {
      // try {
      //   const params = {
      //     ...data,
      //     creator: "Admin",
      //   };
      //   await axiosInstance.post(CLIENT_END_POINTS.train.create, {
      //     type: TrainQueryTypes.createTrain,
      //     params,
      //   });
      //   dispatch(
      //     addToastify({
      //       message: "Başarıyla oluşturuldu",
      //       type: "success",
      //       icon: "close",
      //       id: "createTrain" + Date.now(),
      //     }),
      //   );
      //   reset();
      //   dispatch(addTriggerTable());
      // } catch (err) {
      //   dispatch(
      //     addToastify({
      //       message: (err as Error)?.message || "Hata oluştu",
      //       type: "error",
      //       icon: "close",
      //       id: "createTrainError" + Date.now(),
      //     }),
      //   );
      // }
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

        if (item.type === "select") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={item.options || []}
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
                label={t(`form.fields.${item.name}.label`)}
                {...register(item.name as keyof ITrainFormDataTypes)}
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
        return null;
      })}

      <div className={styles["inputbox-group"]}>
        {fields.map((field, index) => (
          <InputBox
            key={field.id}
            control={control as any}
            label={t("form.wagon.label", { index: index + 1 })}
            name={`wagonDetails.${index}.name` as any}
            placeholder={t("form.wagon.placeholder", { index: index + 1 })}
            required
            inputClassName={styles["text-input"]}
            className={styles["half-input-container"]}
          />
        ))}
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
  );
};