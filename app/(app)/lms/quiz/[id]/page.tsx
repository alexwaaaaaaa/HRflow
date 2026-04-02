"use client";
import React, { useState } from "react";
import {
    FileText, Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const QUESTIONS = [
    {
        id: 1,
        text: "Which of the following is NOT a valid hook in React?",
        options: ["useMemo", "useEffect", "useCompute", "useReducer"],
        type: "single"
    },
    {
        id: 2,
        text: "When does the 'useEffect' cleanup function run?",
        options: [
            "Before the component is unmounted",
            "Before the next effect runs",
            "Both A and B",
            "Only when the browser tells it to"
        ],
        type: "single"
    },
    {
        id: 3,
        text: "True or False: React Context API is a complete replacement for state management libraries like Redux.",
        options: ["True", "False"],
        type: "single"
    }
];

export default function QuizScreen() {
    const params = useParams();
    const router = useRouter();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const question = QUESTIONS[currentIdx];
    const isLast = currentIdx === QUESTIONS.length - 1;
    const isAnswered = !!answers[question.id];

    const handleSelect = (opt: string) => {
        setAnswers(prev => ({ ...prev, [question.id]: opt }));
    };

    const handleNext = () => {
        if (isLast) {
            router.push(`/lms/quiz/${params.id}/result`);
        } else {
            setCurrentIdx(prev => prev + 1);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0A1420]">

            {/* Header */}
            <div className="h-16 bg-[#0F1C2E] border-b border-[#1A2A3A] flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <Link href={`/lms/course/1`} className="text-[#8899AA] hover:text-white transition-colors bg-[#1A2A3A] p-2 rounded-xl">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-white font-bold text-lg leading-tight">Module 2 Quiz: React Hooks</h1>
                        <p className="text-xs text-[#8899AA]">Advanced React Patterns</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[#FFB020] bg-[#FFB020]/10 px-3 py-1.5 rounded-lg border border-[#FFB020]/20 font-mono font-medium text-sm">
                        <Clock size={16} /> 09:45
                    </div>
                    <button className="text-xs text-[#8899AA] hover:text-white underline underline-offset-4">Save & Exit</button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex justify-center">
                <div className="w-full max-w-3xl flex flex-col pt-8">

                    {/* Progress indicator */}
                    <div className="mb-10 flex items-center justify-between">
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Question {currentIdx + 1} of {QUESTIONS.length}</span>
                        <div className="flex gap-2">
                            {QUESTIONS.map((q, i) => (
                                <div
                                    key={q.id}
                                    className={`w-10 h-2 rounded-full transition-colors ${i === currentIdx ? 'bg-[#33E6FF]' :
                                            answers[q.id] ? 'bg-[#00E5A0]' : 'bg-[#1A2A3A]'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 md:p-12 mb-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#33E6FF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug relative z-10">
                            {question.text}
                        </h2>

                        <div className="space-y-4 relative z-10">
                            {question.options.map((opt, idx) => {
                                const isSelected = answers[question.id] === opt;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(opt)}
                                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${isSelected
                                                ? 'border-[#33E6FF] bg-[#33E6FF]/10 text-white'
                                                : 'border-[#1A2A3A] bg-[#0A1420] text-[#8899AA] hover:border-[#2A3A4A] hover:bg-[#152336] hover:text-white'
                                            }`}
                                    >
                                        <span className="text-lg font-medium">{opt}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#33E6FF] bg-[#33E6FF]' : 'border-[#445566]'
                                            }`}>
                                            {isSelected && <div className="w-2 h-2 bg-[#0A1420] rounded-full"></div>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex justify-between items-center mt-auto">
                        <button
                            onClick={() => setCurrentIdx(prev => prev - 1)}
                            disabled={currentIdx === 0}
                            className={`px-6 py-3 rounded-xl font-bold transition-colors ${currentIdx === 0 ? 'text-[#445566] cursor-not-allowed hidden' : 'text-[#8899AA] bg-[#1A2A3A] hover:text-white hover:bg-[#2A3A4A]'}`}
                        >
                            Previous
                        </button>
                        <div className="flex-1"></div>
                        <button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${!isAnswered
                                    ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed'
                                    : isLast
                                        ? 'bg-[#00E5A0] text-[#0A1420] hover:bg-[#00c98d] shadow-[0_5px_15px_rgba(0,229,160,0.2)]'
                                        : 'bg-[#33E6FF] text-[#0A1420] hover:bg-[#29b8cc]'
                                }`}
                        >
                            {isLast ? 'Submit Quiz' : 'Next Question'}
                            {!isLast && <ChevronRight size={18} />}
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
