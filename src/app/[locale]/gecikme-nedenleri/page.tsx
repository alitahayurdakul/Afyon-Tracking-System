import { Topbar } from "@/components/common/Topbar";
import { ReasonsListBody } from "@/components/reasons/ReasonsListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function ReasonsPage() {
  return (
    <div className={styles["trains-container"]}>
      <Topbar />
      <ReasonsListBody />
    </div>
  );
}
