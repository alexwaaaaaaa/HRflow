"use client";

import { XCircle, Calendar, AlertTriangle, Send, ShieldCheck, Mail, Briefcase, CheckCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface QuickCheck {
    text: string;
    status: "Yes" | "No";
    icon: typeof ShieldCheck;
    iconClass: string;
}

const QUICK_CHECKS: QuickCheck[] = [
    { text: "Is replacement hired?", status: "No", icon: Briefcase, iconClass: "text-[#445566]" },
    { text: "All assets tagged?", status: "Yes", icon: ShieldCheck, iconClass: "text-emerald-500" },
    { text: "Email Forwarding Set?", status: "No", icon: Mail, iconClass: "text-[#445566]" },
];

interface NextStep {
    step: number;
    label: string;
    active: boolean;
}

const NEXT_STEPS: NextStep[] = [
    { step: 1, label: "Resignation Accepted", active: true },
    { step: 2, label: "Notice Period Initiation", active: false },
    { step: 3, label: "Clearance Workflow", active: false },
    { step: 4, label: "Final Settlement Payout", active: false },
];

export default function ResignationAcceptance() {
    return (
        <Page
            title="Accept Resignation"
            subtitle="Employee: Arnab Das (EMP-771)"
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Resignation", href: "/fnf/resignation/EMP-771" },
                { label: "Acceptance" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                {/* Main Form */}
                <div className="space-y-6 lg:col-span-3">
                    <Card padding="lg">
                        <div className="space-y-6">
                            <h3 className="border-l-4 border-blue-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                LWD Configuration
                            </h3>

                            <div className="space-y-2">
                                <label htmlFor="lwd-confirm" className="text-xs font-bold uppercase tracking-tight text-[#8899AA]">
                                    Confirmation of Last Working Day (LWD)
                                </label>
                                <div className="relative">
                                    <Calendar
                                        size={18}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                                        aria-hidden="true"
                                    />
                                    <input
                                        id="lwd-confirm"
                                        type="date"
                                        defaultValue="2024-04-24"
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3.5 pl-12 pr-4 font-bold text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-[#445566]">
                                    * Based on 90-day notice period policy
                                </p>
                            </div>

                            <div className="space-y-3 border-t border-[#1A2A3A] pt-4">
                                <label htmlFor="acceptance-message" className="text-xs font-bold uppercase tracking-tight text-[#8899AA]">
                                    Exit Confirmation Details
                                </label>
                                <textarea
                                    id="acceptance-message"
                                    placeholder="Enter formal acceptance message to be sent to employee..."
                                    rows={5}
                                    className="w-full resize-none rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 text-sm leading-relaxed text-white outline-none focus:border-[#00e5a0]"
                                    defaultValue="We formally accept your resignation. We appreciate your contributions during your tenure and wish you the best for your future endeavors. Please ensure a smooth transition of your current responsibilities."
                                />
                            </div>

                            <div className="flex gap-4 border-t border-[#1A2A3A] pt-4">
                                <Button
                                    variant="primary"
                                    icon={<Send size={18} aria-hidden="true" />}
                                    className="flex-1"
                                >
                                    Confirm &amp; Send Acceptance
                                </Button>
                                <Button
                                    variant="danger"
                                    icon={<XCircle size={18} aria-hidden="true" />}
                                >
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Info Column */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="md">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                            <AlertTriangle size={14} aria-hidden="true" /> Quick Check
                        </h3>
                        <ul className="space-y-3" role="list">
                            {QUICK_CHECKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li
                                        key={item.text}
                                        className="flex items-center justify-between border-b border-[#1A2A3A]/50 py-2 text-xs font-bold"
                                    >
                                        <div className="flex items-center gap-2 text-[#8899AA]">
                                            <Icon size={14} className={item.iconClass} aria-hidden="true" />
                                            {item.text}
                                        </div>
                                        <Badge variant={item.status === "Yes" ? "success" : "neutral"}>
                                            {item.status}
                                        </Badge>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 text-sm font-bold text-white">Next Steps</h3>
                        <ol className="space-y-4" role="list">
                            {NEXT_STEPS.map((s) => (
                                <li
                                    key={s.step}
                                    className={`flex items-center gap-3 ${s.active ? "opacity-100" : "opacity-40"}`}
                                    aria-current={s.active ? "step" : undefined}
                                >
                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black ${
                                            s.active ? "bg-blue-600 text-white" : "bg-[#1A2A3A] text-[#445566]"
                                        }`}
                                    >
                                        {s.active ? <CheckCircle size={14} aria-hidden="true" /> : s.step}
                                    </div>
                                    <span className="text-xs font-bold text-[#8899AA]">{s.label}</span>
                                </li>
                            ))}
                        </ol>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
