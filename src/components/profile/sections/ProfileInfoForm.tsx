"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { useGetRolesOptionsQuery } from "@/api/queries/useGetRolesQueries";
import { UserQueryTypes } from "@/app/api/users/route";
import { ErrorChecker } from "@/components/common/error/ErrorChecker";
import { LoadingChecker } from "@/components/common/loaders/LoadingChecker";
import { Button } from "@/components/formElements/Button";
import { CheckBox } from "@/components/formElements/Checkbox";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { PopoverBody } from "@/components/Popover";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { PROFILE_FORM_CONSTS } from "@/consts/profileConsts";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import stylesPopover from "@/styles/components/common/TableDeletePopover.module.scss";
import styles from "@/styles/components/profile/ProfileWrapper.module.scss";
import { IFormFieldType } from "@/types/formTypes";
import { IProfileFormTypes } from "@/types/profileTypes";
import { IUserRoleRef, IUserType } from "@/types/usersTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { ProfileInfoFormValidation } from "@/utils/validations/profileFormValidations";

const ProfileInfoForm = ({
  userInfo,
  isLoading,
  isError
}: {
  userInfo?: IUserType;
  isLoading: boolean;
  isError: boolean;
}) => {
  const t = useTranslations("profile");
  const tValidation = useTranslations("layout.validation-errors");
  const { data: roleOptions, isLoading: roleLoading } =
    useGetRolesOptionsQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, dirtyFields },
  } = useForm<IProfileFormTypes>({
    resolver: yupResolver(ProfileInfoFormValidation(tValidation)),
    defaultValues: {
      fullname: userInfo?.fullname,
      email: userInfo?.email,
      phone: userInfo?.phone,
      isActive: userInfo?.isActive,
      // department: userInfo?.department,
      role: (userInfo?.role as IUserRoleRef)._id,
    },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IProfileFormTypes> = async (data) => {
    const changedFields: Record<string, unknown> = {};
    (Object.keys(dirtyFields) as (keyof IProfileFormTypes)[]).forEach((key) => {
      changedFields[key] =
        typeof data[key] === "string"
          ? (data[key] as string).trim()
          : data[key];
    });

    if (Object.keys(changedFields).length === 0) return;
    if (typeof changedFields.email === "string") {
      changedFields.email = changedFields.email.toLowerCase();
    }

    try {
      await axiosInstance.post(CLIENT_END_POINTS.user.edit, {
        type: UserQueryTypes.editUser,
        params: { id: userInfo?._id, ...changedFields },
      });
      dispatch(
        addToastify({
          message: t("form.notifications.saveInfo.success"),
          type: "success",
          icon: "close",
          id: "profileInfo" + Date.now(),
        }),
      );
      reset(data);
      dispatch(addTriggerTable());
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.saveInfo.error")),
          type: "error",
          icon: "close",
          id: "profileInfoError" + Date.now(),
        }),
      );
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{t("cardTitles.profile")}</h3>
      <LoadingChecker
        isLoading={isLoading}
        icon={
          <div style={{ textAlign: "center" }}>
            <SpinnerIcon color={"var(--blue-90)"} />{" "}
          </div>
        }
      >
        <ErrorChecker isError={isError} errorLabel={t("error-label-profile")} errorClassName={styles["error-label"]} >
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
                    options={item.name === "role" ? (roleOptions ?? []) : []}
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
                    loading={roleLoading}
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
                    defaultChecked={userInfo?.isActive}
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
            <PopoverBody
              triggerBody={
                <Button
                  type="simple"
                  className={styles["submit-btn"]}
                  label={
                    isSubmitting
                      ? t("form.buttons.saveSubmitting")
                      : t("form.buttons.saveInfo")
                  }
                  disabled={isSubmitting}
                />
              }
              contentBody={
                <div className={stylesPopover["content"]}>
                  <p className={stylesPopover["text"]}>
                    {t("form.questions.saveInfo")}
                  </p>
                </div>
              }
              closeContainer={
                <div className={stylesPopover["btn-container"]}>
                  <button>{t("form.questions.no")}</button>
                  <button onClick={handleSubmit(onSubmit)}>
                    {t("form.questions.yes")}
                  </button>
                </div>
              }
            />
          </div>
        </form>
        </ErrorChecker>
      </LoadingChecker>
    </div>
  );
};

export default ProfileInfoForm;
