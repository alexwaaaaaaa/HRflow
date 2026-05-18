"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Eye, Clock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface QueueItem {
    id: string;
    emp: string;
    avatar: string;
    dept: string;
    type: string;
    amount: number;
    billDate: string;
    submitted: string;
    bills: number;
    desc: string;
}

const QUEUE: QueueItem[] = [
    { id: "RMB-441", emp: "Anita Kulkarni", avatar: "AK", dept: "Engineering", type: "Medical", amount: 12400, billDate: "07 Mar 2026", submitted: "2h ago", bills: 2, desc: "Doctor consultation + medicine bills — Apollo Hospitals" },
    { id: "RMB-439", emp: "Meena Joshi", avatar: "MJ", dept: "Finance", type: "Medical", amount: 22000, billDate: "05 Mar 2026", submitted: "1d ago", bills: 3, desc: "Hospitalization: appendix surgery — Fortis Hospital" },
    { id: "RMB-437", emp: "Karan Singh", avatar: "KS", dept: "Sales", type: "Fuel", amount: 8500, billDate: "04 Mar 2026", submitted: "2d ago", bills: 4, desc: "Client visits — Petrol bills for Chennai, March 1-4" },
    { id: "RMB-434", emp: "Priya Rao", avatar: "PR", dept: "HR", type: "Internet", amount: 1800, billDate: "28 Feb 2026", submitted: "4d ago", bills: 1, desc: "Airtel Fiber broadband — Feb 2026 invoice" },
];

export default function ReimbursementApprovalScreen() {
    const [items, setItems] = useState(QUEUE);
    const [notes, setNotes] = useState<Record<string, string>>({});

    const handle = (id: string, _action: "approve" | "reject") => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    return (
        <Page
            title="Approval Queue"
            subtitle={`${items.length} claims awaiting your approval`}
            breadcrumbs={[
                { label: "Reimbursements", href: "/reimbursements/dashboard" },
                { label: "Approvals" },
            ]}
            maxWidth="1000px"
            actions={
                <Badge variant="warning" className="flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" /> Oldest: 4 days pending
                </Badge>
            }
        >
            {items.length === 0 ? (
                <Card padding="lg" className="py-24 text-center">
                    <CheckCircle2
                        size={48}
                        className="mx-auto mb-4 text-emerald-400 opacity-50"
                        aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold text-white">All caught up!</h3>
                    <p className="mt-1 text-sm text-[#8899AA]">No pending reimbursement claims.</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} padding="lg">
                            <div className="mb-4 flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/15 font-bold text-violet-400">
                                    {item.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="font-bold text-white">{item.emp}</span>
                                        <span className="text-xs text-[#556677]">{item.dept}</span>
                                        <span className="text-xs text-[#556677]">
                                            · Submitted {item.submitted}
                                        </span>
                                        <span className="ml-auto text-2xl font-black text-violet-400">
                                            ₹{item.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#8899AA]">
                                        <Badge variant="neutral">{item.type}</Badge>
                                        <span>Bill Date: {item.billDate}</span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={10} aria-hidden="true" /> {item.bills}{" "}
                                            attachment{item.bills > 1 ? "s" : ""}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-[#8899AA]">{item.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <label htmlFor={`note-${item.id}`} className="sr-only">
                                    Approval note for {item.emp}
                                </label>
                                <input
                                    id={`note-${item.id}`}
                                    type="text"
                                    placeholder="Approval note (optional)..."
                                    value={notes[item.id] ?? ""}
                                    onChange={(e) =>
                                        setNotes((p) => ({ ...p, [item.id]: e.target.value }))
                                    }
                                    className="flex-1 rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2 text-sm text-white outline-none focus:border-violet-500"
                                />
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handle(item.id, "approve")}
                                    icon={<CheckCircle2 size={14} aria-hidden="true" />}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handle(item.id, "reject")}
                                    icon={<XCircle size={14} aria-hidden="true" />}
                                >
                                    Reject
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </Page>
    );
}
