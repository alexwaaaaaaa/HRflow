"use client";
import React from "react";
import {
    Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Medal, Sparkles
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function QuizResult() {
    const params = useParams();

    // Mock results
    const score = 85;
    const passed = score >= 80;

    return (
        <div className="p-6 max-w-[1000px] mx-auto min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">

            <div className="w-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-[2rem] overflow-hidden shadow-2xl relative text-center pb-12">
                {/* Background decoration */}
                <div className={`absolute top-0 left-0 right-0 h-64 opacity-20 blur-[100px] pointer-events-none ${passed ? 'bg-[#00E5A0]' : 'bg-[#FF4444]'}`}></div>

                {/* Hero Header */}
                <div className="pt-16 px-8 relative z-10 flex flex-col items-center">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 border-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] ${passed
                            ? 'bg-gradient-to-b from-[#00E5A0] to-teal-600 border-[#0F1C2E] text-[#0A1420]'
                            : 'bg-gradient-to-b from-[#FF4444] to-red-700 border-[#0F1C2E] text-white'
                        }`}>
                        {passed ? <Trophy size={60} /> : <XCircle size={60} strokeWidth={1.5} />}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        {passed ? 'Congratulations!' : 'Keep Trying!'}
                    </h1>
                    <p className="text-xl text-[#8899AA] mb-8 max-w-lg">
                        You scored <strong className={passed ? 'text-[#00E5A0]' : 'text-[#FF4444]'}>{score}%</strong> on the Module 2 Quiz: React Hooks.
                    </p>

                    {/* Score Ring */}
                    <div className="flex items-center gap-12 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 mb-10 shadow-inner">
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">8<span className="text-lg text-[#445566]">/10</span></div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mt-1">Correct</div>
                        </div>
                        <div className="w-px h-12 bg-[#2A3A4A]"></div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">2</div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mt-1">Incorrect</div>
                        </div>
                        <div className="w-px h-12 bg-[#2A3A4A]"></div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-[#FFB020]">2m 45s</div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mt-1">Time Taken</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                        {passed ? (
                            <>
                                <Link href="/lms/course/1" className="flex-1 w-full py-4 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors shadow-[0_5px_20px_rgba(0,229,160,0.2)] flex items-center justify-center gap-2">
                                    Next Lesson <ArrowRight size={20} />
                                </Link>
                                <button className="flex-1 w-full py-4 bg-[#1A2A3A] text-white font-semibold rounded-xl hover:bg-[#2A3A4A] border border-[#2A3A4A] transition-colors">
                                    Review Answers
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => window.history.back()} className="flex-1 w-full py-4 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors shadow-[0_5px_20px_rgba(51,230,255,0.2)] flex items-center justify-center gap-2">
                                    <RotateCcw size={20} /> Retake Quiz
                                </button>
                                <button className="flex-1 w-full py-4 bg-[#1A2A3A] text-white font-semibold rounded-xl hover:bg-[#2A3A4A] border border-[#2A3A4A] transition-colors">
                                    Review Answers
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>

            {passed && (
                <div className="mt-8 flex items-center gap-4 bg-[#152336] p-4 rounded-2xl border border-[#2A3A4A] shadow-lg animate-bounce-slow">
                    <div className="bg-purple-500/20 text-purple-400 p-2 rounded-xl">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">You earned +50 XP!</p>
                        <p className="text-[#8899AA] text-xs">You are now closer to Level 13.</p>
                    </div>
                </div>
            )}

        </div>
    );
}
