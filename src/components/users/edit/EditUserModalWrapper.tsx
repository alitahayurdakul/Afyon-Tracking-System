import { useTranslations } from "next-intl";

import { useGetUserDetailDataQuery } from "@/api/queries/useGetUsersQueries";
import { Modal } from "@/components/common/Modal";
import { EDIT_USER_MODAL } from "@/consts/modals";

import { EditUserForm } from "./EditUserForm";

export const EditUserModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("users");
  const { data, isFetching,isLoading } = useGetUserDetailDataQuery(id);

  return (
    <>
       {!isFetching && !isLoading && (
        <Modal
          name={`${EDIT_USER_MODAL}_${id}`}
          open
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditUserForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};

