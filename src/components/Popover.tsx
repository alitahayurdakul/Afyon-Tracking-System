import * as Popover from "@radix-ui/react-popover";
import React, { useEffect, useRef } from "react";

import styles from "@/styles/components/Popover.module.css";

interface IPopover {
  position?: "top" | "left" | "bottom" | "right";
  classes?: {
    content?: string;
    arrow?: string;
  };
  triggerBody: any;
  contentBody: any;
  closeContainer?: any;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  closeOnScroll?: boolean;
}

export const PopoverBody = ({
  classes,
  triggerBody,
  contentBody,
  position,
  align,
  closeContainer,
  alignOffset = 0,
  closeOnScroll = false
}: IPopover) => {
  const popoverRef = useRef<any>(null);

  useEffect(() => {
    if (closeOnScroll) {
      const handleScroll = () => {
        if (popoverRef.current?.open) {
          popoverRef.current?.close();
        }
      };

      window.addEventListener("scroll", handleScroll, true); // true for capture phase

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [closeOnScroll]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{triggerBody}</Popover.Trigger>
      <Popover.Content
        className={`${styles["popoverContent"]} ${classes && classes.content}`}
        data-state="delayed-open"
        side={position ? position : "top"}
        sideOffset={5}
        align={align ? align : "center"}
        alignOffset={alignOffset}
      >
        {contentBody}
        <Popover.Arrow
          className={`${styles["popoverArrow"]} ${classes && classes.arrow}`}
        />
        {closeContainer && (
          <Popover.Close className="PopoverClose" aria-label="Close" asChild>
            {closeContainer}
          </Popover.Close>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};
