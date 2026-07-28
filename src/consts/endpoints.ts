import { IPaginationTypes, IPaginationWithStatus } from "@/types/commonTypes";

const apiUrl = process.env.API_URL || "api";

export const END_POINTS = {
  stage: {
    create: `${apiUrl}/api/stages`,
    edit: (id: string) => `${apiUrl}/api/stages/${id}`,
    delete: (id: string) => `${apiUrl}/api/stages/${id}`,
    getAll: `${apiUrl}/api/stages`,
    getDetail: (id: string) => `${apiUrl}/api/stages/${id}`,
    getFilteredStages: ({ currentPage, pageSize }: IPaginationTypes) =>
      `${apiUrl}/api/stages?pageNumber=${currentPage}&pageSize=${pageSize}`,
  },
  workflow: {
    create: `${apiUrl}/api/favorite-processes`,
    edit: (id: string) => `${apiUrl}/api/favorite-processes/${id}`,
    delete: (id: string) => `${apiUrl}/api/favorite-processes/${id}`,
    getAll: `${apiUrl}/api/favorite-processes`,
    getDetail: (id: string) => `${apiUrl}/api/favorite-processes/${id}`,
  },
  train: {
    create: `${apiUrl}/api/trains`,
    edit: (trainId: string) => `${apiUrl}/api/trains/${trainId}`,
    delete: (trainId: string) => `${apiUrl}/api/trains/${trainId}`,
    getAll: `${apiUrl}/api/trains`,
    getDetail: (trainId: string) => `${apiUrl}/api/trains/${trainId}`,
    getFilteredTrains: ({ pageSize, currentPage }: IPaginationTypes) =>
      `${apiUrl}/api/trains?pageNumber=${currentPage}&pageSize=${pageSize}`,
  },
  process: {
    start: `${apiUrl}/api/processes/start`,
    edit: (id: string) => `${apiUrl}/api/favorite-processes/${id}`,
    delete: (id: string) => `${apiUrl}/api/favorite-processes/${id}`,
    getDetail: (id: string) => `${apiUrl}/api/processes/${id}`,
    getAll: ({ status, projectId }: { status?: string; projectId?: string }) =>
      `${apiUrl}/api/processes${projectId ? `?projectId=${projectId}` : ""}${status ? `${projectId ? "&" : "?"}status=${status}` : ""}`,
    stageDetail: (processId: string, stageId: string) =>
      `${apiUrl}/api/processes/${processId}/stages/${stageId}/substages`,
    subStageOperation: (
      processId: string,
      stageId: string,
      subStageId: string,
    ) =>
      `${apiUrl}/api/substages/processes/${processId}/stages/${stageId}/substages/${subStageId}`,
    completeStage: (entryId: string) =>
      `${apiUrl}/api/processes/stage-entry/${entryId}/close`,
    startStage: (processId: string) =>
      `${apiUrl}/api/processes/${processId}/start-stage`,
    deleteProcess: (id: string) => `${apiUrl}/api/processes/${id}`,
  },
  processOperations: {
    complete: (processId: string) =>
      `${apiUrl}/api/processes/${processId}/complete`,
  },
  // workflowHistory: {
  //   getAll: `${apiUrl}/api/processes?status=COMPLETED`,
  //   getDetail: (id: string) => `${apiUrl}/api/processes/${id}`,
  // },
  statistics: {
    stages: (query: string) => `${apiUrl}/api/processes/statistics?${query}`,
    process: (query: string) =>
      `${apiUrl}/api/processes/process-statistics?${query}`,
  },
  wagon: {
    create: `${apiUrl}/api/wagons`,
    edit: (id: string) => `${apiUrl}/api/wagons/${id}`,
    delete: (id: string) => `${apiUrl}/api/wagons/${id}`,
    getAll: `${apiUrl}/api/wagons`,
    getDetail: (id: string) => `${apiUrl}/api/wagons/${id}`,
    getFilteredWagons: ({ currentPage, pageSize }: IPaginationTypes) =>
      `${apiUrl}/api/wagons?pageNumber=${currentPage}&pageSize=${pageSize}`,
  },
  reason: {
    create: `${apiUrl}/api/reasons`,
    edit: (id: string) => `${apiUrl}/api/reasons/${id}`,
    delete: (id: string) => `${apiUrl}/api/reasons/${id}`,
    getAll: `${apiUrl}/api/reasons`,
    getDetail: (id: string) => `${apiUrl}/api/reasons/${id}`,
    getFilteredReasons: ({ pageSize, currentPage }: IPaginationTypes) =>
      `${apiUrl}/api/reasons?pageNumber=${currentPage}&pageSize=${pageSize}`,
  },
  role: {
    create: `${apiUrl}/api/roles`,
    edit: (id: string) => `${apiUrl}/api/roles/${id}`,
    delete: (id: string) => `${apiUrl}/api/roles/${id}`,
    getAll: `${apiUrl}/api/roles`,
    getDetail: (id: string) => `${apiUrl}/api/roles/${id}`,
  },
  auth: {
    login: `${apiUrl}/auth`,
    refresh: `${apiUrl}/refresh`,
    logout: `${apiUrl}/logout`,
  },
  user: {
    create: `${apiUrl}/register`,
    edit: (id: string) => `${apiUrl}/api/users/${id}`,
    delete: (id: string) => `${apiUrl}/api/users/${id}`,
    getAll: `${apiUrl}/api/users`,
    getDetail: (id: string) => `${apiUrl}/api/users/${id}`,
    changePassword: (id: string) => `${apiUrl}/api/users/${id}/password`,
  },
  material: {
    create: `${apiUrl}/api/materials`,
    edit: (id: string) => `${apiUrl}/api/materials/${id}`,
    delete: (id: string) => `${apiUrl}/api/materials/${id}`,
    getAll: `${apiUrl}/api/materials`,
    getFilteredMaterials: ({ pageSize, currentPage }: IPaginationTypes) =>
      `${apiUrl}/api/materials?pageNumber=${currentPage}&pageSize=${pageSize}`,
    getDetail: (id: string) => `${apiUrl}/api/materials/${id}`,
  },
  subStage: {
    create: `${apiUrl}/api/substages`,
    edit: (id: string) => `${apiUrl}/api/substages/${id}`,
    delete: (id: string) => `${apiUrl}/api/substages/${id}`,
    getAll: `${apiUrl}/api/substages`,
    getDetail: (id: string) => `${apiUrl}/api/substages/${id}`,
    getFilteredSubStages: ({ pageSize, currentPage }: IPaginationTypes) =>
      `${apiUrl}/api/substages?pageNumber=${currentPage}&pageSize=${pageSize}`,
  },
  project: {
    create: `${apiUrl}/api/projects`,
    edit: (id: string) => `${apiUrl}/api/projects/${id}`,
    delete: (id: string) => `${apiUrl}/api/projects/${id}`,
    getAll: (status?: string) =>
      `${apiUrl}/api/projects${status ? `?status=${status}` : ""}`,
    getFilteredProjects: ({
      pageSize,
      currentPage,
      status,
    }: IPaginationWithStatus) =>
      `${apiUrl}/api/projects?pageNumber=${currentPage}&pageSize=${pageSize}${status ? `&status=${status}` : ""}`,
    getDetail: (id: string) => `${apiUrl}/api/projects/${id}`,
  },
  processTrains: {
    getAllProcessTrains: `${apiUrl}/api/trains/with-processes`,
    getByTrain: `${apiUrl}/api/processes/search`,
    getByTrainAndWagon: (trainId?: string, wagonId?: string) =>
      `${apiUrl}/api/processes${trainId ? `?trainId=${trainId}` : ""}${wagonId ? `${trainId ? "&" : "?"}wagonId=${wagonId}` : ""}`,
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
