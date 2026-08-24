import { useTranslations } from "next-intl";

import { useGetRoleDetailDataQuery } from "@/api/queries/useGetRolesQueries";
import { Modal } from "@/components/common/Modal";
import { EDIT_ROLE_MODAL } from "@/consts/modals";

import { EditRoleForm } from "./EditRoleForm";

export const EditRoleModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("roles");
  const { data, isFetching, isLoading } = useGetRoleDetailDataQuery(id);

  return (
    <>
      {!isFetching && !isLoading && (
        <Modal
          name={`${EDIT_ROLE_MODAL}_${id}`}
          open
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditRoleForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
