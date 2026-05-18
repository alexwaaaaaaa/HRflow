"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

type AttendanceStatus = "P" | "A" | "L" | "WO" | "H" | "LC";

interface DayStyle {
  bg: string;
  color: string;
  border?: string;
}

// ─── Static maps (no template-literal Tailwind) ───────────────────────────────

const STATUS_STYLE: Record<AttendanceStatus, DayStyle> = {
  P: { bg: "rgba(0,229,160,0.1)", color: "#00E5A0" },
  A: { bg: "rgba(255,68,68,0.1)", color: "#FF4444" },
  L: { bg: "rgba(0,102,255,0.1)", color: "#0066FF" },
  WO: { bg: "#1A2A3A", color: "#8899AA" },
  H: { bg: "rgba(255,184,0,0.1)", color: "#FFB800" },
  LC: { bg: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CalendarDayProps {
  date: number;
  status: AttendanceStatus;
}

function CalendarDay({ date, status }: CalendarDayProps) {
  const s = STATUS_STYLE[status];
  return (
    <div
      className="relative flex h-16 flex-col items-end rounded-lg p-1.5"
      style={{
        // inline-style: dynamic per-day color from data — cannot express as static Tailwind
        background: s.bg,
        border: s.border ?? "none",
      }}
    >
      <span className="text-xs font-semibold" style={{ color: s.color }}>
        {date}
      </span>
      <span className="mt-auto text-[10px] opacity-80" style={{ color: s.color }}>
        {status}
      </span>
      {status === "LC" && (
        <div className="absolute bottom-1.5 left-1.5 text-[10px] text-[#FFB800]">9:45 AM</div>
      )}
    </div>
  );
}

interface SummaryStatProps {
  value: string | number;
  label: string;
  color: string;
}

function SummaryStat({ value, label, color }: SummaryStatProps) {
  return (
    <div className="rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-4">
      <div className="mb-1 text-2xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-[11px] text-[#8899AA]">{label}</div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DAYS: { date: number; status: AttendanceStatus }[] = Array.from({ length: 30 }, (_, i) => ({
  date: i + 1,
  status: [6, 7, 13, 14, 20, 21, 27, 28].includes(i + 1)
    ? "WO"
    : [12].includes(i + 1)
      ? "H"
      : [8].includes(i + 1)
        ? "L"
        : [18].includes(i + 1)
          ? "A"
          : [3].includes(i + 1)
            ? "LC"
            : "P",
}));

const LOG_ROWS = [
  { date: "01 Nov (Fri)", in: "09:02 AM", out: "06:15 PM", hrs: "9h 13m", s: "P", c: "#00E5A0" },
  { date: "02 Nov (Sat)", in: "—", out: "—", hrs: "—", s: "WO", c: "#8899AA" },
  { date: "03 Nov (Sun)", in: "—", out: "—", hrs: "—", s: "WO", c: "#8899AA" },
  { date: "04 Nov (Mon)", in: "09:45 AM", out: "06:30 PM", hrs: "8h 45m", s: "Late", c: "#FFB800" },
  { date: "05 Nov (Tue)", in: "09:10 AM", out: "06:05 PM", hrs: "8h 55m", s: "P", c: "#00E5A0" },
] as const;

const SUMMARY_STATS: SummaryStatProps[] = [
  { value: 18, label: "Present Days", color: "#00E5A0" },
  { value: 1, label: "Absent Days", color: "#FF4444" },
  { value: 1, label: "Late Arrivals", color: "#FFB800" },
  { value: 8, label: "Weekends & Holidays", color: "#0066FF" },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AttendanceTab() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
      {/* Left */}
      <div>
        <Card padding="md" className="mb-4">
          <h3 className="mb-3 text-sm font-semibold text-white">Attendance Calendar — Nov 2024</h3>
          <div className="mb-3 grid grid-cols-7 gap-2">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="pb-2 text-center text-[11px] font-semibold text-[#445566]">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Offset: Nov starts on Friday (index 4) */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`offset-${i}`} className="h-16" />
            ))}
            {DAYS.map((day) => (
              <CalendarDay key={day.date} date={day.date} status={day.status} />
            ))}
          </div>
        </Card>

        <Card padding="md">
          <h3 className="mb-3 text-sm font-semibold text-white">Detailed Log</h3>
          <div className="mb-3 grid grid-cols-[1fr_100px_100px_100px_100px] border-b border-[#1A2A3A] pb-3 text-[11px] font-medium uppercase text-[#445566]">
            <span>Date</span>
            <span>First In</span>
            <span>Last Out</span>
            <span>Hrs Done</span>
            <span>Status</span>
          </div>
          {LOG_ROWS.map((row) => (
            <div
              key={row.date}
              className="grid grid-cols-[1fr_100px_100px_100px_100px] items-center border-b border-[#0A1420] py-3.5"
            >
              <span className="text-[13px] text-white">{row.date}</span>
              <span className="text-[13px] text-[#8899AA]">{row.in}</span>
              <span className="text-[13px] text-[#8899AA]">{row.out}</span>
              <span className="text-[13px] text-[#8899AA]">{row.hrs}</span>
              <span className="text-xs font-medium" style={{ color: row.c }}>
                {row.s}
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* Right */}
      <div>
        <Card padding="md" className="mb-4">
          <h3 className="mb-4 text-sm font-semibold text-white">November Summary</h3>
          <div className="mb-5 grid grid-cols-2 gap-3">
            {SUMMARY_STATS.map((s) => (
              <SummaryStat key={s.label} {...s} />
            ))}
          </div>
          <div className="border-t border-[#1A2A3A] pt-4">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-[#8899AA]">Average Working Hrs</span>
              <span className="font-semibold text-white">8h 54m / 9h</span>
            </div>
            <div className="mb-4 h-1.5 rounded bg-[#1A2A3A]">
              <div className="h-full w-[95%] rounded bg-[#00E5A0]" />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#8899AA]">Regularization Requests</span>
              <span className="font-semibold text-white">1 Pending</span>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="mb-3 text-sm font-semibold text-white">Shift Details</h3>
          <div className="rounded-[10px] border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.06)] p-3">
            <div className="mb-1 text-[13px] font-semibold text-white">General Shift (IST)</div>
            <div className="mb-2 text-xs text-[#8899AA]">09:00 AM – 06:00 PM (9 hours)</div>
            <div className="mb-3 text-xs text-[#445566]">Grace Period: 15 mins (Till 09:15 AM)</div>
            <Button variant="ghost" size="sm">
              Request Shift Change
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
