type OgImageProps = {
  eyebrow: string;
  title: string;
  description: string;
  domain: string;
  bg: string;
  panel: string;
  text: string;
  muted: string;
  accent: string;
};

export function OgImage({ eyebrow, title, description, domain, bg, panel, text, muted, accent }: OgImageProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: bg,
        color: text,
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage: `linear-gradient(135deg, ${bg} 0%, ${panel} 100%)`,
          opacity: 0.98,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: -160,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: 9999,
          border: `1px solid ${accent}`,
          opacity: 0.28,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: -220,
          left: -120,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background: accent,
          opacity: 0.1,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 72,
          bottom: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${muted}`,
          padding: "44px 48px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 30,
              color: muted,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: accent,
                display: "flex",
              }}
            />
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: muted }}>{domain}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 920 }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 0.94,
              letterSpacing: "-0.06em",
              fontWeight: 800,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: muted,
              maxWidth: 760,
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div
            style={{
              display: "flex",
              padding: "14px 18px",
              border: `1px solid ${accent}`,
              color: text,
              fontSize: 24,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Quiet stage, loud work
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <div style={{ display: "flex", fontSize: 24, color: muted }}>PM who builds</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 9999,
                    background: dot === 1 ? text : accent,
                    opacity: dot === 1 ? 1 : 0.55,
                    display: "flex",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
