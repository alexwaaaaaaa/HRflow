"use client";
import React, { useState } from 'react';
import { Settings, ArrowLeft, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
    { name: 'Medical / OPD', limit: '₹15,000', cycle: 'Annual', taxable: false, active: true, claimsYtd: 48 },
    { name: 'LTA (Leave Travel Allowance)', limit: '₹50,000', cycle: 'Annual', taxable: false, active: true, claimsYtd: 12 },
    { name: 'Fuel & Conveyance', limit: '₹2,400', cycle: 'Monthly', taxable: false, active: true, claimsYtd: 182 },
    { name: 'Internet / Broadband', limit: '₹2,000', cycle: 'Monthly', taxable: false, active: true, claimsYtd: 94 },
    { name: 'Books & Periodicals', limit: '₹5,000', cycle: 'Annual', taxable: false, active: true, claimsYtd: 8 },
    { name: 'Professional Development', limit: '₹25,000', cycle: 'Annual', taxable: true, active: false, claimsYtd: 0 },
    { name: 'Telephone Reimbursement', limit: '₹1,200', cycle: 'Monthly', taxable: true, active: true, claimsYtd: 66 },
];

export default function ReimbursementPolicySetup() {
    const [cats, setCats] = useState(CATEGORIES);
    const toggle = (i: number) => setCats(prev => prev.map((c, idx) => idx === i ? { ...c, active: !c.active } : c));

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/reimbursements/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Reimbursements</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Settings size={22} className="text-violet-400" /> Reimbursement Policy Setup</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Define categories, annual limits, and tax treatment for each reimbursement type</p>
                </div>
                <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Category Name</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Limit</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Cycle</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Tax Treatment</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Claims YTD</th>
                                <th className="px-5 py-4 text-center font-bold border-b border-[#1A2A3A]">Active</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {cats.map((cat, i) => (
                                <tr key={i} className={`hover:bg-[#131B2B] transition-colors ${!cat.active ? 'opacity-50' : ''}`}>
                                    <td className="px-5 py-4 text-white font-semibold">{cat.name}</td>
                                    <td className="px-5 py-4 text-emerald-400 font-bold">{cat.limit}</td>
                                    <td className="px-5 py-4 text-[#AABBCC]">{cat.cycle}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cat.taxable ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                            {cat.taxable ? 'Taxable' : 'Tax Exempt'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-[#AABBCC]">{cat.claimsYtd}</td>
                                    <td className="px-5 py-4 text-center">
                                        <button onClick={() => toggle(i)} className="transition-colors">
                                            {cat.active
                                                ? <ToggleRight size={22} className="text-violet-400 hover:text-violet-300" />
                                                : <ToggleLeft size={22} className="text-[#2A3A4A] hover:text-[#3A4A5A]" />}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button className="p-1.5 rounded-lg hover:bg-[#1A2A3A] text-[#556677] hover:text-white transition-colors"><Edit2 size={14} /></button>
                                            <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#556677] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A]">
                    <button className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">Save Policy Changes</button>
                </div>
            </div>
        </div>
    );
}
