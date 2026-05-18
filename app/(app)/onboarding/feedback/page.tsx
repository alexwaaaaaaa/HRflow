"use client";
import React, { useState } from "react";
import {
    Star, MessageSquare, Send, CheckCircle2, ThumbsUp, ThumbsDown
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Submitted state ──────────────────────────────────────────────────────────

function SubmittedState() {
    return (
        <Page
            title="Feedback"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Feedback", href: "/onboarding/feedback" },
            ]}
            maxWidth="500px"
        >
            <Card className="text-center">
                <div className="w-20 h-20 bg-[#00E5A0]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00E5A0]">
                    <CheckCircle2 size={40} aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Thank you!</h2>
                <p className="text-[#8899AA]">Your feedback helps us continuously improve the TechCorp onboarding experience for future hires.</p>
            </Card>
        </Page>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewJoinerFeedback() {
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0);

    if (submitted) return <SubmittedState />;

    const ratingLabel = rating === 0 ? "" : rating <= 2 ? "Needs Improvement" : rating === 3 ? "Average" : rating === 4 ? "Good" : "Excellent!";

    return (
        <Page
            title="How was your first month?"
            subtitle="We want to hear about your experience. Your responses are confidential and used only to improve our processes."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Feedback", href: "/onboarding/feedback" },
            ]}
            maxWidth="800px"
        >
            <div className="mb-4">
                <Badge variant="info">30-Day Pulse Check</Badge>
            </div>

            <Card className="space-y-10 shadow-2xl">

                {/* Q1: Overall Rating */}
                <fieldset>
                    <legend className="text-lg font-bold text-white mb-4">
                        1. How would you rate your overall onboarding experience?{" "}
                        <span className="text-[#FF4444]" aria-hidden="true">*</span>
                    </legend>
                    <div className="flex items-center gap-4" role="group" aria-label="Star rating">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                                aria-pressed={rating >= star}
                                className={`p-4 rounded-xl transition-all ${rating >= star ? "text-[#FFB020] bg-[#FFB020]/10 scale-110" : "text-[#445566] bg-[#1A2A3A] hover:bg-[#2A3A4A]"}`}
                            >
                                <Star size={32} fill={rating >= star ? "currentColor" : "none"} aria-hidden="true" />
                            </button>
                        ))}
                        {ratingLabel && (
                            <span className="ml-4 text-sm font-semibold text-[#8899AA]" aria-live="polite">{ratingLabel}</span>
                        )}
                    </div>
                </fieldset>

                <div className="h-px bg-[#1A2A3A]" />

                {/* Q2: Setup & Logistics */}
                <div>
                    <h3 className="text-white font-semibold mb-4">2. Did you receive all necessary hardware and access on Day 1?</h3>
                    <div className="flex gap-4" role="group" aria-label="Hardware and access question">
                        <button
                            type="button"
                            className="flex-1 py-4 border border-[#2A3A4A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#00E5A0]/10 hover:border-[#00E5A0]/50 hover:text-[#00E5A0] text-[#8899AA] transition-colors group"
                            aria-label="Yes, everything was ready"
                        >
                            <ThumbsUp size={20} aria-hidden="true" /> Yes, everything was ready
                        </button>
                        <button
                            type="button"
                            className="flex-1 py-4 border border-[#2A3A4A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#FF4444]/10 hover:border-[#FF4444]/50 hover:text-[#FF4444] text-[#8899AA] transition-colors group"
                            aria-label="No, there were delays"
                        >
                            <ThumbsDown size={20} aria-hidden="true" /> No, there were delays
                        </button>
                    </div>
                </div>

                {/* Q3: Buddy System */}
                <fieldset>
                    <legend className="text-white font-semibold mb-2">3. How helpful was your Onboarding Buddy?</legend>
                    <p className="text-xs text-[#8899AA] mb-4">Vikram Singh was assigned as your buddy.</p>

                    <div className="flex flex-col gap-3">
                        {[
                            "Extremely helpful and proactive",
                            "Somewhat helpful when I reached out",
                            "We barely interacted",
                            "I was not assigned a buddy",
                        ].map((opt, i) => (
                            <label key={i} className="flex items-center gap-3 p-4 border border-[#2A3A4A] rounded-xl cursor-pointer hover:bg-[#1A2A3A] transition-colors group">
                                <input type="radio" name="buddy" value={opt} className="w-4 h-4 accent-[#00E5A0]" />
                                <span className="text-sm text-[#8899AA] group-hover:text-white transition-colors">{opt}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* Q4: Open Text */}
                <div>
                    <label htmlFor="feedback-text" className="block text-white font-semibold mb-4">
                        4. What is one thing we could have done better?
                    </label>
                    <div className="relative">
                        <MessageSquare className="absolute top-4 left-4 text-[#445566]" size={20} aria-hidden="true" />
                        <textarea
                            id="feedback-text"
                            rows={4}
                            aria-label="Open feedback text"
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#00E5A0] transition-colors resize-none"
                            placeholder="Your feedback here..."
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-[#1A2A3A] flex justify-end">
                    <Button
                        onClick={() => setSubmitted(true)}
                        disabled={rating === 0}
                        icon={<Send size={18} aria-hidden="true" />}
                    >
                        Submit Feedback
                    </Button>
                </div>
            </Card>
        </Page>
    );
}
