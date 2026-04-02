"use client";

import React, { useState } from 'react';
import { Sparkles, Map, ArrowRight, Target, CheckCircle2, ChevronRight, BookOpen, Award, Briefcase, User as UserIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CareerPathAIPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Map size={28} className="text-purple-400" /> Career Path AI
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Dynamic skill-gap analysis and vertical/lateral movement forecasting. Connects current employee competencies to future organizational needs.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        Organization Skill Matrix
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-500 text-white border-none py-2 px-6">
                        <UserIcon size={16} className="mr-2" /> Employee Search
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">

                {/* Employee Context Sidebar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl flex flex-col gap-6 h-full overflow-y-auto">

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-xl font-bold text-white shrink-0">
                            SR
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Sneha Rao</h2>
                            <div className="text-sm text-[#8899AA]">Product Designer (L3)</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-2 font-semibold flex justify-between">
                                Verified Skills <span className="text-purple-400">14</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs px-2.5 py-1 rounded">Figma</span>
                                <span className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs px-2.5 py-1 rounded">UI Prototyping</span>
                                <span className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs px-2.5 py-1 rounded">Usability Testing</span>
                                <span className="bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-xs px-2.5 py-1 rounded">+ 11 more</span>
                            </div>
                        </div>

                        <div className="bg-[#131B2B] p-4 rounded-xl border border-purple-500/30">
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Promotion Readiness</div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-2xl font-bold text-white">72%</span>
                                <span className="text-xs text-purple-400 mb-1">To L4 (Senior)</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="bg-purple-500 w-[72%] h-full rounded-full" />
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-2 font-semibold">Key Trajectory Gaps</div>
                            <ul className="space-y-2 text-xs text-[#8899AA]">
                                <li className="flex items-start gap-2">
                                    <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                    <span>Lacks formal mentorship experience (Required for L4)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    <span>Strategic roadmap planning undefined in recent reviews</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* AI Path Visualizer */}
                <div className="lg:col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />

                    <div className="p-6 border-b border-[#1A2A3A] bg-[#0A1420] relative z-10 shrink-0 flex justify-between items-center">
                        <div>
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                <Sparkles size={18} className="text-purple-400" /> Career Trajectory Models
                            </h3>
                            <p className="text-xs text-[#8899AA] mt-1">AI-generated paths based on org structure and historical promotion data</p>
                        </div>
                        <div className="flex bg-[#1A2A3A] rounded-lg p-1">
                            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#2A3A4A] text-white shadow">
                                Vertical (Management)
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#8899AA] hover:text-white transition-colors">
                                Lateral (IC / Pivot)
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto relative z-10 space-y-12">

                        {/* Current State */}
                        <div className="flex items-center gap-6 relative">
                            {/* Connection Line */}
                            <div className="absolute left-[80px] top-[72px] w-0.5 h-16 bg-[#2A3A4A]" />
                            <div className="absolute left-[80px] top-[140px] w-0.5 h-16 bg-gradient-to-b from-[#2A3A4A] to-purple-500/50" />

                            <div className="w-[160px] bg-[#1A2A3A] border-2 border-purple-500/30 text-center p-3 rounded-xl shrink-0 z-10 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Current Role</div>
                                <div className="text-sm font-bold text-white mb-0.5">Product Designer</div>
                                <div className="text-xs text-[#8899AA]">Level 3</div>
                            </div>

                            <div className="flex-1"></div>
                        </div>

                        {/* Path Option 1: Manager */}
                        <div className="flex items-start gap-6 relative">
                            {/* Connection Line */}
                            <div className="absolute left-[80px] top-[72px] w-0.5 h-12 bg-[#2A3A4A] border-dashed border-l border-[#445566]" />

                            <div className="w-[160px] bg-[#131B2B] border border-purple-500 text-center p-3 rounded-xl shrink-0 z-10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-shadow cursor-pointer">
                                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Primary Path</div>
                                <div className="text-sm font-bold text-white mb-0.5">Design Manager</div>
                                <div className="text-xs text-[#8899AA] mb-2">Level 4</div>
                                <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded">Target: 18 months</span>
                            </div>

                            <div className="flex-1 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-5">
                                <h4 className="text-white text-sm font-medium mb-3">AI Intervention Plan to get to Design Manager</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-[#0A1420] border border-[#2A3A4A] p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award size={14} className="text-amber-500" />
                                            <span className="text-xs font-semibold text-white">L&D Requirement</span>
                                        </div>
                                        <p className="text-[10px] text-[#8899AA]">Enroll in "Leadership for Creatives" internal workshop (Q3 Schedule).</p>
                                    </div>
                                    <div className="bg-[#0A1420] border border-[#2A3A4A] p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BookOpen size={14} className="text-blue-400" />
                                            <span className="text-xs font-semibold text-white">Project Assignment</span>
                                        </div>
                                        <p className="text-[10px] text-[#8899AA]">Assign as lead coordinator for the impending Rebranding sprint to build cross-functional influence.</p>
                                    </div>
                                    <div className="bg-[#0A1420] border border-[#2A3A4A] p-3 rounded-lg md:col-span-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target size={14} className="text-emerald-400" />
                                            <span className="text-xs font-semibold text-white">Mentorship Link</span>
                                        </div>
                                        <p className="text-[10px] text-[#8899AA]">Suggest formal 1:1s with <strong>David Chen (VP Design)</strong> to bridge strategic gap. AI predicts 85% compatibility based on working styles.</p>
                                        <Button className="mt-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-[10px] h-auto py-1.5 px-3">
                                            Draft Intro Email
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Path Option 2: IC / Lateral */}
                        <div className="flex items-start gap-6 relative opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="absolute left-[80px] -top-[160px] w-12 h-[200px] border-l-2 border-b-2 border-dashed border-[#2A3A4A] rounded-bl-3xl z-0" />

                            <div className="w-[160px] bg-[#0A1420] border border-[#2A3A4A] text-center p-3 rounded-xl shrink-0 z-10 relative mt-4">
                                <div className="absolute -left-[50px] top-1/2 -translate-y-1/2 w-12 border-b-2 border-dashed border-[#2A3A4A] z-0" />
                                <div className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider mb-1">Pivot Option</div>
                                <div className="text-sm font-bold text-white mb-0.5">UX Researcher</div>
                                <div className="text-xs text-[#8899AA]">Lateral Move</div>
                            </div>

                            <div className="flex-1 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 mt-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-white text-sm font-medium mb-1">Strong competency overlap detected (88%)</h4>
                                    <p className="text-xs text-[#8899AA]">Requires advanced qualification in Data Analytics & A/B testing frameworks.</p>
                                </div>
                                <ChevronRight size={16} className="text-[#445566]" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
