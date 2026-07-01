import { legacyFooterSocialSvgIcons } from "@/lib/legacy-social-icons";
import {
  footerIconDescriptors,
  type FooterSocialIconId,
} from "@/lib/footer-social-icons";

export function SocialIcon({
  id,
  className,
}: {
  id: FooterSocialIconId;
  className?: string;
}) {
  const descriptor = footerIconDescriptors[id];

  if (descriptor.kind === "svg") {
    const legacySvg = legacyFooterSocialSvgIcons[descriptor.legacyKey];
    const legacyClassName = [
      className,
      "home__footer-icon--legacy",
      descriptor.scaleClass,
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

  return (
    <i className={`${descriptor.iconClass} ${className ?? ""}`.trim()} aria-hidden />
  );
}
