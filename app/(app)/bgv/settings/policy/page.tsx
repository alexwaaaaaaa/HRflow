"use client";

import React, { useState } from 'react';
import {
    Settings, Shield, Briefcase, Plus, Save, Trash2, Edit2,
    CheckCircle2, AlertTriangle, Building2, Globe
} from 'lucide-react';

const POLICIES = [
    {
        id: 'POL-01',
        name: 'Standard Employee Policy',
        roles: 'All Except Leadership/Finance',
        vendor: 'FirstAdvantage',
        package: 'Standard Package',
        checks: ['ID', 'Address (Current)', 'Education (Highest)'],
        active: true
    },
    {
        id: 'POL-02',
        name: 'Leadership Policy',
        roles: 'Director, VP, CXO',
        vendor: 'FirstAdvantage',
        package: 'Executive Package',
        checks: ['ID', 'Address (Current, Perm)', 'Education', 'Employment (Last 3)', 'Criminal', 'Directorship'],
        active: true
    },
    {
        id: 'POL-03',
        name: 'Finance / Infosec Policy',
        roles: 'Finance, Security, IT Admins',
        vendor: 'Checkr',
        package: 'Comprehensive',
        checks: ['ID', 'Address', 'Education', 'Employment', 'Criminal', 'Credit Check'],
        active: false
    }
];

export default function BGVPolicySetupScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <Settings className="text-[#00E5A0]" size={28} />
                            BGV Policy Setup
                        </h1>
                        <p className="text-sm text-[#8899AA]">Define rules for automated background verification based on roles and departments.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center gap-2">
                        <Plus size={16} /> Create Policy
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Policy List */}
                    <div className="md:col-span-2 space-y-4">
                        {POLICIES.map(pol => (
                            <div key={pol.id} className={`bg-[#0A1420] border rounded-xl p-5 transition-all ${pol.active ? 'border-[#1A2A3A] hover:border-[#2A3A4A] shadow-md' : 'border-[#1A2A3A]/50 opacity-60'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${pol.active ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#1A2A3A] text-[#556677]'}`}>
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                                {pol.name}
                                                {pol.active && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00E5A0]/10 text-[#00E5A0] uppercase border border-[#00E5A0]/20">Active</span>}
                                            </h3>
                                            <p className="text-xs text-[#8899AA] flex items-center gap-1 mt-0.5"><Briefcase size={12} /> Applies to: <span className="text-white font-medium">{pol.roles}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 text-[#556677] hover:bg-[#1A2A3A] hover:text-white rounded transition-colors"><Edit2 size={16} /></button>
                                        <button className="p-1.5 text-[#556677] hover:bg-rose-500/10 hover:text-rose-500 rounded transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-3 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[10px] text-[#556677] uppercase font-bold mb-1 tracking-wider">Default Vendor & Package</div>
                                        <div className="text-sm font-semibold text-white">{pol.vendor} ({pol.package})</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#556677] uppercase font-bold mb-1 tracking-wider">Required Checks</div>
                                        <div className="flex flex-wrap gap-1">
                                            {pol.checks.map(c => (
                                                <span key={c} className="text-[10px] px-1.5 py-0.5 bg-[#1A2A3A] text-slate-300 rounded border border-[#2A3A4A]">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Settings / Global configs */}
                    <div className="space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg overflow-hidden">
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#0D1928]">
                                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Global Settings</h3>
                            </div>
                            <div className="p-5 space-y-5">
                                <ToggleSetting
                                    label="Auto-Initiate on Offer Acceptance"
                                    desc="Automatically trigger BGV based on role policy when offer is marked accepted."
                                    active={true}
                                />
                                <ToggleSetting
                                    label="Require BGV Clearance for Onboarding"
                                    desc="Block joining date generation until BGV is marked as Clear or Conditionally Clear."
                                    active={true}
                                />
                                <ToggleSetting
                                    label="Notify Candidate on Initiation"
                                    desc="Send standard welcome email from HR platform before vendor reaches out."
                                    active={false}
                                />
                            </div>
                        </div>

                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex gap-3 text-amber-500 text-sm">
                            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold inline-block mb-1">Configuration Warning</span>
                                <p className="text-amber-500/80 leading-relaxed text-xs">
                                    "Finance / Infosec Policy" is currently inactive. System will fall back to "Standard Employee Policy" for those roles until overridden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ToggleSetting({ label, desc, active }: any) {
    const [on, setOn] = useState(active);
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{label}</h4>
                <p className="text-[11px] text-[#556677] leading-tight">{desc}</p>
            </div>
            <button
                onClick={() => setOn(!on)}
                className={`w-10 h-5 rounded-full transition-colors relative shrink-0 mt-1 ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
        </div>
    );
}
