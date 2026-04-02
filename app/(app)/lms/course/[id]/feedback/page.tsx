"use client";
import React, { useState } from "react";
import {
    Star, MessageSquare, Send, ThumbsUp, ThumbsDown, BookOpen, User, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TrainingFeedback() {
    const params = useParams();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <div className="p-6 max-w-[800px] mx-auto min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                    <div className="w-24 h-24 mx-auto bg-gradient-to-b from-[#00E5A0] to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,160,0.3)]">
                        <CheckCircle2 size={48} className="text-[#0A1420]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Feedback Received!</h1>
                    <p className="text-[#8899AA] mb-8">Thank you for helping us improve our training programs. Your insights are incredibly valuable to authors and future learners.</p>
                    <Link href="/lms/dashboard" className="px-8 py-3 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[800px] mx-auto min-h-[calc(100vh-80px)] py-12">

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-white mb-3">Course Feedback</h1>
                <p className="text-[#8899AA] text-lg">Advanced React Patterns & Architecture</p>
            </div>

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-8 shadow-xl">

                <div className="mb-10 text-center">
                    <h2 className="text-xl font-bold text-white mb-6">How would you rate this course overall?</h2>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-2 transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    size={48}
                                    className={`transition-colors duration-200 ${(hoverRating || rating) >= star
                                            ? 'text-[#FFB020] fill-[#FFB020] drop-shadow-[0_0_10px_rgba(255,176,32,0.5)]'
                                            : 'text-[#2A3A4A]'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-sm font-medium text-[#FFB020] mt-4 h-5">
                        {rating === 1 && "Poor"}
                        {rating === 2 && "Fair"}
                        {rating === 3 && "Good"}
                        {rating === 4 && "Very Good"}
                        {rating === 5 && "Excellent! Highly Recommend"}
                    </p>
                </div>

                <div className="space-y-8">

                    {/* Detailed Ratings */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                        <h3 className="font-semibold text-white mb-6">Rate specific aspects</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-[#8899AA]">
                                    <BookOpen size={18} /> <span className="text-sm font-medium">Content Quality</span>
                                </div>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(v => (
                                        <button key={v} className="w-8 h-8 rounded border border-[#2A3A4A] text-xs font-semibold text-[#8899AA] hover:border-[#33E6FF] hover:text-[#33E6FF] focus:bg-[#33E6FF] focus:text-[#0A1420] transition-colors">{v}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-[#8899AA]">
                                    <User size={18} /> <span className="text-sm font-medium">Instructor (Sarah Drasner)</span>
                                </div>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(v => (
                                        <button key={v} className="w-8 h-8 rounded border border-[#2A3A4A] text-xs font-semibold text-[#8899AA] hover:border-[#33E6FF] hover:text-[#33E6FF] focus:bg-[#33E6FF] focus:text-[#0A1420] transition-colors">{v}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-[#8899AA]">
                                    <ThumbsUp size={18} /> <span className="text-sm font-medium">Relevance to Your Job</span>
                                </div>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(v => (
                                        <button key={v} className="w-8 h-8 rounded border border-[#2A3A4A] text-xs font-semibold text-[#8899AA] hover:border-[#33E6FF] hover:text-[#33E6FF] focus:bg-[#33E6FF] focus:text-[#0A1420] transition-colors">{v}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Written Review */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <MessageSquare size={16} className="text-[#00E5A0]" /> Written Review (Optional)
                        </label>
                        <textarea
                            rows={4}
                            placeholder="What did you like about this course? How could it be improved?"
                            className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-4 text-sm focus:outline-none focus:border-[#00E5A0] resize-none transition-colors"
                        ></textarea>
                    </div>

                    <div className="pt-6 border-t border-[#1A2A3A] flex justify-end gap-4">
                        <button className="px-6 py-3 font-semibold text-[#8899AA] hover:text-white transition-colors">Skip</button>
                        <button
                            onClick={() => setSubmitted(true)}
                            disabled={rating === 0}
                            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${rating > 0
                                    ? 'bg-[#00E5A0] text-[#0A1420] hover:bg-[#00c98d] shadow-[0_5px_15px_rgba(0,229,160,0.2)] cursor-pointer'
                                    : 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed'
                                }`}
                        >
                            <Send size={18} /> Submit Feedback
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
