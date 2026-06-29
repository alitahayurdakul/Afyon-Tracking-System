import { Topbar } from "@/components/common/Topbar";
import { WagonsListBody } from "@/components/wagons/WagonsListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function WagonsPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <WagonsListBody />
    </div>
  );
}
