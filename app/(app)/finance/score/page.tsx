"use client";

import { TrendingUp, AlertTriangle, CheckCircle2, ShieldAlert, FileText } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

const SCORE_HISTORY = [
    { month: "Jan", score: 710 },
    { month: "Feb", score: 715 },
    { month: "Mar", score: 725 },
    { month: "Apr", score: 732 },
    { month: "May", score: 740 },
    { month: "Jun", score: 745 },
];

const SCORE_FACTORS = [
    {
        icon: CheckCircle2,
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-400",
        title: "Payment History",
        body: "You have a 100% on-time payment record for the last 24 months. This is the strongest factor boosting your score.",
        pct: 100,
        barColor: "bg-emerald-400",
        impact: "Impact: High",
        sentiment: "Positive",
        sentimentColor: "text-emerald-400",
    },
    {
        icon: AlertTriangle,
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-400",
        title: "Credit Utilization",
        body: "Currently utilizing 42% of available corporate credit limits. Keeping this below 30% can improve your score.",
        pct: 42,
        barColor: "bg-amber-400",
        impact: "Impact: Medium",
        sentiment: "Moderate",
        sentimentColor: "text-amber-400",
    },
    {
        icon: ShieldAlert,
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-400",
        title: "Company Age",
        body: "Your corporate identity has been established for 4.5 years. Scores generally favor businesses older than 5 years.",
        pct: 85,
        barColor: "bg-pink-400",
        impact: "Impact: Low",
        sentiment: "Needs Time",
        sentimentColor: "text-pink-400",
    },
] as const;

export default function CreditScorePage() {
    return (
        <Page
            title="Company Credit Score"
            subtitle="Monitor organizational financial health and creditworthiness"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Credit Score" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<FileText size={14} />}>Download Report</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main Score Card */}
                <Card padding="lg" className="lg:col-span-1 relative overflow-hidden flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0D1928] to-[#122235]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF] opacity-5 rounded-full blur-3xl -mr-20 -mt-20" aria-hidden="true" />
                    <p className="text-[#8899AA] text-sm font-medium mb-4">Experian Business Credit Score</p>
                    <div className="relative mb-4">
                        <svg className="w-40 h-40 transform -rotate-90" aria-hidden="true">
                            <circle cx="80" cy="80" r="70" stroke="#1A2A3A" strokeWidth="12" fill="none" />
                            <circle cx="80" cy="80" r="70" stroke="#00E5FF" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="110" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white tracking-tight" aria-label="Credit score: 745 out of 1000">745</span>
                            <span className="text-xs font-semibold text-[#00E5FF] uppercase tracking-wider mt-1">Excellent</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1.5 rounded-full">
                        <TrendingUp size={16} aria-hidden="true" />
                        +12 pts from last month
                    </div>
                </Card>

                {/* Score History Chart */}
                <Card padding="lg" className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-6">Score History (6 Months)</h2>
                    <div className="h-64">
                        <ChartWrapper height="h-full">
                            <AreaChart data={SCORE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis domain={[650, 800]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    itemStyle={{ color: "#00E5FF" }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </Card>
            </div>

            <h2 className="text-lg font-bold text-white mb-4">Key Factors Affecting Your Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SCORE_FACTORS.map((factor) => (
                    <Card key={factor.title} padding="lg">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full ${factor.iconBg} flex items-center justify-center ${factor.iconColor}`}>
                                <factor.icon size={20} aria-hidden="true" />
                            </div>
                            <h3 className="text-base font-semibold text-white">{factor.title}</h3>
                        </div>
                        <p className="text-sm text-[#8899AA] mb-4">{factor.body}</p>
                        <div
                            className="w-full bg-[#1A2A3A] rounded-full h-1.5"
                            role="progressbar"
                            aria-valuenow={factor.pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={factor.title}
                        >
                            <div className={`${factor.barColor} h-1.5 rounded-full`} style={{ width: `${factor.pct}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                            <span>{factor.impact}</span>
                            <span className={factor.sentimentColor}>{factor.sentiment}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </Page>
    );
}
