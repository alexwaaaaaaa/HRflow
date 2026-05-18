"use client";

import { useState } from "react";
import { MessageSquare, Star, Smile, Frown, Meh, ChevronRight, Shield, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type WlbRating = "excellent" | "average" | "poor";

const WLB_OPTIONS: { id: WlbRating; label: string; icon: typeof Smile }[] = [
    { id: "excellent", label: "Excellent", icon: Smile },
    { id: "average", label: "Average", icon: Meh },
    { id: "poor", label: "Poor", icon: Frown },
];

export default function ExitInterviewEmployee() {
    const [rating, setRating] = useState(0);
    const [wlb, setWlb] = useState<WlbRating | null>(null);

    return (
        <Page
            title="Exit Interview"
            subtitle="Help us improve the employee experience by sharing your honest feedback."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Exit Interview" },
            ]}
            maxWidth="800px"
        >
            <Card padding="lg">
                <div className="space-y-10">
                    {/* Overall Rating */}
                    <div className="space-y-4 text-center">
                        <div className="inline-flex rounded-2xl bg-blue-500/10 p-3">
                            <MessageSquare className="text-blue-500" size={28} aria-hidden="true" />
                        </div>
                        <h2 className="text-xl font-black text-white">Your Feedback Matters</h2>
                        <p className="text-sm text-[#8899AA]">
                            Responses are anonymized and used only for internal analysis.
                        </p>

                        <fieldset>
                            <legend className="mb-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                Overall Experience
                            </legend>
                            <div className="flex justify-center gap-3">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        aria-label={`Rate ${s} out of 5 stars`}
                                        aria-pressed={rating >= s}
                                        className="transition-transform hover:scale-110"
                                    >
                                        <Star
                                            size={36}
                                            aria-hidden="true"
                                            className={rating >= s ? "text-amber-400" : "text-[#1A2A3A]"}
                                            fill={rating >= s ? "currentColor" : "none"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                    {/* Q1 */}
                    <div className="space-y-3">
                        <label htmlFor="exit-reason" className="flex items-center gap-2 text-sm font-bold text-white">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1A2A3A] text-[10px] text-blue-400">
                                Q1
                            </span>
                            What was the primary reason for your resignation?
                        </label>
                        <select
                            id="exit-reason"
                            className="w-full rounded-2xl border border-[#1A2A3A] bg-[#060B14] px-5 py-4 text-sm font-semibold text-[#8899AA] outline-none focus:border-[#00e5a0]"
                        >
                            <option>Better Opportunity &amp; Growth</option>
                            <option>Compensation &amp; Benefits</option>
                            <option>Work-Life Balance</option>
                            <option>Management &amp; Leadership</option>
                            <option>Health or Personal Reasons</option>
                        </select>
                    </div>

                    {/* Q2 */}
                    <fieldset>
                        <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1A2A3A] text-[10px] text-blue-400">
                                Q2
                            </span>
                            How would you rate the work-life balance in your team?
                        </legend>
                        <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-label="Work-life balance rating">
                            {WLB_OPTIONS.map((opt) => {
                                const Icon = opt.icon;
                                const selected = wlb === opt.id;
                                return (
                                    <label
                                        key={opt.id}
                                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border p-4 transition-colors ${
                                            selected
                                                ? "border-blue-500/50 bg-blue-500/5"
                                                : "border-[#1A2A3A] bg-[#060B14] hover:border-[#445566]"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="wlb"
                                            value={opt.id}
                                            checked={selected}
                                            onChange={() => setWlb(opt.id)}
                                            className="sr-only"
                                        />
                                        <Icon
                                            size={24}
                                            aria-hidden="true"
                                            className={selected ? "text-blue-400" : "text-[#445566]"}
                                        />
                                        <span className={`text-xs font-black uppercase tracking-widest ${selected ? "text-white" : "text-[#445566]"}`}>
                                            {opt.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* Q3 */}
                    <div className="space-y-3">
                        <label htmlFor="suggestions" className="flex items-center gap-2 text-sm font-bold text-white">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1A2A3A] text-[10px] text-blue-400">
                                Q3
                            </span>
                            Any specific suggestions to improve the work environment?
                        </label>
                        <textarea
                            id="suggestions"
                            rows={5}
                            placeholder="Your detailed feedback is highly appreciated..."
                            className="w-full resize-none rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-5 text-sm text-[#8899AA] outline-none focus:border-[#00e5a0]"
                        />
                    </div>

                    {/* Confidentiality notice */}
                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <Shield size={18} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-tight text-emerald-400">
                                Your feedback is confidential
                            </h4>
                            <p className="mt-1 text-xs text-[#8899AA]">
                                Responses are anonymized and used only for internal analysis by the HR excellence team.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        iconRight={<ChevronRight size={18} aria-hidden="true" />}
                        className="w-full"
                    >
                        Submit Feedback
                    </Button>
                </div>
            </Card>

            <div className="mt-4 text-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={<Info size={14} aria-hidden="true" />}
                >
                    Need help? Contact HR Support
                </Button>
            </div>
        </Page>
    );
}
