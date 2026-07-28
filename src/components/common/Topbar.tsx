"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus, faSearch } from "@fortawesome/free-solid-svg-icons";

import { PERMISSION_ACTION, PERMISSION_RESOURCE } from "@/consts/permissions";
import { getPermission } from "@/utils/getPermission";

import { CreateFleetModal } from "../createFleetModal/CreateFleetModal";
import LanguageSelector from "../NewLanguageSelectBox";
import { RoleWrapper } from "../RoleWrapper";

import styles from "@/styles/components/common/Topbar.module.scss";

library.add(faSearch, faCirclePlus);

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
            <LanguageSelector />
          </div>
        </div>

        {showCreateButton && (
          <RoleWrapper
            requiredPermissions={[
              getPermission(
                PERMISSION_RESOURCE.ACTIVEPROCESS,
                PERMISSION_ACTION.MANAGE,
              ),
            ]}
          >
            <CreateFleetModal />
          </RoleWrapper>
        )}
      </div>
    </header>
  );
};
