"use client";

import { ShieldAlert, FileCheck, Printer, Info, HardDrive, Cpu, Laptop } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface ClearanceRow {
    id: string;
    dept: string;
    check: string;
    status: "Cleared" | "Pending";
    approver: string;
    icon: typeof Laptop;
}

const CLEARANCE_ROWS: ClearanceRow[] = [
    { id: "c1", dept: "IT & Infrastructure", check: "Hardware & Asset Return", status: "Cleared", approver: "Rahul Sharma", icon: Laptop },
    { id: "c2", dept: "Finance & Accounts", check: "Pending Loans & Advances", status: "Cleared", approver: "Sonia Verma", icon: FileCheck },
    { id: "c3", dept: "Library / Knowledge", check: "E-Books & Access Revoked", status: "Pending", approver: "Anil Gupta", icon: HardDrive },
    { id: "c4", dept: "Administration", check: "ID Cards & Keys Submitted", status: "Cleared", approver: "Priya Raj", icon: Cpu },
];

const COLUMNS: Column<ClearanceRow>[] = [
    {
        key: "dept",
        label: "Department",
        render: (r) => (
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#060B14] p-2">
                    <r.icon size={16} className="text-[#445566]" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-[#8899AA]">{r.dept}</span>
            </div>
        ),
    },
    {
        key: "check",
        label: "Verification Check",
        render: (r) => <span className="text-xs text-[#445566]">{r.check}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={r.status === "Cleared" ? "success" : "warning"}>{r.status}</Badge>,
    },
    {
        key: "approver",
        label: "Approver",
        align: "right",
        render: (r) => <span className="text-xs font-semibold uppercase text-[#445566]">{r.approver}</span>,
    },
];

export default function NOCGeneration() {
    return (
        <Page
            title="No Objection Certificate (NOC)"
            subtitle="Clearance verification from all departments before final release."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "NOC Generation" },
            ]}
            maxWidth="1300px"
            actions={<Button>Generate Unified NOC</Button>}
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Clearance Matrix */}
                <div className="space-y-6 lg:col-span-8">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                            <h2 className="flex items-center gap-2 text-base font-bold text-white">
                                <ShieldAlert size={18} className="text-amber-500" aria-hidden="true" />
                                Clearance Status Matrix
                            </h2>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                Employee: Arnab Das
                            </span>
                        </div>
                        <div className="p-4">
                            <DataTable<ClearanceRow>
                                data={CLEARANCE_ROWS}
                                columns={COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Clearance status matrix"
                            />
                        </div>
                    </Card>

                    <div className="flex items-start gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">
                        <Info size={18} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                        <p className="text-xs text-[#8899AA]">
                            Unified NOC can only be generated once "Library / Knowledge" clearance is completed. Manual
                            override is restricted to Senior HR Managers.
                        </p>
                    </div>
                </div>

                {/* NOC Preview */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="md">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-center text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                            Document Snippet
                        </h3>

                        <div className="relative overflow-hidden rounded-xl bg-white p-6 font-serif text-[#1e293b] shadow-inner">
                            <div className="mb-6 text-center">
                                <p className="text-[10px] font-black uppercase font-sans text-[#64748b]">NOC Certificate</p>
                                <div className="mx-auto mt-1 h-px w-12 bg-[#1e293b]/10" />
                            </div>
                            <div className="space-y-3 text-[11px] leading-relaxed">
                                <p>
                                    This is to certify that <b>Arnab Das (EMP-771)</b> has been granted clearance from all
                                    operational departments of <b>HRFlow Solutions</b>.
                                </p>
                                <p>
                                    There are no outstanding dues, assets, or liabilities pending against the mentioned
                                    employee as of <b>April 24, 2024</b>.
                                </p>
                                <div className="pt-6 text-right opacity-30">
                                    <div className="ml-auto h-px w-24 bg-[#1e293b]" />
                                    <p className="mt-1 text-[8px] font-sans font-black">Digital Signature Verified</p>
                                </div>
                            </div>
                            <div
                                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[25deg] opacity-[0.03]"
                                aria-hidden="true"
                            >
                                <FileCheck size={120} />
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <Button
                                variant="outline"
                                icon={<Printer size={14} aria-hidden="true" />}
                                className="w-full"
                            >
                                Batch Print NOCs
                            </Button>
                            <p className="text-center text-[9px] text-[#445566]">
                                NOC is mandatory for Experience Letter release.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
