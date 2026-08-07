"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/formElements/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { TurnIcon } from "@/components/icons/TurnIcon";
import { inputBoxErrorAnimation } from "@/utils/animationUtils";

import styles from "@/styles/components/common/Captcha.module.scss";

interface IMessageType {
  isShow: boolean;
  type: "error" | "success" | "";
}

interface IPropsTypes {
  isVerified: boolean;
  onVerifiedChange: (isVerified: boolean) => void;
  triggeredCaptcha?: number;
  error?: string;
  className?: string;
  classNameTextContainer?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
}

const captchaText = () => Math.random().toString(36).substring(2, 7);

export const Captcha = ({
  isVerified,
  onVerifiedChange,
  triggeredCaptcha = 0,
  error,
  className,
  classNameTextContainer,
  width,
  height,
  disabled,
}: IPropsTypes) => {
  const t = useTranslations("layout.captcha");
  const [captcha, setCaptcha] = useState("");
  const [value, setValue] = useState("");
  const [isShowMessage, setIsShowMessage] = useState<IMessageType>({
    isShow: false,
    type: "",
  });
  const [shouldInitialize, setShouldInitialize] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCaptchaOnCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, nextCaptcha: string) => {
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = "rgba(0, 66, 134, 0.12)";
      for (let i = 0; i < 24; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          Math.random() * 1.2 + 0.4,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
 
      ctx.strokeStyle = "rgba(0, 66, 134, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvasHeight / 2 + (Math.random() * 6 - 3));
      ctx.bezierCurveTo(
        canvasWidth * 0.3,
        Math.random() * canvasHeight,
        canvasWidth * 0.6,
        Math.random() * canvasHeight,
        canvasWidth,
        canvasHeight / 2 + (Math.random() * 6 - 3),
      );
      ctx.stroke();

      const padding = 10;
      const usable = canvasWidth - padding * 2;
      const letterSpace = usable / nextCaptcha.length;
      const baseline = canvasHeight / 2 + 6;

      ctx.font = "600 18px 'Roboto Mono', ui-monospace, monospace";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#004286";

      for (let i = 0; i < nextCaptcha.length; i++) {
        const x = padding + i * letterSpace + letterSpace / 2;
        const angle = (Math.random() * 30 - 15) * (Math.PI / 180);
        ctx.save();
        ctx.translate(x, baseline);
        ctx.rotate(angle);
        ctx.fillText(nextCaptcha[i], -6, 0);
        ctx.restore();
      }
    },
    [],
  );

  const initializeCaptcha = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const newCaptcha = captchaText();
      setCaptcha(newCaptcha);
      drawCaptchaOnCanvas(ctx, newCaptcha);
    },
    [drawCaptchaOnCanvas],
  );

  useEffect(() => {
    setIsShowMessage({ isShow: false, type: "" });
    setValue("");
    setShouldInitialize(true);
  }, [triggeredCaptcha]);

  useEffect(() => {
    if (!shouldInitialize) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      initializeCaptcha(ctx);
      setShouldInitialize(false);
    }
  }, [shouldInitialize, isShowMessage.type, initializeCaptcha]);

  const refreshCaptcha = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) initializeCaptcha(ctx);
  };

  const onClickSubmit = () => {
    if (captcha === value.trim()) {
      onVerifiedChange(true);
      setIsShowMessage({ isShow: true, type: "success" });
      return;
    }

    onVerifiedChange(false);
    refreshCaptcha();
    setValue("");
    setIsShowMessage({ isShow: true, type: "error" });
  };

  return (
    <div className={styles["captcha-wrapper"]}>
      <span className={styles["label"]}>{t("label")}</span>

      {!isVerified ? (
        <div
          className={clsx(styles["captcha-section"], {
            [className as string]: className,
          })}
        >
          <div className={styles["captcha-row"]}>
            <div
              className={clsx(styles["captcha-text-container"], {
                [classNameTextContainer as string]: classNameTextContainer,
              })}
            >
              <canvas
                ref={canvasRef}
                width={width ?? 130}
                height={height ?? 40}
              />
              <span
                onClick={refreshCaptcha}
                role="button"
                tabIndex={-1}
                aria-label={t("refresh")}
                title={t("refreshTitle")}
              >
                <TurnIcon />
              </span>
            </div>

            {isShowMessage.isShow && isShowMessage.type === "error" && (
              <div className={styles["error-div"]}>
                <CloseIcon fill="var(--red-100)" />
              </div>
            )}
          </div>

          <div className={styles["captcha-row"]}>
            <input
              id="captcha"
              name="captcha"
              type="text"
              autoComplete="off"
              spellCheck={false}
              disabled={disabled}
              placeholder={t("placeholder")}
              className={styles["captcha-text-input"]}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setIsShowMessage({ isShow: false, type: "" });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onClickSubmit();
                }
              }}
            />

            <Button
              clickFn={onClickSubmit}
              type="primary"
              size="small"
              label={t("verify")}
              disabled={disabled || value === ""}
            />
          </div>
        </div>
      ) : (
        <div className={styles["success-div"]}>
          <span>
            <CheckIcon className={styles["success-icon"]} />
          </span>
          <p>{t("verified")}</p>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            {...inputBoxErrorAnimation}
            className={styles["captcha-error"]}
            role="alert"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
