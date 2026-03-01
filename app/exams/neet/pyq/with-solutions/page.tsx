"use client";

import PyqPage from "@/components/papers/PyqPage";
import { getExamTheme } from "@/lib/theme/examThemes";

const theme = getExamTheme("neet");

export default function NeetPyqPage() {
  return (
    <PyqPage
      title="NEET"
      subtitle="Previous Year Questions with Solutions"
      description="Ace NEET with our extensive collection of previous year papers. Practice Physics, Chemistry, and Biology with detailed solutions and expert guidance."
      accentColor={theme.accentColor}
      category="neet"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Exams", href: "/exams" },
        { label: "NEET PYQ", href: "/exams/neet/pyq/with-solutions" },
      ]}
    />
  );
}
