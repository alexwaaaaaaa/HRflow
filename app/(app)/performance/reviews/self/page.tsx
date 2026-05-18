"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ────────────────────────────────────────────────────────────────

const selfAppraisalSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comments: z.string().min(20, "Comments must be at least 20 characters"),
  strengths: z.string().min(10, "Please describe your strengths"),
  improvements: z.string().min(10, "Please describe areas for improvement"),
});

type SelfAppraisalValues = z.infer<typeof selfAppraisalSchema>;

// ─── Static data ───────────────────────────────────────────────────────────

const GOALS = [
  { title: "Achieve ₹1.2 Cr quarterly revenue", weight: 30, target: "₹1.2 Cr", actual: "₹0.96 Cr" },
  { title: "Maintain CSAT > 95%", weight: 25, target: "95%", actual: "89%" },
  { title: "Complete AWS Certification", weight: 20, target: "1 cert", actual: "In progress" },
  { title: "Mentor 2 junior team members", weight: 15, target: "2 members", actual: "2 members" },
  { title: "Reduce ticket response to < 4 hours", weight: 10, target: "4 hrs", actual: "6.2 hrs" },
];

const COMPETENCIES = [
  { name: "Communication", description: "Clear and effective verbal/written communication" },
  { name: "Problem Solving", description: "Ability to analyze issues and develop solutions" },
  { name: "Collaboration", description: "Working effectively with team members and stakeholders" },
  { name: "Innovation", description: "Bringing new ideas and approaches to work" },
  { name: "Customer Focus", description: "Delivering exceptional customer value" },
];

const STAR_LABELS = ["", "Unsatisfactory", "Needs Improvement", "Meets Expectations", "Exceeds Expectations", "Exceptional"];

// ─── Sub-components ────────────────────────────────────────────────────────

