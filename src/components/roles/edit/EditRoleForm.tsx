"use client";


import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";
import { RoleQueryTypes } from "@/app/api/roles/route";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { usePermissionOptions } from "@/hooks/usePermissionOptions";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IRoleFormDataTypes, IRoleType } from "@/types/rolesTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { RoleFormValidation } from "@/utils/validations/roleFormValidation";

import { RolePresetSelect } from "../RolePresetSelect";

import styles from "@/styles/components/roles/RoleForm.module.scss";

interface IPropsTypes {
  id: string;
  data?: IRoleType;
}

export const EditRoleForm = ({ id, data }: IPropsTypes) => {
  const tValidation = useTranslations("layout.validation-errors");
  const t = useTranslations("roles");
  const { permissionOptions, toOptions } = usePermissionOptions();

  const defaultPermissions = useMemo(
    () => toOptions(data?.permissions ?? []),
    [data, toOptions],
  );

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm<IRoleFormDataTypes>({
    resolver: yupResolver(RoleFormValidation(tValidation)) as any,
    defaultValues: {
      roleName: data?.roleName ?? "",
      roleDescription: data?.roleDescription ?? "",
      permissions: defaultPermissions,
      preset: "",
    },
  });

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();

  const onSubmit: SubmitHandler<IRoleFormDataTypes> = async (formData) => {
    try {
      const params = {
        id,
        roleName: formData.roleName.trim(),
        roleDescription: formData.roleDescription.trim(),
        permissions: formData.permissions.map((p) => p.value),
        editor: currentUserName,
      };
      await axiosInstance.post(CLIENT_END_POINTS.role.edit, {
        type: RoleQueryTypes.editRole,
        params,
      });
      dispatch(
        addToastify({
          message: t("notifications.editSuccess"),
          type: "success",
          icon: "close",
          id: "editRole" + Date.now(),
        }),
      );
      dispatch(addTriggerTable("roles"));
      removeModal();
    } catch (err) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("notifications.editError")),
          type: "error",
          icon: "close",
          id: "editRole" + Date.now(),
        }),
      );
    }
  };

  return (
    <form className={styles["train-form"]}>
      <RolePresetSelect control={control} setValue={setValue} />
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
        options={permissionOptions ?? []}
        isClearable
        isSearchable
        hideSelectedOptions
      />

      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]}>{t("form.editInfo")}</span>
      </div>

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
