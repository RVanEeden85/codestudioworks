import { ImageResponse } from "next/og";
import { getSiteUrl } from "./_lib/siteUrl";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
    const siteUrl = getSiteUrl();
    const hostname = siteUrl.replace(/^https?:\/\//, "");

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: "linear-gradient(115deg, #080909 0%, #111413 58%, #252927 100%)",
                    color: "#eeece5",
                    fontSize: 54,
                    letterSpacing: "-2px",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div style={{ display: "flex", position: "absolute", right: 48, top: -80, height: 790, gap: 26, opacity: 0.52 }}>
                    <div style={{ display: "flex", width: 105, background: "linear-gradient(90deg,#242826,#767a75,#1a1d1c)", transform: "skewY(-8deg)" }} />
                    <div style={{ display: "flex", width: 155, background: "linear-gradient(90deg,#181b1a,#8a8d87,#212422)", transform: "skewY(7deg)" }} />
                    <div style={{ display: "flex", width: 76, background: "linear-gradient(90deg,#202321,#6f736e,#161918)", transform: "skewY(-4deg)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", position: "relative", width: 760 }}>
                    <div style={{ color: "#d7f45d", fontSize: 22, fontWeight: 800, letterSpacing: "4px" }}>FOUNDER-LED DEVELOPMENT</div>
                    <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 0.98, marginTop: 28 }}>Working digital products, built around the business.</div>
                    <div style={{ display: "flex", marginTop: 42, paddingTop: 22, borderTop: "1px solid rgba(238,236,229,.28)", fontSize: 26, letterSpacing: "0", opacity: 0.72 }}>
                        CodeStudioWorks&nbsp;&nbsp;·&nbsp;&nbsp;{hostname}
                    </div>
                </div>
            </div>
        ),
        size
    );
}
