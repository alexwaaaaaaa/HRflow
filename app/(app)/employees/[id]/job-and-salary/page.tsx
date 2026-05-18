"use client";

import { Card } from "../shared";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from "@/components/ui/ChartWrapper";

const salaryHistory = [
  { date: "Jun'21", ctc: 1200000 },
  { date: "Oct'21", ctc: 1320000 },
  { date: "Oct'22", ctc: 1500000 },
  { date: "Oct'23", ctc: 1620000 },
  { date: "Oct'24", ctc: 1800000 },
];

export default function JobSalaryTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24 }}>
      <div>
        <Card title="Current CTC">
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 4 }}>ANNUAL CTC</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#FFFFFF" }}>₹18,00,000</div>
            <div style={{ fontSize: 13, color: "#445566", marginTop: 2 }}>
              Per annum • Effective: 01/10/2024
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 110px 80px",
              gap: 12,
              borderBottom: "1px solid #1A2A3A",
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            {["Component", "Monthly (₹)", "Annual (₹)", "% CTC"].map((h) => (
              <div
                key={h}
                style={{
                  fontSize: 10,
                  color: "#445566",
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
              >
                {h}
              </div>
            ))}
          </div>
          {[
            { name: "Basic Salary", m: "51,000", a: "6,12,000", p: "34%" },
            { name: "HRA", m: "25,500", a: "3,06,000", p: "17%" },
            { name: "Special Allowance", m: "35,667", a: "4,28,004", p: "24%" },
            { name: "Gross Total", m: "1,20,017", a: "14,40,204", p: "80%", bold: true },
            { name: "PF (Employee)", m: "-1,800", a: "-21,600", p: "1.2%", dim: true },
            { name: "Net Take-home", m: "≈1,09,717", a: "≈13,16,604", p: "—", green: true },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px 110px 80px",
                gap: 12,
                padding: "9px 0",
                borderBottom: "1px solid #0A1420",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: c.dim ? "#445566" : "#FFFFFF",
                  fontWeight: c.bold ? 600 : 400,
                }}
              >
                {c.name}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: c.green ? "#00E5A0" : c.dim ? "#445566" : "#FFFFFF",
                  fontWeight: c.bold ? 600 : 400,
                }}
              >
                ₹{c.m}
              </span>
              <span style={{ fontSize: 13, color: c.green ? "#00E5A0" : "#8899AA" }}>₹{c.a}</span>
              <span style={{ fontSize: 13, color: "#445566" }}>{c.p}</span>
            </div>
          ))}
        </Card>

        <Card title="Salary Growth — Full Tenure">
          <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 12 }}>
            Total growth:{" "}
            <span style={{ color: "#00E5A0", fontWeight: 600 }}>+50% in 3.5 years</span>
          </div>
          <ClientOnly>
            <ChartWrapper height="h-[180px]">
              <LineChart data={salaryHistory}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#445566", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#445566", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(v: unknown) => [`₹${((v as number) / 100000).toFixed(1)}L`, "CTC"]}
                  contentStyle={{
                    background: "#0D1928",
                    border: "1px solid #1A2A3A",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ctc"
                  stroke="#00E5A0"
                  strokeWidth={2.5}
                  dot={{ fill: "#00E5A0", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ChartWrapper>
          </ClientOnly>
        </Card>
      </div>
      <div>
        <Card title="Job History">
          {[
            {
              date: "Nov 2023",
              role: "Promoted: Senior Software Engineer",
              badge: "Promotion",
              color: "#00E5A0",
            },
            {
              date: "Jun 2021",
              role: "Joined as Software Engineer L3",
              badge: "Joining",
              color: "#0066FF",
            },
          ].map(({ date, role, badge, color }) => (
            <div
              key={date}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid #0A1420",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: color,
                  marginTop: 5,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 2 }}>{role}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#445566" }}>{date}</span>
                  <span
                    style={{
                      fontSize: 11,
                      background: `${color}15`,
                      color,
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Card>
        <Card title="AI Market Comparison">
          <div
            style={{
              padding: "14px 16px",
              background: "rgba(0,229,160,0.06)",
              border: "1px solid rgba(0,229,160,0.2)",
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 12, color: "#8899AA" }}>L3 SE, Bengaluru — 2024</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", margin: "4px 0 2px" }}>
              ₹18,00,000 CTC
            </div>
            <div style={{ fontSize: 12, color: "#00E5A0" }}>
              Top 30th — 7% above market median 💪
            </div>
          </div>
          {[
            { l: "P25 (₹13L)", w: "40%" },
            { l: "P50 (₹16.8L)", w: "65%" },
            { l: "P75 (₹21L)", w: "80%" },
            { l: "This employee", w: "73%", green: true },
          ].map(({ l, w, green }) => (
            <div key={l} style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#445566",
                  marginBottom: 4,
                }}
              >
                <span>{l}</span>
              </div>
              <div style={{ height: 4, background: "#1A2A3A", borderRadius: 4 }}>
                <div
                  style={{
                    width: w,
                    height: "100%",
                    background: green ? "#00E5A0" : "#1A2A3A",
                    borderRadius: 4,
                    border: green ? "none" : "1px solid #445566",
                  }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
