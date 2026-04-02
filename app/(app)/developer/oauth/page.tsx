"use client";
import React from 'react';
import { Blocks, Key, Plus, Lock } from 'lucide-react';

export default function OauthAppRegistrationPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Blocks className="text-indigo-500" />
                        OAuth Applications
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Register apps to act on behalf of your users via standard OAuth 2.0 flows.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex gap-2 items-center">
                    <Plus size={16} /> Register App
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Existing App Card */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden hover:border-indigo-500/30 transition-colors">
                    <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928] flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                G
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Greenhouse ATS Sync</h3>
                                <p className="text-xs text-[#8899AA] mt-1">Sync candidates to employee roster.</p>
                            </div>
                        </div>
                        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">Active</span>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-[#556677] uppercase tracking-wider mb-1">Client ID</label>
                            <div className="flex items-center gap-2">
                                <code className="text-sm font-mono text-[#CCDDEE] bg-[#060D1A] px-2 py-1 rounded border border-[#1A2A3A] flex-1">
                                    client_49a8b7c6d5e4f3
                                </code>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#556677] uppercase tracking-wider mb-1">Client Secret</label>
                            <div className="flex items-center gap-2">
                                <code className="text-sm font-mono text-[#556677] bg-[#060D1A] px-2 py-1 rounded border border-[#1A2A3A] flex-1 flex items-center justify-between">
                                    ********-****-****-****-************
                                    <Lock size={12} className="text-[#8899AA]" />
                                </code>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#556677] uppercase tracking-wider mb-1">Redirect URIs</label>
                            <div className="bg-[#060D1A] p-2 rounded border border-[#1A2A3A]">
                                <code className="text-xs font-mono text-[#8899AA]">https://app.greenhouse.io/oauth/callback</code>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-[#1A2A3A] bg-[#0D1928] flex justify-end gap-2 text-sm">
                        <button className="text-[#8899AA] hover:text-white px-3 py-1.5 transition-colors">Revoke All Tokens</button>
                        <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-4 py-1.5 rounded transition-colors">Edit Settings</button>
                    </div>
                </div>

                {/* Blank State / Placeholder for second app */}
                <div className="bg-[#060D1A] border-2 border-dashed border-[#1A2A3A] rounded-xl flex flex-col items-center justify-center p-8 text-center hover:bg-[#0A1420] transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#556677] group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors mb-4">
                        <Plus size={24} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">Build a New Integration</h3>
                    <p className="text-sm text-[#556677] max-w-xs">Register your internal app or commercial product to connect securely via OAuth.</p>
                </div>
            </div>
        </div>
    );
}
