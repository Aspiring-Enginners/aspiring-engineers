"use client";

import PyqPage from "@/components/papers/PyqPage";
import { getExamTheme } from "@/lib/theme/examThemes";

const theme = getExamTheme("wbjee");

export default function WbjeePyqPage() {
  return (
    <PyqPage
      title="WBJEE"
      subtitle="Previous Year Questions with Solutions"
      description="Prepare for West Bengal Joint Entrance Examination with our curated collection of previous year papers. Complete with solutions and video explanations."
      accentColor={theme.accentColor}
      category="wbjee"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Exams", href: "/exams" },
        { label: "WBJEE PYQ", href: "/exams/wbjee/pyq/with-solutions" },
      ]}
    />
  );
}
