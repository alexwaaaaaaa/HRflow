"use client";
import React from 'react';
import { Map, AlertCircle, CalendarClock, Target, Compass } from 'lucide-react';
import Link from 'next/link';

export default function PlatformRoadmapScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Product Roadmap & R&D</h1>
                    <p className="text-[#8899AA] text-sm">Strategic visibility into upcoming engineering cycles, beta programs, and sun-setting modules.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                {/* Now */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><Target size={16} className="text-emerald-400" /> Q4 2026 (Now)</h2>

                    <div className="bg-[#0A1420] border border-emerald-500/30 rounded-2xl p-5 relative group hover:border-emerald-500/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-white font-bold text-lg">AI Resume Parsing</h3>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">GA Rollout</span>
                        </div>
                        <p className="text-xs text-[#8899AA] mb-4">Rolling out to 100% of tenants on Growth and Enterprise tiers.</p>
                        <div className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
                        </div>
                        <div className="text-[10px] text-emerald-400 font-bold mt-2 text-right">85% Deployed</div>
                    </div>

                    <div className="bg-[#0A1420] border border-emerald-500/30 rounded-2xl p-5 relative group hover:border-emerald-500/50 transition-colors opacity-80">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-white font-bold text-lg">Earned Wage Access (EWA)</h3>
                            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Beta</span>
                        </div>
                        <p className="text-xs text-[#8899AA]">Beta integrations with YesBank and ICICI live. Testing disbursement concurrency.</p>
                    </div>
                </div>

                {/* Next */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><Compass size={16} className="text-indigo-400" /> Q1 2027 (Next)</h2>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors rounded-2xl p-5">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-white font-bold text-lg">Global Payroll Expansion</h3>
                        </div>
                        <p className="text-xs text-[#8899AA]">Adding statutory logic compliance for UAE (WPS) and Singapore (CPF).</p>
                    </div>

                    <div className="bg-[#0A1420] border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3"><AlertCircle size={24} className="text-amber-500/20" /></div>
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-white font-bold text-lg text-amber-400">Sun-setting V1 API</h3>
                        </div>
                        <p className="text-xs text-[#8899AA]">Deprecation of legacy REST endpoints. Forcing migration to GraphQL V2 layer.</p>
                    </div>
                </div>

                {/* Later */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><CalendarClock size={16} className="text-[#556677]" /> 2027+ (Beyond)</h2>

                    <div className="bg-[#131B2B] border border-[#2A3A4A] border-dashed rounded-2xl p-5 text-center flex flex-col items-center justify-center opacity-70 min-h-[150px]">
                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center mb-3">
                            <Map size={18} className="text-[#556677]" />
                        </div>
                        <div className="text-sm font-bold text-white mb-1">Corporate Cards Integration</div>
                        <div className="text-xs text-[#556677]">Native spending ledgers</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
