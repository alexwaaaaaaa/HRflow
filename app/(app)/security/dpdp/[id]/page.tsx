"use client";
import React from 'react';
import { UserCircle, ShieldCheck, Download, Calendar, History, Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function DPDPয়ConsentDetailScreen({ params }: { params: { id: string } }) {
    const defaultUser = "Fatima Sheikh (EMP-0214)";

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/dpdp" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to DPDP Roster</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Data Principal Profile</h1>
                    <p className="text-[#8899AA] text-sm">Review granular consent agreements and metadata tracking for {defaultUser}.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Consent Blob
                    </button>
                </div>
            </div>

            {/* Current Consent Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {[
                    { name: 'Core HR Operations', desc: 'Payroll, Taxes, PF, Basic ID', status: 'Granted', date: 'Mar 10, 2025' },
                    { name: 'Biometric Attendance', desc: 'Face ID & Fingerprint scanners', status: 'Granted', date: 'Mar 10, 2025' },
                    { name: 'AI / Copilot Processing', desc: 'Using chat data to train internal AI models', status: 'Opted Out', date: 'Sep 01, 2026' },
                ].map((c, i) => (
                    <div key={i} className={`border rounded-2xl p-6 ${c.status === 'Granted' ? 'bg-[#0A1420] border-[#1A2A3A]' : 'bg-amber-500/5 border-amber-500/20'}`}>
                        <h3 className={`font-bold mb-1 ${c.status === 'Granted' ? 'text-white' : 'text-amber-400'}`}>{c.name}</h3>
                        <p className="text-xs text-[#8899AA] mb-4 h-8">{c.desc}</p>

                        <div className="flex justify-between items-center border-t border-[#1A2A3A] pt-4">
                            <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${c.status === 'Granted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                {c.status}
                            </span>
                            <span className="text-xs text-[#556677] flex items-center gap-1"><Calendar size={12} /> {c.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Verifiable Consent Log */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-8">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><History size={18} className="text-[#556677]" /> Irrefutable Consent Audit Trail</h2>
                    <div className="text-[10px] font-mono text-[#556677] uppercase">WORM Secured</div>
                </div>
                <div className="p-6 space-y-8">

                    {/* Log Event 1 */}
                    <div className="relative pl-6 border-l-2 border-[#1A2A3A]">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-[#0A1420]" />
                        <div className="mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-sm">Consent Modified: Opt-Out AI Processing</span>
                                <span className="bg-[#1A2A3A] text-[#8899AA] px-2 py-0.5 rounded text-[10px] font-mono">HASH: 8f4a2b99X</span>
                            </div>
                            <span className="text-xs text-[#556677] mt-1 block">Sep 01, 2026 - 10:14:22 UTC</span>
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl font-mono text-xs text-[#8899AA] space-y-1">
                            <div>device_uuid: "ios-app-17.2-a98f"</div>
                            <div>ip_address: "112.44.55.1"</div>
                            <div>action: "USER_INTERFACE_TOGGLE"</div>
                            <div>previous_state: "GRANTED"</div>
                            <div className="text-indigo-400">new_state: "REVOKED"</div>
                        </div>
                    </div>

                    {/* Log Event 2 */}
                    <div className="relative pl-6 border-l-2 border-[#1A2A3A]">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#0A1420]" />
                        <div className="mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-sm">Initial Consent Granted (Onboarding)</span>
                                <span className="bg-[#1A2A3A] text-[#8899AA] px-2 py-0.5 rounded text-[10px] font-mono">HASH: 3c9d1a88Z</span>
                            </div>
                            <span className="text-xs text-[#556677] mt-1 block">Mar 10, 2025 - 09:00:15 UTC</span>
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl font-mono text-xs text-[#8899AA] space-y-1">
                            <div>device_uuid: "web-chrome-mac-111"</div>
                            <div>ip_address: "192.168.1.45"</div>
                            <div>action: "ONBOARDING_ELECTRONIC_SIGNATURE"</div>
                            <div className="text-emerald-400">granted_scopes: ["core_hr", "biometric", "ai_copilot"]</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
