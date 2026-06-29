import { safeJsonLdStringify } from "@/lib/json-ld";
import { getStructuredDataJsonLd } from "@/lib/site-seo";

export function PersonJsonLd() {
  const jsonLd = getStructuredDataJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
    />
  );
}
