import { legacyFooterSocialSvgIcons } from "@/lib/legacy-social-icons";
import {
  footerSocialIconClasses,
  type FooterSocialIconId,
} from "@/lib/footer-social-icons";

export function SocialIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const legacySvg =
    legacyFooterSocialSvgIcons[id as keyof typeof legacyFooterSocialSvgIcons];
  if (legacySvg) {
    const legacyClassName = [
      className,
      id === "giphy" ? "home__footer-icon--giphy" : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <svg
        className={legacyClassName}
        viewBox={legacySvg.viewBox}
        aria-hidden
        focusable="false"
        role="img"
      >
        <path fill="currentColor" d={legacySvg.path} />
      </svg>
    );
  }

  const iconClass =
    footerSocialIconClasses[id as Exclude<FooterSocialIconId, "giphy" | "medium">];
  if (!iconClass) {
    return null;
  }

  return <i className={`${iconClass} ${className ?? ""}`.trim()} aria-hidden />;
}
