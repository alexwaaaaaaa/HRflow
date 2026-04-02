"use client";
import React, { useState } from 'react';
import { FileSignature, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CandidateAcceptScreen() {
    const [agreed, setAgreed] = useState(false);
    const [accepted, setAccepted] = useState(false);

    if (accepted) {
        return (
            <div className="min-h-screen bg-[#0A1420] flex flex-col items-center justify-center py-10 px-6">
                <div className="max-w-md mx-auto text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Offer Accepted!</h1>
                    <p className="text-[#8899AA] leading-relaxed">Your signed offer letter has been securely saved. Our onboarding team will reach out to you within the next 48 hours to initiate your pre-boarding process.</p>

                    <div className="pt-8">
                        <Link href="/candidate/preboarding" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors inline-flex">
                            Continue to Pre-boarding
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A1420] py-10 px-6">
            <div className="max-w-4xl mx-auto space-y-6">

                <Link href="/candidate/offer" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 inline-flex"><ArrowLeft size={16} /> Back to Summary</Link>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><FileSignature size={24} className="text-indigo-400" /> Digital Acceptance</h1>
                        <p className="text-[#8899AA]">Please review the official offer letter and digitally sign below to accept.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-10 h-[600px] overflow-y-auto shadow-xl custom-scrollbar border border-slate-200">
                    {/* Mock Letter Content */}
                    <div className="text-slate-800 space-y-6 text-sm">
                        <div className="flex justify-between items-start mb-8 border-b pb-6">
                            <h1 className="text-indigo-900 font-black text-2xl tracking-tight">HRFlow</h1>
                            <div className="text-right text-slate-500">
                                Date: Nov 05, 2025<br />
                                Ref: HRF/2025/OFF/JB001
                            </div>
                        </div>

                        <h2 className="font-bold text-lg text-slate-900">Offer of Employment</h2>

                        <p>Dear <strong>Anita Kulkarni</strong>,</p>
                        <p>We are delighted to offer you the position of <strong>Senior Frontend Engineer</strong> at HRFlow. We were impressed by your background and believe you will be a great addition to our engineering team.</p>

                        <h3 className="font-bold text-slate-900 mt-6 pt-4 border-t">1. Position & Duties</h3>
                        <p>You will report directly to the VP of Engineering. Your normal place of work will be Bengaluru (Hybrid). The Company reserves the right to require you to work from any other location depending on business needs.</p>

                        <h3 className="font-bold text-slate-900 mt-6">2. Compensation</h3>
                        <p>Your Total Target Compensation (CTC) will be <strong>₹38,00,000</strong> per annum. A detailed breakdown (Annexure A) is attached. You will also be granted 2,500 Restricted Stock Units (RSUs) subject to the standard vesting schedule of the company.</p>

                        <h3 className="font-bold text-slate-900 mt-6">3. Probation & Notice Period</h3>
                        <p>You will be on probation for a period of 6 months. During probation, either party may terminate the employment with 30 days notice. Post confirmation, the notice period will be 60 days.</p>

                        <p className="mt-8">Please sign electronically below to indicate your acceptance of this offer.</p>
                    </div>
                </div>

                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-2xl p-6 relative">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="mt-1">
                            <input type="checkbox" className="hidden" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-[#0A1420] border-[#2A3A4A] group-hover:border-indigo-500'}`}>
                                {agreed && <CheckCircle2 size={16} />}
                            </div>
                        </div>
                        <div>
                            <div className="text-white font-bold mb-1">I accept the offer of employment.</div>
                            <div className="text-[#8899AA] text-sm leading-relaxed">By checking this box, I electronically sign the offer letter and agree to all terms and conditions specified within. I understand this action constitutes a legally binding agreement.</div>
                        </div>
                    </label>

                    <div className="mt-8 flex justify-end gap-4">
                        <button className="bg-[#0A1420] hover:bg-[#1A2A3A] text-red-400 font-bold px-6 py-3 rounded-xl transition-colors border border-transparent hover:border-red-500/30">Decline Offer</button>
                        <button
                            onClick={() => setAccepted(true)}
                            disabled={!agreed}
                            className={`font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 ${agreed ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-[#1A2A3A] text-[#556677] cursor-not-allowed'}`}>
                            Sign & Accept
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
