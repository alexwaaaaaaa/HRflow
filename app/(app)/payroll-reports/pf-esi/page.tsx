"use client";
import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Download, Upload, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PFEsiScreen() {
    const [activeTab, setActiveTab] = useState<'PF' | 'ESI'>('PF');

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Payroll Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ShieldCheck size={22} className="text-emerald-400" /> PF & ESI Compliance Returns</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate ECR files for monthly portal uploads and track remittance status</p>
                </div>
            </div>

            <div className="flex gap-4 border-b border-[#1A2A3A] pb-0">
                <button onClick={() => setActiveTab('PF')} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'PF' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-[#556677] hover:text-white'}`}>
                    Provident Fund (EPFO)
                </button>
                <button onClick={() => setActiveTab('ESI')} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'ESI' ? 'border-blue-400 text-blue-400' : 'border-transparent text-[#556677] hover:text-white'}`}>
                    Employee State Insurance (ESIC)
                </button>
            </div>

            {activeTab === 'PF' ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold text-sm">March 2026 Remittance</h3>
                                <span className="text-[#AABBCC] text-xs bg-[#1A2A3A] px-2 py-0.5 rounded font-mono">TN/MAS/0012345/000</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-emerald-400 font-black text-3xl">₹4,28,450</div>
                                    <div className="text-[#8899AA] text-xs font-bold mt-1">Total PF Liability (EE + ER)</div>
                                </div>
                                <div className="text-right text-xs text-[#556677]">
                                    <div>EE Share (12%): <span className="text-white">₹2,04,500</span></div>
                                    <div>ER Share (12%): <span className="text-white">₹2,04,500</span></div>
                                    <div>Admin Charges: <span className="text-white">₹19,450</span></div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-5">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                                    <Download size={16} /> Download ECR Text File
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-[#131B2B] border border-[#2A3A4A] hover:border-emerald-500/50 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors" title="Upload TRRN Challan">
                                    <Upload size={16} /> Mark as Paid
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 flex flex-col justify-center">
                            <div className="text-2xl font-black text-white">124</div>
                            <div className="text-[#8899AA] text-xs font-bold uppercase mt-1">Total Members</div>
                            <div className="mt-4 flex items-center justify-between text-xs border-t border-[#1A2A3A] pt-3">
                                <span className="text-emerald-400 font-bold">+5 New</span>
                                <span className="text-[#556677]">-2 Exited</span>
                            </div>
                        </div>

                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex flex-col">
                            <div className="flex gap-2 mb-2"><AlertCircle size={16} className="text-amber-400" /></div>
                            <div className="text-amber-400 font-bold text-sm mb-1">Due Date Alert</div>
                            <div className="text-[#AABBCC] text-xs">PF returns for March are due by <strong className="text-white">April 15th, 2026</strong>. Late payment will attract damages.</div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm bg-[#060D1A]">Recent ECR Filings</div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase">
                                <tr>
                                    <th className="px-5 py-3 border-b border-[#1A2A3A]">Wage Month</th>
                                    <th className="px-5 py-3 border-b border-[#1A2A3A]">Amount</th>
                                    <th className="px-5 py-3 border-b border-[#1A2A3A]">TRRN</th>
                                    <th className="px-5 py-3 border-b border-[#1A2A3A]">Status</th>
                                    <th className="px-5 py-3 border-b border-[#1A2A3A]">Paid On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { m: 'Feb 2026', a: 412000, t: '1052203014562', s: 'Paid', d: '14 Mar 2026' },
                                    { m: 'Jan 2026', a: 405500, t: '1052202021118', s: 'Paid', d: '12 Feb 2026' },
                                    { m: 'Dec 2025', a: 398000, t: '1052201089901', s: 'Paid', d: '10 Jan 2026' },
                                ].map((r, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] text-white">
                                        <td className="px-5 py-3">{r.m}</td>
                                        <td className="px-5 py-3">₹{r.a.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-[#AABBCC] font-mono">{r.t}</td>
                                        <td className="px-5 py-3"><span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold text-[10px]">{r.s}</span></td>
                                        <td className="px-5 py-3 text-[#8899AA]">{r.d}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-24 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl">
                    <ShieldCheck size={48} className="mx-auto mb-4 text-blue-400 opacity-50" />
                    <h3 className="text-white font-bold text-lg mb-2">ESI Portal Integraton Ready</h3>
                    <p className="text-[#8899AA] text-sm max-w-sm mx-auto">Generate ESI excel templates for upload exactly like the PF module. No employees currently fall under the ₹21,000 gross wage threshold for ESI applicability this month.</p>
                </div>
            )}
        </div>
    );
}
