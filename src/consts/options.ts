import { IStatusTypes } from "@/types/commonTypes";
import { ResponseStatusEnums, StatusEnums } from "@/utils/enum/commonEnums";

export const STATUS:IStatusTypes = [
    {
        value: "1",
        code: ResponseStatusEnums.completed,
        valueKey: StatusEnums.completed
    },
    {
        value: "2",
        code: ResponseStatusEnums.active,
        valueKey: StatusEnums.active
    },
    {
        value: "3",
        code: ResponseStatusEnums.pending,
        valueKey: StatusEnums.pending
    }
]