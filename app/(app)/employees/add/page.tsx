"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, User, Briefcase, IndianRupee, Shield, Building2, FileText, Eye, Check } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Step1Personal from "@/components/employees/wizard/Step1Personal";
import Step2Job from "@/components/employees/wizard/Step2Job";
import Step3Salary from "@/components/employees/wizard/Step3Salary";
import Step4Statutory from "@/components/employees/wizard/Step4Statutory";
import Step5Bank from "@/components/employees/wizard/Step5Bank";
import Step6Documents from "@/components/employees/wizard/Step6Documents";
import StepReview from "@/components/employees/wizard/StepReview";

const STEPS = [
    { label: "Personal", icon: User, desc: "Identity & Contact" },
    { label: "Job", icon: Briefcase, desc: "Role & Employment" },
    { label: "Salary", icon: IndianRupee, desc: "CTC & Breakup" },
    { label: "Statutory", icon: Shield, desc: "PF, ESI, PT" },
    { label: "Bank", icon: Building2, desc: "Account Details" },
    { label: "Documents", icon: FileText, desc: "Upload Files" },
    { label: "Review", icon: Eye, desc: "Final Check" },
];

export default function AddEmployeePage() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, unknown>>({});

    const updateData = (data: Record<string, unknown>) => setFormData(prev => ({ ...prev, ...data }));

    const STEP_COMPONENTS = [
        <Step1Personal key="1" data={formData} onUpdate={updateData} />,
        <Step2Job key="2" data={formData} onUpdate={updateData} />,
        <Step3Salary key="3" data={formData} onUpdate={updateData} />,
        <Step4Statutory key="4" data={formData} onUpdate={updateData} />,
        <Step5Bank key="5" data={formData} onUpdate={updateData} />,
        <Step6Documents key="6" data={formData} onUpdate={updateData} />,
        <StepReview key="7" data={formData} onGoToStep={setStep} />,
    ];

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 100, maxWidth: 1200, margin: "0 auto" }} className="animate-fade-in">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "#8899AA" }}>
                <Link href="/employees" style={{ color: "#8899AA", textDecoration: "none" }} className="hover:text-white">Employees</Link>
                <ChevronRight size={14} color="#445566" />
                <span style={{ color: "#FFFFFF" }}>Add New Employee</span>
            </div>

            {/* Page title */}
            <div className="mb-8">
                <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Add New Employee</h1>
                <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Complete all steps to onboard a new team member</p>
            </div>

            {/* Step progress bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px" }}>
                {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isDone = i < step;
                    const isActive = i === step;
                    return (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                            {/* Connector line */}
                            {i > 0 && (
                                <div style={{
                                    position: "absolute", left: 0, top: 20, width: "50%", height: 2,
                                    background: isDone ? "#00E5A0" : "#1A2A3A", transition: "background 0.3s"
                                }} />
                            )}
                            {i < STEPS.length - 1 && (
                                <div style={{
                                    position: "absolute", right: 0, top: 20, width: "50%", height: 2,
                                    background: i < step ? "#00E5A0" : "#1A2A3A", transition: "background 0.3s"
                                }} />
                            )}

                            {/* Circle */}
                            <button
                                onClick={() => i < step && setStep(i)}
                                style={{
                                    width: 40, height: 40, borderRadius: "50%",
                                    background: isDone ? "#00E5A0" : isActive ? "rgba(0,229,160,0.15)" : "#0A1420",
                                    border: `2px solid ${isDone ? "#00E5A0" : isActive ? "#00E5A0" : "#1A2A3A"}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: i < step ? "pointer" : "default", zIndex: 1,
                                    transition: "all 0.3s", position: "relative"
                                }}
                            >
                                {isDone
                                    ? <CheckCircle2 size={20} color="#060B14" />
                                    : <Icon size={16} color={isActive ? "#00E5A0" : "#445566"} />
                                }
                            </button>

                            <div style={{ marginTop: 8, textAlign: "center" }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? "#FFFFFF" : isDone ? "#00E5A0" : "#445566", transition: "color 0.3s" }}>
                                    {s.label}
                                </div>
                                <div style={{ fontSize: 11, color: "#445566", marginTop: 2 }}>{s.desc}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Step content */}
            <div style={{ animationDuration: "0.25s" }} className="animate-fade-in">
                {STEP_COMPONENTS[step]}
            </div>

            {/* Bottom nav */}
            <div style={{
                position: "fixed", bottom: 0, left: 240, right: 0,
                background: "#0A1420", borderTop: "1px solid #1A2A3A",
                padding: "16px 32px", display: "flex", justifyContent: "space-between",
                alignItems: "center", zIndex: 50
            }}>
                <div className="flex gap-3">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            style={{ height: 40, padding: "0 20px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 14, color: "#8899AA", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
                            className="hover:border-[#445566] hover:text-white"
                        >
                            <ChevronLeft size={16} /> Back
                        </button>
                    )}
                    <Link href="/employees">
                        <button style={{ height: 40, padding: "0 20px", background: "transparent", fontSize: 14, color: "#8899AA", cursor: "pointer", transition: "all 0.2s" }} className="hover:text-white">
                            Cancel
                        </button>
                    </Link>
                </div>

                <div style={{ fontSize: 13, color: "#445566" }}>
                    Step {step + 1} of {STEPS.length}
                </div>

                <div className="flex gap-3">
                    <button style={{ height: 40, padding: "0 20px", background: "#1A2A3A", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 14, color: "#FFFFFF", cursor: "pointer", transition: "all 0.2s" }} className="hover:border-[#445566]">
                        Save as Draft
                    </button>
                    {step < STEPS.length - 1 ? (
                        <Button onClick={() => setStep(s => s + 1)} className="gap-2">
                            Next: {STEPS[step + 1].label} <ChevronRight size={16} />
                        </Button>
                    ) : (
                        <Button className="gap-2 shadow-[0_0_20px_rgba(0,229,160,0.3)]">
                            <Check size={16} /> Create Employee
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
