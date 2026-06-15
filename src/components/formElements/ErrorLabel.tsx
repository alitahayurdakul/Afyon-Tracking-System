import clsx from "clsx";
import { motion } from "framer-motion";

import styles from "@/styles/components/formElements/ErrorLabel.module.scss";
import {
  checkBoxErrorAnimation,
  inputBoxErrorAnimation,
} from "@/utils/animationUtils";

interface ErrorLabelProps {
  message: string;
  type?: "checkbox" | "input";
  className?: string
}

/*
 definition ::  This will show input error
*/

export const ErrorLabel = ({ message, type, className }: ErrorLabelProps) => {
  const errorAnimation =
    type === "checkbox" ? checkBoxErrorAnimation : inputBoxErrorAnimation;

  return (
    <motion.div
      {...errorAnimation}
      className={clsx(styles["error-label"], {
        [styles["checkbox-type"]]: type === "checkbox",
        [className as string]: className
      })}
    >
      {message}
    </motion.div>
  );
};
