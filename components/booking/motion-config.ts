export type MotionKind =
  | "program"
  | "program-number"
  | "pathway"
  | "path-line"
  | "booking-step";

const MOTION_STEP_MS: Record<MotionKind, number> = {
  program: 70,
  "program-number": 70,
  pathway: 60,
  "path-line": 120,
  "booking-step": 50,
};

const MOTION_CAP_MS: Record<MotionKind, number> = {
  program: 210,
  "program-number": 210,
  pathway: 180,
  "path-line": 120,
  "booking-step": 150,
};

export function getMotionDelay(kind: MotionKind, index: number): number {
  const safeIndex = Math.max(0, index);
  return Math.min(safeIndex * MOTION_STEP_MS[kind], MOTION_CAP_MS[kind]);
}
