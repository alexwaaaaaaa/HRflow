"use client";
import React, { useState } from 'react';
import {
    Heart, Send, ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ENPSTakeScreen() {
    const router = useRouter();
    const [score, setScore] = useState<number | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (score === null) return;

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
                    <div className="w-24 h-24 bg-[#FF4444]/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Heart size={48} className="text-[#FF4444] animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">Thanks for Voting!</h2>
                    <p className="text-[#8899AA] text-lg mb-8">Your feedback is fully anonymous and helps us build a better workplace.</p>
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

            <div className="bg-[#0A1420] border-2 border-[#1A2A3A] rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col relative overflow-hidden">

                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FF4444] via-[#FFB020] to-[#00E5A0]"></div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-4">How likely are you to recommend us as a place to work?</h1>
                    <p className="text-[#8899AA] text-lg max-w-xl mx-auto flex items-center justify-center gap-2">
                        <ShieldCheck size={18} className="text-[#00E5A0]" />
                        This quick pulse is 100% anonymous.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">

                    <div className="mb-12">
                        <div className="flex justify-between gap-1 sm:gap-2 mb-4">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                                let interactiveBg = 'bg-[#152336]';
                                let interactiveBorder = 'border-[#2A3A4A]';
                                let interactiveText = 'text-[#8899AA]';

                                if (score === num) {
                                    if (num <= 6) { interactiveBg = 'bg-[#FF4444]'; interactiveBorder = 'border-[#FF4444]'; interactiveText = 'text-white'; }
                                    else if (num <= 8) { interactiveBg = 'bg-[#FFB020]'; interactiveBorder = 'border-[#FFB020]'; interactiveText = 'text-[#0A1420]'; }
                                    else { interactiveBg = 'bg-[#00E5A0]'; interactiveBorder = 'border-[#00E5A0]'; interactiveText = 'text-[#0A1420]'; }
                                }

                                return (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setScore(num)}
                                        className={`flex-1 aspect-square sm:aspect-auto sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center sm:text-2xl font-black transition-all border-2 ${interactiveBg} ${interactiveBorder} ${interactiveText} hover:border-[#445566] hover:text-white ${score === num ? 'scale-110 sm:scale-105 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10' : ''}`}
                                    >
                                        {num}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="flex justify-between text-sm font-bold text-[#445566] uppercase tracking-wider px-2">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF4444]"></span> Not at all likely</span>
                            <span className="flex items-center gap-1.5 hidden sm:flex"><span className="w-2 h-2 rounded-full bg-[#FFB020]"></span> Neutral</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00E5A0]"></span> Extremely likely</span>
                        </div>
                    </div>

                    <div className={`transition-all duration-500 overflow-hidden ${score !== null ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <h3 className="text-white font-bold mb-3">
                            {score !== null && score <= 6 ? "We're sorry to hear that. What's the main reason for your score? (Optional)" :
                                score !== null && score <= 8 ? "What could we do to improve? (Optional)" :
                                    "Awesome! What do you love most about working here? (Optional)"}
                        </h3>
                        <textarea
                            rows={4}
                            placeholder="Type your feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6 text-white text-base placeholder:text-[#445566] focus:outline-none focus:border-[#33E6FF] resize-none mb-6"
                        ></textarea>
                    </div>

                    <div className="mt-auto flex justify-center pt-8 border-t border-[#1A2A3A]">
                        <button
                            type="submit"
                            disabled={isSubmitting || score === null}
                            className={`px-10 py-4 rounded-xl font-black text-lg flex flex-col md:flex-row items-center gap-2 transition-all w-full max-w-sm justify-center ${score === null ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#FF4444] text-white hover:bg-[#ff2a2a] shadow-[0_5px_20px_rgba(255,68,68,0.3)] hover:scale-105'}`}
                        >
                            {isSubmitting ? <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <><Send size={20} /> Submit Feedback</>}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
