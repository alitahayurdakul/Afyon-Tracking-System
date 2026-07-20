import { useTranslations } from "next-intl";

import { useGetProjectDetailDataQuery } from "@/api/queries/useGetProjectsQueries";
import { NewModal } from "@/components/common/NewModal";
import { EDIT_PROJECT_MODAL } from "@/consts/modals";

import { EditProjectForm } from "./EditProjectForm";

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

