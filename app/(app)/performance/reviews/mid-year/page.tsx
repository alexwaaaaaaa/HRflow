"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Save, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ────────────────────────────────────────────────────────────────

const midYearSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comments: z.string().min(20, "Comments must be at least 20 characters"),
  strengths: z.string().min(5, "Please describe strengths"),
  improvements: z.string().min(5, "Please describe improvements"),
});

type MidYearValues = z.infer<typeof midYearSchema>;

// ─── Static data ───────────────────────────────────────────────────────────

const MID_YEAR_GOALS = [
  { title: "Revenue Target", target: "₹1.2 Cr", current: "₹0.6 Cr", progress: 50, onTrack: true },
  { title: "CSAT Score", target: "95%", current: "89%", progress: 62, onTrack: false },
  { title: "AWS Certification", target: "Completed", current: "In Progress", progress: 75, onTrack: true },
  { title: "Mentor 2 juniors", target: "2", current: "1", progress: 50, onTrack: true },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function StarRater({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="group" aria-label="Mid-year rating">
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
            size={24}
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

export default function MidYearReview() {
  const toast = useToast();
  const [goalUpdates, setGoalUpdates] = useState<Record<number, string>>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MidYearValues>({
    resolver: zodResolver(midYearSchema),
    defaultValues: { rating: 0, comments: "", strengths: "", improvements: "" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() is needed to reactively display star label
  const ratingValue = watch("rating");

  async function onSubmit(_data: MidYearValues) {
    // TODO: replace with real mutation
    await new Promise((r) => setTimeout(r, 800));
    toast.show({
      variant: "success",
      title: "Mid-Year Review Saved",
      description: "Review has been saved successfully.",
    });
  }

  return (
        <Page
      title="Mid-Year Review"
      subtitle="Oct 2025 · Rahul Sharma · Engineering"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Reviews", href: "/performance/reviews" },
        { label: "Mid-Year" },
      ]}
      maxWidth="1000px"
      actions={
        <Button
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          loadingText="Saving..."
          icon={<Save size={14} aria-hidden="true" />





}
        >
          Save Review
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Mid-year review form">
        {/* Goal progress review */}
        <Card padding="lg" className="mb-5">
          <h2 className="text-base font-semibold mb-4 text-white">Goal Progress Review (H1)</h2>
          <div className="space-y-4">
            {MID_YEAR_GOALS.map((g, i) => (
              <div key={i} className="p-4 bg-[#0A1420] rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{g.title}</p>
                    <p className="text-[11px] text-[#8899AA]">
                      Target: {g.target} · Current: {g.current}
                    </p>
                  </div>
                  <Badge variant={g.onTrack ? "success" : "warning"}>
                    {g.onTrack ? "On Track" : "At Risk"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex-1 h-2 bg-[#1A2A3A] rounded-full"
                    role="progressbar"
                    aria-valuenow={g.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${g.title} progress`}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${g.progress}%`, background: g.onTrack ? "#00E5A0" : "#FFB800" }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white">{g.progress}%</span>
                </div>
                <label htmlFor={`goal-update-${i}`} className="sr-only">
                  Manager notes for {g.title}
                </label>
                <textarea
                  id={`goal-update-${i}`}
                  rows={2}
                  value={goalUpdates[i] || ""}
                  onChange={(e) => setGoalUpdates((p) => ({ ...p, [i]: e.target.value }))}
                  placeholder="Manager notes for H2 course correction..."
                  className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-xs text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Qualitative */}
        <Card padding="lg">
          <h2 className="text-base font-semibold mb-4 text-white">Manager Assessment</h2>
          <div className="mb-4">
            <p className="text-xs text-[#8899AA] mb-2">Mid-Year Rating *</p>
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
              Overall H1 Feedback &amp; H2 Guidance * (min 20 chars)
            </label>
            <textarea
              id="comments"
              rows={4}
              {...register("comments")}
              placeholder="Share your assessment of H1 performance and key focus areas for H2..."
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
              placeholder="What did this employee do well in H1?"
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
              placeholder="What should this employee focus on in H2?"
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
    );
}
