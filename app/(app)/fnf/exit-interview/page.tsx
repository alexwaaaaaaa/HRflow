"use client";

import React, { useState } from 'react';
import {
    MessageSquare, Star, Smile, Frown, Meh,
    ChevronRight, ArrowLeft, Send, Shield, Info
} from 'lucide-react';

export default function ExitInterviewEmployee() {
    const [rating, setRating] = useState(0);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-2">
                        <MessageSquare className="text-blue-500" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Your Feedback Matters</h1>
                    <p className="text-slate-400 font-medium max-w-lg mx-auto">Help us improve the employee experience by sharing your honest feedback about your time with us.</p>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-8 space-y-10">

                        {/* Rating Section */}
                        <div className="space-y-6 text-center">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest italic">Overall Experience</h3>
                            <div className="flex justify-center gap-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setRating(s)}
                                        className={`transition-all duration-300 transform hover:scale-110 ${rating >= s ? 'text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'text-slate-700'}`}
                                    >
                                        <Star size={40} fill={rating >= s ? 'currentColor' : 'none'} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-sm font-black text-white flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#1A2A3A] rounded-lg flex items-center justify-center text-[10px] text-blue-500">Q1</div>
                                    What was the primary reason for your resignation?
                                </label>
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-2xl px-5 py-4 text-slate-300 font-semibold outline-none focus:border-blue-500/50 appearance-none shadow-inner">
                                    <option>Better Opportunity & Growth</option>
                                    <option>Compensation & Benefits</option>
                                    <option>Work-Life Balance</option>
                                    <option>Management & Leadership</option>
                                    <option>Health or Personal Reasons</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-black text-white flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#1A2A3A] rounded-lg flex items-center justify-center text-[10px] text-blue-500">Q2</div>
                                    How would you rate the work-life balance in your team?
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    <button className="flex flex-col items-center gap-2 p-4 border border-[#1A2A3A] rounded-2xl bg-[#060B14] hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group">
                                        <Smile className="text-slate-500 group-hover:text-emerald-500 transition-colors" size={24} />
                                        <span className="text-xs font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Excellent</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 border border-[#1A2A3A] rounded-2xl bg-[#060B14] hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group border-blue-500/30 bg-blue-500/5">
                                        <Meh className="text-amber-500" size={24} />
                                        <span className="text-xs font-black text-white uppercase tracking-widest">Average</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 border border-[#1A2A3A] rounded-2xl bg-[#060B14] hover:border-rose-500/50 hover:bg-rose-500/5 transition-all group">
                                        <Frown className="text-slate-500 group-hover:text-rose-500 transition-colors" size={24} />
                                        <span className="text-xs font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Poor</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-black text-white flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#1A2A3A] rounded-lg flex items-center justify-center text-[10px] text-blue-500">Q3</div>
                                    Any specific suggestions to improve the work environment?
                                </label>
                                <textarea
                                    placeholder="Your detailed feedback is highly appreciated..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-2xl p-5 text-slate-300 outline-none focus:border-blue-500/50 min-h-[160px] resize-none font-medium leading-relaxed shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Confidentiality Notice */}
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex gap-4">
                            <Shield className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-emerald-500 uppercase tracking-tighter">Your feedback is confidential</h4>
                                <p className="text-xs text-slate-500 font-medium">Responses are anonymized and used only for internal analysis by the HR excellence team to build a better workplace.</p>
                            </div>
                        </div>

                        <button className="w-full py-5 bg-[#0066FF] rounded-2xl text-white font-black text-base hover:bg-[#0052cc] transition-all shadow-[0_0_30px_rgba(0,102,255,0.3)] flex items-center justify-center gap-3">
                            Submit Feedback <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <button className="text-slate-600 font-bold hover:text-slate-400 transition-colors text-sm flex items-center gap-2 mx-auto">
                        <Info size={14} /> Need help? Contact HR Support
                    </button>
                </div>

            </div>
        </div>
    );
}
