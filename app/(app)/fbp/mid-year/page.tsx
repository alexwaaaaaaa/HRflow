"use client";
import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Users } from 'lucide-react';
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

const REVISIONS = [
    { emp: 'Anita Kulkarni', dept: 'Engineering', oldHra: 156000, newHra: 180000, oldLta: 50000, newLta: 26000, status: 'Pending Approval' },
    { emp: 'Rahul Sharma', dept: 'Sales', oldHra: 120000, newHra: 120000, oldLta: 50000, newLta: 0, status: 'Approved' },
    { emp: 'Meena Joshi', dept: 'Finance', oldHra: 180000, newHra: 180000, oldLta: 50000, newLta: 50000, status: 'Pending Approval' },
];

type Revision = typeof REVISIONS[number];

const STATUS_VARIANT: Record<string, "success" | "warning"> = {
    Approved: 'success',
    'Pending Approval': 'warning',
};

export default function FBPMidYearRevisionScreen() {
    const [windowOpen, setWindowOpen] = useState(false);

    const columns: Column<Revision>[] = [
        {
            key: 'employee',
            label: 'Employee',
            render: (rev) => (
                <div>
                    <div className="text-white font-semibold text-xs">{rev.emp}</div>
                    <div className="text-[#556677] text-[10px]">{rev.dept}</div>
                </div>
            ),
        },
        {
            key: 'hraChange',
            label: 'HRA Change',
            render: (rev) => (
                <div>
                    <div className="text-[#8899AA] text-xs line-through">₹{rev.oldHra.toLocaleString()}</div>
                    <div className="text-amber-400 font-bold text-sm">₹{rev.newHra.toLocaleString()}</div>
                </div>
            ),
        },
        {
            key: 'ltaChange',
            label: 'LTA Change',
            render: (rev) => (
                <div>
                    <div className="text-[#8899AA] text-xs line-through">₹{rev.oldLta.toLocaleString()}</div>
                    <div className="text-amber-400 font-bold text-sm">₹{rev.newLta.toLocaleString()}</div>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (rev) => (
                <Badge variant={STATUS_VARIANT[rev.status] ?? 'neutral'}>{rev.status}</Badge>
            ),
        },
        {
            key: 'action',
            label: 'Action',
            align: 'right',
            render: (rev) =>
                rev.status === 'Pending Approval' ? (
                    <Button variant="ghost" size="sm">
                        <CheckCircle2 size={14} aria-hidden="true" /> Approve
                    </Button>
                ) : (
                    <span className="text-[#556677] text-xs">Processed</span>
                ),
        },
    ];

    return (
        <Page
            title="Mid-Year FBP Revision"
            subtitle="Allow employees to revise their component declarations for the remainder of the fiscal year"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "FBP", href: "/fbp/dashboard" },
                { label: "Mid-Year Revision", href: "/fbp/mid-year" },
            ]}
        >
            <div className="space-y-6">
                {/* Control Panel */}
                <Card padding="lg" className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-bold text-lg mb-1">Revision Window Status</h3>
                        <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${windowOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} aria-hidden="true" />
                            <span className={`font-bold ${windowOpen ? 'text-emerald-400' : 'text-red-400'}`}>{windowOpen ? 'OPEN' : 'CLOSED'}</span>
                        </div>
                        <p className="text-[#8899AA] text-sm mt-2 max-w-md">Opening the window allows employees to log in and change their FBP allocations. Changes will apply from the next payroll run.</p>
                    </div>
                    <div className="text-right space-y-3">
                        <div className="text-sm font-bold text-[#556677]">Scheduled for: <span className="text-white">Oct 1 - Oct 15, 2026</span></div>
                        <Button
                            variant={windowOpen ? "danger" : "primary"}
                            size="md"
                            onClick={() => setWindowOpen(!windowOpen)}
                        >
                            {windowOpen ? 'Close Revision Window' : 'Open Revision Window Now'}
                        </Button>
                    </div>
                </Card>

                {/* Warnings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card padding="md" className="bg-amber-500/5 border-amber-500/20 flex gap-3">
                        <AlertTriangle size={20} className="text-amber-400 shrink-0" aria-hidden="true" />
                        <div>
                            <div className="text-amber-400 font-bold text-sm">Tax Recalculation</div>
                            <div className="text-[#AABBCC] text-xs mt-1">Changing FBP components mid-year will trigger a TDS recalculation. Emps may see a spike or drop in their net take-home pay to adjust for past months.</div>
                        </div>
                    </Card>
                    <Card padding="md" className="bg-indigo-500/5 border-indigo-500/20 flex gap-3">
                        <Users size={20} className="text-indigo-400 shrink-0" aria-hidden="true" />
                        <div>
                            <div className="text-indigo-400 font-bold text-sm">Approval Workflow</div>
                            <div className="text-[#AABBCC] text-xs mt-1">All revisions require HR approval before taking effect. Once approved, the payroll engine will automatically use the new structure.</div>
                        </div>
                    </Card>
                </div>

                {/* Review Revisions */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-bold text-sm">Pending Revisions</h3>
                        <Badge variant="warning">2 Requests</Badge>
                    </div>
                    <DataTable
                        data={REVISIONS}
                        columns={columns}
                        rowKey={(rev) => rev.emp}
                        aria-label="Pending FBP Revisions"
                    />
                    <div className="flex justify-end mt-4">
                        <Button variant="secondary" size="md">
                            Approve All Pending
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
