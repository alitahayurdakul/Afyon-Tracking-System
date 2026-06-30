// components/trains/WagonCell.tsx
"use client";

import React, { useEffect,useRef, useState } from "react";

import styles from "@/styles/components/common/DynamicTextWithTooltip.module.scss";

import { TooltipBody } from "../TooltipBody";

interface WagonCellProps {
  text?: string;
  contentBody?: React.ReactNode;
}

export function DynamicTextWithTooltip({ text, contentBody }: WagonCellProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const content = text ?? contentBody;

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight + 2);
    }
  }, [text]);

  return (
    <div className={styles["cell"]}>
      {!isOverflowing ? (
        <div ref={textRef} className={styles["text"]}>
          {content}
        </div>
      ) : (
        <TooltipBody
          triggerBody={<div className={styles["trigger-text"]}>{content}</div>}
          contentBody={<div className={styles["tooltip-content"]}>{content}</div>}
          contentClasses={styles["tooltip-container"]}
          stroke
        />
      )}
    </div>
  );
}
