"use client";

import { TrendingUp, TrendingDown, Minus, Download, Users, Wallet, CreditCard, Layers } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type Trend = "up" | "down" | "flat";

interface VarianceRow {
    id: number;
    dept: string;
    category: string;
    current: string;
    prev: string;
    varAmount: string;
    varPercent: string;
    trend: Trend;
}

// Calculation snapshot values — byte-identical after migration
// Headcount: 148 (+5 = 153 total)
// Total Gross: ₹1.15 Cr (+8.2% vs ₹1.06 Cr)
// Total Deductions: ₹22.4 L (-1.5% vs ₹22.7 L)
// Net Payout: ₹92.6 L (+9.4% vs ₹84.6 L)
const VARIANCES: VarianceRow[] = [
    { id: 1, dept: "Engineering", category: "Basic Salary", current: "₹34,50,000", prev: "₹32,10,000", varAmount: "+₹2,40,000", varPercent: "+7.48%", trend: "up" },
    { id: 2, dept: "Sales", category: "Incentives/Bonus", current: "₹8,25,000", prev: "₹4,10,000", varAmount: "+₹4,15,000", varPercent: "+101.2%", trend: "up" },
    { id: 3, dept: "Marketing", category: "Loss of Pay", current: "₹45,000", prev: "₹85,000", varAmount: "-₹40,000", varPercent: "-47.05%", trend: "down" },
    { id: 4, dept: "Operations", category: "Overtime", current: "₹1,20,000", prev: "₹1,20,000", varAmount: "₹0", varPercent: "0.00%", trend: "flat" },
    { id: 5, dept: "HR & Admin", category: "Basic Salary", current: "₹8,50,000", prev: "₹8,80,000", varAmount: "-₹30,000", varPercent: "-3.40%", trend: "down" },
];

const KPI_CARDS = [
    {
        label: "Headcount Processed",
        value: "148",
        delta: "+5",
        deltaNote: "(153 total)",
        deltaColor: "text-[#00E5A0]",
        icon: Users,
        iconColor: "text-[#0066FF]",
        iconBg: "bg-[#0066FF]/10",
        alert: false,
    },
    {
        label: "Total Gross Earnings",
        value: "₹1.15 Cr",
        delta: "+8.2%",
        deltaNote: "vs ₹1.06 Cr",
        deltaColor: "text-[#FFB800]",
        icon: Wallet,
        iconColor: "text-[#FFB800]",
        iconBg: "bg-[#FFB800]/10",
        alert: true,
    },
    {
        label: "Total Deductions",
        value: "₹22.4 L",
        delta: "-1.5%",
        deltaNote: "vs ₹22.7 L",
        deltaColor: "text-[#00E5A0]",
        icon: Layers,
        iconColor: "text-[#FF4444]",
        iconBg: "bg-[#FF4444]/10",
        alert: false,
    },
    {
        label: "Net Payout",
        value: "₹92.6 L",
        delta: "+9.4%",
        deltaNote: "vs ₹84.6 L",
        deltaColor: "text-[#00E5A0]",
        icon: CreditCard,
        iconColor: "text-[#00E5A0]",
        iconBg: "bg-[#00E5A0]/10",
        alert: false,
    },
] as const;

const TREND_ICON: Record<Trend, React.ReactNode> = {
    up: <TrendingUp size={13} aria-hidden="true" />,
    down: <TrendingDown size={13} aria-hidden="true" />,
    flat: <Minus size={13} aria-hidden="true" />,
};

const TREND_BADGE: Record<Trend, "warning" | "success" | "neutral"> = {
    up: "warning",
    down: "success",
    flat: "neutral",
};

function getVarColor(row: VarianceRow): string {
    if (row.trend === "up" && row.category !== "Loss of Pay") return "text-[#FFB800]";
    if (row.trend === "down" && row.category === "Loss of Pay") return "text-[#00E5A0]";
    return "text-[#c8d8e8]";
}

