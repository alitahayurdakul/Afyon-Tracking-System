import type { JSX } from "react";

import { GEO, SCALE } from "@/types/trainCompositionTypes";

const { roofY, windowY, waistY, sillY, axleY } = GEO;

export function RoofEquipment({ x, width }: { x: number; width: number }): JSX.Element {
  const unit = 44 * SCALE;
  const count = Math.floor(width / unit);

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          className="roofUnit"
          x={x + 10 * SCALE + i * unit}
          y={roofY - 6 * SCALE}
          width={30 * SCALE}
          height={4 * SCALE}
        />
      ))}
    </>
  );
}

export function WindowRow({ x, width }: { x: number; width: number }): JSX.Element {
  const unit = 23 * SCALE;
  const count = Math.floor((width - 70 * SCALE) / unit);

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          className="window"
          x={x + 34 * SCALE + i * unit}
          y={windowY}
          width={15 * SCALE}
          height={14 * SCALE}
        />
      ))}
    </>
  );
}

export function DoorPost({ x }: { x: number }): JSX.Element {
  return (
    <g>
      <rect
        className="door"
        x={x}
        y={roofY + 4 * SCALE}
        width={13 * SCALE}
        height={sillY - roofY - 4 * SCALE}
      />
      <rect
        className="doorGlass"
        x={x + 2 * SCALE}
        y={roofY + 8 * SCALE}
        width={9 * SCALE}
        height={14 * SCALE}
      />
    </g>
  );
}

const GEAR_BLOCKS: Array<[ratio: number, w: number]> = [
  [0.1, 32],
  [0.26, 28],
  [0.56, 28],
  [0.72, 32],
];

export function UnderGear({ x, width }: { x: number; width: number }): JSX.Element {
  return (
    <>
      {GEAR_BLOCKS.map(([ratio, w], i) => (
        <rect
          key={i}
          className="gearBox"
          x={x + width * ratio}
          y={waistY + 2 * SCALE}
          width={w * SCALE}
          height={8 * SCALE}
        />
      ))}
    </>
  );
}

export function Bogie({ x }: { x: number }): JSX.Element {
  const halfBase = 20 * SCALE;
  const r = 9 * SCALE;

  return (
    <g className="bogie">
      <path
        className="bogieFrame"
        d={`M${x - 30 * SCALE} ${sillY} L${x - 26 * SCALE} ${axleY - 5 * SCALE} L${x + 26 * SCALE} ${axleY - 5 * SCALE} L${x + 30 * SCALE} ${sillY}`}
      />
      <line className="axleLink" x1={x - halfBase} y1={axleY - 5 * SCALE} x2={x - halfBase} y2={axleY} />
      <line className="axleLink" x1={x + halfBase} y1={axleY - 5 * SCALE} x2={x + halfBase} y2={axleY} />
      <line className="axle" x1={x - halfBase} y1={axleY} x2={x + halfBase} y2={axleY} />

      {[-halfBase, halfBase].map((offset) => (
        <g key={offset}>
          <circle className="wheel" cx={x + offset} cy={axleY} r={r} />
          <circle className="brakeDisc" cx={x + offset} cy={axleY} r={r - 3.5 * SCALE} />
          <circle className="hub" cx={x + offset} cy={axleY} r={1.8 * SCALE} />
        </g>
      ))}
    </g>
  );
}

export function Pantograph({ x }: { x: number }): JSX.Element {
  const top = 6 * SCALE;

  return (
    <g className="pantograph">
      <path d={`M${x - 22 * SCALE} ${roofY - 8 * SCALE} L${x + 8 * SCALE} ${top + 8 * SCALE} L${x + 30 * SCALE} ${top + 16 * SCALE}`} />
      <path d={`M${x - 6 * SCALE} ${roofY - 8 * SCALE} L${x + 8 * SCALE} ${top + 8 * SCALE}`} />
      <path d={`M${x - 16 * SCALE} ${top + 6 * SCALE} L${x + 26 * SCALE} ${top + 6 * SCALE}`} />
    </g>
  );
}