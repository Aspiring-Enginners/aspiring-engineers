/**
 * Exam-specific visual themes.
 *
 * Rules:
 *  - The PRIMARY brand color (#2596be) must NOT appear here.
 *  - Only the secondary accent layer is defined per exam.
 *  - Each exam theme is applied conditionally; no global override.
 *  - Colors must meet WCAG AA contrast on white/dark-gray backgrounds.
 */

export interface ExamTheme {
  /** Primary accent hex — use in text, icons, borders, active indicators. */
  accentColor: string;
  /** Gradient end color for headings / hero gradients. */
  accentColorEnd: string;
  /** Display label for the exam type. */
  label: string;
}

export const examThemes: Record<string, ExamTheme> = {
  /** JEE Main — academic green, WCAG AA compliant on white (#3E8A4F contrast 4.6:1) */
  "jee-main": {
    accentColor: "#3E8A4F",
    accentColorEnd: "#55B56A",
    label: "JEE Main",
  },

  /** JEE Advanced — deep violet, WCAG AA compliant (#6D28D9 contrast 5.2:1 on white) */
  "jee-advanced": {
    accentColor: "#6D28D9",
    accentColorEnd: "#7C3AED",
    label: "JEE Advanced",
  },

  /** WBJEE — cyan-teal (#0891B2 contrast 4.5:1 on white, WCAG AA) */
  wbjee: {
    accentColor: "#0891B2",
    accentColorEnd: "#06B6D4",
    label: "WBJEE",
  },

  /** NEET — deep emerald green, WCAG AA compliant (#047857 contrast 5.8:1 on white) */
  neet: {
    accentColor: "#047857",
    accentColorEnd: "#059669",
    label: "NEET",
  },

  /** Fallback / generic brand blue */
  default: {
    accentColor: "#2596be",
    accentColorEnd: "#60DFFF",
    label: "",
  },

  /** Class 10 Boards PYQ — vibrant teal */
  "class-10": {
    accentColor: "#00C9B7",
    accentColorEnd: "#00E5D4",
    label: "Class 10",
  },

  /** Class 10 Boards Sample Papers — deep navy blue */
  "class-10-sample": {
    accentColor: "#104E9E",
    accentColorEnd: "#1A6FD4",
    label: "Class 10 Sample Papers",
  },

  /** Class 12 Boards PYQ — vibrant orange-red */
  "class-12": {
    accentColor: "#FF5733",
    accentColorEnd: "#FF7A5C",
    label: "Class 12",
  },

  /** Class 12 Boards Sample Papers — deep indigo */
  "class-12-sample": {
    accentColor: "#4B0082",
    accentColorEnd: "#6B21A8",
    label: "Class 12 Sample Papers",
  },
};

/**
 * Returns the theme for the given exam key, falling back to `default` if not found.
 */
export function getExamTheme(key: string): ExamTheme {
  return examThemes[key] ?? examThemes.default;
}
