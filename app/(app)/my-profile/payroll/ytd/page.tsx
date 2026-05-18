"use client";

import { Download, Eye, FileText, Filter, Receipt, TrendingUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface PayslipEntry {
    month: string;
    gross: number;
    deduction: number;
    net: number;
    paidOn: string;
}

const PAYSLIP_HISTORY: PayslipEntry[] = [
    { month: "November 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Nov 2024" },
    { month: "October 2024", gross: 96100, deduction: 11200, net: 84900, paidOn: "28 Oct 2024" },
    { month: "September 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Sep 2024" },
    { month: "August 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Aug 2024" },
    { month: "July 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Jul 2024" },
    { month: "June 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Jun 2024" },
];

export default function EmployeeYTD() {
    return (
        <Page
            title="My Payroll & YTD Summary"
            subtitle="Fiscal Year: Apr 2024 - Mar 2025"
            breadcrumbs={[
                { label: "My Profile", href: "/my-profile" },
                { label: "Payroll & YTD" },
            ]}
            maxWidth="1000px"
        >
            <div className="space-y-8">
                {/* YTD Metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <MetricCard label="YTD Gross Earnings" value="₹7,68,800" />
                    <MetricCard label="YTD Taxes (TDS)" value="₹68,800" valueClassName="text-[#FF4444]" />
                    <MetricCard label="YTD Net Payout" value="₹6,83,600" valueClassName="text-[#00E5A0]" />
                    <Card>
                        <p className="mb-2 text-[13px] text-[#8899AA]">Form 16 Status</p>
                        <Badge variant="warning">Available May &apos;25</Badge>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                    {/* Payslip History */}
                    <div>
                        <CardHeader>
                            <CardTitle>Payslip History</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<Filter size={14} aria-hidden="true" />}
                            >
                                Filter Year
                            </Button>
                        </CardHeader>

                        <Card padding="none">
                            <ul className="divide-y divide-[#1A2A3A]">
                                {PAYSLIP_HISTORY.map((slip) => (
                                    <li
                                        key={slip.month}
                                        className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,229,160,0.1)]">
                                                <FileText size={20} className="text-[#00E5A0]" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-semibold text-white">{slip.month}</p>
                                                <p className="text-xs text-[#8899AA]">
                                                    Net: ₹{slip.net.toLocaleString()} · Paid on {slip.paidOn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                icon={<Eye size={14} aria-hidden="true" />}
                                                aria-label={`View payslip for ${slip.month}`}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                icon={<Download size={14} aria-hidden="true" />}
                                                aria-label={`Download PDF for ${slip.month}`}
                                            >
                                                PDF
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Quick Actions & Tax Cards */}
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tax & Investments</CardTitle>
                            </CardHeader>

                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,102,255,0.1)]">
                                        <Receipt size={18} className="text-[#0066FF]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">IT Declaration</p>
                                        <p className="mb-2 text-xs text-[#8899AA]">
                                            Submit proof for Sec 80C, HRA to reduce TDS.
                                        </p>
                                        <Button variant="ghost" size="sm" className="border-[#0066FF] text-[#0066FF] hover:bg-[rgba(0,102,255,0.08)]">
                                            Submit Proofs
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(255,184,0,0.1)]">
                                        <TrendingUp size={18} className="text-[#FFB800]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Tax Regime</p>
                                        <p className="mb-2 text-xs text-[#8899AA]">
                                            You are opted into the <b>New Tax Regime</b>.
                                        </p>
                                        <Button variant="ghost" size="sm" className="border-[#FFB800] text-[#FFB800] hover:bg-[rgba(255,184,0,0.08)]">
                                            Change Regime
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-dashed border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)]">
                            <div className="text-center">
                                <h3 className="mb-2 text-[15px] font-semibold text-white">Need Help?</h3>
                                <p className="mb-3 text-[13px] text-[#8899AA]">
                                    Have an issue with your payslip or TDS? Raise a ticket with the payroll team.
                                </p>
                                <Button variant="secondary" size="md" className="w-full">
                                    Contact Payroll Helpdesk
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}

function MetricCard({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
    return (
        <Card>
            <p className="mb-2 text-[13px] text-[#8899AA]">{label}</p>
            <p className={`text-2xl font-bold text-white ${valueClassName ?? ""}`}>{value}</p>
        </Card>
    );
}
