import { ProcessResponse } from "@/types/processTypes";

import ProcessInfo from "./sections/ProcessInfo";
import StagesInfo from "./sections/StagesInfo";

import styles from "@/styles/components/processHistory/ModalContent.module.scss";

const ModalContent = ({ data }: { data?: ProcessResponse }) => {
  const processInfo = data?.process;
  const stages = data?.stages;

  return (
    <div className={styles["modal-content-container"]}>
      {processInfo && <ProcessInfo processInfo={processInfo} />}
      <StagesInfo stages={stages ?? []} />
    </div>
  );
};

export default ModalContent;
