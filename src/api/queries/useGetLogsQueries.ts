"use client";

import { useQuery } from "@tanstack/react-query";

import { MOCK_LOGS } from "@/consts/logsConsts";
import { IPaginationTypes } from "@/types/commonTypes";
import { ILogsResponseDataTypes } from "@/types/logsTypes";

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
}: IPaginationTypes) => {
  return useQuery<ILogsResponseDataTypes>({
    queryKey: ["getLogsAllDatas", pageSize, currentPage],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const totalCount = MOCK_LOGS.length;
      const start = (currentPage - 1) * pageSize;

      return {
        data: MOCK_LOGS.slice(start, start + pageSize),
        totalCount,
        totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
        pageNumber: currentPage,
        pageSize,
      };
    },
  });
};
