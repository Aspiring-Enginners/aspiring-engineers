import BoardsPyqPage from "@/components/papers/BoardsPyqPage";
import { getExamTheme } from "@/lib/theme/examThemes";

const theme = getExamTheme("class-10");

export default function Class10PyqPage() {
  return (
    <BoardsPyqPage
      title="Class 10 Board PYQ"
      subtitle="Previous Year Questions"
      description="Access previous year question papers from CBSE, ICSE, and other boards for Class 10. Practice with real exam papers to ace your board exams."
      accentColor={theme.accentColor}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Boards", href: "/boards" },
        { label: "Class 10", href: "/boards/10" },
        { label: "PYQ", href: "/boards/10/pyq" },
      ]}
      classLevel="10"
      paperType="pyq"
    />
  );
}
