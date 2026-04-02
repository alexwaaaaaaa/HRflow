"use client";

import React from 'react';
import { Flag, Search, ToggleLeft, ToggleRight, Save, AlertTriangle, Users } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FeatureFlagsPage() {
    const flags = [
        { key: 'ai_copilot_v2', label: 'AI Copilot V2 (Beta)', description: 'Next-gen HR copilot with multi-turn reasoning and action chaining.', enabled: false, rollout: '0%', scope: 'Global' },
        { key: 'dark_mode_payslip', label: 'Dark Mode Payslips', description: 'Generate payslips with dark theme styling for the employee portal.', enabled: true, rollout: '100%', scope: 'Global' },
        { key: 'experimental_ats', label: 'Experimental ATS Pipeline', description: 'New kanban-based candidate pipeline with AI resume scoring.', enabled: true, rollout: '25%', scope: 'Internal Only' },
        { key: 'whatsapp_bot', label: 'WhatsApp Chatbot (Pilot)', description: 'Enable conversational HR queries via WhatsApp Business API.', enabled: true, rollout: '10%', scope: 'Pilot Tenants' },
        { key: 'perf_360_review', label: '360° Performance Reviews', description: 'Enable peer, subordinate, and cross-functional feedback in reviews.', enabled: false, rollout: '0%', scope: 'Global' },
        { key: 'geo_attendance', label: 'Geo-Fenced Attendance', description: 'GPS-based attendance with configurable geofence radius per location.', enabled: true, rollout: '100%', scope: 'Global' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Flag size={28} className="text-indigo-400" /> Feature Flags
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">Control feature rollouts with granular toggle and percentage-based deployment.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6"><Save size={16} className="mr-2" /> Save All</Button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8 flex items-center gap-3">
                <AlertTriangle size={18} className="text-amber-400 shrink-0" />
                <p className="text-sm text-amber-200/80"><strong className="text-amber-400">Caution:</strong> Toggling feature flags affects all users in real-time. Changes propagate within 60 seconds via edge config.</p>
            </div>

            <div className="space-y-4">
                {flags.map((flag) => (
                    <div key={flag.key} className={`bg-[#0D1928] border rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${flag.enabled ? 'border-[#1A2A3A] hover:border-[#2A3A4A]' : 'border-[#1A2A3A] opacity-60 hover:opacity-100'
                        }`}>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-white font-semibold text-sm">{flag.label}</h3>
                                <span className="text-[10px] text-[#445566] font-mono bg-[#1A2A3A] px-2 py-0.5 rounded">{flag.key}</span>
                            </div>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-2">{flag.description}</p>
                            <div className="flex items-center gap-4 text-[10px] text-[#445566]">
                                <span className="flex items-center gap-1"><Users size={10} /> Rollout: {flag.rollout}</span>
                                <span>Scope: {flag.scope}</span>
                            </div>
                        </div>
                        <button className="shrink-0 transition-transform hover:scale-110">
                            {flag.enabled
                                ? <ToggleRight size={32} className="text-indigo-400" />
                                : <ToggleLeft size={32} className="text-[#2A3A4A]" />
                            }
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
