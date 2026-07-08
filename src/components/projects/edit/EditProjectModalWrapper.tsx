import { useTranslations } from "next-intl";

import { useGetWagonDetailDataQuery } from "@/api/queries/useGetWagonsQueries";
import { NewModal } from "@/components/common/NewModal";
import { EDIT_PROJECT_MODAL, EDIT_WAGON_MODAL } from "@/consts/modals";
import { EditProjectForm } from "./EditProjectForm";
import { useGetProjectDetailDataQuery } from "@/api/queries/useGetProjectsQueries";

export const EditProjectModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("projects");
    const { data, isFetching, isLoading } = useGetProjectDetailDataQuery(id);

  return (
    <>
       {!isFetching && !isLoading && (
        <NewModal
          name={`${EDIT_PROJECT_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditProjectForm id={id} data={data} />
        </NewModal>
      )}
    </>
  );
};

