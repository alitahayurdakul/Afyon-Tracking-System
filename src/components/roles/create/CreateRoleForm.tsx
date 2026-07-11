"use client";
/* eslint-disable */

import styles from "@/styles/components/roles/RoleForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoleFormValidation } from "@/utils/validations/roleFormValidation";
import { useCallback, useMemo } from "react";
import { InputBox } from "@/components/formElements/InputBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IRoleFormDataTypes } from "@/types/rolesTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { RoleQueryTypes } from "@/app/api/roles/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { extractApiError } from "@/utils/extractApiError";
import { useTranslations } from "next-intl";
import {
  generatePermissionOptions,
  PermissionOption,
} from "@/consts/generatePermissionOptions";

export const CreateRoleForm = () => {
  const t = useTranslations("roles");
  const tPermission = useTranslations("permissions");
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<IRoleFormDataTypes>({
    resolver: yupResolver(RoleFormValidation()) as any,
    defaultValues: {
      roleName: "",
      roleDescription: "",
      permissions: [],
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();

  const roleOptions = useMemo(() => {
    return generatePermissionOptions().map((p: PermissionOption) => ({
      label: tPermission(p.label),
      value: p.value,
    }));
  }, []);

  const onSubmit: SubmitHandler<IRoleFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          roleName: data.roleName.trim(),
          roleDescription: data.roleDescription.trim(),
          permissions: data.permissions.map((p) => p.value),
        };
        await axiosInstance.post(CLIENT_END_POINTS.role.create, {
          type: RoleQueryTypes.createRole,
          params,
        });
        dispatch(
          addToastify({
            message: t("notifications.createSuccess"),
            type: "success",
            icon: "close",
            id: "createRole" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err) {
        dispatch(
          addToastify({
            message: extractApiError(err, t("notifications.createError")),
            type: "error",
            icon: "close",
            id: "createRole" + Date.now(),
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
        label={t("form.roleNameLabel")}
        name="roleName"
        placeholder={t("form.roleNamePlaceholder")}
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <TextAreaBox
        control={control as any}
        label={t("form.descriptionLabel")}
        {...register("roleDescription")}
        required
        rows={5}
        placeholder={t("form.descriptionPlaceholder")}
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label={t("form.permissionsLabel")}
        name="permissions"
        placeholder={t("form.permissionsPlaceholder")}
        required
        multiselect
        options={roleOptions}
      />
      <div className={styles["btn-group"]}>
        <Button
          clickFn={() => removeModal()}
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
