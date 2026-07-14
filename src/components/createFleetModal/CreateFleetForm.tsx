"use client";
/* eslint-disable */
import styles from "@/styles/components/CreateFleetModal.module.scss";
import { Button } from "@/components/formElements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo } from "react";
import { IFormFieldType, IOptionType } from "@/types/formTypes";
import { useRemoveQueryParamModal } from "@/utils/searchParams";
import { useDispatch } from "react-redux";
import { addToastify } from "@/redux/slices/toastSlice";
import { SelectBox } from "@/components/formElements/SelectBox";

import { axiosInstance } from "@/api/axiosInstance";
import { CREATE_FLEET_FORM_CONSTS } from "@/consts/newFleetFormConsts";
import { ICreateFleetFormDataTypes } from "@/types/createFleetTypes";
import { ProcessQueryTypes } from "@/app/api/processes/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import {
  useGetWorkflowsDataQuery,
  useGetWorkflowsOptionsDataQuery,
} from "@/api/queries/useGetWorkflowsQueries";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";
import { useRouter } from "next/navigation";
import { CreateFleetFormValidation } from "@/utils/validations/createFleetFormValidation";
import {
  useGetTrainDetailWagonsDataQuery,
  useGetTrainOptionsDataQuery,
  useGetTrainsDataQuery,
} from "@/api/queries/useGetTrainsQueries";
import { URL_PAGES } from "@/consts/url";
import { InputSpaceEnums } from "@/types/formEnums";
import { InputBox } from "../formElements/InputBox";
import { optionsConverters } from "@/types/optionsConverter";
import { useTranslations } from "next-intl";
import { ITrainType } from "@/types/trainsTypes";
import { useGetProjectOptionsDataQuery } from "@/api/queries/useGetProjectsQueries";
import { extractApiError } from "@/utils/extractApiError";

export const CreateFleetForm = () => {
  const tValidation = useTranslations("layout.validation-errors");
  const {
    control,
    handleSubmit,
    watch,
    // clearErrors,
    // setFocus,
    setValue,
    formState: { isSubmitting },
  } = useForm<ICreateFleetFormDataTypes>({
    resolver: yupResolver(CreateFleetFormValidation(tValidation)),
    defaultValues: {
      trainId: "",
      workflows: "",
      wagonId: "",
      projectId: "",
      additionInfo: "",
    },
  });
  const trainId = watch("trainId");
  const t = useTranslations("layout.fleetForm");
  const { data: projectOptions } = useGetProjectOptionsDataQuery("ACTIVE");
  const { data: trainData, isLoading } = useGetTrainsDataQuery();
  const { data: workflowOptions } =
    useGetWorkflowsOptionsDataQuery<IOptionType[]>();

  const trainOptions = useMemo(() => {
    return optionsConverters(trainData ?? [], "_id", "trainSetNo");
  }, [trainData]);

  const wagonOptions = useMemo(() => {
    if (trainId) {
      const wagons =
        trainData?.find((train: ITrainType) => train._id === trainId)?.wagons ||
        {};
      return optionsConverters(wagons || [], "_id", "wagonNo");
    }
  }, [trainId, trainOptions]);

  const dispatch = useDispatch();
  const router = useRouter();
  const removeModal = useRemoveQueryParamModal();

  const onCancel = () => {
    removeModal();
  };

  const onSubmit: SubmitHandler<ICreateFleetFormDataTypes> = useCallback(
    async (data) => {
      try {
        const params = {
          projectId: data.projectId,
          trainId: data.trainId,
          wagonId: data.wagonId,
          workflowId: data.workflows,
          description: data.additionInfo,
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
            message: t("form.notifications.success"),
            type: "success",
            icon: "close",
            id: "startNewProcessSuccess" + Date.now(),
          }),
        );
        if (responseData.data && responseData.data.process._id) {
          router.push(
            `${URL_PAGES.activeProcesses}/${responseData.data.process._id}`,
          );
        }
      } catch (err: any) {
        dispatch(
          addToastify({
            message: extractApiError(err, t("form.notifications.error")),
            type: "error",
            icon: "close",
            id: "createProject" + Date.now(),
          }),
        );
      }
    },
    [trainOptions],
  );

  return (
    <form className={styles["start-process-form"]}>
      {CREATE_FLEET_FORM_CONSTS.map((item: IFormFieldType, index: number) => {
        if (item.name === "trainId") {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={trainOptions ?? []}
                control={control as any}
                required={item.isRequired}
                label={t(`form.labels.${item.label as string}`)}
                placeholder={t(`form.placeholders.${item.label as string}`)}
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
        if (item.name === "wagonId" && trainId) {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={wagonOptions || []}
                control={control as any}
                required={item.isRequired}
                label={t(`form.labels.${item.label as string}`)}
                placeholder={t(`form.placeholders.${item.label as string}`)}
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
                options={projectOptions || []}
                control={control as any}
                required={item.isRequired}
                label={t(`form.labels.${item.label as string}`)}
                placeholder={t(`form.placeholders.${item.label as string}`)}
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
        if (item.name === "workflows" && trainId) {
          return (
            <React.Fragment key={index}>
              <SelectBox
                name={item.name}
                options={workflowOptions || []}
                control={control as any}
                required={item.isRequired}
                label={t(`form.labels.${item.label as string}`)}
                placeholder={t(`form.placeholders.${item.label as string}`)}
                formLabelClassName={styles["form-label"]}
                isSearchable
                isClearable
                multiselect={item.isMultiselect}
                hideSelectedOptions
              />
            </React.Fragment>
          );
        }

        if (item.type === "input" && trainId) {
          return (
            <React.Fragment key={index}>
              <InputBox
                control={control as any}
                name={item.name}
                label={t(`form.labels.${item.label as string}`)}
                placeholder={t(`form.placeholders.${item.label as string}`)}
                required={item.isRequired}
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
