"use client";

import { Download, Filter, TrendingUp, TrendingDown, Layers } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend } from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const COST_TREND = [
    { month: "Oct", fixed: 85, variable: 12, compliance: 8 },
    { month: "Nov", fixed: 86, variable: 14, compliance: 8 },
    { month: "Dec", fixed: 86, variable: 22, compliance: 9 },
    { month: "Jan", fixed: 88, variable: 15, compliance: 8.5 },
    { month: "Feb", fixed: 88, variable: 13, compliance: 8.5 },
    { month: "Mar", fixed: 92, variable: 14, compliance: 9 },
];

const DEPT_COST = [
    { name: "Engineering", cost: 45 },
    { name: "Sales", cost: 25 },
    { name: "Marketing", cost: 12 },
    { name: "Ops & Support", cost: 18 },
    { name: "HR & Finance", cost: 10 },
];

interface CostRow {
    id: string;
    center: string;
    basic: string;
    allowances: string;
    variable: string;
    epf: string;
    total: string;
}

const COST_ROWS: CostRow[] = [
    {
        id: "eng-fe",
        center: "Engineering - Frontend",
        basic: "₹1,240,000",
        allowances: "₹650,000",
        variable: "₹120,000",
        epf: "₹85,000",
        total: "₹2,095,000",
    },
    {
        id: "eng-be",
        center: "Engineering - Backend",
        basic: "₹1,450,000",
        allowances: "₹720,000",
        variable: "₹150,000",
        epf: "₹98,000",
        total: "₹2,418,000",
    },
    {
        id: "sal-ent",
        center: "Sales - Enterprise",
        basic: "₹850,000",
        allowances: "₹320,000",
        variable: "₹850,000",
        epf: "₹65,000",
        total: "₹2,085,000",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PayrollCostReportPage() {
    return (
        <Page
            title="Payroll Cost Analytics"
            subtitle="Analyze fixed vs variable compensation, departmental burn, and statutory costs."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Payroll Cost" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        Last 6 Months
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Report</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Total Payroll Cost (Mar)</p>
                        <p className="text-3xl font-bold text-white flex items-baseline gap-2">
                            ₹1.15 Cr
                            <span className="text-xs text-pink-400 flex items-center">
                                <TrendingUp size={12} aria-hidden="true" className="mr-0.5" />
                                4.2%
                            </span>
                        </p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Fixed vs Variable</p>
                        <p className="text-3xl font-bold text-emerald-400 mb-1">80 : 20</p>
                        <p className="text-xs text-[#8899AA]">Healthy mix target</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Statutory Contributions</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">₹9.0 L</p>
                        <p className="text-xs text-[#8899AA]">PF, ESI, Gratuity Accruals</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Cost Per Employee (Avg)</p>
                        <p className="text-3xl font-bold text-indigo-400 mb-1">₹3.8 L</p>
                        <p className="text-xs text-emerald-400 flex items-center">
                            <TrendingDown size={12} aria-hidden="true" className="mr-0.5" />
                            -1.1% from prev qtr
                        </p>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Layers size={18} className="text-indigo-400" aria-hidden="true" />
                            Cost Composition Trend (in Lakhs)
                        </h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <AreaChart
                                    data={COST_TREND}
                                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                    <YAxis stroke="#8899AA" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: "10px" }} />
                                    <Area
                                        type="monotone"
                                        dataKey="fixed"
                                        name="Fixed Pay"
                                        stackId="1"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.6}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="variable"
                                        name="Variable Pay"
                                        stackId="1"
                                        stroke="#10b981"
                                        fill="#10b981"
                                        fillOpacity={0.6}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="compliance"
                                        name="Statutory & Benefits"
                                        stackId="1"
                                        stroke="#f59e0b"
                                        fill="#f59e0b"
                                        fillOpacity={0.6}
                                    />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Departmental Burn (in Lakhs)</h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={DEPT_COST}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                    <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#8899AA"
                                        fontSize={12}
                                        width={100}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="cost" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={25} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </div>

                {/* Cost center grid */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h2 className="text-sm font-bold text-white">Cost Center Breakdown Grid</h2>
                        <div>
                            <label htmlFor="cost-month" className="sr-only">
                                Select month
                            </label>
                            <select
                                id="cost-month"
                                className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1 focus:outline-none focus:border-[#00e5a0]"
                            >
                                <option>March 2026</option>
                                <option>February 2026</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table
                            className="w-full text-right"
                            aria-label="Cost center breakdown"
                        >
                            <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                                <tr>
                                    <th scope="col" className="p-4 font-medium text-left">
                                        Cost Center / Sub-Dept
                                    </th>
                                    <th scope="col" className="p-4 font-medium">Basic &amp; HRA</th>
                                    <th scope="col" className="p-4 font-medium">Allowances</th>
                                    <th scope="col" className="p-4 font-medium">Variable/Bonus</th>
                                    <th scope="col" className="p-4 font-medium">Employer EPF/ESI</th>
                                    <th scope="col" className="p-4 font-medium text-white font-bold bg-[#1A2A3A]">
                                        Total Cost (CTC)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] text-sm font-mono">
                                {COST_ROWS.map((row) => (
                                    <tr key={row.id} className="hover:bg-[#1A2A3A]/30">
                                        <td className="p-4 text-left font-sans font-medium text-white">
                                            {row.center}
                                        </td>
                                        <td className="p-4">{row.basic}</td>
                                        <td className="p-4">{row.allowances}</td>
                                        <td className="p-4">{row.variable}</td>
                                        <td className="p-4">{row.epf}</td>
                                        <td className="p-4 text-emerald-400 font-bold bg-[#1A2A3A]/10">
                                            {row.total}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-[#1A2A3A]/50 text-white font-bold text-sm font-mono border-t-2 border-[#2A3A4A]">
                                <tr>
                                    <td className="p-4 text-left font-sans">Grand Total</td>
                                    <td className="p-4">₹3,540,000</td>
                                    <td className="p-4">₹1,690,000</td>
                                    <td className="p-4">₹1,120,000</td>
                                    <td className="p-4">₹248,000</td>
                                    <td className="p-4 text-emerald-400 bg-[#1A2A3A]/20">₹6,598,000</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
