"use client";
import React from "react";
import { Trophy, XCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const SCORE = 85;
const PASSED = SCORE >= 80;

export default function QuizResult() {
    return (
        <Page
            title={PASSED ? "Quiz Passed!" : "Quiz Result"}
            subtitle="Module 2 Quiz: React Hooks"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Course", href: "/lms/course/1" },
                { label: "Quiz Result" },
            ]}
            maxWidth="1000px"
        >
            <div className="flex flex-col items-center">
                <Card padding="lg" variant="elevated" className="w-full relative overflow-hidden text-center pb-12">
                    <div className={`absolute top-0 left-0 right-0 h-64 opacity-20 blur-[100px] pointer-events-none ${PASSED ? "bg-[#00E5A0]" : "bg-[#FF4444]"}`} aria-hidden="true" />

                    <div className="pt-8 px-8 relative z-10 flex flex-col items-center">
                        <div
                            className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 border-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] ${PASSED ? "bg-gradient-to-b from-[#00E5A0] to-teal-600 border-[#0F1C2E] text-[#0A1420]" : "bg-gradient-to-b from-[#FF4444] to-red-700 border-[#0F1C2E] text-white"}`}
                            aria-hidden="true"
                        >
                            {PASSED ? <Trophy size={60} /> : <XCircle size={60} strokeWidth={1.5} />}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                            {PASSED ? "Congratulations!" : "Keep Trying!"}
                        </h2>
                        <p className="text-xl text-[#8899AA] mb-8 max-w-lg">
                            You scored{" "}
                            <strong className={PASSED ? "text-[#00E5A0]" : "text-[#FF4444]"}>{SCORE}%</strong>{" "}
                            on the Module 2 Quiz: React Hooks.
                        </p>

                        {/* Score Ring */}
                        <div className="flex items-center gap-12 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 mb-10 shadow-inner">
                            <div className="text-center">
                                <div className="text-3xl font-black text-white">8<span className="text-lg text-[#445566]">/10</span></div>
                                <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mt-1">Correct</div>
                            </div>
                            <div className="w-px h-12 bg-[#2A3A4A]" aria-hidden="true" />
                            <div className="text-center">
                                <div className="text-3xl font-black text-white">2</div>
                                <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mt-1">Incorrect</div>
                            </div>
                            <div className="w-px h-12 bg-[#2A3A4A]" aria-hidden="true" />
                            <div className="text-center">
                                <div className="text-3xl font-black text-[#FFB020]">2m 45s</div>
                                <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mt-1">Time Taken</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                            {PASSED ? (
                                <>
                                    <Link href="/lms/course/1" className="flex-1 w-full">
                                        <Button variant="primary" className="w-full justify-center" iconRight={<ArrowRight size={18} aria-hidden="true" />}>
                                            Next Lesson
                                        </Button>
                                    </Link>
                                    <Button variant="secondary" className="flex-1 w-full justify-center">
                                        Review Answers
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="primary"
                                        className="flex-1 w-full justify-center"
                                        icon={<RotateCcw size={18} aria-hidden="true" />}
                                        onClick={() => window.history.back()}
                                    >
                                        Retake Quiz
                                    </Button>
                                    <Button variant="secondary" className="flex-1 w-full justify-center">
                                        Review Answers
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </Card>

                {PASSED && (
                    <div className="mt-8 flex items-center gap-4 bg-[#152336] p-4 rounded-2xl border border-[#2A3A4A] shadow-lg">
                        <div className="bg-purple-500/20 text-purple-400 p-2 rounded-xl">
                            <Sparkles size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">You earned +50 XP!</p>
                            <p className="text-[#8899AA] text-xs">You are now closer to Level 13.</p>
                        </div>
                        <Badge variant="success">+50 XP</Badge>
                    </div>
                )}
            </div>
        </Page>
    );
}
