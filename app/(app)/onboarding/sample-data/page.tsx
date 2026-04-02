"use client";
import React, { useState } from 'react';
import { Database, DownloadCloud, Sparkles, CheckCircle2, ChevronRight, X, Loader2 } from 'lucide-react';

export default function SampleDataLoadScreen() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleLoadData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-2xl w-full bg-[#0A1420] border border-[#1A2A3A] rounded-3xl p-8 relative z-10 shadow-2xl">

                <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                        <Database size={32} />
                    </div>
                    {!loading && !success && (
                        <button className="text-[#556677] hover:text-white transition-colors bg-[#131B2B] px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
                            Skip <ChevronRight size={14} />
                        </button>
                    )}
                </div>

                <h1 className="text-3xl font-black text-white mb-3">Explore with Demo Data</h1>
                <p className="text-[#8899AA] text-lg mb-8 leading-relaxed">
                    Not ready to import your real data? Populate your workspace with 50 fictional employees, past payroll runs, and sample leave requests to see Kaarya in action immediately.
                </p>

                <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-xl p-5 mb-8">
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">What gets added?</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: '👥', text: '50 Active Employees in 5 Depts' },
                            { icon: '💰', text: '3 Months of Payroll History' },
                            { icon: '🏖️', text: 'Pending & Approved Leaves' },
                            { icon: '📄', text: 'Sample Policies & Documents' },
                            { icon: '✅', text: 'Compliance Challans (Mock)' },
                            { icon: '⚙️', text: 'Configured Shift Policies' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-[#CCDDEE]">
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {success ? (
                        <button onClick={() => window.location.href = '/dashboard'} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-[#060D1A] px-6 py-4 rounded-xl font-bold transition-all shadow-lg flex justify-center items-center gap-2">
                            Go to Dashboard <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleLoadData}
                            disabled={loading}
                            className={`flex-1 ${loading ? 'bg-[#1A2A3A] text-[#8899AA]' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]'} px-6 py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 relative overflow-hidden`}
                        >
                            {loading ? (
                                <>
                                    <div className="absolute inset-0 bg-indigo-500/20 w-1/2 animate-[shimmer_2s_infinite]" />
                                    <Loader2 className="animate-spin" size={20} /> Loading Sandbox Data...
                                </>
                            ) : (
                                <>
                                    <DownloadCloud size={20} /> Load Sample Data
                                </>
                            )}
                        </button>
                    )}
                </div>

                {!loading && !success && (
                    <div className="mt-6 flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <Sparkles className="text-amber-400 shrink-0" size={20} />
                        <p className="text-xs text-amber-500/90 leading-relaxed">
                            <strong>Note:</strong> You can wipe this demo data at any time from Settings &gt; Danger Zone with a single click once you're ready to import your real organization data.
                        </p>
                    </div>
                )}

                {success && (
                    <div className="mt-6 flex justify-center animate-fade-in-up">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                            <CheckCircle2 size={16} /> Data loaded successfully!
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
