"use client";
import React, { useState } from "react";
import { Star, MessageSquare, Send, ThumbsUp, BookOpen, User, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const RATING_LABELS: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent! Highly Recommend",
};

interface AspectRating {
    label: string;
    icon: React.ElementType;
    id: string;
}

const ASPECTS: AspectRating[] = [
    { label: "Content Quality", icon: BookOpen, id: "content" },
    { label: "Instructor (Sarah Drasner)", icon: User, id: "instructor" },
    { label: "Relevance to Your Job", icon: ThumbsUp, id: "relevance" },
];

function SuccessState() {
    return (
        <Page
            title="Feedback Received!"
            subtitle="Thank you for helping us improve our training programs"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Course", href: "/lms/course/1" },
                { label: "Feedback" },
            ]}
            maxWidth="800px"
        >
            <Card padding="lg" variant="elevated" className="text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                <div className="w-24 h-24 mx-auto bg-gradient-to-b from-[#00E5A0] to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,160,0.3)]">
                    <CheckCircle2 size={48} className="text-[#0A1420]" aria-hidden="true" />
                </div>
                <p className="text-[#8899AA] mb-8">Your insights are incredibly valuable to authors and future learners.</p>
                <Button variant="secondary" href="/lms/dashboard">Return to Dashboard</Button>
            </Card>
        </Page>
    );
}

export default function TrainingFeedback() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [aspectRatings, setAspectRatings] = useState<Record<string, number>>({});

    if (submitted) return <SuccessState />;

    return (
        <Page
            title="Course Feedback"
            subtitle="Advanced React Patterns & Architecture"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Course", href: "/lms/course/1" },
                { label: "Feedback" },
            ]}
            maxWidth="800px"
        >
            <Card padding="lg">
                {/* Overall Rating */}
                <div className="mb-10 text-center">
                    <h2 className="text-xl font-bold text-white mb-6">How would you rate this course overall?</h2>
                    <div className="flex justify-center gap-2" role="group" aria-label="Overall course rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                aria-label={`Rate ${star} out of 5 stars`}
                                aria-pressed={rating === star}
                                className="p-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] rounded"
                            >
                                <Star
                                    size={48}
                                    className={`transition-colors duration-200 ${(hoverRating || rating) >= star ? "text-[#FFB020] fill-[#FFB020] drop-shadow-[0_0_10px_rgba(255,176,32,0.5)]" : "text-[#2A3A4A]"}`}
                                    aria-hidden="true"
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-sm font-medium text-[#FFB020] mt-4 h-5" aria-live="polite">
                        {rating > 0 ? RATING_LABELS[rating] : ""}
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Detailed Ratings */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                        <h3 className="font-semibold text-white mb-6">Rate specific aspects</h3>
                        <div className="space-y-6">
                            {ASPECTS.map((aspect) => {
                                const Icon = aspect.icon;
                                return (
                                    <div key={aspect.id} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-[#8899AA]">
                                            <Icon size={18} aria-hidden="true" />
                                            <span className="text-sm font-medium">{aspect.label}</span>
                                        </div>
                                        <div className="flex gap-2" role="group" aria-label={`Rate ${aspect.label}`}>
                                            {[1, 2, 3, 4, 5].map((v) => (
                                                <button
                                                    key={v}
                                                    type="button"
                                                    aria-label={`${v} out of 5`}
                                                    aria-pressed={aspectRatings[aspect.id] === v}
                                                    onClick={() => setAspectRatings((prev) => ({ ...prev, [aspect.id]: v }))}
                                                    className={`w-8 h-8 rounded border text-xs font-semibold transition-colors ${aspectRatings[aspect.id] === v ? "border-[#33E6FF] bg-[#33E6FF] text-[#0A1420]" : "border-[#2A3A4A] text-[#8899AA] hover:border-[#33E6FF] hover:text-[#33E6FF]"}`}
                                                >
                                                    {v}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Written Review */}
                    <div>
                        <label htmlFor="written-review" className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <MessageSquare size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            Written Review (Optional)
                        </label>
                        <textarea
                            id="written-review"
                            rows={4}
                            placeholder="What did you like about this course? How could it be improved?"
                            className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-4 text-sm focus:outline-none focus:border-[#00E5A0] resize-none transition-colors"
                        />
                    </div>

                    <div className="pt-6 border-t border-[#1A2A3A] flex justify-end gap-4">
                        <Button variant="ghost" size="sm">Skip</Button>
                        <Button
                            variant="primary"
                            onClick={() => setSubmitted(true)}
                            disabled={rating === 0}
                            icon={<Send size={16} aria-hidden="true" />}
                        >
                            Submit Feedback
                        </Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
