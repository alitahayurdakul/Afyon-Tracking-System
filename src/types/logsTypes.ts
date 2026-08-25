import { ITableResponseType } from "./commonTypes";

/**
 * Log kaydının hangi işlem türüne ait olduğu. Rozet rengi bu değere göre
 * belirlenir (bkz. LOG_ACTION_CATEGORY).
 */
export type ILogCategoryType =
  | "create"
  | "update"
  | "delete"
  | "auth"
  | "process";

export interface ILogType {
  _id: string;
  userId: string;
  fullname: string;
  /** ISO 8601 */
  operationTime: string;
  /** LOG_ACTIONS içindeki anahtarlardan biri */
  action: string;
}

export type ILogsType = Array<ILogType>;

export interface ILogsResponseDataTypes extends ITableResponseType {
  data: ILogType[];
}
