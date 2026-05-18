"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Send, Users, CalendarClock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface AdvanceTaxEmployee {
    id: string;
    name: string;
    empId: string;
    income: string;
    incomeType: string;
    trigger: string;
    triggerVariant: "danger" | "success";
    status: string;
    eligible: boolean;
}

const EMPLOYEES: AdvanceTaxEmployee[] = [
    { id: "1", name: "Amit Sharma", empId: "EMP042", income: "₹4,50,000", incomeType: "Capital Gains Declared", trigger: "> ₹10,000", triggerVariant: "danger", status: "Pending for Q4 Reminder", eligible: true },
    { id: "2", name: "Priya Patel", empId: "EMP112", income: "₹2,80,000", incomeType: "Rental Income", trigger: "> ₹10,000", triggerVariant: "danger", status: "Pending for Q4 Reminder", eligible: true },
    { id: "3", name: "Rahul Verma", empId: "EMP205", income: "₹35,000", incomeType: "FD Interest", trigger: "< ₹10,000", triggerVariant: "success", status: "Not Eligible", eligible: false },
];

const COLUMNS: Column<AdvanceTaxEmployee>[] = [
    {
        key: "employee",
        label: "Employee Name",
        render: (emp) => (
            <div>
                <p className="text-sm font-semibold text-white">{emp.name}</p>
                <p className="text-xs text-[#8899AA]">{emp.empId}</p>
            </div>
        ),
        sortable: true,
        sortValue: (emp) => emp.name,
    },
    {
        key: "income",
        label: "Est. Other Income / Gains",
        render: (emp) => (
            <div>
                <span className="text-sm font-medium text-[#c8d8e8]">{emp.income}</span>
                <span className="text-xs text-[#8899AA] ml-2">({emp.incomeType})</span>
            </div>
        ),
    },
    {
        key: "trigger",
        label: "Tax Liability Trigger",
        render: (emp) => <Badge variant={emp.triggerVariant}>{emp.trigger}</Badge>,
    },
    {
        key: "status",
        label: "Status",
        render: (emp) => <span className={`text-xs font-semibold ${emp.eligible ? "text-[#8899AA]" : "text-[#8899AA]"}`}>{emp.status}</span>,
    },
];

export default function AdvanceTaxReminder() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => setSent(false), 3000);
        }, 2000);
    };

    return (
        <Page
            title="Advance Tax Reminders"
            subtitle="Identify employees eligible to pay Advance Tax and send automated reminders before quarterly deadlines."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Advance Tax" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    {sent && (
                        <span className="text-sm font-bold text-[#00E5A0] flex items-center gap-1.5">
                            <CheckCircle2 size={16} aria-hidden="true" /> Sent to 45 employees
                        </span>
                    )}
                    <Button
                        onClick={handleSend}
                        disabled={sending || sent}
                        isLoading={sending}
                        loadingText="Sending emails..."
                        icon={<Send size={16} />}
                    >
                        Send Reminders
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <Card padding="md" className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Eligible Employees</p>
                                <p className="text-2xl font-black text-white">45</p>
                            </div>
                            <div className="w-10 h-10 bg-[#1A2A3A] rounded-full flex items-center justify-center text-[#8899AA]">
                                <Users size={20} aria-hidden="true" />
                            </div>
                        </Card>
                        <Card padding="md" className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Total Non-Salary Est.</p>
                                <p className="text-2xl font-black text-[#FFB800]">₹1.2Cr</p>
                            </div>
                            <div className="w-10 h-10 bg-[#FFB800]/10 rounded-full flex items-center justify-center text-[#FFB800]">
                                <AlertCircle size={20} aria-hidden="true" />
                            </div>
                        </Card>
                    </div>

                    <Card padding="md" className="bg-[#FF4444]/5 border border-[#FF4444]/20 text-center flex flex-col justify-center">
                        <h4 className="text-xs font-bold text-[#FF4444] uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                            <CalendarClock size={16} aria-hidden="true" /> Next Deadline: 15 March
                        </h4>
                        <p className="text-lg font-black text-white">Q4 Payment (100%)</p>
                    </Card>
                </div>

                {/* Table */}
                <Card padding="none">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                        <h3 className="text-sm font-semibold text-white">Eligible Employees</h3>
                        <Button variant="danger" size="sm">
                            Trigger Auto-Scan
                        </Button>
                    </div>
                    <DataTable<AdvanceTaxEmployee>
                        data={EMPLOYEES}
                        columns={COLUMNS}
                        rowKey={(emp) => emp.id}
                        aria-label="Advance Tax Eligible Employees"
                        emptyTitle="No eligible employees"
                        emptyDescription="No employees found with advance tax liability"
                    />
                </Card>

                <p className="text-xs text-[#556677] text-center">
                    Advance tax applies if the estimated tax liability for the year (after TDS) is ₹10,000 or more.
                </p>
            </div>
        </Page>
    );
}
