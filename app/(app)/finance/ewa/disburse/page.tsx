"use client";

import { useState } from "react";
import { CheckCircle2, Download, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface PendingDisbursement {
    id: string;
    emp: string;
    account: string;
    amount: number;
    fee: number;
    net: number;
    date: string;
    status: "Pending API" | "Failed (Invalid VPA)";
}

interface ProcessedDisbursement {
    id: string;
    emp: string;
    account: string;
    net: number;
    date: string;
    utr: string;
    status: "Success";
}

const PENDING_DISBURSEMENTS: PendingDisbursement[] = [
    { id: "WTH-9301", emp: "Ananya S", account: "HDFC •••• 1204", amount: 15000, fee: 150, net: 14850, date: "Oct 16, 2025 09:15", status: "Pending API" },
    { id: "WTH-9302", emp: "Rahul K", account: "SBI •••• 9921", amount: 5000, fee: 50, net: 4950, date: "Oct 16, 2025 10:30", status: "Pending API" },
    { id: "WTH-9303", emp: "Vikram R", account: "ICICI •••• 3341", amount: 25000, fee: 250, net: 24750, date: "Oct 16, 2025 11:45", status: "Failed (Invalid VPA)" },
];

const PROCESSED: ProcessedDisbursement[] = [
    { id: "WTH-9290", emp: "Priya M", account: "Axis •••• 8812", net: 9900, date: "Oct 15, 2025 14:20", utr: "CMS19283019284", status: "Success" },
    { id: "WTH-9289", emp: "Amit V", account: "HDFC •••• 4410", net: 11880, date: "Oct 15, 2025 11:10", utr: "CMS19283019111", status: "Success" },
];

const KPI_TILES: Array<{ label: string; value: string; sub: string; subColor?: string; valueColor?: string }> = [
    { label: "Escrow Balance", value: "₹8,45,000", sub: "Sufficient for queue", subColor: "text-emerald-400" },
    { label: "Pending Volume", value: "₹20,000", valueColor: "text-amber-400", sub: "Across 2 requests", subColor: "text-[#8899AA]" },
    { label: "Failed Transfers", value: "1", valueColor: "text-pink-400", sub: "Requires manual intervention", subColor: "text-[#8899AA]" },
    { label: "Total Disbursed (MTD)", value: "₹4,15,500", sub: "Across 84 requests", subColor: "text-[#8899AA]" },
];

const PENDING_COLUMNS: Column<PendingDisbursement>[] = [
    { key: "id", label: "Req ID", render: (r) => <span className="font-mono text-[#00E5FF]">{r.id}</span> },
    {
        key: "emp", label: "Employee", render: (r) => (
            <div>
                <div className="text-white font-medium">{r.emp}</div>
                <div className="text-xs text-[#8899AA] mt-1">{r.date}</div>
            </div>
        ),
    },
    { key: "account", label: "Bank Details", render: (r) => <span className="text-[#8899AA] font-mono text-xs">{r.account}</span> },
    { key: "amount", label: "Gross", align: "right", render: (r) => <span className="text-[#8899AA]">₹{r.amount.toLocaleString()}</span> },
    { key: "net", label: "Net Payload", align: "right", render: (r) => <span className="text-emerald-400 font-bold">₹{r.net.toLocaleString()}</span> },
    {
        key: "status", label: "Status", align: "center",
        render: (r) => r.status.includes("Failed")
            ? <Badge variant="danger">{r.status}</Badge>
            : <Badge variant="warning">{r.status}</Badge>,
    },
    {
        key: "action", label: "Action", align: "center",
        render: (r) => r.status.includes("Failed")
            ? <Button variant="secondary" size="sm">Resolve</Button>
            : <Button variant="ghost" size="sm">Push to API</Button>,
    },
];

const PROCESSED_COLUMNS: Column<ProcessedDisbursement>[] = [
    { key: "id", label: "Req ID", render: (r) => <span className="font-mono text-[#00E5FF]">{r.id}</span> },
    {
        key: "emp", label: "Employee", render: (r) => (
            <div>
                <div className="text-white font-medium">{r.emp}</div>
                <div className="text-xs text-[#8899AA] mt-1">{r.date}</div>
            </div>
        ),
    },
    { key: "account", label: "Bank Details", render: (r) => <span className="text-[#8899AA] font-mono text-xs">{r.account}</span> },
    { key: "net", label: "Net Sent", align: "right", render: (r) => <span className="text-emerald-400 font-bold">₹{r.net.toLocaleString()}</span> },
    { key: "utr", label: "Bank UTR", render: (r) => <span className="font-mono text-xs text-[#8899AA]">{r.utr}</span> },
    { key: "status", label: "Status", align: "center", render: () => <Badge variant="success">Success</Badge> },
];

export default function EWADisbursementPage() {
    const [_search, setSearch] = useState("");

    return (
        <Page
            title="EWA Disbursements Queue"
            subtitle="Review, retry, or manually approve outgoing EWA transfers"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Disbursements" },
            ]}
            maxWidth="1300px"
            actions={
                <Button icon={<CheckCircle2 size={14} />}>Process All Pending (2)</Button>
            }
        >
            {/* KPI Tiles */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-1 ${tile.valueColor ?? "text-white"}`}>{tile.value}</h3>
                        <p className={`text-xs ${tile.subColor}`}>{tile.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Action Required */}
            <Card padding="none" className="mb-8">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-2 bg-[#1A2A3A]/40">
                    <AlertTriangle size={20} className="text-amber-400" aria-hidden="true" />
                    <h2 className="text-lg font-bold text-white">Action Required</h2>
                </div>
                <div className="p-4">
                    <DataTable<PendingDisbursement>
                        data={PENDING_DISBURSEMENTS}
                        columns={PENDING_COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="Pending EWA disbursements requiring action"
                        emptyTitle="No pending disbursements"
                    />
                </div>
            </Card>

            {/* Recently Processed */}
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-white">Recently Processed</h2>
                    <div className="flex gap-2">
                        <input
                            type="search"
                            placeholder="Search by UTR or name..."
                            aria-label="Search processed disbursements"
                            className="w-64 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="secondary" size="sm" icon={<Download size={14} />} aria-label="Download processed disbursements" />
                    </div>
                </div>
                <div className="p-4">
                    <DataTable<ProcessedDisbursement>
                        data={PROCESSED}
                        columns={PROCESSED_COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="Recently processed EWA disbursements"
                        emptyTitle="No processed disbursements"
                    />
                </div>
            </Card>
        </Page>
    );
}
