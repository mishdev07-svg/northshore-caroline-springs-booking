export type LandingVariant = "general" | "selective" | "scholarship";

export const INTERESTS = [
  "Prep-Year 10 tutoring",
  "Selective School Preparation",
  "Scholarship Preparation",
  "Not sure yet",
] as const;

export type Interest = (typeof INTERESTS)[number];

export type LandingContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    detail: string;
  };
  pathway: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    cta: string;
  };
  defaultInterest: Interest;
};

export const PROGRAMS = [
  {
    number: "01",
    title: "Prep-Year 10 tutoring",
    description:
      "Structured tutoring from Prep to Year 10 for stronger foundations, confidence, and study habits.",
    href: "/tutoring-caroline-springs",
  },
  {
    number: "02",
    title: "Selective School Preparation",
    description:
      "Steady, structured preparation with additional workshops provided throughout the week as students get closer to the exam.",
    href: "/selective-school-preparation-caroline-springs",
  },
  {
    number: "03",
    title: "Scholarship Preparation",
    description:
      "Structured guidance for families exploring scholarship pathways, without unrealistic outcome promises.",
    href: "/scholarship-preparation-caroline-springs",
  },
];

export const PROOF_POINTS = [
  { label: "Established", value: "Founded in 1991" },
  {
    label: "National network",
    value: "Over 65 campuses",
  },
  {
    label: "Teaching",
    value: "Structured programs with qualified teachers",
  },
];

export const SCHEDULE = [
  {
    label: "Saturday",
    value: "9:30am-1:00pm: Grade 3, 4, 9 and 10 classes only",
  },
  {
    label: "Sunday",
    value: "9:30am-1:00pm",
  },
];

export const FAQS = [
  {
    question: "What happens after I request an assessment?",
    answer:
      "The Caroline Springs campus contacts you to confirm a suitable assessment time and asks any final questions about your child's year level and learning priorities.",
  },
  {
    question: "Is it too late to join during Term 3?",
    answer:
      "No. Students can join during the term and pay pro-rata fees for the remaining lessons.",
  },
  {
    question: "Where are classes held?",
    answer:
      "Classes are held at Lakeview Senior College, College Street, Caroline Springs VIC 3023. Free on-site parking is available from The Parade side near Caroline Springs Library.",
  },
  {
    question: "Can my child try a class before enrolling?",
    answer:
      "Free trial classes are available by booking for new families who are close to enrolling. If you are unsure what support is needed, begin with the free assessment.",
  },
  {
    question: "Does tutoring guarantee a selective or scholarship outcome?",
    answer:
      "No. These pathways are competitive and depend on many factors. North Shore provides structured preparation, qualified teachers, and consistent practice.",
  },
];

const LANDING_CONTENT: Record<LandingVariant, LandingContent> = {
  general: {
    hero: {
      eyebrow: "North Shore Caroline Springs | Lakeview Senior College",
      title: "Tutoring in Caroline Springs that starts with a clear plan.",
      description:
        "Book a free initial assessment to understand where your child needs support and which structured program fits best.",
      detail:
        "Prep-Year 10 tutoring, Selective School Preparation and Scholarship Preparation.",
    },
    pathway: {
      eyebrow: "Year 7 families",
      title: "Planning for 2028 selective entry?",
      description:
        "Year 7 is a practical time to begin structured preparation for Year 9 selective entry. Students build reasoning, reading, writing and problem-solving habits, with additional workshops provided throughout the week as the exam approaches.",
      href: "/selective-school-preparation-caroline-springs",
      cta: "Explore selective preparation",
    },
    defaultInterest: "Not sure yet",
  },
  selective: {
    hero: {
      eyebrow: "Selective School Preparation | Caroline Springs",
      title: "Year 7 selective preparation for 2028 entry.",
      description:
        "Build exam-ready thinking steadily with a structured local program, qualified teachers, and additional workshops as students get closer to the exam.",
      detail:
        "Start with a free initial assessment. No outcome guarantees and no enrolment commitment.",
    },
    pathway: {
      eyebrow: "A steady preparation pathway",
      title: "Build the skills before exam pressure arrives.",
      description:
        "Year 7 is a practical time to begin structured preparation for Year 9 selective entry. Students build reasoning, reading, writing and problem-solving habits, with additional workshops provided throughout the week as the exam approaches.",
      href: "#booking",
      cta: "Start with the free assessment",
    },
    defaultInterest: "Selective School Preparation",
  },
  scholarship: {
    hero: {
      eyebrow: "Scholarship Preparation | Caroline Springs",
      title: "Scholarship preparation built around steady progress.",
      description:
        "Give your child a structured preparation pathway with qualified teachers, consistent practice, and a clear local starting point.",
      detail:
        "Start with a free initial assessment. No outcome guarantees and no enrolment commitment.",
    },
    pathway: {
      eyebrow: "A practical scholarship pathway",
      title: "Prepare consistently without outcome promises.",
      description:
        "Scholarship pathways are competitive. North Shore Caroline Springs provides structured guidance, qualified teachers and consistent practice so families can begin with a clear, realistic preparation plan.",
      href: "#booking",
      cta: "Start with the free assessment",
    },
    defaultInterest: "Scholarship Preparation",
  },
};

export function getLandingContent(
  variant: LandingVariant,
): LandingContent {
  return LANDING_CONTENT[variant];
}
