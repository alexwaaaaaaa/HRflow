"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const EVENTS = [
  { date: "2025-04-01", label: "Goal Setting Opens", color: "#00E5A0", type: "milestone" },
  { date: "2025-04-15", label: "Goal Setting Deadline", color: "#FFB800", type: "deadline" },
  { date: "2025-10-01", label: "Mid-Year Review Opens", color: "#00E5A0", type: "milestone" },
  { date: "2025-10-15", label: "Mid-Year Review Deadline", color: "#FFB800", type: "deadline" },
  { date: "2026-01-01", label: "Self Appraisal Opens", color: "#00E5A0", type: "milestone" },
  { date: "2026-01-15", label: "Self Appraisal Deadline", color: "#FFB800", type: "deadline" },
  { date: "2026-01-16", label: "Manager Review Opens", color: "#0066FF", type: "milestone" },
  { date: "2026-01-31", label: "Manager Review Deadline", color: "#FFB800", type: "deadline" },
  { date: "2026-02-01", label: "Calibration Session", color: "#9B59B6", type: "event" },
  { date: "2026-02-11", label: "Final Ratings Published", color: "#00E5A0", type: "milestone" },
  { date: "2026-04-01", label: "Increment Effective", color: "#00E5A0", type: "milestone" },
];

const EVENT_TYPE_VARIANT = {
  milestone: "success",
  deadline: "warning",
  event: "purple",
} as const;

export default function PMSCalendar() {
  const [year, setYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const eventsInYear = EVENTS.filter((e) => e.date.startsWith(year.toString()));
  const eventsInMonth =
    selectedMonth !== null
      ? eventsInYear.filter((e) => parseInt(e.date.split("-")[1]) === selectedMonth + 1)
      : eventsInYear;

  return (
    <Page
      title="PMS Calendar"
      subtitle="Performance cycle milestones and deadlines"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Calendar" },
      ]}
      maxWidth="1100px"
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<ChevronLeft size={16} aria-hidden="true" />}
            aria-label="Previous year"
            onClick={() => setYear((y) => y - 1)}
          />
          <span className="text-lg font-bold text-white w-16 text-center">{year}</span>
          <Button
            variant="secondary"
            size="sm"
            icon={<ChevronRight size={16} aria-hidden="true" />}
            aria-label="Next year"
            onClick={() => setYear((y) => y + 1)}
          />
        </div>
      }
    >
      {/* Month grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        {MONTHS.map((m, i) => {
          const evts = eventsInYear.filter((e) => parseInt(e.date.split("-")[1]) === i + 1);
          return (
            <button
              key={m}
              onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
              aria-pressed={selectedMonth === i}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedMonth === i
                  ? "border-[#0066FF]/50 bg-[#0066FF]/10"
                  : "border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A]"
              }`}
            >
              <p className="text-sm font-semibold text-white mb-2">{m}</p>
              <div className="flex flex-wrap gap-1">
                {evts.map((e, ei) => (
                  <span key={ei} className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                ))}
                {evts.length === 0 && <span className="text-[10px] text-[#445566]">—</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Events list */}
      <Card padding="none">
        <div className="px-5 py-3 border-b border-[#1A2A3A] flex items-center gap-2">
          <Calendar size={14} className="text-[#8899AA]" aria-hidden="true" />
          <span className="text-sm font-semibold text-white">
            {selectedMonth !== null ? `${MONTHS[selectedMonth]} ${year}` : `All events — ${year}`}
          </span>
          <span className="ml-auto text-xs text-[#445566]">{eventsInMonth.length} events</span>
        </div>
        <div className="divide-y divide-[#0A1420]">
          {eventsInMonth.length === 0 && (
            <div className="p-6 text-center text-[#445566] text-sm">No events in this period</div>
          )}
          {eventsInMonth.map((evt) => (
            <div key={evt.date + evt.label} className="flex items-center gap-4 px-5 py-4">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: evt.color }} />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{evt.label}</p>
                <p className="text-[11px] text-[#445566]">
                  {new Date(evt.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Badge variant={EVENT_TYPE_VARIANT[evt.type as keyof typeof EVENT_TYPE_VARIANT]}>
                {evt.type}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                icon={<Bell size={13} aria-hidden="true" />}
                aria-label={`Set reminder for ${evt.label}`}
              />
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
}
