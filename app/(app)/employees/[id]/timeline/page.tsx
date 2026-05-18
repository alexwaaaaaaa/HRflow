"use client";

import Card from "@/components/ui/Card";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEvent {
  dot: string;
  type: string;
  date: string;
  title: string;
  detail: string;
  by: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface EventCardProps {
  event: TimelineEvent;
  isLast: boolean;
}

function EventCard({ event, isLast }: EventCardProps) {
  return (
    <div className="relative flex gap-4 pb-6">
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-[5px] top-4 bottom-0 w-0.5 bg-[#1A2A3A]"
        />
      )}
      <div
        aria-hidden="true"
        className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full"
        style={{ background: event.dot }}
      />
      <div className="flex-1 rounded-xl border border-[#1A2A3A] bg-[#0D1928] px-4 py-3.5 hover:border-[#445566]">
        <div className="mb-1.5 flex items-start justify-between">
          <span
            className="rounded px-2 py-0.5 text-[11px] font-semibold"
            style={{
              // inline-style: dynamic per-event-type color
              background: `${event.dot}15`,
              color: event.dot,
            }}
          >
            {event.type}
          </span>
          <span className="text-xs text-[#445566]">{event.date}</span>
        </div>
        <div className="mb-1 text-sm font-semibold text-white">{event.title}</div>
        <div className="text-[13px] text-[#8899AA]">{event.detail}</div>
        <div className="mt-1.5 text-[11px] text-[#445566]">By: {event.by}</div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EVENTS: TimelineEvent[] = [
  { dot: "#00E5A0", type: "Salary", date: "Oct 2024", title: "Salary Revision: +11.1%", detail: "₹16,20,000 → ₹18,00,000. Annual appraisal increment.", by: "HR Admin Priya" },
  { dot: "#0066FF", type: "Job Change", date: "Jun 2024", title: "Manager Changed", detail: "Anil Kumar → Karan Mehta. Engineering team restructured.", by: "Super Admin" },
  { dot: "#FFB800", type: "Performance", date: "Mar 2024", title: "Annual Appraisal: 4.2/5", detail: "Top performer band. Recommended for promotion.", by: "Karan Mehta" },
  { dot: "#00E5A0", type: "Salary", date: "Oct 2023", title: "Salary Revision: +8%", detail: "Annual increment. Effective 01/10/2023.", by: "HR Admin Priya" },
  { dot: "#0066FF", type: "Employment", date: "Dec 2021", title: "Probation Confirmed", detail: "6-month probation cleared successfully.", by: "HR Admin" },
  { dot: "#00E5A0", type: "Employment", date: "Jun 2021", title: "Joined: Software Engineer L3", detail: "Employee onboarded. Offer accepted. Documents verified.", by: "HR System" },
];

const FILTER_OPTIONS = [
  "All Events",
  "Employment Changes",
  "Salary Changes",
  "Leave Events",
  "Performance",
  "Compliance",
  "Disciplinary",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TimelineTab() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
      {/* Filter sidebar */}
      <Card padding="md">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.05em] text-[#8899AA]">
          Filter Events
        </div>
        {FILTER_OPTIONS.map((f) => (
          <label key={f} className="mb-2.5 flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#00E5A0]"
              aria-label={f}
            />
            <span className="text-[13px] text-[#8899AA]">{f}</span>
          </label>
        ))}
      </Card>

      {/* Timeline */}
      <div>
        {EVENTS.map((event, i) => (
          <EventCard key={event.title} event={event} isLast={i === EVENTS.length - 1} />
        ))}
      </div>
    </div>
  );
}
