"use client";

import { aboutContent } from "@/content/about";
import { useOS } from "@/components/os/OSProvider";

export function AboutApp() {
  const { triggerEasterEgg } = useOS();

  return (
    <>
      <button
        type="button"
        className="about-title-button"
        onClick={triggerEasterEgg}
        title="Who I am"
      >
        {aboutContent.title}
      </button>
      <p className="about-subtitle">{aboutContent.subtitle}</p>
      <div className="about-body">
        {aboutContent.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}
