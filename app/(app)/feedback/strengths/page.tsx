"use client";
import { useState } from "react";
import { Plus, CheckCircle2, BookOpen } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ─────────────────────────────────────────────────────────────

interface StrengthItem {
    name: string;
    score: number;
    mentions: number;
}

const STRENGTHS: StrengthItem[] = [
    { name: "Strategic Ownership", score: 4.5, mentions: 8 },
    { name: "Cross-functional Collaboration", score: 4.3, mentions: 7 },
    { name: "Problem Solving", score: 4.2, mentions: 6 },
];

const GROWTH: StrengthItem[] = [
    { name: "Delegation", score: 3.2, mentions: 5 },
    { name: "Public Speaking", score: 3.0, mentions: 4 },
];

interface DevAction {
    text: string;
    done: boolean;
}

interface DevPlan {
    area: string;
    actions: DevAction[];
}

const INITIAL_DEV_PLANS: DevPlan[] = [
    {
        area: "Delegation",
        actions: [
            { text: "Complete 'Leading Without Micromanaging' course on LMS", done: true },
            { text: "Assign 2 full projects to team leads with minimal oversight", done: false },
            { text: "Weekly 1:1 with manager to review delegation effectiveness", done: false },
        ],
    },
    {
        area: "Public Speaking",
        actions: [
            { text: "Join Toastmasters or internal speaking club", done: false },
            { text: "Present at next company all-hands", done: false },
            { text: "Record and review 2 practice presentations", done: false },
        ],
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ProgressBarProps {
    score: number;
    color: string;
    label: string;
}

function ProgressBar({ score, color, label }: ProgressBarProps) {
    const pct = score * 20;
    return (
        <div
            className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
        >
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: color }}
            />
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StrengthsDevelopmentPage() {
    const [plans, setPlans] = useState<DevPlan[]>(INITIAL_DEV_PLANS);

    const toggle = (areaIdx: number, actionIdx: number) =>
        setPlans((prev) =>
            prev.map((p, ai) =>
                ai !== areaIdx
                    ? p
                    : {
                          ...p,
                          actions: p.actions.map((a, bi) =>
                              bi !== actionIdx ? a : { ...a, done: !a.done }
                          ),
                      }
            )
        );

    return (
        <Page
            title="Strengths Development"
            subtitle="Based on your 360° feedback — Mid-Year 2025"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Strengths & Development" },
            ]}
            maxWidth="1100px"
        >






            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                        Top Strengths
                    </h2>
                    <ul role="list" className="space-y-4">
                        {STRENGTHS.map((s) => (
                            <li key={s.name} className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-white">{s.name}</span>
                                    <span className="text-xs font-bold text-[#00E5A0]">
                                        {s.score}
                                    </span>
                                </div>
                                <ProgressBar
                                    score={s.score}
                                    color="#00E5A0"
                                    label={`${s.name}: ${s.score} out of 5`}
                                />
                                <p className="text-[11px] text-[#8899AA]">
                                    {s.mentions} reviewers mentioned this
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Growth Areas */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                        <BookOpen size={16} className="text-[#FFB800]" aria-hidden="true" />
                        Growth Areas
                    </h2>
                    <ul role="list" className="space-y-4">
                        {GROWTH.map((g) => (
                            <li key={g.name} className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-white">{g.name}</span>
                                    <span className="text-xs font-bold text-[#FFB800]">
                                        {g.score}
                                    </span>
                                </div>
                                <ProgressBar
                                    score={g.score}
                                    color="#FFB800"
                                    label={`${g.name}: ${g.score} out of 5`}
                                />
                                <p className="text-[11px] text-[#8899AA]">
                                    {g.mentions} reviewers flagged this
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* Development Plans */}
            <section aria-labelledby="dev-plan-heading">
                <div className="flex items-center justify-between mb-4">
                    <h2
                        id="dev-plan-heading"
                        className="text-base font-semibold text-white"
                    >
                        Development Action Plans
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={<Plus size={12} />}
                        type="button"
                    >
                        Add Goal
                    </Button>
                </div>
                <ul role="list" className="space-y-4">
                    {plans.map((plan, ai) => {
                        const done = plan.actions.filter((a) => a.done).length;
                        const pct = Math.round((done / plan.actions.length) * 100);
                        return (
                            <li key={plan.area}>
                                <Card padding="md">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-base font-semibold text-white">
                                            {plan.area} — Development Plan
                                        </h3>
                                        <span className="text-xs text-[#8899AA]">
                                            {done} / {plan.actions.length} complete
                                        </span>
                                    </div>
                                    <div
                                        className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden mb-4"
                                        role="progressbar"
                                        aria-valuenow={pct}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${plan.area} plan: ${done} of ${plan.actions.length} actions complete`}
                                    >
                                        <div
                                            className="h-full bg-[#9D00FF] rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <ul role="list" className="space-y-2">
                                        {plan.actions.map((action, bi) => (
                                            <li key={bi}>
                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={action.done}
                                                        onChange={() => toggle(ai, bi)}
                                                        className="sr-only"
                                                    />
                                                    <span
                                                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                                            action.done
                                                                ? "bg-[#00E5A0] border-[#00E5A0]"
                                                                : "border-[#2A3A4A] group-hover:border-[#00E5A0]/50"
                                                        }`}
                                                        aria-hidden="true"
                                                    >
                                                        {action.done && (
                                                            <CheckCircle2
                                                                size={12}
                                                                className="text-[#060B14]"
                                                            />
                                                        )}
                                                    </span>
                                                    <span
                                                        className={`text-sm ${
                                                            action.done
                                                                ? "line-through text-[#445566]"
                                                                : "text-white"
                                                        }`}
                                                    >
                                                        {action.text}
                                                    </span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </li>
                        );
                    })}
                </ul>
            </section>
        

        

        

        </Page>
    );
}
