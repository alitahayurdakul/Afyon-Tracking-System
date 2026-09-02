"use client";


import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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
import { IRoleFormDataTypes } from "@/types/rolesTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { RoleFormValidation } from "@/utils/validations/roleFormValidation";

import { RolePresetSelect } from "../RolePresetSelect";

import styles from "@/styles/components/roles/RoleForm.module.scss";

export const CreateRoleForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const t = useTranslations("roles");
  const { permissionOptions } = usePermissionOptions();
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<IRoleFormDataTypes>({
    resolver: yupResolver(RoleFormValidation(tValidation)) as any,
    defaultValues: {
      roleName: "",
      roleDescription: "",
      permissions: [],
      preset: "",
    },
  });

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();

  const onSubmit: SubmitHandler<IRoleFormDataTypes> = async (data) => {
    try {
      const params = {
        roleName: data.roleName.trim(),
        roleDescription: data.roleDescription.trim(),
        permissions: data.permissions.map((p) => p.value),
        creator: currentUserName,
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
      dispatch(addTriggerTable("roles"));
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
        options={permissionOptions}
        isClearable
        isSearchable
        hideSelectedOptions
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
