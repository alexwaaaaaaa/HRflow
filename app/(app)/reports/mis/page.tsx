"use client";

import { Download, Eye, FileSpreadsheet } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ──────────────────────────────────────────────────────────────

type MISColor = "indigo" | "emerald" | "amber" | "pink";

interface MISReport {
    id: string;
    title: string;
    description: string;
    color: MISColor;
}

// Static class map — no template literals
const MIS_PALETTE: Record<
    MISColor,
    { icon: string; corner: string; btn: string }
> = {
    indigo: {
        icon: "bg-indigo-500/20 text-indigo-400",
        corner: "bg-indigo-500/5",
        btn: "bg-indigo-500 text-white hover:bg-indigo-600",
    },
    emerald: {
        icon: "bg-emerald-500/20 text-emerald-400",
        corner: "bg-emerald-500/5",
        btn: "bg-emerald-500 text-[#0B1221] hover:bg-emerald-600",
    },
    amber: {
        icon: "bg-amber-500/20 text-amber-500",
        corner: "bg-amber-500/5",
        btn: "bg-amber-500 text-[#0B1221] hover:bg-amber-600",
    },
    pink: {
        icon: "bg-pink-500/20 text-pink-400",
        corner: "bg-pink-500/5",
        btn: "bg-pink-500 text-white hover:bg-pink-600",
    },
};

const MIS_REPORTS: MISReport[] = [
    {
        id: "hr-ops",
        title: "Monthly HR Ops Dashboard",
        description:
            "Consolidated view of attrition, hiring velocity, and HR issues mapped month-on-month.",
        color: "indigo",
    },
    {
        id: "cost-budget",
        title: "Cost vs Budget Variance",
        description: "Detailed P&L impact analysis comparing actual manpower cost to AOP.",
        color: "emerald",
    },
    {
        id: "pulse",
        title: "Pulse & Engagement Index",
        description: "eNPS scores, survey completions, and risk of flight across org levels.",
        color: "amber",
    },
    {
        id: "diversity",
        title: "Diversity & Inclusion Board",
        description:
            "Executive summary of gender, age, and regional diversity metrics for ESG compliance.",
        color: "pink",
    },
];

// ─── Sub-component (module scope) ─────────────────────────────────────────────

function MISCard({ report }: { report: MISReport }) {
    const palette = MIS_PALETTE[report.color];
    return (
        <Card padding="lg" className="relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
            <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110 ${palette.corner}`}
                aria-hidden="true"
            />
            <div className="relative z-10">
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${palette.icon}`}
                    aria-hidden="true"
                >
                    <FileSpreadsheet size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{report.title}</h3>
                <p className="text-sm text-[#8899AA] mb-6 line-clamp-2">{report.description}</p>

                <div className="flex gap-3">
                    <Button
                        className={`flex-1 text-xs ${palette.btn}`}
                        icon={<Download size={14} aria-hidden="true" />}
                        size="sm"
                    >
                        Export XLSX
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        aria-label={`Preview ${report.title}`}
                    >
                        <Eye size={16} aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MISReportPage() {
    return (
        <Page
            title="Management Information System"
            subtitle="Curated operational and strategic reports for board and management reviews."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Executive MIS" },
            ]}
            maxWidth="1280px"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MIS_REPORTS.map((report) => (
                    <MISCard key={report.id} report={report} />
                ))}
            </div>
        </Page>
    );
}
