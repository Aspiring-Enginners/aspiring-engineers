import BoardsPyqPage from "@/components/papers/BoardsPyqPage";
import { getExamTheme } from "@/lib/theme/examThemes";

const theme = getExamTheme("class-12-sample");

export default function Class12SamplePapersPage() {
  return (
    <BoardsPyqPage
      title="Class 12 Sample Papers"
      subtitle="Official & Practice Papers"
      description="Download official CBSE sample papers and practice papers for Class 12. Prepare effectively with the latest pattern and marking scheme."
      accentColor={theme.accentColor}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Boards", href: "/boards" },
        { label: "Class 12", href: "/boards/12" },
        { label: "Sample Papers", href: "/boards/12/sample-papers" },
      ]}
      classLevel="12"
      paperType="sample"
    />
  );
}
