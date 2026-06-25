"use client";
/* eslint-disable */

import { extractApiError } from "@/utils/extractApiError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/users/UserForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserEditFormDataTypes, IUserType } from "@/types/usersTypes";
import { UserEditFormValidation } from "@/utils/validations/userFormValidation";
import React, { useCallback, useMemo } from "react";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { addToastify } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { UserQueryTypes } from "@/app/api/users/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import {
  USER_DEPARTMENT_OPTIONS,
  USER_ACTIVE_OPTIONS,
} from "@/consts/usersConsts";
import { useGetRolesDataQuery } from "@/api/queries/useGetRolesQueries";
import { useTranslations } from "next-intl";

interface IPropsTypes {
  id: string;
  data?: IUserType;
}

export const EditUserForm = ({ id, data }: IPropsTypes) => {
  const t = useTranslations("users");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IUserEditFormDataTypes>({
    resolver: yupResolver(UserEditFormValidation()),
    defaultValues: {
      fullname: data?.fullname ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      department: data?.department ?? "",
      role:
        typeof data?.role === "string" ? data?.role : (data?.role?._id ?? ""),
      isActive: data?.isActive ?? true,
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();
  const { data: rolesData } = useGetRolesDataQuery();
  const roleOptions = useMemo(
    () =>
      (rolesData?.roles ?? []).map((r) => ({
        label: r.roleName,
        value: r._id,
      })),
    [rolesData],
  );

  const onCancel = () => removeModal();

  const onSubmit: SubmitHandler<IUserEditFormDataTypes> = useCallback(
    async (formData) => {
      try {
        const params: Record<string, any> = {
          id,
          fullname: formData.fullname.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          department: formData.department,
          role: formData.role,
          isActive: formData.isActive,
        };
        await axiosInstance.post(CLIENT_END_POINTS.user.edit, {
          type: UserQueryTypes.editUser,
          params,
        });
        dispatch(
          addToastify({
            message: t("notifications.editSuccess"),
            type: "success",
            icon: "close",
            id: "editUser" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: extractApiError(err, t("notifications.editError")),
            type: "error",
            icon: "close",
            id: "editUser" + Date.now(),
          }),
        );
      }
    },
    [id],
  );

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
        label={t("form.phoneLabel")}
        name="phone"
        placeholder={t("form.phonePlaceholder")}
        required
        maxLength={20}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label={t("form.departmentLabel")}
        name="department"
        placeholder={t("form.departmentPlaceholder")}
        required
        options={USER_DEPARTMENT_OPTIONS}
      />
      <SelectBox
        control={control as any}
        label={t("form.roleLabel")}
        name="role"
        placeholder={t("form.rolePlaceholder")}
        required
        options={roleOptions}
      />
      <SelectBox
        control={control as any}
        label={t("form.statusLabel")}
        name="isActive"
        placeholder={t("form.statusPlaceholder")}
        required
        options={USER_ACTIVE_OPTIONS}
      />

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]}>
          {t("form.editInfo")}
        </span>
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
