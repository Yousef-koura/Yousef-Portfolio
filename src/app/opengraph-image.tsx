import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteUrl } from "@/content/site";

/* Social-share card (og:image + twitter:image via the file convention —
   this route's output overrides any images[] set in metadata config).
   Rendered at build time from the site's own identity assets: the existing
   light-on-dark wordmark and the approved Obsidian/Champagne tokens from
   globals.css. No new visual identity is introduced here.
   The host line derives from NEXT_PUBLIC_SITE_URL at build time, so a
   custom domain re-renders the card on the next deploy automatically. */

export const alt = "Yousef Koura — Machine Learning Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const wordmark = await readFile(join(process.cwd(), "public", "logo-wordmark.png"));
const wordmarkSrc = `data:image/png;base64,${Buffer.from(wordmark).toString("base64")}`;

const host = siteUrl.replace(/^https?:\/\//, "");

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0C0E",
          color: "#F3F0E8",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={wordmarkSrc} width={520} height={84} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#C9A86A",
              fontSize: 26,
              letterSpacing: 6,
            }}
          >
            <span style={{ width: 10, height: 10, background: "#C9A86A" }} />
            MACHINE LEARNING ENGINEER
          </div>
          <div style={{ marginTop: 24, fontSize: 44, lineHeight: 1.2 }}>
            Computer vision · Applied AI · End-to-end data engineering
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2A2C30",
            paddingTop: 28,
            color: "#A9A9A3",
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          <span>MENOUFIA, EGYPT</span>
          <span>{host.toUpperCase()}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
