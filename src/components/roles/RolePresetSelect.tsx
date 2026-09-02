"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { UseFormSetValue } from "react-hook-form";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SelectBox } from "@/components/formElements/SelectBox";
import { getRolePreset, ROLE_PRESETS } from "@/consts/rolePresets";
import { usePermissionOptions } from "@/hooks/usePermissionOptions";
import { IRoleFormDataTypes } from "@/types/rolesTypes";

import styles from "@/styles/components/roles/RoleForm.module.scss";

interface IPropsTypes {
  control: any;
  setValue: UseFormSetValue<IRoleFormDataTypes>;
}

export const RolePresetSelect = ({ control, setValue }: IPropsTypes) => {
  const t = useTranslations("roles.presets");
  const { toOptions } = usePermissionOptions();

  const presetOptions = useMemo(
    () =>
      ROLE_PRESETS.map((preset) => ({
        label: t(`${preset.key}.name`),
        value: preset.key,
      })),
    [t],
  );

  const applyPreset = (value?: string) => {
    const preset = value ? getRolePreset(value) : undefined;
    if (!preset) return;
    setValue("roleDescription", t(`${preset.key}.description`), {
      shouldValidate: true,
    });
    setValue("permissions", toOptions(preset.permissions), {
      shouldValidate: true,
    });
  };

  return (
    <>
      <SelectBox
        control={control}
        label={t("label")}
        name="preset"
        placeholder={t("placeholder")}
        options={presetOptions}
        isClearable
        isSearchable
        changeExtraFn={applyPreset}
      />
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className={styles["alert-icon"]} />
        <span className={styles["info-text"]}>{t("hint")}</span>
      </div>
    </>
  );
};
