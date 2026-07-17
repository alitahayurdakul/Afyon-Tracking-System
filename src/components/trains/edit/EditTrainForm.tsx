"use client";
/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/trains/TrainForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ITrainFormDataTypes,
  ITrainType,
  IWagonDetail,
} from "@/types/trainsTypes";
import { TrainFormValidation } from "@/utils/validations/trainFormValidation";
import React, { useCallback } from "react";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
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
import { useTranslations } from "next-intl";
import SelectedItemList from "@/components/common/SelectedItemList";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";

interface IPropsTypes {
  id: string;
  data?: ITrainType;
  wagonOptions?: IOptionType[];
}

export const EditTrainForm = ({ id, data, wagonOptions }: IPropsTypes) => {
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
      trainSetNo: data?.trainSetNo || "",
      desc: data?.desc || "",
      wagons: data?.wagons
        ? data?.wagons.map((wagon: IWagonDetail) => {
            return {
              value: wagon._id,
              label: wagon.wagonNo,
            };
          })
        : [],
    },
  });

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();
  const selectedWagons = watch("wagons");

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ITrainFormDataTypes> = useCallback(
    async (formData) => {
      try {
        const wagons = formData.wagons.map((option: IOptionType, index) => {
          return {
            order: index + 1,
            id: option.value,
          };
        });
        const params = {
          id: data?._id,
          trainName: formData.trainSetNo ?? "",
          wagons,
          desc: formData?.desc ?? "",
          editor: currentUserName,
        };
        await axiosInstance.post(CLIENT_END_POINTS.train.edit, {
          type: TrainQueryTypes.editTrain,
          params,
        });
        dispatch(
          addToastify({
            message: t("form.notifications.editSuccess"),
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
            message: (err as Error)?.message || t("form.notifications.error"),
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
                options={wagonOptions || []}
                control={control as any}
                required={item.isRequired}
                label={t(`form.fields.${item.name}.label`)}
                placeholder={item.placeholder}
                formLabelClassName={styles["form-label"]}
                isSearchable
                isClearable
                hideSelectedOptions
                multiselect
              />
            </React.Fragment>
          );
        }

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
                // disabled={item.name === "trainSetNo"}
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
      {selectedWagons && selectedWagons.length > 0 && (
        <SelectedItemList
          name="wagons"
          selectedItems={selectedWagons}
          setValue={setValue}
          title={t("form.fields.selectedWagons")}
        />
      )}

      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.creator")}
          </span>
          <span className={styles["activity-value"]}>
            {data?.creator ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.createdAt")}
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.editor")}
          </span>
          <span className={styles["activity-value"]}>
            {data?.editor ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.activity.updatedAt")}
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.updatedAt) ?? "-"}
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
  );
};
