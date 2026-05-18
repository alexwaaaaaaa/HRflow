"use client";

import { useState } from "react";
import {
  Briefcase,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  IndianRupee,
  Shield,
  User,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Stepper, { type StepItem } from "@/components/ui/Stepper";
import Step1Personal from "@/components/employees/wizard/Step1Personal";
import Step2Job from "@/components/employees/wizard/Step2Job";
import Step3Salary from "@/components/employees/wizard/Step3Salary";
import Step4Statutory from "@/components/employees/wizard/Step4Statutory";
import Step5Bank from "@/components/employees/wizard/Step5Bank";
import Step6Documents from "@/components/employees/wizard/Step6Documents";
import StepReview from "@/components/employees/wizard/StepReview";

// ─────────────────────────────────────────────────────────────────────────────
// Static config — actual step labels in source are
// Personal / Job / Salary / Statutory / Bank / Documents / Review.
// ─────────────────────────────────────────────────────────────────────────────

const STEPS: readonly StepItem[] = [
  {
    id: "personal",
    label: "Personal",
    description: "Identity & Contact",
    icon: <User size={16} aria-hidden="true" />,
  },
  {
    id: "job",
    label: "Job",
    description: "Role & Employment",
    icon: <Briefcase size={16} aria-hidden="true" />,
  },
  {
    id: "salary",
    label: "Salary",
    description: "CTC & Breakup",
    icon: <IndianRupee size={16} aria-hidden="true" />,
  },
  {
    id: "statutory",
    label: "Statutory",
    description: "PF, ESI, PT",
    icon: <Shield size={16} aria-hidden="true" />,
  },
  {
    id: "bank",
    label: "Bank",
    description: "Account Details",
    icon: <Building2 size={16} aria-hidden="true" />,
  },
  {
    id: "documents",
    label: "Documents",
    description: "Upload Files",
    icon: <FileText size={16} aria-hidden="true" />,
  },
  {
    id: "review",
    label: "Review",
    description: "Final Check",
    icon: <Eye size={16} aria-hidden="true" />,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AddEmployeePage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const updateData = (data: Record<string, unknown>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const STEP_COMPONENTS = [
    <Step1Personal key="1" data={formData} onUpdate={updateData} />,
    <Step2Job key="2" data={formData} onUpdate={updateData} />,
    <Step3Salary key="3" data={formData} onUpdate={updateData} />,
    <Step4Statutory key="4" data={formData} onUpdate={updateData} />,
    <Step5Bank key="5" data={formData} onUpdate={updateData} />,
    <Step6Documents key="6" data={formData} onUpdate={updateData} />,
    <StepReview key="7" data={formData} onGoToStep={setStep} />,
  ];

  const isLastStep = step === STEPS.length - 1;
  const nextLabel = !isLastStep ? `Next: ${STEPS[step + 1].label}` : null;

  return (
    <Page
      title="Add employee"
      subtitle="Complete all steps to onboard a new team member"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Employees", href: "/employees" },
        { label: "Add" },
      ]}
      maxWidth="1200px"
    >
      <div className="space-y-6">
        {/* Stepper */}
        <Card padding="md">
          <Stepper
            steps={STEPS}
            current={step}
            onStepClick={setStep}
            ariaLabel="Add employee progress"
          />
        </Card>

        {/* Step content */}
        <div className="animate-fade-in">{STEP_COMPONENTS[step]}</div>

        {/* Sticky bottom nav — sidebar-agnostic; matches the rest of the app shell */}
        <div className="sticky bottom-0 -mx-4 mt-8 border-t border-[#1A2A3A] bg-[#0A1420]/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {step > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  icon={<ChevronLeft size={16} aria-hidden="true" />}
                >
                  Back
                </Button>
              )}
              <Button variant="ghost" href="/employees">Cancel</Button>
            </div>

            <div className="text-xs text-[#445566]">
              Step {step + 1} of {STEPS.length}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary">Save as Draft</Button>
              {!isLastStep ? (
                <Button
                  variant="primary"
                  onClick={() => setStep((s) => s + 1)}
                  iconRight={<ChevronRight size={16} aria-hidden="true" />}
                >
                  {nextLabel}
                </Button>
              ) : (
                <Button variant="primary" icon={<Check size={16} aria-hidden="true" />}>
                  Create employee
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
