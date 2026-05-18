"use client";
import { useState } from "react";
import { CheckCircle2, Save, AlertTriangle, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

interface Competency {
    id: string;
    name: string;
    desc: string;
}

const COMPETENCIES: Competency[] = [
    { id: "leadership", name: "Leadership & Ownership", desc: "Takes initiative, drives results, demonstrates accountability" },
    { id: "collaboration", name: "Collaboration", desc: "Works effectively with others, fosters team success" },
    { id: "communication", name: "Communication", desc: "Clear, concise, and effective in all communication forms" },
    { id: "execution", name: "Execution & Delivery", desc: "Consistently delivers high-quality results on time" },
    { id: "innovation", name: "Innovation & Learning", desc: "Drives new ideas, embraces learning, adapts to change" },
    { id: "customer", name: "Customer Centricity", desc: "Focuses on end-user or stakeholder value" },
];

const RATING_LABELS = [
    "",
    "Below Expectations",
    "Needs Improvement",
    "Meets Expectations",
    "Exceeds Expectations",
    "Outstanding",
] as const;

const ICON_BG: Record<string, string> = {
    high: "bg-[#00E5A0]/20",
    mid: "bg-[#FFB800]/20",
    low: "bg-[#FF4444]/20",
    none: "bg-[#1A2A3A]",
};

const ICON_COLOR: Record<string, string> = {
    high: "text-[#00E5A0]",
    mid: "text-[#FFB800]",
    low: "text-[#FF4444]",
    none: "text-[#445566]",
};

const RATING_TEXT_COLOR: Record<string, string> = {
    high: "text-[#00E5A0]",
    mid: "text-[#FFB800]",
    low: "text-[#FF4444]",
    none: "text-[#8899AA]",
};

function getRatingTier(val: number): "high" | "mid" | "low" | "none" {
    if (val >= 4) return "high";
    if (val >= 3) return "mid";
    if (val > 0) return "low";
    return "none";
}

interface StarRowProps {
    comp: Competency;
    ratings: Record<string, number>;
    evidence: Record<string, string>;
    onRate: (id: string, val: number) => void;
    onEvidence: (id: string, val: string) => void;
}

function StarRow({ comp, ratings, evidence, onRate, onEvidence }: StarRowProps) {
    const val = ratings[comp.id] ?? 0;
    const [hover, setHover] = useState(0);
    const tier = getRatingTier(val);

    return (
        <Card padding="md">
            <div className="flex items-start gap-3 mb-4">
                <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${ICON_BG[tier]}`}
                    aria-hidden="true"
                >
                    <CheckCircle2 size={14} className={ICON_COLOR[tier]} />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white">{comp.name}</h3>
                    <p className="text-xs text-[#8899AA]">{comp.desc}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
                <div
                    className="flex items-center gap-1.5"
                    role="radiogroup"
                    aria-label={`Rating for ${comp.name}`}
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <label key={n}>
                            <input
                                type="radio"
                                name={comp.id}
                                value={n}
                                className="sr-only"
                                onChange={() => onRate(comp.id, n)}
                                checked={val === n}
                            />
                            <Star
                                size={24}
                                onMouseEnter={() => setHover(n)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => onRate(comp.id, n)}
                                className={`cursor-pointer transition-colors ${
                                    n <= (hover || val)
                                        ? "text-[#FFB800] fill-[#FFB800]"
                                        : "text-[#2A3A4A]"
                                }`}
                                aria-hidden="true"
                            />
                        </label>
                    ))}
                </div>
                {val > 0 && (
                    <span className={`text-xs font-bold ml-2 ${RATING_TEXT_COLOR[tier]}`}>
                        {RATING_LABELS[val]}
                    </span>
                )}
            </div>
            <div>
                <label htmlFor={`ev-${comp.id}`} className="sr-only">
                    Evidence for {comp.name}
                </label>
                <input
                    id={`ev-${comp.id}`}
                    type="text"
                    value={evidence[comp.id] ?? ""}
                    onChange={(e) => onEvidence(comp.id, e.target.value)}
                    placeholder="Specific example or evidence…"
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 py-2 text-xs text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF]"
                />
            </div>
        </Card>
    );
}

export default function CompetencyAssessmentPage() {
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [evidence, setEvidence] = useState<Record<string, string>>({});

    const rated = Object.keys(ratings).length;
    const radarData = COMPETENCIES.map((c) => ({
        subject: c.name.split(" ")[0],
        score: ratings[c.id] ?? 0,
    }));

    const handleRate = (id: string, val: number) =>
        setRatings((r) => ({ ...r, [id]: val }));
    const handleEvidence = (id: string, val: string) =>
        setEvidence((ev) => ({ ...ev, [id]: val }));

    return (
        <Page
            title="Competency Assessment"
            subtitle="Self-assessment — rate each competency honestly"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Competency Assessment" },
            ]}
            maxWidth="1100px"
            actions={
                <>








                    <span className="text-xs text-[#8899AA]">
                        {rated}/{COMPETENCIES.length} rated
                    </span>
                    <Button icon={<Save size={14} />} disabled={rated < COMPETENCIES.length}>
                        Submit
                    </Button>
                </>
            }
        >
            {/* Progress bar */}
            <div
                className="h-1 bg-[#9D00FF] rounded-full transition-all duration-500"
                role="progressbar"
                aria-valuenow={Math.round((rated / COMPETENCIES.length) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Assessment completion: ${rated} of ${COMPETENCIES.length} competencies rated`}
                style={{ width: `${Math.round((rated / COMPETENCIES.length) * 100)}%` }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                <div className="space-y-4">
                    <Card padding="sm" variant="elevated">
                        <div className="flex items-center gap-2">
                            <AlertTriangle
                                size={14}
                                className="text-[#FFB800] shrink-0"
                                aria-hidden="true"
                            />
                            <p className="text-xs text-[#CCDDEE]">
                                For self-assessment. Rate each competency honestly — your manager and HR will
                                review this alongside peer feedback.
                            </p>
                        </div>
                    </Card>
                    {COMPETENCIES.map((c) => (
                        <StarRow
                            key={c.id}
                            comp={c}
                            ratings={ratings}
                            evidence={evidence}
                            onRate={handleRate}
                            onEvidence={handleEvidence}
                        />
                    ))}
                </div>

                {/* Radar preview */}
                <div
                    className="sticky top-20 self-start"
                    aria-label="Live radar preview of competency ratings"
                >
                    <Card padding="md">
                        <h2 className="text-sm font-semibold text-white mb-1">Live Preview</h2>
                        <p className="text-xs text-[#8899AA] mb-3">
                            Your competency profile (updates as you rate)
                        </p>
                        <div className="h-52">
                            <ChartWrapper height="h-full">
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="#1A2A3A" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: "#8899AA", fontSize: 10 }}
                                    />
                                    <Radar
                                        dataKey="score"
                                        stroke="#9D00FF"
                                        fill="#9D00FF"
                                        fillOpacity={0.25}
                                        strokeWidth={2}
                                    />
                                </RadarChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </div>
            </div>
        

        

        

            
        </Page>
    );
}
