import styles from "@/styles/components/sidebar/Sidebar.module.scss";
import { TopSection } from "./sections/TopSection";
import { SidebarBottom } from "./sections/SidebarBottom";

export const Sidebar = () => {
  return (
    <div className={styles["sidebar"]}>
      <TopSection />
      <SidebarBottom />
    </div>
  );
};
