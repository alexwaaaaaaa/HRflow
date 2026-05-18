"use client";

import { useState } from "react";
import { Search, Calendar, ChevronRight, Info, CheckCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Employee {
    id: string;
    name: string;
    dept: string;
    designation: string;
    joinDate: string;
}

const EMPLOYEES: Employee[] = [
    { id: "EMP-771", name: "Arnab Das", dept: "Engineering", designation: "Senior Developer", joinDate: "12 Jan 2021" },
    { id: "EMP-892", name: "Sanya Gupta", dept: "Marketing", designation: "Product Manager", joinDate: "05 Mar 2022" },
    { id: "EMP-443", name: "Rahul Verma", dept: "Product", designation: "Designer", joinDate: "18 Nov 2020" },
];

const STEPS = [
    { num: 1, label: "Select Employee" },
    { num: 2, label: "Resignation Details" },
    { num: 3, label: "Notice Period" },
    { num: 4, label: "Workflows" },
];

export default function InitiateFnF() {
    const [step, setStep] = useState(1);
    const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);

    return (
        <Page
            title="Initiate Offboarding"
            subtitle="Start the Full & Final settlement process for an employee."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Initiate" },
            ]}
            maxWidth="900px"
        >
            {/* Progress Stepper */}
            <ol className="mb-8 flex items-center gap-4" aria-label="Offboarding progress">
                {STEPS.map((s, i) => (
                    <li key={s.num} className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <span
                                aria-current={step === s.num ? "step" : undefined}
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-black transition-all ${
                                    step >= s.num
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-[#1A2A3A] text-[#445566]"
                                }`}
                            >
                                {step > s.num ? <CheckCircle size={18} aria-hidden="true" /> : s.num}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.num ? "text-white" : "text-[#445566]"}`}>
                                {s.label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div
                                className={`h-0.5 w-12 rounded-full transition-all ${step > s.num ? "bg-blue-600" : "bg-[#1A2A3A]"}`}
                                aria-hidden="true"
                            />
                        )}
                    </li>
                ))}
            </ol>

            <Card padding="none">
                {step === 1 && (
                    <div className="space-y-6 p-8">
                        <div className="relative">
                            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                            <label htmlFor="emp-search" className="sr-only">Search employees</label>
                            <input
                                id="emp-search"
                                type="search"
                                placeholder="Search by name, ID or department..."
                                className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3.5 pl-12 pr-4 text-base font-medium text-white outline-none focus:border-[#00e5a0]"
                            />
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#445566]">Recent Selections</h3>
                            <ul className="space-y-3" role="list">
                                {EMPLOYEES.map((emp) => {
                                    const selected = selectedEmp?.id === emp.id;
                                    return (
                                        <li key={emp.id}>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedEmp(emp)}
                                                aria-pressed={selected}
                                                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                                                    selected
                                                        ? "border-blue-500 bg-blue-500/5"
                                                        : "border-[#1A2A3A] bg-[#060B14] hover:border-blue-500/30"
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        aria-hidden="true"
                                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] font-black text-blue-400"
                                                    >
                                                        {emp.name.split(" ").map((n) => n[0]).join("")}
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-base font-bold text-white">{emp.name}</p>
                                                        <p className="text-sm text-[#445566]">{emp.id} · {emp.designation}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight
                                                    size={18}
                                                    aria-hidden="true"
                                                    className={`transition-all ${selected ? "translate-x-1 text-blue-500" : "text-[#445566]"}`}
                                                />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 p-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="resignation-type" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Resignation Type
                                </label>
                                <select
                                    id="resignation-type"
                                    className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                >
                                    <option>Voluntary Resignation</option>
                                    <option>Termination</option>
                                    <option>Retirement</option>
                                    <option>Absconding</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="resignation-date" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Resignation Date
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                                    <input
                                        id="resignation-date"
                                        type="date"
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-4 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lwd" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Last Working Day (Proposed)
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                                    <input
                                        id="lwd"
                                        type="date"
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-4 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="exit-reason" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Exit Reason
                                </label>
                                <select
                                    id="exit-reason"
                                    className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                >
                                    <option>Better Opportunity</option>
                                    <option>Personal Reasons</option>
                                    <option>Higher Studies</option>
                                    <option>Health Issues</option>
                                    <option>Relocation</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="exit-comments" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                Detailed Comments (Internal)
                            </label>
                            <textarea
                                id="exit-comments"
                                rows={4}
                                placeholder="Enter any additional context for this exit..."
                                className="w-full resize-none rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 text-sm text-white outline-none focus:border-[#00e5a0]"
                            />
                        </div>

                        <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                            <Info size={18} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                            <p className="text-sm text-[#8899AA]">
                                All exit documentation will be sent to the employee's personal and primary email addresses
                                upon initiation.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step indicator for steps 3 & 4 */}
                {step > 2 && (
                    <div className="flex items-center justify-center p-16">
                        <Badge variant="info">Step {step} — Coming soon</Badge>
                    </div>
                )}

                {/* Footer nav */}
                <div className="flex items-center justify-between border-t border-[#1A2A3A] bg-[#060B14]/50 px-6 py-4">
                    <Button
                        variant="ghost"
                        onClick={() => setStep((s) => s - 1)}
                        disabled={step === 1}
                        className={step === 1 ? "invisible" : ""}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => step < 4 ? setStep((s) => s + 1) : undefined}
                        disabled={step === 1 && !selectedEmp}
                        iconRight={<ChevronRight size={16} aria-hidden="true" />}
                    >
                        {step === 4 ? "Confirm & Initiate" : "Continue"}
                    </Button>
                </div>
            </Card>
        </Page>
    );
}
