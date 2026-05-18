"use client";

import { BarChart, Bar } from 'recharts';
import ClientOnly from "@/components/ui/ClientOnly";

const barData = [
    { v: 60 },
    { v: 80 },
    { v: 100 },
];

// Fixed dimensions for the decorative micro-chart inside the floating "Employees"
// card. Using explicit width/height avoids Recharts' `ResponsiveContainer`
// measurement race (the parent div isn't laid out yet when the container
// queries its rect, which produced the width(-1)/height(-1) console warning).
const MINI_CHART_WIDTH = 200;
const MINI_CHART_HEIGHT = 40;

export default function AuthRightPanel() {
    return (
        <div
            className="relative flex-1 flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at center, #0D1928 0%, #060B14 100%)",
                minWidth: 0,
            }}
        >
            {/* Large decorative circle */}
            <div
                className="absolute"
                style={{
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,229,160,0.05)",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                }}
            />
            <div
                className="absolute"
                style={{
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,229,160,0.03)",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                }}
            />

            {/* Floating Card 1 — top left */}
            <div
                className="animate-float absolute"
                style={{ top: "15%", left: "8%" }}
            >
                <div
                    style={{
                        background: "#0D1928",
                        border: "1px solid #1A2A3A",
                        borderRadius: 16,
                        padding: "16px 20px",
                        minWidth: 200,
                    }}
                >
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>
                        👥 2,847 Employees
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 12 }}>
                        Active this month
                    </div>
                    <div style={{ width: MINI_CHART_WIDTH, height: MINI_CHART_HEIGHT }}>
                        <ClientOnly fallback={<div style={{ width: MINI_CHART_WIDTH, height: MINI_CHART_HEIGHT }} aria-hidden="true" />}>
                            <BarChart
                                width={MINI_CHART_WIDTH}
                                height={MINI_CHART_HEIGHT}
                                data={barData}
                                barCategoryGap={4}
                            >
                                <Bar dataKey="v" fill="#00E5A0" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ClientOnly>
                    </div>
                </div>
            </div>

            {/* Floating Card 2 — center */}
            <div className="animate-float-1" style={{ position: "relative", zIndex: 1 }}>
                <div
                    style={{
                        background: "#0D1928",
                        border: "1px solid #00E5A0",
                        borderRadius: 16,
                        padding: "16px 20px",
                        minWidth: 240,
                    }}
                >
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0", marginBottom: 4 }}>
                        ✅ Payroll Processed
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>
                        ₹4.2 Cr disbursed
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>November 2024</div>
                </div>
            </div>

            {/* Floating Card 3 — bottom right */}
            <div
                className="animate-float-2 absolute"
                style={{ bottom: "18%", right: "8%" }}
            >
                <div
                    style={{
                        background: "#0D1928",
                        border: "1px solid #1A2A3A",
                        borderRadius: 16,
                        padding: "16px 20px",
                        minWidth: 200,
                    }}
                >
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>
                        🛡️ 100% Compliant
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 10 }}>
                        PF, ESI, PT all filed
                    </div>
                    <span
                        style={{
                            display: "inline-block",
                            background: "rgba(0,229,160,0.15)",
                            color: "#00E5A0",
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 500,
                        }}
                    >
                        On Time
                    </span>
                </div>
            </div>

            {/* Bottom tagline */}
            <p
                className="absolute"
                style={{ bottom: 32, fontSize: 14, color: "#8899AA", textAlign: "center" }}
            >
                Trusted by 500+ companies across India
            </p>
        </div>
    );
}
