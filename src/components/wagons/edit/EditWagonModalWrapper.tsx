import { useTranslations } from "next-intl";

import { useGetWagonDetailDataQuery } from "@/api/queries/useGetWagonsQueries";
import { Modal } from "@/components/common/Modal";
import { EDIT_WAGON_MODAL } from "@/consts/modals";

import { EditWagonForm } from "./EditWagonForm";

export const EditWagonModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("wagons");
  const { data, isFetching } = useGetWagonDetailDataQuery(id);

  return (
    <>
      {!isFetching && (
        <Modal
          name={`${EDIT_WAGON_MODAL}_${id}`}
          open
          width={"900px"}
          height={"auto"}
          title={t("modal.edit-header")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditWagonForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