function StarRater({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          aria-label={`${s} star${s !== 1 ? "s" : ""} — ${STAR_LABELS[s]}`}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={20}
            style={{
              color: s <= (hover || value) ? "#FFB800" : "#1A2A3A",
              fill: s <= (hover || value) ? "#FFB800" : "#1A2A3A",
            }}
            aria-hidden="true"
          />
        </button>
      ))}
      {(hover || value) > 0 && (
        <span className="text-xs text-[#8899AA] ml-1">{STAR_LABELS[hover || value]}</span>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function SelfAppraisal() {
  const toast = useToast();
  const [goalRatings, setGoalRatings] = useState<Record<number, number>>({});
  const [goalComments, setGoalComments] = useState<Record<number, string>>({});
  const [compRatings, setCompRatings] = useState<Record<string, number>>({});
  const [expandedGoal, setExpandedGoal] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SelfAppraisalValues>({
    resolver: zodResolver(selfAppraisalSchema),
    defaultValues: { rating: 0, comments: "", strengths: "", improvements: "" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() is needed to reactively display star label
  const ratingValue = watch("rating");

  const totalRated = Object.keys(goalRatings).length + Object.keys(compRatings).length;
  const totalFields = GOALS.length + COMPETENCIES.length;
  const pct = Math.round((totalRated / totalFields) * 100);

  async function onSubmit(_data: SelfAppraisalValues) {
    // TODO: replace with real mutation
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitted(true);
    toast.show({
      variant: "success",
      title: "Self Appraisal Submitted!",
      description: "Your manager will review and submit their assessment.",
    });
  }

  if (submitted) {
    return (

        <div className="text-center py-16">
          <CheckCircle2 size={64} className="text-[#00E5A0] mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-white mb-2">Self Appraisal Submitted!</h2>
          <p className="text-[#8899AA]">Your manager will review and submit their assessment.</p>
        </div>
      
);
  }

  return (
        <Page
        title="Self Appraisal Submitted"
        breadcrumbs={[
          { label: "Performance", href: "/performance/dashboard" },
          { label: "Reviews", href: "/performance/reviews" },
          { label: "Self" },
        ]}
        maxWidth="600px"
      >





    <Page
      title="Self Appraisal"
      subtitle="FY 2024–25 · Annual Review · Due: 15 Jan 2026"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Reviews", href: "/performance/reviews" },
        { label: "Self" },
      ]}
      maxWidth="1000px"
      actions={
        <Button
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          loadingText="Submitting..."
          icon={<CheckCircle2 size={14} aria-hidden="true" />}
        >
          Submit Appraisal
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Self appraisal form">
        {/* Completion meter */}
        <Card padding="md" className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-[#8899AA]">Appraisal Completion</span>
                <span
                  className={`text-xs font-bold ${pct >= 80 ? "text-[#00E5A0]" : "text-[#FFB800]"}`}
                >
                  {pct}%
                </span>
              </div>
              <div
                className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Appraisal completion"
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: pct >= 80 ? "#00E5A0" : "#FFB800" }}
                />
              </div>
            </div>
            <span className="text-xs text-[#445566]">
              {totalRated}/{totalFields} rated
            </span>
          </div>
        </Card>

        {/* Goals Section */}
        <Card padding="lg" className="mb-5">
          <h2 className="text-base font-semibold mb-4 text-white">Performance Goals (KRA)</h2>
          <div className="space-y-4">
            {GOALS.map((goal, i) => {
              const expanded = expandedGoal === i;
              return (
                <div key={i} className="border border-[#1A2A3A] rounded-xl overflow-hidden">
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[#1A2A3A]/30 transition-colors"
                    onClick={() => setExpandedGoal(expanded ? null : i)}
                    role="button"
                    aria-expanded={expanded}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedGoal(expanded ? null : i);
                      }
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{goal.title}</p>
                      <p className="text-[11px] text-[#8899AA]">
                        Target: {goal.target} · Actual: {goal.actual} · W: {goal.weight}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {goalRatings[i] ? (
                        <div className="flex gap-0.5" aria-label={`${goalRatings[i]} stars`}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={12}
                              style={{
                                color: s <= goalRatings[i] ? "#FFB800" : "#1A2A3A",
                                fill: s <= goalRatings[i] ? "#FFB800" : "#1A2A3A",
                              }}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-[#445566]">Not rated</span>
                      )}
                      {expanded ? (
                        <ChevronUp size={14} className="text-[#445566]" aria-hidden="true" />
                      ) : (
                        <ChevronDown size={14} className="text-[#445566]" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                  {expanded && (
                    <div className="px-4 pb-4 border-t border-[#1A2A3A]">
                      <div className="pt-3 mb-3">
                        <p className="text-xs text-[#8899AA] mb-2">Your Self Rating</p>
                        <StarRater
                          value={goalRatings[i] || 0}
                          onChange={(v) => setGoalRatings((p) => ({ ...p, [i]: v }))}
                        />
                      </div>
                      <div>
                        <label htmlFor={`goal-comment-${i}`} className="block text-xs text-[#8899AA] mb-1.5">
                          Achievement Comments
                        </label>
                        <textarea
                          id={`goal-comment-${i}`}
                          rows={2}
                          value={goalComments[i] || ""}
                          onChange={(e) => setGoalComments((p) => ({ ...p, [i]: e.target.value }))}
                          placeholder="Describe what you achieved and how..."
                          className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Competencies Section */}
        <Card padding="lg" className="mb-5">
          <h2 className="text-base font-semibold mb-4 text-white">Behavioural Competencies</h2>
          <div className="space-y-4">
            {COMPETENCIES.map((comp) => (
              <div key={comp.name} className="flex items-start gap-4 p-4 bg-[#0A1420] rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white mb-0.5">{comp.name}</p>
                  <p className="text-[11px] text-[#8899AA]">{comp.description}</p>
                </div>
                <StarRater
                  value={compRatings[comp.name] || 0}
                  onChange={(v) => setCompRatings((p) => ({ ...p, [comp.name]: v }))}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Overall rating + narrative */}
        <Card padding="lg">
          <h2 className="text-base font-semibold mb-4 text-white">Overall Assessment</h2>

          <div className="mb-4">
            <p className="text-xs text-[#8899AA] mb-2">Overall Self Rating *</p>
            <StarRater
              value={ratingValue}
              onChange={(v) => setValue("rating", v, { shouldValidate: true })}
            />
            {errors.rating && (
              <p className="text-xs text-[#FF4444] mt-1" role="alert">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="comments" className="block text-xs text-[#8899AA] mb-1.5">
              Overall Comments * (min 20 chars)
            </label>
            <textarea
              id="comments"
              rows={3}
              {...register("comments")}
              placeholder="Summarize your overall performance this year..."
              aria-invalid={!!errors.comments}
              aria-describedby={errors.comments ? "comments-error" : undefined}
              className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
            />
            {errors.comments && (
              <p id="comments-error" className="text-xs text-[#FF4444] mt-1" role="alert">
                {errors.comments.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="strengths" className="block text-xs text-[#8899AA] mb-1.5">
              Key Strengths &amp; Achievements *
            </label>
            <textarea
              id="strengths"
              rows={3}
              {...register("strengths")}
              placeholder="Describe your top highlights this year..."
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
              rows={3}
              {...register("improvements")}
              placeholder="What skills or areas do you want to develop?"
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
      </form>
    </Page>
  
        

        

        </Page>
    );
}
