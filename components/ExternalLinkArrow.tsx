import { isDetailPath } from "@/lib/detail-routes";

export function ExternalLinkArrow({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      ↗
    </span>
  );
}

export function InlineLinkArrow({ href, className = "home__inline-link-icon" }: { href: string; className?: string }) {
  if (isDetailPath(href)) {
    return (
      <span className={`${className} home__inline-link-icon--detail`} aria-hidden="true">
        <span className="home__inline-link-icon-up">↑</span>
        <span className="home__inline-link-icon-right">→</span>
      </span>
    );
  }

  return <ExternalLinkArrow className={className} />;
}
