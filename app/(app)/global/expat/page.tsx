"use client";
import React, { useState } from 'react';
import { Globe, Plane, FileText, AlertTriangle, ShieldCheck, Download, Users } from 'lucide-react';
import Link from 'next/link';

export default function ExpatManagementScreen() {
    const [activeTab, setActiveTab] = useState('visas');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Globe size={24} className="text-indigo-400" /> Expatriate & Mobility Management</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track work visas, international tax equivalency, and relocation allowances across your global workforce.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Users size={14} /> Total Active Expats</div>
                    <div className="text-3xl font-black text-white mb-2">34</div>
                    <div className="text-indigo-400 text-xs font-bold">Across 6 countries</div>
                </div>

                <div className="bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-amber-200 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><AlertTriangle size={14} /> Visa Expirations (90d)</div>
                    <div className="text-3xl font-black text-amber-400 mb-2">3</div>
                    <div className="text-[#8899AA] text-xs font-bold hover:text-white cursor-pointer transition-colors underline decoration-dashed">Action Required</div>
                </div>

                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between">
                    <div>
                        <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Tax Equalization Settlements</div>
                        <div className="text-2xl font-bold text-white mb-1">FY24 cycle complete</div>
                        <div className="text-[#556677] text-xs leading-relaxed max-w-sm">Awaiting inputs from tax provider for FY25 estimated host country liabilities.</div>
                    </div>
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">
                        Manage Allowances
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex gap-4 items-center bg-[#060D1A]">
                    {[
                        { id: 'visas', label: 'Immigration & Visas' },
                        { id: 'allowances', label: 'COLA & Mobility Packages' },
                        { id: 'tax', label: 'Tax & Shadow Payroll Setup' },
                    ].map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === t.id ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-[#8899AA] hover:text-white border border-transparent'}`}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'visas' && (
                    <div className="p-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-bold text-lg">Work Permit Tracking</h3>
                            <button className="text-indigo-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1">New Immigration Case &rarr;</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                        <th className="p-4 py-3">Employee / Host Country</th>
                                        <th className="p-4 py-3">Visa Type</th>
                                        <th className="p-4 py-3">Status / Expiry</th>
                                        <th className="p-4 py-3">Documentation</th>
                                        <th className="p-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm border-b border-[#1A2A3A]">
                                    <tr className="hover:bg-[#131B2B]/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white mb-0.5">David Chang</div>
                                            <div className="text-[#8899AA] text-xs flex items-center gap-1"><Plane size={10} /> SG &rarr; US</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-white">L-1A Intracompany</div>
                                            <div className="text-[#556677] text-xs">Awaiting USCIS Approval</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-sky-500/10 text-sky-400 text-[10px] uppercase font-bold px-2 py-1 rounded border border-sky-500/20">Processing</span>
                                        </td>
                                        <td className="p-4 text-[#AABBCC]">
                                            <div className="flex gap-2">
                                                <button title="View Petition" className="p-1.5 bg-[#1A2A3A] rounded hover:text-white transition-colors"><FileText size={14} /></button>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-xs text-indigo-400 font-bold hover:text-white transition-colors">Update Status</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#131B2B]/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white mb-0.5">Anita Kulkarni</div>
                                            <div className="text-[#8899AA] text-xs flex items-center gap-1"><Plane size={10} /> IN &rarr; AE</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-white">UAE Golden Visa</div>
                                            <div className="text-[#556677] text-xs">ID: 784-XXXX-XXXX</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1 w-fit"><ShieldCheck size={10} /> Valid (Mar 2028)</span>
                                        </td>
                                        <td className="p-4 text-[#AABBCC]">
                                            <div className="flex gap-2">
                                                <button title="Emirates ID" className="p-1.5 bg-[#1A2A3A] rounded hover:text-white transition-colors"><FileText size={14} /></button>
                                                <button title="Visa Page" className="p-1.5 bg-[#1A2A3A] rounded hover:text-white transition-colors"><FileText size={14} /></button>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-xs text-[#556677] font-bold hover:text-white transition-colors">Manage</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Other tabs omitted for brevity, showing structure only */}
                {activeTab === 'allowances' && (
                    <div className="p-12 text-center text-[#556677] animate-in fade-in">
                        Cost of Living Adjustment (COLA) and Housing Packages content goes here.
                    </div>
                )}

                {activeTab === 'tax' && (
                    <div className="p-12 text-center text-[#556677] animate-in fade-in flex flex-col items-center">
                        <div className="mb-4 text-amber-500">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-white font-bold mb-2">Redirect to Shadow Payroll Module</h3>
                        <p className="max-w-md mx-auto mb-6">Tax equalization calculations require simultaneous processing in Home and Host entity ledgers.</p>
                        <Link href="/global/shadow-payroll" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors inline-block">
                            Go to Shadow Payroll &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
