import { ProjectPage } from "@/components/ProjectPage";
import { expressionContent } from "@/content/expression";

export function ExpressionPage() {
  return (
    <ProjectPage
      {...expressionContent}
      pageLabel="About Expression"
    />
  );
}
