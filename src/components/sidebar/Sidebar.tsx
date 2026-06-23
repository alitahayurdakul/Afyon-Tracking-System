import styles from "@/styles/components/sidebar/Sidebar.module.scss";

import { SidebarBottom } from "./sections/SidebarBottom";
import { TopSection } from "./sections/TopSection";

export const Sidebar = () => {
  return (
    <div className={styles["sidebar"]}>
      <TopSection />
      <SidebarBottom />
    </div>
  );
};
