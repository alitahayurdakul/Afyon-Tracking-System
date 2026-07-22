"use client";

import { useState } from "react";

import { ActiveProcessesHeader } from "./ActiveProcessesHeader";
import { ActiveProcessGrid } from "./ActiveProcessGrid";

import styles from "@/styles/pages/PageCommonContainer.module.scss";

export const ActiveProcessesWrapper = () => {
  const [activeUnit, setActiveUnit] = useState<string>("");
  return (
    <div className={styles["page-container"]}>
      <ActiveProcessesHeader activeUnit={activeUnit} />
      <ActiveProcessGrid setActiveUnit={setActiveUnit} />
    </div>
  );
};
