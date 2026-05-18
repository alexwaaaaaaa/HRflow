"use client";

import { PieChart, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

interface Department {
    name: string;
    code: string;
    count: number;
    amount: number;
    barColor: string;
}

const DEPARTMENTS: Department[] = [
    { name: "Engineering", code: "CC-ENG", count: 145, amount: 24500000, barColor: "bg-emerald-500" },
    { name: "Sales", code: "CC-SLS", count: 82, amount: 11200000, barColor: "bg-blue-500" },
    { name: "Marketing", code: "CC-MKT", count: 45, amount: 4800000, barColor: "bg-purple-500" },
    { name: "Finance", code: "CC-FIN", count: 35, amount: 3900000, barColor: "bg-amber-500" },
    { name: "Human Resources", code: "CC-HR", count: 35, amount: 3100000, barColor: "bg-rose-500" },
];

export default function CostCenterScreen() {
    const total = DEPARTMENTS.reduce((s, d) => s + d.amount, 0);

    return (
        <Page
            title="Cost Center Report"
            subtitle="Payroll expense allocation by department & cost center for accounting entries."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "Cost Center" },
            ]}
            maxWidth="1000px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>
                    Tally/QuickBooks Export
                </Button>
            }
        >
            <div className="grid md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <Card padding="lg">
                    <h3 className="text-white font-bold mb-6 text-center">Cost Allocation (March 2026)</h3>
                    <div className="space-y-4" role="list" aria-label="Department cost allocation">
                        {DEPARTMENTS.map((d) => {
                            const pct = (d.amount / total) * 100;
                            return (
                                <div key={d.code} role="listitem">
                                    <div className="flex justify-between items-end mb-1">
                                        <div>
                                            <span className="text-white font-semibold text-sm mr-2">{d.name}</span>
                                            <span className="text-[#8899AA] text-[10px] bg-[#1A2A3A] px-1.5 py-0.5 rounded font-mono">{d.code}</span>
                                        </div>
                                        <span className="text-[#c8d8e8] text-xs font-bold">₹{(d.amount / 100000).toFixed(2)}L</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                                            role="progressbar"
                                            aria-valuenow={Math.round(pct)}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${d.name}: ${pct.toFixed(1)}%`}
                                        >
                                            <div className={`h-full ${d.barColor} rounded-full`} style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-xs text-[#8899AA] w-10 text-right">{pct.toFixed(1)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Donut Summary */}
                <Card padding="lg" className="flex flex-col items-center justify-center text-center">
                    <div
                        className="w-48 h-48 rounded-full border-[16px] border-[#1A2A3A] flex items-center justify-center relative shadow-inner shadow-black/50 mb-6"
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-emerald-500 border-r-emerald-500 -rotate-45" />
                        <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-b-blue-500 border-l-blue-500 rotate-12" />
                        <div>
                            <div className="text-[#8899AA] text-[10px] uppercase font-bold tracking-wider mb-1">Total Payload</div>
                            <div className="text-2xl font-black text-white">₹{(total / 10000000).toFixed(2)} Cr</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2" aria-hidden="true">
                        <PieChart size={18} className="text-[#00E5A0]" />
                        <span className="text-white font-semibold">Total: ₹{(total / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <p className="text-[#8899AA] text-sm max-w-xs">
                        Export this consolidated report directly into your accounting software to map expenses automatically to general ledgers.
                    </p>
                </Card>
            </div>
        </Page>
    );
}
