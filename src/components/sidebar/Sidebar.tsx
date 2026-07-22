import { SidebarBottom } from "./sections/SidebarBottom";
import { TopSection } from "./sections/TopSection";

import styles from "@/styles/components/sidebar/Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <div className={styles["sidebar"]}>
      <TopSection />
      <SidebarBottom />
    </div>
  );
};
