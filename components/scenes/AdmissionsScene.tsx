"use client";

import { palette } from "@/lib/palette";
import { easeOutCubic, lerp } from "@/lib/scene-progress";
import { Scene2D } from "@/components/scenes/Scene2D";

type AdmissionsSceneProps = {
  progress: number;
};

const RUBRIC = [
  { label: "Academics", weight: 65 },
  { label: "Extracurricular", weight: 89 },
  { label: "Essay", weight: 74 },
  { label: "Interview", weight: 98 },
] as const;

const ROWS = [
  { id: "#9904", name: "Chen, M.", tags: ["STEM", "Leadership"] },
  { id: "#9905", name: "Adebayo, J.", tags: ["First-Gen", "Arts"] },
  { id: "#9906", name: "Davis, L.", tags: ["Humanities"] },
] as const;

export function AdmissionsScene({ progress }: AdmissionsSceneProps) {
  const highlight = Math.min(ROWS.length - 1, Math.floor(progress * ROWS.length * 1.2));
  const rubricReveal = easeOutCubic(Math.min(1, progress * 1.4));

  return (
    <Scene2D className="scene-admissions">
      <svg viewBox="0 0 480 320" className="scene-admissions__svg" role="img" aria-label="Admissions rubric dashboard">
        <rect width="480" height="320" fill={palette.base} rx="8" />
        <rect x="12" y="12" width="200" height="296" fill={palette.base} stroke={palette.ink} strokeWidth="2" />
        <text x="24" y="36" fill={palette.ink} fontSize="11" fontWeight="700" letterSpacing="0.08em">
          RUBRIC
        </text>
        {RUBRIC.map((item, i) => {
          const barW = lerp(0, (item.weight / 100) * 160, rubricReveal);
          const y = 52 + i * 56;
          return (
            <g key={item.label}>
              <text x="24" y={y} fill={palette.greyBlue} fontSize="10">
                {item.label}
              </text>
              <rect x="24" y={y + 6} width="160" height="8" fill={palette.base} stroke={palette.ink} strokeWidth="1" />
              <rect x="24" y={y + 6} width={barW} height="8" fill={palette.rose} opacity="0.85" />
              <text x="188" y={y + 14} fill={palette.ink} fontSize="9" textAnchor="end">
                {Math.round(item.weight * rubricReveal)}%
              </text>
            </g>
          );
        })}
        <rect x="224" y="12" width="244" height="296" fill={palette.base} stroke={palette.ink} strokeWidth="2" />
        <text x="236" y="36" fill={palette.ink} fontSize="11" fontWeight="700">
          APPLICANTS
        </text>
        {ROWS.map((row, i) => {
          const rowOpacity = progress > i * 0.2 ? 1 : 0.25;
          const isHi = i === highlight;
          const y = 52 + i * 72;
          return (
            <g key={row.id} opacity={rowOpacity}>
              <rect
                x="232"
                y={y}
                width="228"
                height="60"
                fill={isHi ? palette.rose : palette.base}
                fillOpacity={isHi ? 0.15 : 0}
                stroke={palette.ink}
                strokeWidth={isHi ? 2 : 1}
              />
              <text x="244" y={y + 22} fill={palette.ink} fontSize="11" fontWeight="700">
                {row.name}
              </text>
              <text x="244" y={y + 38} fill={palette.greyBlue} fontSize="9">
                {row.id}
              </text>
              {row.tags.map((tag, ti) => (
                <g key={tag}>
                  <rect
                    x={244 + ti * 72}
                    y={y + 44}
                    width="64"
                    height="14"
                    fill={palette.ink}
                    opacity={isHi ? 1 : 0.7}
                  />
                  <text
                    x={276 + ti * 72}
                    y={y + 55}
                    fill={palette.base}
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {tag}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </Scene2D>
  );
}
