import { useTranslations } from "next-intl";

import { useGetTrainDetailDataQuery } from "@/api/queries/useGetTrainsQueries";
import { useGetWagonsOptionsQuery } from "@/api/queries/useGetWagonsQueries";
import { Modal } from "@/components/common/Modal";
import { EDIT_TRAIN_MODAL } from "@/consts/modals";

import { EditTrainForm } from "./EditTrainForm";

export const EditTrainModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("trains");
  const { data, isLoading } = useGetTrainDetailDataQuery(id);
  const { data: wagonOptions, isLoading: wagonsLoading } =
    useGetWagonsOptionsQuery();

  return (
    <>
      {!isLoading && !wagonsLoading && (
        <Modal
          name={`${EDIT_TRAIN_MODAL}_${id}`}
          open
          width={"900px"}
          height={"auto"}
          title={t("modal.edit")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditTrainForm data={data} wagonOptions={wagonOptions} />
        </Modal>
      )}
    </>
  );
};
