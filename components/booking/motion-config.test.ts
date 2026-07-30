import { describe, expect, it } from "vitest";

import { getMotionDelay } from "./motion-config";

describe("getMotionDelay", () => {
  it("stages program rows without exceeding the motion budget", () => {
    expect(getMotionDelay("program", 0)).toBe(0);
    expect(getMotionDelay("program", 1)).toBe(70);
    expect(getMotionDelay("program", 20)).toBe(210);
  });

  it("keeps pathway and booking feedback faster than program staging", () => {
    expect(getMotionDelay("pathway", 2)).toBe(120);
    expect(getMotionDelay("booking-step", 2)).toBe(100);
  });

  it("caps number and path-line staging", () => {
    expect(getMotionDelay("program-number", 20)).toBe(210);
    expect(getMotionDelay("path-line", 20)).toBe(120);
  });

  it("handles negative indexes as the first item", () => {
    expect(getMotionDelay("program", -1)).toBe(0);
  });
});
