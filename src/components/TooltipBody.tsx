import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import React, { useState } from "react";

import styles from "@/styles/components/Tooltip.module.scss";

interface ITooltip {
  position?: "top" | "left" | "bottom" | "right";
  delay?: number;
  classes?: {
    content?: string;
    arrow?: string;
  };
  triggerBody: any;
  contentBody: any;
  contentClasses?: string;
  align?: "start" | "end" | "center";
  defaultOpen?: boolean;
  usePortal?: boolean;
  sideOffset?: number;
  alignOffset?: number;
  contentProps?: any;
  avoidCollisions?: boolean;
  dropShadow?: boolean;
  stroke?: boolean;
  borderRadius?: number;
}

export const TooltipBody = ({
  classes,
  triggerBody,
  contentBody,
  delay,
  position,
  contentClasses,
  align,
  defaultOpen,
  usePortal = false,
  sideOffset = 5,
  alignOffset = 0,
  contentProps,
  avoidCollisions,
  dropShadow = true,
  stroke = false,
  borderRadius = 0
}: ITooltip) => {
  const [open, setOpen] = useState<boolean>(defaultOpen ?? false);

  const tooltipContentStyle: React.CSSProperties = {
    ...(stroke && { border: "1px solid #E2E8EB" }),
    ...(borderRadius > 0 && { borderRadius: `${borderRadius}px` })
  };

  const TooltipContent = (
    <Tooltip.Content
      className={clsx(
        styles["tooltipContent"],
        !dropShadow && styles["no-shadow"],
        stroke && styles["with-stroke"],
        contentClasses
      )}
      style={tooltipContentStyle}
      data-state="delayed-open"
      side={position ? position : "top"}
      sideOffset={sideOffset}
      align={align ? align : "center"}
      avoidCollisions={avoidCollisions}
      alignOffset={alignOffset}
      {...contentProps}
    >
      {contentBody}
      <Tooltip.Arrow
        className={clsx(
          styles["tooltipArrow"],
          stroke && styles["tooltipArrow-with-stroke"],
          classes && classes.arrow
        )}
      />
    </Tooltip.Content>
  );

  const onOpenTooltip = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Tooltip.Provider delayDuration={delay ? delay : 200}>
      <Tooltip.Root open={open} onOpenChange={onOpenTooltip}>
        <Tooltip.Trigger onClick={() => setOpen(true)} asChild>
          {triggerBody}
        </Tooltip.Trigger>
        {usePortal ? (
          <Tooltip.Portal>{TooltipContent}</Tooltip.Portal>
        ) : (
          TooltipContent
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
