"use client";

import { useQuery } from "@tanstack/react-query";

import { MOCK_LOGS } from "@/consts/logsConsts";
import { IPaginationWithSearch } from "@/types/commonTypes";
import { ILogsResponseDataTypes, ILogType } from "@/types/logsTypes";

interface IUseGetLogsDataQueryOptions extends IPaginationWithSearch {
  /**
   * Resolves a raw action key to the label shown in the table. Passed in from
   * the component because the search has to match what the user actually sees,
   * and translations are not available inside the hook.
   */
  actionLabel?: (action: string) => string;
}

const matchesSearch = (
  log: ILogType,
  term: string,
  actionLabel?: (action: string) => string,
) => {
  const haystack = [
    log.fullname,
    log.userId,
    log.action,
    actionLabel?.(log.action),
  ];

  return haystack.some((value) => value?.toLowerCase().includes(term));
};

/**
 * Log listesi sorgusu.
 *
 * NOT: Log API'si henüz mevcut değil. Şu an sayfalama sabit mock veri üzerinde
 * client tarafında yapılıyor. API hazır olduğunda `queryFn` içi, diğer
 * listelerdeki gibi tek bir axios isteğiyle değiştirilecek:
 *
 *   const { data } = await axiosInstance.post<ILogsResponseDataTypes>(
 *     CLIENT_END_POINTS.log.getAll,
 *     { type: LogQueryTypes.getAllLogs, params: { currentPage, pageSize } },
 *   );
 *   return data;
 *
 * Dönen sözleşme (data / totalCount / totalPages) bilinçli olarak diğer
 * listelerle aynı tutuldu; böylece bileşen tarafında değişiklik gerekmeyecek.
 */
export const useGetLogsDataQuery = ({
  pageSize,
  currentPage,
  search,
  actionLabel,
}: IUseGetLogsDataQueryOptions) => {
  return useQuery<ILogsResponseDataTypes>({
    queryKey: ["getLogsAllDatas", pageSize, currentPage, search],
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const term = search?.trim().toLowerCase();
      const logs = term
        ? MOCK_LOGS.filter((log) => matchesSearch(log, term, actionLabel))
        : MOCK_LOGS;

      const totalCount = logs.length;
      const start = (currentPage - 1) * pageSize;

      return {
        data: logs.slice(start, start + pageSize),
        totalCount,
        totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
        pageNumber: currentPage,
        pageSize,
      };
    },
  });
};
