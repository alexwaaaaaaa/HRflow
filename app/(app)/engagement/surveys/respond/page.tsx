"use client";
import React, { useState } from 'react';
import {
    CheckCircle2, ArrowRight, ArrowLeft, Send
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const SURVEY_DATA = {
    title: "Q4 Engineering Pulse Survey",
    description: "Your honest feedback helps us improve our engineering culture and processes. This survey is completely anonymous.",
    estimatedTime: "5 mins",
    questions: [
        { id: 1, type: 'rating', text: "How would you rate the current work-life balance in your team?", labels: ["Terrible", "Excellent"] },
        { id: 2, type: 'text', text: "What is one thing we could do to improve developer productivity?" },
        { id: 3, type: 'choice', text: "Do you feel you have the right tools to do your job effectively?", options: ["Yes, absolutely", "Mostly, but missing a few things", "No, we need better tools"] },
        { id: 4, type: 'enps', text: "How likely are you to recommend our company as a great place to work?", labels: ["Not at all likely", "Extremely likely"] },
    ]
};

export default function SurveyResponseScreen() {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const totalSteps = SURVEY_DATA.questions.length + 1; // +1 for the welcome screen

    const handleNext = () => {
        if (activeStep < totalSteps - 1) setActiveStep(activeStep + 1);
    };

    const handlePrev = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-12 shadow-2xl text-center max-w-lg w-full animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-[#00E5A0]/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <CheckCircle2 size={48} className="text-[#00E5A0]" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">Thank You!</h2>
                    <p className="text-[#8899AA] text-lg mb-8">Your feedback has been submitted successfully. We appreciate your time and honesty.</p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="px-8 py-3.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[800px] mx-auto min-h-[calc(100vh-80px)] font-sans flex flex-col justify-center">

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-[#8899AA] mb-2 uppercase tracking-wider">
                    <span>Progress</span>
                    <span>{Math.round((activeStep / (totalSteps - 1)) * 100)}%</span>
                </div>
                <div className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#33E6FF] to-blue-500 rounded-full transition-all duration-500" style={{ width: `${(activeStep / (totalSteps - 1)) * 100}%` }}></div>
                </div>
            </div>

            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col relative overflow-hidden">

                <div className="flex-1 filter-blur transition-all duration-300">

                    {/* Step 0: Welcome Screen */}
                    {activeStep === 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col h-full justify-center">
                            <span className="inline-block px-3 py-1 bg-[#33E6FF]/10 text-[#33E6FF] text-xs font-bold uppercase tracking-wider rounded-full mb-6 w-max">Pulse Survey</span>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">{SURVEY_DATA.title}</h1>
                            <p className="text-[#8899AA] text-lg mb-8 leading-relaxed max-w-2xl">{SURVEY_DATA.description}</p>
                            <p className="text-xs text-[#445566] font-bold uppercase tracking-wider mb-8">⏱ Estimated time: {SURVEY_DATA.estimatedTime}</p>

                            <div className="mt-auto">
                                <button onClick={handleNext} className="px-8 py-4 bg-[#33E6FF] text-[#0A1420] font-black text-lg rounded-xl hover:bg-[#29b8cc] transition-all hover:scale-105 shadow-[0_5px_20px_rgba(51,230,255,0.3)] flex items-center gap-3">
                                    Start Survey <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Question Steps */}
                    {activeStep > 0 && activeStep < totalSteps && (
                        <div className="animate-in fade-in slide-in-from-right-4 h-full flex flex-col">
                            {(() => {
                                const q = SURVEY_DATA.questions[activeStep - 1];
                                return (
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
                                            <span className="text-[#33E6FF] mr-3">{activeStep}.</span>{q.text}
                                        </h2>

                                        {/* Rating Scale */}
                                        {q.type === 'rating' && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between gap-2">
                                                    {[1, 2, 3, 4, 5].map(num => (
                                                        <button
                                                            key={num}
                                                            onClick={() => setAnswers({ ...answers, [q.id]: num })}
                                                            className={`flex-1 aspect-square md:aspect-auto md:h-16 rounded-2xl md:rounded-xl flex items-center justify-center text-xl font-black transition-all border-2 ${answers[q.id] === num ? 'bg-[#33E6FF] border-[#33E6FF] text-[#0A1420] scale-105 shadow-[0_5px_15px_rgba(51,230,255,0.3)]' : 'bg-[#152336] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566] hover:text-white'}`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-[#445566] uppercase tracking-wider px-2">
                                                    <span>{q.labels?.[0]}</span>
                                                    <span>{q.labels?.[1]}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Multiple Choice */}
                                        {q.type === 'choice' && (
                                            <div className="space-y-3">
                                                {q.options?.map((opt, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                                                        className={`w-full p-5 rounded-2xl text-left font-bold transition-all border-2 ${answers[q.id] === opt ? 'bg-[#33E6FF]/10 border-[#33E6FF] text-white shadow-[0_0_15px_rgba(51,230,255,0.1)]' : 'bg-[#152336] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566] hover:text-[#CCDDEE]'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Text Input */}
                                        {q.type === 'text' && (
                                            <textarea
                                                rows={5}
                                                placeholder="Type your answer here..."
                                                value={answers[q.id] || ''}
                                                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                                                className="w-full bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6 text-white text-lg placeholder:text-[#445566] focus:outline-none focus:border-[#33E6FF] resize-none"
                                            ></textarea>
                                        )}

                                        {/* eNPS */}
                                        {q.type === 'enps' && (
                                            <div className="space-y-6">
                                                <div className="flex justify-between gap-1 sm:gap-2">
                                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                                                        let colorClass = 'hover:border-[#445566]';
                                                        if (answers[q.id] === num) {
                                                            if (num <= 6) colorClass = 'bg-[#FF4444] border-[#FF4444] text-white';
                                                            else if (num <= 8) colorClass = 'bg-[#FFB020] border-[#FFB020] text-[#0A1420]';
                                                            else colorClass = 'bg-[#00E5A0] border-[#00E5A0] text-[#0A1420]';
                                                        }

                                                        return (
                                                            <button
                                                                key={num}
                                                                onClick={() => setAnswers({ ...answers, [q.id]: num })}
                                                                className={`flex-1 aspect-square sm:aspect-auto sm:h-14 rounded-lg flex items-center justify-center sm:text-lg font-black transition-all border-2 ${answers[q.id] === num ? `${colorClass} scale-110 sm:scale-105 shadow-lg z-10 relative` : 'bg-[#152336] border-[#2A3A4A] text-[#8899AA]'}`}
                                                            >
                                                                {num}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-[#445566] uppercase tracking-wider px-2">
                                                    <span>{q.labels?.[0]} (0)</span>
                                                    <span>{q.labels?.[1]} (10)</span>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                {activeStep > 0 && (
                    <div className="mt-12 flex justify-between items-center pt-6 border-t border-[#1A2A3A]">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-[#2A3A4A] bg-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        {activeStep < totalSteps - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!answers[SURVEY_DATA.questions[activeStep - 1].id]}
                                className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all ${!answers[SURVEY_DATA.questions[activeStep - 1].id] ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#33E6FF] text-[#0A1420] hover:bg-[#29b8cc]'}`}
                            >
                                Continue <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !answers[SURVEY_DATA.questions[activeStep - 1].id]}
                                className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all ${!answers[SURVEY_DATA.questions[activeStep - 1].id] ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#00E5A0] text-[#0A1420] hover:bg-[#00c98d] shadow-[0_5px_15px_rgba(0,229,160,0.3)]'}`}
                            >
                                {isSubmitting ? <span className="w-5 h-5 border-2 border-[#0A1420]/30 border-t-[#0A1420] rounded-full animate-spin"></span> : <><Send size={18} /> Submit Feedback</>}
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
