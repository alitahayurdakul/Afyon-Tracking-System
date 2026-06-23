import Link from "next/link";
import React from "react";

import styles from "@/styles/components/Breadcrumb.module.scss";

interface IBreadcrumbItem {
  name: string;
  link?: string;
}

interface IPropsTypes {
  data: IBreadcrumbItem[];
}

const Breadcrumb = ({ data }: IPropsTypes) => {
  return (
    <div className={styles.breadcrumb}>
      {data.map((item: IBreadcrumbItem, index: number) => {
        if (index === data.length - 1) {
          return (
            <React.Fragment key={index}>
              <span>
                <b>{item.name}</b>
              </span>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={index}>
            <span>
              {item.link ? (
                <Link href={item.link}>{item.name}</Link>
              ) : (
                item.name
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
