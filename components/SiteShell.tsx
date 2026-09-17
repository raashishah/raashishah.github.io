import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";
import {
  calendlyLink,
  coral,
  emailLink,
  footerDiscoveryHintAfter,
  footerDiscoveryHintBefore,
  footerLinks,
} from "@/content/site";
import type { FooterSocialLinkId } from "@/content/types";
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
  iconId?: FooterSocialLinkId;
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
};

export function SiteShell({
  children,
  nameHref,
  nameExternal = false,
}: SiteShellProps) {
  const brand = (
    <>
      <img
        src={coral.src}
        alt=""
        aria-hidden="true"
        className="home__header-mark"
      />
      {siteConfig.name}
    </>
  );
  const nameLink = nameExternal ? (
    <a
      href={nameHref}
      className="home__name-link"
      aria-label={`${siteConfig.name} (opens in new tab)`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {brand}
    </a>
  ) : (
    <Link href={nameHref} className="home__name-link">
      {brand}
    </Link>
  );

  return (
    <>
      <main className="home">
        <header className="home__header">
          <h1 className="home__name">{nameLink}</h1>
          <nav className="home__header-contact" aria-label="Contact">
            <SocialAnchor
              href={emailLink.href}
              label={emailLink.label}
              className="home__link home__link--header"
            />
            <span> or </span>
            <SocialAnchor
              href={calendlyLink.href}
              label={calendlyLink.label}
              className="home__link home__link--header"
            />
          </nav>
        </header>

        {children}

        <footer className="home__footer">
          <div className="home__footer-row">
            <nav className="home__footer-nav" aria-label="Social links">
              {footerLinks.map((link) => (
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
              <span className="home__footer-meta-hint">
                {footerDiscoveryHintBefore}{" "}
                <img
                  src={coral.src}
                  alt=""
                  aria-hidden="true"
                  className="home__footer-mark"
                />{" "}
                {footerDiscoveryHintAfter}
              </span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
