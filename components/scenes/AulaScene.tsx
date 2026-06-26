"use client";

import { palette } from "@/lib/palette";
import { lerp } from "@/lib/scene-progress";
import { Scene2D } from "@/components/scenes/Scene2D";

type AulaSceneProps = {
  progress: number;
};

const STUDENTS = [
  { x: 24, y: 100 },
  { x: 100, y: 100 },
  { x: 176, y: 100 },
  { x: 252, y: 100 },
  { x: 328, y: 100 },
];

const CHAT = [
  "Can you share slide 4?",
  "Mic check 🎤",
  "This is actually helpful",
];

export function AulaScene({ progress }: AulaSceneProps) {
  const live = progress > 0.2;

  return (
    <Scene2D className="scene-aula">
      <svg viewBox="0 0 400 260" className="scene-aula__svg" role="img" aria-label="Online classroom">
        <rect width="400" height="260" fill={palette.navy} fillOpacity="0.04" />
        <rect x="8" y="8" width="384" height="244" fill={palette.base} stroke={palette.ink} strokeWidth="2" />
        {/* Professor screen */}
        <rect x="120" y="20" width="160" height="90" fill={palette.ink} fillOpacity={lerp(0, 0.9, Math.min(1, progress * 2))} />
        <text x="200" y="72" fill={palette.base} fontSize="10" textAnchor="middle" opacity={live ? 1 : 0}>
          LIVE LECTURE
        </text>
        {/* Student tiles */}
        {STUDENTS.map((s, i) => {
          const inRoom = progress > 0.15 + i * 0.1;
          return (
            <g key={i} opacity={inRoom ? 1 : 0}>
              <rect x={s.x} y={s.y} width="64" height="48" fill={palette.base} stroke={palette.ink} strokeWidth="1.5" />
              <circle cx={s.x + 32} cy={s.y + 20} r="10" fill={palette.rose} fillOpacity="0.5" />
              <rect x={s.x + 20} y={s.y + 34} width="24" height="4" fill={palette.greyBlue} />
            </g>
          );
        })}
        {/* Chat bubbles */}
        {CHAT.map((msg, i) => {
          const show = progress > 0.4 + i * 0.15;
          const y = 168 + i * 28;
          return (
            <g key={msg} opacity={show ? 1 : 0}>
              <rect x="20" y={y} width={msg.length * 6 + 20} height="22" fill={palette.rose} fillOpacity="0.2" rx="4" />
              <text x="30" y={y + 15} fill={palette.ink} fontSize="9">
                {msg}
              </text>
            </g>
          );
        })}
        {/* Hand raise */}
        <text x="360" y="50" fontSize="18" opacity={progress > 0.6 ? 1 : 0}>
          ✋
        </text>
      </svg>
    </Scene2D>
  );
}
