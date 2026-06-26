"use client";

import { palette } from "@/lib/palette";
import { lerp } from "@/lib/scene-progress";
import { Scene2D } from "@/components/scenes/Scene2D";

type KotakSceneProps = {
  progress: number;
};

export function KotakScene({ progress }: KotakSceneProps) {
  const swipe = Math.min(1, progress * 1.5);
  const ringPulse = 0.5 + Math.sin(progress * Math.PI * 4) * 0.15;
  const confirm = progress > 0.75;

  return (
    <Scene2D className="scene-kotak">
      <svg viewBox="0 0 360 280" className="scene-kotak__svg" role="img" aria-label="Consumer trading app">
        <rect width="360" height="280" fill={palette.base} />
        {/* Ticker */}
        <rect x="0" y="0" width="360" height="32" fill={palette.ink} />
        <text x="16" y="21" fill={palette.base} fontSize="11" fontWeight="700">
          NIFTY
        </text>
        <text x="70" y="21" fill={palette.rose} fontSize="11">
          24,891.35 +1.2%
        </text>
        <text x="200" y="21" fill={palette.base} fontSize="11">
          RELIANCE
        </text>
        <text x="280" y="21" fill={palette.greyBlue} fontSize="11">
          2,945.00
        </text>
        {/* Swipeable card */}
        <g transform={`translate(${lerp(0, -80, swipe)}, 0)`}>
          <rect x="40" y="52" width="280" height="140" fill={palette.base} stroke={palette.ink} strokeWidth="2" rx="8" />
          <text x="56" y="80" fill={palette.ink} fontSize="14" fontWeight="700">
            Buy HDFC Bank
          </text>
          <text x="56" y="102" fill={palette.greyBlue} fontSize="11">
            Market · NSE
          </text>
          <text x="56" y="140" fill={palette.ink} fontSize="22" fontWeight="800">
            ₹1,642.50
          </text>
          <rect x="56" y="160" width="120" height="24" fill={palette.rose} fillOpacity="0.25" rx="4" />
          <text x="116" y="176" fill={palette.ink} fontSize="10" textAnchor="middle">
            SWIPE TO BUY
          </text>
        </g>
        {/* Portfolio ring */}
        <circle
          cx="300"
          cy="220"
          r={40 * ringPulse}
          fill="none"
          stroke={palette.rose}
          strokeWidth="6"
          strokeDasharray={`${lerp(0, 180, progress)} 251`}
        />
        <text x="300" y="224" fill={palette.ink} fontSize="10" textAnchor="middle" fontWeight="700">
          P&L
        </text>
        {confirm && (
          <g>
            <rect x="100" y="200" width="160" height="36" fill={palette.ink} rx="4" />
            <text x="180" y="222" fill={palette.base} fontSize="11" textAnchor="middle" fontWeight="700">
              Order placed ✓
            </text>
          </g>
        )}
      </svg>
    </Scene2D>
  );
}
