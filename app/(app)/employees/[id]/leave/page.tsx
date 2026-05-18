"use client";

import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LeaveBalanceCardProps {
  type: string;
  used: number;
  total: number;
  color: string;
}

function LeaveBalanceCard({ type, used, total, color }: LeaveBalanceCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border p-4 text-center"
      style={{
        // inline-style: dynamic per-leave-type color — cannot express as static Tailwind
        background: "#0A1420",
        borderColor: `${color}40`,
      }}
    >
      <div className="mb-2 text-[11px] text-[#8899AA]">{type}</div>
      <div className="text-[28px] font-bold text-white">
        {total - used}
        <span className="text-sm font-medium text-[#445566]"> / {total}</span>
      </div>
      <div className="mt-1 text-[11px] text-[#445566]">Available</div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A2A3A]">
        <div
          className="h-full"
          style={{
            // inline-style: dynamic width from data
            width: `${(used / total) * 100}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEAVE_BALANCES = [
  { type: "Privilege Leave (PL)", used: 8, total: 15, color: "#00E5A0" },
  { type: "Sick Leave (SL)", used: 2, total: 7, color: "#0066FF" },
  { type: "Casual Leave (CL)", used: 5, total: 7, color: "#FFB800" },
] as const;

const LEAVE_HISTORY = [
  { type: "PL", dates: "12 Oct - 14 Oct", reason: "Family trip to Goa", duration: "3 Days", status: "Approved" },
  { type: "SL", dates: "05 Sep", reason: "Viral fever", duration: "1 Day", status: "Approved" },
  { type: "CL", dates: "15 Aug", reason: "Personal work", duration: "1 Day", status: "Approved" },
  { type: "CL", dates: "20 Jul", reason: "Bank visit", duration: "0.5 (First Half)", status: "Approved" },
] as const;

const UPCOMING_HOLIDAYS = [
  { date: "25 Dec 2024", name: "Christmas Day", day: "Wednesday" },
  { date: "01 Jan 2025", name: "New Year's Day", day: "Wednesday" },
  { date: "26 Jan 2025", name: "Republic Day", day: "Sunday" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeaveTab() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
      {/* Left */}
      <div>
        <Card padding="md" className="mb-4">
          <h3 className="mb-4 text-sm font-semibold text-white">Leave Balances (2024)</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {LEAVE_BALANCES.map((b) => (
              <LeaveBalanceCard key={b.type} {...b} />
            ))}
          </div>
        </Card>

        <Card padding="md">
          <h3 className="mb-3 text-sm font-semibold text-white">Leave History</h3>
          <div className="mb-3 grid grid-cols-[100px_100px_1fr_100px_100px] border-b border-[#1A2A3A] pb-3 text-[11px] font-medium uppercase text-[#445566]">
            <span>Type</span>
            <span>Dates</span>
            <span>Reason</span>
            <span>Duration</span>
            <span>Status</span>
          </div>
          {LEAVE_HISTORY.map((row) => (
            <div
              key={`${row.type}-${row.dates}`}
              className="grid grid-cols-[100px_100px_1fr_100px_100px] items-center border-b border-[#0A1420] py-3.5"
            >
              <span className="text-[13px] font-semibold text-white">{row.type}</span>
              <span className="text-[13px] text-[#8899AA]">{row.dates}</span>
              <span className="text-[13px] text-[#8899AA]">{row.reason}</span>
              <span className="text-[13px] text-[#8899AA]">{row.duration}</span>
              <Badge variant="success">{row.status}</Badge>
            </div>
          ))}
        </Card>
      </div>

      {/* Right */}
      <div>
        <Card padding="md">
          <h3 className="mb-3 text-sm font-semibold text-white">Upcoming Holidays</h3>
          {UPCOMING_HOLIDAYS.map((h, i) => (
            <div
              key={h.date}
              className={`flex items-center gap-4 py-3 ${i < UPCOMING_HOLIDAYS.length - 1 ? "border-b border-[#0A1420]" : ""}`}
            >
              <div className="min-w-[60px] rounded-lg bg-[rgba(0,102,255,0.1)] px-3 py-2 text-center text-[#0066FF]">
                <div className="text-base font-bold">{h.date.split(" ")[0]}</div>
                <div className="text-[10px] uppercase">{h.date.split(" ")[1]}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-white">{h.name}</div>
                <div className="mt-0.5 text-xs text-[#8899AA]">{h.day}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
