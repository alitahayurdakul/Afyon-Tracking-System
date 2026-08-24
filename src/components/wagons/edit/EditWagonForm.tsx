"use client";


import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";
import { WagonQueryTypes } from "@/app/api/wagons/route";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IWagonFormDataTypes, IWagonType } from "@/types/wagonsTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { formatDate } from "@/utils/formDate";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { WagonFormValidation } from "@/utils/validations/wagonFormValidation";

import styles from "@/styles/components/wagons/WagonForm.module.scss";

interface IPropsTypes {
  id: string;
  data?: IWagonType;
}

export const EditWagonForm = ({ id, data }: IPropsTypes) => {
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<IWagonFormDataTypes>({
    resolver: yupResolver(WagonFormValidation(tValidation)),
    defaultValues: {
      name: data?.wagonNo ?? "",
      desc: data?.description ?? "",
    },
  });
  const t = useTranslations("wagons");
  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IWagonFormDataTypes> = async (formData) => {
    try {
      const params = {
        id,
        wagonNo: formData.name,
        description: formData.desc,
        editor: currentUserName,
      };
      await axiosInstance.post(CLIENT_END_POINTS.wagon.edit, {
        type: WagonQueryTypes.editWagon,
        params,
      });
      dispatch(
        addToastify({
          message: t("notifications.edit.success"),
          type: "success",
          icon: "close",
          id: "editWagon" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("wagons"));
      removeModal();
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.edit.error")),
          type: "error",
          icon: "close",
          id: "editWagon" + Date.now(),
        }),
      );
    }
  };

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

      <section className={styles["activity-section"]}>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.creator")}:</span>
          <span className={styles["activity-value"]}>
            {currentUserName}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.createdDate")}:</span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.createdAt) ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>{t("form.labels.editor")}:</span>
          <span className={styles["activity-value"]}>
            {data?.editor ?? "-"}
          </span>
        </div>
        <div className={styles["activity-row"]}>
          <span className={styles["activity-label"]}>
            {t("form.labels.editedDate")}:
          </span>
          <span className={styles["activity-value"]}>
            {formatDate(data?.updatedAt) ?? "-"}
          </span>
        </div>
      </section>

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />

        <span className={styles["info-text"]}>
          {t("notifications.edit.warning-message")}
        </span>
      </div>

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
