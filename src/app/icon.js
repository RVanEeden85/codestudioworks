import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #142824, #1b3a34)",
                    color: "#f7faf9",
                    fontSize: 170,
                    fontWeight: 900,
                }}
            >
                CSW
            </div>
        ),
        size
    );
}

