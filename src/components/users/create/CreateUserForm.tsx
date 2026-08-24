"use client";


import React from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useGetRolesOptionsQuery } from "@/api/queries/useGetRolesQueries";
import { UserQueryTypes } from "@/app/api/users/route";
import { Button } from "@/components/formElements/Button";
import { CheckBox } from "@/components/formElements/Checkbox";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IUserFormDataTypes } from "@/types/usersTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { UserFormValidation } from "@/utils/validations/userFormValidation";

import styles from "@/styles/components/users/UserForm.module.scss";

export const CreateUserForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const t = useTranslations("users");
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IUserFormDataTypes>({
    resolver: yupResolver(UserFormValidation(tValidation)),
    defaultValues: {
      fullname: "",
      email: "",
      pwd: "",
      phone: "",
      // department: "",
      role: "",
      isActive: true,
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();
  const { data: roleOptions } = useGetRolesOptionsQuery();

  const onCancel = () => removeModal();

  const onSubmit: SubmitHandler<IUserFormDataTypes> = async (data) => {
    try {
      const params = {
        fullname: data.fullname.trim(),
        email: data.email.trim().toLowerCase(),
        pwd: data.pwd,
        phone: data.phone.trim(),
        // department: data.department,
        role: data.role,
      };
      await axiosInstance.post(CLIENT_END_POINTS.user.create, {
        type: UserQueryTypes.createUser,
        params,
      });
      dispatch(
        addToastify({
          message: t("notifications.createSuccess"),
          type: "success",
          icon: "close",
          id: "createUser" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("users"));
      reset();
      removeModal();
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.createError")),
          type: "error",
          icon: "close",
          id: "createUser" + Date.now(),
        }),
      );
    }
  };

  return (
    <form className={styles["train-form"]}>
      <InputBox
        control={control as any}
        label={t("form.fullnameLabel")}
        name="fullname"
        placeholder={t("form.fullnamePlaceholder")}
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label={t("form.emailLabel")}
        name="email"
        placeholder={t("form.emailPlaceholder")}
        required
        maxLength={120}
        spacesRule={InputSpaceEnums.noSpaces}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label={t("form.passwordLabel")}
        name="pwd"
        placeholder={t("form.passwordPlaceholder")}
        required
        type="password"
        maxLength={64}
        spacesRule={InputSpaceEnums.noSpaces}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label={t("form.phoneLabel")}
        name="phone"
        placeholder={t("form.phonePlaceholder")}
        required
        maxLength={20}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      {/* <SelectBox
        control={control as any}
        label={t("form.departmentLabel")}
        name="department"
        placeholder={t("form.departmentPlaceholder")}
        required
        options={USER_DEPARTMENT_OPTIONS}
      /> */}
      <SelectBox
        control={control as any}
        label={t("form.roleLabel")}
        name="role"
        placeholder={t("form.rolePlaceholder")}
        required
        options={roleOptions ?? []}
      />
      <CheckBox
        name="isActive"
        control={control as any}
        align="top"
        label={t("form.isActiveLabel")}
        required={false}
      />
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
