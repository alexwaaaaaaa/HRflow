"use client";

import { useState } from "react";
import { FileCode2, Download, CheckCircle2, Settings, AlertTriangle } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

type GenerateStatus = "ready" | "generating" | "done";

// ─── Sub-components (module scope) ────────────────────────────────────────────

function ValidationItem({
    icon,
    title,
    desc,
    variant,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    variant: "success" | "warning";
}) {
    const cls =
        variant === "success"
            ? "bg-emerald-500/5 border-emerald-500/20"
            : "bg-amber-500/5 border-amber-500/20";
    return (
        <div className={`p-4 border rounded-xl flex items-start gap-3 ${cls}`}>
            {icon}
            <div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="text-xs text-[#8899AA] mt-1">{desc}</p>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TallyExportPage() {
    const [status, setStatus] = useState<GenerateStatus>("ready");

    const handleGenerate = () => {
        setStatus("generating");
        // Simulate async generation
        const timer = setTimeout(() => setStatus("done"), 2000);
        return () => clearTimeout(timer);
    };

    return (
        <Page
            title="Tally ERP 9 / Prime Export"
            subtitle="Generate automated Journal Vouchers (JVs) in Tally XML format."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Accounting Integration" },
            ]}
            maxWidth="1280px"
            actions={
                <Button
                    variant="secondary"
                    icon={<Settings size={14} aria-hidden="true" />}
                >
                    Setup Ledger Mapping
                </Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Generation form */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-6">Generate XML Voucher</h2>

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="tally-entity" className="block text-sm font-medium text-[#8899AA] mb-1">
                                Company Entity
                            </label>
                            <select
                                id="tally-entity"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                            >
                                <option>Kaarya Technologies Pvt Ltd (KTPL)</option>
                                <option>Kaarya Global Services (KGS)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="tally-month" className="block text-sm font-medium text-[#8899AA] mb-1">
                                    Payroll Month
                                </label>
                                <input
                                    id="tally-month"
                                    type="month"
                                    defaultValue="2026-03"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="tally-voucher-type" className="block text-sm font-medium text-[#8899AA] mb-1">
                                    Voucher Type
                                </label>
                                <select
                                    id="tally-voucher-type"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                                >
                                    <option>Journal Voucher (JV)</option>
                                    <option>Payment Voucher</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tally-date" className="block text-sm font-medium text-[#8899AA] mb-1">
                                Voucher Date
                            </label>
                            <input
                                id="tally-date"
                                type="date"
                                defaultValue="2026-03-31"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>

                        <div className="pt-4">
                            {status === "ready" && (
                                <Button
                                    className="w-full"
                                    icon={<FileCode2 size={18} aria-hidden="true" />}
                                    onClick={handleGenerate}
                                >
                                    Generate Tally XML
                                </Button>
                            )}
                            {status === "generating" && (
                                <Button className="w-full" isLoading loadingText="Compiling XML…" disabled>
                                    Compiling XML…
                                </Button>
                            )}
                            {status === "done" && (
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    icon={<CheckCircle2 size={18} aria-hidden="true" />}
                                    onClick={() => setStatus("ready")}
                                >
                                    Voucher Generated Successfully
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Validation panel */}
                <Card padding="lg" className="flex flex-col">
                    <h2 className="text-lg font-bold text-white mb-6">Ledger Mapping Validation</h2>

                    <div className="flex-1 space-y-4">
                        <ValidationItem
                            variant="success"
                            icon={<CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />}
                            title="Basic Pay & Allowances (Dr.)"
                            desc="12 distinct components mapped correctly to expenses."
                        />
                        <ValidationItem
                            variant="warning"
                            icon={<AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />}
                            title="TDS Payable (Cr.)"
                            desc="Warning: Ledger name `TDS_Salary_Payable` does not exactly match Tally master (`TDS on Salary`). Recommend fixing before import."
                        />
                        <ValidationItem
                            variant="success"
                            icon={<CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />}
                            title="Salary Payable (Cr.)"
                            desc="Net payable amount correctly mapped to liability ledger."
                        />
                    </div>

                    {status === "done" && (
                        <div className="mt-6 pt-6 border-t border-[#1A2A3A]">
                            <h3 className="text-sm font-bold text-white mb-2">Recent Exports</h3>
                            <div className="flex items-center justify-between p-3 bg-[#1A2A3A]/40 rounded-lg border border-[#2A3A4A]">
                                <div>
                                    <p className="text-white text-sm font-medium">KTPL_Payroll_JV_Mar26.xml</p>
                                    <p className="text-xs text-[#8899AA]">Generated just now · 14 KB</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Download KTPL_Payroll_JV_Mar26.xml"
                                >
                                    <Download size={18} aria-hidden="true" />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </Page>
    );
}
