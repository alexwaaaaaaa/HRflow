"use client";
import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Fingerprint, Lock, ArrowRight, Server } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminLoginScreen() {
    const [authStep, setAuthStep] = useState<'credentials' | 'otp' | 'verify'>('credentials');

    return (
        <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/5 blur-[120px]" />
                <div className="absolute top-[40%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-rose-500/5 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
            </div>

            <div className="w-full max-w-md relative z-10">

                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-[#0A1420] rounded-2xl border border-[#1A2A3A] flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.2)] mb-4 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Server size={32} className="text-white relative z-10" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-widest uppercase flex items-center gap-2">
                        HRFlow <span className="text-indigo-500">Titan</span>
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-2 uppercase tracking-widest font-bold">Root Operations Interface</p>
                </div>

                {/* Login Form Container */}
                <div className="bg-[#0A1420]/80 backdrop-blur-xl border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                    {authStep === 'credentials' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-1">Authorization Required</h2>
                                <p className="text-xs text-[#556677]">Level 5 Super Admin Credentials.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-[#8899AA] tracking-wider ml-1">Admin Identity ID</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]">
                                            <Fingerprint size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter UID or Service Account"
                                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-[#3A4A5A]"
                                            defaultValue="sysadmin-root-01"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-[#8899AA] tracking-wider ml-1">Master Password</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••••••••••"
                                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-[#3A4A5A]"
                                            defaultValue="password123456"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setAuthStep('otp')}
                                className="w-full bg-white text-[#0A1420] font-bold rounded-xl py-3 mt-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                Authenticate <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {authStep === 'otp' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
                                    <KeyRound size={24} />
                                </div>
                                <h2 className="text-lg font-bold text-white mb-1">Hardware MFA Token</h2>
                                <p className="text-xs text-[#8899AA]">Insert YubiKey or enter 6-digit authenticator code.</p>
                            </div>

                            <div className="flex justify-center gap-2 my-6">
                                {[1, 2, 3, 4, 5, 6].map((idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        maxLength={1}
                                        className="w-10 h-12 bg-[#131B2B] border border-[#2A3A4A] rounded-lg text-center text-lg font-bold text-white focus:border-indigo-500 outline-none"
                                        placeholder="-"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setAuthStep('verify')}
                                className="w-full bg-indigo-600 text-white font-bold rounded-xl py-3 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                Verify Token
                            </button>
                            <button
                                onClick={() => setAuthStep('credentials')}
                                className="w-full bg-transparent text-[#556677] font-bold text-xs py-2 hover:text-white transition-colors"
                            >
                                ← Back to Login
                            </button>
                        </div>
                    )}

                    {authStep === 'verify' && (
                        <div className="space-y-6 py-6 text-center animate-fade-in flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full border-t-2 border-indigo-500 animate-spin mb-4" />
                            <h2 className="text-white font-bold">Establishing Root Session...</h2>
                            <p className="text-xs text-[#556677] font-mono">Verifying IP: 192.168.1.1 (Allowed)</p>

                            {/* Auto transition mockup */}
                            <Link href="/super-admin/dashboard" className="mt-4 text-xs font-bold text-indigo-400 hover:text-white underline">
                                [Dev] Force Entry
                            </Link>
                        </div>
                    )}
                </div>

                {/* Warning Footer */}
                <div className="mt-8 flex items-start gap-3 bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl">
                    <ShieldAlert size={20} className="text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-rose-400/80 leading-relaxed uppercase tracking-wider font-bold">
                        Restricted System. Unauthorized access is prohibited and logged. All activities are recorded immutably to the master audit ledger.
                    </p>
                </div>

            </div>
        </div>
    );
}
