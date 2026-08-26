import {
  IPaginationTypes,
  IPaginationWithSearch,
  IPaginationWithStatus,
  IPaginationWithStatusAndSearch,
} from "@/types/commonTypes";

const apiUrl = process.env.API_URL || "api";

/** Upper bound for a client-supplied page size (UI offers at most 50). */
const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 25;

/**
 * Encodes a client-supplied value before it is interpolated into a backend URL.
 * Without this, an id containing "../", "?", "&" or "#" would silently change
 * which backend path is called. Throws on an empty value so a missing id fails
 * loudly instead of requesting ".../undefined".
 */
const enc = (value: string | number): string => {
  const raw = String(value ?? "").trim();
  if (!raw) {
    throw new Error("Missing required URL parameter");
  }
  return encodeURIComponent(raw);
};

/** Coerces a client-supplied page number into a safe positive integer. */
const pageNumber = (value: unknown): number => {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_PAGE_NUMBER;
};

const MAX_SEARCH_LENGTH = 100;

const searchParam = (value?: string): string => {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return `&search=${encodeURIComponent(raw.slice(0, MAX_SEARCH_LENGTH))}`;
};

/** Coerces a client-supplied page size into a safe, bounded integer. */
const pageSizeOf = (value: unknown): number => {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return DEFAULT_PAGE_SIZE;
  return Math.min(n, MAX_PAGE_SIZE);
};

