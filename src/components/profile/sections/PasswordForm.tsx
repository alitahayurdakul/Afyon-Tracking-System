"use client";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { PASSWORD_FORM_CONSTS } from "@/consts/profileConsts";
import styles from "@/styles/components/profile/ProfileWrapper.module.scss";
import { IFormFieldType } from "@/types/formTypes";
import { IPasswordFormTypes, IProfileFormTypes } from "@/types/profileTypes";
import { PasswordFormValidation } from "@/utils/validations/passwordFormValidation";
import { ProfileInfoFormValidation } from "@/utils/validations/profileFormValidations";

const PasswordForm = () => {
  const t = useTranslations("profile");
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IPasswordFormTypes>({
    resolver: yupResolver(PasswordFormValidation()),
    defaultValues: {
      
    },
  });

  const onSubmit: SubmitHandler<IPasswordFormTypes> = useCallback(
    async (data) => {
      console.log("runn", data);
      //   try {
      //     const wagons = data.wagons.map((option: IOptionType, index) => {
      //       return {
      //         order: index + 1,
      //         id: option.value,
      //       };
      //     });
      //     const params = {
      //       trainName: data.trainSetNo ?? "",
      //       wagons,
      //       desc: data.desc,
      //       creator: "Admin",
      //     };
      //     await axiosInstance.post(CLIENT_END_POINTS.train.create, {
      //       type: TrainQueryTypes.createTrain,
      //       params,
      //     });
      //     dispatch(
      //       addToastify({
      //         message: t("form.notifications.createSuccess"),
      //         type: "success",
      //         icon: "close",
      //         id: "createTrain" + Date.now(),
      //       }),
      //     );
      //     reset();
      //     dispatch(addTriggerTable());
      //     removeModal();
      //   } catch (err) {
      //     dispatch(
      //       addToastify({
      //         message: (err as Error)?.message || t("form.notifications.error"),
      //         type: "error",
      //         icon: "close",
      //         id: "createTrainError" + Date.now(),
      //       }),
      //     );
      //   }
    },
    [],
  );
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{t("cardTitles.password")}</h3>
      <form className={styles.form}>
        {PASSWORD_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
          return (
            <React.Fragment key={index}>
              <InputBox
                control={control as any}
                label={
                  <>
                    <FontAwesomeIcon icon={faLock} />{" "}
                    {t(`form.fields.${item.label}.label`)}
                  </>
                }
                name={item.name}
                placeholder={t(`form.fields.${item.label}.placeholder`)}
                required={item.isRequired}
                maxLength={item.maxLength}
                regex={item?.regex}
                onlyNumber={item?.onlyNumber}
                inputClassName={styles["text-input"]}
                type="password"
              />
            </React.Fragment>
          );
        })}

        <div className={styles["btn-group"]}>
          <Button
            clickFn={handleSubmit(onSubmit)}
            type="simple"
            className={styles["submit-btn"]}
            label={
              isSubmitting
                ? t("form.buttons.editSubmitting")
                : t("form.buttons.editPassword")
            }
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
