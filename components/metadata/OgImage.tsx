type OgImageProps = {
  name: string;
  role: string;
  tagline: string;
  domain: string;
  faviconSrc: string;
  bg: string;
  text: string;
  secondary: string;
  muted: string;
};

export function OgImage({
  name,
  role,
  tagline,
  domain,
  faviconSrc,
  bg,
  text,
  secondary,
  muted,
}: OgImageProps) {
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
        fontFamily: "Satoshi",
        fontWeight: 400,
        fontSize: 30,
        lineHeight: 1.47,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 640,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.022em",
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 400,
            lineHeight: 1.47,
            color: secondary,
          }}
        >
          {role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.35,
            letterSpacing: "-0.015em",
            marginTop: 4,
            maxWidth: "32ch",
          }}
        >
          {tagline}
        </div>
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
            alignItems: "center",
            gap: 12,
          }}
        >
          <img src={faviconSrc} width={22} height={22} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 400,
              color: muted,
            }}
          >
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}
