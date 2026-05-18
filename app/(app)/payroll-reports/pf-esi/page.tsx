"use client";

import { useState } from "react";
import { ShieldCheck, Download, Upload, AlertCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type ActiveTab = "PF" | "ESI";

interface ECRFiling {
    m: string;
    a: number;
    t: string;
    s: string;
    d: string;
}

const ECR_FILINGS: ECRFiling[] = [
    { m: "Feb 2026", a: 412000, t: "1052203014562", s: "Paid", d: "14 Mar 2026" },
    { m: "Jan 2026", a: 405500, t: "1052202021118", s: "Paid", d: "12 Feb 2026" },
    { m: "Dec 2025", a: 398000, t: "1052201089901", s: "Paid", d: "10 Jan 2026" },
];

const ECR_COLUMNS: Column<ECRFiling>[] = [
    { key: "m", label: "Wage Month", render: (r) => <span className="text-white">{r.m}</span> },
    { key: "a", label: "Amount", render: (r) => <span className="text-white">₹{r.a.toLocaleString()}</span>, sortable: true, sortValue: (r) => r.a },
    { key: "t", label: "TRRN", render: (r) => <span className="text-[#c8d8e8] font-mono">{r.t}</span>, hideOnMobile: true },
    { key: "s", label: "Status", render: (r) => <Badge variant="success">{r.s}</Badge> },
    { key: "d", label: "Paid On", render: (r) => <span className="text-[#8899AA]">{r.d}</span> },
];

export default function PFEsiScreen() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("PF");

    return (
        <Page
            title="PF & ESI Compliance Returns"
            subtitle="Generate ECR files for monthly portal uploads and track remittance status"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "PF & ESI" },
            ]}
            maxWidth="1000px"
        >
            {/* Tabs */}
            <div className="flex gap-4 border-b border-[#1A2A3A]" role="tablist" aria-label="Compliance return type">
                <button
                    role="tab"
                    aria-selected={activeTab === "PF"}
                    onClick={() => setActiveTab("PF")}
                    className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === "PF" ? "border-emerald-400 text-emerald-400" : "border-transparent text-[#8899AA] hover:text-white"}`}
                >
                    Provident Fund (EPFO)
                </button>
                <button
                    role="tab"
                    aria-selected={activeTab === "ESI"}
                    onClick={() => setActiveTab("ESI")}
                    className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === "ESI" ? "border-blue-400 text-blue-400" : "border-transparent text-[#8899AA] hover:text-white"}`}
                >
                    Employee State Insurance (ESIC)
                </button>
            </div>

            {activeTab === "PF" ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Remittance Card */}
                        <Card padding="lg" className="md:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold text-sm">March 2026 Remittance</h3>
                                <span className="text-[#c8d8e8] text-xs bg-[#1A2A3A] px-2 py-0.5 rounded font-mono">TN/MAS/0012345/000</span>
                            </div>
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="text-emerald-400 font-black text-3xl">₹4,28,450</div>
                                    <div className="text-[#8899AA] text-xs font-bold mt-1">Total PF Liability (EE + ER)</div>
                                </div>
                                <dl className="text-right text-xs text-[#8899AA] space-y-1">
                                    <div><dt className="inline">EE Share (12%): </dt><dd className="inline text-white">₹2,04,500</dd></div>
                                    <div><dt className="inline">ER Share (12%): </dt><dd className="inline text-white">₹2,04,500</dd></div>
                                    <div><dt className="inline">Admin Charges: </dt><dd className="inline text-white">₹19,450</dd></div>
                                </dl>
                            </div>
                            <div className="flex gap-2">
                                <Button icon={<Download size={14} aria-hidden="true" />} className="flex-1">
                                    Download ECR Text File
                                </Button>
                                <Button
                                    variant="secondary"
                                    icon={<Upload size={14} aria-hidden="true" />}
                                    aria-label="Upload TRRN Challan and mark as paid"
                                >
                                    Mark as Paid
                                </Button>
                            </div>
                        </Card>

                        {/* Members Card */}
                        <Card padding="lg" className="flex flex-col justify-center">
                            <div className="text-2xl font-black text-white">124</div>
                            <div className="text-[#8899AA] text-xs font-bold uppercase mt-1">Total Members</div>
                            <div className="mt-4 flex items-center justify-between text-xs border-t border-[#1A2A3A] pt-3">
                                <span className="text-emerald-400 font-bold">+5 New</span>
                                <span className="text-[#8899AA]">-2 Exited</span>
                            </div>
                        </Card>

                        {/* Alert Card */}
                        <Card padding="lg" className="border-amber-500/20 bg-amber-500/5">
                            <div className="flex gap-2 mb-2" aria-hidden="true">
                                <AlertCircle size={15} className="text-amber-400" />
                            </div>
                            <div className="text-amber-400 font-bold text-sm mb-1">Due Date Alert</div>
                            <p className="text-[#c8d8e8] text-xs">PF returns for March are due by <strong className="text-white">April 15th, 2026</strong>. Late payment will attract damages.</p>
                        </Card>
                    </div>

                    {/* ECR Filings Table */}
                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm bg-[#060D1A]">Recent ECR Filings</div>
                        <DataTable<ECRFiling>
                            data={ECR_FILINGS}
                            columns={ECR_COLUMNS}
                            rowKey={(r) => r.t}
                            aria-label="Recent ECR filings"
                        />
                    </Card>
                </div>
            ) : (
                <Card padding="lg" className="text-center py-24">
                    <ShieldCheck size={48} className="mx-auto mb-4 text-blue-400 opacity-50" aria-hidden="true" />
                    <h3 className="text-white font-bold text-lg mb-2">ESI Portal Integration Ready</h3>
                    <p className="text-[#8899AA] text-sm max-w-sm mx-auto">Generate ESI excel templates for upload exactly like the PF module. No employees currently fall under the ₹21,000 gross wage threshold for ESI applicability this month.</p>
                </Card>
            )}
        </Page>
    );
}
