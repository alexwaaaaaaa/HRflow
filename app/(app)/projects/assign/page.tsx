"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { UserPlus, Search, Calendar, AlertCircle, Users } from 'lucide-react';

export default function ProjectAssignmentScreen() {
    return (
        <Page
            title="Team & Assignments"
            subtitle="Staff projects by searching resource availability, skills, and current bench status."
            breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Assign" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">Resource Planning</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus size={24} className="text-indigo-400" /> Team & Assignments</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Staff projects by searching resource availability, skills, and current bench status.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                    Auto-Suggest Match
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Col - Target Project Details */}
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">PRJ-809: Cloud Migration</h2>
                                <div className="text-[#8899AA] text-xs">Client: Acme Corp</div>
                            </div>
                            <span className="text-emerald-400 text-[10px] uppercase font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Active Phase 2</span>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-[#AABBCC]">Required Roles Filled</span>
                                    <span className="text-white">4 / 6</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-[#131B2B] overflow-hidden"><div className="bg-indigo-500 h-full w-[66%]"></div></div>
                            </div>

                            <div className="bg-[#131B2B] border border-rose-500/30 rounded-xl p-4">
                                <h3 className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <AlertCircle size={14} /> Open Requisitions
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between items-center text-white font-bold">
                                        Senior DevOps Eng <span className="text-[#8899AA] text-xs font-normal">100% Alloc</span>
                                    </li>
                                    <li className="flex justify-between items-center text-white font-bold">
                                        Cloud Security Spec <span className="text-[#8899AA] text-xs font-normal">50% Alloc</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 text-sm flex items-center gap-2">
                            <Users size={16} className="text-[#556677]" />
                            Current Team (4)
                        </h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Sarah Jenkins', role: 'Architect (Lead)', alloc: 80, b: true },
                                { name: 'David Palmer', role: 'Project Manager', alloc: 50, b: false },
                                { name: 'Maya Lin', role: 'Software Engineer', alloc: 100, b: true },
                                { name: 'John Doe', role: 'Contractor (QA)', alloc: 100, b: true },
                            ].map((t, i) => (
                                <div key={i} className="flex justify-between items-center text-sm p-2 hover:bg-[#131B2B] rounded-lg transition-colors cursor-pointer group">
                                    <div>
                                        <div className="text-white font-bold group-hover:text-indigo-400 transition-colors">{t.name}</div>
                                        <div className="text-[#556677] text-xs">{t.role}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-mono font-bold">{t.alloc}%</div>
                                        <div className={`text-[10px] uppercase font-bold ${t.b ? 'text-emerald-400' : 'text-[#8899AA]'}`}>{t.b ? 'Billable' : 'Internal'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col - Search & Assign */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg relative overflow-hidden h-full flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6">Find Resources</h2>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                                <input type="text" placeholder="Search by name or skill (e.g. AWS, Kubernetes)..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div className="relative">
                                <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-colors appearance-none">
                                    <option>Filter by Availability: Any</option>
                                    <option>Available &gt; 50% capacity</option>
                                    <option>On Bench (100% Available)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                            {/* Result 1 - Perfect match */}
                            <div className="bg-[#131B2B] border border-emerald-500/30 rounded-xl p-4 hover:border-emerald-500/60 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">MB</div>
                                        <div>
                                            <h4 className="text-white font-bold flex items-center gap-2">Marcus Bell <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase px-2 py-0.5 rounded border border-emerald-500/30">90% Match</span></h4>
                                            <p className="text-[#8899AA] text-xs">Senior DevOps Eng • London, UK</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-emerald-400 font-bold font-mono">100%</div>
                                        <div className="text-[#556677] text-[10px] uppercase font-bold tracking-wider">Available Capacity</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-[#0A1420] text-[#AABBCC] border border-[#2A3A4A] text-[10px] px-2 py-0.5 rounded font-mono">AWS</span>
                                    <span className="bg-[#0A1420] text-[#AABBCC] border border-[#2A3A4A] text-[10px] px-2 py-0.5 rounded font-mono">Terraform</span>
                                    <span className="bg-[#0A1420] text-[#AABBCC] border border-[#2A3A4A] text-[10px] px-2 py-0.5 rounded font-mono">Kubernetes</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#0A1420] p-3 rounded-lg border border-[#1A2A3A]">
                                    <div className="text-[#8899AA] text-xs flex items-center gap-2"><Calendar size={14} /> Avail starting: Imm.</div>
                                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow">Assign to PRJ-809</button>
                                </div>
                            </div>

                            {/* Result 2 - Partial match */}
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 hover:border-[#556677] transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] text-[#8899AA] flex items-center justify-center font-bold text-sm">ET</div>
                                        <div>
                                            <h4 className="text-white font-bold flex items-center gap-2">Elias Torres</h4>
                                            <p className="text-[#8899AA] text-xs">DevOps Engineer • Remote (EST)</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-amber-500 font-bold font-mono">40%</div>
                                        <div className="text-[#556677] text-[10px] uppercase font-bold tracking-wider">Available Capacity</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-[#0A1420] text-[#AABBCC] border border-[#2A3A4A] text-[10px] px-2 py-0.5 rounded font-mono">AWS</span>
                                    <span className="bg-[#0A1420] text-[#AABBCC] border border-[#2A3A4A] text-[10px] px-2 py-0.5 rounded font-mono">Docker</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#0A1420] p-3 rounded-lg border border-[#1A2A3A]">
                                    <div className="text-[#8899AA] text-xs flex items-center gap-2"><Calendar size={14} /> Warning: Under 50% requested capacity.</div>
                                    <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors border border-[#556677]">Assign Partial (40%)</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
