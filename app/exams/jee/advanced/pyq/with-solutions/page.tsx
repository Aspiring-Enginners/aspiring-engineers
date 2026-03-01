"use client";

import PyqPage from "@/components/papers/PyqPage";
import { getExamTheme } from "@/lib/theme/examThemes";

const theme = getExamTheme("jee-advanced");

export default function JeeAdvancedPyqPage() {
  return (
    <PyqPage
      title="JEE Advanced"
      subtitle="Previous Year Questions with Solutions"
      description="Tackle the toughest JEE Advanced problems with our comprehensive collection. Each paper features step-by-step solutions and expert video explanations."
      accentColor={theme.accentColor}
      category="jee-advanced"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Exams", href: "/exams" },
        { label: "JEE", href: "/exams/jee" },
        {
          label: "Advanced PYQ",
          href: "/exams/jee/advanced/pyq/with-solutions",
        },
      ]}
    />
  );
}
