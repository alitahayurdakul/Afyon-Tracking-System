"use client";

import React, { useMemo } from "react";

import { getRoutePermission } from "@/consts/routePermissions";
import { SIDEBAR_ITEMS } from "@/consts/sidebarConsts";
import { usePermissions } from "@/hooks/usePermissions";
import { ISidebarItemTypes } from "@/types/sidebarTypes";

import { DropdownItem } from "./DropdownItem";
import { SingleItem } from "./SingleItem";

import styles from "@/styles/components/sidebar/sections/sidebarMenu/SidebarMenu.module.scss";

export const SidebarMenu = () => {
  const { can } = usePermissions();

  const visibleItems = useMemo(() => {
    const isVisible = (item: ISidebarItemTypes) => {
      if (!item.url) return true;
      const route = getRoutePermission(item.url);
      return !route || can(route.resource, route.action);
    };

    return SIDEBAR_ITEMS.reduce<ISidebarItemTypes[]>((items, item) => {
      if (item.subItems) {
        const subItems = item.subItems.filter(isVisible);
        if (subItems.length) items.push({ ...item, subItems });
        return items;
      }
      if (isVisible(item)) items.push(item);
      return items;
    }, []);
  }, [can]);

  return (
    <div className={styles["sidebar-menu"]}>
      {visibleItems.map((item: ISidebarItemTypes, index: number) => {
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
