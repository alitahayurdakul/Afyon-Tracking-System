'use client';
import Link from "next/link";
import { useTranslations } from "next-intl";
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { usePathname } from "@/i18n/routing";
import { ISidebarItemTypes } from "@/types/sidebarTypes";
import { stripLocale } from "@/utils/stripLocale";

import styles from "@/styles/components/sidebar/sections/sidebarMenu/SidebarMenu.module.scss";

interface IPropsTypes {
  item: ISidebarItemTypes;
}

export const SingleItem = ({ item }: IPropsTypes) => {
  const t = useTranslations("layout");
  const pathname = stripLocale(usePathname());
  const isActive =
    item.url === "/"
      ? pathname === "/"
      : !!item.url && (pathname === item.url || pathname.startsWith(`${item.url}/`));
  return (
    <Link href={item.url ?? ""} className={clsx(styles["single-item"], { [styles["active-single-item"]]: isActive })}>
       <FontAwesomeIcon icon={item.icon} className={styles["icon"]} />
      <span className={styles["name"]}>{item.key ? t(`sidebar.${item.key}`) : item.default}</span>
    </Link>
  );
};
