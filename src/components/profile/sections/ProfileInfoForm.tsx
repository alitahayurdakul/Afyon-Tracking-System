"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/formElements/Button";
import { CheckBox } from "@/components/formElements/Checkbox";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { PROFILE_FORM_CONSTS } from "@/consts/profileConsts";
import styles from "@/styles/components/profile/ProfileWrapper.module.scss";
import { InputSpaceEnums } from "@/types/formEnums";
import { IFormFieldType } from "@/types/formTypes";
import { IProfileFormTypes } from "@/types/profileTypes";
import { ProfileInfoFormValidation } from "@/utils/validations/profileFormValidations";

const ProfileInfoForm = () => {
  const t = useTranslations("profile");
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IProfileFormTypes>({
    resolver: yupResolver(ProfileInfoFormValidation(tValidation)),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit: SubmitHandler<IProfileFormTypes> = useCallback(
    async (data) => {
      console.log(data);
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
      <h3 className={styles.cardTitle}>{t("cardTitles.profile")}</h3>
      <form className={styles.form}>
        {PROFILE_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
          if (
            item.type === "input" ||
            item.type === "email" ||
            item.type === "phoneInput"
          ) {
            return (
              <React.Fragment key={index}>
                <InputBox
                  control={control as any}
                  label={
                    <>
                      {item.icon && <FontAwesomeIcon icon={item.icon} />}{" "}
                      {t(`form.fields.${item.label}.label`)}
                    </>
                  }
                  name={item.name}
                  placeholder={t(`form.fields.${item.label}.placeholder`)}
                  required={item.isRequired}
                  maxLength={item.maxLength}
                  spacesRule={
                    item.type === "email"
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
                  options={[]}
                  control={control as any}
                  required={item.isRequired}
                  label={
                    <>
                      {item.icon && <FontAwesomeIcon icon={item.icon} />}{" "}
                      {t(`form.fields.${item.label}.label`)}
                    </>
                  }
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

          if (item.type === "checkbox") {
            return (
              <React.Fragment key={index}>
                <CheckBox
                  name={item.name}
                  control={control as any}
                  align="top"
                  className={styles["checkbox-container"]}
                  classNameInput={styles["checkbox-input"]}
                  label={
                    <span className={styles["checkbox-label"]}>
                      {t("form.fields.isActive.label")}
                    </span>
                  }
                  required={false}
                />
              </React.Fragment>
            );
          }

          return null;
        })}

        <div className={styles["btn-group"]}>
          <Button
            clickFn={handleSubmit(onSubmit)}
            type="simple"
            className={styles["submit-btn"]}
            label={
              isSubmitting
                ? t("form.buttons.saveSubmitting")
                : t("form.buttons.saveInfo")
            }
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
