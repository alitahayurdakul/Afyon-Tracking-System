import { Topbar } from "@/components/common/Topbar";
import { StagesListBody } from "@/components/stages/StagesListBody";
import styles from "@/styles/pages/StagesPage.module.scss";

export default function StagesPage() {
  return (
    <div className={styles["stages-container"]}>
      <Topbar />
      <StagesListBody />
    </div>
  );
}
