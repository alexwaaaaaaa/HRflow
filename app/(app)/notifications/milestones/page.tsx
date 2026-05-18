"use client";

import { ArrowRight, Award } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Milestone {
    id: number;
    title: string;
    desc: string;
    time: string;
    dotColor: string;
    variant: "warning" | "success" | "info";
    opacity: string;
}

const MILESTONES: Milestone[] = [
    {
        id: 1,
        title: "Promotion: Senior Software Engineer (IC3)",
        desc: "Congratulations! Based on your H1 performance review, you have been promoted. Your new compensation pack applies from the next cycle.",
        time: "Just Now",
        dotColor: "bg-amber-500",
        variant: "warning",
        opacity: "",
    },
    {
        id: 2,
        title: "Skill Unlocked: System Design Architect",
        desc: "You successfully completed the mandatory advanced system architecture modules.",
        time: "3 Months Ago",
        dotColor: "bg-emerald-500",
        variant: "success",
        opacity: "opacity-80",
    },
    {
        id: 3,
        title: "Joined as SDE II (IC2)",
        desc: "Welcomed to the Frontend Engineering pod.",
        time: "2 Years Ago",
        dotColor: "bg-indigo-500",
        variant: "info",
        opacity: "opacity-60",
    },
];

export default function CareerMilestonePage() {
    return (
        <Page
            title="Career Milestones"
            subtitle="Updates on promotions, skill completions, and career path progressions"
            breadcrumbs={[
                { label: "Notifications", href: "/notifications" },
                { label: "Milestones" },
            ]}
            maxWidth="800px"
        >
            <div className="relative ml-6 mt-10 space-y-8 border-l border-[#1A2A3A] pl-8">
                {MILESTONES.map((m) => (
                    <div key={m.id} className={`relative ${m.opacity}`}>
                        <span
                            className={`absolute -left-[45px] z-10 h-6 w-6 rounded-full border-4 border-[#060D1A] ${m.dotColor}`}
                            aria-hidden="true"
                        />
                        <Card
                            padding="lg"
                            className={
                                m.id === 1
                                    ? "border-amber-500/30 shadow-[0_5px_20px_rgba(245,158,11,0.05)]"
                                    : ""
                            }
                        >
                            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                                <h3 className="text-lg font-bold text-white">{m.title}</h3>
                                <Badge variant="neutral">{m.time}</Badge>
                            </div>
                            <p className="mb-4 text-sm text-[#CCDDEE]">{m.desc}</p>
                            {m.id === 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    iconRight={<ArrowRight size={14} aria-hidden="true" />}
                                >
                                    View New Career Framework
                                </Button>
                            )}
                        </Card>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-[#556677]">
                <Award size={14} className="text-amber-500" aria-hidden="true" />
                Milestones are updated automatically from your performance and LMS records.
            </div>
        </Page>
    );
}
