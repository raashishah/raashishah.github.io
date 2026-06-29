type OgImageProps = {
  name: string;
  role: string;
  tagline: string;
  domain: string;
  bg: string;
  text: string;
};

export function OgImage({ name, role, tagline, domain, bg, text }: OgImageProps) {
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
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: 32,
        lineHeight: 1.45,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex" }}>{name}</div>
        <div style={{ display: "flex" }}>{role}</div>
        <div style={{ display: "flex" }}>{tagline}</div>
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
            fontSize: 28,
          }}
        >
          {domain}
        </div>
      </div>
    </div>
  );
}
