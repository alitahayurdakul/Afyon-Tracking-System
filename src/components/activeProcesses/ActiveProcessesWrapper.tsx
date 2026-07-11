"use client";

import { useState } from "react";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

import { ActiveProcessesHeader } from "./ActiveProcessesHeader";
import { ActiveProcessGrid } from "./ActiveProcessGrid";

export const ActiveProcessesWrapper = () => {
  const [activeUnit, setActiveUnit] = useState<string>("");
  return (
    <div className={styles["page-container"]}>
      <ActiveProcessesHeader activeUnit={activeUnit} />
      <ActiveProcessGrid setActiveUnit={setActiveUnit} />
    </div>
  );
};
