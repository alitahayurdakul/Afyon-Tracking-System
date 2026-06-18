"use client";
/* eslint-disable */

import styles from "@/styles/components/roles/RoleForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoleFormValidation } from "@/utils/validations/roleFormValidation";
import React, { useCallback, useMemo } from "react";
import { InputBox } from "@/components/formElements/InputBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IRoleFormDataTypes, IRoleType } from "@/types/rolesTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RoleQueryTypes } from "@/app/api/roles/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import {
  PERMISSION_OPTIONS,
  PERMISSION_LABEL_MAP,
} from "@/consts/permissionsConsts";
import { extractApiError } from "@/utils/extractApiError";

interface IPropsTypes {
  id: string;
  data?: IRoleType;
}

export const EditRoleForm = ({ id, data }: IPropsTypes) => {
  const permissionOptions = useMemo(
    () =>
      PERMISSION_OPTIONS.map((p) => ({
        label: p.label,
        value: String(p.value),
      })),
    [],
  );

  const defaultPermissions = useMemo(() => {
    return (data?.permissions ?? []).map((p) => ({
      label: PERMISSION_LABEL_MAP.get(p) ?? p,
      value: p,
    }));
  }, [data]);

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<IRoleFormDataTypes>({
    resolver: yupResolver(RoleFormValidation()) as any,
    defaultValues: {
      roleName: data?.roleName ?? "",
      roleDescription: data?.roleDescription ?? "",
      permissions: defaultPermissions,
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();

  const onSubmit: SubmitHandler<IRoleFormDataTypes> = useCallback(
    async (formData) => {
      try {
        const params = {
          id,
          roleName: formData.roleName.trim(),
          roleDescription: formData.roleDescription.trim(),
          permissions: formData.permissions.map((p) => p.value),
        };
        await axiosInstance.post(CLIENT_END_POINTS.role.edit, {
          type: RoleQueryTypes.editRole,
          params,
        });
        dispatch(
          addToastify({
            message: "Rol başarıyla güncellendi",
            type: "success",
            icon: "close",
            id: "editRole" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: extractApiError(err, "Rol güncellenemedi"),
            type: "error",
            icon: "close",
            id: "editRole" + Date.now(),
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
        label="Rol Adı"
        name="roleName"
        placeholder="Rol adı giriniz"
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <TextAreaBox
        control={control as any}
        label="Açıklama"
        {...register("roleDescription")}
        required
        rows={5}
        placeholder="Açıklama giriniz"
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label="Yetkiler"
        name="permissions"
        placeholder="Yetki seçiniz"
        required
        multiselect
        options={permissionOptions}
      />
      <div className={styles["btn-group"]}>
        <Button
          clickFn={removeModal}
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
