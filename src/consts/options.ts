import { IStatusTypes } from "@/types/commonTypes";
import { StatusEnums } from "@/utils/enum/commonEnums";

export const STATUS:IStatusTypes = [
    {
        value: "1",
        code: StatusEnums.completed,
        valueKey: "completed"
    },
    {
        value: "2",
        code: StatusEnums.active,
        valueKey: "active"
    },
    {
        value: "3",
        code: StatusEnums.pending,
        valueKey: "pending"
    }
]