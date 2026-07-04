import type { SchematicId } from "@/content/types";

const SVG_PROPS = {
  viewBox: "0 0 112 72",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: "home__schematic-svg",
} as const;

/** Score lines — ledger marks, not a data table. */
function AdmissionsAgentSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <line x1="24" y1="22" x2="72" y2="22" className="schematic__ink schematic__mark schematic__mark--1" />
      <line x1="24" y1="36" x2="58" y2="36" className="schematic__ink schematic__mark schematic__mark--2" />
      <line
        x1="24"
        y1="50"
        x2="84"
        y2="50"
        className="schematic__accent schematic__mark schematic__mark--3"
      />
      <circle cx="88" cy="50" r="2" className="schematic__accent-dot schematic__accent-dot--1" />
    </svg>
  );
}

/** Coral branch — propagation along a stem. */
function ExpressionSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <path
        d="M16 54 C24 38, 36 24, 52 20 C68 16, 82 22, 92 36"
        className="schematic__ink schematic__branch"
      />
      <circle cx="28" cy="42" r="3" className="schematic__bubble schematic__bubble--1" />
      <circle cx="44" cy="26" r="3" className="schematic__bubble schematic__bubble--2" />
      <circle cx="64" cy="22" r="3.5" className="schematic__bubble schematic__bubble--3 schematic__accent-fill" />
      <circle cx="84" cy="32" r="3" className="schematic__bubble schematic__bubble--4" />
    </svg>
  );
}

/** Wayfinding — broken path, marker still holds. */
function OfflineNavSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <path
        d="M18 48 L40 36 L58 40"
        className="schematic__ink schematic__path schematic__path--a"
      />
      <path
        d="M66 44 L88 28"
        className="schematic__ink schematic__path schematic__path--b"
      />
      <circle cx="40" cy="36" r="1.75" className="schematic__dot" />
      <circle cx="88" cy="28" r="1.75" className="schematic__dot" />
      <circle cx="58" cy="40" r="5" className="schematic__pulse-ring" />
      <circle cx="58" cy="40" r="3" className="schematic__accent schematic__you-marker" />
      <circle cx="58" cy="40" r="1.25" className="schematic__you-core" />
    </svg>
  );
}

/** Interlocking rings — systems in sync. */
function PlutoSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <circle cx="44" cy="32" r="14" className="schematic__ink schematic__ring schematic__ring--a" />
      <circle cx="68" cy="40" r="14" className="schematic__accent schematic__ring schematic__ring--b" />
      <circle cx="44" cy="32" r="3.5" className="schematic__ink schematic__ring-core" />
      <circle cx="68" cy="40" r="3.5" className="schematic__accent schematic__ring-core schematic__ring-core--b" />
    </svg>
  );
}

/** On-device pulse — no alert chrome. */
function OnDeviceSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <circle cx="56" cy="36" r="14" className="schematic__ink schematic__halo" />
      <circle cx="56" cy="36" r="10" className="schematic__pulse-ring" />
      <circle cx="56" cy="36" r="5" className="schematic__accent schematic__you-marker" />
      <circle cx="56" cy="36" r="2" className="schematic__you-core" />
    </svg>
  );
}

/** Satellite field + orbit. */
function KawaSpaceSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="26" y="18" width="6" height="5" rx="0.5" className="schematic__tile" />
      <rect x="40" y="16" width="6" height="5" rx="0.5" className="schematic__tile" />
      <rect x="54" y="20" width="6" height="5" rx="0.5" className="schematic__tile" />
      <rect
        x="68"
        y="14"
        width="8"
        height="6"
        rx="0.5"
        className="schematic__tile schematic__tile--accent"
      />
      <ellipse
        cx="56"
        cy="54"
        rx="24"
        ry="9"
        className="schematic__orbit schematic__orbit--draw"
      />
      <circle cx="36" cy="54" r="2" className="schematic__dot schematic__satellite--1" />
      <circle cx="76" cy="54" r="2" className="schematic__dot schematic__satellite--2" />
    </svg>
  );
}

/** Kanban columns — one card crossing. */
function AulaEducationSchematic() {
  return (
    <svg {...SVG_PROPS}>
      <line x1="36" y1="14" x2="36" y2="58" className="schematic__ink" />
      <line x1="56" y1="14" x2="56" y2="58" className="schematic__ink" />
      <line x1="76" y1="14" x2="76" y2="58" className="schematic__ink" />
      <rect x="22" y="28" width="16" height="5" rx="1.5" className="schematic__card schematic__card--static" />
      <rect x="22" y="40" width="12" height="5" rx="1.5" className="schematic__card schematic__card--static" />
      <rect x="44" y="34" width="14" height="5" rx="1.5" className="schematic__card schematic__card--static" />
      <rect x="66" y="28" width="12" height="5" rx="1.5" className="schematic__card schematic__card--done" />
      <rect
        x="22"
        y="28"
        width="16"
        height="5"
        rx="1.5"
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
    <figure
      className={`home__schematic home__schematic--${schematicId}`}
      aria-hidden="true"
    >
      {renderSchematic(schematicId)}
    </figure>
  );
}
