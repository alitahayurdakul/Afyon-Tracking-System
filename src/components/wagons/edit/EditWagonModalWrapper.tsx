import { useTranslations } from "next-intl";

import { useGetWagonDetailDataQuery } from "@/api/queries/useGetWagonsQueries";
import { NewModal } from "@/components/common/NewModal";
import { EDIT_WAGON_MODAL } from "@/consts/modals";

import { EditWagonForm } from "./EditWagonForm";

export const EditWagonModalWrapper = ({ id }: { id: string }) => {
  const t = useTranslations("wagons");
  const { data, isFetching } = useGetWagonDetailDataQuery(id);

  return (
    <>
      {!isFetching && (
        <NewModal
          name={`${EDIT_WAGON_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit-header")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditWagonForm id={id} data={data} />
        </NewModal>
      )}
    </>
  );
};
