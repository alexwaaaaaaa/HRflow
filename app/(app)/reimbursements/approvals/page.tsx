"use client";
import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, Eye, Clock, Filter } from 'lucide-react';
import Link from 'next/link';

const QUEUE = [
    { id: 'RMB-441', emp: 'Anita Kulkarni', avatar: 'AK', dept: 'Engineering', type: 'Medical', amount: 12400, billDate: '07 Mar 2026', submitted: '2h ago', bills: 2, desc: 'Doctor consultation + medicine bills — Apollo Hospitals', status: 'Pending' },
    { id: 'RMB-439', emp: 'Meena Joshi', avatar: 'MJ', dept: 'Finance', type: 'Medical', amount: 22000, billDate: '05 Mar 2026', submitted: '1d ago', bills: 3, desc: 'Hospitalization: appendix surgery — Fortis Hospital', status: 'Pending' },
    { id: 'RMB-437', emp: 'Karan Singh', avatar: 'KS', dept: 'Sales', type: 'Fuel', amount: 8500, billDate: '04 Mar 2026', submitted: '2d ago', bills: 4, desc: 'Client visits — Petrol bills for Chennai, March 1-4', status: 'Pending' },
    { id: 'RMB-434', emp: 'Priya Rao', avatar: 'PR', dept: 'HR', type: 'Internet', amount: 1800, billDate: '28 Feb 2026', submitted: '4d ago', bills: 1, desc: 'Airtel Fiber broadband — Feb 2026 invoice', status: 'Pending' },
];

export default function ReimbursementApprovalScreen() {
    const [items, setItems] = useState(QUEUE);
    const [notes, setNotes] = useState<Record<string, string>>({});

    const handle = (id: string, action: 'approve' | 'reject') => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/reimbursements/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Reimbursements</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><CheckCircle2 size={22} className="text-violet-400" /> Approval Queue</h1>
                    <p className="text-[#8899AA] text-sm mt-1">{items.length} claims awaiting your approval</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl font-bold">
                    <Clock size={14} /> Oldest: 4 days pending
                </div>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-24">
                    <CheckCircle2 size={48} className="mx-auto mb-4 text-emerald-400 opacity-50" />
                    <h3 className="text-white font-bold text-lg">All caught up!</h3>
                    <p className="text-[#8899AA] text-sm mt-1">No pending reimbursement claims.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center font-bold text-violet-400 shrink-0">{item.avatar}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-white font-bold">{item.emp}</span>
                                        <span className="text-[#556677] text-xs">{item.dept}</span>
                                        <span className="text-xs text-[#556677]">· Submitted {item.submitted}</span>
                                        <span className="ml-auto text-2xl font-black text-violet-400">₹{item.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-1 text-xs text-[#8899AA]">
                                        <span className="bg-[#1A2A3A] px-2 py-0.5 rounded font-bold text-[#AABBCC]">{item.type}</span>
                                        <span>Bill Date: {item.billDate}</span>
                                        <span className="flex items-center gap-1"><Eye size={10} /> {item.bills} attachment{item.bills > 1 ? 's' : ''}</span>
                                    </div>
                                    <p className="text-[#8899AA] text-sm mt-2">{item.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="text" placeholder="Approval note (optional)..." value={notes[item.id] || ''}
                                    onChange={e => setNotes(p => ({ ...p, [item.id]: e.target.value }))}
                                    className="flex-1 bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2 text-white text-sm focus:border-violet-500 outline-none" />
                                <button onClick={() => handle(item.id, 'approve')} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
                                    <CheckCircle2 size={14} /> Approve
                                </button>
                                <button onClick={() => handle(item.id, 'reject')} className="flex items-center gap-2 bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 text-red-400 font-bold px-4 py-2 rounded-xl text-sm transition-colors">
                                    <XCircle size={14} /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
