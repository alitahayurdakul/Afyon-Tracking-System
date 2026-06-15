import { IOptionType } from "./formTypes";

export const optionsConverters = (data: any, valueKey: string, labelKey: string) => {
    const options: IOptionType[] = data.map((item: any) => {
        return {
            value: item[valueKey],
            label: item[labelKey]
        }
    });

    const filteredOptions = options.filter((option: IOptionType) => option.value && option.label);

    return filteredOptions;
}