export const END_POINTS = {
  stage: {
    create: `${apiUrl}/api/stages`,
    edit: (id: string) => `${apiUrl}/api/stages/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/stages/${enc(id)}`,
    getAll: `${apiUrl}/api/stages`,
    getDetail: (id: string) => `${apiUrl}/api/stages/${enc(id)}`,
    getFilteredStages: ({ currentPage, pageSize }: IPaginationTypes) =>
      `${apiUrl}/api/stages?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}`,
  },
  workflow: {
    create: `${apiUrl}/api/favorite-processes`,
    edit: (id: string) => `${apiUrl}/api/favorite-processes/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/favorite-processes/${enc(id)}`,
    getAll: `${apiUrl}/api/favorite-processes`,
    getDetail: (id: string) => `${apiUrl}/api/favorite-processes/${enc(id)}`,
    getFilteredWorkflows: ({ currentPage, pageSize }: IPaginationTypes) =>
      `${apiUrl}/api/favorite-processes?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}`,
  },
  train: {
    create: `${apiUrl}/api/trains`,
    edit: (trainId: string) => `${apiUrl}/api/trains/${enc(trainId)}`,
    delete: (trainId: string) => `${apiUrl}/api/trains/${enc(trainId)}`,
    getAll: `${apiUrl}/api/trains`,
    getDetail: (trainId: string) => `${apiUrl}/api/trains/${enc(trainId)}`,
    getFilteredTrains: ({
      pageSize,
      currentPage,
      search,
    }: IPaginationWithSearch) =>
      `${apiUrl}/api/trains?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}${searchParam(search)}`,
  },
  process: {
    start: `${apiUrl}/api/processes/start`,
    edit: (id: string) => `${apiUrl}/api/favorite-processes/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/favorite-processes/${enc(id)}`,
    getDetail: (id: string) => `${apiUrl}/api/processes/${enc(id)}`,
    getAll: ({ status, projectId }: { status?: string; projectId?: string }) =>
      `${apiUrl}/api/processes${projectId ? `?projectId=${enc(projectId)}` : ""}${status ? `${projectId ? "&" : "?"}status=${enc(status)}` : ""}`,
    stageDetail: (processId: string, stageId: string) =>
      `${apiUrl}/api/processes/${enc(processId)}/stages/${enc(stageId)}/substages`,
    subStageOperation: (
      processId: string,
      stageId: string,
      subStageId: string,
    ) =>
      `${apiUrl}/api/substages/processes/${enc(processId)}/stages/${enc(stageId)}/substages/${enc(subStageId)}`,
    completeStage: (entryId: string) =>
      `${apiUrl}/api/processes/stage-entry/${enc(entryId)}/close`,
    startStage: (processId: string) =>
      `${apiUrl}/api/processes/${enc(processId)}/start-stage`,
    deleteProcess: (id: string) => `${apiUrl}/api/processes/${enc(id)}`,
    getFilteredProcessHistory: ({
      pageSize,
      currentPage,
      status,
    }: IPaginationWithStatus) =>
      `${apiUrl}/api/processes?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}${status ? `&status=${enc(status)}` : ""}`,
  },
  processOperations: {
    complete: (processId: string) =>
      `${apiUrl}/api/processes/${enc(processId)}/complete`,
  },
  // workflowHistory: {
  //   getAll: `${apiUrl}/api/processes?status=COMPLETED`,
  //   getDetail: (id: string) => `${apiUrl}/api/processes/${enc(id)}`,
  // },
  statistics: {
    stages: (query: string) => `${apiUrl}/api/processes/statistics?${query}`,
    process: (query: string) =>
      `${apiUrl}/api/processes/process-statistics?${query}`,
  },
  wagon: {
    create: `${apiUrl}/api/wagons`,
    edit: (id: string) => `${apiUrl}/api/wagons/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/wagons/${enc(id)}`,
    getAll: `${apiUrl}/api/wagons`,
    getDetail: (id: string) => `${apiUrl}/api/wagons/${enc(id)}`,
    getFilteredWagons: ({
      currentPage,
      pageSize,
      search,
    }: IPaginationWithSearch) =>
      `${apiUrl}/api/wagons?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}${searchParam(search)}`,
  },
  reason: {
    create: `${apiUrl}/api/reasons`,
    edit: (id: string) => `${apiUrl}/api/reasons/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/reasons/${enc(id)}`,
    getAll: `${apiUrl}/api/reasons`,
    getDetail: (id: string) => `${apiUrl}/api/reasons/${enc(id)}`,
    getFilteredReasons: ({
      pageSize,
      currentPage,
      search,
    }: IPaginationWithSearch) =>
      `${apiUrl}/api/reasons?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}${searchParam(search)}`,
  },
  role: {
    create: `${apiUrl}/api/roles`,
    edit: (id: string) => `${apiUrl}/api/roles/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/roles/${enc(id)}`,
    getAll: `${apiUrl}/api/roles`,
    getDetail: (id: string) => `${apiUrl}/api/roles/${enc(id)}`,
    getFilteredRoles: ({ currentPage, pageSize }: IPaginationTypes) =>
      `${apiUrl}/api/roles?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}`,
  },
  auth: {
    login: `${apiUrl}/auth`,
    refresh: `${apiUrl}/refresh`,
    logout: `${apiUrl}/logout`,
    forgotPassword: `${apiUrl}/auth/forgot-password`,
    verifyResetCode: `${apiUrl}/auth/verify-reset-code`,
    resetPassword: `${apiUrl}/auth/reset-password`,
  },
  user: {
    create: `${apiUrl}/register`,
    edit: (id: string) => `${apiUrl}/api/users/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/users/${enc(id)}`,
    getAll: ({ currentPage, pageSize }: IPaginationTypes) =>
      `${apiUrl}/api/users?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}`,
    getDetail: (id: string) => `${apiUrl}/api/users/${enc(id)}`,
    changePassword: (id: string) => `${apiUrl}/api/users/${enc(id)}/password`,
  },
  material: {
    create: `${apiUrl}/api/materials`,
    edit: (id: string) => `${apiUrl}/api/materials/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/materials/${enc(id)}`,
    getAll: `${apiUrl}/api/materials`,
    getFilteredMaterials: ({
      pageSize,
      currentPage,
      search,
    }: IPaginationWithSearch) =>
      `${apiUrl}/api/materials?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}${searchParam(search)}`,
    getDetail: (id: string) => `${apiUrl}/api/materials/${enc(id)}`,
  },
  subStage: {
    create: `${apiUrl}/api/substages`,
    edit: (id: string) => `${apiUrl}/api/substages/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/substages/${enc(id)}`,
    getAll: `${apiUrl}/api/substages`,
    getDetail: (id: string) => `${apiUrl}/api/substages/${enc(id)}`,
    getFilteredSubStages: ({ pageSize, currentPage }: IPaginationTypes) =>
      `${apiUrl}/api/substages?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}`,
  },
  project: {
    create: `${apiUrl}/api/projects`,
    edit: (id: string) => `${apiUrl}/api/projects/${enc(id)}`,
    delete: (id: string) => `${apiUrl}/api/projects/${enc(id)}`,
    getAll: (status?: string) =>
      `${apiUrl}/api/projects${status ? `?status=${enc(status)}` : ""}`,
    getFilteredProjects: ({
      pageSize,
      currentPage,
      status,
      search,
    }: IPaginationWithStatusAndSearch) =>
      `${apiUrl}/api/projects?pageNumber=${pageNumber(currentPage)}&pageSize=${pageSizeOf(pageSize)}${status ? `&status=${enc(status)}` : ""}${searchParam(search)}`,
    getDetail: (id: string) => `${apiUrl}/api/projects/${enc(id)}`,
  },
  processTrains: {
    getAllProcessTrains: `${apiUrl}/api/trains/with-processes`,
    getByTrain: `${apiUrl}/api/processes/search`,
    getByTrainAndWagon: (trainId?: string, wagonId?: string) =>
      `${apiUrl}/api/processes${trainId ? `?trainId=${enc(trainId)}` : ""}${wagonId ? `${trainId ? "&" : "?"}wagonId=${enc(wagonId)}` : ""}`,
  },
};

