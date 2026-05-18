"use client";
import { Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

const MONTHLY_DATA = [
    { month: "Apr", medical: 42000, lta: 0, fuel: 18500, internet: 14400, other: 8200 },
    { month: "May", medical: 31000, lta: 0, fuel: 22000, internet: 14400, other: 5600 },
    { month: "Jun", medical: 55000, lta: 125000, fuel: 19500, internet: 14400, other: 7100 },
    { month: "Jul", medical: 28000, lta: 0, fuel: 21000, internet: 14400, other: 6800 },
    { month: "Aug", medical: 63000, lta: 0, fuel: 24000, internet: 14400, other: 9200 },
    { month: "Sep", medical: 44000, lta: 220000, fuel: 18000, internet: 14400, other: 7500 },
    { month: "Oct", medical: 38000, lta: 0, fuel: 20000, internet: 14400, other: 6200 },
    { month: "Nov", medical: 52000, lta: 0, fuel: 23500, internet: 14400, other: 8900 },
    { month: "Dec", medical: 71000, lta: 0, fuel: 26000, internet: 14400, other: 11200 },
    { month: "Jan", medical: 45000, lta: 0, fuel: 19000, internet: 14400, other: 7300 },
    { month: "Feb", medical: 39000, lta: 0, fuel: 22500, internet: 14400, other: 8100 },
    { month: "Mar", medical: 28400, lta: 0, fuel: 17000, internet: 9000, other: 5200 },
];

const SUMMARY_CARDS = [
    { label: "Medical", value: "₹5.36L", colorClass: "text-rose-400" },
    { label: "LTA", value: "₹3.45L", colorClass: "text-amber-400" },
    { label: "Fuel", value: "₹2.51L", colorClass: "text-blue-400" },
    { label: "Internet", value: "₹1.59L", colorClass: "text-teal-400" },
    { label: "Others", value: "₹0.91L", colorClass: "text-[#8899AA]" },
] as const;

const LEGEND_ITEMS = [
    { cls: "bg-rose-500/70", label: "Medical" },
    { cls: "bg-amber-500/70", label: "LTA" },
    { cls: "bg-blue-500/60", label: "Fuel" },
    { cls: "bg-teal-500/60", label: "Internet" },
    { cls: "bg-[#8899AA]/40", label: "Others" },
] as const;

interface MonthRow {
    month: string;
    medical: number;
    lta: number;
    fuel: number;
    internet: number;
    other: number;
}

const tableColumns: Column<MonthRow>[] = [
    {
        key: "month",
        label: "Month",
        render: (row) => <span className="font-semibold text-white">{row.month} 2026</span>,
    },
    {
        key: "medical",
        label: "Medical",
        render: (row) => <span className="text-rose-400">₹{row.medical.toLocaleString()}</span>,
    },
    {
        key: "lta",
        label: "LTA",
        render: (row) => <span className="text-amber-400">₹{row.lta.toLocaleString()}</span>,
    },
    {
        key: "fuel",
        label: "Fuel",
        render: (row) => <span className="text-blue-400">₹{row.fuel.toLocaleString()}</span>,
    },
    {
        key: "internet",
        label: "Internet",
        render: (row) => <span className="text-teal-400">₹{row.internet.toLocaleString()}</span>,
    },
    {
        key: "total",
        label: "Total",
        render: (row) => {
            const total = row.medical + row.lta + row.fuel + row.internet + row.other;
            return <span className="font-bold text-white">₹{total.toLocaleString()}</span>;
        },
    },
];

export default function ReimbursementReportsPage() {
    const total = MONTHLY_DATA.reduce(
        (s, m) => s + m.medical + m.lta + m.fuel + m.internet + m.other,
        0
    );
    const maxVal = Math.max(
        ...MONTHLY_DATA.map((m) => m.medical + m.lta + m.fuel + m.internet + m.other)
    );

    return (
        <Page
            title="Reimbursement Reports"
            subtitle="Monthly and annual summary of all reimbursement payouts across the organization"
            breadcrumbs={[
                { label: "Reimbursements", href: "/reimbursements/dashboard" },
                { label: "Reports" },
            ]}
            maxWidth="1200px"
            actions={
                <Button
                    variant="secondary"
                    icon={<Download size={16} aria-hidden="true" />





}
                >
                    Export Report
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                    {SUMMARY_CARDS.map((card) => (
                        <Card key={card.label} padding="md">
                            <div className={`text-center text-xl font-black ${card.colorClass}`}>
                                {card.value}
                            </div>
                            <div className="mt-1 text-center text-xs text-[#8899AA]">
                                {card.label} (YTD)
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Chart */}
                <Card padding="lg">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-white">Monthly Payout — FY 2025-26</h3>
                        <div className="text-xl font-black text-violet-400">
                            ₹{(total / 100000).toFixed(2)}L Total
                        </div>
                    </div>
                    <div className="flex h-48 items-end gap-2">
                        {MONTHLY_DATA.map((m) => {
                            const totalMonth = m.medical + m.lta + m.fuel + m.internet + m.other;
                            const pct = (totalMonth / maxVal) * 100;
                            return (
                                <div key={m.month} className="group flex flex-1 flex-col items-center gap-1">
                                    <div className="text-[10px] text-[#556677] opacity-0 transition-opacity group-hover:opacity-100">
                                        ₹{(totalMonth / 1000).toFixed(0)}k
                                    </div>
                                    <div
                                        className="w-full overflow-hidden rounded-t-lg"
                                        style={{ height: `${pct * 1.7}px` }}
                                    >
                                        <div className="flex h-full w-full flex-col">
                                            <div
                                                className="bg-[#8899AA]/40"
                                                style={{ flex: m.other / totalMonth }}
                                            />
                                            <div
                                                className="bg-teal-500/60"
                                                style={{ flex: m.internet / totalMonth }}
                                            />
                                            <div
                                                className="bg-blue-500/60"
                                                style={{ flex: m.fuel / totalMonth }}
                                            />
                                            <div
                                                className="bg-amber-500/70"
                                                style={{ flex: m.lta / totalMonth }}
                                            />
                                            <div
                                                className="bg-rose-500/70"
                                                style={{ flex: m.medical / totalMonth }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-[#556677]">{m.month}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                        {LEGEND_ITEMS.map(({ cls, label }) => (
                            <div key={label} className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                                <div className={`h-3 w-3 rounded-sm ${cls}`} aria-hidden="true" />
                                {label}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Table */}
                <DataTable<MonthRow>
                    data={MONTHLY_DATA}
                    columns={tableColumns}
                    rowKey={(row) => row.month}
                    aria-label="Monthly reimbursement payouts"
                />
            </div>
        

        

        

        </Page>
    );
}
