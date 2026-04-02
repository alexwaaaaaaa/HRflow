"use client";
import React, { useState } from 'react';
import { Heart, ArrowLeft, Upload, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';

const CLAIM_TYPES = ['OPD Consultation', 'Hospitalization', 'Medicine / Pharmacy', 'Diagnostic / Lab Tests', 'Dental Treatment', 'Vision / Spectacles', 'Preventive Health Checkup'];

export default function MedicalReimbursementScreen() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ claimType: '', amount: '', hospitalName: '', treatmentDate: '', patientName: '', relation: 'Self', desc: '' });

    if (submitted) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <CheckCircle2 size={56} className="mx-auto mb-4 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white mb-2">Medical Claim Submitted!</h2>
                <p className="text-[#8899AA] mb-6">Claim of <span className="text-white font-bold">₹{form.amount}</span> for {form.claimType} has been sent for manager approval.</p>
                <button onClick={() => setSubmitted(false)} className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Submit Another</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-6">
            <Link href="/reimbursements/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Reimbursements</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Heart size={22} className="text-rose-400" /> Medical Reimbursement</h1>
                <p className="text-[#8899AA] text-sm mt-1">Submit OPD, hospitalization, and medical expense claims</p>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4">
                <div className="flex justify-between text-sm mb-3">
                    <span className="text-white font-bold">Medical Limit Used</span>
                    <span className="text-rose-400 font-black">₹8,400 / ₹15,000</span>
                </div>
                <div className="h-2.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '56%' }} />
                </div>
                <div className="text-xs text-[#556677] mt-1">₹6,600 remaining — Resets Apr 1, 2026</div>
            </div>

            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 flex gap-3">
                <Info size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-[#AABBCC] text-xs">Annual limit: ₹15,000/year (tax exempt under Section 17(2)). Eligible for self, spouse, dependent children & dependent parents. All bills must be from registered medical practitioners or hospitals.</div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Claim Type *</label>
                        <select value={form.claimType} onChange={e => setForm(v => ({ ...v, claimType: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-rose-500 outline-none">
                            <option value="">Select...</option>
                            {CLAIM_TYPES.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Amount *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677] font-bold">₹</span>
                            <input type="number" placeholder="0" value={form.amount} onChange={e => setForm(v => ({ ...v, amount: e.target.value }))}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-8 pr-4 py-2.5 text-white text-sm focus:border-rose-500 outline-none" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Hospital / Clinic Name</label>
                        <input type="text" placeholder="Apollo Hospital, Bengaluru" value={form.hospitalName} onChange={e => setForm(v => ({ ...v, hospitalName: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-rose-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Treatment Date</label>
                        <input type="date" value={form.treatmentDate} onChange={e => setForm(v => ({ ...v, treatmentDate: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-rose-500 outline-none" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Patient Name</label>
                        <input type="text" placeholder="Patient's full name" value={form.patientName} onChange={e => setForm(v => ({ ...v, patientName: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-rose-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Relation to Employee</label>
                        <select value={form.relation} onChange={e => setForm(v => ({ ...v, relation: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-rose-500 outline-none">
                            {['Self', 'Spouse', 'Child', 'Parent', 'Parent-in-law'].map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                </div>
                <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-5 text-center hover:border-rose-500/50 cursor-pointer transition-colors">
                    <Upload size={22} className="mx-auto mb-2 text-[#445566]" />
                    <div className="text-[#8899AA] text-sm font-semibold">Upload Medical Bills</div>
                    <div className="text-[#445566] text-xs mt-1">Original bills, prescriptions, lab reports — PDF or images</div>
                </div>
                <button onClick={() => form.claimType && form.amount && setSubmitted(true)} disabled={!form.claimType || !form.amount}
                    className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                    Submit Medical Claim
                </button>
            </div>
        </div>
    );
}
