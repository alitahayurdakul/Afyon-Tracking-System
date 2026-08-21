"use client";


import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/api/axiosInstance";
import { useCurrentUserName } from "@/api/queries/useCurrentUser";
import { useGetMaterialsOptionsDataQuery } from "@/api/queries/useGetMaterialsQueries";
import { SubStageQueryTypes } from "@/app/api/sub-stages/route";
import SelectedItemList from "@/components/common/SelectedItemList";
import { Button } from "@/components/formElements/Button";
import { InputBox } from "@/components/formElements/InputBox";
import { SelectBox } from "@/components/formElements/SelectBox";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { addToastify } from "@/redux/slices/toastSlice";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";
import { IOptionType } from "@/types/formTypes";
import { ISubStageFormDataTypes } from "@/types/subStagesTypes";
import { InputSpaceEnums } from "@/utils/enum/formEnums";
import { extractApiError } from "@/utils/extractApiError";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { SubStageFormValidation } from "@/utils/validations/subStageFormValidation";

import styles from "@/styles/components/subStages/SubStageForm.module.scss";

export const CreateSubStageForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const t = useTranslations("subStages");
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ISubStageFormDataTypes>({
    resolver: yupResolver(SubStageFormValidation(tValidation)),
    defaultValues: {
      name: "",
      materials: [],
      desc: "",
    },
  });

  const dispatch = useDispatch();
  const currentUserName = useCurrentUserName();
  const removeModal = useRemoveQueryParamModal();
  const {data: materialOptions} = useGetMaterialsOptionsDataQuery();

  const selectedMaterials = watch("materials");

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ISubStageFormDataTypes> = async (data) => {
    try {
      const params = {
        name: data.name,
        materialIds: data.materials.map((material: IOptionType) => material.value),
        description: data.desc,
        creator: currentUserName,
      };

      await axiosInstance.post(CLIENT_END_POINTS.subStage.create, {
        type: SubStageQueryTypes.createSubStage,
        params,
      });
      dispatch(
        addToastify({
          message: t("form.notifications.createSuccess"),
          type: "success",
          icon: "close",
          id: "createSubStage" + Date.now(),
        }),
      );
      dispatch(addTriggerTable());
      reset();
      removeModal();
    } catch (err: any) {
      dispatch(
        addToastify({
          message: extractApiError(err, t("form.notifications.createError")),
          type: "error",
          icon: "close",
          id: "createSubStage" + Date.now(),
        }),
      );
    }
  };

  return (
    <form className={styles["train-form"]}>
      <InputBox
        control={control as any}
        label={t("form.nameLabel")}
        name="name"
        placeholder={t("form.namePlaceholder")}
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />

      <TextAreaBox
        control={control as any}
        label={t("form.descriptionLabel")}
        {...register("desc")}
        rows={5}
        placeholder={t("form.descriptionPlaceholder")}
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
      />
      <SelectBox
        control={control as any}
        label={t("form.materialsLabel")}
        name="materials"
        placeholder={t("form.materialsPlaceholder")}
        required
        options={materialOptions ?? []}
        isSearchable
        isClearable
        multiselect
        hideSelectedOptions
      />

      {selectedMaterials && selectedMaterials.length > 0 && (
        <SelectedItemList
          name="materials"
          selectedItems={selectedMaterials}
          setValue={setValue}
          title={t("form.selectedMaterials")}
        />
      )}

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
