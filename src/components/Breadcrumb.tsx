import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/components/Breadcrumb.module.scss";

interface IBreadcrumbItem {
  labelKey?: string;
  link?: string;
  label?: string;
}

interface IPropsTypes {
  data: IBreadcrumbItem[];
}

const Breadcrumb = ({ data }: IPropsTypes) => {
  const t = useTranslations("layout.breadcrumb");
  
  return (
    <div className={styles.breadcrumb}>
      {data.map((item: IBreadcrumbItem, index: number) => {
        const text = item.labelKey ? t(item.labelKey) : item.label;
        if (index === data.length - 1) {
          return (
            <React.Fragment key={index}>
              <span>
                <b>{text}</b>
              </span>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={index}>
            <span>
              {item.link ? (
                <Link href={item.link}>{text}</Link>
              ) : (
                text
              )}{" "}
              {">"}{" "}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
