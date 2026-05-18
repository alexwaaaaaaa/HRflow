"use client";

import { Building2, GitBranch, Target, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface OKRNode {
    id: string;
    title: string;
    owner: string;
    progress: number;
    colorKey: "company" | "dept" | "team";
    children?: OKRNode[];
}

const TREE: OKRNode = {
    id: "c1",
    title: "Achieve ₹100 Cr ARR",
    owner: "CEO Office",
    progress: 72,
    colorKey: "company",
    children: [
        {
            id: "d1",
            title: "Sales: Close 50 Enterprise Deals",
            owner: "Sales Dept",
            progress: 78,
            colorKey: "dept",
            children: [
                { id: "t1", title: "Drive 40% growth – Segment A", owner: "Priya Mehta", progress: 60, colorKey: "team" },
                { id: "t2", title: "Enterprise outreach to 200 accounts", owner: "Ravi Kumar", progress: 82, colorKey: "team" },
            ],
        },
        {
            id: "d2",
            title: "Product: Upsell Revenue ₹20 Cr",
            owner: "Product Dept",
            progress: 65,
            colorKey: "dept",
            children: [
                { id: "t3", title: "Launch 3 new product tiers", owner: "Sneha Rao", progress: 70, colorKey: "team" },
                { id: "t4", title: "Reduce free-to-paid churn", owner: "Arjun Singh", progress: 55, colorKey: "team" },
            ],
        },
    ],
};

const LEVEL_ICONS = [Building2, Users, Target] as const;

const LEGEND_ITEMS = [
    { label: "Company", colorKey: "company" },
    { label: "Department", colorKey: "dept" },
    { label: "Team / Individual", colorKey: "team" },
] as const;

// Static color maps — no template literals
const NODE_BORDER: Record<string, string> = {
    company: "border-[#00E5A0]/25",
    dept: "border-[#0066FF]/25",
    team: "border-[#9D00FF]/25",
};

const NODE_ICON_BG: Record<string, string> = {
    company: "bg-[#00E5A0]/10",
    dept: "bg-[#0066FF]/10",
    team: "bg-[#9D00FF]/10",
};

const NODE_ICON_COLOR: Record<string, string> = {
    company: "text-[#00E5A0]",
    dept: "text-[#0066FF]",
    team: "text-[#9D00FF]",
};

const NODE_PROGRESS_BAR: Record<string, string> = {
    company: "bg-[#00E5A0]",
    dept: "bg-[#0066FF]",
    team: "bg-[#9D00FF]",
};

const NODE_PROGRESS_TEXT: Record<string, string> = {
    company: "text-[#00E5A0]",
    dept: "text-[#0066FF]",
    team: "text-[#9D00FF]",
};

const NODE_BADGE_STYLE: Record<string, string> = {
    company: "text-[#00E5A0] border-[#00E5A0]/25 bg-[#00E5A0]/10",
    dept: "text-[#0066FF] border-[#0066FF]/25 bg-[#0066FF]/10",
    team: "text-[#9D00FF] border-[#9D00FF]/25 bg-[#9D00FF]/10",
};

const LEGEND_DOT: Record<string, string> = {
    company: "bg-[#00E5A0]",
    dept: "bg-[#0066FF]",
    team: "bg-[#9D00FF]",
};

const LEVEL_LABEL = ["Company", "Dept", "Team"] as const;

const INDENT_CLASS = ["ml-0", "ml-6", "ml-12"] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function OKRCard({ node, level = 0 }: { node: OKRNode; level?: number }) {
    const Icon = LEVEL_ICONS[Math.min(level, LEVEL_ICONS.length - 1)];
    const levelLabel = LEVEL_LABEL[Math.min(level, LEVEL_LABEL.length - 1)];
    const indent = INDENT_CLASS[Math.min(level, INDENT_CLASS.length - 1)];

    return (
        <li className="relative">
            <div
                className={`flex items-start gap-3 bg-[#0D1928] border rounded-xl p-4 hover:border-opacity-60 transition-all ${indent} ${NODE_BORDER[node.colorKey]}`}
            >
                <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${NODE_ICON_BG[node.colorKey]}`}
                    aria-hidden="true"
                >
                    <Icon size={14} className={NODE_ICON_COLOR[node.colorKey]} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white mb-0.5 truncate">{node.title}</p>
                    <p className="text-[11px] text-[#8899AA] mb-2">{node.owner}</p>
                    <div className="flex items-center gap-2">
                        <div
                            className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={node.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${node.title}: ${node.progress}%`}
                        >
                            <div className={`h-full rounded-full ${NODE_PROGRESS_BAR[node.colorKey]}`} style={{ width: `${node.progress}%` }} />
                        </div>
                        <span className={`text-[11px] font-bold shrink-0 ${NODE_PROGRESS_TEXT[node.colorKey]}`}>{node.progress}%</span>
                    </div>
                </div>
                <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${NODE_BADGE_STYLE[node.colorKey]}`}>
                    {levelLabel}
                </span>
            </div>
            {node.children && (
                <ul
                    role="list"
                    className="mt-3 space-y-3 relative before:absolute before:left-[36px] before:top-0 before:bottom-0 before:w-px before:bg-[#1A2A3A]"
                >
                    {node.children.map((child) => (
                        <OKRCard key={child.id} node={child} level={level + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OKRAlignmentPage() {
    return (
        <Page
            title="OKR Alignment"
            subtitle="How individual OKRs cascade from company goals · Q1 2025"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "Alignment View" },
            ]}
            maxWidth="900px"
            actions={
                <GitBranch className="text-[#9D00FF]" size={20} aria-hidden="true" />






            }
        >
            <div className="space-y-6">
                {/* Legend */}
                <Card padding="sm">
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                        {LEGEND_ITEMS.map((l) => (
                            <div key={l.label} className="flex items-center gap-1.5">
                                <span className={`w-3 h-3 rounded-full ${LEGEND_DOT[l.colorKey]}`} aria-hidden="true" />
                                <span className="text-[#8899AA]">{l.label}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Tree */}
                <ul role="list" className="space-y-3">
                    <OKRCard node={TREE} level={0} />
                </ul>
            </div>
        

        

        

        </Page>
    );
}
