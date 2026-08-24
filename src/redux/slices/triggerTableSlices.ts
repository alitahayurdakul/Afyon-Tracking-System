import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TRIGGER_DOMAINS = [
  "trains",
  "wagons",
  "stages",
  "subStages",
  "materials",
  "reasons",
  "roles",
  "users",
  "projects",
  "workflows",
  "processes",
  "processTrains",
] as const;

export type TriggerDomain = (typeof TRIGGER_DOMAINS)[number];

export type ITableTriggerTypes = Record<TriggerDomain, number>;

/**
 * Domains that embed another domain's records and therefore go stale with it.
 * Verified against the code rather than assumed: stage detail embeds its
 * sub-stages, workflow detail embeds its stages, the user table renders the
 * role name, processes are filtered by project and built from stages, and the
 * process-trains list is derived from trains.
 *
 * Option lists do NOT need an entry: every `*OptionsQuery` lives in the file of
 * the domain that owns the data (wagon options are in useGetWagonsQueries), so
 * subscribing each hook to its own file's domain already covers them.
 */
const CASCADES: Record<TriggerDomain, readonly TriggerDomain[]> = {
  trains: ["processTrains"],
  wagons: ["trains", "processTrains"],
  stages: ["workflows", "processes"],
  subStages: ["stages"],
  materials: ["subStages"],
  reasons: [],
  roles: ["users"],
  users: [],
  projects: ["processes"],
  workflows: ["processes"],
  processes: ["processTrains"],
  processTrains: [],
};

const initialState: ITableTriggerTypes = TRIGGER_DOMAINS.reduce(
  (acc, domain) => ({ ...acc, [domain]: 0 }),
  {} as ITableTriggerTypes,
);

export const tableTriggerSlice = createSlice({
  name: "tableTrigger",
  initialState,
  reducers: {
    /**
     * Bumps the counter a domain's query hooks include in their queryKey, plus
     * the counters of anything that embeds its data. Previously a single
     * counter served every domain, so saving a wagon changed the key of all ~40
     * queries in the app and discarded their cache.
     */
    addTriggerTable(state, action: PayloadAction<TriggerDomain>) {
      const domain = action.payload;
      state[domain] += 1;
      CASCADES[domain].forEach((dependent) => {
        state[dependent] += 1;
      });
    },
  },
});

export const { addTriggerTable } = tableTriggerSlice.actions;

export default tableTriggerSlice.reducer;
