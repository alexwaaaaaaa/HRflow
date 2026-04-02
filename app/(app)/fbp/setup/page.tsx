"use client";
import React, { useState } from 'react';
import { Settings, ArrowLeft, Edit2, Trash2, ToggleLeft, ToggleRight, PlusCircle, Info } from 'lucide-react';
import Link from 'next/link';

const COMPONENTS = [
    { name: 'HRA (House Rent Allowance)', maxPct: '50% of Basic (Metro), 40% (Non-metro)', taxExempt: true, active: true, section: 'Sec 10(13A)', mandatory: true },
    { name: 'LTA (Leave Travel Allowance)', maxPct: '₹50,000 annual limit', taxExempt: true, active: true, section: 'Sec 10(5)', mandatory: false },
    { name: 'Medical Reimbursement', maxPct: '₹15,000 annual', taxExempt: true, active: true, section: 'Sec 17(2)', mandatory: false },
    { name: 'Vehicle Maintenance Allowance', maxPct: '₹1,800/mo (< 1600cc)', taxExempt: true, active: true, section: 'Rule 3(2)', mandatory: false },
    { name: 'Books & Periodicals', maxPct: '₹1,000/month', taxExempt: true, active: true, section: 'Income Tax Rules', mandatory: false },
    { name: 'NPS Self-Contribution (80CCD1B)', maxPct: '₹50,000 additional', taxExempt: true, active: true, section: 'Sec 80CCD(1B)', mandatory: false },
    { name: 'Special Allowance (Taxable Residual)', maxPct: 'Remaining FBP pool', taxExempt: false, active: true, section: 'Fully Taxable', mandatory: true },
];

export default function FBPComponentSetup() {
    const [comps, setComps] = useState(COMPONENTS);
    const toggle = (i: number) => setComps(prev => prev.map((c, idx) => idx === i ? { ...c, active: !c.active } : c));

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/fbp/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> FBP Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Settings size={22} className="text-purple-400" /> FBP Component Setup</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Configure which salary components employees can allocate their FBP pool to</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"><PlusCircle size={16} /> Add Component</button>
            </div>

            <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4 flex gap-3">
                <Info size={15} className="text-purple-400 shrink-0 mt-0.5" />
                <div className="text-[#AABBCC] text-xs leading-relaxed">Components marked as Mandatory cannot be toggled off by employees. Tax-exempt components reduce the employee{"'"}s tax liability when bills are submitted. Special Allowance is always mandatory as the residual absorber.</div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Component</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Limit / Rule</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Section</th>
                                <th className="px-5 py-4 text-center font-bold border-b border-[#1A2A3A]">Tax Exempt</th>
                                <th className="px-5 py-4 text-center font-bold border-b border-[#1A2A3A]">Active</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {comps.map((comp, i) => (
                                <tr key={i} className={`hover:bg-[#131B2B] transition-colors ${!comp.active ? 'opacity-40' : ''}`}>
                                    <td className="px-5 py-4">
                                        <div className="text-white font-semibold text-xs">{comp.name}</div>
                                        {comp.mandatory && <span className="text-[10px] text-purple-400 font-bold">Mandatory</span>}
                                    </td>
                                    <td className="px-5 py-4 text-[#AABBCC] text-xs max-w-48">{comp.maxPct}</td>
                                    <td className="px-5 py-4 text-xs text-indigo-400 font-mono">{comp.section}</td>
                                    <td className="px-5 py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${comp.taxExempt ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {comp.taxExempt ? 'Exempt' : 'Taxable'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <button onClick={() => !comp.mandatory && toggle(i)} className={comp.mandatory ? 'cursor-not-allowed opacity-40' : ''}>
                                            {comp.active ? <ToggleRight size={22} className="text-purple-400" /> : <ToggleLeft size={22} className="text-[#2A3A4A]" />}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button className="p-1.5 rounded-lg hover:bg-[#1A2A3A] text-[#556677] hover:text-white transition-colors"><Edit2 size={14} /></button>
                                            {!comp.mandatory && <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#556677] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A]">
                    <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">Save Component Configuration</button>
                </div>
            </div>
        </div>
    );
}
