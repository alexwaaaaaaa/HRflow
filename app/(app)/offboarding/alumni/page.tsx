"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { ExternalLink, Users, Briefcase, Mail, Send } from 'lucide-react';

export default function AlumniPortalScreen() {
    return (
        <Page
            title="Alumni Hub Administration"
            subtitle="Maintain relationships with former employees, tap into boomerang talent, and manage access to post-employment documents."
            breadcrumbs={[{ label: "Offboarding", href: "/offboarding" }, { label: "Alumni" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">Corporate Network</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ExternalLink size={24} className="text-purple-400" /> Alumni Hub Administration</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Maintain relationships with former employees, tap into boomerang talent, and manage access to post-employment documents.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Users size={14} /> Registered Alumni</div>
                    <div className="text-3xl font-black text-white mb-2">842</div>
                    <div className="text-emerald-400 text-xs font-bold">12 Active this week</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Briefcase size={14} /> Boomerang Hires YTD</div>
                    <div className="text-3xl font-black text-purple-400 mb-2">14</div>
                    <div className="text-[#556677] text-xs font-bold">Saved $210k in recruiting costs</div>
                </div>

                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden text-center flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light">
                    <h3 className="text-white text-sm font-bold mb-3">Broadcast to Network</h3>
                    <div className="flex gap-2 w-full max-w-md mx-auto">
                        <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Mail size={16} /> Newsletter
                        </button>
                        <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Briefcase size={16} /> Push Referrals
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <h3 className="text-white font-bold">Recent Exits & Invites</h3>
                        <button className="text-xs bg-[#131B2B] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-white font-bold hover:bg-[#1A2A3A] transition-colors">Bulk Invite</button>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {[
                            { name: 'Sarah Jenkins', role: 'Engineering Manager', lwd: 'Oct 24, 2025', status: 'Pending Invite' },
                            { name: 'Michael Chang', role: 'Account Executive', lwd: 'Oct 15, 2025', status: 'Active' },
                            { name: 'David Torres', role: 'Operations Assoc', lwd: 'Oct 10, 2025', status: 'Active' },
                        ].map((row, i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-[#131B2B]/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-[#AABBCC] font-bold">
                                        {row.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm mb-0.5">{row.name}</div>
                                        <div className="text-[#556677] text-xs">Ex-{row.role} • LWD: {row.lwd}</div>
                                    </div>
                                </div>
                                <div>
                                    {row.status === 'Active' ? (
                                        <span className="text-emerald-400 text-[10px] uppercase font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Joined</span>
                                    ) : (
                                        <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1">
                                            <Send size={12} /> Send Invite Link
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Self-Service Activity (Alumni Facing)</h3>
                        <div className="space-y-3">
                            <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A] flex justify-between items-center">
                                <div className="text-white text-sm font-bold">Tax Documents Downloaded</div>
                                <div className="text-[#8899AA] font-mono text-xs">142 this mo</div>
                            </div>
                            <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A] flex justify-between items-center">
                                <div className="text-white text-sm font-bold">Experience Letter Views</div>
                                <div className="text-[#8899AA] font-mono text-xs">28 this mo</div>
                            </div>
                            <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A] flex justify-between items-center">
                                <div className="text-white text-sm font-bold">Referrals Submitted</div>
                                <div className="text-[#8899AA] font-mono text-xs">5 this mo</div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#1A2A3A] text-center">
                            <p className="text-[#556677] text-xs leading-relaxed max-w-sm mx-auto">The self-service portal reduces HR ticketing overhead by granting alumni secure access to statutory forms indefinitely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
