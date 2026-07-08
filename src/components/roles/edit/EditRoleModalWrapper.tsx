import { useTranslations } from "next-intl";

import { useGetRoleDetailDataQuery } from "@/api/queries/useGetRolesQueries";
import { NewModal } from "@/components/common/NewModal";
import { EDIT_ROLE_MODAL } from "@/consts/modals";

import { EditRoleForm } from "./EditRoleForm";

export const EditRoleModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("roles");
    const { data, isFetching, isLoading } = useGetRoleDetailDataQuery(id);

  return (
    <>
       {!isFetching && !isLoading && (
        <NewModal
          name={`${EDIT_ROLE_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditRoleForm id={id} data={data} />
        </NewModal>
      )}
    </>
  );
};

