"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Edit2 } from "lucide-react";
import { PROFILE } from "./shared";

// ─── Sub-components (module scope) ───────────────────────────────────────────

interface DataGridProps {
  items: [string, string][];
}

function DataGrid({ items }: DataGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label}>
          <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.04em] text-[#445566]">
            {label}
          </div>
          <div className="text-sm text-white">{value || "—"}</div>
        </div>
      ))}
    </div>
  );
}

interface SectionCardProps {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}

function SectionCard({ title, onEdit, children }: SectionCardProps) {
  return (
    <Card padding="md" className="mb-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            icon={<Edit2 size={12} aria-hidden="true" />}
          >
            Edit
          </Button>
        )}
      </div>
      {children}
    </Card>
  );
}

interface StatCircleProps {
  label: string;
  val: string;
  color: string;
}

function StatCircle({ label, val, color }: StatCircleProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          // inline-style: dynamic color from data — cannot express as static Tailwind class
          background: `${color}15`,
          border: `3px solid ${color}`,
        }}
      >
        <span className="text-xs font-bold" style={{ color }}>
          {val}
        </span>
      </div>
      <div className="text-[11px] text-[#445566]">{label}</div>
    </div>
  );
}

interface QuickStatProps {
  label: string;
  val: string;
}

function QuickStat({ label, val }: QuickStatProps) {
  return (
    <div className="rounded-[10px] border border-[#1A2A3A] bg-[#0A1420] px-3.5 py-3">
      <div className="mb-1 text-[11px] text-[#445566]">{label}</div>
      <div className="text-[15px] font-semibold text-white">{val}</div>
    </div>
  );
}

interface ActivityItemProps {
  dot: string;
  text: string;
  date: string;
  isLast: boolean;
}

function ActivityItem({ dot, text, date, isLast }: ActivityItemProps) {
  return (
    <div
      className={`flex items-start gap-3 py-2.5 ${!isLast ? "border-b border-[#0A1420]" : ""}`}
    >
      <div
        aria-hidden="true"
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
        style={{ background: dot }}
      />
      <div className="flex-1">
        <div className="text-[13px] text-white">{text}</div>
        <div className="text-[11px] text-[#445566]">{date}</div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const HEALTH_STATS = [
  { label: "Attendance", val: "94%", color: "#00E5A0" },
  { label: "Performance", val: "4.2/5", color: "#0066FF" },
  { label: "Engagement", val: "72%", color: "#FFB800" },
] as const;

const QUICK_STATS = [
  { label: "Leaves Used", val: "12/24" },
  { label: "Regularizations", val: "2 pending" },
  { label: "Documents", val: "4/5 uploaded" },
  { label: "PF Balance", val: "₹2,14,000 ≈" },
] as const;

const RECENT_ACTIVITY = [
  { dot: "#00E5A0", text: "Salary revision +11.1%", date: "Oct 2024" },
  { dot: "#FFB800", text: "Annual Appraisal: 4.2/5", date: "Mar 2024" },
  { dot: "#0066FF", text: "Manager changed to Karan Mehta", date: "Jun 2024" },
  { dot: "#00E5A0", text: "Probation confirmed", date: "Dec 2021" },
  { dot: "#00E5A0", text: "Joined as Software Engineer L3", date: "Jun 2021" },
] as const;

export default function OverviewTab() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
      {/* Left column */}
      <div>
        <SectionCard title="Personal Information" onEdit={() => {}}>
          <DataGrid
            items={[
              ["Full Name", PROFILE.name],
              ["EMP ID", PROFILE.id],
              ["Date of Birth", `${PROFILE.dob} (Age ${PROFILE.age})`],
              ["Gender", PROFILE.gender],
              ["Personal Email", PROFILE.personal],
              ["Work Email", PROFILE.email],
              ["Mobile", PROFILE.mobile],
              ["Blood Group", PROFILE.blood],
              ["PAN", PROFILE.pan],
              ["Aadhaar", PROFILE.aadhaar],
            ]}
          />
        </SectionCard>

        <SectionCard title="Job Information" onEdit={() => {}}>
          <DataGrid
            items={[
              ["Designation", PROFILE.designation],
              ["Department", PROFILE.dept],
              ["Work Location", PROFILE.location],
              ["Employment Type", PROFILE.empType],
              ["Work Mode", PROFILE.workMode],
              ["Reporting Manager", PROFILE.manager],
              ["Grade / Level", PROFILE.grade],
              ["Date of Joining", PROFILE.doj],
              ["Notice Period", PROFILE.notice],
              ["CTC", PROFILE.ctc],
            ]}
          />
        </SectionCard>
      </div>

      {/* Right column */}
      <div>
        <SectionCard title="Employee Health">
          <div className="mb-4 flex justify-center gap-5">
            {HEALTH_STATS.map((s) => (
              <StatCircle key={s.label} {...s} />
            ))}
          </div>
          <div className="text-center text-[11px] text-[#445566]">Updated today</div>
        </SectionCard>

        <SectionCard title="Quick Stats">
          <div className="grid grid-cols-2 gap-3">
            {QUICK_STATS.map((s) => (
              <QuickStat key={s.label} {...s} />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Activity">
          {RECENT_ACTIVITY.map((item, i) => (
            <ActivityItem
              key={item.text}
              {...item}
              isLast={i === RECENT_ACTIVITY.length - 1}
            />
          ))}
          <Link
            href={`/employees/${PROFILE.id}/timeline`}
            className="mt-2 inline-block text-xs text-[#0066FF] hover:underline"
          >
            View Full Timeline →
          </Link>
        </SectionCard>
      </div>
    </div>
  );
}
