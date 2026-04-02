"use client";
import React from "react";
import Link from "next/link";
import { GitBranch, ChevronRight, Target, Users, Building2 } from "lucide-react";

interface OKRNode {
    id: string;
    title: string;
    owner: string;
    progress: number;
    color: string;
    children?: OKRNode[];
}

const TREE: OKRNode = {
    id: "c1",
    title: "Achieve ₹100 Cr ARR",
    owner: "CEO Office",
    progress: 72,
    color: "#00E5A0",
    children: [
        {
            id: "d1",
            title: "Sales: Close 50 Enterprise Deals",
            owner: "Sales Dept",
            progress: 78,
            color: "#0066FF",
            children: [
                { id: "t1", title: "Drive 40% growth – Segment A", owner: "Priya Mehta", progress: 60, color: "#9D00FF" },
                { id: "t2", title: "Enterprise outreach to 200 accounts", owner: "Ravi Kumar", progress: 82, color: "#9D00FF" },
            ],
        },
        {
            id: "d2",
            title: "Product: Upsell Revenue ₹20 Cr",
            owner: "Product Dept",
            progress: 65,
            color: "#0066FF",
            children: [
                { id: "t3", title: "Launch 3 new product tiers", owner: "Sneha Rao", progress: 70, color: "#9D00FF" },
                { id: "t4", title: "Reduce free-to-paid churn", owner: "Arjun Singh", progress: 55, color: "#9D00FF" },
            ],
        },
    ],
};

function OKRCard({ node, level = 0 }: { node: OKRNode; level?: number }) {
    const icons = [Building2, Users, Target];
    const Icon = icons[Math.min(level, icons.length - 1)];
    return (
        <li className="relative">
            <div
                className="flex items-start gap-3 bg-[#0D1928] border rounded-xl p-4 hover:border-opacity-60 transition-all"
                style={{ borderColor: node.color + "40", marginLeft: level * 24 }}
            >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: node.color + "20" }} aria-hidden="true">
                    <Icon size={14} style={{ color: node.color }} />
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
                            <div className="h-full rounded-full" style={{ width: `${node.progress}%`, background: node.color }} />
                        </div>
                        <span className="text-[11px] font-bold shrink-0" style={{ color: node.color }}>{node.progress}%</span>
                    </div>
                </div>
                <span
                    className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{ color: node.color, borderColor: node.color + "40", background: node.color + "15" }}
                >
                    {level === 0 ? "Company" : level === 1 ? "Dept" : "Team"}
                </span>
            </div>
            {node.children && (
                <ul role="list" className="mt-3 space-y-3 relative before:absolute before:left-[36px] before:top-0 before:bottom-0 before:w-px before:bg-[#1A2A3A]">
                    {node.children.map(child => (
                        <OKRCard key={child.id} node={child} level={level + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function OKRAlignmentScreen() {
    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/okr/dashboard" className="hover:text-white transition-colors">OKRs</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">Alignment View</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <GitBranch className="text-[#9D00FF]" size={24} aria-hidden="true" /> OKR Alignment
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">How individual OKRs cascade from company goals · Q1 2025</p>
                    </div>
                </header>

                {/* Legend */}
                <div className="flex items-center gap-4 text-xs">
                    {[
                        { label: "Company", color: "#00E5A0" },
                        { label: "Department", color: "#0066FF" },
                        { label: "Team / Individual", color: "#9D00FF" },
                    ].map(l => (
                        <div key={l.label} className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                            <span className="text-[#8899AA]">{l.label}</span>
                        </div>
                    ))}
                </div>

                {/* Tree */}
                <ul role="list" className="space-y-3">
                    <OKRCard node={TREE} level={0} />
                </ul>

            </div>
        </main>
    );
}
