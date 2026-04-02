"use client";
import React, { useState } from 'react';
import { ShieldAlert, User, LogIn, Lock, AlertTriangle, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function ImpersonationScreen({ params }: { params: { id: string } }) {
    const orgId = "ORG-A981";
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-rose-500/5 blur-[150px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
            </div>

            <div className="w-full max-w-lg relative z-10 space-y-6">

                <Link href={`/super-admin/organizations/${orgId}`} className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-flex mb-2">← Back to Details</Link>

                <div className="bg-[#0A1420]/80 backdrop-blur-xl border border-rose-500/30 shadow-[0_0_50px_rgba(225,29,72,0.1)] rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />

                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex items-center justify-center text-rose-500 mb-4 animate-pulse">
                            <ShieldAlert size={32} />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-widest uppercase">System Impersonation</h1>
                        <p className="text-[#8899AA] text-sm mt-2">You are about to securely access <span className="font-bold text-white">TechCorp India</span> as an administrator.</p>
                    </div>

                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 space-y-4 mb-8">
                        <div>
                            <label className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mb-2 block">Impersonation Target ID / Email</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]">
                                    <User size={16} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="e.g. admin@techcorp.hrflow.in"
                                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:border-rose-500 outline-none transition-colors"
                                    defaultValue="admin@techcorp.hrflow.in"
                                />
                            </div>
                        </div>

                        <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-lg flex items-start gap-3">
                            <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                            <div className="text-xs text-[#8899AA] leading-relaxed">
                                Any actions performed during this session will be logged immutably under your Root Identity (<span className="text-white font-mono">sysadmin-root-01</span>) as an impersonated action for strict auditability.
                            </div>
                        </div>
                    </div>

                    {!confirmed ? (
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 p-3 border border-rose-500/30 bg-rose-500/5 rounded-xl cursor-pointer hover:bg-rose-500/10 transition-colors hidden md:flex">
                                <input
                                    type="checkbox"
                                    className="mt-1"
                                    onChange={(e) => setConfirmed(e.target.checked)}
                                />
                                <span className="text-sm font-bold text-rose-300">I acknowledge the Compliance & Privacy policies regarding accessing tenant workspaces.</span>
                            </label>

                            <button
                                disabled={true}
                                className="w-full bg-[#1A2A3A] text-[#556677] font-bold rounded-xl py-3 cursor-not-allowed md:hidden flex items-center justify-center gap-2"
                            >
                                <Lock size={16} /> Ack required (Use Desktop)
                            </button>
                            <button
                                onClick={() => setConfirmed(true)} // Mocking checkbox for mobile/demo
                                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl py-3 transition-colors shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 md:hidden"
                            >
                                <Lock size={16} /> Force Acknowledge
                            </button>

                            <button
                                disabled={!confirmed}
                                className={`w-full font-bold rounded-xl py-3 transition-colors flex items-center justify-center gap-2 hidden md:flex ${confirmed ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-[#1A2A3A] text-[#556677] cursor-not-allowed'}`}
                            >
                                <KeyRound size={18} /> Generate Short-lived Token & Login
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-4 space-y-4">
                            <div className="w-10 h-10 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
                            <p className="text-sm font-bold text-rose-400">Vault issuing 15-minute SLA token...</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
