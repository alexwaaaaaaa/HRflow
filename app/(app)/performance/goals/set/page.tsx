"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Target, CheckCircle2, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─── Zod schema for KRA rows ───────────────────────────────────────────────

const kraRowSchema = z.object({
  title: z.string().min(3, "Goal title must be at least 3 characters"),
  weight: z
    .number()
    .min(1, "Min 1%")
    .max(100, "Max 100%"),
  target: z.string().min(1, "Target is required"),
  metric: z.string().optional(),
  dueDate: z.string().optional(),
});

const goalsFormSchema = z.object({
  kras: z
    .array(kraRowSchema)
    .min(1, "Add at least one goal")
    .refine(
      (rows) => rows.reduce((s, r) => s + (r.weight || 0), 0) === 100,
      { message: "Total weight must equal 100%" }
    ),
});

type GoalsFormValues = z.infer<typeof goalsFormSchema>;

// ─── Static display data (existing goals) ─────────────────────────────────

interface ExistingGoal {
  id: number;
  title: string;
  metric: string;
  target: string;
  current: string;
  weight: number;
  status: "on-track" | "at-risk" | "completed" | "draft";
  dueDate: string;
  progress: number;
}

const INITIAL_GOALS: ExistingGoal[] = [
  { id: 1, title: "Increase quarterly revenue by 15%", metric: "Revenue ($)", target: "₹1.2 Cr", current: "₹0.9 Cr", weight: 30, status: "on-track", dueDate: "31 Mar 2025", progress: 75 },
  { id: 2, title: "Achieve 95% CSAT score in customer support", metric: "CSAT Score (%)", target: "95%", current: "89%", weight: 25, status: "at-risk", dueDate: "31 Mar 2025", progress: 50 },
  { id: 3, title: "Complete AWS Solutions Architect certification", metric: "Certification", target: "1 cert", current: "In progress", weight: 20, status: "on-track", dueDate: "28 Feb 2025", progress: 80 },
  { id: 4, title: "Mentor 2 junior team members", metric: "Count", target: "2", current: "2", weight: 15, status: "completed", dueDate: "15 Jan 2025", progress: 100 },
  { id: 5, title: "Reduce ticket response time to < 4 hours", metric: "Avg Hours", target: "4 hrs", current: "6.2 hrs", weight: 10, status: "at-risk", dueDate: "31 Mar 2025", progress: 35 },
];

const STATUS_VARIANT = {
  "on-track": "success",
  "at-risk": "warning",
  "completed": "info",
  "draft": "neutral",
} as const;

const STATUS_LABEL = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  "completed": "Completed",
  "draft": "Draft",
} as const;

// ─── Sub-components ────────────────────────────────────────────────────────

