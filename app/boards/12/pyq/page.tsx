import BoardsPyqPage from "@/components/papers/BoardsPyqPage";
import { getExamTheme } from "@/lib/theme/examThemes";

const theme = getExamTheme("class-12");

export default function Class12PyqPage() {
  return (
    <BoardsPyqPage
      title="Class 12 Board PYQ"
      subtitle="Previous Year Questions"
      description="Access previous year question papers from CBSE, ISC, and other boards for Class 12. Practice with real exam papers to excel in your board exams."
      accentColor={theme.accentColor}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Boards", href: "/boards" },
        { label: "Class 12", href: "/boards/12" },
        { label: "PYQ", href: "/boards/12/pyq" },
      ]}
      classLevel="12"
      paperType="pyq"
    />
  );
}
