"use client";

import { useEffect, useState } from "react";
import type { ProjectLoopMedia, ProjectStill } from "@/content/types";

function markMuted(node: HTMLVideoElement | null) {
  if (node) {
    node.muted = true;
  }
}

type ProjectMediaProps = {
  loop: ProjectLoopMedia;
  performance?: ProjectStill;
};

export function ProjectMedia({ loop, performance }: ProjectMediaProps) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setShowVideo(!media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <figure className="home__project-media">
        <div className="home__project-loop-frame" data-ratio={loop.ratio}>
          {showVideo ? (
            <video
              ref={markMuted}
              className="home__project-loop"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={loop.poster}
              width={loop.width}
              height={loop.height}
            >
              <source src={loop.src} type="video/mp4" />
            </video>
          ) : (
            <img
              className="home__project-loop"
              src={loop.poster}
              alt=""
              width={loop.width}
              height={loop.height}
            />
          )}
        </div>
        <figcaption>{loop.caption}</figcaption>
      </figure>
      {performance ? (
        <img
          className="home__project-performance"
          src={performance.src}
          alt={performance.alt}
          width={performance.width}
          height={performance.height}
        />
      ) : null}
    </>
  );
}
