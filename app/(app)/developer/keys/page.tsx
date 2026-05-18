"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { KeySquare, Plus, Copy, AlertTriangle, EyeOff, Eye, Trash2 } from 'lucide-react';

export default function ApiKeyManagementPage() {
    const [showKey, setShowKey] = useState<number | null>(null);

    return (
        <Page
            title="API Keys"
            subtitle="Manage standard API keys for server-to-server integrations."
            breadcrumbs={[{ label: "Developer", href: "/developer" }, { label: "Keys" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <KeySquare className="text-emerald-500" />
                        API Keys
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Manage standard API keys for server-to-server integrations.</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex gap-2 items-center shadow-lg shadow-emerald-500/20">
                    <Plus size={16} /> Generate New Key
                </button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3 items-start">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                    <h4 className="text-amber-500 font-bold text-sm">Security Warning</h4>
                    <p className="text-xs text-amber-500/80 mt-1">Never share your API keys or commit them to version control. They carry full administrative privileges for your selected environment.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm text-[#8899AA]">
                    <thead className="bg-[#060D1A] border-b border-[#1A2A3A] text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Environment</th>
                            <th className="px-6 py-4 font-medium">Token</th>
                            <th className="px-6 py-4 font-medium">Created On</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {[
                            { id: 1, name: 'Prod Setup Sync', env: 'Production', created: 'Oct 01, 2024' },
                            { id: 2, name: 'Staging Tests CI', env: 'Sandbox', created: 'Sep 15, 2024' }
                        ].map((key) => (
                            <tr key={key.id} className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{key.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${key.env === 'Production' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                        {key.env}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <code className="font-mono text-white bg-[#060D1A] border border-[#1A2A3A] px-2 py-1 rounded">
                                            {showKey === key.id ? 'sk_live_1A2b...9dEf' : '******************'}
                                        </code>
                                        <button onClick={() => setShowKey(showKey === key.id ? null : key.id)} className="text-[#556677] hover:text-[#CCDDEE]">
                                            {showKey === key.id ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                        <button className="text-[#556677] hover:text-[#00E5A0]"><Copy size={14} /></button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#556677]">{key.created}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[#556677] hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Key Scopes Demo */}
            <div className="mt-8 border-t border-[#1A2A3A] pt-6">
                <h3 className="text-sm font-bold text-white mb-4">Fine-Grained Permissions (Upcoming Feature)</h3>
                <p className="text-xs text-[#8899AA] mb-4">Soon, you'll be able to restrict API keys to specific endpoints mapped to OAuth 2.0 scopes.</p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded text-xs font-mono text-[#556677]">employees:read</span>
                    <span className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded text-xs font-mono text-[#556677]">payroll:write</span>
                    <span className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded text-xs font-mono text-[#556677]">time:read</span>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
