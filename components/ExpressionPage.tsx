import { expressionContent } from "@/content/expression";
import { siteConfig } from "@/lib/metadata";

export function ExpressionPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content" className="expression">
        <nav className="expression__nav" aria-label="Site">
          <a href="/" className="expression__back">
            {siteConfig.name}
          </a>
        </nav>

        <header className="expression__header">
          <h1 className="expression__title">{expressionContent.title}</h1>
          <p className="expression__role">{expressionContent.role}</p>
          <p className="expression__tagline">{expressionContent.tagline}</p>
        </header>

        <article className="expression__body" aria-label="About Expression">
          {expressionContent.sections.map((section) => (
            <section key={section.heading} className="expression__section">
              <h2 className="expression__section-title">{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
