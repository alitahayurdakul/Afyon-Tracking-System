"use client";
/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/trains/TrainForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITrainFormDataTypes, ITrainType } from "@/types/trainsTypes";
import { TrainFormValidation } from "@/utils/validations/trainFormValidation";
import React, { useCallback } from "react";
import { IFormFieldType } from "@/types/formTypes";
import { TRAIN_FORM_CONSTS } from "@/consts/trainsConsts";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { TrainQueryTypes } from "@/app/api/trains/route";
import { addToastify } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { formatDate } from "@/utils/formDate";
import { SelectBox } from "@/components/formElements/SelectBox";

interface IPropsTypes {
  id: string;
  data?: ITrainType;
}

export const EditTrainForm = ({ id, data }: IPropsTypes) => {
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
      trainSetNo: data?.trainSetNo || "",
      trainModel: data?.trainModel || "",
      year: data?.year ? String(data.year) : "",
      desc: data?.desc || "",
    },
  });

  const dispatch = useDispatch();

  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ITrainFormDataTypes> = useCallback(
    async (formData) => {
      try {
        const params = {
          ...formData,
          id,
          year: Number(formData.year),
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.train.edit, {
          type: TrainQueryTypes.editTrain,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla güncellendi",
            type: "success",
            icon: "close",
            id: "editTrain" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: (err as Error)?.message || "Hata oluştu",
            type: "error",
            icon: "close",
            id: "editTrainError" + Date.now(),
          }),
        );
      }
    },
    [id],
  );

  return (
    <form className={styles["train-form"]}>
      {TRAIN_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
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
                disabled={item.name === "trainSetNo"}
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

      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>Oluşturan:</span>
          <span className={styles["activity-value"]}>
            {data?.creator ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>Oluşturulma Tarihi:</span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>Son Güncelleyen:</span>
          <span className={styles["activity-value"]}>
            {data?.editor ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            Son Güncellenme Tarihi:
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />

        <span className={styles["info-text"]} >
          Tren bilgilerini güncellemek filo envanterini ve ilişkili iş
          akışlarını otomatik olarak etkiler. Kaydetmeden önce değişiklikleri
          kontrol ettiğinizden emin olun.
        </span>
      </div>

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
  );
};
