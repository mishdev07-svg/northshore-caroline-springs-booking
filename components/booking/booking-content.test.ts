import { describe, expect, it } from "vitest";

import {
  FAQS,
  INTERESTS,
  PROGRAMS,
  PROOF_POINTS,
  SCHEDULE,
  getLandingContent,
} from "./booking-content";

describe("booking content contracts", () => {
  it("preserves the approved program set", () => {
    expect(PROGRAMS.map((program) => program.title)).toEqual([
      "Prep-Year 10 tutoring",
      "Selective School Preparation",
      "Scholarship Preparation",
    ]);
  });

  it("preserves the four approved form interests", () => {
    expect(INTERESTS).toEqual([
      "Prep-Year 10 tutoring",
      "Selective School Preparation",
      "Scholarship Preparation",
      "Not sure yet",
    ]);
  });

  it("preserves the selective workshop promise", () => {
    const selective = PROGRAMS.find(
      (program) => program.title === "Selective School Preparation",
    );

    expect(selective?.description).toContain(
      "additional workshops provided throughout the week as students get closer to the exam",
    );
  });

  it("preserves the exact weekend schedule", () => {
    expect(SCHEDULE).toEqual([
      {
        label: "Saturday",
        value: "9:30am-1:00pm: Grade 3, 4, 9 and 10 classes only",
      },
      { label: "Sunday", value: "9:30am-1:00pm" },
    ]);
  });

  it("preserves verified proof and no-guarantee language", () => {
    expect(PROOF_POINTS.map((point) => point.value)).toEqual([
      "Founded in 1991",
      "Over 65 campuses",
      "Structured programs with qualified teachers",
    ]);
    expect(
      FAQS.some((faq) =>
        faq.answer.includes("These pathways are competitive"),
      ),
    ).toBe(true);
  });

  it("maps each route to the correct default interest", () => {
    expect(getLandingContent("general").defaultInterest).toBe("Not sure yet");
    expect(getLandingContent("selective").defaultInterest).toBe(
      "Selective School Preparation",
    );
    expect(getLandingContent("scholarship").defaultInterest).toBe(
      "Scholarship Preparation",
    );
  });
});
