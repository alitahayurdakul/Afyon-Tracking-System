import { ILogCategoryType, ILogsType } from "@/types/logsTypes";

/**
 * Sistemde loglanan işlem türleri. Anahtarlar locale dosyalarındaki
 * `logs.actions.*` alanlarıyla birebir eşleşir.
 */
export const LOG_ACTIONS = {
  USER_CREATE: "USER_CREATE",
  USER_UPDATE: "USER_UPDATE",
  USER_DELETE: "USER_DELETE",
  USER_PASSWORD_CHANGE: "USER_PASSWORD_CHANGE",
  AUTH_LOGIN: "AUTH_LOGIN",
  AUTH_LOGOUT: "AUTH_LOGOUT",
  ROLE_CREATE: "ROLE_CREATE",
  ROLE_UPDATE: "ROLE_UPDATE",
  ROLE_DELETE: "ROLE_DELETE",
  PROCESS_START: "PROCESS_START",
  PROCESS_COMPLETE: "PROCESS_COMPLETE",
  PROCESS_DELETE: "PROCESS_DELETE",
  STAGE_START: "STAGE_START",
  STAGE_COMPLETE: "STAGE_COMPLETE",
  SUB_STAGE_COMPLETE: "SUB_STAGE_COMPLETE",
  WORKFLOW_CREATE: "WORKFLOW_CREATE",
  WORKFLOW_UPDATE: "WORKFLOW_UPDATE",
  PROJECT_CREATE: "PROJECT_CREATE",
  TRAIN_CREATE: "TRAIN_CREATE",
  TRAIN_DELETE: "TRAIN_DELETE",
  WAGON_CREATE: "WAGON_CREATE",
  MATERIAL_DELETE: "MATERIAL_DELETE",
  REASON_CREATE: "REASON_CREATE",
} as const;

export type ILogActionType = (typeof LOG_ACTIONS)[keyof typeof LOG_ACTIONS];

/** İşlem türü -> rozet kategorisi. Bilinmeyen anahtarlar nötr gösterilir. */
export const LOG_ACTION_CATEGORY: Record<string, ILogCategoryType> = {
  [LOG_ACTIONS.USER_CREATE]: "create",
  [LOG_ACTIONS.USER_UPDATE]: "update",
  [LOG_ACTIONS.USER_DELETE]: "delete",
  [LOG_ACTIONS.USER_PASSWORD_CHANGE]: "update",
  [LOG_ACTIONS.AUTH_LOGIN]: "auth",
  [LOG_ACTIONS.AUTH_LOGOUT]: "auth",
  [LOG_ACTIONS.ROLE_CREATE]: "create",
  [LOG_ACTIONS.ROLE_UPDATE]: "update",
  [LOG_ACTIONS.ROLE_DELETE]: "delete",
  [LOG_ACTIONS.PROCESS_START]: "process",
  [LOG_ACTIONS.PROCESS_COMPLETE]: "process",
  [LOG_ACTIONS.PROCESS_DELETE]: "delete",
  [LOG_ACTIONS.STAGE_START]: "process",
  [LOG_ACTIONS.STAGE_COMPLETE]: "process",
  [LOG_ACTIONS.SUB_STAGE_COMPLETE]: "process",
  [LOG_ACTIONS.WORKFLOW_CREATE]: "create",
  [LOG_ACTIONS.WORKFLOW_UPDATE]: "update",
  [LOG_ACTIONS.PROJECT_CREATE]: "create",
  [LOG_ACTIONS.TRAIN_CREATE]: "create",
  [LOG_ACTIONS.TRAIN_DELETE]: "delete",
  [LOG_ACTIONS.WAGON_CREATE]: "create",
  [LOG_ACTIONS.MATERIAL_DELETE]: "delete",
  [LOG_ACTIONS.REASON_CREATE]: "create",
};

/* -------------------------------------------------------------------------- */
/* GEÇİCİ MOCK VERİ                                                           */
/* Log API'si hazır olmadığı için tablo bu sabit listeyle besleniyor.          */
/* API bağlandığında yalnızca useGetLogsDataQuery güncellenecek, bu dosya      */
/* tamamen silinebilir.                                                       */
/* -------------------------------------------------------------------------- */

const MOCK_USERS = [
  { userId: "6716f2a41b3c4e0021a8c101", fullname: "Baturalp Kurt" },
  { userId: "6716f2a41b3c4e0021a8c102", fullname: "Berke Erözdoğan" },
  { userId: "6716f2a41b3c4e0021a8c103", fullname: "Ayşe Demir" },
  { userId: "6716f2a41b3c4e0021a8c104", fullname: "Fatma Yılmaz" },
  { userId: "6716f2a41b3c4e0021a8c105", fullname: "Hasan Kaya" },
  { userId: "6716f2a41b3c4e0021a8c106", fullname: "Zeynep Aydın" },
  { userId: "6716f2a41b3c4e0021a8c107", fullname: "Murat Şahin" },
  { userId: "6716f2a41b3c4e0021a8c108", fullname: "Elif Çelik" },
];

const MOCK_ACTION_SEQUENCE: string[] = [
  LOG_ACTIONS.AUTH_LOGIN,
  LOG_ACTIONS.PROCESS_START,
  LOG_ACTIONS.STAGE_START,
  LOG_ACTIONS.SUB_STAGE_COMPLETE,
  LOG_ACTIONS.USER_CREATE,
  LOG_ACTIONS.STAGE_COMPLETE,
  LOG_ACTIONS.WAGON_CREATE,
  LOG_ACTIONS.USER_UPDATE,
  LOG_ACTIONS.WORKFLOW_CREATE,
  LOG_ACTIONS.PROCESS_COMPLETE,
  LOG_ACTIONS.MATERIAL_DELETE,
  LOG_ACTIONS.AUTH_LOGOUT,
  LOG_ACTIONS.ROLE_UPDATE,
  LOG_ACTIONS.TRAIN_CREATE,
  LOG_ACTIONS.USER_DELETE,
  LOG_ACTIONS.PROJECT_CREATE,
  LOG_ACTIONS.USER_PASSWORD_CHANGE,
  LOG_ACTIONS.WORKFLOW_UPDATE,
  LOG_ACTIONS.REASON_CREATE,
  LOG_ACTIONS.PROCESS_DELETE,
  LOG_ACTIONS.ROLE_CREATE,
  LOG_ACTIONS.TRAIN_DELETE,
  LOG_ACTIONS.STAGE_START,
  LOG_ACTIONS.ROLE_DELETE,
];

const MOCK_LOG_COUNT = 68;
/** Sabit başlangıç anı — SSR ve CSR aynı çıktıyı üretsin diye new Date() yok. */
const MOCK_BASE_TIME = Date.parse("2026-08-24T17:40:00+03:00");
const MOCK_STEP_MS = 37 * 60 * 1000;

export const MOCK_LOGS: ILogsType = Array.from(
  { length: MOCK_LOG_COUNT },
  (_, index) => {
    const user = MOCK_USERS[index % MOCK_USERS.length];
    const action =
      MOCK_ACTION_SEQUENCE[(index * 5) % MOCK_ACTION_SEQUENCE.length];

    return {
      _id: `log_${String(index + 1).padStart(4, "0")}`,
      userId: user.userId,
      fullname: user.fullname,
      operationTime: new Date(
        MOCK_BASE_TIME - index * MOCK_STEP_MS,
      ).toISOString(),
      action,
    };
  },
);
