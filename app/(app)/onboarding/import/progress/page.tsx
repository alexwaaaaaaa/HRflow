"use client";
import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function MigrationProgressScreen() {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('Initializing migration engine...');

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(timer);
                    setStatusText('Migration Complete!');
                    return 100;
                }
                const newP = p + (Math.random() * 8);

                // Update text based on progress milestone
                if (newP > 10 && p <= 10) setStatusText('Building organization structure...');
                if (newP > 30 && p <= 30) setStatusText('Importing 1,210 employee records...');
                if (newP > 60 && p <= 60) setStatusText('Mapping payroll histories...');
                if (newP > 85 && p <= 85) setStatusText('Calculating accrued leave balances...');

                return Math.min(100, newP);
            });
        }, 500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full" />
                {/* Moving particles mockup */}
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-50" />
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-30 animation-delay-500" />
            </div>

            <div className="max-w-xl w-full relative z-10 text-center">

                {/* Central Animation */}
                <div className="relative w-40 h-40 mx-auto mb-10">
                    {/* Outer Rings */}
                    <div className="absolute inset-0 border-2 border-[#1A2A3A] rounded-full" />
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
                        <circle
                            className="text-indigo-500 transition-all duration-300 ease-out"
                            strokeWidth="4"
                            strokeDasharray="490"
                            strokeDashoffset={490 - (490 * progress) / 100}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="78"
                            cx="80"
                            cy="80"
                        />
                    </svg>

                    {/* Inner Content */}
                    <div className="absolute inset-2 bg-[#0A1420] border border-[#1A2A3A] rounded-full flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/20">
                        {progress < 100 ? (
                            <>
                                <Database size={32} className="text-indigo-400 mb-2 animate-bounce" />
                                <span className="text-2xl font-black text-white">{Math.round(progress)}%</span>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse" />
                                <CheckCircle2 size={48} className="text-emerald-400 relative z-10" />
                            </>
                        )}
                    </div>
                </div>

                {/* Text Updates */}
                <h2 className="text-2xl font-black text-white mb-3">Migrating your workspace</h2>
                <div className="h-6 flex items-center justify-center gap-2">
                    {progress < 100 && <Loader2 size={14} className="text-indigo-400 animate-spin" />}
                    <p className={`text-[#8899AA] text-sm font-mono ${progress === 100 ? 'text-emerald-400 font-bold' : ''}`}>
                        {statusText}
                    </p>
                </div>

                {/* Detailed Logs Box */}
                <div className="mt-12 bg-[#0A1420]/80 backdrop-blur-xl border border-[#1A2A3A] rounded-2xl p-6 text-left max-h-48 overflow-y-auto font-mono text-xs text-[#556677] space-y-2 shadow-inner">
                    <p className="text-[#8899AA]">{"[" + new Date().toLocaleTimeString() + "]"} Connection established to Kaarya Secure Vault...</p>
                    {progress > 10 && <p className="text-[#8899AA]">{"[" + new Date().toLocaleTimeString() + "]"} Generating 15 Department structures...</p>}
                    {progress > 30 && <p className="text-indigo-300">{"[" + new Date().toLocaleTimeString() + "]"} Succesfully written 500/1210 employee profiles to DB</p>}
                    {progress > 45 && <p className="text-indigo-300">{"[" + new Date().toLocaleTimeString() + "]"} Succesfully written 1000/1210 employee profiles to DB</p>}
                    {progress > 60 && <p className="text-[#8899AA]">{"[" + new Date().toLocaleTimeString() + "]"} Associating 3,450 historical payslips...</p>}
                    {progress > 85 && <p className="text-emerald-400/70">{"[" + new Date().toLocaleTimeString() + "]"} Running final integrity checks...</p>}
                    {progress === 100 && <p className="text-emerald-400 font-bold">{"[" + new Date().toLocaleTimeString() + "]"} MIGRATION SUCCESSFUL. Closing connections.</p>}
                </div>

                {progress === 100 && (
                    <div className="mt-8 animate-fade-in-up">
                        <button onClick={() => window.location.href = '/onboarding/checklist'} className="bg-white text-[#060D1A] px-8 py-4 rounded-xl font-bold flex items-center justify-center w-full gap-2 hover:bg-gray-100 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            <Sparkles size={18} /> Continue Setup
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
