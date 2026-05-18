"use client";

import {
    FileText, ShieldCheck, Download, Link as LinkIcon, Info, Landmark, CheckCircle, HelpCircle,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface WithdrawalForm {
    form: string;
    desc: string;
    icon: typeof FileText;
    color: string;
}

const WITHDRAWAL_FORMS: WithdrawalForm[] = [
    { form: "Form 19", desc: "Final Settlement of EPF Account", icon: FileText, color: "text-blue-500" },
    { form: "Form 10C", desc: "Withdrawal Benefit (Pension Fund)", icon: FileText, color: "text-emerald-500" },
    { form: "Form 15G", desc: "Declaration for No TDS Deduction", icon: FileText, color: "text-amber-500" },
    { form: "Composite Claim Form", desc: "Aadhaar-based unified withdrawal", icon: ShieldCheck, color: "text-indigo-500" },
];

interface FaqItem {
    q: string;
    a: string;
}

const FAQ_ITEMS: FaqItem[] = [
    { q: "Waiting Period", a: "60 days of unemployment is required for full withdrawal." },
    { q: "TDS on PF", a: "TDS applies if service is < 5 yrs and amount > ₹50k." },
    { q: "Aadhaar Linking", a: "Must be seeded for online claim (UMANG/Portal)." },
];

export default function PFWithdrawal() {
    return (
        <Page
            title="PF Withdrawal Support"
            subtitle="Assist employees in initiating EPF withdrawal claims."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "PF Withdrawal" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                {/* Withdrawal Process */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg">
                        <div className="space-y-8">
                            {/* Employee Header */}
                            <div className="flex items-center gap-6 border-b border-[#1A2A3A] pb-6">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] text-2xl font-black text-emerald-500">
                                    AD
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-black uppercase tracking-tight text-white">Arnab Das</h2>
                                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                        UAN: 100982121021 · MEMBER ID: DL/CPM/0029/982
                                    </p>
                                </div>
                                <Badge variant="success">UAN Active &amp; Aadhaar Seeded</Badge>
                            </div>

                            {/* Forms */}
                            <div className="space-y-4">
                                <h3 className="border-l-4 border-blue-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Mandatory Forms (Digital Signature Ready)
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {WITHDRAWAL_FORMS.map((f) => {
                                        const Icon = f.icon;
                                        return (
                                            <div
                                                key={f.form}
                                                className="flex cursor-pointer items-start gap-4 rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-5 transition-colors hover:border-blue-500/30"
                                            >
                                                <Icon size={20} className={`${f.color} mt-1 shrink-0`} aria-hidden="true" />
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-tight text-white">{f.form}</p>
                                                    <p className="mt-1 text-[10px] leading-relaxed text-[#445566]">{f.desc}</p>
                                                    <Button variant="ghost" size="sm" icon={<Download size={10} aria-hidden="true" />} className="mt-2 text-[9px]">
                                                        Pre-fill &amp; Download
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Last Contribution */}
                            <div className="flex items-center justify-between rounded-2xl border border-l-4 border-[#1A2A3A] border-l-blue-500 bg-[#060B14] p-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-blue-500/10 p-2 text-blue-500">
                                        <Landmark size={20} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-tight text-white">Last Employer Contribution</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                            MTD: ₹18,402.00 · ECR Submitted (Mar 24)
                                        </p>
                                    </div>
                                </div>
                                <CheckCircle size={16} className="text-emerald-500" aria-label="Verified" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* FAQ & Guidelines */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg">
                        <h3 className="mb-6 border-b border-[#1A2A3A] pb-4 text-center text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                            Withdrawal Guidelines
                        </h3>
                        <div className="space-y-6">
                            {FAQ_ITEMS.map((faq) => (
                                <div key={faq.q} className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <HelpCircle size={14} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                                        <span className="text-[11px] font-black uppercase tracking-tight text-white">{faq.q}</span>
                                    </div>
                                    <p className="ml-5 border-l border-[#1A2A3A] pl-3 text-[10px] font-bold leading-relaxed text-[#445566]">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            icon={<LinkIcon size={14} aria-hidden="true" />}
                            className="mt-6 w-full"
                        >
                            Unified Portal (EPFO)
                        </Button>
                    </Card>

                    <div className="flex gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">
                        <Info size={18} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                        <p className="text-[10px] font-medium uppercase leading-relaxed tracking-tight text-[#445566]">
                            Inform employee to check UAN portal 2 months after LWD to initiate online withdrawal. Claims
                            submitted through HR portal are only for manual processing.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
