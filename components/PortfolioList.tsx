import Link from "next/link";
import { Fragment } from "react";
import { AnimatedDetails } from "@/components/AnimatedDetails";
import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";
import {
  INLINE_LINK_SEPARATOR,
  type BodyParagraph,
  type PortfolioEntry,
  type PullquoteParagraph,
  type RichLine,
} from "@/content/types";

function isPullquoteParagraph(
  paragraph: BodyParagraph,
): paragraph is PullquoteParagraph {
  return typeof paragraph === "object" && "pullquote" in paragraph;
}

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  );
}

function InlineBodyLink({ href, text }: { href: string; text: string }) {
  const external = isExternalHref(href);
  const label = (
    <>
      {text}
      {"\u00a0"}
      <ExternalLinkArrow className="home__inline-link-icon" />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className="home__inline-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="home__inline-link">
      {label}
    </Link>
  );
}

function InlineText({ content }: { content: RichLine }) {
  if (typeof content === "string") {
    return <>{content}</>;
  }

  return (
    <>
      {content.map((segment, index) => {
        if (typeof segment === "string") {
          if (segment === INLINE_LINK_SEPARATOR) {
            return (
              <span key={index} className="home__inline-separator" aria-hidden="true">
                {" · "}
              </span>
            );
          }

          return <Fragment key={index}>{segment}</Fragment>;
        }

        return (
          <InlineBodyLink key={index} href={segment.href} text={segment.text} />
        );
      })}
    </>
  );
}

function BodyParagraphBlock({ paragraph }: { paragraph: BodyParagraph }) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }

  if (isPullquoteParagraph(paragraph)) {
    return (
      <blockquote className="home__project-body-pullquote">
        <InlineText content={paragraph.text} />
      </blockquote>
    );
  }

  return (
    <p>
      <InlineText content={paragraph} />
    </p>
  );
}

function ProjectListItem({
  item,
  accordionId,
}: {
  item: PortfolioEntry;
  accordionId: string;
}) {
  return (
    <li className="home__project-item">
      <AnimatedDetails
        className="home__details"
        accordionId={accordionId}
        summary={
          <>
            <span className="home__project-title">{item.title}</span>
            <span className="home__disclosure" aria-hidden="true" />
          </>
        }
      >
        <div className="home__project-body">
          {item.paragraphs.map((paragraph, index) => (
            <BodyParagraphBlock key={index} paragraph={paragraph} />
          ))}
        </div>
      </AnimatedDetails>
    </li>
  );
}

type PortfolioListProps = {
  items: readonly PortfolioEntry[];
  idPrefix?: string;
  ariaLabel?: string;
};

export function PortfolioList({ items, idPrefix, ariaLabel }: PortfolioListProps) {
  return (
    <ul className="home__project-list" aria-label={ariaLabel}>
      {items.map((item) => (
        <ProjectListItem
          key={item.id}
          item={item}
          accordionId={idPrefix ? `${idPrefix}-${item.id}` : item.id}
        />
      ))}
    </ul>
  );
}
