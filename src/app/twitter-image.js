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
                    background: "linear-gradient(135deg, #1b3a34, #142824)",
                    color: "#f7faf9",
                    fontSize: 54,
                    letterSpacing: "-0.02em",
                }}
            >
                <div style={{ fontSize: 74, fontWeight: 800 }}>
                    CodeStudioWorks
                </div>
                <div style={{ marginTop: 18, fontSize: 40, opacity: 0.95 }}>
                    Custom sites, software, and support
                </div>
                <div style={{ marginTop: 28, fontSize: 28, opacity: 0.85 }}>
                    {hostname}
                </div>
            </div>
        ),
        size
    );
}

