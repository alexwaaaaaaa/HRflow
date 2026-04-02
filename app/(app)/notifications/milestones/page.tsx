"use client";
import React from 'react';
import { Target, ArrowRight, Award } from 'lucide-react';

export default function CareerMilestonePage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Award className="text-amber-500" />
                        Career Milestones
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Updates on promotions, skill completions, and career path progressions.</p>
                </div>
            </div>

            <div className="relative border-l border-[#1A2A3A] ml-6 pl-8 space-y-8 mt-10">
                {/* Milestone Node 1 */}
                <div className="relative">
                    <div className="absolute -left-[45px] w-6 h-6 rounded-full border-4 border-[#060D1A] bg-amber-500 z-10" />

                    <div className="bg-[#0A1420] border border-amber-500/30 rounded-xl p-5 shadow-[0_5px_20px_rgba(245,158,11,0.05)]">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-white">Promotion: Senior Software Engineer (IC3)</h3>
                            <span className="text-xs text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded">Just Now</span>
                        </div>
                        <p className="text-sm text-[#CCDDEE] mb-4">Congratulations! Based on your H1 performance review, you have been promoted. Your new compensation pack applies from the next cycle.</p>
                        <button className="text-amber-500 font-bold text-sm flex items-center gap-1 hover:text-amber-400">View New Career Framework <ArrowRight size={14} /></button>
                    </div>
                </div>

                {/* Milestone Node 2 */}
                <div className="relative">
                    <div className="absolute -left-[45px] w-6 h-6 rounded-full border-4 border-[#060D1A] bg-emerald-500 z-10" />

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 opacity-80">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-white">Skill Unlocked: System Design Architect</h3>
                            <span className="text-xs text-[#8899AA]">3 Months Ago</span>
                        </div>
                        <p className="text-sm text-[#8899AA]">You successfully completed the mandatory advanced system architecture modules.</p>
                    </div>
                </div>

                {/* Milestone Node 3 */}
                <div className="relative">
                    <div className="absolute -left-[45px] w-6 h-6 rounded-full border-4 border-[#060D1A] bg-indigo-500 z-10" />

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 opacity-60">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-white">Joined as SDE II (IC2)</h3>
                            <span className="text-xs text-[#8899AA]">2 Years Ago</span>
                        </div>
                        <p className="text-sm text-[#8899AA]">Welcomed to the Frontend Engineering pod.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
