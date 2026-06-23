"use client";
/* eslint-disable */
import styles from "@/styles/components/CreateFleetModal.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo } from "react";
import { IFormFieldType } from "@/types/formTypes";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { SelectBox } from "@/components/formElements/SelectBox";

import { axiosInstance } from "@/api/axiosInstance";
import { CREATE_FLEET_FORM_CONSTS } from "@/consts/newFleetFormConsts";
import { ICreateFleetFormDataTypes } from "@/types/createFleetTypes";
import { ProcessQueryTypes } from "@/app/api/processes/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { useGetWorkflowsDataQuery } from "@/api/queries/useGetWorkflowsQueries";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";
import { useRouter } from "next/navigation";
import { CreateFleetFormValidation } from "@/utils/validations/createFleetFormValidation";
import { useGetTrainsDataQuery } from "@/api/queries/useGetTrainsQueries";
import { URL_PAGES } from "@/consts/url";
import { InputSpaceEnums } from "@/types/formEnums";
import { InputBox } from "../formElements/InputBox";
import { optionsConverters } from "@/types/optionsConverter";

export const CreateFleetForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    // clearErrors,
    // setFocus,
    setValue,
    formState: { isSubmitting },
  } = useForm<ICreateFleetFormDataTypes>({
    resolver: yupResolver(CreateFleetFormValidation()),
    defaultValues: {
      trainId: "",
      process: "",
    },
  });

  const { data: workflowsData } =
    useGetWorkflowsDataQuery<IWorkflowResponseTypes[]>();
  const { data: trainsResponse, isLoading } = useGetTrainsDataQuery();

  const dispatch = useDispatch();
  const router = useRouter();
  const removeModal = useRemoveQueryParamModal();

  const trainDatas = trainsResponse?.trains ?? [];

  const trainOptions = useMemo(
    () => optionsConverters(trainDatas || [], "trainSetNo", "trainSetNo"),
    [trainDatas],
  );

  const workflowOptions = useMemo(
    () => optionsConverters(workflowsData || [], "_id", "name"),
    [workflowsData],
  );

  const onCancel = () => {
    removeModal();
  };

  const VAGONS = [
    {
      value: "TCB",
      label: "TCB"
    },
    {
      value: "TCF",
      label: "TCF"
    }
  ]

  const onSubmit: SubmitHandler<ICreateFleetFormDataTypes> = useCallback(
    async (data) => {
      const params = {
        locomotiveNo: data.trainId,
        creator: "admin",
        processId: data.process,
      };
      const { data: responseData } = await axiosInstance.post(
        CLIENT_END_POINTS.processes.create,
        {
          type: ProcessQueryTypes.createProcess,
          params,
        },
      );
      dispatch(
        addToastify({
          message: "Yeni süreç başarıyla başlatıldı.",
          type: "success",
          icon: "close",
          id: "startNewProcess" + Date.now(),
        }),
      );
      if (responseData.data && responseData.data.process._id) {
        router.push(
          `${URL_PAGES.activeProcesses}/${responseData.data.process._id}`,
        );
      }
    },
    [trainDatas],
  );

  return (
    <form className={styles["start-process-form"]}>
      {CREATE_FLEET_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
        if (item.name === "trainId") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={trainOptions || []}
                control={control as any}
                required={item.isRequired}
                label={item.label}
                placeholder={`${item.label} seçiniz`}
                formLabelClassName={styles["form-label"]}
                isSearchable
                isClearable
                multiselect={item.isMultiselect}
                hideSelectedOptions
                loading={isLoading}
              />
            </React.Fragment>
          );
        }
           if (item.name === "vagonId") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={VAGONS || []}
                control={control as any}
                required={item.isRequired}
                label={item.label}
                placeholder={`${item.label} seçiniz`}
                formLabelClassName={styles["form-label"]}
                isSearchable
                isClearable
                multiselect={item.isMultiselect}
                hideSelectedOptions
                loading={isLoading}
              />
            </React.Fragment>
          );
        }
        if (item.name === "projectId") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={item.options || []}
                control={control as any}
                required={item.isRequired}
                label={item.label}
                placeholder={`${item.label} seçiniz`}
                formLabelClassName={styles["form-label"]}
                isSearchable
                isClearable
                multiselect={item.isMultiselect}
                hideSelectedOptions
                loading={isLoading}
              />
            </React.Fragment>
          );
        }
        if (item.name === "workflows") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={workflowOptions || []}
                control={control as any}
                required={item.isRequired}
                label={item.label}
                placeholder={`${item.label} seçiniz`}
                formLabelClassName={styles["form-label"]}
                isSearchable
                isClearable
                multiselect={item.isMultiselect}
                hideSelectedOptions
              />
            </React.Fragment>
          );
        }

        if (item.type === "input") {
          return (
            <React.Fragment key={index}>
              <InputBox
                control={control as any}
                label="Sebep Başlığı"
                name="name"
                placeholder="Ek bilgi girebilirsiniz"
                required
                maxLength={100}
                spacesRule={InputSpaceEnums.limitMaxOneSpace}
                inputClassName={styles["text-input"]}
              />
            </React.Fragment>
          );
        }
        return null;
      })}

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
          label="Başlat"
          disabled={isSubmitting}
        />
      </div>
    </form>
    // </div>
  );
};
