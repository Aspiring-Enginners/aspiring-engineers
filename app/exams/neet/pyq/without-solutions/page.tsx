"use client";

import PyqNoSolutionPage from "@/components/papers/PyqNoSolutionPage";
import { getExamTheme } from "@/lib/theme/examThemes";

const theme = getExamTheme("neet");

export default function NeetPyqNoSolutionPage() {
  return (
    <PyqNoSolutionPage
      title="NEET"
      subtitle="Previous Year Questions (Practice)"
      description="Practice NEET previous year papers without solutions. Perfect for self-assessment and building exam temperament."
      accentColor={theme.accentColor}
      category="neet"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Exams", href: "/exams" },
        {
          label: "NEET PYQ (Practice)",
          href: "/exams/neet/pyq/without-solutions",
        },
      ]}
    />
  );
}
