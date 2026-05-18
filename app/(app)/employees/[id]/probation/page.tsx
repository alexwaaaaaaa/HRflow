"use client";

import { use, useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type Outcome = "confirm" | "extend" | "terminate";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface OutcomeOptionProps {
  val: Outcome;
  label: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: (v: Outcome) => void;
}

function OutcomeOption({ val, label, desc, color, icon, selected, onSelect }: OutcomeOptionProps) {
  return (
    <label
      className="flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors"
      style={{
        // inline-style: dynamic per-outcome color
        background: selected ? `${color}08` : "#060B14",
        borderColor: selected ? color : "#1A2A3A",
      }}
    >
      <input
        type="radio"
        name="outcome"
        value={val}
        checked={selected}
        onChange={() => onSelect(val)}
        className="mt-0.5 shrink-0"
        style={{ accentColor: color }}
      />
      <div style={{ color }}>{icon}</div>
      <div>
        <div className="mb-1 text-[15px] font-semibold text-white">{label}</div>
        <div className="text-[13px] text-[#8899AA]">{desc}</div>
      </div>
    </label>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROBATION_INFO = [
  { label: "Joined", val: "15/11/2024" },
  { label: "Period", val: "6 months" },
  { label: "Ends On", val: "14/05/2025" },
  { label: "Remaining", val: "183 days" },
] as const;

const OUTCOME_OPTIONS: Omit<OutcomeOptionProps, "selected" | "onSelect">[] = [
  {
    val: "confirm",
    label: "Confirm Employment",
    desc: "End probation and confirm as permanent employee",
    color: "#00E5A0",
    icon: <CheckCircle2 size={18} aria-hidden="true" />,
  },
  {
    val: "extend",
    label: "Extend Probation",
    desc: "Extend for an additional period (3 or 6 months)",
    color: "#FFB800",
    icon: <Clock size={18} aria-hidden="true" />,
  },
  {
    val: "terminate",
    label: "Terminate (Not Suitable)",
    desc: "End employment — probation failed",
    color: "#FF4444",
    icon: <AlertTriangle size={18} aria-hidden="true" />,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProbationReview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [outcome, setOutcome] = useState<Outcome>("confirm");
  const [rating, setRating] = useState(4);

  const handleSubmit = () => {
    // TODO: replace with real mutation
    alert(`Probation outcome: ${outcome} (stub)`);
  };

  return (
    <Page
      title="Probation Review"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${id}` },
        { label: "Probation Review" },
      ]}
      maxWidth="800px"
    >
      {/* Probation info */}
      <Card padding="md" className="mb-6">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {PROBATION_INFO.map((c) => (
            <div key={c.label} className="rounded-xl bg-[#0A1420] p-3 text-center">
              <div className="mb-1.5 text-[11px] uppercase text-[#8899AA]">{c.label}</div>
              <div className="text-base font-bold text-white">{c.val}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-6 text-base font-semibold text-white">Review Outcome</h3>

        <div className="mb-7 flex flex-col gap-3.5">
          {OUTCOME_OPTIONS.map((opt) => (
            <OutcomeOption
              key={opt.val}
              {...opt}
              selected={outcome === opt.val}
              onSelect={setOutcome}
            />
          ))}
        </div>

        {outcome === "extend" && (
          <div className="mb-6">
            <label htmlFor="extend-by" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Extend By
            </label>
            <select
              id="extend-by"
              className="h-10 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>3 months</option>
              <option>6 months</option>
            </select>
          </div>
        )}

        <div className="mb-6">
          <div className="mb-2.5 text-[13px] text-[#8899AA]">
            Performance Rating during Probation
          </div>
          <div className="flex items-center gap-2" role="group" aria-label="Performance rating">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                aria-label={`${s} star${s !== 1 ? "s" : ""}`}
                className="cursor-pointer p-0"
              >
                <Star
                  size={28}
                  fill={s <= rating ? "#FFB800" : "none"}
                  color={s <= rating ? "#FFB800" : "#445566"}
                  aria-hidden="true"
                />
              </button>
            ))}
            <span className="ml-2 self-center text-sm text-[#8899AA]">{rating}/5</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="mgr-feedback" className="mb-1.5 block text-[13px] text-[#8899AA]">
            Manager Feedback *
          </label>
          <textarea
            id="mgr-feedback"
            rows={4}
            placeholder="Describe employee performance, strengths, and areas of improvement..."
            className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3.5 text-sm text-white outline-none"
          />
        </div>

        <Button
          variant={outcome === "terminate" ? "danger" : "primary"}
          className="w-full"
          onClick={handleSubmit}
        >
          {outcome === "confirm"
            ? "Confirm Employment & Generate Letter"
            : outcome === "extend"
              ? "Extend Probation"
              : "Terminate Employee"}
        </Button>
      </Card>
    </Page>
  );
}
