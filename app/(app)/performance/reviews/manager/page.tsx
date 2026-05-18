"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, ChevronRight, CheckCircle2, Lock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ────────────────────────────────────────────────────────────────

const managerReviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comments: z.string().min(20, "Comments must be at least 20 characters"),
  strengths: z.string().min(5, "Please describe strengths"),
  improvements: z.string().min(5, "Please describe improvements"),
});

type ManagerReviewValues = z.infer<typeof managerReviewSchema>;

// ─── Static data ───────────────────────────────────────────────────────────

const TEAM = [
  { id: 1, name: "Anjali Singh", avatar: "AS", role: "Sales Executive", dept: "Sales", selfRating: 4.2, status: "submitted" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", role: "Software Engineer", dept: "Eng", selfRating: 3.8, status: "submitted" },
  { id: 3, name: "Priya Kapoor", avatar: "PK", role: "Marketing Lead", dept: "Mktg", selfRating: 4.5, status: "submitted" },
  { id: 4, name: "Vikas Sharma", avatar: "VS", role: "Account Manager", dept: "Sales", selfRating: 3.1, status: "pending" },
  { id: 5, name: "Meena Reddy", avatar: "MR", role: "HR Generalist", dept: "HR", selfRating: 4.0, status: "submitted" },
];

const GOAL_LABELS = ["Revenue Target", "CSAT Score", "Certifications", "Mentoring", "Response Time"];
const COMPETENCY_LABELS = ["Communication", "Problem Solving", "Collaboration", "Leadership"];
const STAR_LABELS = ["", "Unsatisfactory", "Needs Improvement", "Meets Expectations", "Exceeds Expectations", "Exceptional"];

// ─── Sub-components ────────────────────────────────────────────────────────

function StarRater({ value, onChange, size = 18 }: { value: number; onChange: (v: number) => void; size?: number }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5" role="group" aria-label="Star rating">
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
            size={size}
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

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ManagerAppraisal() {
  const toast = useToast();
  const [selected, setSelected] = useState<(typeof TEAM)[0] | null>(TEAM[0]);
  const [goalRatings, setGoalRatings] = useState<Record<string, number>>({});
  const [compRatings, setCompRatings] = useState<Record<string, number>>({});
  const [doneIds, setDoneIds] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ManagerReviewValues>({
    resolver: zodResolver(managerReviewSchema),
    defaultValues: { rating: 0, comments: "", strengths: "", improvements: "" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() is needed to reactively display star label
  const ratingValue = watch("rating");
  const isDone = selected ? doneIds.includes(selected.id) : false;

  async function onSubmit(_data: ManagerReviewValues) {
    if (!selected) return;
    // TODO: replace with real mutation
    await new Promise((r) => setTimeout(r, 1800));
    setDoneIds((p) => [...p, selected.id]);
    reset();
    setGoalRatings({});
    setCompRatings({});
    toast.show({
      variant: "success",
      title: "Review submitted",
      description: `Manager review for ${selected.name} has been submitted.`,
    });
  }

  return (
        <Page
      title="Manager Appraisal"
      subtitle="Review your team's performance — FY 2024–25"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Reviews", href: "/performance/reviews" },
        { label: "Manager" },
      ]}
      maxWidth="1300px"
    >






      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT — team list */}
        <div className="w-full lg:w-[280px] shrink-0 space-y-2">
          <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider mb-3">
            Team ({TEAM.length})
          </p>
          {TEAM.map((emp) => {
            const done = doneIds.includes(emp.id);
            return (
              <button
                key={emp.id}
                onClick={() => setSelected(emp)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  selected?.id === emp.id
                    ? "bg-[#1A2A3A] border border-[#2A3A4A]"
                    : "hover:bg-[#0D1928]"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA] shrink-0">
                  {emp.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{emp.name}</p>
                  <p className="text-[11px] text-[#445566]">{emp.role}</p>
                </div>
                {done ? (
                  <CheckCircle2 size={15} className="text-[#00E5A0] shrink-0" aria-hidden="true" />
                ) : emp.status === "pending" ? (
                  <Badge variant="warning">Pending Self</Badge>
                ) : (
                  <ChevronRight size={14} className="text-[#445566] shrink-0" aria-hidden="true" />
                )}
              </button>
            );
          })}
          {/* Summary */}
          <div className="mt-4 p-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl">
            <p className="text-xs text-[#8899AA] mb-1">Completion</p>
            <p className="text-lg font-bold text-white">
              {doneIds.length}/{TEAM.length}
            </p>
            <div
              className="h-1.5 bg-[#1A2A3A] rounded-full mt-2"
              role="progressbar"
              aria-valuenow={doneIds.length}
              aria-valuemin={0}
              aria-valuemax={TEAM.length}
              aria-label="Review completion"
            >
              <div
                className="h-full bg-[#00E5A0] rounded-full transition-all"
                style={{ width: `${(doneIds.length / TEAM.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — appraisal form */}
        {selected && (
          <div className="flex-1 space-y-5">
            {/* Employee header */}
            <Card padding="md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-lg font-bold text-[#8899AA]">
                  {selected.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white">{selected.name}</h2>
                  <p className="text-sm text-[#8899AA]">
                    {selected.role} · {selected.dept}
                  </p>
                  <p className="text-xs text-[#445566] mt-0.5">
                    Self-Rating: ⭐ {selected.selfRating}/5.0
                  </p>
                </div>
                {isDone && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-xl">
                    <Lock size={14} className="text-[#00E5A0]" aria-hidden="true" />
                    <span className="text-xs text-[#00E5A0] font-medium">Review Submitted</span>
                  </div>
                )}
              </div>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} aria-label={`Manager review for ${selected.name}`}>
              {/* Goal ratings */}
              <Card padding="md" className="mb-5">
                <h3 className="font-semibold mb-4 text-white">Rate Goals (KRA)</h3>
                <div className="space-y-4">
                  {GOAL_LABELS.map((gl) => (
                    <div
                      key={gl}
                      className="flex items-center justify-between py-3 border-b border-[#1A2A3A] last:border-0"
                    >
                      <span className="text-sm text-white">{gl}</span>
                      <StarRater
                        value={goalRatings[gl] || 0}
                        onChange={(v) => setGoalRatings((p) => ({ ...p, [gl]: v }))}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Competency ratings */}
              <Card padding="md" className="mb-5">
                <h3 className="font-semibold mb-4 text-white">Competency Ratings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMPETENCY_LABELS.map((c) => (
                    <div key={c} className="p-3 bg-[#0A1420] rounded-xl">
                      <p className="text-xs text-[#8899AA] mb-2">{c}</p>
                      <StarRater
                        value={compRatings[c] || 0}
                        onChange={(v) => setCompRatings((p) => ({ ...p, [c]: v }))}
                        size={16}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Overall + comments */}
              <Card padding="md" className="mb-5">
                <h3 className="font-semibold mb-4 text-white">Final Assessment</h3>
                <div className="mb-4">
                  <p className="text-xs text-[#8899AA] mb-2">Overall Rating *</p>
                  <StarRater
                    value={ratingValue}
                    onChange={(v) => setValue("rating", v, { shouldValidate: true })}
                    size={24}
                  />
                  {ratingValue > 0 && (
                    <p className="text-sm text-[#FFB800] mt-1">⭐ {STAR_LABELS[ratingValue]}</p>
                  )}
                  {errors.rating && (
                    <p className="text-xs text-[#FF4444] mt-1" role="alert">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="comments" className="block text-xs text-[#8899AA] mb-1.5">
                    Manager Feedback * (min 20 chars)
                  </label>
                  <textarea
                    id="comments"
                    rows={3}
                    {...register("comments")}
                    placeholder="Provide constructive feedback..."
                    aria-invalid={!!errors.comments}
                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                  />
                  {errors.comments && (
                    <p className="text-xs text-[#FF4444] mt-1" role="alert">
                      {errors.comments.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="strengths" className="block text-xs text-[#8899AA] mb-1.5">
                    Key Strengths *
                  </label>
                  <textarea
                    id="strengths"
                    rows={2}
                    {...register("strengths")}
                    placeholder="What did this employee do well?"
                    aria-invalid={!!errors.strengths}
                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                  />
                  {errors.strengths && (
                    <p className="text-xs text-[#FF4444] mt-1" role="alert">
                      {errors.strengths.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="improvements" className="block text-xs text-[#8899AA] mb-1.5">
                    Areas for Improvement *
                  </label>
                  <textarea
                    id="improvements"
                    rows={2}
                    {...register("improvements")}
                    placeholder="What should this employee focus on developing?"
                    aria-invalid={!!errors.improvements}
                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                  />
                  {errors.improvements && (
                    <p className="text-xs text-[#FF4444] mt-1" role="alert">
                      {errors.improvements.message}
                    </p>
                  )}
                </div>
              </Card>

              <Button
                type="submit"
                className="w-full"
                disabled={isDone}
                isLoading={isSubmitting}
                loadingText="Submitting..."
                icon={isDone ? <CheckCircle2 size={16} aria-hidden="true" /> : undefined}
              >
                {isDone ? "Review Submitted" : "Submit Manager Review"}
              </Button>
            </form>
          </div>
        )}
      </div>
    

        

        

        </Page>
    );
}
