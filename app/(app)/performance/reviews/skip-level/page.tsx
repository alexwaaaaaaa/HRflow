"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ────────────────────────────────────────────────────────────────

const skipLevelSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comments: z.string().min(20, "Comments must be at least 20 characters"),
  strengths: z.string().min(5, "Please describe strengths"),
  improvements: z.string().min(5, "Please describe improvements"),
});

type SkipLevelValues = z.infer<typeof skipLevelSchema>;

// ─── Static data ───────────────────────────────────────────────────────────

const EMPLOYEES = [
  { id: 1, name: "Anjali Singh", avatar: "AS", role: "Sales Executive", dept: "Sales", manager: "Rajesh Kumar" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", role: "SWE", dept: "Eng", manager: "Priya Nair" },
  { id: 3, name: "Deepak Mehta", avatar: "DM", role: "Finance Analyst", dept: "Finance", manager: "Suresh Rao" },
];

const DIMENSIONS = [
  "Strategic Thinking",
  "Leadership Potential",
  "Cross-functional Impact",
  "Innovation",
  "Culture Building",
];

// ─── Sub-components ────────────────────────────────────────────────────────

function StarRater({ val, onChange }: { val: number; onChange: (v: number) => void }) {
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
          className="hover:scale-110 transition-transform"
        >
          <Star
            size={18}
            style={{
              color: s <= (hover || val) ? "#FFB800" : "#1A2A3A",
              fill: s <= (hover || val) ? "#FFB800" : "#1A2A3A",
            }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function SkipLevelReview() {
  const toast = useToast();
  const [selected, setSelected] = useState(EMPLOYEES[0]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [done, setDone] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkipLevelValues>({
    resolver: zodResolver(skipLevelSchema),
    defaultValues: { rating: 0, comments: "", strengths: "", improvements: "" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() is needed to reactively display star label
  const ratingValue = watch("rating");

  async function onSubmit(_data: SkipLevelValues) {
    // TODO: replace with real mutation
    await new Promise((r) => setTimeout(r, 1600));
    setDone((p) => [...p, selected.id.toString()]);
    reset();
    setRatings({});
    toast.show({
      variant: "success",
      title: "Skip-level review submitted",
      description: `Review for ${selected.name} has been submitted.`,
    });
  }

  const isDone = done.includes(selected.id.toString());

  return (
        <Page
      title="Skip-Level Review"
      subtitle="Your VP-level perspective on direct reports of your managers"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Reviews", href: "/performance/reviews" },
        { label: "Skip-Level" },
      ]}
      maxWidth="1100px"
    >






      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0 space-y-2">
          <p className="text-xs text-[#8899AA] uppercase tracking-wider mb-3">Reviewees</p>
          {EMPLOYEES.map((e) => {
            const isDoneEmp = done.includes(e.id.toString());
            return (
              <button
                key={e.id}
                onClick={() => setSelected(e)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  selected.id === e.id ? "bg-[#1A2A3A] border border-[#2A3A4A]" : "hover:bg-[#0D1928]"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">
                  {e.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{e.name}</p>
                  <p className="text-[10px] text-[#445566]">Mgr: {e.manager}</p>
                </div>
                {isDoneEmp && (
                  <CheckCircle2 size={14} className="text-[#00E5A0]" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <div className="flex-1 space-y-5">
          <Card padding="md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-base font-bold text-[#8899AA]">
                {selected.avatar}
              </div>
              <div>
                <h2 className="font-bold text-white">{selected.name}</h2>
                <p className="text-xs text-[#8899AA]">
                  {selected.role} · Reports to {selected.manager}
                </p>
              </div>
            </div>
          </Card>

          <form onSubmit={handleSubmit(onSubmit)} aria-label={`Skip-level review for ${selected.name}`}>
            <Card padding="md" className="mb-5">
              <h3 className="font-semibold mb-4 text-sm text-white">Skip-Level Dimensions</h3>
              <div className="space-y-4">
                {DIMENSIONS.map((d) => (
                  <div
                    key={d}
                    className="flex items-center justify-between py-3 border-b border-[#1A2A3A] last:border-0"
                  >
                    <span className="text-sm text-white">{d}</span>
                    <StarRater
                      val={ratings[d] || 0}
                      onChange={(v) => setRatings((p) => ({ ...p, [d]: v }))}
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="md" className="mb-5">
              <h3 className="font-semibold mb-3 text-sm text-white">Overall Assessment</h3>

              <div className="mb-4">
                <p className="text-xs text-[#8899AA] mb-2">Overall Rating *</p>
                <StarRater
                  val={ratingValue}
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
                  Skip-Level Feedback * (min 20 chars)
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  {...register("comments")}
                  placeholder="Share your skip-level perspective on performance and potential..."
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
                  placeholder="What are this employee's key strengths?"
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
              {isDone ? "Submitted" : "Submit Skip-Level Review"}
            </Button>
          </form>
        </div>
      </div>
    

        

        

        </Page>
    );
}
