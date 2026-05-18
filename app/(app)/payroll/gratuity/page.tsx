"use client";

import { Clock, Info, ShieldCheck, Download, Filter } from "lucide-react";
import { AreaChart, Area, Tooltip } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

const ACCRUAL_DATA = [
    { name: "Apr", provision: 40000 },
    { name: "May", provision: 42000 },
    { name: "Jun", provision: 45000 },
    { name: "Jul", provision: 48000 },
    { name: "Aug", provision: 55000 },
    { name: "Sep", provision: 62000 },
    { name: "Oct", provision: 68000 },
    { name: "Nov", provision: 70000 },
    { name: "Dec", provision: 75000 },
    { name: "Jan", provision: 80000 },
    { name: "Feb", provision: 85000 },
    { name: "Mar", provision: 90000 },
];

interface EmpRow {
    id: string;
    name: string;
    doj: string;
    service: string;
    basic: number;
    monthly: number;
    cum: number;
    status: "Eligible" | "Accruing" | "Soon";
    prog?: number;
}

const EMPLOYEES: EmpRow[] = [
    { id: "EMP002", name: "Priya Sharma", doj: "01/06/2019", service: "5.8 yrs", basic: 28000, monthly: 1346, cum: 78340, status: "Eligible" },
    { id: "EMP014", name: "Vikram Mehta", doj: "10/02/2020", service: "5.1 yrs", basic: 45000, monthly: 2163, cum: 110334, status: "Eligible" },
    { id: "EMP081", name: "Rajesh Kumar", doj: "15/08/2021", service: "3.6 yrs", basic: 40000, monthly: 1923, cum: 83076, status: "Accruing", prog: 72 },
    { id: "EMP091", name: "Kavya Nair", doj: "12/11/2022", service: "2.4 yrs", basic: 50000, monthly: 2403, cum: 69207, status: "Accruing", prog: 48 },
    { id: "EMP093", name: "Amit Verma", doj: "01/07/2020", service: "4.7 yrs", basic: 35000, monthly: 1682, cum: 94749, status: "Soon", prog: 94 },
];

const STATUS_VARIANT = {
    Eligible: "success",
    Accruing: "neutral",
    Soon: "warning",
} as const;

const COLUMNS: Column<EmpRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (e) => (
            <div>
                <p className="font-medium text-white">{e.name}</p>
                <p className="text-xs text-[#8899AA]">{e.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (e) => e.name,
    },
    {
        key: "doj",
        label: "DOJ",
        render: (e) => <span className="text-sm text-[#8899AA]">{e.doj}</span>,
        hideOnMobile: true,
    },
    {
        key: "service",
        label: "Service (Yrs)",
        render: (e) => <span className="font-medium text-white">{e.service}</span>,
    },
    {
        key: "basic",
        label: "Basic (₹)",
        align: "right",
        render: (e) => <span className="text-sm text-white">{e.basic.toLocaleString()}</span>,
    },
    {
        key: "monthly",
        label: "Mthly Prov. (₹)",
        align: "right",
        render: (e) => <span className="text-sm text-[#8899AA]">{e.monthly.toLocaleString()}</span>,
        hideOnMobile: true,
    },
    {
        key: "cum",
        label: "Cumulative (₹)",
        align: "right",
        render: (e) => <span className="font-semibold text-white">{e.cum.toLocaleString()}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (e) => (
            <div className="flex items-center gap-2">
                <Badge variant={STATUS_VARIANT[e.status]}>
                    {e.status === "Eligible" ? "Payable on Exit" : e.status === "Soon" ? "3m to Go" : "Accruing"}
                </Badge>
                {e.prog !== undefined && (
                    <div className="h-1 w-10 rounded-full bg-[#1A2A3A]">
                        <div
                            className="h-1 rounded-full"
                            style={{
                                width: `${e.prog}%`,
                                background: e.status === "Soon" ? "#FFB800" : "#334455",
                            }}
                        />
                    </div>
                )}
            </div>
        ),
    },
];

export default function GratuityProvisionPage() {
    return (
        <Page
            title="Gratuity Provision Management"
            subtitle="Auto-calculated (Basic × 15/26 × Yrs)"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Gratuity" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export Register
                    </Button>
                    <Button>Process Final Settlement</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Provision (Accrued)</p>
                        <p className="mt-2 text-2xl font-semibold text-[#00E5A0]">₹48,23,500</p>
                        <p className="mt-1 text-xs text-[#00E5A0]">+4.2% from last month</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">FY 2024-25 Provision (YTD)</p>
                        <p className="mt-2 text-2xl font-semibold text-white">₹8,40,600</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Since April 2024</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Eligible Employees</p>
                        <p className="mt-2 text-2xl font-semibold text-white">87</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Completed 4yrs 240 days</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Next Eligibility</p>
                        <p className="mt-2 text-base font-medium text-white">Amit Verma (EMP093)</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#FFB800]">
                            <Clock size={11} aria-hidden="true" /> Due in 3 months
                        </p>
                    </Card>
                </div>

                {/* Trust Status Banner */}
                <Card padding="md">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(0,229,160,0.1)] text-[#00E5A0]">
                                <ShieldCheck size={24} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white">Gratuity Trust Fund Linking</h3>
                                <div className="flex gap-4 text-sm text-[#8899AA]">
                                    <span>Provisioned: ₹48,23,500</span>
                                    <span>External Trust: <span className="text-red-400">Not Linked</span></span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            Setup Group Gratuity Insurance (LIC)
                        </Button>
                    </div>
                </Card>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    {/* Table */}
                    <Card padding="none" aria-labelledby="gratuity-register-heading">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A2A3A] px-6 py-4">
                            <h3 id="gratuity-register-heading" className="text-base font-semibold text-white">
                                Employee Eligibility &amp; Provision Register
                            </h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search employee..."
                                    aria-label="Search employee"
                                    className="h-9 w-48 rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                />
                                <Button variant="secondary" size="sm" icon={<Filter size={12} aria-hidden="true" />}>
                                    Filter
                                </Button>
                            </div>
                        </div>
                        <DataTable<EmpRow>
                            data={EMPLOYEES}
                            columns={COLUMNS}
                            rowKey={(e) => e.id}
                            aria-label="Gratuity provision register"
                            emptyTitle="No employees found"
                        />
                    </Card>

                    {/* Chart */}
                    <Card padding="lg">
                        <h3 className="mb-5 text-sm text-[#8899AA]">Monthly Accrual Trend</h3>
                        <ChartWrapper height="h-[200px]">
                            <AreaChart data={ACCRUAL_DATA}>
                                <defs>
                                    <linearGradient id="colorProv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFF" }}
                                    itemStyle={{ color: "#00E5A0" }}
                                />
                                <Area type="monotone" dataKey="provision" stroke="#00E5A0" strokeWidth={2} fillOpacity={1} fill="url(#colorProv)" />
                            </AreaChart>
                        </ChartWrapper>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#8899AA]">
                            <Info size={12} aria-hidden="true" /> Formula: Basic × 15/26 ÷ 12
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
