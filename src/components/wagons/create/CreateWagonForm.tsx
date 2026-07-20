"use client";
/* eslint-disable */

import styles from "@/styles/components/wagons/WagonForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WagonFormValidation } from "@/utils/validations/wagonFormValidation";
import { useCallback } from "react";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IWagonFormDataTypes } from "@/types/wagonsTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { WagonQueryTypes } from "@/app/api/wagons/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { useTranslations } from "next-intl";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";

export const CreateWagonForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IWagonFormDataTypes>({
    resolver: yupResolver(WagonFormValidation(tValidation)),
    defaultValues: {
      name: "",
      desc: "",
    },
  });

  const t = useTranslations("wagons");
  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IWagonFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          wagonNo: data.name,
          description: data.desc,
          creator: currentUserName,
        };
        await axiosInstance.post(CLIENT_END_POINTS.wagon.create, {
          type: WagonQueryTypes.createWagon,
          params,
        });
        dispatch(
          addToastify({
            message: t("notifications.create.success"),
            type: "success",
            icon: "close",
            id: "createWagonSuccess" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: (err as Error)?.message || t("notifications.create.error"),
            type: "error",
            icon: "close",
            id: "createWagonError" + Date.now(),
          }),
        );
      }
    },
    [],
  );

  return (
    <form className={styles["train-form"]}>
      <InputBox
        control={control as any}
        label={t("form.labels.name")}
        name="name"
        placeholder={t("form.placeholders.name")}
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <TextAreaBox
        control={control as any}
        label={t("form.labels.description")}
        {...register("desc")}
        required
        rows={5}
        placeholder={t("form.placeholders.description")}
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />
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
  );
};
