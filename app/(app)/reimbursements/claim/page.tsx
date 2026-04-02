"use client";
import React, { useState } from 'react';
import { Receipt, ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const CATEGORY_LIST = ['Medical / OPD', 'LTA', 'Fuel & Conveyance', 'Internet / Broadband', 'Books & Periodicals', 'Telephone'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function ReimbursementClaimEmployee() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ category: '', amount: '', month: 'March', year: '2026', desc: '', billDate: '' });

    if (submitted) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <CheckCircle2 size={56} className="mx-auto mb-4 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white mb-2">Claim Submitted!</h2>
                <p className="text-[#8899AA] mb-6">Your reimbursement claim of <span className="text-white font-bold">₹{form.amount}</span> for <span className="text-white font-bold">{form.category}</span> has been sent to your manager for approval.</p>
                <button onClick={() => setSubmitted(false)} className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Submit Another Claim</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-6">
            <Link href="/reimbursements/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Reimbursements</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Receipt size={22} className="text-violet-400" /> Submit Reimbursement Claim</h1>
                <p className="text-[#8899AA] text-sm mt-1">Upload your bills and request reimbursement from your employer</p>
            </div>

            {/* Annual Balance Card */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-3">Your Reimbursement Balance (FY 2025-26)</div>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Medical', limit: 15000, used: 8400 },
                        { label: 'LTA', limit: 50000, used: 0 },
                        { label: 'Internet', limit: 24000, used: 14400 },
                    ].map(b => {
                        const pct = Math.round(b.used / b.limit * 100);
                        return (
                            <div key={b.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">{b.label}</span>
                                    <span className="text-white font-bold">₹{(b.limit - b.used).toLocaleString()} left</span>
                                </div>
                                <div className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${pct > 80 ? 'bg-red-500' : pct > 50 ? 'bg-amber-500' : 'bg-violet-500'}`} style={{ width: `${pct}%` }} />
                                </div>
                                <div className="text-[10px] text-[#445566] mt-0.5">{pct}% used</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                <div>
                    <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Reimbursement Category *</label>
                    <select value={form.category} onChange={e => setForm(v => ({ ...v, category: e.target.value }))}
                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none">
                        <option value="">Select category...</option>
                        {CATEGORY_LIST.map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Amount *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677] font-bold">₹</span>
                            <input type="number" placeholder="0" value={form.amount} onChange={e => setForm(v => ({ ...v, amount: e.target.value }))}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-8 pr-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Month</label>
                        <select value={form.month} onChange={e => setForm(v => ({ ...v, month: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none">
                            {MONTHS.map(m => <option key={m}>{m}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Bill Date</label>
                        <input type="date" value={form.billDate} onChange={e => setForm(v => ({ ...v, billDate: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Description</label>
                    <textarea placeholder="Brief description of the expense..." value={form.desc} onChange={e => setForm(v => ({ ...v, desc: e.target.value }))} rows={2}
                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none resize-none" />
                </div>
                <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-6 text-center hover:border-violet-500/50 cursor-pointer transition-colors">
                    <Upload size={24} className="mx-auto mb-2 text-[#445566]" />
                    <div className="text-[#8899AA] text-sm font-semibold">Upload Bill / Receipt</div>
                    <div className="text-[#445566] text-xs mt-1">PDF, PNG, JPG — Max 5MB per file</div>
                </div>
                <button onClick={() => form.category && form.amount && setSubmitted(true)} disabled={!form.category || !form.amount}
                    className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                    Submit Claim for Approval
                </button>
            </div>
        </div>
    );
}
