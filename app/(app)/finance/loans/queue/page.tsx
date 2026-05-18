"use client";

import { Clock, CheckCircle2, XCircle, FileText } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type QueueStatus = "Pending HR" | "Pending Finance";

interface QueueItem {
    id: string;
    emp: string;
    role: string;
    req: number;
    tenure: number;
    emi: number;
    purpose: string;
    status: QueueStatus;
    score: number;
    date: string;
}

const APPROVAL_QUEUE: QueueItem[] = [
    { id: "LNR-9102", emp: "Suraj P", role: "Software Eng", req: 150000, tenure: 12, emi: 13083, purpose: "Medical", status: "Pending HR", score: 850, date: "Oct 16, 2025" },
    { id: "LNR-9101", emp: "Neha S", role: "Marketing", req: 50000, tenure: 6, emi: 8540, purpose: "Education", status: "Pending Finance", score: 710, date: "Oct 15, 2025" },
    { id: "LNR-9100", emp: "Karan M", role: "Sales Rep", req: 300000, tenure: 24, emi: 13636, purpose: "Marriage", status: "Pending Finance", score: 920, date: "Oct 14, 2025" },
];

interface KpiTile {
    label: string;
    value: string;
    sub: string;
    valueColor?: string;
}

const KPI_TILES: KpiTile[] = [
    { label: "Total Pipeline Draft", value: "₹5,00,000", sub: "Across 3 requests" },
    { label: "Avg Review Time", value: "2.4 Days", sub: "YTD SLA Performance", valueColor: "text-emerald-400" },
    { label: "Pending Action", value: "2 Requests", sub: "Require your direct approval", valueColor: "text-amber-500" },
];

const COLUMNS: Column<QueueItem>[] = [
    {
        key: "id", label: "Req ID / Date", render: (r) => (
            <div>
                <div className="font-mono text-indigo-400 font-medium">{r.id}</div>
                <div className="text-xs text-[#8899AA] mt-1">{r.date}</div>
            </div>
        ),
    },
    {
        key: "emp", label: "Employee", render: (r) => (
            <div>
                <div className="text-white font-medium">{r.emp}</div>
                <div className="text-[#8899AA] text-xs mt-0.5">{r.role}</div>
            </div>
        ),
    },
    {
        key: "req", label: "Requested", align: "right", render: (r) => (
            <div>
                <div className="text-white font-bold">₹{r.req.toLocaleString()}</div>
                <div className="text-[#8899AA] text-xs">{r.purpose}</div>
            </div>
        ),
    },
    {
        key: "tenure", label: "Tenure / EMI", align: "center", render: (r) => (
            <div>
                <div className="text-white">{r.tenure} mo</div>
                <div className="text-xs text-indigo-400 mt-0.5">₹{r.emi.toLocaleString()}/mo</div>
            </div>
        ),
    },
    {
        key: "score", label: "Credit Score", align: "center",
        render: (r) => (
            <Badge variant={r.score >= 800 ? "success" : r.score >= 700 ? "warning" : "danger"}>
                {r.score}
            </Badge>
        ),
    },
    {
        key: "docs", label: "Docs", align: "center",
        render: (r) => <Button variant="ghost" size="sm" aria-label={`View documents for ${r.emp}`} icon={<FileText size={20} />} />,
    },
    {
        key: "status", label: "Status / Actions", align: "center",
        render: (r) => (
            <div className="flex flex-col items-center gap-2">
                <Badge variant="warning">{r.status}</Badge>
                {r.status === "Pending Finance" ? (
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" aria-label={`Approve loan for ${r.emp}`} icon={<CheckCircle2 size={16} className="text-emerald-400" />} />
                        <Button variant="ghost" size="sm" aria-label={`Reject loan for ${r.emp}`} icon={<XCircle size={16} className="text-pink-400" />} />
                    </div>
                ) : (
                    <span className="text-[10px] text-[#8899AA] uppercase">Waiting on HR</span>
                )}
            </div>
        ),
    },
];

export default function LoanApprovalQueuePage() {
    return (
        <Page
            title="Loan Approval Queue"
            subtitle="Review pending employee loan applications requiring HR or Finance sign-off."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loans", href: "/finance/loans" },
                { label: "Approval Queue" },
            ]}
            maxWidth="1300px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-1 ${tile.valueColor ?? "text-white"}`}>{tile.value}</h3>
                        <p className="text-xs text-[#8899AA]">{tile.sub}</p>
                    </Card>
                ))}
            </div>

            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-3">
                    <Clock size={18} className="text-indigo-400" aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search by Employee or Req ID..."
                        aria-label="Search loan queue"
                        className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div className="p-4">
                    <DataTable<QueueItem>
                        data={APPROVAL_QUEUE}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="Loan approval queue"
                        emptyTitle="No pending applications"
                        emptyDescription="All loan applications have been processed."
                    />
                </div>
            </Card>
        </Page>
    );
}
