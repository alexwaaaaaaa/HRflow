"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    Building2, FileText, MapPin, Palette, Network, Award, Shield,
    Landmark, Settings, UserPlus, CheckCircle, Database, Globe, Check,
    type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Wizard graph
//
// Each step has an explicit `order` (visual stepper position) and a `next`
// path. This replaces the previous synthetic-order trick (10.5 / 10.6 / 10.7)
// which mixed visual order with navigation order and broke whenever a step
// was inserted.
// ─────────────────────────────────────────────────────────────────────────────

interface WizardStep {
    id: string;            // semantic ID, used for keys + cross-references
    name: string;
    icon: LucideIcon;
    path: string;          // route the step renders at
    order: number;         // 1-based visual position in the stepper
    next?: string;         // next step's `path`; undefined = terminal
}

const STEPS: WizardStep[] = [
    { id: "welcome",         name: "Welcome",              icon: Building2,   path: "/welcome",         order: 1,  next: "/company-details" },
    { id: "company-details", name: "Basic Details",        icon: FileText,    path: "/company-details", order: 2,  next: "/company-tax" },
    { id: "company-tax",     name: "Address & Tax",        icon: MapPin,      path: "/company-tax",     order: 3,  next: "/branding" },
    { id: "branding",        name: "Branding",             icon: Palette,     path: "/branding",        order: 4,  next: "/departments" },
    { id: "departments",     name: "Departments",          icon: Network,     path: "/departments",     order: 5,  next: "/designations" },
    { id: "designations",    name: "Designations",         icon: Award,       path: "/designations",    order: 6,  next: "/statutory" },
    { id: "statutory",       name: "Statutory Setup",      icon: Shield,      path: "/statutory",       order: 7,  next: "/bank-account" },
    { id: "bank-account",    name: "Bank Account",         icon: Landmark,    path: "/bank-account",    order: 8,  next: "/setup-payroll" },
    { id: "setup-payroll",   name: "Payroll Settings",     icon: Settings,    path: "/setup-payroll",   order: 9,  next: "/invite-team" },
    { id: "invite-team",     name: "Invite HR Team",       icon: UserPlus,    path: "/invite-team",     order: 10, next: "/data-retention" },
    { id: "data-retention",  name: "Data Retention",       icon: Database,    path: "/data-retention",  order: 11, next: "/locale" },
    { id: "locale",          name: "Timezone & Language",  icon: Globe,       path: "/locale",          order: 12, next: "/complete" },
    { id: "complete",        name: "Setup Complete",       icon: CheckCircle, path: "/complete",        order: 13 },
];

const TOTAL_STEPS = STEPS.length;

function findStep(pathname: string): WizardStep {
    return STEPS.find((s) => s.path === pathname) ?? STEPS[0];
}

