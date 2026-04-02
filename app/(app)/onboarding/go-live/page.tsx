"use client";
import React from 'react';
import { Rocket, ShieldCheck, Mail, Calculator, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function GoLiveChecklistScreen() {
    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col items-center py-12 px-6">

            <div className="text-center mb-12">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
                    <Rocket className="text-emerald-400" size={36} />
                </div>
                <h1 className="text-4xl font-black text-white mb-4">Go-Live Readiness</h1>
                <p className="text-[#8899AA] text-lg max-w-2xl mx-auto">
                    You're almost ready to officially launch Kaarya to your organization. Review these final critical checks before flipping the switch.
                </p>
            </div>

            <div className="w-full max-w-3xl space-y-4">

                {/* Section 1 */}
                <div className="bg-[#0A1420] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full" />
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="mt-1">
                            <CheckCircle2 size={24} className="text-emerald-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">Company & Legal Info</h3>
                            <p className="text-[#8899AA] text-sm mb-4">PAN, TAN, PT states, and registered addresses are verified.</p>
                            <Link href="/settings/company" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                                Review Settings <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-indigo-500/50 rounded-2xl p-6 transition-colors">
                    <div className="flex items-start gap-4 flex-col sm:flex-row">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#2A3A4A] shrink-0 mt-1">
                            <div className="w-2.5 h-2.5 bg-[#2A3A4A] rounded-full hidden" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-white">First Payroll Run</h3>
                                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Required</span>
                            </div>
                            <p className="text-[#8899AA] text-sm mb-4">You need to configure your first payroll cycle dates and run a dummy calculation to ensure mappings are correct.</p>

                            <div className="bg-[#131B2B] rounded-xl p-4 border border-[#2A3A4A] flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#0A1420] p-2 rounded-lg"><Calculator size={18} className="text-[#556677]" /></div>
                                    <div>
                                        <div className="text-sm text-white font-bold mb-0.5">Setup Payroll Cycle</div>
                                        <div className="text-xs text-[#556677]">Define attendance cut-offs and payout dates.</div>
                                    </div>
                                </div>
                                <button onClick={() => window.location.href = '/onboarding/guide/payroll'} className="text-indigo-400 hover:text-white font-bold text-sm bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg transition-colors">Start Guide</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-indigo-500/50 rounded-2xl p-6 transition-colors">
                    <div className="flex items-start gap-4 flex-col sm:flex-row">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#2A3A4A] shrink-0 mt-1">
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-white">Invite Your Team</h3>
                                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Required</span>
                            </div>
                            <p className="text-[#8899AA] text-sm mb-4">Send welcome emails to your 1,210 imported employees to give them access to the self-service portal.</p>

                            <div className="bg-[#131B2B] rounded-xl p-4 border border-[#2A3A4A] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#0A1420] p-2 rounded-lg"><Mail size={18} className="text-[#556677]" /></div>
                                    <div>
                                        <div className="text-sm text-white font-bold mb-0.5">Send Invitations</div>
                                        <div className="text-xs text-[#556677]">Draft welcome email and send magic links.</div>
                                    </div>
                                </div>
                                <button onClick={() => window.location.href = '/onboarding/guide/invite'} className="text-indigo-400 hover:text-white font-bold text-sm bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg transition-colors">Start Guide</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-12 text-center">
                <button disabled className="bg-[#1A2A3A] text-[#556677] px-8 py-4 rounded-xl font-bold transition-colors shadow-lg cursor-not-allowed flex items-center gap-2 mx-auto">
                    <Rocket size={18} /> Launch Workspace
                </button>
                <p className="text-[10px] text-[#556677] font-bold uppercase tracking-wider mt-4">Complete all required steps to unlock</p>
            </div>

        </div>
    );
}
