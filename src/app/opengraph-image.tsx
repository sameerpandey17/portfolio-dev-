import { ImageResponse } from "next/og";

export const alt = "Sameer Pandey | Python Backend · AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          color: "#EDEDED",
          padding: "80px",
          fontFamily: "sans-serif",
          border: "16px solid #141414",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, letterSpacing: "0.08em", color: "#6B6B6B", fontFamily: "monospace" }}>
            SAMEER PANDEY // B.E. AI & DS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "#111111",
              color: "#3DDC84",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontFamily: "monospace",
            }}
          >
            ● OPEN TO INTERNSHIPS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Sameer Pandey
          </div>
          <div style={{ fontSize: 32, color: "#9A9A9A", fontWeight: 400 }}>
            Python Backend · AI · Pune, India
          </div>
          <div style={{ fontSize: 20, color: "#6B6B6B", maxWidth: "800px", lineHeight: 1.4 }}>
            Architecting distributed backends, WebSocket pipelines, and fault-tolerant agent systems for real-time AI products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
            fontSize: 18,
            color: "#6B6B6B",
            fontFamily: "monospace",
          }}
        >
          <div>VisionLink · AIVOA · CaloRupee · NutriSync</div>
          <div>github.com/sameerpandey17</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
