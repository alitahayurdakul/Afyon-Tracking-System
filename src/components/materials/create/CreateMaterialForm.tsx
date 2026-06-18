"use client";
/* eslint-disable */

import styles from "@/styles/components/materials/MaterialForm.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialFormValidation } from "@/utils/validations/materialFormValidation";
import React, { useCallback } from "react";
import { TextAreaBox } from "@/components/formElements/TextAreaBox";
import { InputBox } from "@/components/formElements/InputBox";
import { InputSpaceEnums } from "@/types/formEnums";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { IMaterialFormDataTypes } from "@/types/materialsTypes";
import { axiosInstance } from "@/api/axiosInstance";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { MaterialQueryTypes } from "@/app/api/materials/route";
import { addTriggerTable } from "@/redux/slices/triggerTableSlices";

export const CreateMaterialForm = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IMaterialFormDataTypes>({
    resolver: yupResolver(MaterialFormValidation()),
    defaultValues: {
      name: "",
      code: "",
      unit: "",
      stock: "",
      desc: "",
    },
  });

  const dispatch = useDispatch();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<IMaterialFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          name: data.name,
          code: data.code,
          unit: data.unit,
          stock: Number(data.stock),
          description: data.desc,
          editor: "Admin",
        };
        await axiosInstance.post(CLIENT_END_POINTS.material.create, {
          type: MaterialQueryTypes.createMaterial,
          params,
        });
        dispatch(
          addToastify({
            message: "Başarıyla oluşturuldu",
            type: "success",
            icon: "close",
            id: "createMaterial" + Date.now(),
          }),
        );
        dispatch(addTriggerTable());
        reset();
        removeModal();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err?.message ||
          "Oluşturma başarısız";
        dispatch(
          addToastify({
            message: errorMessage,
            type: "error",
            icon: "close",
            id: "createMaterial" + Date.now(),
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
        label="Malzeme Adı"
        name="name"
        placeholder="Malzeme adı giriniz"
        required
        maxLength={100}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label="Malzeme Kodu"
        name="code"
        placeholder="Malzeme kodu giriniz"
        required
        maxLength={50}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label="Birim"
        name="unit"
        placeholder="Örn: Adet, Litre, Kg"
        required
        maxLength={20}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <InputBox
        control={control as any}
        label="Stok Miktarı"
        name="stock"
        placeholder="Stok miktarı giriniz"
        required
        maxLength={10}
        spacesRule={InputSpaceEnums.limitMaxOneSpace}
        inputClassName={styles["text-input"]}
      />
      <TextAreaBox
        control={control as any}
        label="Açıklama"
        {...register("desc")}
        rows={5}
        placeholder="Açıklama giriniz"
        maxLength={400}
        visibleLimit
        textareaClassName={styles["text-input"]}
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
