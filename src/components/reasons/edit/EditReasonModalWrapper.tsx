import { useTranslations } from "next-intl";

import { useGetReasonDetailDataQuery } from "@/api/queries/useGetReasonsQueries";
import { Modal } from "@/components/common/Modal";
import { EDIT_REASON_MODAL } from "@/consts/modals";

import { EditReasonForm } from "./EditReasonForm";

export const EditReasonModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("delayReasons");
   const { data, isFetching } = useGetReasonDetailDataQuery(id);

  return (
    <>
      {!isFetching && (
        <Modal
          name={`${EDIT_REASON_MODAL}_${id}`}
          open
          width={"900px"}
          height={"auto"}
          title={t("modal.edit-header")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditReasonForm id={id} data={data} />
        </Modal>
      )}
    </>
  );
};
