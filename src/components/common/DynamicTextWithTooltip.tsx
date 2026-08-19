// components/trains/WagonCell.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { TooltipBody } from "../TooltipBody";

import styles from "@/styles/components/common/DynamicTextWithTooltip.module.scss";

interface WagonCellProps {
  text?: string;
  contentBody?: React.ReactNode;
  textClassName?: string;
  lines?: number;
}

export function DynamicTextWithTooltip({
  text,
  contentBody,
  textClassName,
  lines = 2,
}: WagonCellProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const content = text ?? contentBody;
  const clampStyle = { WebkitLineClamp: lines };

  const measure = useCallback(() => {
    const el = textRef.current;
    if (!el) return;
    setIsOverflowing(
      el.scrollHeight > el.clientHeight + 2 ||
        el.scrollWidth > el.clientWidth + 2,
    );
  }, []);

  useEffect(() => {
    measure();
    const el = textRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, text, contentBody, lines, isOverflowing]);

  return (
    <div className={styles["cell"]}>
      {!isOverflowing ? (
        <div
          ref={textRef}
          style={clampStyle}
          className={clsx(styles["text"], {
            [textClassName!]: !!textClassName,
          })}
        >
          {content}
        </div>
      ) : (
        <TooltipBody
          triggerBody={
            <div
              ref={textRef}
              style={clampStyle}
              className={clsx(styles["trigger-text"], textClassName)}
            >
              {content}
            </div>
          }
          contentBody={<div className={styles["tooltip-content"]}>{content}</div>}
          contentClasses={styles["tooltip-container"]}
          stroke
        />
      )}
    </div>
  );
}
