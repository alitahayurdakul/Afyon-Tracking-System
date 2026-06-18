"use client";

import { ISidebarItemTypes } from "@/types/sidebarTypes";
import React, { useState } from "react";
import styles from "@/styles/components/sidebar/sections/sidebarMenu/DropdownItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/utils/stripLocale";
import Link from "next/link";
interface IPropsTypes {
  item: ISidebarItemTypes;
}

export const DropdownItem = ({ item }: IPropsTypes) => {
  const pathname = stripLocale(usePathname());
  const isActive = item?.subItems?.filter(
    (item: ISidebarItemTypes) => item.url === pathname,
  )?.[0];

  const [manualOpen, setManualOpen] = useState<boolean | null>(null);
  const isOpen = manualOpen !== null ? manualOpen : !!isActive;

  return (
    <div className={styles["dropdown-item-container"]}>
      <div
        className={clsx(styles["dropdown-parent-item"], {
          [styles["active-dropdown-parent-item"]]: isActive,
        })}
        onClick={() => setManualOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={item.icon} className={styles["icon"]} />
        <span className={styles["name"]}>{item.name}</span>
        {isOpen ? (
          <ChevronUp className={styles["arrow-icon"]} />
        ) : (
          <ChevronDown className={styles["arrow-icon"]} />
        )}
        {/* <FontAwesomeIcon
          icon={isOpen }
          className={styles["arrow-icon"]}
        /> */}
      </div>
      {isOpen && (
        <div className={styles["sub-items"]}>
          {item?.subItems?.map((subItem: ISidebarItemTypes, index: number) => (
            <React.Fragment key={index}>
              <SingleItem item={subItem} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export const SingleItem = ({ item }: IPropsTypes) => {
  const pathname = stripLocale(usePathname());
  const isActive = pathname === item.url;
  return (
    <Link
      href={item.url ?? ""}
      className={clsx(styles["sub-item"], {
        [styles["active-sub-item"]]: isActive,
      })}
    >
      <FontAwesomeIcon icon={item.icon} className={styles["icon"]} />
      <span className={styles["name"]}>{item.name}</span>
    </Link>
  );
};

export const ChevronUp = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <polyline
      points="4 15 12 7 20 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDown = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <polyline
      points="4 9 12 17 20 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