const COLUMNS: Column<VarianceRow>[] = [
    {
        key: "dept",
        label: "Department",
        render: (r) => <span className="font-medium text-[#c8d8e8]">{r.dept}</span>,
        sortable: true,
        sortValue: (r) => r.dept,
    },
    {
        key: "category",
        label: "Category Component",
        render: (r) => <span className="font-medium text-white">{r.category}</span>,
    },
    {
        key: "current",
        label: "March 25 (Curr)",
        align: "right",
        render: (r) => <span className="font-mono font-bold text-white">{r.current}</span>,
    },
    {
        key: "prev",
        label: "Feb 25 (Prev)",
        align: "right",
        render: (r) => <span className="font-mono text-[#8899AA]">{r.prev}</span>,
        hideOnMobile: true,
    },
    {
        key: "varAmount",
        label: "Absolute Variance",
        align: "right",
        render: (r) => <span className={`font-mono font-medium ${getVarColor(r)}`}>{r.varAmount}</span>,
    },
    {
        key: "varPercent",
        label: "% Variance",
        align: "right",
        render: (r) => <span className={`font-medium ${getVarColor(r)}`}>{r.varPercent}</span>,
    },
    {
        key: "trend",
        label: "Trend",
        align: "center",
        render: (r) => (
            <Badge variant={TREND_BADGE[r.trend]}>
                {TREND_ICON[r.trend]}
            </Badge>
        ),
    },
];

export default function PayrollComparisonPage() {
    return (
        <Page
            title="Payroll Month-over-Month Comparison"
            subtitle="Identify anomalies and validate variances before finalizing the current cycle."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Comparison" },
            ]}
            maxWidth="1400px"
            actions={
                <div className="flex gap-3 text-sm flex-wrap">
                    <div className="flex items-center gap-2 bg-[#060B14] border border-[#1A2A3A] px-3 py-1.5 rounded-lg">
                        <span className="text-[#8899AA]">Base:</span>
                        <select className="bg-transparent text-white outline-none font-medium appearance-none" aria-label="Base month">
                            <option>Feb 2025</option>
                        </select>
                    </div>
                    <span className="flex items-center text-[#8899AA] font-bold px-1">VS</span>
                    <div className="flex items-center gap-2 bg-[#060B14] border border-[#1A2A3A] px-3 py-1.5 rounded-lg">
                        <span className="text-[#8899AA]">Compare:</span>
                        <select className="bg-transparent text-white outline-none font-medium appearance-none" aria-label="Comparison month">
                            <option>March 2025 (Draft)</option>
                        </select>
                    </div>
                </div>
            }
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPI_CARDS.map((kpi) => (
                    <Card key={kpi.label} padding="md" className="relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm text-[#8899AA] font-medium">{kpi.label}</p>
                            <div className={`p-1.5 ${kpi.iconBg} rounded-lg`} aria-hidden="true">
                                <kpi.icon size={14} className={kpi.iconColor} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-white">{kpi.value}</p>
                        <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${kpi.deltaColor}`}>
                            <TrendingUp size={13} aria-hidden="true" />
                            {kpi.delta}
                            <span className="text-[#8899AA] font-normal ml-1">{kpi.deltaNote}</span>
                        </div>
                        {kpi.alert && (
                            <div
                                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#FF4444] animate-pulse"
                                role="status"
                                aria-label="High variance alert"
                            />
                        )}
                    </Card>
                ))}
            </div>

            {/* Variance Table */}
            <Card padding="none">
                <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]">
                    <h3 className="font-semibold text-white">Detailed Variance Breakdown</h3>
                    <Button variant="secondary" size="sm" icon={<Download size={14} aria-hidden="true" />}>
                        Export Excel
                    </Button>
                </div>
                <DataTable<VarianceRow>
                    data={VARIANCES}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    aria-label="Payroll variance breakdown by department and category"
                />
                <div className="p-4 border-t border-[#1A2A3A] text-xs text-[#8899AA] text-right">
                    Threshold alert configured at &gt;15% variance.
                </div>
            </Card>
        </Page>
    );
}
