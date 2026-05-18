"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Video, Calendar as CalendarIcon, Clock, Users, FileSignature, Settings, Shield, Plus, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function GrievanceHearingScreen({ params: _params }: { params: { id: string } }) {
    const defaultId = "GRV-2026-142";
    const [isLive, setIsLive] = useState(false);

    return (
        <Page
            title="Committee Hearings"
            subtitle="As per Section 11 of the POSH Act, during the inquiry, a minimum of three Members of the Internal Committee including the Presiding Officer shall be present."
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Id" }, { label: "Hearing" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4">
                <div>
                    <Link href={`/grievances/${defaultId}/investigation`} className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Investigation</Link>
                    <h1 className="text-2xl font-bold text-white">Committee Hearings</h1>
                </div>
                {!isLive && (
                    <button onClick={() => setIsLive(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20">
                        <Video size={16} /> Start Virtual Hearing
                    </button>
                )}
            </div>

            {!isLive ? (
                // Scheduling View
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                            <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060D1A]">
                                <h2 className="text-lg font-bold text-white">Scheduled Sessions</h2>
                                <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300 flex items-center gap-1">
                                    <Plus size={16} /> New Session
                                </button>
                            </div>
                            <div className="p-6 space-y-4">

                                {/* Session Card */}
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 hover:border-[#3A4A5A] transition-colors relative">
                                    <div className="absolute top-5 right-5 text-emerald-400 text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                                        Upcoming Today
                                    </div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/30 text-indigo-400">
                                            <Video size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Initial Statement: Complainant</h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-[#8899AA]">
                                                <span className="flex items-center gap-1.5"><CalendarIcon size={14} /> Oct 25, 2026</span>
                                                <span className="flex items-center gap-1.5"><Clock size={14} /> 11:00 AM - 11:30 AM IST</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-[#556677] uppercase tracking-wider font-bold">Attendees:</span>
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/50 z-30">MV</div>
                                                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-bold border border-sky-500/50 z-20">SD</div>
                                                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold border border-rose-500/50 z-10">CX</div>
                                            </div>
                                        </div>
                                        <button onClick={() => setIsLive(true)} className="bg-white text-[#0A1420] px-4 py-1.5 rounded text-sm font-bold hover:bg-gray-200 transition-colors">
                                            Join Room
                                        </button>
                                    </div>
                                </div>

                                {/* Past Session Card */}
                                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 relative opacity-70">
                                    <div className="absolute top-5 right-5 text-[#556677] text-xs font-bold border border-[#2A3A4A] bg-[#131B2B] px-2 py-0.5 rounded uppercase tracking-wider">
                                        Completed
                                    </div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A] text-[#556677]">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg line-through decoration-[#556677]">Preliminary Committee Meet</h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-[#8899AA]">
                                                <span className="flex items-center gap-1.5"><CalendarIcon size={14} /> Oct 24, 2026</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                            <h3 className="flex items-center gap-2 text-indigo-400 font-bold mb-3"><Shield size={18} /> Compliance Notice</h3>
                            <p className="text-sm text-[#8899AA] leading-relaxed mb-4">
                                As per Section 11 of the POSH Act, during the inquiry, a minimum of three Members of the Internal Committee including the Presiding Officer shall be present.
                            </p>
                            <div className="bg-[#0A1420] border border-[#1A2A3A] p-3 rounded-lg text-xs font-bold text-white flex justify-between items-center">
                                Quorum Check: <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={12} /> Met (3/3)</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Active Call View (Live Hearing Mockup)
                <div className="h-[calc(100vh-140px)] flex gap-4 animate-fade-in">

                    {/* Video Grid */}
                    <div className="flex-1 bg-black rounded-2xl border border-[#2A3A4A] overflow-hidden flex flex-col relative">
                        {/* Status Bar */}
                        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-rose-500/20 text-rose-400 px-3 py-1 rounded border border-rose-500/30 text-xs font-bold animate-pulse">
                                    <div className="w-2 h-2 rounded-full bg-rose-500" /> SECURE REC
                                </div>
                                <span className="text-white text-sm font-medium">Session: Initial Statement - Complainant</span>
                            </div>
                            <div className="text-white font-mono text-sm tracking-wider">04:21</div>
                        </div>

                        {/* Video Grid */}
                        <div className="flex-1 grid grid-cols-2 gap-1 p-1 mt-16 pb-20">
                            <div className="bg-[#131B2B] rounded-xl relative overflow-hidden flex items-center justify-center border border-[#2A3A4A]">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold border border-emerald-500/30">MV</div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium border border-white/10">Meera Venkatesh (PO)</div>
                            </div>
                            <div className="bg-[#131B2B] rounded-xl relative overflow-hidden flex items-center justify-center border border-[#2A3A4A]">
                                <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-bold border border-rose-500/30">CX</div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium border border-white/10">Complainant</div>
                            </div>
                            <div className="bg-[#131B2B] rounded-xl relative overflow-hidden flex items-center justify-center border border-[#2A3A4A] col-span-2">
                                <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xl font-bold border border-sky-500/30">SD</div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium border border-white/10">Sanjay Dutt (Legal)</div>
                            </div>
                        </div>

                        {/* Call Controls */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#131B2B]/90 backdrop-blur-xl border border-[#2A3A4A] p-2 rounded-2xl flex items-center gap-3">
                            <button className="w-12 h-12 rounded-xl bg-[#2A3A4A] hover:bg-[#3A4A5A] text-white flex items-center justify-center transition-colors">
                                <Video size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-xl bg-[#2A3A4A] hover:bg-[#3A4A5A] text-white flex items-center justify-center transition-colors">
                                <Settings size={20} />
                            </button>
                            <button onClick={() => setIsLive(false)} className="w-16 h-12 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center font-bold text-sm transition-colors shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                                End
                            </button>
                        </div>
                    </div>

                    {/* Official Transcript / Notes (Right Sidebar) */}
                    <div className="w-[400px] bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center gap-2">
                            <FileSignature size={18} className="text-indigo-400" />
                            <h3 className="font-bold text-white text-sm">Official Minutes</h3>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <textarea
                                className="w-full h-full bg-transparent text-white text-sm leading-relaxed resize-none outline-none placeholder-[#556677]"
                                placeholder="Type the minutes of the hearing here. These will be logged as the official verbatim statement. Copilot AI transcription is unavailable for POSH cases to ensure total data privacy."
                            />
                        </div>
                        <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A]">
                            <button className="w-full bg-[#131B2B] border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white py-2 rounded-lg text-sm font-bold transition-colors">
                                Save Statement Draft
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    
        </Page>
    );
}
