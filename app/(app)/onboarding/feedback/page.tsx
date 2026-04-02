"use client";
import React, { useState } from "react";
import {
    Star, MessageSquare, Send, CheckCircle2, ThumbsUp, ThumbsDown
} from "lucide-react";

export default function NewJoinerFeedback() {
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0);

    if (submitted) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#0A1420] flex items-center justify-center p-6">
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-[#00E5A0]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00E5A0]">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Thank you!</h2>
                    <p className="text-[#8899AA]">Your feedback helps us continuously improve the TechCorp onboarding experience for future hires.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A1420] text-white p-6 justify-center flex">
            <div className="w-full max-w-[800px] mt-10">

                {/* Header */}
                <div className="mb-8">
                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#33E6FF]/10 text-[#33E6FF] text-xs font-bold tracking-wider uppercase border border-[#33E6FF]/20">
                        30-Day Pulse Check
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">How was your first month?</h1>
                    <p className="text-[#8899AA]">We want to hear about your experience. Your responses are confidential and used only to improve our processes.</p>
                </div>

                {/* Survey Form */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-8 space-y-10 shadow-2xl">

                    {/* Q1: Overall Rating */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">1. How would you rate your overall onboarding experience? <span className="text-[#FF4444]">*</span></h3>
                        <div className="flex items-center gap-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`p-4 rounded-xl transition-all ${rating >= star ? 'text-[#FFB020] bg-[#FFB020]/10 scale-110' : 'text-[#445566] bg-[#1A2A3A] hover:bg-[#2A3A4A]'}`}
                                >
                                    <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                                </button>
                            ))}
                            <span className="ml-4 text-sm font-semibold text-[#8899AA]">
                                {rating === 0 ? "" : rating <= 2 ? "Needs Improvement" : rating === 3 ? "Average" : rating === 4 ? "Good" : "Excellent!"}
                            </span>
                        </div>
                    </div>

                    <div className="h-px bg-[#1A2A3A]"></div>

                    {/* Q2: Setup & Logistics */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">2. Did you receive all necessary hardware and access on Day 1?</h3>
                        <div className="flex gap-4">
                            <button className="flex-1 py-4 border border-[#2A3A4A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#00E5A0]/10 hover:border-[#00E5A0]/50 hover:text-[#00E5A0] text-[#8899AA] transition-colors group">
                                <ThumbsUp size={20} className="group-hover:text-[#00E5A0]" /> Yes, everything was ready
                            </button>
                            <button className="flex-1 py-4 border border-[#2A3A4A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#FF4444]/10 hover:border-[#FF4444]/50 hover:text-[#FF4444] text-[#8899AA] transition-colors group">
                                <ThumbsDown size={20} className="group-hover:text-[#FF4444]" /> No, there were delays
                            </button>
                        </div>
                    </div>

                    {/* Q3: Buddy System */}
                    <div>
                        <h3 className="text-white font-semibold mb-2">3. How helpful was your Onboarding Buddy?</h3>
                        <p className="text-xs text-[#8899AA] mb-4">Vikram Singh was assigned as your buddy.</p>

                        <div className="flex flex-col gap-3">
                            {["Extremely helpful and proactive", "Somewhat helpful when I reached out", "We barely interacted", "I was not assigned a buddy"].map((opt, i) => (
                                <label key={i} className="flex items-center gap-3 p-4 border border-[#2A3A4A] rounded-xl cursor-pointer hover:bg-[#1A2A3A] transition-colors group">
                                    <input type="radio" name="buddy" className="w-4 h-4 accent-[#00E5A0]" />
                                    <span className="text-sm text-[#8899AA] group-hover:text-white transition-colors">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Q4: Open Text */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">4. What is one thing we could have done better?</h3>
                        <div className="relative">
                            <MessageSquare className="absolute top-4 left-4 text-[#445566]" size={20} />
                            <textarea
                                rows={4}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#00E5A0] transition-colors resize-none"
                                placeholder="Your feedback here..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 border-t border-[#1A2A3A] flex justify-end">
                        <button
                            onClick={() => setSubmitted(true)}
                            disabled={rating === 0}
                            className="px-8 py-3.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors shadow-[0_10px_20px_rgba(0,229,160,0.2)] disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                        >
                            <Send size={18} /> Submit Feedback
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
