"use client";

import { type JSX,useMemo } from "react";

import {
  buildSlots,
  GEO,
  type TrainCompositionProps,
} from "@/types/trainCompositionTypes";

import HeadCar from "./HeadCar";
import IntermediateCar from "./IntermediateCar";

import styles from "./TrainComposition.module.scss";

export default function TrainComposition({
  totalCars,
  activeCarIndex,
  onCarSelect,
  ariaLabel,
  className,
}: TrainCompositionProps): JSX.Element {
  const { slots, width } = useMemo(
    () => buildSlots(totalCars, activeCarIndex),
    [totalCars, activeCarIndex],
  );

  const label =
    ariaLabel ??
    (activeCarIndex
      ? `${slots.length} araçlı dizi, ${activeCarIndex}. vagon vurgulanmış`
      : `${slots.length} araçlı dizi`);

  return (
    <div className={className ? `${styles.root} ${className}` : styles.root}>
      <svg
        className={styles.canvas}
        viewBox={`0 0 ${width} ${GEO.height}`}
        width={width}
        height={GEO.height}
        role="img"
        aria-label={label}
      >
        {slots.map((slot) => {
          const car =
            slot.kind === "head" ? (
              <HeadCar x={slot.x} flipped={slot.flipped} active={slot.active} />
            ) : (
              <IntermediateCar x={slot.x} active={slot.active} />
            );

          if (!onCarSelect) return <g key={slot.index}>{car}</g>;

          return (
            <g
              key={slot.index}
              className={styles.selectable}
              role="button"
              tabIndex={0}
              aria-label={`${slot.index}. araç`}
              aria-pressed={slot.active}
              onClick={() => onCarSelect(slot.index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onCarSelect(slot.index);
                }
              }}
            >
              {car}
              <rect
                className={styles.hitArea}
                x={slot.x}
                y={GEO.roofY - 12}
                width={slot.width}
                height={GEO.railY - GEO.roofY + 16}
              />
            </g>
          );
        })}

        <line
          className={styles.railHead}
          x1={10}
          y1={GEO.railY}
          x2={width - 10}
          y2={GEO.railY}
        />
        <line
          className={styles.railFoot}
          x1={10}
          y1={GEO.railY + 5}
          x2={width - 10}
          y2={GEO.railY + 5}
        />
      </svg>
    </div>
  );
}
