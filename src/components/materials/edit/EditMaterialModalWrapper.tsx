import { useTranslations } from "next-intl";

import { useGetMaterialDetailDataQuery } from "@/api/queries/useGetMaterialsQueries";
import { NewModal } from "@/components/common/NewModal";
import { EDIT_MATERIAL_MODAL } from "@/consts/modals";

import { EditMaterialForm } from "./EditMaterialForm";

export const EditMaterialModalWrapper = ({ id }: { id: string }) => {
  const { data, isFetching, isLoading} = useGetMaterialDetailDataQuery(id);
  const t = useTranslations("materials");

  return (
    <>
      {!isFetching && !isLoading && (
        <NewModal
          name={`${EDIT_MATERIAL_MODAL}_${id}`}
          width={"900px"}
          height={"auto"}
          title={t("modal.edit-header")}
          isCloseOutside={false}
          isCloseEsc={false}
        >
          <EditMaterialForm id={id} data={data} />
        </NewModal>
      )}
    </>
  );
};
