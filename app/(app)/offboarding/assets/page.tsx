"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Laptop, Briefcase, Key, RefreshCw, ShieldAlert, CheckSquare } from 'lucide-react';

export default function AssetRecoveryScreen() {
    const [activeTab, setActiveTab] = useState('pending');

    return (
        <Page
            title="IT & Asset Recovery Dashboard"
            subtitle="Track hardware returns, software license revocation, and physical access badge collection."
            breadcrumbs={[{ label: "Offboarding", href: "/offboarding" }, { label: "Assets" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Laptop size={24} className="text-amber-400" /> IT & Asset Recovery Dashboard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track hardware returns, software license revocation, and physical access badge collection.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Pending Hardware Returns</div>
                    <div className="text-3xl font-black text-amber-500 mb-2">18</div>
                    <div className="text-[#556677] text-xs font-bold">Laptops, monitors, phones</div>
                </div>

                <div className="bg-[#0A1420] border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">Overdue Asset Returns</div>
                    <div className="text-3xl font-black text-rose-500 mb-2">3</div>
                    <div className="text-rose-200/60 text-xs font-bold underline decoration-dashed cursor-pointer">Block Final Settlements</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Software Licenses Revoked</div>
                    <div className="text-3xl font-black text-emerald-400 mb-2">1,240</div>
                    <div className="text-[#556677] text-xs font-bold">YTD Total Saved: $45,200</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <h3 className="text-white text-sm font-bold mb-3">Courier Integration</h3>
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors w-full">
                        Schedule FedEx Pickup
                    </button>
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-[#060D1A] border border-[#1A2A3A] rounded-xl w-fit mb-6">
                {[
                    { id: 'pending', label: 'Pending Returns (18)' },
                    { id: 'overdue', label: 'Overdue (3)' },
                    { id: 'completed', label: 'Completed Last 30 Days' },
                ].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === t.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A] shadow-sm' : 'text-[#8899AA] hover:text-white'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg animate-in fade-in">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Employee & LWD</th>
                                <th className="p-4 py-3">Assigned Assets</th>
                                <th className="p-4 py-3">Est. Value</th>
                                <th className="p-4 py-3">Logistics Status</th>
                                <th className="p-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {/* Row 1 */}
                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Michael Chang</div>
                                    <div className="text-[#AABBCC] text-xs font-mono">LWD: Oct 15</div>
                                </td>
                                <td className="p-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Laptop size={12} className="text-[#8899AA]" /> MacBook Pro 14" (IT-MAC-842)
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <Briefcase size={12} className="text-[#8899AA]" /> YubiKey Security Token
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-[#AABBCC] font-mono">$2,450</td>
                                <td className="p-4">
                                    <div className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-1 rounded w-fit flex items-center gap-1 font-bold tracking-wide">
                                        <RefreshCw size={12} /> Box Shipped to Emp
                                    </div>
                                </td>
                                <td className="p-4 text-right align-middle">
                                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-end gap-1 ml-auto">
                                        <CheckSquare size={14} /> Mark Received
                                    </button>
                                </td>
                            </tr>

                            {/* Row 2 (Overdue) */}
                            <tr className="border-b border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Sarah Jenkins</div>
                                    <div className="text-rose-400 text-xs font-mono font-bold">LWD: Sep 30 (Overdue)</div>
                                </td>
                                <td className="p-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Laptop size={12} className="text-[#8899AA]" /> Dell XPS 15 (IT-WIN-112)
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <Key size={12} className="text-[#8899AA]" /> Building Access Badge
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-[#AABBCC] font-mono">$1,800</td>
                                <td className="p-4">
                                    <div className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-1 rounded w-fit flex items-center gap-1 font-bold tracking-wide">
                                        <ShieldAlert size={12} /> Non-Responsive
                                    </div>
                                </td>
                                <td className="p-4 text-right align-middle">
                                    <button className="bg-[#131B2B] border border-rose-500/50 text-rose-400 hover:bg-rose-500/10 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-end gap-1 ml-auto">
                                        Initiate Deduction
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
