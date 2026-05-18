"use client";

import { Download, Gift, CheckCircle2, Clock, XCircle, Settings } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

type ReferralStage = "Hired" | "Interview" | "Rejected";
type BonusStatus = "approve" | "pending" | "paid" | "ineligible";

interface ReferralRecord {
    id: string;
    candidate: string;
    appliedDate: string;
    referrer: string;
    referrerDept: string;
    role: string;
    stage: ReferralStage;
    bonus: string;
    bonusStatus: BonusStatus;
    bonusNote?: string;
}

const STAGE_VARIANT: Record<ReferralStage, "success" | "purple" | "danger"> = {
    Hired: "success",
    Interview: "purple",
    Rejected: "danger",
};

const RECORDS: ReferralRecord[] = [
    { id: "r1", candidate: "Ravi Kumar", appliedDate: "10 Jan 2025", referrer: "Neha Gupta", referrerDept: "HR Team", role: "Fullstack Engineer", stage: "Hired", bonus: "₹ 50,000", bonusStatus: "approve", bonusNote: "90 days completed today" },
    { id: "r2", candidate: "Sana Khan", appliedDate: "12 Mar 2025", referrer: "Rahul S.", referrerDept: "Engineering", role: "Product Manager", stage: "Interview", bonus: "₹ 75,000", bonusStatus: "pending" },
    { id: "r3", candidate: "Amit Singh", appliedDate: "01 Nov 2024", referrer: "Priya N.", referrerDept: "HR Team", role: "DevOps Engineer", stage: "Hired", bonus: "₹ 60,000", bonusStatus: "paid" },
    { id: "r4", candidate: "Kavita R.", appliedDate: "10 Jan 2025", referrer: "Manoj K.", referrerDept: "Sales", role: "Account Exec", stage: "Rejected", bonus: "₹ 40,000", bonusStatus: "ineligible" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function ReferrerCell({ row }: { row: ReferralRecord }) {
    return (
        <div>
            <span className="flex items-center gap-1.5 font-medium text-white">
                <Gift size={12} className="text-[#9B59B6]" aria-hidden="true" /> {row.referrer}
            </span>
            <span className="text-[10px] text-[#8899AA]">{row.referrerDept}</span>
        </div>
    );
}

function BonusStatusCell({ row }: { row: ReferralRecord }) {
    if (row.bonusStatus === "approve") {
        return (
            <div className="flex flex-col items-end gap-1">
                <Button size="sm">Approve Payout</Button>
                {row.bonusNote && (
                    <p className="text-[9px] text-[#FFB800]">{row.bonusNote}</p>
                )}
            </div>
        );
    }
    if (row.bonusStatus === "paid") {
        return (
            <span className="flex items-center justify-end gap-1 text-xs font-bold text-[#00E5A0]">
                <CheckCircle2 size={12} aria-hidden="true" /> Paid (Feb)
            </span>
        );
    }
    if (row.bonusStatus === "ineligible") {
        return (
            <span className="flex items-center justify-end gap-1 text-xs font-medium text-[#FF4444]">
                <XCircle size={12} aria-hidden="true" /> Not Eligible
            </span>
        );
    }
    return (
        <span className="flex items-center justify-end gap-1 text-xs font-medium text-[#8899AA]">
            <Clock size={12} aria-hidden="true" /> Pending Hire
        </span>
    );
}

const COLUMNS: Column<ReferralRecord>[] = [
    {
        key: "candidate",
        label: "Candidate",
        render: (r) => (
            <div>
                <p className="font-bold text-white">{r.candidate}</p>
                <p className="text-[10px] text-[#445566]">Applied: {r.appliedDate}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.candidate,
    },
    {
        key: "referrer",
        label: "Referred By",
        render: (r) => <ReferrerCell row={r} />,
        hideOnMobile: true,
    },
    {
        key: "role",
        label: "Role",
        render: (r) => <span className="text-xs text-[#8899AA]">{r.role}</span>,
        hideOnMobile: true,
    },
    {
        key: "stage",
        label: "Stage",
        align: "center",
        render: (r) => <Badge variant={STAGE_VARIANT[r.stage]}>{r.stage}</Badge>,
    },
    {
        key: "bonus",
        label: "Bonus Amount",
        align: "center",
        render: (r) => (
            <span
                className={`text-sm font-bold ${
                    r.bonusStatus === "ineligible" ? "text-[#445566] line-through" : "text-white"
                }`}
            >
                {r.bonus}
            </span>
        ),
        sortable: true,
        sortValue: (r) => parseInt(r.bonus.replace(/[^0-9]/g, ""), 10),
    },
    {
        key: "bonusStatus",
        label: "Bonus Status",
        align: "right",
        render: (r) => <BonusStatusCell row={r} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ReferralTrackingHR() {
    return (
        <Page
            title="Referral Management"
            subtitle="Track company-wide referrals, manage bonuses, and configure incentives"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Referrals", href: "/recruitment/referrals" },
                { label: "HR Tracking" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<Download size={14} aria-hidden="true" />}
                    >
                        Export Report
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Settings size={14} aria-hidden="true" />}
                    >
                        Program Rules
                    </Button>
                </>
            }
        >
            {/* KPI Cards */}
            <dl className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Card padding="md">
                    <dt className="mb-1 text-xs font-semibold uppercase text-[#8899AA]">Total Referrals</dt>
                    <dd className="mb-2 text-2xl font-bold text-white">342</dd>
                    <p className="text-[10px] text-[#00E5A0]">+12% vs last quarter</p>
                </Card>
                <Card padding="md">
                    <dt className="mb-1 text-xs font-semibold uppercase text-[#8899AA]">Hired from Referrals</dt>
                    <dd className="mb-2 text-2xl font-bold text-white">45</dd>
                    <p className="text-[10px] text-[#445566]">13.1% Conversion Rate</p>
                </Card>
                <Card padding="md" className="border-[#00E5A0]/20 bg-[#00E5A0]/10">
                    <dt className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase text-[#00E5A0]">
                        <Clock size={12} aria-hidden="true" /> Pending Payouts
                    </dt>
                    <dd className="mb-2 text-2xl font-bold text-white">₹ 2,40,000</dd>
                    <p className="text-[10px] text-[#00E5A0]/80">Awaiting 90-day retention mark</p>
                </Card>
                <Card padding="md" className="border-[#0066FF]/20 bg-[#0066FF]/10">
                    <dt className="mb-1 text-xs font-semibold uppercase text-[#0066FF]">Paid Out (YTD)</dt>
                    <dd className="mb-2 text-2xl font-bold text-white">₹ 14,50,000</dd>
                    <p className="text-[10px] text-[#0066FF]/80">Across 22 employees</p>
                </Card>
            </dl>

            <Card padding="none">
                <DataTable<ReferralRecord>
                    data={RECORDS}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    searchable
                    searchPlaceholder="Search referrer or candidate name…"
                    aria-label="Referral management records"
                    emptyTitle="No referral records"
                    emptyDescription="No referrals match your search criteria."
                />
            </Card>
        </Page>
    );
}
