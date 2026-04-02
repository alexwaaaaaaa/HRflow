"use client";
import React, { useState } from 'react';
import { AlertOctagon, Megaphone, ShieldAlert, CheckSquare, MessageSquare, Plus, Clock } from 'lucide-react';

export default function EmergencyAlertScreen() {
    const [activeTab, setActiveTab] = useState('active');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">Company-Wide Comm</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><AlertOctagon size={24} className="text-rose-400" /> Emergency Alerts Hub</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Broadcast high-priority, unskippable notifications across all employee devices and channels.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(225,29,72,0.3)] flex items-center gap-2">
                        <Megaphone size={16} /> New Broadcast
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2 bg-gradient-to-r from-rose-500/10 to-[#0A1420] border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><ShieldAlert size={14} /> Active SEV-1 Alert</div>
                    <div className="text-2xl font-black text-white mb-2 leading-tight">London Office: Scheduled Power Outage & Network Downtime</div>
                    <div className="text-[#8899AA] text-sm mt-2 max-w-lg">All London-based employees must WFH tomorrow (Friday). Building access revoked from 6 AM to 8 PM local time.</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><CheckSquare size={14} /> Read Receipts</div>
                    <div className="text-4xl font-black text-emerald-400 mb-2">84%</div>
                    <div className="text-[#556677] text-xs font-bold">120 pending acknowledgments</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><MessageSquare size={14} /> SMS Delivery</div>
                    <div className="text-4xl font-black text-white mb-2">100%</div>
                    <div className="text-sky-400 text-xs font-bold flex items-center justify-center gap-1">Fallback triggered</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-6 shadow-xl">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex gap-4">
                    {['active', 'scheduled', 'history'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors ${activeTab === tab ? 'bg-[#131B2B] text-white border border-[#2A3A4A]' : 'text-[#556677] hover:text-[#8899AA]'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-0">
                    {activeTab === 'active' && (
                        <div className="animate-in fade-in divide-y divide-[#1A2A3A]">
                            <div className="p-6 hover:bg-[#131B2B]/50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                                            <AlertOctagon size={24} className="text-rose-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">London Office: Scheduled Power Outage & Network Downtime</h3>
                                            <div className="flex items-center gap-3 text-[#556677] text-xs font-bold">
                                                <span className="flex items-center gap-1"><Clock size={12} /> Broadcast 45 mins ago</span>
                                                <span>•</span>
                                                <span>Target: London HQ (450 Pax)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] text-white px-4 py-2 rounded-lg text-xs font-bold border border-[#2A3A4A] transition-colors">
                                        Revoke Alert
                                    </button>
                                </div>
                                <div className="ml-16 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4">
                                    <div className="flexitems-center justify-between mb-3 border-b border-[#2A3A4A] pb-3">
                                        <span className="text-xs text-[#8899AA] uppercase tracking-wider font-bold">Multi-Channel Delivery Status</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>
                                            <div className="text-white text-sm font-bold mb-1">App Push / Web</div>
                                            <div className="w-full h-1.5 bg-[#0A1420] rounded-full overflow-hidden mt-2"><div className="bg-emerald-500 h-full w-[84%]"></div></div>
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-bold mb-1">Email (Mandatory)</div>
                                            <div className="w-full h-1.5 bg-[#0A1420] rounded-full overflow-hidden mt-2"><div className="bg-emerald-500 h-full w-[98%]"></div></div>
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-bold mb-1">SMS Fallback</div>
                                            <div className="w-full h-1.5 bg-[#0A1420] rounded-full overflow-hidden mt-2"><div className="bg-emerald-500 h-full w-[100%]"></div></div>
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-bold mb-1">Slack Channel</div>
                                            <div className="w-full h-1.5 bg-[#0A1420] rounded-full overflow-hidden mt-2"><div className="bg-emerald-500 h-full w-[100%]"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="p-8 text-center animate-in fade-in">
                            <ShieldAlert size={48} className="mx-auto text-[#2A3A4A] mb-4" />
                            <h3 className="text-white font-bold mb-2">No Historical SEV-1 Alerts</h3>
                            <p className="text-[#8899AA] text-sm">Resolved or expired alerts will appear in this archive.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
