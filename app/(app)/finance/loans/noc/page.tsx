"use client";

import { FileSignature, Download, CheckCircle2, Copy } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface NOCRecord {
    id: string;
    ref: string;
    emp: string;
    empId: string;
    loanId: string;
    loanDesc: string;
    closureDate: string;
    status: "Emailed to Emp";
}

const NOC_RECORDS: NOCRecord[] = [
    { id: "NOC-1", ref: "NOC/LN-6523/2025", emp: "Ananya Sharma", empId: "EMP-042", loanId: "LN-6523", loanDesc: "₹1.5L Medical", closureDate: "16 Oct 2025", status: "Emailed to Emp" },
    { id: "NOC-2", ref: "NOC/LN-5192/2025", emp: "Rahul Kumar", empId: "EMP-091", loanId: "LN-5192", loanDesc: "₹50k Education", closureDate: "10 Sep 2025", status: "Emailed to Emp" },
];

const COLUMNS: Column<NOCRecord>[] = [
    {
        key: "ref", label: "NOC Reference", render: (n) => (
            <div>
                <div className="font-mono text-[#00E5FF] font-medium flex items-center gap-2">
                    {n.ref}
                    <Button variant="ghost" size="sm" aria-label={`Copy ${n.ref}`} icon={<Copy size={12} />} />
                </div>
                <div className="text-xs text-[#8899AA] mt-1">Issued by System</div>
            </div>
        ),
    },
    {
        key: "emp", label: "Employee", render: (n) => (
            <div>
                <div className="text-white font-medium">{n.emp}</div>
                <div className="text-[#8899AA] text-xs mt-0.5">{n.empId}</div>
            </div>
        ),
    },
    {
        key: "loanId", label: "Loan Account", render: (n) => (
            <div>
                <div className="text-white">{n.loanId}</div>
                <div className="text-[#8899AA] text-xs mt-0.5">{n.loanDesc}</div>
            </div>
        ),
    },
    { key: "closureDate", label: "Closure Date", render: (n) => <span className="text-white">{n.closureDate}</span> },
    {
        key: "status", label: "Status", align: "center",
        render: () => <Badge variant="success"><CheckCircle2 size={12} className="inline mr-1" aria-hidden="true" />Emailed to Emp</Badge>,
    },
    {
        key: "actions", label: "Actions", align: "center",
        render: (n) => (
            <Button variant="ghost" size="sm" aria-label={`Download NOC for ${n.emp}`} icon={<Download size={20} />} />
        ),
    },
];

export default function LoanNOCPage() {
    return (
        <Page
            title="Loan NOC Ledger"
            subtitle="Repository of No Objection Certificates issued for closed loan accounts."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loans", href: "/finance/loans" },
                { label: "NOC Ledger" },
            ]}
            maxWidth="1200px"
        >
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-3">
                    <FileSignature size={18} className="text-[#00E5FF]" aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search by Employee, NOC Ref, or Loan ID..."
                        aria-label="Search NOC records"
                        className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                    />
                </div>
                <div className="p-4">
                    <DataTable<NOCRecord>
                        data={NOC_RECORDS}
                        columns={COLUMNS}
                        rowKey={(n) => n.id}
                        aria-label="Loan NOC ledger"
                        emptyTitle="No NOCs issued yet"
                        emptyDescription="NOCs are generated automatically when a loan is closed."
                    />
                </div>
            </Card>
        </Page>
    );
}
