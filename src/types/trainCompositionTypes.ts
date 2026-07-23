export interface TrainCompositionProps {
  totalCars: number;
  activeCarIndex?: number;
  onCarSelect?: (index: number) => void;
  ariaLabel?: string;
  className?: string;
}

export type CarKind = 'head' | 'intermediate';

export interface CarSlot {
  index: number;
  kind: CarKind;
  x: number;
  width: number;
  flipped: boolean;
  active: boolean;
}

export const GEO = {
  headWidth: 227,
  carWidth: 200,
  height: 100,
  padX: 17,
  roofY: 23,
  windowY: 35,
  waistY: 52,
  sillY: 61,
  axleY: 69,
  railY: 77,
} as const;

const REFERENCE_HEIGHT = 150;

export const SCALE = GEO.height / REFERENCE_HEIGHT;

export function buildSlots(
  totalCars: number,
  activeCarIndex?: number,
): { slots: CarSlot[]; width: number } {
  const count = Math.max(2, Math.floor(totalCars));
  const slots: CarSlot[] = [];
  let x = GEO.padX;

  for (let index = 1; index <= count; index += 1) {
    const isHead = index === 1 || index === count;
    const width = isHead ? GEO.headWidth : GEO.carWidth;

    slots.push({
      index,
      kind: isHead ? 'head' : 'intermediate',
      x,
      width,
      flipped: index === count,
      active: index === activeCarIndex,
    });

    x += width;
  }

  return { slots, width: x + GEO.padX };
}