export default function WizardShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const currentStep = useMemo(() => findStep(pathname), [pathname]);

    // The terminal step renders without the chrome.
    if (currentStep.id === "complete") {
        return <>{children}</>;
    }

    const previousStep = STEPS.find((s) => s.next === currentStep.path) ?? null;
    const nextStep = currentStep.next
        ? STEPS.find((s) => s.path === currentStep.next)
        : null;
    const isFirst = previousStep === null;
    const completedCount = currentStep.order - 1;
    const progressPercent = (completedCount / TOTAL_STEPS) * 100;

    return (
        <div
            className="flex flex-col min-h-screen w-full"
            style={{ background: "#060B14" }}
        >
            {/* TOP BAR */}
            <header
                className="flex items-center justify-between"
                style={{
                    height: 64,
                    background: "#0A1420",
                    borderBottom: "1px solid #1A2A3A",
                    padding: "0 32px",
                }}
            >
                <div className="flex items-center gap-2">
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "#00E5A0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                stroke="#060B14"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>HRFlow</span>
                    <span style={{ fontSize: 14, color: "#8899AA", marginLeft: 4 }}>
                        | Setup Wizard
                    </span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>
                    {currentStep.name}
                </div>
                <div className="flex items-center gap-4">
                    <span style={{ fontSize: 14, color: "#8899AA" }}>
                        Step {currentStep.order} of {TOTAL_STEPS}
                    </span>
                    <Button variant="ghost" size="sm">
                        Save & Exit
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* LEFT STEPPER — hidden on mobile, visible md+ */}
                <aside
                    className="hidden md:flex flex-col flex-shrink-0"
                    style={{ width: 280, background: "#0A1420", borderRight: "1px solid #1A2A3A" }}
                    aria-label="Setup steps"
                >
                    <div style={{ padding: "32px 24px" }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>
                            Company Setup
                        </div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>
                            Complete all steps to go live
                        </div>

                        <ol className="flex flex-col mt-6 relative">
                            {STEPS.map((step, idx) => {
                                let status: "done" | "active" | "pending" = "pending";
                                if (step.order < currentStep.order) status = "done";
                                else if (step.order === currentStep.order) status = "active";

                                const Icon = step.icon;
                                const isLast = idx === STEPS.length - 1;

                                return (
                                    <li
                                        key={step.id}
                                        className="relative group"
                                        style={{ padding: "12px 16px", borderRadius: 8, cursor: "pointer" }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => router.push(step.path)}
                                            aria-current={status === "active" ? "step" : undefined}
                                            className="w-full text-left flex items-center gap-3 relative z-10 bg-transparent"
                                        >
                                            {/* Connector */}
                                            {!isLast && (
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: "absolute",
                                                        left: 28,
                                                        top: 40,
                                                        bottom: -12,
                                                        width: 2,
                                                        background: status === "done" ? "#00E5A0" : "#1A2A3A",
                                                        zIndex: 0,
                                                    }}
                                                />
                                            )}

                                            <div
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: "50%",
                                                    flexShrink: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background:
                                                        status === "done"
                                                            ? "#00E5A0"
                                                            : status === "active"
                                                            ? "rgba(0,229,160,0.2)"
                                                            : "#1A2A3A",
                                                    border: status === "active" ? "2px solid #00E5A0" : "none",
                                                    color:
                                                        status === "done"
                                                            ? "#060B14"
                                                            : status === "active"
                                                            ? "#00E5A0"
                                                            : "#8899AA",
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {status === "done" ? <Check size={14} /> : step.order}
                                            </div>
                                            <span className="flex items-center gap-2">
                                                <Icon
                                                    size={16}
                                                    color={
                                                        status === "done"
                                                            ? "#00E5A0"
                                                            : status === "active"
                                                            ? "#FFFFFF"
                                                            : "#8899AA"
                                                    }
                                                />
                                                <span
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: status === "active" ? 600 : 400,
                                                        color:
                                                            status === "done"
                                                                ? "#00E5A0"
                                                                : status === "active"
                                                                ? "#FFFFFF"
                                                                : "#8899AA",
                                                    }}
                                                >
                                                    {step.name}
                                                </span>
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    <div className="mt-auto" style={{ padding: 24, borderTop: "1px solid #1A2A3A" }}>
                        <div className="flex items-center justify-between mb-2">
                            <span style={{ fontSize: 12, color: "#8899AA" }}>
                                {completedCount} of {TOTAL_STEPS} steps complete
                            </span>
                        </div>
                        <div
                            role="progressbar"
                            aria-valuenow={completedCount}
                            aria-valuemin={0}
                            aria-valuemax={TOTAL_STEPS}
                            style={{
                                height: 4,
                                borderRadius: 2,
                                background: "#1A2A3A",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    background: "#00E5A0",
                                    width: `${progressPercent}%`,
                                    transition: "width 0.3s ease",
                                }}
                            />
                        </div>
                    </div>
                </aside>

                {/* RIGHT CONTENT AREA */}
                <div
                    className="flex-1 overflow-y-auto flex flex-col relative min-w-0"
                >
                    <div className="flex-1">{children}</div>

                    {/* BOTTOM BAR */}
                    <div
                        className="sticky bottom-0 flex items-center justify-between flex-shrink-0 z-50 backdrop-blur-md"
                        style={{
                            height: 72,
                            background: "rgba(10, 20, 32, 0.9)",
                            borderTop: "1px solid #1A2A3A",
                            padding: "0 32px",
                        }}
                    >
                        {isFirst ? (
                            <div />
                        ) : (
                            <Button
                                variant="secondary"
                                onClick={() => previousStep && router.push(previousStep.path)}
                            >
                                ← Back
                            </Button>
                        )}

                        <div
                            className="flex items-center gap-2"
                            style={{ color: "#00E5A0", fontSize: 12 }}
                        >
                            <Check size={14} /> All changes saved
                        </div>

                        <Button onClick={() => nextStep && router.push(nextStep.path)}>
                            {nextStep ? `Next: ${nextStep.name} →` : "Let's Begin →"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
