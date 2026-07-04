import type { SchematicId } from "@/content/types";

const SVG_PROPS = {
  viewBox: "0 0 112 72",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: "home__schematic-svg",
} as const;

function AdmissionsAgentSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <rect
        x="8"
        y="10"
        width="96"
        height="52"
        rx="2"
        className="schematic__frame"
      />
      <rect
        x="8"
        y="10"
        width="96"
        height="14"
        className="schematic__accent-fill schematic__row-highlight"
      />
      <line x1="8" y1="24" x2="104" y2="24" className="schematic__ink" />
      <line x1="28" y1="10" x2="28" y2="62" className="schematic__ink" />
      <line x1="52" y1="10" x2="52" y2="62" className="schematic__ink" />
      <line x1="8" y1="36" x2="104" y2="36" className="schematic__ink schematic__row schematic__row--2" />
      <line x1="8" y1="48" x2="104" y2="48" className="schematic__ink schematic__row schematic__row--3" />
      <line x1="8" y1="60" x2="104" y2="60" className="schematic__ink schematic__row schematic__row--4" />
      <text x="14" y="21" className="schematic__label schematic__row schematic__row--1">
        #1
      </text>
      <text x="34" y="21" className="schematic__label schematic__row schematic__row--1">
        88
      </text>
      <text x="56" y="21" className="schematic__label schematic__accent-text schematic__row schematic__row--1">
        offer sent
      </text>
      <path
        d="M92 17 L96 21 L92 25"
        className="schematic__accent schematic__check"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="14" y="33" className="schematic__label schematic__row schematic__row--2">
        #2
      </text>
      <text x="34" y="33" className="schematic__label schematic__row schematic__row--2">
        82
      </text>
      <text x="56" y="33" className="schematic__label schematic__row schematic__row--2">
        accepted
      </text>
      <text x="14" y="45" className="schematic__label schematic__row schematic__row--3">
        #3
      </text>
      <text x="34" y="45" className="schematic__label schematic__row schematic__row--3">
        79
      </text>
      <text x="56" y="45" className="schematic__label schematic__row schematic__row--3">
        committee
      </text>
      <text x="14" y="57" className="schematic__label schematic__row schematic__row--4">
        #4
      </text>
      <text x="34" y="57" className="schematic__label schematic__row schematic__row--4">
        76
      </text>
      <text x="56" y="57" className="schematic__label schematic__row schematic__row--4">
        review
      </text>
    </svg>
  );
}

function ExpressionSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <path
        d="M18 58 C22 42, 30 28, 42 22 C54 16, 68 18, 78 28 C84 34, 88 42, 90 52"
        className="schematic__ink schematic__branch"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="38" r="4" className="schematic__bubble schematic__bubble--1" />
      <circle cx="38" cy="26" r="4" className="schematic__bubble schematic__bubble--2" />
      <circle cx="58" cy="22" r="4" className="schematic__bubble schematic__bubble--3" />
      <circle cx="76" cy="32" r="4" className="schematic__bubble schematic__bubble--4" />
    </svg>
  );
}

function OfflineNavSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="16" y="12" width="80" height="48" rx="2" className="schematic__frame" />
      <circle cx="32" cy="24" r="2.5" className="schematic__dot" />
      <circle cx="80" cy="24" r="2.5" className="schematic__dot" />
      <circle cx="56" cy="36" r="2.5" className="schematic__dot" />
      <circle cx="28" cy="48" r="2.5" className="schematic__dot" />
      <circle cx="72" cy="48" r="2.5" className="schematic__dot" />
      <circle cx="48" cy="52" r="2.5" className="schematic__dot" />
      <circle cx="84" cy="40" r="2.5" className="schematic__dot" />
      <circle cx="56" cy="36" r="6" className="schematic__pulse-ring" />
      <circle cx="56" cy="36" r="3.5" className="schematic__accent schematic__you-marker" />
      <circle cx="56" cy="36" r="1.5" className="schematic__you-core" />
    </svg>
  );
}

function PlutoSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <g className="schematic__cog schematic__cog--tl">
        <circle cx="38" cy="22" r="10" className="schematic__ink" strokeWidth="2" />
        <circle cx="38" cy="22" r="3" className="schematic__ink" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={38 + Math.cos((angle * Math.PI) / 180) * 7}
            y1={22 + Math.sin((angle * Math.PI) / 180) * 7}
            x2={38 + Math.cos((angle * Math.PI) / 180) * 12}
            y2={22 + Math.sin((angle * Math.PI) / 180) * 12}
            className="schematic__ink"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g className="schematic__cog schematic__cog--center">
        <circle cx="56" cy="36" r="12" className="schematic__accent" strokeWidth="2" />
        <circle cx="56" cy="36" r="4" className="schematic__accent" strokeWidth="2" />
        {[0, 72, 144, 216, 288].map((angle) => (
          <line
            key={angle}
            x1={56 + Math.cos((angle * Math.PI) / 180) * 8}
            y1={36 + Math.sin((angle * Math.PI) / 180) * 8}
            x2={56 + Math.cos((angle * Math.PI) / 180) * 15}
            y2={36 + Math.sin((angle * Math.PI) / 180) * 15}
            className="schematic__accent"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g className="schematic__cog schematic__cog--tr">
        <circle cx="74" cy="22" r="10" className="schematic__ink" strokeWidth="2" />
        <circle cx="74" cy="22" r="3" className="schematic__ink" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={74 + Math.cos((angle * Math.PI) / 180) * 7}
            y1={22 + Math.sin((angle * Math.PI) / 180) * 7}
            x2={74 + Math.cos((angle * Math.PI) / 180) * 12}
            y2={22 + Math.sin((angle * Math.PI) / 180) * 12}
            className="schematic__ink"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g className="schematic__cog schematic__cog--bl">
        <circle cx="38" cy="50" r="10" className="schematic__ink" strokeWidth="2" />
        <circle cx="38" cy="50" r="3" className="schematic__ink" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={38 + Math.cos((angle * Math.PI) / 180) * 7}
            y1={50 + Math.sin((angle * Math.PI) / 180) * 7}
            x2={38 + Math.cos((angle * Math.PI) / 180) * 12}
            y2={50 + Math.sin((angle * Math.PI) / 180) * 12}
            className="schematic__ink"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g className="schematic__cog schematic__cog--br">
        <circle cx="74" cy="50" r="10" className="schematic__ink" strokeWidth="2" />
        <circle cx="74" cy="50" r="3" className="schematic__ink" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={74 + Math.cos((angle * Math.PI) / 180) * 7}
            y1={50 + Math.sin((angle * Math.PI) / 180) * 7}
            x2={74 + Math.cos((angle * Math.PI) / 180) * 12}
            y2={50 + Math.sin((angle * Math.PI) / 180) * 12}
            className="schematic__ink"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}

function OnDeviceSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="20" y="14" width="72" height="44" rx="3" className="schematic__frame" />
      <text x="28" y="32" className="schematic__label schematic__alert-icon">
        !
      </text>
      <text x="40" y="32" className="schematic__label schematic__accent-text schematic__alert-text">
        68 mg/dL
      </text>
      <path
        d="M28 46 L32 50 L40 42"
        className="schematic__ink schematic__meds-check"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="46" y="50" className="schematic__label schematic__meds-text">
        meds 8pm
      </text>
      <text x="56" y="64" className="schematic__caption">
        on device
      </text>
    </svg>
  );
}

function KawaSpaceSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="12" y="8" width="88" height="36" rx="2" className="schematic__frame" />
      <rect x="22" y="16" width="8" height="6" className="schematic__roof" />
      <rect x="72" y="14" width="8" height="6" className="schematic__roof" />
      <rect x="18" y="30" width="7" height="5" className="schematic__roof" />
      <rect
        x="44"
        y="18"
        width="22"
        height="14"
        className="schematic__accent schematic__bbox"
        strokeWidth="2"
      />
      <rect x="48" y="22" width="14" height="6" className="schematic__roof schematic__roof--target" />
      <line x1="12" y1="48" x2="100" y2="48" className="schematic__ink" />
      <text x="16" y="58" className="schematic__caption schematic__chat-q">
        raining on Redchurch St?
      </text>
      <text x="16" y="68" className="schematic__caption schematic__accent-text schematic__chat-a">
        yes
      </text>
    </svg>
  );
}

function AulaEducationSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="10" y="10" width="92" height="52" rx="2" className="schematic__frame" />
      <line x1="42" y1="10" x2="42" y2="62" className="schematic__ink" />
      <line x1="74" y1="10" x2="74" y2="62" className="schematic__ink" />
      <line x1="10" y1="26" x2="102" y2="26" className="schematic__ink" />
      <text x="16" y="22" className="schematic__caption">
        to do
      </text>
      <text x="48" y="22" className="schematic__caption">
        doing
      </text>
      <text x="80" y="22" className="schematic__caption">
        done
      </text>
      <rect x="16" y="34" width="18" height="8" rx="1" className="schematic__card schematic__card--static" />
      <rect x="16" y="46" width="14" height="8" rx="1" className="schematic__card schematic__card--static" />
      <rect x="48" y="40" width="16" height="8" rx="1" className="schematic__card schematic__card--static" />
      <rect x="80" y="34" width="14" height="8" rx="1" className="schematic__card schematic__card--done" />
      <rect x="80" y="46" width="12" height="8" rx="1" className="schematic__card schematic__card--done" />
      <rect
        x="16"
        y="34"
        width="18"
        height="8"
        rx="1"
        className="schematic__card schematic__card--moving"
      />
    </svg>
  );
}

function renderSchematic(id: SchematicId) {
  switch (id) {
    case "admissions-agent":
      return <AdmissionsAgentSchematic />;
    case "expression":
      return <ExpressionSchematic />;
    case "offline-expo-nav":
      return <OfflineNavSchematic />;
    case "pluto":
      return <PlutoSchematic />;
    case "ondevice":
      return <OnDeviceSchematic />;
    case "kawa-space":
      return <KawaSpaceSchematic />;
    case "aula-education":
      return <AulaEducationSchematic />;
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

type AccordionSchematicProps = {
  schematicId: SchematicId;
};

export function AccordionSchematic({ schematicId }: AccordionSchematicProps) {
  return (
    <div
      className={`home__schematic home__schematic--${schematicId}`}
      aria-hidden="true"
    >
      {renderSchematic(schematicId)}
    </div>
  );
}
