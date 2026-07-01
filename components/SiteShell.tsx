import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";
import {
  calendlyLink,
  emailLink,
  footerLinks,
} from "@/content/site";
import type { SocialLink } from "@/content/types";
import { siteConfig } from "@/lib/metadata";

function SocialAnchor({
  href,
  label,
  className,
  iconId,
}: {
  href: string;
  label: string;
  className?: string;
  iconId?: string;
}) {
  const isMailto = href.startsWith("mailto:");
  const accessibleLabel = isMailto ? label : `${label} (opens in new tab)`;

  return (
    <a
      href={href}
      className={className}
      aria-label={accessibleLabel}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
    >
      {iconId ? <SocialIcon id={iconId} className="home__footer-icon" /> : null}
      <span className={iconId ? "home__footer-label" : undefined}>{label}</span>
    </a>
  );
}

type SiteShellProps = {
  children: React.ReactNode;
  nameHref: string;
  nameExternal?: boolean;
  nameAsHeading?: boolean;
  emailLink?: SocialLink;
  calendlyLink?: SocialLink;
  footerLinks?: readonly SocialLink[];
};

export function SiteShell({
  children,
  nameHref,
  nameExternal = false,
  nameAsHeading = true,
  emailLink: email = emailLink,
  calendlyLink: calendly = calendlyLink,
  footerLinks: footer = footerLinks,
}: SiteShellProps) {
  const nameLink = nameExternal ? (
    <a
      href={nameHref}
      className="home__name-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {siteConfig.name}
    </a>
  ) : (
    <Link href={nameHref} className="home__name-link">
      {siteConfig.name}
    </Link>
  );

  const NameTag = nameAsHeading ? "h1" : "p";

  return (
    <>
      <main className="home">
        <header className="home__header">
          <NameTag className="home__name">{nameLink}</NameTag>
          <nav className="home__header-contact" aria-label="Contact">
            <SocialAnchor
              href={email.href}
              label={email.label}
              className="home__link home__link--header"
            />
            <span> or </span>
            <SocialAnchor
              href={calendly.href}
              label={calendly.label}
              className="home__link home__link--header"
            />
          </nav>
        </header>

        {children}

        <footer className="home__footer">
          <nav className="home__footer-nav" aria-label="Social links">
            {footer.map((link) => (
              <SocialAnchor
                key={link.id}
                href={link.href}
                label={link.label}
                iconId={link.id}
                className="home__link home__link--footer"
              />
            ))}
          </nav>
          <p className="home__footer-meta">
            <span>2026</span>
            <img
              src="/img/footer-mark.svg"
              alt=""
              aria-hidden="true"
              className="home__footer-mark"
            />
          </p>
        </footer>
      </main>
    </>
  );
}
