"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const WEEKS = [
  { week: 1, date: "06 Jan 2025", status: "completed", managerRating: 3, notes: "Showed improvement in meeting delivery timelines. CSAT still below target.", attended: true },
  { week: 2, date: "13 Jan 2025", status: "completed", managerRating: 3, notes: "Good collaboration observed. 2 deliveries on time.", attended: true },
  { week: 3, date: "20 Jan 2025", status: "completed", managerRating: 4, notes: "Strong week. CSAT improved to 82%. Keep it up.", attended: true },
  { week: 4, date: "27 Jan 2025", status: "active", managerRating: 0, notes: "", attended: false },
  { week: 5, date: "03 Feb 2025", status: "upcoming", managerRating: 0, notes: "", attended: false },
  { week: 6, date: "10 Feb 2025", status: "upcoming", managerRating: 0, notes: "", attended: false },
];

const GOALS = [
  { goal: "Maintain CSAT > 90%", progress: 82, target: 90, unit: "%" },
  { goal: "On-time delivery rate > 85%", progress: 75, target: 85, unit: "%" },
  { goal: "Zero escalations", progress: 2, target: 0, unit: " escalations" },
];

function StarRater({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="group" aria-label="Week rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          aria-label={`${s} star${s !== 1 ? "s" : ""}`}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={22}
            style={{
              color: s <= (hover || value) ? "#FFB800" : "#1A2A3A",
              fill: s <= (hover || value) ? "#FFB800" : "#1A2A3A",
            }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

export default function PIPReview() {
  const [weeks, setWeeks] = useState(WEEKS);
  const [activeWeek] = useState(4);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  function submitWeek() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setWeeks((prev) =>
        prev.map((w) =>
          w.week === activeWeek ? { ...w, status: "completed", managerRating: rating, notes, attended: true } : w
        )
      );
      setRating(0);
      setNotes("");
    }, 1500);
  }

  const completed = weeks.filter((w) => w.status === "completed").length;
  const pct = (completed / weeks.length) * 100;

  return (
        <Page
      title="PIP Weekly Reviews"
      subtitle="Vikas Sharma · Sales · PIP Started: 06 Jan 2025 · Ends: 06 Apr 2025"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "PIP", href: "/performance/pip/initiate" },
        { label: "Weekly Reviews" },
      ]}
      maxWidth="1000px"
    >






      {/* Goal progress */}
      <Card padding="md" className="mb-6">
        <h3 className="font-semibold mb-4 text-sm text-white">PIP Goals Progress</h3>
        <div className="space-y-4">
          {GOALS.map((g) => {
            const onTrack = g.unit === " escalations" ? g.progress <= g.target : g.progress >= g.target * 0.9;
            return (
              <div key={g.goal}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white">{g.goal}</span>
                  <Badge variant={onTrack ? "success" : "warning"}>
                    Current: {g.progress}
                    {g.unit} {onTrack ? "✓" : "⚠"}
                  </Badge>
                </div>
                <div
                  className="h-2 bg-[#1A2A3A] rounded-full"
                  role="progressbar"
                  aria-valuenow={g.progress}
                  aria-valuemin={0}
                  aria-valuemax={g.target || 10}
                  aria-label={g.goal}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(Math.abs((g.progress / (g.target || 10)) * 100), 100)}%`,
                      background: onTrack ? "#00E5A0" : "#FFB800",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Overall progress */}
      <Card padding="md" className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm text-white">
            PIP Timeline ({completed}/{weeks.length} weeks)
          </h3>
          <span className="text-xs text-[#00E5A0]">{pct.toFixed(0)}% complete</span>
        </div>
        <div className="flex gap-2" role="list" aria-label="PIP weekly progress">
          {weeks.map((w) => (
            <div
              key={w.week}
              role="listitem"
              className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                w.status === "completed"
                  ? "bg-[#00E5A0] text-[#060B14]"
                  : w.status === "active"
                  ? "bg-[#0066FF] text-white"
                  : "bg-[#1A2A3A] text-[#445566]"
              }`}
              aria-label={`Week ${w.week}: ${w.status}`}
            >
              W{w.week}
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly log */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-white">Weekly Check-in Log</h3>
        {weeks
          .filter((w) => w.status === "completed")
          .map((w) => (
            <Card key={w.week} padding="md">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#00E5A0]/10 flex items-center justify-center text-[10px] font-bold text-[#00E5A0]">
                  W{w.week}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-[#445566]">{w.date}</p>
                    <div className="flex gap-0.5" aria-label={`${w.managerRating} stars`}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          style={{
                            color: s <= w.managerRating ? "#FFB800" : "#1A2A3A",
                            fill: s <= w.managerRating ? "#FFB800" : "#1A2A3A",
                          }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#8899AA]">{w.notes}</p>
                </div>
                <CheckCircle2 size={15} className="text-[#00E5A0] shrink-0" aria-hidden="true" />
              </div>
            </Card>
          ))}
      </div>

      {/* Current week review */}
      <Card padding="md" className="border-[#0066FF]/40">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" aria-hidden="true" />
          <h3 className="font-semibold text-base text-white">
            Week {activeWeek} Review — {weeks[activeWeek - 1]?.date}
          </h3>
        </div>
        <div className="mb-4">
          <p className="text-xs text-[#8899AA] mb-2">Week Rating</p>
          <StarRater value={rating} onChange={setRating} />
        </div>
        <div className="mb-4">
          <label htmlFor="week-notes" className="block text-xs text-[#8899AA] mb-1.5">
            Manager Notes
          </label>
          <textarea
            id="week-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observations, progress, challenges..."
            className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] resize-none"
          />
        </div>
        <Button
          className="w-full"
          onClick={submitWeek}
          disabled={saving || rating === 0}
          isLoading={saving}
          loadingText="Saving..."
        >
          Save Week {activeWeek} Review
        </Button>
      </Card>
    

        

        

        </Page>
    );
}
