"use client";

import { Heart, Target, Clock, ShieldCheck, Lock, Eye, Users, ArrowUp, ArrowRight, ArrowDown, ChevronRight, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

type Trend = "up" | "neutral" | "down";

interface CategoryCard {
    id: number;
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    score: string;
    msg: string;
    trend: Trend;
    val: string;
    color: string;
}

const CATEGORIES: CategoryCard[] = [
    { id: 1, title: "Accuracy Score", icon: Target, score: "94/100", msg: "0 payroll errors in last 3 months", trend: "up", val: "+2", color: "#00E5A0" },
    { id: 2, title: "Timeliness Score", icon: Clock, score: "91/100", msg: "Salary credited by 30th for 11/12 months", trend: "neutral", val: "Same", color: "#FFB800" },
    { id: 3, title: "Compliance Score", icon: ShieldCheck, score: "89/100", msg: "2 minor PF filing delays in 12 months", trend: "up", val: "+5", color: "#00E5A0" },
    { id: 4, title: "Fraud Prevention", icon: Lock, score: "95/100", msg: "AI detected 12 anomalies, all resolved", trend: "up", val: "+1", color: "#00E5A0" },
    { id: 5, title: "Transparency", icon: Eye, score: "82/100", msg: "Employee payslip open rate: 64%", trend: "up", val: "+8", color: "#00E5A0" },
    { id: 6, title: "Employee Satisfaction", icon: Users, score: "76/100", msg: "Salary queries: 23 last month", trend: "down", val: "-3", color: "#FF4444" },
];

const TREND_ICON: Record<Trend, React.ReactNode> = {
    up: <ArrowUp size={14} aria-hidden="true" />,
    neutral: <ArrowRight size={14} aria-hidden="true" />,
    down: <ArrowDown size={14} aria-hidden="true" />,
};

const TREND_COLOR: Record<Trend, string> = {
    up: "text-[#00E5A0]",
    neutral: "text-[#FFB800]",
    down: "text-[#FF4444]",
};

const RECOMMENDED_ACTIONS = [
    {
        type: "improve" as const,
        title: "Improve: Increase payslip open rate",
        desc: "Currently at 64% — target 80% to improve Transparency score.",
        action: "Configure Alert",
    },
    {
        type: "improve" as const,
        title: "Improve: Enable WhatsApp delivery",
        desc: "35 employees are still receiving payslips only via portal. Enabling WhatsApp will boost Satisfaction score.",
        action: "Enable Integration",
    },
    {
        type: "maintain" as const,
        title: "Maintain: PF filing on time",
        desc: "Scheduled to be filed by 15th April to maintain your 100% timeliness streak.",
        action: null,
    },
] as const;

export default function PayrollHealthScorePage() {
    return (
        <Page
            title="Payroll Health Score"
            subtitle="Overall payroll operations efficiency and compliance rating"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Health Score" },
            ]}
            maxWidth="1100px"
            actions={
                <div className="flex items-center gap-2">
                    <Heart size={18} className="text-[#00E5A0]" aria-hidden="true" />
                    <span className="text-sm font-medium text-[#00E5A0]">A — Excellent</span>
                </div>
            }
        >
            {/* Overall Score Card */}
            <Card padding="lg">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Donut Ring */}
                    <div className="relative w-40 h-40 shrink-0" aria-hidden="true">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#1A2A3A" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#00E5A0" strokeWidth="8" strokeDasharray="283" strokeDashoffset="36.79" className="drop-shadow-[0_0_8px_rgba(0,229,160,0.5)]" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-[#00E5A0]">87</span>
                            <span className="text-xs text-[#8899AA] font-medium tracking-widest mt-0.5">/ 100</span>
                        </div>
                    </div>
                    <div
                        role="meter"
                        aria-valuenow={87}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Payroll Health Score: 87 out of 100"
                        className="sr-only"
                    />

                    {/* Score Text */}
                    <div className="flex-1 text-center md:text-left border-b md:border-b-0 md:border-r border-[#1A2A3A] pb-6 md:pb-0 md:pr-10">
                        <h3 className="text-4xl font-bold text-white tracking-tight">A — Excellent</h3>
                        <p className="text-[#8899AA] mt-2 text-lg">Your payroll operations are highly efficient and compliant.</p>
                    </div>

                    {/* Quick Stats */}
                    <dl className="shrink-0 grid grid-cols-2 gap-x-12 gap-y-4">
                        <div>
                            <dt className="text-sm text-[#8899AA] mb-1">Industry Avg</dt>
                            <dd className="text-2xl font-semibold text-white">72</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-[#8899AA] mb-1">Your Score</dt>
                            <dd className="text-2xl font-semibold text-[#00E5A0]">87</dd>
                        </div>
                        <div className="col-span-2">
                            <dt className="text-sm text-[#8899AA] mb-1">Trend vs Last Month</dt>
                            <dd className="text-lg font-medium text-[#00E5A0] flex items-center gap-1">
                                <ArrowUp size={14} aria-hidden="true" /> +4 points
                            </dd>
                        </div>
                    </dl>
                </div>
            </Card>

            {/* Category Breakdown */}
            <h3 className="text-lg font-semibold text-white">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                    <Card key={cat.id} padding="md" className="cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-[#1A2A3A]" aria-hidden="true" style={{ color: cat.color }}>
                                    <cat.icon size={18} />
                                </div>
                                <h4 className="font-semibold text-white">{cat.title}</h4>
                            </div>
                            <span className="text-lg font-bold" style={{ color: cat.color }}>{cat.score}</span>
                        </div>

                        <p className="text-sm text-[#8899AA] mb-4 h-10">{cat.msg}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-[#1A2A3A]">
                            <div className={`flex items-center gap-1.5 text-sm font-medium ${TREND_COLOR[cat.trend]}`}>
                                {TREND_ICON[cat.trend]}
                                {cat.val}
                            </div>
                            <ChevronRight size={14} className="text-[#8899AA] group-hover:text-white transition-colors" aria-hidden="true" />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recommended Actions */}
            <Card padding="lg">
                <h3 className="text-lg font-semibold text-white mb-5">Recommended Actions</h3>
                <div className="space-y-3">
                    {RECOMMENDED_ACTIONS.map((action) => (
                        <div
                            key={action.title}
                            className={`flex items-start gap-4 p-4 bg-[#060B14] rounded-lg border transition-colors ${
                                action.type === "improve"
                                    ? "border-[#1A2A3A] hover:border-[#FFB800]/50"
                                    : "border-[#1A2A3A] hover:border-[#00E5A0]/50"
                            }`}
                        >
                            <div className={`p-1.5 rounded-md shrink-0 mt-0.5 ${action.type === "improve" ? "bg-[#FFB800]/10" : "bg-[#00E5A0]/10"}`} aria-hidden="true">
                                {action.type === "improve"
                                    ? <ArrowUp size={14} className="text-[#FFB800]" />
                                    : <CheckCircle2 size={14} className="text-[#00E5A0]" />
                                }
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">{action.title}</p>
                                <p className="text-sm text-[#8899AA] mt-1">{action.desc}</p>
                            </div>
                            {action.action && (
                                <Button variant="secondary" size="sm">{action.action}</Button>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </Page>
    );
}
