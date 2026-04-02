"use client";
import React from 'react';
import { Webhook, Plus, Power, Edit2, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WebhookConfigurationPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Webhook className="text-[#00E5A0]" />
                        Webhook Subscriptions
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Receive real-time HTTP POST payloads when state changes occur in Kaarya.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/developer/webhooks/logs" className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex gap-2 items-center">
                        Delivery Logs <ArrowRight size={14} />
                    </Link>
                    <button className="bg-[#00E5A0] hover:bg-emerald-400 text-[#060D1A] px-4 py-2 rounded-lg font-bold text-sm transition-colors flex gap-2 items-center">
                        <Plus size={16} /> Add Endpoint
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <button className="text-emerald-400 focus:outline-none" title="Enabled">
                            <Power size={20} />
                        </button>
                        <div>
                            <h3 className="text-base font-bold text-white">Main Ops Server</h3>
                            <code className="text-sm font-mono text-[#8899AA]">https://api.yourcorp.com/hr-webhook-inbox</code>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-[#556677] hover:text-[#CCDDEE] bg-[#060D1A] border border-[#1A2A3A] rounded"><Edit2 size={16} /></button>
                        <button className="p-2 text-[#556677] hover:text-rose-500 bg-[#060D1A] border border-[#1A2A3A] rounded"><Trash2 size={16} /></button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Subscribed Events</h4>
                        <div className="flex flex-wrap gap-2">
                            {['employee.created', 'employee.terminated', 'leave.approved'].map((ev) => (
                                <span key={ev} className="bg-[#131B2B] border border-[#2A3A4A] text-[#CCDDEE] font-mono text-xs px-2 py-1 rounded">
                                    {ev}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#1A2A3A]">
                        <div>
                            <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-1">Signing Secret</h4>
                            <code className="text-xs font-mono text-[#556677] bg-[#060D1A] px-2 py-1 rounded">whsec_***********************</code>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-1">Retry Policy</h4>
                            <span className="text-xs text-[#8899AA]">Standard (Up to 3x over 2 hours)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 opacity-60">
                <div className="flex justify-between items-center pb-2">
                    <div className="flex items-center gap-3">
                        <button className="text-[#556677] focus:outline-none" title="Disabled">
                            <Power size={20} />
                        </button>
                        <div>
                            <h3 className="text-base font-bold text-[#8899AA]">Payroll Staging Tests</h3>
                            <code className="text-sm font-mono text-[#556677]">https://staging.yourcorp.com/hooks</code>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
