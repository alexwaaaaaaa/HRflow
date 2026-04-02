"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    Building2, FileText, MapPin, Palette, Network, Award, Shield,
    Landmark, Settings, UserPlus, CheckCircle, Database, Globe, Check
} from "lucide-react";
import Button from "@/components/ui/Button";

const STEPS = [
    { id: 1, name: "Welcome", icon: Building2, path: "/welcome" },
    { id: 2, name: "Basic Details", icon: FileText, path: "/company-details" },
    { id: 3, name: "Address & Tax", icon: MapPin, path: "/company-tax" },
    { id: 4, name: "Branding", icon: Palette, path: "/branding" },
    { id: 5, name: "Departments", icon: Network, path: "/departments" },
    { id: 6, name: "Designations", icon: Award, path: "/designations" },
    { id: 7, name: "Statutory Setup", icon: Shield, path: "/statutory" },
    { id: 8, name: "Bank Account", icon: Landmark, path: "/bank-account" },
    { id: 9, name: "Payroll Settings", icon: Settings, path: "/payroll-settings" },
    { id: 10, name: "Invite HR Team", icon: UserPlus, path: "/invite-team" },
    { id: 11, name: "Setup Complete", icon: CheckCircle, path: "/complete" },
    { id: 12, name: "Data Retention", icon: Database, path: "/data-retention" },
    { id: 13, name: "Timezone & Language", icon: Globe, path: "/locale" },
];

export default function WizardShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === "/complete") {
        return <>{children}</>;
    }

    const currentStepIndex = STEPS.findIndex((s) => s.path === pathname) !== -1
        ? STEPS.findIndex((s) => s.path === pathname)
        : 0;

    const currentStep = STEPS[currentStepIndex];
    const isFirst = currentStepIndex === 0;

    // Custom next step logic matching the prompt
    // 10 -> 12, 12 -> 13, 13 -> 11
    let nextStep: typeof STEPS[0] | null = null;
    if (currentStep.id === 10) nextStep = STEPS.find(s => s.id === 12) || null;
    else if (currentStep.id === 12) nextStep = STEPS.find(s => s.id === 13) || null;
    else if (currentStep.id === 13) nextStep = STEPS.find(s => s.id === 11) || null;
    else nextStep = STEPS[currentStepIndex + 1] || null;

    const previousStep = currentStepIndex > 0 ? STEPS[currentStepIndex - 1] : null;

    // Completed logic: everything before current step index, plus handle the out-of-order jump
    const completedCount = currentStepIndex;
    const progressPercent = (completedCount / 13) * 100;

    return (
        <div className="flex flex-col min-h-screen" style={{ width: 1440, margin: "0 auto", background: "#060B14" }}>
            {/* TOP BAR */}
            <div className="flex items-center justify-between" style={{ height: 64, background: "#0A1420", borderBottom: "1px solid #1A2A3A", padding: "0 32px" }}>
                <div className="flex items-center gap-2">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>HRFlow </span>
                    <span style={{ fontSize: 14, color: "#8899AA", marginLeft: 4 }}>| Setup Wizard</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>{currentStep?.name}</div>
                <div className="flex items-center gap-4">
                    <span style={{ fontSize: 14, color: "#8899AA" }}>Step {currentStep?.id} of 13</span>
                    <Button variant="ghost" size="sm">Save & Exit</Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* LEFT STEPPER */}
                <div className="flex flex-col flex-shrink-0" style={{ width: 320, background: "#0A1420", borderRight: "1px solid #1A2A3A" }}>
                    <div style={{ padding: "32px 24px" }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>Company Setup</div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>Complete all steps to go live</div>

                        <div className="flex flex-col mt-6 relative">
                            {STEPS.map((step, idx) => {
                                // Determine status based on index logic, considering custom order for id=12,13,11
                                let status: "done" | "active" | "pending" = "pending";

                                const getLogicalOrder = (id: number) => {
                                    if (id === 12) return 10.5;
                                    if (id === 13) return 10.6;
                                    if (id === 11) return 10.7;
                                    return id;
                                };

                                const currentLogicalOrder = getLogicalOrder(currentStep.id);
                                const stepLogicalOrder = getLogicalOrder(step.id);

                                if (stepLogicalOrder < currentLogicalOrder) status = "done";
                                else if (stepLogicalOrder === currentLogicalOrder) status = "active";

                                const Icon = step.icon;

                                return (
                                    <div key={step.id} className="relative group" style={{ padding: "12px 16px", borderRadius: 8, cursor: "pointer" }} onClick={() => router.push(step.path)}>
                                        {/* Connector line */}
                                        {idx < STEPS.length - 1 && (
                                            <div style={{ position: "absolute", left: 28, top: 40, bottom: -12, width: 2, background: status === "done" ? "#00E5A0" : "#1A2A3A", zIndex: 0 }} />
                                        )}

                                        <div className="flex items-center gap-3 relative z-10">
                                            <div style={{
                                                width: 24, height: 24, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                                                background: status === "done" ? "#00E5A0" : status === "active" ? "rgba(0,229,160,0.2)" : "#1A2A3A",
                                                border: status === "active" ? "2px solid #00E5A0" : "none",
                                                color: status === "done" ? "#060B14" : status === "active" ? "#00E5A0" : "#8899AA", fontSize: 12, fontWeight: 600
                                            }}>
                                                {status === "done" ? <Check size={14} /> : step.id}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Icon size={16} color={status === "done" ? "#00E5A0" : status === "active" ? "#FFFFFF" : "#8899AA"} />
                                                <div>
                                                    <div style={{ fontSize: 14, fontWeight: status === "active" ? 600 : 400, color: status === "done" ? "#00E5A0" : status === "active" ? "#FFFFFF" : "#8899AA" }}>
                                                        {step.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-auto" style={{ padding: 24, borderTop: "1px solid #1A2A3A" }}>
                        <div className="flex items-center justify-between mb-2">
                            <span style={{ fontSize: 12, color: "#8899AA" }}>{completedCount} of 13 steps complete</span>
                        </div>
                        <div style={{ height: 4, borderRadius: 2, background: "#1A2A3A", overflow: "hidden" }}>
                            <div style={{ height: "100%", background: "#00E5A0", width: `${progressPercent}%`, transition: "width 0.3s ease" }} />
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT AREA */}
                <div className="flex-1 overflow-y-auto flex flex-col relative" style={{ width: 1120 }}>
                    <div className="flex-1">
                        {children}
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="sticky bottom-0 flex items-center justify-between flex-shrink-0 z-50 backdrop-blur-md" style={{ height: 72, background: "rgba(10, 20, 32, 0.9)", borderTop: "1px solid #1A2A3A", padding: "0 32px" }}>
                        {isFirst ? (
                            <div /> // Placeholder to keep center/right aligned
                        ) : (
                            <Button variant="secondary" onClick={() => previousStep && router.push(previousStep.path)}>
                                &larr; Back
                            </Button>
                        )}

                        <div className="flex items-center gap-2" style={{ color: "#00E5A0", fontSize: 12 }}>
                            <Check size={14} /> All changes saved
                        </div>

                        <Button onClick={() => nextStep && router.push(nextStep.path)}>
                            {nextStep ? `Next: ${nextStep.name} \u2192` : "Let's Begin \u2192"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
