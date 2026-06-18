"use client";
/* eslint-disable */

import styles from "@/styles/components/users/UserForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserFormValidation } from "@/utils/validations/userFormValidation";
import React, { useCallback } from "react";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IUserFormDataTypes } from "@/types/usersTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { UserQueryTypes } from "@/app/api/users/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import {
  USER_DEPARTMENT_OPTIONS,
  USER_ACTIVE_OPTIONS,
} from "@/consts/usersConsts";
import { useGetRolesDataQuery } from "@/api/queries/useGetRolesQueries";
import { useMemo } from "react";
import { extractApiError } from "@/utils/extractApiError";

export const CreateUserForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IUserFormDataTypes>({
    resolver: yupResolver(UserFormValidation()),
    defaultValues: {
      fullname: "",
      email: "",
      pwd: "",
      phone: "",
      department: "",
      role: "",
      isActive: true,
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

  const onSubmit: SubmitHandler<IUserFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          fullname: data.fullname.trim(),
          email: data.email.trim().toLowerCase(),
          pwd: data.pwd,
          phone: data.phone.trim(),
          department: data.department,
          role: data.role,
        };
        await axiosInstance.post(CLIENT_END_POINTS.user.create, {
          type: UserQueryTypes.createUser,
          params,
        });
        dispatch(
          addToastify({
            message: "Kullanıcı başarıyla oluşturuldu",
            type: "success",
            icon: "close",
            id: "createUser" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: extractApiError(err, "Kullanıcı oluşturulamadı"),
            type: "error",
            icon: "close",
            id: "createUser" + Date.now(),
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
        label="Ad Soyad"
        name="fullname"
        placeholder="Ad soyad giriniz"
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label="E-posta"
        name="email"
        placeholder="ornek@firma.com"
        required
        maxLength={120}
        spacesRule={InputSpaceEnums.noSpaces}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label="Şifre"
        name="pwd"
        placeholder="Şifre giriniz"
        required
        type="password"
        maxLength={64}
        spacesRule={InputSpaceEnums.noSpaces}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label="Telefon"
        name="phone"
        placeholder="+90 5XX XXX XX XX"
        required
        maxLength={20}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label="Departman"
        name="department"
        placeholder="Departman seçiniz"
        required
        options={USER_DEPARTMENT_OPTIONS}
      />
      <SelectBox
        control={control as any}
        label="Rol"
        name="role"
        placeholder="Rol seçiniz"
        required
        options={roleOptions}
      />
      <SelectBox
        control={control as any}
        label="Durum"
        name="isActive"
        placeholder="Durum seçiniz"
        required
        options={USER_ACTIVE_OPTIONS}
      />
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
