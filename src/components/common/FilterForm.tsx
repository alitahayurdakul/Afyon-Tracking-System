"use client";
import { DataProvider } from "@/api/DataProvider";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import styles from "@/styles/components/statistics/FilterForm.module.scss";
import { IFilterType } from "@/types/filterTypes";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IOptionType } from "@/types/formTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectBox } from "../formElements/SelectBox";

interface IPropsTypes {
  filterItems: IFilterType[];
  isLoading?: boolean;
  defaultValues?: any;
  containerClassName?: string;
  resetFilter?: number;
}

export const FilterForm = ({
  filterItems,
  isLoading,
  defaultValues,
  containerClassName,
  resetFilter,
}: IPropsTypes) => {
  const [key, setKey] = useState<number>(0);
  const { control, getValues, setValue, reset, register, watch } = useForm<any>(
    {},
  );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeFormElement = useCallback(() => {
    const values = getValues();
    const queries: {
      [key: string]: string | string[] | number | number[];
    } = {};

    for (const key in values) {
      if (
        values[key] &&
        values[key] !== null &&
        JSON.stringify(values[key]) !== "[]"
      ) {
        const isSavedPropertyItem = filterItems.find(
          (item: IFilterType) => item.name === key,
        );

        if (isSavedPropertyItem?.savedProperty) {
          if (Array.isArray(values[key])) {
            queries[key] = values[key].map(
              (v: IOptionType) =>
                v[
                  isSavedPropertyItem.savedProperty as keyof IOptionType
                ] as string,
            );
          } else if (!isSavedPropertyItem.isMultiSelect) {
            queries[key] = values[key];
          } else {
            queries[key] =
              values[key][
                isSavedPropertyItem.savedProperty as keyof IOptionType
              ];
          }
        } else {
          return null;
        }
      }
    }

    const filteredRest = Object.fromEntries(
      [...searchParams.entries()].filter(
        // ← iterate properly as URLSearchParams
        ([key]) => !Object.keys(values).includes(key),
      ),
    );

    filteredRest.currentPage = "1";

    setKey((prev) => prev + 1);
  }, [filterItems, getValues, searchParams]); // ← add searchParams

  return (
    <form
      className={styles["filter-container"]}
      style={{
        gridTemplateColumns:
          filterItems.length > 2
            ? "repeat(auto-fill, minmax(calc(33% - 10px), 1fr))"
            : "repeat(auto-fill, minmax(calc(50% - 7.5px), 1fr))",
      }}
    >
      {filterItems &&
        filterItems.map((item: IFilterType, index: number) => {
            if (item.type === "select" && item.options && item.options.length > 0) {
              return (
                <React.Fragment key={index}>
                  <SelectBox
                    key={key}
                    name={item.name}
                    options={item.options}
                    changeExtraFn={onChangeFormElement}
                    formLabelClassName={styles["form-label"]}
                    loading={isLoading}
                    multiselect={item.isMultiSelect}
                    control={control as any}
                    label={item.label}
                    valueContainerStyles={{
                      fontSize: "14px",
                    }}
                    multiLabel={item.multiLabel}
                    placeholder={item.placeholder}
                    disabled={item.isDisabled}
                    isClearable={item.isClearable}
                    hideIndicator={item.isDisabled}
                  />
                </React.Fragment>
              );
            }
            if(item.type === "select" && !item.options){
              return (
                <React.Fragment key={index}>
                  <DataProvider
                    apiUrl={
                      item.apiKey
                        ? CLIENT_END_POINTS.common[item.apiKey]
                        : item.apiUrl || ""
                    }
                    extraParams={{
                      ...(item.queryType && { queryType: item.queryType }),
                    }}
                  >
                    {(data, loading, error) => (
                      <SelectBox
                        key={key}
                        name={item.name}
                        options={data}
                        changeExtraFn={onChangeFormElement}
                        formLabelClassName={styles["form-label"]}
                        loading={loading || isLoading}
                        multiselect={item.isMultiSelect}
                        control={control as any}
                        label={item.label}
                        valueContainerStyles={{
                          fontSize: "14px",
                        }}
                        multiLabel={item.multiLabel}
                        placeholder={item.placeholder}
                        // defaultValue={
                        //   defaultValues && defaultValues[item.name]
                        //     ? getSelectBoxWithDefaultValues(
                        //         data,
                        //         defaultValues[item.name],
                        //         item
                        //       )
                        //     : getSelectDefaultValue(data, item)
                        // }
                        disabled={item.isDisabled}
                        isClearable={item.isClearable}
                        hideIndicator={item.isDisabled}
                      />
                    )}
                  </DataProvider>
                </React.Fragment>
              );
            }
            return null;
        })}
    </form>
  );
};