export const CLIENT_END_POINTS = {
  stage: {
    create: "/api/stages",
    edit: "/api/stages",
    delete: "/api/stages",
    getAll: "/api/stages",
    getDetail: "/api/stages",
  },
  workflow: {
    create: "/api/workflows",
    edit: "/api/workflows",
    delete: "/api/workflows",
    getAll: "/api/workflows",
    getDetail: "/api/workflows",
  },
  train: {
    create: "/api/trains",
    edit: "/api/trains",
    delete: "/api/trains",
    getAll: "/api/trains",
    getDetail: "/api/trains",
  },
  processes: {
    create: "/api/processes",
    edit: "/api/processes",
    delete: "/api/processes",
    getAllActive: "/api/processes",
    getDetail: "/api/processes",
    editProcessDelayReasons: "/api/processes",
    getProcessStageDetail: "/api/processes",
    startSubStage: "/api/processes",
    saveandCompleteSubStage: "/api/processes",
    completeStage: "/api/processes",
    startStage: "/api/processes",
  },
  activeProcessOperation: {
    complete: "/api/activeProcessOperations",
  },
  common: {
    getStages: "/api/stagesOptions",
    getTrainsOptions: "/api/trainsOptions",
    getProcessesOptions: "/api/processesOptions",
  },
  statistics: "/api/statistics",
  wagon: {
    create: "/api/wagons",
    edit: "/api/wagons",
    delete: "/api/wagons",
    getAll: "/api/wagons",
    getDetail: "/api/wagons",
  },
  reason: {
    create: "/api/reasons",
    edit: "/api/reasons",
    delete: "/api/reasons",
    getAll: "/api/reasons",
    getDetail: "/api/reasons",
  },
  role: {
    create: "/api/roles",
    edit: "/api/roles",
    delete: "/api/roles",
    getAll: "/api/roles",
    getDetail: "/api/roles",
  },
  auth: {
    login: "/api/auth/login",
    refresh: "/api/auth/refresh",
    logout: "/api/auth/logout",
    forgotPassword: "/api/auth/forgot-password",
    verifyResetCode: "/api/auth/forgot-password",
    resetPassword: "/api/auth/forgot-password",
  },
  user: {
    create: "/api/users",
    edit: "/api/users",
    delete: "/api/users",
    getAll: "/api/users",
    getDetail: "/api/users",
    changePassword: "/api/users",
  },
  material: {
    create: "/api/materials",
    edit: "/api/materials",
    delete: "/api/materials",
    getAll: "/api/materials",
    getDetail: "/api/materials",
  },
  subStage: {
    create: "/api/sub-stages",
    edit: "/api/sub-stages",
    delete: "/api/sub-stages",
    getAll: "/api/sub-stages",
    getDetail: "/api/sub-stages",
  },
  project: {
    create: "/api/projects",
    edit: "/api/projects",
    delete: "/api/projects",
    getAll: "/api/projects",
    getDetail: "/api/projects",
  },
  processTrains: {
    getAll: "/api/processTrains",
    getByTrain: "/api/processTrains",
    getByTrainAndWagon: "/api/processTrains",
  },
};
