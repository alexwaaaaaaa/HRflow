"use client";

import { HeartPulse, BookOpen, Target, TrendingUp, PlayCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

const RECOMMENDED_ACTIONS = [
    {
        icon: Target,
        iconColor: "text-indigo-400",
        borderColor: "border-indigo-500/20",
        bgColor: "bg-indigo-500/5",
        hoverBg: "hover:bg-indigo-500/10",
        hoverText: "group-hover:text-indigo-400",
        title: "Start an Emergency Fund",
        desc: "Set up automated Rs 5,000/mo deduction into an FD.",
    },
    {
        icon: HeartPulse,
        iconColor: "text-pink-400",
        borderColor: "border-pink-500/20",
        bgColor: "bg-pink-500/5",
        hoverBg: "hover:bg-pink-500/10",
        hoverText: "group-hover:text-pink-400",
        title: "Review Health Cover",
        desc: "Your coverage is Rs 3L. Consider top-up as you recently added a dependent.",
    },
] as const;

const LEARNING_MODULES = [
    {
        id: "tax",
        icon: PlayCircle,
        iconColor: "text-[#00E5FF]",
        gradientFrom: "from-[#00E5FF]/20",
        hoverBorder: "hover:border-[#00E5FF]/50",
        hoverText: "group-hover:text-[#00E5FF]",
        tag: "Video Course • 45 mins",
        tagColor: "text-[#00E5FF]",
        title: "Mastering Tax Deductions (80C, 80D)",
        desc: "Learn how to maximize your take-home pay legally under the new regime.",
    },
    {
        id: "investing",
        icon: BookOpen,
        iconColor: "text-purple-400",
        gradientFrom: "from-purple-500/20",
        hoverBorder: "hover:border-purple-500/50",
        hoverText: "group-hover:text-purple-400",
        tag: "Article Read • 10 mins",
        tagColor: "text-purple-400",
        title: "Investing 101 for Beginners",
        desc: "Understanding Mutual Funds, SIPs, and Compounding interest basics.",
    },
    {
        id: "retirement",
        icon: Target,
        iconColor: "text-emerald-400",
        gradientFrom: "from-emerald-500/20",
        hoverBorder: "hover:border-emerald-500/50",
        hoverText: "group-hover:text-emerald-400",
        tag: "Interactive Tool",
        tagColor: "text-emerald-400",
        title: "Retirement Calculator",
        desc: "Project your EPF and NPS corpus at age 60 based on current contributions.",
    },
] as const;

export default function FinancialWellnessPage() {
    return (
        <Page
            title="Financial Wellness Hub"
            subtitle="Tools, courses, and resources to help you achieve your financial goals"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Financial Wellness Hub" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Health Score */}
                <Card padding="lg" className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#0D1928] to-[#122235]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-5 rounded-full blur-3xl -mr-20 -mt-20" aria-hidden="true" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-2">Your Financial Health Score</h2>
                        <p className="text-[#8899AA] mb-6">Based on your savings rate, EWA usage, and active learning modules.</p>
                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-6xl font-black text-emerald-400" aria-label="Financial health score: 85 out of 100">85</span>
                            <span className="text-xl text-[#8899AA] mb-2">/ 100</span>
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full mb-3 ml-2">
                                <TrendingUp size={12} aria-hidden="true" /> Top 15% in company
                            </span>
                        </div>
                        <div
                            className="w-full bg-[#1A2A3A] rounded-full h-2 mb-2"
                            role="progressbar"
                            aria-valuenow={85}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Financial health score"
                        >
                            <div className="bg-emerald-400 h-2 rounded-full w-[85%]" />
                        </div>
                        <div className="flex justify-between text-xs text-[#8899AA]">
                            <span>Needs Attention</span>
                            <span>Excellent</span>
                        </div>
                    </div>
                </Card>

                {/* Recommended Actions */}
                <Card padding="lg">
                    <h3 className="text-lg font-bold text-white mb-4">Recommended Actions</h3>
                    <div className="space-y-4">
                        {RECOMMENDED_ACTIONS.map((action) => (
                            <div
                                key={action.title}
                                className={`p-4 rounded-xl border ${action.borderColor} ${action.bgColor} ${action.hoverBg} transition-colors cursor-pointer group`}
                            >
                                <div className="flex items-start gap-3">
                                    <action.icon size={20} className={`${action.iconColor} mt-0.5`} aria-hidden="true" />
                                    <div>
                                        <h4 className={`text-sm font-semibold text-white ${action.hoverText} transition-colors`}>{action.title}</h4>
                                        <p className="text-xs text-[#8899AA] mt-1">{action.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <h2 className="text-xl font-bold text-white mb-6">Learning Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LEARNING_MODULES.map((module) => (
                    <Card key={module.id} padding="none" className={`overflow-hidden group cursor-pointer ${module.hoverBorder} transition-colors`}>
                        <div className="h-32 bg-[#1A2A3A] relative overflow-hidden flex items-center justify-center">
                            <div className={`absolute inset-0 bg-gradient-to-br ${module.gradientFrom} to-transparent`} aria-hidden="true" />
                            <module.icon size={48} className={`${module.iconColor} opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all z-10`} aria-hidden="true" />
                        </div>
                        <div className="p-5">
                            <div className={`text-xs ${module.tagColor} font-medium mb-2`}>{module.tag}</div>
                            <h3 className={`text-base font-bold text-white mb-2 ${module.hoverText} transition-colors`}>{module.title}</h3>
                            <p className="text-sm text-[#8899AA]">{module.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </Page>
    );
}
