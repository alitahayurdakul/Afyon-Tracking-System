import { Topbar } from "@/components/common/Topbar";
import ProfileContainer from "@/components/profile/ProfileContainer";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function UserProfilePage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <ProfileContainer />
    </div>
  );
}
