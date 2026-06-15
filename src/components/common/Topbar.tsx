'use client';
import styles from "@/styles/components/common/Topbar.module.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faBell,
  faGear,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateFleetModal } from "../createFleetModal/CreateFleetModal";

library.add(faSearch, faBell, faGear, faCirclePlus);

// const TOPBAR_ACTIONS: { match: RegExp; render: () => React.ReactNode }[] = [
//   { match: /^\/active-workflows\/[^/]+$/, render: () => <CreateWorkflowModal /> },
//   { match: /^\/active-workflows$/, render: () => <CreateWorkflowModal /> },
// ];
//
// const getTopbarAction = (pathname: string) =>
//   TOPBAR_ACTIONS.find((a) => a.match.test(pathname))?.render() ?? null;

interface TopbarProps {
  showCreateButton?: boolean;
}

export const Topbar = ({ showCreateButton = false }: TopbarProps) => {
  return (
    <header className={styles.topbar}>
      <div className={styles["topbar-right"]}>
        <div className={styles["status-group"]}>
          <div className={styles["action-icons"]}>
            <FontAwesomeIcon icon="bell" className={styles["nav-icon"]} />
            <FontAwesomeIcon icon="gear" className={styles["nav-icon"]} />
          </div>
        </div>

        {showCreateButton && <CreateFleetModal />}
      </div>
    </header>
  );
};
