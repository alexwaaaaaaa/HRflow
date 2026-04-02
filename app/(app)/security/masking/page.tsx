"use client";
import React, { useState } from 'react';
import { EyeOff, AlertCircle, Save, Check } from 'lucide-react';
import Link from 'next/link';

export default function DataMaskingRulesScreen() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <Link href="/security/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Security</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Data Masking Policies</h1>
                    <p className="text-[#8899AA] text-sm">Configure how Highly Sensitive Personal Data (HSPD) is obfuscated in the UI and exports.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                        {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> Save Policies</>}
                    </button>
                </div>
            </div>

            <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-sky-500/10 p-3 rounded-xl border border-sky-500/20 text-sky-400 shrink-0">
                    <EyeOff size={24} />
                </div>
                <div>
                    <h3 className="text-sky-400 font-bold mb-1">Zero-Trust Obfuscation Mode Active</h3>
                    <p className="text-sm text-[#8899AA] leading-relaxed">
                        By default, data is masked as <code>XXXX-XXXX-1234</code>. Only users with Explicit Unmask permission (Base Role: HR Admin, Finance Lead) can click to reveal the true value. Access logs will record every unmask action.
                    </p>
                </div>
            </div>

            {/* Rules Matrix */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-8 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Data Field</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Masking Pattern</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Authorized to Unmask</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">

                            {/* Aadhaar / SSN */}
                            <tr className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-5">
                                    <div className="font-bold text-white mb-0.5">Government ID (Aadhaar/PAN/SSN)</div>
                                    <div className="text-[10px] text-[#556677] uppercase tracking-wider">Onboarding / DPDP</div>
                                </td>
                                <td className="px-6 py-5">
                                    <select className="bg-[#131B2B] border border-[#2A3A4A] text-white text-sm rounded-lg p-2 outline-none focus:border-indigo-500">
                                        <option>Show Last 4 (XXXX-XXXX-1234)</option>
                                        <option>Fully Masked (XXXXXXXXXXXX)</option>
                                        <option>Unmasked for All</option>
                                    </select>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#1A2A3A] text-[#8899AA] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#2A3A4A]">HR Admin</span>
                                        <span className="bg-[#1A2A3A] text-[#8899AA] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#2A3A4A]">Finance Lead</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative ml-auto cursor-pointer">
                                        <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1" />
                                    </div>
                                </td>
                            </tr>

                            {/* Bank Account */}
                            <tr className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-5">
                                    <div className="font-bold text-white mb-0.5">Bank Account Number</div>
                                    <div className="text-[10px] text-[#556677] uppercase tracking-wider">Payroll</div>
                                </td>
                                <td className="px-6 py-5">
                                    <select className="bg-[#131B2B] border border-[#2A3A4A] text-white text-sm rounded-lg p-2 outline-none focus:border-indigo-500">
                                        <option>Show Last 4 (*******1234)</option>
                                        <option>Fully Masked (***********)</option>
                                    </select>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#1A2A3A] text-[#8899AA] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#2A3A4A]">Finance Lead</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative ml-auto cursor-pointer">
                                        <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1" />
                                    </div>
                                </td>
                            </tr>

                            {/* Salary Compensation */}
                            <tr className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-5">
                                    <div className="font-bold text-white mb-0.5">Salary CTC / Take-home</div>
                                    <div className="text-[10px] text-[#556677] uppercase tracking-wider">Directory / Profile</div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] text-sm rounded-lg p-2 opacity-70">
                                        Hidden (Requires specific permission scope)
                                    </div>
                                    <div className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle size={12} /> Hardcoded Rule</div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#1A2A3A] text-[#8899AA] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#2A3A4A]">Manager (Direct Reports Only)</span>
                                        <span className="bg-[#1A2A3A] text-[#8899AA] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#2A3A4A]">Finance Lead</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="w-10 h-5 bg-[#2A3A4A] rounded-full relative ml-auto opacity-50 cursor-not-allowed">
                                        <div className="w-3 h-3 bg-gray-400 rounded-full absolute top-1 right-1" />
                                    </div>
                                </td>
                            </tr>

                            {/* Grievance Docs */}
                            <tr className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-5">
                                    <div className="font-bold text-white mb-0.5">Grievance / POSH Case Files</div>
                                    <div className="text-[10px] text-[#556677] uppercase tracking-wider">Compliance</div>
                                </td>
                                <td className="px-6 py-5">
                                    <select className="bg-[#131B2B] border border-[#2A3A4A] text-white text-sm rounded-lg p-2 outline-none focus:border-indigo-500">
                                        <option>Completely Redacted to Non-IC</option>
                                    </select>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-[10px] font-bold uppercase border border-indigo-500/20">IC Committee Only</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative ml-auto cursor-pointer">
                                        <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
