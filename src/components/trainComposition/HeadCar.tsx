import type { JSX } from 'react';

import { GEO, SCALE } from '@/types/trainCompositionTypes';

import {
  Bogie,
  DoorPost,
  Pantograph,
  RoofEquipment,
  UnderGear,
  WindowRow,
} from './parts';

const { roofY, windowY, waistY, sillY, headWidth } = GEO;

interface HeadCarProps {
  x: number;
  flipped: boolean;
  active: boolean;
}

function outline(n: number): string {
  return [
    `M${n + 70 * SCALE} ${roofY}`,
    `L${n + headWidth} ${roofY}`,
    `L${n + headWidth} ${sillY}`,
    `L${n + 16 * SCALE} ${sillY}`,
    `C${n - 2 * SCALE} ${sillY - 8 * SCALE}, ${n + 2 * SCALE} ${windowY - 2 * SCALE}, ${n + 22 * SCALE} ${windowY - 6 * SCALE}`,
    `C${n + 38 * SCALE} ${roofY + 6 * SCALE}, ${n + 52 * SCALE} ${roofY}, ${n + 70 * SCALE} ${roofY}`,
    'Z',
  ].join(' ');
}

function windshield(n: number): string {
  return [
    `M${n + 30 * SCALE} ${windowY + 1 * SCALE}`,
    `C${n + 44 * SCALE} ${roofY + 9 * SCALE}, ${n + 58 * SCALE} ${roofY + 5 * SCALE}, ${n + 74 * SCALE} ${roofY + 5 * SCALE}`,
    `L${n + 74 * SCALE} ${windowY + 15 * SCALE}`,
    `L${n + 26 * SCALE} ${windowY + 15 * SCALE}`,
    'Z',
  ].join(' ');
}

export default function HeadCar({ x, flipped, active }: HeadCarProps): JSX.Element {
  const body = (
    <g className={active ? 'car carActive' : 'car'}>
      <Bogie x={x + 104 * SCALE} />
      <Bogie x={x + headWidth - 66 * SCALE} />

      <path className="carBody" d={outline(x)} />
      <path className="windshield" d={windshield(x)} />
      <line
        className="waistLine"
        x1={x + 16 * SCALE}
        y1={waistY}
        x2={x + headWidth}
        y2={waistY}
      />

      <RoofEquipment x={x + 96 * SCALE} width={headWidth - 96 * SCALE} />
      <WindowRow x={x + 80 * SCALE} width={headWidth - 80 * SCALE} />
      <UnderGear x={x + 40 * SCALE} width={headWidth - 40 * SCALE} />

      <DoorPost x={x + 84 * SCALE} />
      <DoorPost x={x + headWidth - 19 * SCALE} />

      <Pantograph x={x + headWidth - 120 * SCALE} />
    </g>
  );

  if (!flipped) return body;

  return <g transform={`translate(${2 * x + headWidth}, 0) scale(-1, 1)`}>{body}</g>;
}