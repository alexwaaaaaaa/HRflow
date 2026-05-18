"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { MessageSquare, ThumbsDown, ThumbsUp, Activity } from 'lucide-react';

export default function ExitInterviewScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Confidential Exit Survey"
            subtitle="Your feedback is strictly confidential and critical for organizational improvement."
            breadcrumbs={[{ label: "Offboarding", href: "/offboarding" }, { label: "Interview" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><MessageSquare size={24} className="text-purple-400" /> Confidential Exit Survey</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Your feedback is strictly confidential and critical for organizational improvement.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex border-b border-[#1A2A3A] bg-[#060D1A]">
                    <div className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider relative ${step >= 1 ? 'text-purple-400' : 'text-[#556677]'}`}>
                        1. Overall Experience
                        {step >= 1 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>}
                    </div>
                    <div className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider relative ${step >= 2 ? 'text-purple-400' : 'text-[#556677]'}`}>
                        2. Management
                        {step >= 2 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>}
                    </div>
                    <div className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider relative ${step >= 3 ? 'text-purple-400' : 'text-[#556677]'}`}>
                        3. Future Outlook
                        {step >= 3 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>}
                    </div>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <label className="text-white font-bold block mb-4">How would you rate your overall experience working at the company?</label>
                                <div className="flex justify-between items-center max-w-lg mx-auto bg-[#131B2B] rounded-full p-2 border border-[#2A3A4A]">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <button key={n} className="w-10 h-10 rounded-full text-sm font-black flex items-center justify-center text-[#8899AA] hover:bg-purple-500/20 hover:text-purple-400 transition-colors focus:bg-purple-500 focus:text-white">
                                            {n}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between max-w-lg mx-auto mt-2 text-[#556677] text-xs font-bold uppercase">
                                    <span>Poor</span><span>Excellent</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-white font-bold block mb-4">What was the primary catalyst for you looking for a new role?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Compensation / Benefits', 'Lack of Career Growth', 'Management Conflict', 'Work/Life Balance', 'Company Culture', 'Role Change/Pivot'].map((o, i) => (
                                        <div key={i} className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] hover:border-purple-500/50 rounded-xl p-4 cursor-pointer text-sm text-[#AABBCC] font-bold text-center transition-colors">
                                            {o}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <label className="text-white font-bold block mb-4">Did your manager provide you with clear goals and actionable feedback?</label>
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] hover:border-emerald-500/50 rounded-xl p-4 flex flex-col items-center gap-2 group transition-colors">
                                        <ThumbsUp size={24} className="text-[#556677] group-hover:text-emerald-400" />
                                        <span className="text-[#8899AA] font-bold text-sm group-hover:text-white">Yes, consistently</span>
                                    </button>
                                    <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] hover:border-rose-500/50 rounded-xl p-4 flex flex-col items-center gap-2 group transition-colors">
                                        <ThumbsDown size={24} className="text-[#556677] group-hover:text-rose-400" />
                                        <span className="text-[#8899AA] font-bold text-sm group-hover:text-white">No, rarely or never</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-white font-bold block mb-3">Optional: Would you like to provide specific feedback for your department leadership?</label>
                                <textarea rows={4} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 text-white text-sm focus:border-purple-500 outline-none resize-none" placeholder="Your comments here..."></textarea>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <label className="text-white font-bold block mb-4">Would you consider returning to the company in the future? (eNPS)</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] hover:border-emerald-500/50 rounded-xl p-4 font-bold text-sm text-[#8899AA] hover:text-emerald-400 transition-colors">Definitely Yes</button>
                                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] hover:border-amber-500/50 rounded-xl p-4 font-bold text-sm text-[#8899AA] hover:text-amber-400 transition-colors">Maybe / Depends</button>
                                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] hover:border-rose-500/50 rounded-xl p-4 font-bold text-sm text-[#8899AA] hover:text-rose-400 transition-colors">Unlikely</button>
                                </div>
                            </div>

                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-5 flex gap-4 mt-6">
                                <Activity size={24} className="text-purple-400 shrink-0" />
                                <div>
                                    <h4 className="text-purple-400 font-bold mb-1">HR Confidential Conversation</h4>
                                    <p className="text-purple-200/70 text-sm mb-3">Would you like an HR Business Partner to contact you to discuss your experience confidentially before you leave?</p>
                                    <div className="flex gap-2">
                                        <label className="flex items-center gap-2 text-white text-sm cursor-pointer"><input type="radio" name="hr_chat" className="accent-purple-500" /> Yes</label>
                                        <label className="flex items-center gap-2 text-white text-sm cursor-pointer ml-4"><input type="radio" name="hr_chat" className="accent-purple-500" defaultChecked /> No thanks</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-[#060D1A] p-6 border-t border-[#1A2A3A] flex justify-between items-center">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-xl text-[#8899AA] font-bold hover:text-white transition-colors">Previous Section</button>
                    ) : <div></div>}

                    {step < 3 ? (
                        <button onClick={() => setStep(step + 1)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-2.5 rounded-xl transition-colors shadow-sm">Next Section</button>
                    ) : (
                        <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-2.5 rounded-xl transition-colors shadow-sm shadow-purple-500/20">Submit Final Survey</button>
                    )}
                </div>
            </div>
        </div>
    
        </Page>
    );
}
