"use client";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { UserQueryTypes } from "@/app/api/users/route";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { PopoverBody } from "@/components/Popover";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { PASSWORD_FORM_CONSTS } from "@/consts/profileConsts";
import { clearAuth } from "@/redux/slices/authSlice";
import { addToastify } from "@/redux/slices/toastSlice";
import { RootState } from "@/redux/store";
import stylesPopover from "@/styles/components/common/TableDeletePopover.module.scss";
import styles from "@/styles/components/profile/ProfileWrapper.module.scss";
import { IFormFieldType } from "@/types/formTypes";
import { IPasswordFormTypes } from "@/types/profileTypes";
import { extractApiError } from "@/utils/extractApiError";
import { PasswordFormValidation } from "@/utils/validations/passwordFormValidation";

const PasswordForm = () => {
  const t = useTranslations("profile");
  const tValidation = useTranslations("layout.validation-errors");
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IPasswordFormTypes>({
    resolver: yupResolver(PasswordFormValidation(tValidation)),
    defaultValues: {
      currentPassword: "",
      password: "",
      repassword: "",
    },
  });

  const onSubmit: SubmitHandler<IPasswordFormTypes> = async (data) => {
    try {
      await axiosInstance.post(CLIENT_END_POINTS.user.changePassword, {
        type: UserQueryTypes.changePassword,
        params: {
          id: userId,
          currentPassword: data.currentPassword,
          newPassword: data.password,
        },
      });
      dispatch(
        addToastify({
          message: t("form.notifications.editPassword.success"),
          type: "success",
          icon: "close",
          id: "editPassword" + Date.now(),
        }),
      );
      reset();
      dispatch(clearAuth());
      router.replace("/login");
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(
            err,
            t("form.notifications.editPassword.error"),
          ),
          type: "error",
          icon: "close",
          id: "editPasswordError" + Date.now(),
        }),
      );
    }
  };
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
                passwordToggle
              />
            </React.Fragment>
          );
        })}

        <div className={styles["btn-group"]}>
          <PopoverBody
            triggerBody={
              <Button
                type="simple"
                className={styles["submit-btn"]}
                label={
                  isSubmitting
                    ? t("form.buttons.editSubmitting")
                    : t("form.buttons.editPassword")
                }
                disabled={isSubmitting}
              />
            }
            contentBody={
              <div className={stylesPopover["content"]}>
                <p className={stylesPopover["text"]}>
                  {t("form.questions.editPassword")}
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
    </div>
  );
};

export default PasswordForm;
