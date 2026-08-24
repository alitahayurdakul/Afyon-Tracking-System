import clsx from "clsx";
import { motion } from "framer-motion";

import {
  checkBoxErrorAnimation,
  inputBoxErrorAnimation,
} from "@/utils/animationUtils";

import styles from "@/styles/components/formElements/ErrorLabel.module.scss";

interface ErrorLabelProps {
  message: string;
  type?: "checkbox" | "input";
  className?: string
  /**
   * Ties this message to its field via the field's `aria-describedby`, so a
   * screen reader reads the error when the user reaches the input. Without it
   * the text is on screen but belongs to nothing, and is never announced.
   */
  id?: string;
}

/*
 definition ::  This will show input error
*/

export const ErrorLabel = ({ message, type, className, id }: ErrorLabelProps) => {
  const errorAnimation =
    type === "checkbox" ? checkBoxErrorAnimation : inputBoxErrorAnimation;

  return (
    <motion.div
      {...errorAnimation}
      id={id}
      // Announces the message as soon as it appears — otherwise submitting an
      // invalid form is completely silent and nothing tells the user why
      // nothing happened.
      role="alert"
      className={clsx(styles["error-label"], {
        [styles["checkbox-type"]]: type === "checkbox",
        [className as string]: className
      })}
    >
      {message}
    </motion.div>
  );
};
