import { SIDEBAR_ITEMS } from "@/consts/sidebarConsts";
import styles from "@/styles/components/sidebar/sections/sidebarMenu/SidebarMenu.module.scss";
import { ISidebarItemTypes } from "@/types/sidebarTypes";
import React from "react";

import { SingleItem } from "./SingleItem";
import { DropdownItem } from "./DropdownItem";

export const SidebarMenu = () => {
  return (
    <div className={styles["sidebar-menu"]}>
      {SIDEBAR_ITEMS.map((item: ISidebarItemTypes, index: number) => {
        if (item.subItems) {
          return (
            <React.Fragment key={index}>
              <DropdownItem item={item} />
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={index}>
            <SingleItem item={item} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
