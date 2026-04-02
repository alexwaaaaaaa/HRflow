"use client";
import React, { useState } from 'react';
import { Plane, ArrowLeft, CheckCircle2, Upload, Info } from 'lucide-react';
import Link from 'next/link';

const BLOCK_YEARS = [
    { label: 'Block 2022-2025', remaining: '₹50,000', status: 'Active', deadline: 'Dec 2025' },
    { label: 'Block 2026-2029', remaining: '₹50,000', status: 'Not Started', deadline: 'Dec 2029' },
];

export default function LTAClaimScreen() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ blockYear: 'Block 2022-2025', amount: '', mode: 'Air', fromCity: '', toCity: '', travelDate: '', returnDate: '', travelers: '1', desc: '' });

    if (submitted) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <CheckCircle2 size={56} className="mx-auto mb-4 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white mb-2">LTA Claim Submitted!</h2>
                <p className="text-[#8899AA] mb-6">Claim of <span className="text-white font-bold">₹{form.amount}</span> submitted for manager approval. Tax exemption will apply after approval.</p>
                <button onClick={() => setSubmitted(false)} className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Submit Another</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
            <Link href="/reimbursements/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Reimbursements</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Plane size={22} className="text-violet-400" /> LTA Claim</h1>
                <p className="text-[#8899AA] text-sm mt-1">Leave Travel Allowance — Tax-exempt travel reimbursement for you and your family</p>
            </div>

            {/* Block Year Cards */}
            <div className="grid grid-cols-2 gap-4">
                {BLOCK_YEARS.map(b => (
                    <div key={b.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4">
                        <div className="text-white font-bold text-sm mb-1">{b.label}</div>
                        <div className="text-violet-400 font-black text-xl">{b.remaining}</div>
                        <div className={`text-xs font-bold mt-1 ${b.status === 'Active' ? 'text-emerald-400' : 'text-[#556677]'}`}>{b.status}</div>
                        <div className="text-[#445566] text-[10px] mt-0.5">Deadline: {b.deadline}</div>
                    </div>
                ))}
            </div>

            {/* Info Banner */}
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 flex items-start gap-3">
                <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-[#AABBCC] text-xs leading-relaxed">
                    LTA can be claimed twice in a 4-year block. Only domestic travel is eligible. The cheapest air fare (economy) is the maximum limit for air travel. Upload tickets and boarding passes as proof.
                </div>
            </div>

            {/* Form */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Block Year *</label>
                        <select value={form.blockYear} onChange={e => setForm(v => ({ ...v, blockYear: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none">
                            {BLOCK_YEARS.map(b => <option key={b.label}>{b.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Claim Amount *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677] font-bold">₹</span>
                            <input type="number" placeholder="0" value={form.amount} onChange={e => setForm(v => ({ ...v, amount: e.target.value }))}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-8 pr-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Mode of Travel</label>
                        <select value={form.mode} onChange={e => setForm(v => ({ ...v, mode: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none">
                            {['Air', 'Train', 'Bus'].map(m => <option key={m}>{m}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">From City</label>
                        <input type="text" placeholder="e.g. Bengaluru" value={form.fromCity} onChange={e => setForm(v => ({ ...v, fromCity: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">To City</label>
                        <input type="text" placeholder="e.g. Mumbai" value={form.toCity} onChange={e => setForm(v => ({ ...v, toCity: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Travel Date</label>
                        <input type="date" value={form.travelDate} onChange={e => setForm(v => ({ ...v, travelDate: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Return Date</label>
                        <input type="date" value={form.returnDate} onChange={e => setForm(v => ({ ...v, returnDate: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">No. of Travelers</label>
                        <select value={form.travelers} onChange={e => setForm(v => ({ ...v, travelers: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none">
                            {['1', '2', '3', '4', '5+'].map(n => <option key={n}>{n}</option>)}
                        </select>
                    </div>
                </div>
                <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-5 text-center hover:border-violet-500/50 cursor-pointer transition-colors">
                    <Upload size={22} className="mx-auto mb-2 text-[#445566]" />
                    <div className="text-[#8899AA] text-sm font-semibold">Upload Tickets & Boarding Passes</div>
                    <div className="text-[#445566] text-xs mt-1">PDF, PNG, JPG — both onward & return journeys required</div>
                </div>
                <button onClick={() => form.amount && setSubmitted(true)} disabled={!form.amount}
                    className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                    Submit LTA Claim
                </button>
            </div>
        </div>
    );
}
