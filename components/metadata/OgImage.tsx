type OgImageProps = {
  name: string;
  tagline: string;
  domain: string;
  bg: string;
  text: string;
  muted: string;
};

export function OgImage({ name, tagline, domain, bg, text, muted }: OgImageProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: bg,
        color: text,
        padding: "72px 80px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 1.45,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex" }}>{name}</div>
        <div style={{ display: "flex", color: muted, fontWeight: 400 }}>{tagline}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            height: 1,
            width: "100%",
            background: text,
            opacity: 0.12,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: muted,
            fontSize: 26,
            fontWeight: 400,
          }}
        >
          {domain}
        </div>
      </div>
    </div>
  );
}
