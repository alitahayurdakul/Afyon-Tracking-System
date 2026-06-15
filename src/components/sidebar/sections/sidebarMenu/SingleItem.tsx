'use client';
import { ISidebarItemTypes } from "@/types/sidebarTypes";
import Link from "next/link";
import styles from "@/styles/components/sidebar/sections/sidebarMenu/SidebarMenu.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from "next/navigation";
import clsx from 'clsx';

interface IPropsTypes {
  item: ISidebarItemTypes;
}

export const SingleItem = ({ item }: IPropsTypes) => {
  const pathname = usePathname();
  const isActive =
    item.url === "/"
      ? pathname === "/"
      : !!item.url && (pathname === item.url || pathname.startsWith(`${item.url}/`));
  return (
    <Link href={item.url ?? ""} className={clsx(styles["single-item"], { [styles["active-single-item"]]: isActive })}>
       <FontAwesomeIcon icon={item.icon} className={styles["icon"]} />
      <span className={styles["name"]}>{item.name}</span>
    </Link>
  );
};
