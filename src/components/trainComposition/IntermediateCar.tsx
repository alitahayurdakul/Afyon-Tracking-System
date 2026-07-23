import type { JSX } from 'react';

import { GEO, SCALE } from '@/types/trainCompositionTypes';

import { Bogie, DoorPost, RoofEquipment, UnderGear, WindowRow } from './parts';

const { roofY, waistY, sillY, carWidth } = GEO;

interface IntermediateCarProps {
  x: number;
  active: boolean;
}

export default function IntermediateCar({
  x,
  active,
}: IntermediateCarProps): JSX.Element {
  return (
    <g className={active ? 'car carActive' : 'car'}>
      <Bogie x={x + 66 * SCALE} />
      <Bogie x={x + carWidth - 66 * SCALE} />

      <rect
        className="carBody"
        x={x}
        y={roofY}
        width={carWidth}
        height={sillY - roofY}
      />
      <line className="waistLine" x1={x} y1={waistY} x2={x + carWidth} y2={waistY} />

      <RoofEquipment x={x} width={carWidth} />
      <WindowRow x={x} width={carWidth} />
      <UnderGear x={x} width={carWidth} />

      <DoorPost x={x + 6 * SCALE} />
      <DoorPost x={x + carWidth - 19 * SCALE} />
    </g>
  );
}
