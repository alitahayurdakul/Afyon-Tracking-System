const apiUrl = process.env.API_URL || "api";

export const END_POINTS = {
  stage: {
    create: `${apiUrl}/api/stages`,
    edit: (id: string) => `${apiUrl}/api/stages/${id}`,
    delete: (id: string) => `${apiUrl}/api/stages/${id}`,
    getAll: `${apiUrl}/api/stages`,
    getDetail: (id: string) => `${apiUrl}/api/stages/${id}`,
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
    edit: (trainSetNo: string) => `${apiUrl}/api/trains/${trainSetNo}`,
    delete: (trainSetNo: string) => `${apiUrl}/api/trains/${trainSetNo}`,
    getAll: `${apiUrl}/api/trains`,
    getDetail: (trainSetNo: string) => `${apiUrl}/api/trains/${trainSetNo}`,
  },
  process: {
    create: (processId: string) =>
      `${apiUrl}/api/favorite-processes/${processId}/start-process`,
    edit: (id: string) => `${apiUrl}/api/favorite-processes/${id}`,
    delete: (id: string) => `${apiUrl}/api/favorite-processes/${id}`,
    getAll: `${apiUrl}/api/processes`,
    getDetail: (id: string) => `${apiUrl}/api/processes/${id}`,
    getAllByStatus: (status: "ACTIVE" | "COMPLETED" | "CANCELLED") =>
      `${apiUrl}/api/processes?status=${status}`,
    editDelayReasons: (id: string) =>
      `${apiUrl}/api/processes/stage-entry/${id}/delay-reason`,
  },
  processOperations: {
    complete: (processId: string) =>
      `${apiUrl}/api/processes/${processId}/complete`
  },
  workflowHistory: {
    getAll: `${apiUrl}/api/processes?status=COMPLETED`,
    getDetail: (id: string) => `${apiUrl}/api/processes/${id}`,
  },
  statistics: {
    stages: (query: string) => `${apiUrl}/api/processes/statistics?${query}`,
    process: (query: string) =>
      `${apiUrl}/api/processes/process-statistics?${query}`,
  },
  reason: {
    create: `${apiUrl}/api/reasons`,
    edit: (id: string) => `${apiUrl}/api/reasons/${id}`,
    delete: (id: string) => `${apiUrl}/api/reasons/${id}`,
    getAll: `${apiUrl}/api/reasons`,
    getDetail: (id: string) => `${apiUrl}/api/reasons/${id}`,
  },
  role: {
    create: `${apiUrl}/api/roles`,
    edit: (id: string) => `${apiUrl}/api/roles/${id}`,
    delete: (id: string) => `${apiUrl}/api/roles/${id}`,
    getAll: `${apiUrl}/api/roles`,
    getDetail: (id: string) => `${apiUrl}/api/roles/${id}`,
  },
  user: {
    create: `${apiUrl}/api/users`,
    edit: (id: string) => `${apiUrl}/api/users/${id}`,
    delete: (id: string) => `${apiUrl}/api/users/${id}`,
    getAll: `${apiUrl}/api/users`,
    getDetail: (id: string) => `${apiUrl}/api/users/${id}`,
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
  },
  activeProcessOperation: {
    complete: "/api/activeProcessOperations",
    getSubStages: "/api/activeProcessOperations"
  },
  workflowHistory: {
    getAll: "/api/workflowHistory",
    getDetail: "/api/workflowHistory",
  },
  common: {
    getStages: "/api/stagesOptions",
    getTrainsOptions: "/api/trainsOptions",
    getProcessesOptions: "/api/processesOptions",
  },
  statistics: "/api/statistics",
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
  user: {
    create: "/api/users",
    edit: "/api/users",
    delete: "/api/users",
    getAll: "/api/users",
    getDetail: "/api/users",
  }
};
