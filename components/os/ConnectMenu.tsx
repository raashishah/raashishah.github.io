"use client";

import { socialLinks } from "@/content/site";
import { SocialIcon } from "./SocialIcons";

export function ConnectMenu() {
  return (
    <div className="connect-menu glass-strong" role="menu" aria-label="Connect">
      <div className="connect-menu__grid">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="connect-menu__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            role="menuitem"
          >
            <SocialIcon icon={link.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}
