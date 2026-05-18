"use client";

import Card from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PERF_HISTORY = [
  { fy: "FY21-22", rating: 3.5 },
  { fy: "FY22-23", rating: 4.0 },
  { fy: "FY23-24", rating: 4.2 },
  { fy: "FY24-25", rating: 0 },
];

const APPRAISAL_STEPS = [
  { label: "Goals Set", done: true },
  { label: "Mid-Year", done: true },
  { label: "Self Appraisal", done: false },
  { label: "Manager Review", done: false },
  { label: "Final", done: false },
] as const;

const FEEDBACK_SKILLS = [
  { skill: "Technical Skills", val: 4.5, color: "#00E5A0" },
  { skill: "Leadership", val: 3.8, color: "#0066FF" },
  { skill: "Communication", val: 4.2, color: "#FFB800" },
  { skill: "Teamwork", val: 4.0, color: "#00E5A0" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SkillBarProps {
  skill: string;
  val: number;
  color: string;
}

function SkillBar({ skill, val, color }: SkillBarProps) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-[#8899AA]">{skill}</span>
        <span style={{ color }}>{val}/5</span>
      </div>
      <div className="h-1 rounded bg-[#1A2A3A]">
        <div
          className="h-full rounded transition-[width] duration-500"
          style={{ width: `${(val / 5) * 100}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PerformanceTab() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      {/* Left */}
      <div>
        <Card padding="md" className="mb-4">
          <h3 className="mb-3 text-sm font-semibold text-white">
            FY 2024-25 Appraisal — In Progress
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {APPRAISAL_STEPS.map((step) => (
              <span
                key={step.label}
                className={`rounded px-2.5 py-1 text-xs ${
                  step.done
                    ? "bg-[rgba(0,229,160,0.1)] text-[#00E5A0]"
                    : "bg-[#1A2A3A] text-[#445566]"
                }`}
              >
                {step.label} {step.done ? "✅" : "○"}
              </span>
            ))}
          </div>
          <div className="mb-2 text-[13px] text-[#8899AA]">
            Goal Achievement YTD:{" "}
            <span className="font-semibold text-[#00E5A0]">73% (6/8 goals)</span>
          </div>
          <div className="h-1.5 rounded bg-[#1A2A3A]">
            <div className="h-full w-[73%] rounded bg-[#00E5A0]" />
          </div>
        </Card>

        <Card padding="md">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Performance Ratings — Last 4 Cycles
          </h3>
          <ClientOnly>
            <ChartWrapper height="h-[160px]">
              <BarChart data={PERF_HISTORY}>
                <XAxis
                  dataKey="fy"
                  tick={{ fill: "#445566", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 5]}
                  tick={{ fill: "#445566", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0D1928",
                    border: "1px solid #1A2A3A",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="rating" fill="#0066FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartWrapper>
          </ClientOnly>
        </Card>
      </div>

      {/* Right */}
      <div>
        <Card padding="md">
          <h3 className="mb-4 text-sm font-semibold text-white">360° Feedback Summary</h3>
          <div className="mb-4 text-center">
            <div className="text-[32px] font-bold text-white">
              4.1<span className="text-lg text-[#445566]">/5</span>
            </div>
            <div className="text-xs text-[#8899AA]">Overall 360 Score</div>
          </div>
          {FEEDBACK_SKILLS.map((s) => (
            <SkillBar key={s.skill} {...s} />
          ))}
          <div className="mt-3 rounded-[10px] bg-[#0A1420] p-3 text-xs text-[#8899AA]">
            Common themes:{" "}
            <span className="text-[#00E5A0]">Reliable</span> ·{" "}
            <span className="text-[#0066FF]">Technical</span> ·{" "}
            <span className="text-[#FFB800]">Proactive</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
