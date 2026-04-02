"use client";

import React, { useState } from 'react';
import { Webhook, Plus, Search, Copy, Eye, EyeOff, Trash2, ToggleLeft, ToggleRight, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function WebhookSettingsPage() {
    const [showSecret, setShowSecret] = useState<string | null>(null);

    const webhooks = [
        { id: 'WH-001', name: 'New Hire → Slack #onboarding', url: 'https://hooks.slack.com/services/T05...', event: 'employee.created', status: 'Active', lastTriggered: '12 mins ago', successRate: '100%' },
        { id: 'WH-002', name: 'Leave Approved → JIRA', url: 'https://api.atlassian.com/webhooks/...', event: 'leave.approved', status: 'Active', lastTriggered: '3 hrs ago', successRate: '98.5%' },
        { id: 'WH-003', name: 'Payroll Finalized → ERP Sync', url: 'https://erp.internal.kaarya.com/api/...', event: 'payroll.finalized', status: 'Failing', lastTriggered: '2 days ago', successRate: '72%' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Webhook size={28} className="text-indigo-400" /> Webhooks
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Configure outgoing HTTP callbacks for real-time event notifications to external systems.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Plus size={16} className="mr-2" /> Register Webhook
                </Button>
            </div>

            {/* Webhook List */}
            <div className="space-y-4">
                {webhooks.map((wh) => (
                    <div key={wh.id} className={`bg-[#0D1928] border rounded-2xl p-5 group hover:shadow-lg transition-all ${wh.status === 'Failing' ? 'border-red-500/30' : 'border-[#1A2A3A] hover:border-[#2A3A4A]'
                        }`}>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-white font-semibold text-sm">{wh.name}</h3>
                                    <span className="text-xs text-[#445566] font-mono bg-[#1A2A3A] px-2 py-0.5 rounded">{wh.id}</span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${wh.status === 'Active'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {wh.status === 'Active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                        {wh.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                                        <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Endpoint URL</div>
                                        <div className="text-sm text-white font-mono truncate flex items-center gap-2">
                                            {wh.url}
                                            <button className="text-[#8899AA] hover:text-white shrink-0"><Copy size={12} /></button>
                                        </div>
                                    </div>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                                        <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Event Trigger</div>
                                        <div className="text-sm text-indigo-400 font-mono">{wh.event}</div>
                                    </div>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                                        <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Signing Secret</div>
                                        <div className="text-sm text-white font-mono flex items-center gap-2">
                                            {showSecret === wh.id ? 'whsec_k4ry4_2f8a...x9z1' : '••••••••••••••'}
                                            <button onClick={() => setShowSecret(showSecret === wh.id ? null : wh.id)} className="text-[#8899AA] hover:text-white shrink-0">
                                                {showSecret === wh.id ? <EyeOff size={12} /> : <Eye size={12} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-2 shrink-0">
                                <div className="text-right mb-2 hidden md:block">
                                    <div className="text-xs text-[#8899AA]">Last Triggered</div>
                                    <div className="text-sm text-white font-medium">{wh.lastTriggered}</div>
                                </div>
                                <div className="text-right mb-2 hidden md:block">
                                    <div className="text-xs text-[#8899AA]">Success Rate</div>
                                    <div className={`text-sm font-bold ${parseFloat(wh.successRate) > 90 ? 'text-emerald-400' : 'text-red-400'}`}>{wh.successRate}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="Test Webhook">
                                        <RotateCcw size={14} />
                                    </button>
                                    <button className="p-2 bg-[#1A2A3A] hover:bg-red-500/20 border border-[#2A3A4A] hover:border-red-500/30 rounded-lg text-[#8899AA] hover:text-red-400 transition-colors" title="Delete">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {wh.status === 'Failing' && (
                            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 text-sm">
                                <XCircle size={16} className="text-red-400 shrink-0" />
                                <span className="text-red-300">Last 3 deliveries returned HTTP 503 (Service Unavailable). The endpoint may be down.</span>
                                <Button variant="secondary" className="border-red-500/30 text-red-400 text-xs h-auto py-1 px-3 ml-auto hover:bg-red-500/10">Retry Now</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
