"use client";
import { useState } from "react";
import { Save, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Anchor {
    score: number;
    text: string;
}

interface BarsDimension {
    id: string;
    name: string;
    anchors: Anchor[];
}

const BARS_DIMENSIONS: BarsDimension[] = [
    {
        id: "d1",
        name: "Execution Speed",
        anchors: [
            { score: 1, text: "Frequently misses deadlines; requires constant follow-up and escalations." },
            { score: 2, text: "Sometimes misses deadlines; delivers with reminders and minimal oversight." },
            { score: 3, text: "Consistently meets deadlines with appropriate quality and no escalations needed." },
            { score: 4, text: "Consistently delivers ahead of schedule; proactively flags blockers early." },
            { score: 5, text: "Delivers complex work significantly faster than expected; sets the standard for the team." },
        ],
    },
    {
        id: "d2",
        name: "Stakeholder Management",
        anchors: [
            { score: 1, text: "Rarely communicates updates; stakeholders frequently unaware of status." },
            { score: 2, text: "Communicates reactively; updates shared only when requested." },
            { score: 3, text: "Maintains regular communication; stakeholders feel informed and aligned." },
            { score: 4, text: "Proactively aligns stakeholders; anticipates concerns and resolves them early." },
            { score: 5, text: "Masterfully manages complex stakeholder landscapes; builds lasting trust." },
        ],
    },
    {
        id: "d3",
        name: "Problem Solving",
        anchors: [
            { score: 1, text: "Struggles with ambiguous problems; frequently escalates without attempting solutions." },
            { score: 2, text: "Can solve structured problems; needs guidance in ambiguous situations." },
            { score: 3, text: "Independently identifies and solves problems with clear impact." },
            { score: 4, text: "Solves complex, cross-functional problems with creative and systematic approaches." },
            { score: 5, text: "Defines new frameworks for solving problems; builds team capability in the process." },
        ],
    },
];

const _ANCHOR_COLORS: Record<number, string> = {
    1: "#FF4444",
    2: "#FF4444",
    3: "#FFB800",
    4: "#00E5A0",
    5: "#00E5A0",
};

const ANCHOR_SELECTED_BG: Record<number, string> = {
    1: "bg-[#FF4444]/10 border-[#FF4444]",
    2: "bg-[#FF4444]/10 border-[#FF4444]",
    3: "bg-[#FFB800]/10 border-[#FFB800]",
    4: "bg-[#00E5A0]/10 border-[#00E5A0]",
    5: "bg-[#00E5A0]/10 border-[#00E5A0]",
};

const ANCHOR_CIRCLE_SELECTED: Record<number, string> = {
    1: "bg-[#FF4444] border-[#FF4444] text-[#060B14]",
    2: "bg-[#FF4444] border-[#FF4444] text-[#060B14]",
    3: "bg-[#FFB800] border-[#FFB800] text-[#060B14]",
    4: "bg-[#00E5A0] border-[#00E5A0] text-[#060B14]",
    5: "bg-[#00E5A0] border-[#00E5A0] text-[#060B14]",
};

export default function BARSFeedbackPage() {
    const [selected, setSelected] = useState<Record<string, number>>({});

    const allRated = Object.keys(selected).length === BARS_DIMENSIONS.length;

    return (
        <Page
            title="BARS Feedback"
            subtitle="Behaviorally Anchored Rating Scale — select the behavior that best matches the employee"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "BARS" },
            ]}
            maxWidth="800px"
            actions={
                <Button
                    icon={<Save size={14} />}
                    disabled={!allRated}
                >
                    Submit
                </Button>
            }
        >
            <ul role="list" className="space-y-6">
                {BARS_DIMENSIONS.map((dim) => (
                    <li key={dim.id}>
                        <Card padding="none">
                            <div className="px-6 py-4 border-b border-[#1A2A3A] flex items-center justify-between">
                                <h2 className="text-base font-semibold text-white">{dim.name}</h2>
                                {selected[dim.id] !== undefined && (
                                    <div
                                        className="flex items-center gap-1"
                                        aria-label={`Selected rating: ${selected[dim.id]} out of 5`}
                                    >
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <Star
                                                key={n}
                                                size={13}
                                                className={
                                                    n <= selected[dim.id]
                                                        ? "text-[#FFB800] fill-[#FFB800]"
                                                        : "text-[#2A3A4A]"
                                                }
                                                aria-hidden="true"
                                            />
                                        ))}
                                        <span className="text-xs font-bold text-[#FFB800] ml-1">
                                            {selected[dim.id]}/5
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4" role="radiogroup" aria-label={`${dim.name} behavioral anchors`}>
                                {dim.anchors.map((anchor) => {
                                    const isSelected = selected[dim.id] === anchor.score;
                                    return (
                                        <label
                                            key={anchor.score}
                                            className={`flex items-start gap-4 p-4 rounded-xl mb-2 last:mb-0 cursor-pointer border transition-all ${
                                                isSelected
                                                    ? ANCHOR_SELECTED_BG[anchor.score]
                                                    : "border-transparent hover:bg-[#152336]"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={dim.id}
                                                value={anchor.score}
                                                checked={isSelected}
                                                onChange={() =>
                                                    setSelected((s) => ({ ...s, [dim.id]: anchor.score }))
                                                }
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2 transition-all ${
                                                    isSelected
                                                        ? ANCHOR_CIRCLE_SELECTED[anchor.score]
                                                        : "border-[#2A3A4A] text-[#445566]"
                                                }`}
                                                aria-hidden="true"
                                            >
                                                {anchor.score}
                                            </div>
                                            <p
                                                className={`text-sm leading-relaxed pt-0.5 ${
                                                    isSelected ? "text-white font-medium" : "text-[#8899AA]"
                                                }`}
                                            >
                                                {anchor.text}
                                            </p>
                                        </label>
                                    );
                                })}
                            </div>
                        </Card>
                    </li>
                ))}
            </ul>
        </Page>
    );
}
