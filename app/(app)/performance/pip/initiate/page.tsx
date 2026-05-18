"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { AlertTriangle, Plus, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ────────────────────────────────────────────────────────────────

const pipSchema = z.object({
  employee: z.string().min(2, "Employee name is required"),
  manager: z.string().min(2, "Manager name is required"),
  pipStartDate: z.string().min(1, "Start date is required"),
  pipEndDate: z.string().min(1, "End date is required"),
  additionalContext: z.string().optional(),
});

type PIPFormValues = z.infer<typeof pipSchema>;

const TEMPLATES = [
  "Consistently missing project delivery timelines",
  "Below-expected quality of work",
  "Poor communication and collaboration",
  "Low CSAT / customer complaint escalations",
];

// ─── Sub-components ────────────────────────────────────────────────────────

function GoalRow({
  index,
  onRemove: _onRemove,
}: {
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#0A1420] rounded-xl">
      <input
        placeholder="Goal description"
        aria-label={`Goal ${index + 1} description`}
        className="sm:col-span-2 h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444]"
      />
      <input
        placeholder="Metric"
        aria-label={`Goal ${index + 1} metric`}
        className="h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444]"
      />
      <input
        type="date"
        aria-label={`Goal ${index + 1} due date`}
        className="h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#FF4444]"
      />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function PIPInitiation() {
  const toast = useToast();
  const [reasons, setReasons] = useState<string[]>([]);
  const [goalCount, setGoalCount] = useState(1);
  const [done, setDone] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<PIPFormValues>({
    resolver: zodResolver(pipSchema),
    defaultValues: {
      employee: "",
      manager: "",
      pipStartDate: "",
      pipEndDate: "",
      additionalContext: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() needed to display employee name in success state
  const employeeName = watch("employee");

  function toggleReason(r: string) {
    setReasons((prev) => (prev.includes(r) ? prev.filter((p) => p !== r) : [...prev, r]));
  }

  async function onSubmit(data: PIPFormValues) {
    // TODO: replace with real mutation
    await new Promise((r) => setTimeout(r, 2000));
    setDone(true);
    toast.show({
      variant: "warning",
      title: "PIP Initiated",
      description: `Performance Improvement Plan created for ${data.employee}.`,
    });
  }

  if (done) {
    return (
      <Page
        title="PIP Initiated"
        breadcrumbs={[
          { label: "Performance", href: "/performance/dashboard" },
          { label: "PIP", href: "/performance/pip/initiate" },
          { label: "Initiated" },
        ]}
        maxWidth="600px"
      >
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle size={36} className="text-[#FFB800]" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">PIP Initiated</h2>
          <p className="text-[#8899AA] text-sm">
            Performance Improvement Plan has been created and shared with {employeeName}. Weekly check-ins are
            now scheduled.
          </p>
        </div>
      </Page>
    );
  }

  return (
    <Page
      title="Initiate PIP"
      subtitle="Performance Improvement Plan initiation"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "PIP", href: "/performance/pip/initiate" },
        { label: "Initiate" },
      ]}
      maxWidth="1000px"
    >
      {/* Warning banner */}
      <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">
        <AlertTriangle size={16} className="text-[#FFB800] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-[#FFB800]">
          PIP is a serious HR action. Ensure all verbal counselling has been documented and manager is aligned
          before proceeding.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} aria-label="Initiate PIP form">
        <div className="space-y-5">
          {/* Basic Info */}
          <Card padding="lg">
            <h2 className="font-semibold mb-4 text-sm text-[#8899AA] uppercase tracking-wider">
              Employee Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="employee"
                label="Employee Name *"
                inputProps={{ placeholder: "Search employee..." }}
              />
              <FormField
                control={control}
                name="manager"
                label="Reporting Manager"
                inputProps={{ placeholder: "Manager name" }}
              />
              <FormField
                control={control}
                name="pipStartDate"
                label="PIP Start Date"
                inputProps={{ type: "date" }}
              />
              <FormField
                control={control}
                name="pipEndDate"
                label="PIP End Date (typically 90 days)"
                inputProps={{ type: "date" }}
              />
            </div>
          </Card>

          {/* Reason */}
          <Card padding="lg">
            <h2 className="font-semibold mb-4 text-sm text-[#8899AA] uppercase tracking-wider">
              Reason for PIP
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3" role="group" aria-label="PIP reasons">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleReason(t)}
                  aria-pressed={reasons.includes(t)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs transition-all ${
                    reasons.includes(t)
                      ? "border-[#FF4444]/50 bg-[#FF4444]/10 text-white"
                      : "border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      reasons.includes(t) ? "bg-[#FF4444] border-[#FF4444]" : "border-[#445566]"
                    }`}
                  >
                    {reasons.includes(t) && (
                      <CheckCircle2 size={10} className="text-white" aria-hidden="true" />
                    )}
                  </span>
                  {t}
                </button>
              ))}
            </div>
            <FormField
              control={control}
              name="additionalContext"
              label="Additional Context"
              inputProps={{
                placeholder: "Add additional context...",
              } as React.InputHTMLAttributes<HTMLInputElement>}
            />
          </Card>

          {/* Improvement Goals */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm text-[#8899AA] uppercase tracking-wider">
                Improvement Goals
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={<Plus size={12} aria-hidden="true" />}
                onClick={() => setGoalCount((c) => c + 1)}
              >
                Add Goal
              </Button>
            </div>
            <div className="space-y-3">
              {Array.from({ length: goalCount }).map((_, i) => (
                <GoalRow key={i} index={i} onRemove={() => setGoalCount((c) => Math.max(1, c - 1))} />
              ))}
            </div>
          </Card>

          <Button
            type="submit"
            variant="danger"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Initiating PIP..."
            disabled={!employeeName}
          >
            Initiate PIP
          </Button>
        </div>
      </form>
    </Page>
  );
}