function ExistingGoalCard({ goal }: { goal: ExistingGoal }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card padding="none" className="hover:border-[#2A3A4A] transition-all">
      <div className="p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] flex items-center justify-center shrink-0">
          <Target size={16} className="text-[#8899AA]" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-medium text-white leading-snug">{goal.title}</p>
            <Badge variant={STATUS_VARIANT[goal.status]}>{STATUS_LABEL[goal.status]}</Badge>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#8899AA] mb-2">
            <span>{goal.metric}</span>
            <span>→ {goal.target}</span>
            <span>Now: {goal.current}</span>
            <span className="ml-auto text-[#445566]">Due: {goal.dueDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${goal.progress}%`,
                  background: STATUS_VARIANT[goal.status] === "success" ? "#00E5A0" : STATUS_VARIANT[goal.status] === "warning" ? "#FFB800" : "#0066FF",
                }}
              />
            </div>
            <span className="text-[11px] font-bold min-w-[30px] text-right text-white">{goal.progress}%</span>
            <span className="text-[10px] text-[#445566]">W: {goal.weight}%</span>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <Button variant="ghost" size="sm" icon={<Edit2 size={13} aria-hidden="true" />} aria-label={`Edit ${goal.title}`} />
          <Button
            variant="ghost"
            size="sm"
            icon={expanded ? <ChevronUp size={13} aria-hidden="true" /> : <ChevronDown size={13} aria-hidden="true" />}
            aria-label={expanded ? "Collapse" : "Expand"}
            onClick={() => setExpanded((v) => !v)}
          />
        </div>
      </div>
    </Card>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function GoalSetting() {
  const toast = useToast();
  const [goals] = useState<ExistingGoal[]>(INITIAL_GOALS);
  const [showAdd, setShowAdd] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GoalsFormValues>({
    resolver: zodResolver(goalsFormSchema),
    defaultValues: {
      kras: [{ title: "", weight: 10, target: "", metric: "", dueDate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "kras" });

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() needed to compute total weight reactively
  const kraValues = watch("kras");
  const totalWeight = kraValues.reduce((s, r) => s + (Number(r.weight) || 0), 0);

  async function onSubmit(_data: GoalsFormValues) {
    // TODO: replace with real mutation
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setShowAdd(false);
    toast.show({
      variant: "success",
      title: "Goals submitted",
      description: "Your goals have been sent for manager approval.",
    });
  }

  const existingTotalWeight = goals.reduce((s, g) => s + g.weight, 0);

  return (
    <Page
      title="My Goals"
      subtitle="FY 2024–25 · Set & track your performance goals"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Goals" },
      ]}
      maxWidth="1000px"
      actions={
        <>
          <Button
            variant="secondary"
            icon={<Plus size={14} aria-hidden="true" />}
            onClick={() => setShowAdd((v) => !v)}
          >
            Add Goal
          </Button>
          <Button
            variant={submitted ? "secondary" : "primary"}
            disabled={submitted}
            icon={submitted ? <CheckCircle2 size={14} aria-hidden="true" /> : undefined}
            onClick={() => setSubmitted(true)}
          >
            {submitted ? "Submitted for Approval" : "Submit for Approval"}
          </Button>
        </>
      }
    >
      {/* Weight meter */}
      <Card padding="md" className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-[#8899AA]">Total Goal Weightage</span>
              <span
                className={`text-xs font-bold ${existingTotalWeight === 100 ? "text-[#00E5A0]" : "text-[#FFB800]"}`}
              >
                {existingTotalWeight}% of 100%
              </span>
            </div>
            <div
              className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={existingTotalWeight}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Total goal weightage"
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(existingTotalWeight, 100)}%`,
                  background:
                    existingTotalWeight === 100
                      ? "#00E5A0"
                      : existingTotalWeight > 100
                      ? "#FF4444"
                      : "#FFB800",
                }}
              />
            </div>
          </div>
          {existingTotalWeight !== 100 && (
            <span className="text-xs text-[#FFB800] shrink-0">⚠ Must total 100%</span>
          )}
        </div>
      </Card>

      {/* Add Goal Form — Tier 3 with useFieldArray */}
      {showAdd && (
        <Card padding="md" className="mb-6 border-[#00E5A0]/30">
          <h3 className="text-sm font-semibold mb-4 text-white">Add New KRA Goals</h3>
          <form onSubmit={handleSubmit(onSubmit)} aria-label="Add KRA goals">
            {/* Weight validation error */}
            {errors.kras?.root && (
              <p className="text-xs text-[#FF4444] mb-3" role="alert">
                {errors.kras.root.message}
              </p>
            )}

            <div className="space-y-3 mb-4">
              {fields.map((field, i) => (
                <div key={field.id} className="p-4 bg-[#0A1420] rounded-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="sm:col-span-2">
                      <label htmlFor={`kras.${i}.title`} className="block text-xs text-[#8899AA] mb-1">
                        Goal Title *
                      </label>
                      <input
                        id={`kras.${i}.title`}
                        {...register(`kras.${i}.title`)}
                        placeholder="e.g. Increase monthly revenue by 20%"
                        aria-invalid={!!errors.kras?.[i]?.title}
                        aria-describedby={errors.kras?.[i]?.title ? `kras-${i}-title-error` : undefined}
                        className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                      />
                      {errors.kras?.[i]?.title && (
                        <p id={`kras-${i}-title-error`} className="text-xs text-[#FF4444] mt-1" role="alert">
                          {errors.kras[i]?.title?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`kras.${i}.metric`} className="block text-xs text-[#8899AA] mb-1">
                        Metric / KPI
                      </label>
                      <input
                        id={`kras.${i}.metric`}
                        {...register(`kras.${i}.metric`)}
                        placeholder="Revenue (₹), Score (%), Count..."
                        className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                      />
                    </div>
                    <div>
                      <label htmlFor={`kras.${i}.target`} className="block text-xs text-[#8899AA] mb-1">
                        Target Value *
                      </label>
                      <input
                        id={`kras.${i}.target`}
                        {...register(`kras.${i}.target`)}
                        placeholder="₹1.2 Cr / 95% / 5 units"
                        aria-invalid={!!errors.kras?.[i]?.target}
                        className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                      />
                      {errors.kras?.[i]?.target && (
                        <p className="text-xs text-[#FF4444] mt-1" role="alert">
                          {errors.kras[i]?.target?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`kras.${i}.weight`} className="block text-xs text-[#8899AA] mb-1">
                        Weightage (%) *
                      </label>
                      <input
                        id={`kras.${i}.weight`}
                        type="number"
                        min={1}
                        max={100}
                        {...register(`kras.${i}.weight`, { valueAsNumber: true })}
                        aria-invalid={!!errors.kras?.[i]?.weight}
                        className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                      />
                      {errors.kras?.[i]?.weight && (
                        <p className="text-xs text-[#FF4444] mt-1" role="alert">
                          {errors.kras[i]?.weight?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`kras.${i}.dueDate`} className="block text-xs text-[#8899AA] mb-1">
                        Due Date
                      </label>
                      <input
                        id={`kras.${i}.dueDate`}
                        type="date"
                        {...register(`kras.${i}.dueDate`)}
                        className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                      />
                    </div>
                  </div>
                  {fields.length > 1 && (
                    <div className="flex justify-end">
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2 size={13} aria-hidden="true" />}
                        onClick={() => remove(i)}
                        aria-label={`Remove goal row ${i + 1}`}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Weight summary */}
            <div className="flex items-center justify-between mb-4 px-3 py-2 bg-[#0A1420] rounded-xl">
              <span className="text-xs text-[#8899AA]">Total weight of new goals</span>
              <span
                className={`text-xs font-bold ${totalWeight === 100 ? "text-[#00E5A0]" : "text-[#FFB800]"}`}
              >
                {totalWeight}% {totalWeight !== 100 && "(must be 100%)"}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                icon={<Plus size={12} aria-hidden="true" />}
                onClick={() => append({ title: "", weight: 10, target: "", metric: "", dueDate: "" })}
              >
                Add Row
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Saving..."
                className="ml-auto"
              >
                Save Goals
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Goals list */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <ExistingGoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </Page>
  );
}
