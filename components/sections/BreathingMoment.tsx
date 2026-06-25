"use client";

import { breathingLines } from "@/content/breathing";
import { NowPlaying } from "@/components/widgets/NowPlaying";
import { JoinJam } from "@/components/widgets/JoinJam";

type BreathingMomentProps = {
  index: number;
};

export function BreathingMoment({ index }: BreathingMomentProps) {
  const line = breathingLines[index % breathingLines.length];

  return (
    <section className="breathing-moment" data-section={`breathing-${index}`}>
      <p className="breathing-moment__text">{line.text}</p>
      {index === 1 && (
        <div className="breathing-moment__widgets">
          <NowPlaying />
          <JoinJam />
        </div>
      )}
    </section>
  );
}
