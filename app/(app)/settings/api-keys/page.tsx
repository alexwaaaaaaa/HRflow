"use client";

import React, { useState } from 'react';
import { Key, Plus, Copy, Eye, EyeOff, Trash2, ShieldCheck, Clock, MoreVertical, AlertTriangle, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function APIKeysPage() {
    const [visibleKey, setVisibleKey] = useState<string | null>(null);

    const keys = [
        { id: 'ak_live_01', name: 'Production — Payroll Sync', prefix: 'kry_live_', lastUsed: '3 mins ago', created: 'Oct 12, 2023', scopes: ['payroll:read', 'payroll:write', 'employee:read'], status: 'Active', calls: '45.2k' },
        { id: 'ak_live_02', name: 'Production — ATS Integration', prefix: 'kry_live_', lastUsed: '1 hr ago', created: 'Nov 5, 2023', scopes: ['recruitment:read', 'recruitment:write'], status: 'Active', calls: '12.8k' },
        { id: 'ak_test_01', name: 'Staging — Dev Testing', prefix: 'kry_test_', lastUsed: '2 days ago', created: 'Jan 18, 2024', scopes: ['*:read'], status: 'Active', calls: '3.1k' },
        { id: 'ak_live_03', name: 'Legacy — Old ERP Connector', prefix: 'kry_live_', lastUsed: 'Never', created: 'Mar 22, 2023', scopes: ['employee:read'], status: 'Revoked', calls: '0' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Key size={28} className="text-indigo-400" /> API Keys & Tokens
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Manage programmatic access to the Kaarya API. Keys should be stored securely and rotated regularly.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Plus size={16} className="mr-2" /> Generate New Key
                </Button>
            </div>

            {/* Security Advisory */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8 flex items-center gap-3">
                <AlertTriangle size={18} className="text-amber-400 shrink-0" />
                <p className="text-sm text-amber-200/80">
                    <strong className="text-amber-400">Security Reminder:</strong> API keys grant programmatic access to your Kaarya tenant. Never commit keys to version control. Rotate keys every 90 days.
                </p>
            </div>

            {/* Keys List */}
            <div className="space-y-4">
                {keys.map((key) => (
                    <div key={key.id} className={`bg-[#0D1928] border rounded-2xl p-5 group hover:shadow-lg transition-all ${key.status === 'Revoked' ? 'border-[#1A2A3A] opacity-50' : 'border-[#1A2A3A] hover:border-[#2A3A4A]'
                        }`}>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-white font-semibold text-sm">{key.name}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${key.status === 'Active'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {key.status}
                                    </span>
                                    {key.prefix.includes('test') && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">Test</span>
                                    )}
                                </div>

                                {/* Key Display */}
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 flex items-center gap-3 mb-4 font-mono text-sm">
                                    <ShieldCheck size={16} className="text-[#445566] shrink-0" />
                                    <span className="text-white flex-1 truncate">
                                        {visibleKey === key.id
                                            ? `${key.prefix}a8f2d1e4b5c6...9x7z`
                                            : `${key.prefix}••••••••••••`
                                        }
                                    </span>
                                    <div className="flex gap-2 shrink-0">
                                        <button onClick={() => setVisibleKey(visibleKey === key.id ? null : key.id)} className="text-[#8899AA] hover:text-white transition-colors">
                                            {visibleKey === key.id ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                        <button className="text-[#8899AA] hover:text-white transition-colors">
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Scopes */}
                                <div className="flex flex-wrap gap-2">
                                    {key.scopes.map((scope, i) => (
                                        <span key={i} className="bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A] px-2 py-0.5 rounded text-[10px] font-mono">
                                            {scope}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-4 items-end shrink-0 text-right">
                                <div>
                                    <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold">Created</div>
                                    <div className="text-xs text-white">{key.created}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold">Last Used</div>
                                    <div className="text-xs text-white">{key.lastUsed}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold">Total Calls</div>
                                    <div className="text-xs text-indigo-400 font-bold">{key.calls}</div>
                                </div>
                                <div className="flex gap-2 mt-auto">
                                    <button className="p-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="Rotate Key">
                                        <RotateCcw size={14} />
                                    </button>
                                    <button className="p-2 bg-[#1A2A3A] hover:bg-red-500/20 border border-[#2A3A4A] hover:border-red-500/30 rounded-lg text-[#8899AA] hover:text-red-400 transition-colors" title="Revoke">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
