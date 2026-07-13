import { useTranslations } from "next-intl";

import { useActiveProcessDetailDataQuery } from "@/api/queries/useGetProcessesQueries";
import { useGetProjectDetailDataQuery } from "@/api/queries/useGetProjectsQueries";
import { NewModal } from "@/components/common/NewModal";
import { DETAIL_PROCESS_HISTORY_MODAL } from "@/consts/modals";
import { ProcessResponse } from "@/types/processTypes";

import ModalContent from "./ModalContent";

export const ProcessHistoryDetailModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("processHistory");
  const { data, isFetching, isLoading } =
    useActiveProcessDetailDataQuery<ProcessResponse>(id);
  console.log(data);

  return (
    <>
      {!isFetching && !isLoading && (
        <NewModal
          name={`${DETAIL_PROCESS_HISTORY_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.detail")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          {/* <EditProjectForm id={id} data={data} /> */}
          <ModalContent data={data} />
        </NewModal>
      )}
    </>
  );
};
