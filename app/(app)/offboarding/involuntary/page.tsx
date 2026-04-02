"use client";
import React, { useState } from 'react';
import { ShieldAlert, LogOut, Gavel, UserX, AlertTriangle, ChevronRight } from 'lucide-react';

export default function InvoluntaryExitScreen() {
    const [step, setStep] = useState(1);
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="mb-8 border-b border-[#1A2A3A] pb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ShieldAlert size={24} className="text-rose-500" /> Involuntary Exit Protocol</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Initiate sensitive terminations enforcing immediate system lockouts and legal compliance.</p>
                </div>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/30 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(244,63,94,0.05)]">
                <div className="absolute top-0 right-0 p-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#556677] flex items-center gap-1 border border-[#2A3A4A] px-2 py-1 rounded">
                        <LogOut size={12} /> HRBP Access Only
                    </span>
                </div>

                {step === 1 && (
                    <div className="animate-in fade-in">
                        <h2 className="text-xl font-bold text-white mb-6">Termination Details</h2>
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-[#8899AA] text-sm font-bold mb-2">Select Employee</label>
                                <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 outline-none focus:border-rose-500 transition-colors">
                                    <option>Search employees...</option>
                                    <option>Jared Dunn (Sales)</option>
                                    <option>Richard Hendricks (Engineering)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#8899AA] text-sm font-bold mb-3">Termination Category (Required for legal routing)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-[#131B2B] hover:bg-rose-500/10 border border-[#2A3A4A] hover:border-rose-500/50 rounded-xl p-3 cursor-pointer text-center group transition-colors">
                                        <UserX size={20} className="mx-auto mb-2 text-[#556677] group-hover:text-rose-400" />
                                        <span className="text-white text-sm font-bold block">Performance</span>
                                        <span className="text-[#556677] text-xs">PIP Failure</span>
                                    </div>
                                    <div className="bg-[#131B2B] hover:bg-rose-500/10 border border-[#2A3A4A] hover:border-rose-500/50 rounded-xl p-3 cursor-pointer text-center group transition-colors">
                                        <Gavel size={20} className="mx-auto mb-2 text-[#556677] group-hover:text-rose-400" />
                                        <span className="text-white text-sm font-bold block">Cause / Misconduct</span>
                                        <span className="text-[#556677] text-xs">Policy Violation</span>
                                    </div>
                                    <div className="bg-[#131B2B] hover:bg-rose-500/10 border border-[#2A3A4A] hover:border-rose-500/50 rounded-xl p-3 cursor-pointer text-center group transition-colors">
                                        <Briefcase size={20} className="mx-auto mb-2 text-[#556677] group-hover:text-rose-400" />
                                        <span className="text-white text-sm font-bold block">Reduction in Force</span>
                                        <span className="text-[#556677] text-xs">Layoff/Redundancy</span>
                                    </div>
                                    <div className="bg-[#131B2B] hover:bg-rose-500/10 border border-[#2A3A4A] hover:border-rose-500/50 rounded-xl p-3 cursor-pointer text-center group transition-colors">
                                        <AlertTriangle size={20} className="mx-auto mb-2 text-[#556677] group-hover:text-rose-400" />
                                        <span className="text-white text-sm font-bold block">Probation Failure</span>
                                        <span className="text-[#556677] text-xs">&lt; 90 days tenure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end">
                            <button onClick={() => setStep(2)} className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow flex items-center gap-2">
                                Next: Actions <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in">
                        <h2 className="text-xl font-bold text-white mb-6">Immediate System Actions</h2>
                        <p className="text-[#8899AA] text-sm mb-6 max-w-xl">Selecting these options will instantly trigger API calls to Okta, Google Workspace, and building security upon submission.</p>

                        <div className="space-y-4 max-w-2xl">
                            <div className="bg-[#131B2B] border border-rose-500/30 p-4 rounded-xl flex items-start gap-4 cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                                <input type="checkbox" className="mt-1 w-5 h-5 accent-rose-500" defaultChecked />
                                <div>
                                    <h4 className="text-rose-400 font-bold text-sm mb-1">Instant IT Lockout via IdP (Okta)</h4>
                                    <p className="text-[#8899AA] text-xs">Immediately suspends SSO access, Google Workspace email, and forces sign-out on all active sessions.</p>
                                </div>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl flex items-start gap-4 cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                                <input type="checkbox" className="mt-1 w-5 h-5 accent-rose-500" defaultChecked />
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Deactivate Physical Badge Access</h4>
                                    <p className="text-[#8899AA] text-xs">Revokes HID building access. Triggers alert to security desk to escort if required.</p>
                                </div>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl flex items-start gap-4 cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                                <input type="checkbox" className="mt-1 w-5 h-5 accent-rose-500" />
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Send Severance Agreement (DocuSign)</h4>
                                    <p className="text-[#8899AA] text-xs">Automatically dispatches the standard separation agreement to their personal email address.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-[#1A2A3A] flex justify-between items-center">
                            <button onClick={() => setStep(1)} className="text-[#8899AA] font-bold hover:text-white px-4 py-2 transition-colors">Go Back</button>
                            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(225,29,72,0.4)] uppercase tracking-wide">
                                Execute Termination
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Minimal Briefcase icon component since it wasn't imported in this scope
function Briefcase(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
}
