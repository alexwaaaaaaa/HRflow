// migrated: immersive-ui — full-screen quiz experience; Page shell intentionally omitted
"use client";
import React, { useState } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface Question {
    id: number;
    text: string;
    options: string[];
    type: "single";
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Which of the following is NOT a valid hook in React?",
        options: ["useMemo", "useEffect", "useCompute", "useReducer"],
        type: "single",
    },
    {
        id: 2,
        text: "When does the 'useEffect' cleanup function run?",
        options: [
            "Before the component is unmounted",
            "Before the next effect runs",
            "Both A and B",
            "Only when the browser tells it to",
        ],
        type: "single",
    },
    {
        id: 3,
        text: "True or False: React Context API is a complete replacement for state management libraries like Redux.",
        options: ["True", "False"],
        type: "single",
    },
];

export default function QuizScreen() {
    const params = useParams();
    const router = useRouter();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const question = QUESTIONS[currentIdx];
    const isLast = currentIdx === QUESTIONS.length - 1;
    const isAnswered = question !== undefined && !!answers[question.id];

    const handleSelect = (opt: string) => {
        if (!question) return;
        setAnswers((prev) => ({ ...prev, [question.id]: opt }));
    };

    const handleNext = () => {
        if (isLast) {
            router.push(`/lms/quiz/${params.id}/result`);
        } else {
            setCurrentIdx((prev) => prev + 1);
        }
    };

    if (!question) return null;

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0A1420]">
            {/* Header */}
            <div className="h-16 bg-[#0F1C2E] border-b border-[#1A2A3A] flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <Link href="/lms/course/1" aria-label="Back to course">
                        <Button variant="secondary" size="sm">
                            <ChevronLeft size={18} aria-hidden="true" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-white font-bold text-lg leading-tight">Module 2 Quiz: React Hooks</h1>
                        <p className="text-xs text-[#8899AA]">Advanced React Patterns</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[#FFB020] bg-[#FFB020]/10 px-3 py-1.5 rounded-lg border border-[#FFB020]/20 font-mono font-medium text-sm" aria-label="Time remaining: 9 minutes 45 seconds">
                        <Clock size={16} aria-hidden="true" /> 09:45
                    </div>
                    <Button variant="ghost" size="sm">Save &amp; Exit</Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex justify-center">
                <div className="w-full max-w-3xl flex flex-col pt-8">
                    {/* Progress indicator */}
                    <div className="mb-10 flex items-center justify-between">
                        <span className="text-sm font-bold text-white uppercase tracking-wider">
                            Question {currentIdx + 1} of {QUESTIONS.length}
                        </span>
                        <div className="flex gap-2" role="progressbar" aria-valuenow={currentIdx + 1} aria-valuemin={1} aria-valuemax={QUESTIONS.length} aria-label={`Question ${currentIdx + 1} of ${QUESTIONS.length}`}>
                            {QUESTIONS.map((q, i) => (
                                <div
                                    key={q.id}
                                    className={`w-10 h-2 rounded-full transition-colors ${i === currentIdx ? "bg-[#33E6FF]" : answers[q.id] ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 md:p-12 mb-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#33E6FF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug relative z-10">
                            {question.text}
                        </h2>

                        <fieldset className="space-y-4 relative z-10">
                            <legend className="sr-only">Select your answer</legend>
                            {question.options.map((opt, idx) => {
                                const isSelected = answers[question.id] === opt;
                                return (
                                    <label
                                        key={idx}
                                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${isSelected ? "border-[#33E6FF] bg-[#33E6FF]/10 text-white" : "border-[#1A2A3A] bg-[#0A1420] text-[#8899AA] hover:border-[#2A3A4A] hover:bg-[#152336] hover:text-white"}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={opt}
                                            checked={isSelected}
                                            onChange={() => handleSelect(opt)}
                                            className="sr-only"
                                        />
                                        <span className="text-lg font-medium">{opt}</span>
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-[#33E6FF] bg-[#33E6FF]" : "border-[#445566]"}`}
                                            aria-hidden="true"
                                        >
                                            {isSelected && <div className="w-2 h-2 bg-[#0A1420] rounded-full" />}
                                        </div>
                                    </label>
                                );
                            })}
                        </fieldset>
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex justify-between items-center mt-auto">
                        {currentIdx > 0 ? (
                            <Button
                                variant="secondary"
                                onClick={() => setCurrentIdx((prev) => prev - 1)}
                            >
                                Previous
                            </Button>
                        ) : (
                            <div />
                        )}
                        <Button
                            variant={isLast ? "primary" : "primary"}
                            onClick={handleNext}
                            disabled={!isAnswered}
                            iconRight={!isLast ? <ChevronRight size={16} aria-hidden="true" /> : undefined}
                        >
                            {isLast ? "Submit Quiz" : "Next Question"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
