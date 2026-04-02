"use client";
import React from 'react';
import { Target, Users, TrendingUp, Presentation, ArrowRight, Download, Filter } from 'lucide-react';
import Link from 'next/link';

export default function WorkforcePlanningScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Target size={24} className="text-blue-400" /> Strategic Workforce Planning</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Design organizational structure and align headcount with business goals.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filter Scenarios
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        New Operating Plan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Users, label: 'Current Headcount', value: '482', diff: '+12 this QTR', color: 'blue' },
                    { icon: Target, label: 'Approved Budget (FY26)', value: '550', diff: '68 open roles', color: 'emerald' },
                    { icon: TrendingUp, label: 'Capacity Utilization', value: '88%', diff: 'Optimal range', color: 'amber' },
                    { icon: Presentation, label: 'Cost per Hire', value: '₹42,000', diff: '-5% vs FY25', color: 'purple' },
                ].map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl bg-${kpi.color}-500/10 border border-${kpi.color}-500/20 text-${kpi.color}-400`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">{kpi.label}</div>
                                <div className="text-3xl font-black text-white mb-1">{kpi.value}</div>
                                <div className="text-[#556677] text-xs font-medium">{kpi.diff}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Active Operating Plans</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'FY26 Aggressive Growth', status: 'Approved', dept: 'Company-wide', target: '550 HC', cost: '₹24.5 Cr' },
                                { name: 'Q3 Product Expansion', status: 'Draft', dept: 'Engineering & Product', target: '120 HC', cost: '₹8.2 Cr' },
                                { name: 'Sales Restructuring', status: 'Under Review', dept: 'Sales', target: '45 HC', cost: '₹3.1 Cr' },
                            ].map((plan, i) => (
                                <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 hover:border-blue-500/50 transition-colors group cursor-pointer flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{plan.name}</h4>
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider 
                           ${plan.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' :
                                                    plan.status === 'Draft' ? 'bg-[#1A2A3A] text-[#8899AA]' :
                                                        'bg-amber-500/10 text-amber-400'}`}>
                                                {plan.status}
                                            </span>
                                        </div>
                                        <div className="text-[#556677] text-sm">Scope: {plan.dept}</div>
                                    </div>
                                    <div className="text-right flex items-center gap-6">
                                        <div className="hidden md:block">
                                            <div className="text-white font-bold">{plan.target}</div>
                                            <div className="text-[#556677] text-xs font-mono">{plan.cost}</div>
                                        </div>
                                        <ArrowRight size={20} className="text-[#556677] group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-2">Automated Insights</h3>
                        <p className="text-blue-200/80 text-sm mb-6 leading-relaxed">AI has analyzed your current attrition and hiring velocity against the FY26 Active Operating Plan.</p>

                        <div className="space-y-4">
                            <div className="bg-[#0A1420]/80 border border-blue-500/20 rounded-xl p-4">
                                <h4 className="text-white text-sm font-bold mb-1">Engineering Gap Risk</h4>
                                <p className="text-[#AABBCC] text-xs">Current hiring velocity (3 hires/mo) is insufficient to reach the Q3 target of 120 HC. Need to increase offer rate by 15%.</p>
                            </div>
                            <div className="bg-[#0A1420]/80 border border-blue-500/20 rounded-xl p-4">
                                <h4 className="text-white text-sm font-bold mb-1">Budget Optimization</h4>
                                <p className="text-[#AABBCC] text-xs">Shifting 5 open Sales roles to Tier 2 cities can save ₹42L annually while maintaining capacity targets.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Quick Links</h3>
                        <div className="space-y-3">
                            <Link href="/workforce-analytics/forecast" className="block text-[#AABBCC] hover:text-white text-sm font-medium transition-colors">↳ View Headcount Forecast</Link>
                            <Link href="/workforce-analytics/scenarios" className="block text-[#AABBCC] hover:text-white text-sm font-medium transition-colors">↳ Scenario Modeling</Link>
                            <Link href="/workforce-analytics/diversity" className="block text-[#AABBCC] hover:text-white text-sm font-medium transition-colors">↳ D&I Analytics</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
