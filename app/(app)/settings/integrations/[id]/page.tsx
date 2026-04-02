"use client";
import React from 'react';
import { ShieldCheck, Database, RefreshCw, KeySquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function IntegrationDetailPage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-sm text-[#556677] mb-6">
                <Link href="/settings/integrations">Integrations</Link> /
                <span className="text-white">Slack</span>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 sticky top-6 z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-purple-500/20">
                            S
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-white">Slack</h1>
                                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Connected</span>
                            </div>
                            <p className="text-[#8899AA] mt-1">Communication & Workflows</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-black/20">
                            Pause Sync
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-6">
                    {/* Settings Panel */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#0D1928]">
                            <h3 className="text-white font-bold text-lg">Event Forwarding</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {[
                                { title: 'Leave Approvals', desc: 'Forward manager approval requests to DM.', active: true },
                                { title: 'Org Announcements', desc: 'Post company-wide memos to #general.', active: true },
                                { title: 'Onboarding Alerts', desc: 'Notify IT in #it-provisioning when a new hire is added.', active: true },
                                { title: 'Daily Attendance Digest', desc: 'Send summary of missing punches to managers.', active: false },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center p-5 hover:bg-[#131B2B] transition-colors">
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{s.title}</h4>
                                        <p className="text-xs text-[#8899AA] mt-1">{s.desc}</p>
                                    </div>
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={s.active} />
                                        <div className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 border border-[#2A3A4A] transition-colors"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                        <h3 className="text-base font-bold text-white mb-4">Command Mapping (Slash Commands)</h3>
                        <p className="text-[#8899AA] text-sm mb-4">Allow your employees to interact with Kaarya directly from Slack using slash commands.</p>

                        <div className="space-y-3 font-mono text-sm">
                            <div className="flex items-center gap-4 bg-[#060D1A] p-3 rounded-lg border border-[#1A2A3A]">
                                <span className="text-purple-400 w-32">/kaarya leave</span>
                                <span className="text-[#CCDDEE]">Check balances and apply for time off.</span>
                            </div>
                            <div className="flex items-center gap-4 bg-[#060D1A] p-3 rounded-lg border border-[#1A2A3A]">
                                <span className="text-purple-400 w-32">/kaarya peers</span>
                                <span className="text-[#CCDDEE]">Search for a colleague's contact info.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5">
                        <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-4">Connection Details</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-3">
                                <span className="text-[#8899AA] flex items-center gap-2"><KeySquare size={14} /> Client ID</span>
                                <span className="text-white font-mono">T9U8V7W...</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-3">
                                <span className="text-[#8899AA] flex items-center gap-2"><RefreshCw size={14} /> Last Sync</span>
                                <span className="text-emerald-400 text-xs">A few seconds ago</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#8899AA] flex items-center gap-2"><Database size={14} /> App Workspace</span>
                                <span className="text-white font-mono">kaarya-hq</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#0A1420] to-emerald-900/10 border border-emerald-500/20 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full" />
                        <ShieldCheck className="text-emerald-400 mb-3" size={24} />
                        <h4 className="text-white font-bold text-sm mb-1">OAuth Scopes Verified</h4>
                        <p className="text-xs text-[#8899AA]">This integration only has access to channels you explicitly invite it to. It cannot read your DMs.</p>
                    </div>

                    <div className="bg-[#0A1420] border border-rose-500/20 rounded-xl p-5">
                        <h4 className="text-rose-500 font-bold text-sm mb-2">Danger Zone</h4>
                        <p className="text-xs text-[#8899AA] mb-4">Uninstalling this app will revoke its tokens immediately.</p>
                        <button className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 px-4 py-2 rounded font-bold text-sm transition-colors">
                            Uninstall slack
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
