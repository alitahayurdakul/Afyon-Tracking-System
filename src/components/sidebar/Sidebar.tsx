import clsx from "clsx";

import { SidebarBottom } from "./sections/SidebarBottom";
import { TopSection } from "./sections/TopSection";

import styles from "@/styles/components/sidebar/Sidebar.module.scss";

interface SidebarProps {
  isOpen?: boolean;
}

export const Sidebar = ({ isOpen = false }: SidebarProps) => {
  return (
    <div className={clsx(styles["sidebar"], { [styles["open"]]: isOpen })}>
      <TopSection />
      <SidebarBottom />
    </div>
  );
};
